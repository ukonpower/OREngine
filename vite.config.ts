import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { ResourceManager } from './plugins/ResourceManager';
import { ShaderMinifierLoader } from "./plugins/ShaderMinifierLoader";


const basePath = process.env.BASE_PATH ?? "";
const activeProject = process.env.ORENGINE_PROJECT || 'default';

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
			"~project": path.join( __dirname, `projects/${activeProject}` ),
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
		ShaderMinifierLoader(),
		ResourceManager( {
			componentsDir: `./projects/${activeProject}/components/`,
			outputFile: `./projects/${activeProject}/_generated/componentList.ts`,
		} ),
	],
	define: {
		BASE_PATH: `"${basePath}"`,
	}
} );
