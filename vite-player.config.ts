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
		rollupOptions: {
			input: {
				"main": "./src/ts/gl/Player/index.ts"
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
