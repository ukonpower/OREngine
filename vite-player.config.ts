import path from 'path';

import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

import { ShaderMinifierLoader } from './plugins/ShaderMinifierLoader';

const basePath = ``;

// https://vitejs.dev/config/
export default defineConfig( {
	root: 'src',
	server: {
		port: 3000,
		host: "0.0.0.0",
	},
	build: {
		outDir: '../dist/',
		minify: 'terser',
		terserOptions: {
			keep_classnames: true,
			format: {
				comments: false
			},
			mangle: {
				properties: {
					regex: /^(?!(u[A-Z]|[A-Z_]+$)).*$/,
					reserved: [
						// "comListCats"
					]
				}
			},
			compress: {
				passes: 16,
				arguments: true,
				booleans_as_integers: true,
				// drop_console: false,
				keep_fargs: false,
				module: true,
				pure_getters: true,
				unsafe: true,
				unsafe_math: true,
				unsafe_methods: true,
				unsafe_proto: true,
				unsafe_undefined: true,
			},
		},
		rollupOptions: {
			input: {
				"main": "./src/ts/OREnginePlayer/index.ts"
			},
			output: {
				entryFileNames: 'index.js'
			}
		},
	},
	resolve: {
		alias: {
			"glpower": path.join( __dirname, "packages/glpower/packages/glpower/src" ),
			"maxpower": path.join( __dirname, "packages/maxpower" ),
			"~": path.join( __dirname, "src" ),
		},
	},
	plugins: [
		ShaderMinifierLoader(),
		visualizer( {
			template: "treemap"
		} ),
	],
	define: {
		BASE_PATH: `"${basePath}"`
	}
} );
