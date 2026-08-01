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
import { WgslTranspiler } from './plugins/WgslTranspiler';
import { collectJsonKeys, collectSceneUsage } from './sceneScan';


const orengineRoot = path.resolve( fileURLToPath( import.meta.url ), '../../..' );
const appRoot = path.join( orengineRoot, 'host/app' );

export interface OrengineConfigOptions {
	projectDir: string;
	basePath?: string;
	https?: { cert: Buffer | string; key: Buffer | string };
	port?: number;
	apiPort?: number;
}

const projectAliases = ( projectDir: string ) => [
	{ find: /^@or-scene$/, replacement: path.join( projectDir, 'scene.json' ) },
	{ find: /^@or-editor$/, replacement: path.join( projectDir, 'editor.json' ) },
	{ find: /^@or-resources\/(.*)$/, replacement: path.join( projectDir, 'Resources/$1' ) },
];

type BackendName = 'webgl' | 'webgpu';

const backendPath: { [key in BackendName]: string } = {
	webgl: 'packages/maxpower/Backend/GLBackend/index.ts',
	webgpu: 'packages/maxpower/Backend/WebGPUBackend/index.ts',
};

// playerビルドへWebGPUコードが混入しないよう、バックエンドはビルド時のaliasで固定する
const sharedResolve = ( projectDir: string, backend: BackendName ) => ( {
	alias: [
		...projectAliases( projectDir ),
		{ find: /^@or-backend$/, replacement: path.join( orengineRoot, backendPath[ backend ] ) },
		{ find: /^orengine\/player$/, replacement: path.join( orengineRoot, 'packages/orengine/player.ts' ) },
		{ find: /^orengine\/react$/, replacement: path.join( orengineRoot, 'packages/orengine/react.tsx' ) },
		{ find: /^orengine\/core$/, replacement: path.join( orengineRoot, 'packages/orengine/core/index.ts' ) },
		{ find: /^orengine\/maxpower$/, replacement: path.join( orengineRoot, 'packages/maxpower/index.ts' ) },
		{ find: /^orengine\/glpower$/, replacement: path.join( orengineRoot, 'packages/glpower/packages/glpower/src/index.ts' ) },
		{ find: /^orengine\/(.*)$/, replacement: path.join( orengineRoot, 'packages/orengine/$1' ) },
		{ find: /^orengine$/, replacement: path.join( orengineRoot, 'packages/orengine/index.ts' ) },
		{ find: /^glpower$/, replacement: path.join( orengineRoot, 'packages/glpower/packages/glpower/src' ) },
		{ find: /^maxpower$/, replacement: path.join( orengineRoot, 'packages/maxpower' ) },
	],
} );

const sharedCss = () => ( {
	modules: {
		generateScopedName( name: string, filename: string, css: string ) {

			const dir = path.basename( path.dirname( filename ) );
			const hash = Buffer.from( css ).toString( 'base64' ).slice( 0, 5 );
			return `${dir}__${name}___${hash}`;

		},
	},
	preprocessorOptions: {
		scss: { api: 'modern' },
	},
} );

// WebGPUはsecure context必須のため、wgpu起動時はHTTPS（証明書は自動生成・キャッシュ）で立てる
const devBackend = () => process.env.ORENGINE_BACKEND === 'webgpu' ? 'webgpu' : 'webgl' as const;

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
	resolve: sharedResolve( opts.projectDir, devBackend() ),
	css: sharedCss(),
	plugins: [
		...( devBackend() === 'webgpu' ? [ basicSsl() ] : [] ),
		react(),
		ShaderBuilder( { scanDirs: [ orengineRoot, opts.projectDir ] } ),
		TexLoader(),
		WgslTranspiler(),
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
		resolve: sharedResolve( opts.projectDir, 'webgl' ),
		css: {
			preprocessorOptions: {
				scss: { api: 'modern' },
			},
		},
		plugins: [
			ShaderBuilder( { scanDirs: [ orengineRoot, opts.projectDir ] } ),
			TexLoader(),
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
		],
		define: {
			BASE_PATH: JSON.stringify( opts.basePath ?? '' ),
			__OR_PROJECT_NAME__: JSON.stringify( path.basename( opts.projectDir ) ),
		},
	} );

};
