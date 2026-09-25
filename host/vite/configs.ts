import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import terser from '@rollup/plugin-terser';
import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, Plugin, UserConfig } from 'vite';

import { AgentBridge } from './plugins/AgentBridge';
import { PlayerRegistry } from './plugins/PlayerRegistry';
import { ProjectWatchReload } from './plugins/ProjectWatchReload';
import { ShaderBuilder } from './plugins/ShaderBuilder';
import { TexLoader } from './plugins/TexLoader';
import { collectWgslIdentifiers, WgslLoader } from './plugins/WgslLoader';
import { collectJsonKeys, collectSceneUsage } from './sceneScan';


const orengineRoot = path.resolve( fileURLToPath( import.meta.url ), '../../..' );
const appRoot = path.join( orengineRoot, 'host/app' );

export type RendererName = 'webgl' | 'webgpu' | 'headless';

export interface OrengineConfigOptions {
	projectDir: string;
	// @or-scene が指すシーン名（<projectDir>/scenes/<scene>.json）。player / static のバンドルに焼き込まれる
	scene?: string;
	basePath?: string;
	https?: { cert: Buffer | string; key: Buffer | string };
	port?: number;
	apiPort?: number;
	renderer?: RendererName;
}

// ランタイムは BASE_PATH + '/xxx' の形で連結するため、define へ渡す値は末尾スラッシュを落とす
// （viteの base はスラッシュ終わりを要求するので、そちらは basePath をそのまま使う）
const defineBasePath = ( basePath?: string ) => JSON.stringify( ( basePath ?? '' ).replace( /\/+$/, '' ) );

export const DEFAULT_SCENE_NAME = 'main';

export const sceneFilePath = ( projectDir: string, scene?: string ) => {

	const name = scene ?? DEFAULT_SCENE_NAME;

	return path.join( projectDir, 'scenes', name + '.json' );

};

const projectAliases = ( projectDir: string, scene?: string ) => [
	{ find: /^@or-scene$/, replacement: sceneFilePath( projectDir, scene ) },
	{ find: /^@or-editor$/, replacement: path.join( projectDir, 'editor.json' ) },
	{ find: /^@or-resources\/(.*)$/, replacement: path.join( projectDir, 'Resources/$1' ) },
	// プロジェクトのエディタ拡張（パネル）。player ビルドのエントリからは辿られないので焼き込まれない
	{ find: /^@or-project-editor\/(.*)$/, replacement: path.join( projectDir, 'editor/$1' ) },
];

// maxpowerのエントリ。各バックエンドの index.ts が core + 自バックエンドを束ねる
const rendererPath: { [key in RendererName]: string } = {
	webgl: 'packages/maxpower/webgl/index.ts',
	webgpu: 'packages/maxpower/webgpu/index.ts',
	headless: 'packages/maxpower/headless/index.ts',
};

// playerビルドへWebGPUコードが混入しないよう、レンダラーはビルド時のaliasで固定する
export const sharedResolve = ( projectDir: string, renderer: RendererName, scene?: string ) => ( {
	alias: [
		...projectAliases( projectDir, scene ),
		{ find: /^@or-renderer$/, replacement: path.join( orengineRoot, rendererPath[ renderer ] ) },
		{ find: /^orengine\/player$/, replacement: path.join( orengineRoot, 'packages/orengine/player/index.ts' ) },
		{ find: /^orengine\/react$/, replacement: path.join( orengineRoot, 'packages/orengine/react.tsx' ) },
		{ find: /^orengine\/editor$/, replacement: path.join( orengineRoot, 'packages/orengine/editor/lib/index.ts' ) },
		{ find: /^orengine\/core$/, replacement: path.join( orengineRoot, 'packages/orengine/core/index.ts' ) },
		{ find: /^orengine\/maxpower$/, replacement: path.join( orengineRoot, 'packages/maxpower/webgl/index.ts' ) },
		{ find: /^orengine\/glpower$/, replacement: path.join( orengineRoot, 'packages/glpower/index.ts' ) },
		{ find: /^orengine\/mathpower$/, replacement: path.join( orengineRoot, 'packages/mathpower/index.ts' ) },
		{ find: /^orengine\/basepower$/, replacement: path.join( orengineRoot, 'packages/basepower/index.ts' ) },
		{ find: /^orengine\/uipower$/, replacement: path.join( orengineRoot, 'packages/uipower/index.ts' ) },
		{ find: /^orengine\/(.*)$/, replacement: path.join( orengineRoot, 'packages/orengine/$1' ) },
		{ find: /^orengine$/, replacement: path.join( orengineRoot, 'packages/orengine/index.ts' ) },
		{ find: /^glpower$/, replacement: path.join( orengineRoot, 'packages/glpower' ) },
		{ find: /^mathpower$/, replacement: path.join( orengineRoot, 'packages/mathpower' ) },
		{ find: /^basepower$/, replacement: path.join( orengineRoot, 'packages/basepower' ) },
		{ find: /^uipower\/(.*)$/, replacement: path.join( orengineRoot, 'packages/uipower/$1' ) },
		{ find: /^uipower$/, replacement: path.join( orengineRoot, 'packages/uipower' ) },
		// WebGPUプロジェクトのコンポーネントが自分のバックエンドAPIを直接importするための口
		{ find: /^maxpower\/webgpu$/, replacement: path.join( orengineRoot, 'packages/maxpower/webgpu' ) },
		{ find: /^maxpower$/, replacement: path.join( orengineRoot, 'packages/maxpower/webgl' ) },
	],
} );

export const sharedCss = () => ( {
	modules: {
		generateScopedName( name: string, filename: string, css: string ) {

			const dir = path.basename( path.dirname( filename ) );
			const hash = Buffer.from( css ).toString( 'base64' ).slice( 0, 5 );
			return `${dir}__${name}___${hash}`;

		},
	},
	preprocessorOptions: {
		// loadPaths: scss から `@use 'styles' as *` で uipower の共有 partial を参照するため
		// （相対パスは階層移動に弱い。package.json の typecheck の --load-path と一致させること）
		scss: { api: 'modern', loadPaths: [ path.join( orengineRoot, 'packages/uipower' ) ] },
	},
} );

export const createDevConfig = ( opts: OrengineConfigOptions ): UserConfig => defineConfig( {
	root: appRoot,
	base: opts.basePath ?? '',
	publicDir: path.join( opts.projectDir, 'public' ),
	server: {
		port: opts.port ?? 3000,
		host: '0.0.0.0',
		https: opts.https,
		fs: {
			allow: [ appRoot, orengineRoot, opts.projectDir ],
		},
		proxy: {
			'/api': `http://localhost:${opts.apiPort ?? 3001}`,
		},
	},
	build: {
		outDir: path.join( opts.projectDir, 'dist' ),
	},
	optimizeDeps: {
		entries: [
			path.join( appRoot, 'index.html' ),
			path.join( appRoot, 'static.html' ),
		],
	},
	resolve: sharedResolve( opts.projectDir, opts.renderer ?? 'webgl', opts.scene ),
	css: sharedCss(),
	plugins: [
		// WebGPUはsecure context必須のため、webgpu起動時はHTTPS（証明書は自動生成・キャッシュ）で立てる。
		// basic-ssl は server.https の cert/key を自己署名証明書で上書きするため、証明書が渡されたときは入れない
		...( opts.renderer === 'webgpu' && ! opts.https ? [ basicSsl() ] : [] ),
		react(),
		ShaderBuilder( { scanDirs: [ orengineRoot, opts.projectDir ] } ),
		TexLoader(),
		WgslLoader( { moduleDirs: [ path.join( opts.projectDir, 'Resources/shaders' ) ] } ),
		ProjectWatchReload( opts.projectDir ),
		// scripts/scene.ts がこのファイルから dev サーバーの URL を読む（パスは scene.ts 側と一致させる）
		AgentBridge( { infoFile: path.join( orengineRoot, 'tmp/dev-server.json' ) } ),
	],
	define: {
		BASE_PATH: defineBasePath( opts.basePath ),
		__OR_PROJECT_NAME__: JSON.stringify( path.basename( opts.projectDir ) ),
	},
} );

// glTF スキーマの型定義（GLTFLoader が読む JSON の形）から、プロパティ名を集める。
// glb の JSON は実行時に JSON.parse されるので元のキー名のままだが、ローダー側の json.nodes 等のアクセスは改名されて食い違う
const collectGltfJsonKeys = () => {

	const source = fs.readFileSync( path.join( orengineRoot, 'packages/maxpower/webgl/Loaders/GLTFLoader/gltf.d.ts' ), 'utf-8' );
	const keys = new Set<string>();

	for ( const match of source.matchAll( /^\s*'?(\w+)'?\??:/gm ) ) {

		keys.add( match[ 1 ] );

	}

	return keys;

};

// player バンドルの terser。WGSL は minify されず名前がそのまま残るため、uniform / varying / storage のように
// JS のプロパティ名をそのまま WGSL の名前として使う箇所が改名で食い違わないよう、WGSL に出てくる識別子は property mangle から外す。
// 識別子は WgslLoader の transform で集まるので、terser は全モジュールの変換が終わった renderChunk の時点で組み立てる
const playerTerser = ( reserved: string[], wgslIdentifiers: Set<string> ): Plugin => ( {
	name: 'player-terser',
	renderChunk( code, chunk, outputOptions ) {

		const plugin = terser( {
			keep_classnames: true,
			mangle: {
				properties: {
					regex: /^(?!(u[A-Z]|[A-Z_]+$|_)).*$/,
					reserved: [ ...reserved, ...wgslIdentifiers ],
				},
			},
			compress: {
				passes: 16,
				arguments: true,
				booleans_as_integers: true,
				drop_console: false,
				keep_fargs: false,
				module: true,
				pure_getters: true,
				unsafe: true,
				unsafe_math: true,
				unsafe_methods: true,
				unsafe_proto: true,
				unsafe_undefined: true,
			},
		} );

		// @rollup/plugin-terser の renderChunk はオブジェクト形式ではなく素の関数で定義されている
		const renderChunk = plugin.renderChunk as ( this: unknown, code: string, chunk: unknown, outputOptions: unknown ) => Promise<string>;

		return renderChunk.call( this, code, chunk, outputOptions );

	},
} );

export interface PlayerConfigOptions extends OrengineConfigOptions {
	entry?: string;
	outSubDir?: string;
}

export const createPlayerConfig = ( opts: PlayerConfigOptions ): UserConfig => {

	const sceneJson = JSON.parse( fs.readFileSync( sceneFilePath( opts.projectDir, opts.scene ), 'utf-8' ) );

	const usage = collectSceneUsage( sceneJson );

	// バンドルに焼き込まれる blidge-scene.json のキーは、BLidge内のプロパティアクセスと食い違わないよう mangle から保護する
	const blidgeScenePath = path.join( opts.projectDir, 'public/blidge-scene.json' );
	const blidgeSceneKeys = fs.existsSync( blidgeScenePath )
		? collectJsonKeys( JSON.parse( fs.readFileSync( blidgeScenePath, 'utf-8' ) ) )
		: new Set<string>();

	const reserved = [
		'overrides',
		'side',
		'scene',
		...usage.componentNames,
		...usage.propKeys,
		...blidgeSceneKeys,
	];

	if ( usage.useGLTF ) reserved.push( ...collectGltfJsonKeys() );

	const wgslIdentifiers = new Set<string>();

	const entry = opts.entry ?? path.join( appRoot, 'src/player.ts' );
	const outDir = path.join( opts.projectDir, 'dist', opts.outSubDir ?? 'player' );

	return defineConfig( {
		root: appRoot,
		base: opts.basePath ?? '',
		publicDir: path.join( opts.projectDir, 'public' ),
		server: {
			port: opts.port ?? 3000,
			host: '0.0.0.0',
		},
		build: {
			outDir,
			emptyOutDir: true,
			minify: 'terser',
			rollupOptions: {
				input: { main: entry },
				output: { entryFileNames: 'index.js' },
				plugins: [ playerTerser( reserved, wgslIdentifiers ) ],
			},
		},
		resolve: sharedResolve( opts.projectDir, opts.renderer ?? 'webgl', opts.scene ),
		css: {
			preprocessorOptions: {
				scss: { api: 'modern' },
			},
		},
		plugins: [
			ShaderBuilder( { scanDirs: [ orengineRoot, opts.projectDir ] } ),
			TexLoader(),
			WgslLoader( {
				moduleDirs: [ path.join( opts.projectDir, 'Resources/shaders' ) ],
				onSource: ( source ) => collectWgslIdentifiers( source, wgslIdentifiers ),
			} ),
			PlayerRegistry( { projectDir: opts.projectDir, usage } ),
			visualizer( { template: 'treemap', gzipSize: true } ),
		],
		define: {
			BASE_PATH: defineBasePath( opts.basePath ),
			__OR_PROJECT_NAME__: JSON.stringify( path.basename( opts.projectDir ) ),
		},
	} );

};

export interface StaticConfigOptions extends OrengineConfigOptions {
	input?: string;
	outSubDir?: string;
}

export const createStaticConfig = ( opts: StaticConfigOptions ): UserConfig => {

	const input = opts.input ?? path.join( appRoot, 'static.html' );
	const outDir = path.join( opts.projectDir, 'dist', opts.outSubDir ?? 'static' );

	return defineConfig( {
		root: appRoot,
		base: opts.basePath ?? '',
		publicDir: path.join( opts.projectDir, 'public' ),
		build: {
			outDir,
			emptyOutDir: true,
			rollupOptions: {
				input: { main: input },
			},
		},
		resolve: sharedResolve( opts.projectDir, 'webgl', opts.scene ),
		css: sharedCss(),
		plugins: [
			react(),
			ShaderBuilder( { scanDirs: [ orengineRoot, opts.projectDir ] } ),
			TexLoader(),
			WgslLoader( { moduleDirs: [ path.join( opts.projectDir, 'Resources/shaders' ) ] } ),
		],
		define: {
			BASE_PATH: defineBasePath( opts.basePath ),
			__OR_PROJECT_NAME__: JSON.stringify( path.basename( opts.projectDir ) ),
		},
	} );

};
