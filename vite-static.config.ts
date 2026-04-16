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
	: path.join( __dirname, `projects/${activeProject}` );
const projectResourcesDir = `${projectDir}/Resources`;
const builtinResourcesDir = `./packages/orengine/BuiltinResources`;

export default defineConfig( {
	root: 'src',
	base: basePath,
	publicDir: process.env.ORENGINE_PROJECT_DIR
		? path.join( path.resolve( process.env.ORENGINE_PROJECT_DIR ), 'public' )
		: 'public',
	build: {
		outDir: '../dist/static/',
		rollupOptions: {
			input: {
				main: path.resolve( __dirname, 'src/static.html' ),
			},
		},
	},
	resolve: {
		alias: {
			"glpower": path.join( __dirname, "packages/glpower/packages/glpower/src" ),
			"maxpower": path.join( __dirname, "packages/maxpower" ),
			"orengine": path.join( __dirname, "packages/orengine" ),
			"~project": projectDir,
			"~": path.join( __dirname, "src" ),
		},
	},
	css: {
		modules: {
			generateScopedName( name, filename, css ) {

				const dir = path.basename( path.dirname( filename ) );
				const hash = Buffer.from( css ).toString( 'base64' ).slice( 0, 5 );
				return `${dir}__${name}___${hash}`;

			},
		},
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
