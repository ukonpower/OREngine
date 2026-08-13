import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import terser from '@rollup/plugin-terser';
import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, UserConfig } from 'vite';

import { PlayerRegistry } from './plugins/PlayerRegistry';
import { ProjectWatchReload } from './plugins/ProjectWatchReload';
import { ShaderBuilder } from './plugins/ShaderBuilder';
import { TexLoader } from './plugins/TexLoader';
import { WgslLoader } from './plugins/WgslLoader';
import { collectJsonKeys, collectSceneUsage } from './sceneScan';


const orengineRoot = path.resolve( fileURLToPath( import.meta.url ), '../../..' );
const appRoot = path.join( orengineRoot, 'host/app' );

export type RendererName = 'webgl' | 'webgpu' | 'headless';

export interface OrengineConfigOptions {
	projectDir: string;
	basePath?: string;
	https?: { cert: Buffer | string; key: Buffer | string };
	port?: number;
	apiPort?: number;
	renderer?: RendererName;
}

const projectAliases = ( projectDir: string ) => [
	{ find: /^@or-scene$/, replacement: path.join( projectDir, 'scene.json' ) },
	{ find: /^@or-editor$/, replacement: path.join( projectDir, 'editor.json' ) },
	{ find: /^@or-resources\/(.*)$/, replacement: path.join( projectDir, 'Resources/$1' ) },
];

// maxpowerのエントリ。各バックエンドの index.ts が core + 自バックエンドを束ねる
const rendererPath: { [key in RendererName]: string } = {
	webgl: 'packages/maxpower/webgl/index.ts',
	webgpu: 'packages/maxpower/webgpu/index.ts',
	headless: 'packages/maxpower/headless/index.ts',
};

// playerビルドへWebGPUコードが混入しないよう、レンダラーはビルド時のaliasで固定する
export const sharedResolve = ( projectDir: string, renderer: RendererName ) => ( {
	alias: [
		...projectAliases( projectDir ),
		{ find: /^@or-renderer$/, replacement: path.join( orengineRoot, rendererPath[ renderer ] ) },
		{ find: /^orengine\/player$/, replacement: path.join( orengineRoot, 'packages/orengine/player/index.ts' ) },
		{ find: /^orengine\/react$/, replacement: path.join( orengineRoot, 'packages/orengine/react.tsx' ) },
		{ find: /^orengine\/editor$/, replacement: path.join( orengineRoot, 'packages/orengine/editor/lib/index.ts' ) },
		{ find: /^orengine\/core$/, replacement: path.join( orengineRoot, 'packages/orengine/core/index.ts' ) },
		{ find: /^orengine\/maxpower$/, replacement: path.join( orengineRoot, 'packages/maxpower/webgl/index.ts' ) },
		{ find: /^orengine\/glpower$/, replacement: path.join( orengineRoot, 'packages/glpower/index.ts' ) },
		{ find: /^orengine\/mathpower$/, replacement: path.join( orengineRoot, 'packages/mathpower/index.ts' ) },
		{ find: /^orengine\/basepower$/, replacement: path.join( orengineRoot, 'packages/basepower/index.ts' ) },
		{ find: /^orengine\/(.*)$/, replacement: path.join( orengineRoot, 'packages/orengine/$1' ) },
		{ find: /^orengine$/, replacement: path.join( orengineRoot, 'packages/orengine/index.ts' ) },
		{ find: /^glpower$/, replacement: path.join( orengineRoot, 'packages/glpower' ) },
		{ find: /^mathpower$/, replacement: path.join( orengineRoot, 'packages/mathpower' ) },
		{ find: /^basepower$/, replacement: path.join( orengineRoot, 'packages/basepower' ) },
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
		// loadPaths: editor 配下の scss から `@use 'styles' as *` で共有 partial を参照するため
		// （相対パスは階層移動に弱い。package.json の typecheck の --load-path と一致させること）
		scss: { api: 'modern', loadPaths: [ path.join( orengineRoot, 'packages/orengine/editor' ) ] },
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
	resolve: sharedResolve( opts.projectDir, opts.renderer ?? 'webgl' ),
	css: sharedCss(),
	plugins: [
		// WebGPUはsecure context必須のため、webgpu起動時はHTTPS（証明書は自動生成・キャッシュ）で立てる
		...( opts.renderer === 'webgpu' ? [ basicSsl() ] : [] ),
		react(),
		ShaderBuilder( { scanDirs: [ orengineRoot, opts.projectDir ] } ),
		TexLoader(),
		WgslLoader( { moduleDirs: [ path.join( opts.projectDir, 'Resources/shaders' ) ] } ),
		ProjectWatchReload( opts.projectDir ),
	],
	define: {
		BASE_PATH: JSON.stringify( opts.basePath ?? '' ),
		__OR_PROJECT_NAME__: JSON.stringify( path.basename( opts.projectDir ) ),
	},
} );

export interface PlayerConfigOptions extends OrengineConfigOptions {
	entry?: string;
	outSubDir?: string;
}

export const createPlayerConfig = ( opts: PlayerConfigOptions ): UserConfig => {

	const sceneJsonPath = path.join( opts.projectDir, 'scene.json' );
	const sceneJson = JSON.parse( fs.readFileSync( sceneJsonPath, 'utf-8' ) );

	const usage = collectSceneUsage( sceneJson );

	// バンドルに焼き込まれる blidge-scene.json のキーは、BLidge内のプロパティアクセスと食い違わないよう mangle から保護する
	const blidgeScenePath = path.join( opts.projectDir, 'public/blidge-scene.json' );
	const blidgeSceneKeys = fs.existsSync( blidgeScenePath )
		? collectJsonKeys( JSON.parse( fs.readFileSync( blidgeScenePath, 'utf-8' ) ) )
		: new Set<string>();

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
				plugins: [
					terser( {
						keep_classnames: true,
						mangle: {
							properties: {
								regex: /^(?!(u[A-Z]|[A-Z_]+$|_)).*$/,
								reserved: [
									'overrides',
									'side',
									'scene',
									...usage.componentNames,
									...usage.propKeys,
									...blidgeSceneKeys,
								],
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
					} ),
				],
			},
		},
		resolve: sharedResolve( opts.projectDir, opts.renderer ?? 'webgl' ),
		css: {
			preprocessorOptions: {
				scss: { api: 'modern' },
			},
		},
		plugins: [
			ShaderBuilder( { scanDirs: [ orengineRoot, opts.projectDir ] } ),
			TexLoader(),
			WgslLoader( { moduleDirs: [ path.join( opts.projectDir, 'Resources/shaders' ) ] } ),
			PlayerRegistry( { projectDir: opts.projectDir, usage } ),
			visualizer( { template: 'treemap', gzipSize: true } ),
		],
		define: {
			BASE_PATH: JSON.stringify( opts.basePath ?? '' ),
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
		resolve: sharedResolve( opts.projectDir, 'webgl' ),
		css: sharedCss(),
		plugins: [
			react(),
			ShaderBuilder( { scanDirs: [ orengineRoot, opts.projectDir ] } ),
			TexLoader(),
			WgslLoader( { moduleDirs: [ path.join( opts.projectDir, 'Resources/shaders' ) ] } ),
		],
		define: {
			BASE_PATH: JSON.stringify( opts.basePath ?? '' ),
			__OR_PROJECT_NAME__: JSON.stringify( path.basename( opts.projectDir ) ),
		},
	} );

};
