import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

import { Plugin } from 'vite';

import { SceneUsage } from '../../sceneScan';

export interface PlayerRegistryOptions {
	projectDir: string;
	usage: SceneUsage;
}

const VIRTUAL_REGISTRY_ID = '\0or-player-registry';

const pluginDir = path.dirname( fileURLToPath( import.meta.url ) );
const registryPath = path.resolve( pluginDir, '../../../app/Resources/registry.ts' );
const registryCommonPath = path.join( path.dirname( registryPath ), 'registryCommon.ts' );
const builtinComponentsDir = path.resolve( pluginDir, '../../../../packages/orengine/builtin/Components' );
const builtinLibraryDir = path.resolve( pluginDir, '../../../../packages/orengine/builtin/Library' );
const gltfLoaderPath = path.resolve( pluginDir, '../../../../packages/maxpower/webgl/Loaders/GLTFLoader/index.ts' );

// Engine.resources.getComponent(name) はフラット検索のため、player登録もフラットで足りる（グループ階層はエディタUI専用）
const MANUAL_BUILTIN_COMPONENTS = [ 'Light', 'Camera', 'Mesh' ];

const CLASS_NAME_REGEX = /export\s+(?:abstract\s+)?class\s+([A-Z]\w*)/;

// dir配下の index.ts を再帰列挙する。`_` prefix のディレクトリはサンプル/未完成コード扱いで除外（registry.ts の glob 除外条件と同じ）
const walkComponentFiles = ( dir: string ): string[] => {

	if ( ! fs.existsSync( dir ) ) return [];

	const result: string[] = [];
	const entries = fs.readdirSync( dir, { withFileTypes: true } );

	for ( const entry of entries ) {

		if ( entry.name.startsWith( '_' ) ) continue;

		const entryPath = path.join( dir, entry.name );

		if ( entry.isDirectory() ) {

			result.push( ...walkComponentFiles( entryPath ) );

		} else if ( entry.isFile() && entry.name === 'index.ts' ) {

			result.push( entryPath );

		}

	}

	return result;

};

// builtin/project の Components ディレクトリからクラス名 -> 絶対パスのマップを作る
const buildComponentMap = ( dirs: string[] ): Map<string, string> => {

	const map = new Map<string, string>();

	for ( const dir of dirs ) {

		for ( const file of walkComponentFiles( dir ) ) {

			const match = fs.readFileSync( file, 'utf-8' ).match( CLASS_NAME_REGEX );

			if ( match ) map.set( match[ 1 ], file );

		}

	}

	return map;

};

// builtin/project の Library ディレクトリから、'<種類>/<名前>' -> index.ts の絶対パスのマップを作る。
// 後に渡したディレクトリが同名を上書きする（プロジェクトのライブラリが builtin を上書きする。registry.ts と同じ）
// `_` prefix のディレクトリは除外（registry.ts の glob 除外条件と同じ）
const buildLibraryMap = ( dirs: string[] ): Map<string, string> => {

	const map = new Map<string, string>();

	for ( const dir of dirs ) {

		if ( ! fs.existsSync( dir ) ) continue;

		for ( const kindEntry of fs.readdirSync( dir, { withFileTypes: true } ) ) {

			if ( ! kindEntry.isDirectory() ) continue;
			if ( kindEntry.name.startsWith( '_' ) ) continue;

			const kindDir = path.join( dir, kindEntry.name );

			for ( const nameEntry of fs.readdirSync( kindDir, { withFileTypes: true } ) ) {

				if ( ! nameEntry.isDirectory() ) continue;
				if ( nameEntry.name.startsWith( '_' ) ) continue;

				const file = path.join( kindDir, nameEntry.name, 'index.ts' );

				if ( fs.existsSync( file ) ) map.set( `${kindEntry.name}/${nameEntry.name}`, file );

			}

		}

	}

	return map;

};

type LibraryRef = { kind: string; name: string };

// コンポーネントの index.ts と同じディレクトリの player.ts が export する、props から使うライブラリを返す関数。
// player.ts は Node（tsx）から直接読むので、ブラウザ向けのモジュールを import しない
type CollectLibraryRefs = ( props: Record<string, unknown> ) => LibraryRef[];

// シーンに置かれたコンポーネントそれぞれに player.ts で使うライブラリを聞き、'<種類>/<名前>' の集合にする
const collectLibraryRefs = async ( usage: SceneUsage, componentMap: Map<string, string> ): Promise<Set<string>> => {

	const refs = new Set<string>();

	for ( const component of usage.components ) {

		const componentFile = componentMap.get( component.name );

		if ( ! componentFile ) continue;

		const playerFile = path.join( path.dirname( componentFile ), 'player.ts' );

		if ( ! fs.existsSync( playerFile ) ) continue;

		const mod = await import( pathToFileURL( playerFile ).href ) as { collectLibraryRefs?: CollectLibraryRefs };

		if ( ! mod.collectLibraryRefs ) continue;

		for ( const ref of mod.collectLibraryRefs( component.props ) ) {

			refs.add( `${ref.kind}/${ref.name}` );

		}

	}

	return refs;

};

// シーンファイルの使用状況(usage)から、使用コンポーネントだけを静的importするレジストリモジュールのソースを組み立てる
const generateRegistryCode = async ( opts: PlayerRegistryOptions ): Promise<string> => {

	const { usage, projectDir } = opts;

	const componentMap = buildComponentMap( [
		builtinComponentsDir,
		path.join( projectDir, 'Resources/Components' ),
	] );

	const manualBuiltins = MANUAL_BUILTIN_COMPONENTS.filter( name => usage.componentNames.has( name ) );
	const scannedNames = [ ...usage.componentNames ].filter( name => ! manualBuiltins.includes( name ) );

	const unresolved = scannedNames.filter( name => ! componentMap.has( name ) );

	if ( unresolved.length > 0 ) {

		throw new Error( `[PlayerRegistry] component "${unresolved[ 0 ]}" (scene) not found in builtin/project Components` );

	}

	const maxpowerNames = [ ...manualBuiltins ];
	if ( usage.useGLTF ) maxpowerNames.push( 'BLidge' );

	// BLidgeClient使用時はシーンデータをバンドルに焼き込み、実行時のfetchを不要にする
	const blidgeScenePath = path.join( projectDir, 'public/blidge-scene.json' );
	const inlineBLidgeScene = usage.componentNames.has( 'BLidgeClient' ) && fs.existsSync( blidgeScenePath );

	const importLines: string[] = [];

	if ( maxpowerNames.length > 0 ) importLines.push( `import { ${maxpowerNames.join( ', ' )} } from 'maxpower';` );

	importLines.push( `import { Engine } from 'orengine';` );

	if ( usage.useGLTF ) importLines.push( `import { GLTFLoader } from ${JSON.stringify( gltfLoaderPath )};` );

	if ( inlineBLidgeScene ) importLines.push( `import blidgeSceneData from ${JSON.stringify( blidgeScenePath )};` );

	for ( const name of scannedNames ) {

		importLines.push( `import { ${name} } from ${JSON.stringify( componentMap.get( name ) )};` );

	}

	const libraryMap = buildLibraryMap( [
		builtinLibraryDir,
		path.join( projectDir, 'Resources/Library' ),
	] );

	const libraryKeys: string[] = [];

	for ( const key of await collectLibraryRefs( usage, componentMap ) ) {

		const file = libraryMap.get( key );

		if ( ! file ) {

			throw new Error( `[PlayerRegistry] library "${key}" (scene) not found in builtin/project Library` );

		}

		// 識別子は番号にする。ディレクトリ名には JS の識別子に使えない文字（`-` 等）が入りうるため
		importLines.push( `import library_${libraryKeys.length} from ${JSON.stringify( file )};` );
		libraryKeys.push( key );

	}

	importLines.push( `import { registerProjectTextures, initResourceInstances } from ${JSON.stringify( registryCommonPath )};` );

	const bundledNames = manualBuiltins.concat( scannedNames );
	const registerLines = bundledNames.map( name => `\tgroup.addComponent( '${name}', ${name} );` ).join( '\n' );

	let libraryRegisterLines = '';

	for ( let i = 0; i < libraryKeys.length; i ++ ) {

		const [ kind, name ] = libraryKeys[ i ].split( '/' );

		libraryRegisterLines += `\tEngine.resources.addLibraryItem( ${JSON.stringify( kind )}, ${JSON.stringify( name )}, library_${i} );\n`;

	}

	console.log( `[PlayerRegistry] bundling components: ${bundledNames.join( ', ' )}` );
	console.log( `[PlayerRegistry] bundling library: ${libraryKeys.join( ', ' )}` );

	const gltfWiring = usage.useGLTF ? `\tBLidge.gltfLoaderFactory = ( engine ) => new GLTFLoader( engine );\n\n` : '';
	const sceneWiring = inlineBLidgeScene ? `\tBLidgeClient.sceneData = blidgeSceneData;\n\n` : '';

	return `${importLines.join( '\n' )}

export const initResouces = () => {

${gltfWiring}${sceneWiring}\tconst group = Engine.resources.addComponentGroup( 'Player' );
${registerLines}
${libraryRegisterLines}
\tregisterProjectTextures();

};

export { initResourceInstances };
`;

};

// playerビルド時、registry.ts の解決結果を横取りして「シーンファイルの使用コンポーネントだけを静的importする」生成モジュールに差し替える
// dev/static は resolveId 対象外のまま registry.ts を素通しするため、editor 用の全量登録は変更されない
export const PlayerRegistry = ( opts: PlayerRegistryOptions ): Plugin => ( {

	name: 'player-registry',
	enforce: 'pre',

	async resolveId( source, importer ) {

		const resolved = await this.resolve( source, importer, { skipSelf: true } );

		if ( resolved && path.normalize( resolved.id ) === path.normalize( registryPath ) ) {

			return VIRTUAL_REGISTRY_ID;

		}

		return null;

	},

	async load( id ) {

		if ( id !== VIRTUAL_REGISTRY_ID ) return;

		return generateRegistryCode( opts );

	},

} );
