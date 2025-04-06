import path from 'path';

import terser from '@rollup/plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

import { nameCache, MangledJsonLoader, SaveNameCache } from './plugins/MangleManager';
import { ShaderMinifierLoader } from './plugins/ShaderMinifierLoader';

const basePath = ``;

// player.jsonからreservedに追加するプロパティ名を抽出
export default defineConfig( {
	root: 'src',
	server: {
		port: 3000,
		host: "0.0.0.0",
	},
	build: {
		outDir: '../dist/build/',
		minify: 'terser',
		rollupOptions: {
			input: {
				"main": "./src/ts/Player/index.ts"
			},
			output: {
				entryFileNames: 'index.js'
			},
			plugins: [
				terser( {
					keep_classnames: true,
					mangle: {
						properties: {
							keep_quoted: "strict",
							regex: /^(?!(u[A-Z]|a[A-Z]|[A-Z_]+$|_)).*$/,
							reserved: [
							],
						}
					},
					nameCache,
					compress: {
						passes: 16,
						arguments: true,
						booleans_as_integers: true,
						drop_console: true,
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
	resolve: {
		alias: {
			"glpower": path.join( __dirname, "packages/glpower/packages/glpower/src" ),
			"maxpower": path.join( __dirname, "packages/maxpower" ),
			"orengine": path.join( __dirname, "packages/orengine" ),
			"~": path.join( __dirname, "src" ),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: "modern-compiler",
			},
		},
	},
	plugins: [
		ShaderMinifierLoader(),
		visualizer( {
			template: "treemap",
			gzipSize: true,
		} ),
		SaveNameCache(),
	],
	define: {
		BASE_PATH: `"${basePath}"`
	}
} );
