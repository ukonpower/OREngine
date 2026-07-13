import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import terser from '@rollup/plugin-terser';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, UserConfig } from 'vite';

import { ProjectWatchReload } from './plugins/ProjectWatchReload';
import { ShaderMinifierLoader } from './plugins/ShaderMinifierLoader';
import { TexLoader } from './plugins/TexLoader';


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

const sharedResolve = ( projectDir: string ) => ( {
	alias: [
		...projectAliases( projectDir ),
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
	resolve: sharedResolve( opts.projectDir ),
	css: sharedCss(),
	plugins: [
		react(),
		ShaderMinifierLoader(),
		TexLoader(),
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

	const reserved = new Set<string>();
	const addComponentNames = ( obj: any ) => {

		if ( obj.components ) {

			obj.components.forEach( ( comp: any ) => {

				if ( comp.name ) reserved.add( comp.name );
				if ( comp.props ) {

					Object.keys( comp.props ).forEach( prop => reserved.add( prop ) );

				}

			} );

		}

		if ( obj.childs ) obj.childs.forEach( addComponentNames );
		if ( obj.overrides ) obj.overrides.forEach( addComponentNames );

	};

	addComponentNames( sceneJson );

	const entry = opts.entry ?? path.join( appRoot, 'src/player.ts' );
	const outDir = path.join( opts.projectDir, 'dist', opts.outSubDir ?? 'player' );

	return defineConfig( {
		root: appRoot,
		base: opts.basePath ?? '',
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
									...Array.from( reserved ),
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
		resolve: sharedResolve( opts.projectDir ),
		css: {
			preprocessorOptions: {
				scss: { api: 'modern' },
			},
		},
		plugins: [
			ShaderMinifierLoader(),
			TexLoader(),
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
		resolve: sharedResolve( opts.projectDir ),
		css: sharedCss(),
		plugins: [
			react(),
			ShaderMinifierLoader(),
			TexLoader(),
		],
		define: {
			BASE_PATH: JSON.stringify( opts.basePath ?? '' ),
			__OR_PROJECT_NAME__: JSON.stringify( path.basename( opts.projectDir ) ),
		},
	} );

};
