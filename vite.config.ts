import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import shaderminifier from './plugins/shader-minifier-loader';
import { visualizer } from 'rollup-plugin-visualizer';

const basePath = `/`;

// https://vitejs.dev/config/
export default defineConfig( {
	root: 'src',
	server: {
		port: 3000,
		host: "0.0.0.0",
	},
	build: {
		outDir: '../dist/',
	},
	resolve: {
		alias: {
			"glpower": path.join( __dirname, "packages/glpower/packages/glpower/src" ),
			"maxpower": path.join( __dirname, "packages/maxpower" ),
			"~": path.join( __dirname, "src" ),
		},
	},
	plugins: [
		{
			...shaderminifier(),
			enforce: 'pre'
		},
		visualizer( {
			template: "treemap"
		} ),
		react()
	],
	define: {
		BASE_PATH: `"${basePath}"`
	}
} );
