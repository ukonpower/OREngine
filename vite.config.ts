import path from 'path';

import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

import { OREngineFileSystemPlugin } from './plugins/OREngineFileSystemPlugin';
import { ShaderMinifierLoader } from "./plugins/ShaderMinifierLoader";


const basePath = ``;

// https://vitejs.dev/config/
export default defineConfig( {
	root: 'src',
	server: {
		port: 3000,
		host: "0.0.0.0",
		watch: {
			ignored: [
				"/data/**/*",
			]
		}
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
		react(),
		OREngineFileSystemPlugin(),
		ShaderMinifierLoader(),
	],
	define: {
		BASE_PATH: `"${basePath}"`
	}
} );
