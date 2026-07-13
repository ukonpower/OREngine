import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
const gltfLoaderPath = path.resolve( pluginDir, '../../../../packages/maxpower/Loaders/GLTFLoader/index.ts' );

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

// scene.json の使用状況(usage)から、使用コンポーネントだけを静的importするレジストリモジュールのソースを組み立てる
const generateRegistryCode = ( opts: PlayerRegistryOptions ): string => {

	const { usage, projectDir } = opts;

	const componentMap = buildComponentMap( [
		builtinComponentsDir,
		path.join( projectDir, 'Resources/Components' ),
	] );

	const manualBuiltins = MANUAL_BUILTIN_COMPONENTS.filter( name => usage.componentNames.has( name ) );
	const scannedNames = [ ...usage.componentNames ].filter( name => ! manualBuiltins.includes( name ) );

	const unresolved = scannedNames.filter( name => ! componentMap.has( name ) );

	if ( unresolved.length > 0 ) {

		throw new Error( `[PlayerRegistry] component "${unresolved[ 0 ]}" (scene.json) not found in builtin/project Components` );

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

	importLines.push( `import { registerProjectTextures, initResourceInstances } from ${JSON.stringify( registryCommonPath )};` );

	const bundledNames = manualBuiltins.concat( scannedNames );
	const registerLines = bundledNames.map( name => `\tgroup.addComponent( '${name}', ${name} );` ).join( '\n' );

	console.log( `[PlayerRegistry] bundling components: ${bundledNames.join( ', ' )}` );

	const gltfWiring = usage.useGLTF ? `\tBLidge.gltfLoaderFactory = ( engine ) => new GLTFLoader( engine );\n\n` : '';
	const sceneWiring = inlineBLidgeScene ? `\tBLidgeClient.sceneData = blidgeSceneData;\n\n` : '';

	return `${importLines.join( '\n' )}

export const initResouces = () => {

${gltfWiring}${sceneWiring}\tconst group = Engine.resources.addComponentGroup( 'Player' );
${registerLines}

\tregisterProjectTextures();

};

export { initResourceInstances };
`;

};

// playerビルド時、registry.ts の解決結果を横取りして「scene.json の使用コンポーネントだけを静的importする」生成モジュールに差し替える
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

	load( id ) {

		if ( id !== VIRTUAL_REGISTRY_ID ) return;

		return generateRegistryCode( opts );

	},

} );
