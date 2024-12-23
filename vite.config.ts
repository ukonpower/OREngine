import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { OREngineFileSystemPlugin } from './plugins/OREngineFileSystem';
import { ResourceManager } from './plugins/ResourceManager';
import { ShaderMinifierLoader } from "./plugins/ShaderMinifierLoader";


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
		react(),
		OREngineFileSystemPlugin(),
		ShaderMinifierLoader(),
		ResourceManager(),
	],
	define: {
		BASE_PATH: `"${basePath}"`
	}
} );
