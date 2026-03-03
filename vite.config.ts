import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { ProjectResolver } from './plugins/ProjectResolver';
import { ResourceManager } from './plugins/ResourceManager';
import { ShaderMinifierLoader } from "./plugins/ShaderMinifierLoader";


const basePath = process.env.BASE_PATH ?? "";

// https://vitejs.dev/config/
export default defineConfig( {
        root: 'src',
        base: basePath,
	server: {
		port: 3000,
		host: "0.0.0.0",
		watch: {
			ignored: [ "**/projects/**/scene.json", "**/projects/**/editor.json" ],
		},
		proxy: {
			'/api': 'http://localhost:3001',
		},
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
		ProjectResolver(),
		ShaderMinifierLoader(),
		ResourceManager( {
			componentsDir: './src/ts/Resources/Components/',
			outputFile: './src/ts/Resources/_data/componentList.ts',
		} ),
	],
	define: {
		BASE_PATH: `"${basePath}"`,
	}
} );
