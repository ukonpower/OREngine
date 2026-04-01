import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { ProjectResolver } from './plugins/ProjectResolver';
import { ResourceManager } from './plugins/ResourceManager';
import { ShaderMinifierLoader } from "./plugins/ShaderMinifierLoader";


const basePath = process.env.BASE_PATH ?? "";
const activeProject = process.env.ORENGINE_PROJECT || 'DemoProject';
const projectDir = process.env.ORENGINE_PROJECT_DIR
	? path.resolve( process.env.ORENGINE_PROJECT_DIR )
	: `./projects/${activeProject}`;
const projectResourcesDir = `${projectDir}/Resources`;
const builtinResourcesDir = `./packages/orengine/BuiltinResources`;

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
			'/ws': {
				target: 'ws://localhost:3001',
				ws: true,
			},
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
			componentsDir: `${builtinResourcesDir}/Components/`,
			outputFile: `${builtinResourcesDir}/_data/builtinComponentList.ts`,
			exportName: 'BUILTIN_COMPONENTLIST',
		} ),
		ResourceManager( {
			componentsDir: `${builtinResourcesDir}/Geometries/`,
			outputFile: `${builtinResourcesDir}/_data/builtinGeometryList.ts`,
			exportName: 'BUILTIN_GEOMETRYLIST',
		} ),
		ResourceManager( {
			componentsDir: `${projectResourcesDir}/Components/`,
			outputFile: `${projectResourcesDir}/_data/componentList.ts`,
			exportName: 'COMPONENTLIST',
		} ),
		ResourceManager( {
			componentsDir: `${projectResourcesDir}/Geometries/`,
			outputFile: `${projectResourcesDir}/_data/geometryList.ts`,
			exportName: 'GEOMETRYLIST',
		} ),
		ResourceManager( {
			componentsDir: `${projectResourcesDir}/Materials/`,
			outputFile: `${projectResourcesDir}/_data/materialList.ts`,
			exportName: 'MATERIALLIST',
			type: 'material',
			shadersDir: `${projectResourcesDir}/Shaders/`,
		} ),
		ResourceManager( {
			componentsDir: `${projectResourcesDir}/Textures/`,
			outputFile: `${projectResourcesDir}/_data/textureList.ts`,
			exportName: 'TEXTURELIST',
			type: 'texture',
			shadersDir: `${projectResourcesDir}/Shaders/`,
		} ),
		ResourceManager( {
			componentsDir: `${projectResourcesDir}/Shaders/`,
			outputFile: `${projectResourcesDir}/_data/shaderList.ts`,
			exportName: 'SHADERLIST',
			type: 'shader',
		} ),
	],
	define: {
		BASE_PATH: `"${basePath}"`,
	}
} );
