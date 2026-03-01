import * as fs from 'fs';
import * as path from 'path';

import * as chokidar from 'chokidar';
import { Plugin } from 'vite';

let watcher: chokidar.FSWatcher | null = null;

const updateComponentListForDir = ( compDir: string, outFile: string ) => {

	if ( ! fs.existsSync( compDir ) ) return;

	const outDir = path.dirname( outFile );

	if ( ! fs.existsSync( outDir ) ) {

		fs.mkdirSync( outDir, { recursive: true } );

	}

	const getIndexTsFiles = ( dir: string, fileList:string[] = [] ) => {

		const files = fs.readdirSync( dir );

		files.forEach( file => {

			if ( file.startsWith( '_' ) && fs.statSync( path.join( dir, file ) ).isDirectory() ) {

				return;

			}

			const filePath = path.join( dir, file );
			const stat = fs.statSync( filePath );

			if ( stat.isDirectory() ) {

				getIndexTsFiles( filePath, fileList );

			} else if ( stat.isFile() && file === 'index.ts' ) {

				fileList.push( filePath );

			}

		} );

		return fileList;

	};

	const fileList = getIndexTsFiles( compDir );

	const components = fileList.map( ( file ) => {

		const fileContent = fs.readFileSync( file, 'utf-8' );

		const lines = fileContent.split( '\n' );

		const componentClassName = lines.find( ( line ) => line.startsWith( 'export class' ) );

		if ( componentClassName === undefined ) {

			return;

		}

		const componentClassNameArray = componentClassName.split( /\s|</ );

		const componentName = componentClassNameArray[ 2 ];

		return {

			name: componentName,
			path: path.relative( path.dirname( compDir ), file ).replace( /\\/g, '/' ),
			relativePath: path.relative( path.dirname( outFile ), file ).replace( /\\/g, '/' ),

		};

	} );

	const componentCatGroups: {[category: string]: unknown} = {};

	components.forEach( ( component ) => {

		if ( component === undefined ) {

			return;

		}

		const splitPath = component.path.split( '/' );

		let targetGroups = componentCatGroups as {[key: string]: unknown};

		for ( let i = 0; i < splitPath.length; i ++ ) {

			const dir = splitPath[ i ];

			if ( i == splitPath.length - 2 ) {

				targetGroups[ dir ] = [ component.name, component.relativePath ];

				break;

			}

			const catArray = targetGroups[ dir ] = targetGroups[ dir ] || {};

			targetGroups = catArray as {[key: string]: unknown};

		}

	} );

	let file = "";

	components.forEach( ( component ) => {

		if ( component === undefined ) {

			return;

		}

		file += `import { ${component.name} } from '${component.relativePath}';\n`;

	} );

	file += "\n";

	file += "export const COMPONENTLIST: {[key: string]: any} = {\n";

	let indent = "";

	const writeObj = ( obj: {[key: string]: unknown} ) => {

		indent += "\t";

		Object.keys( obj ).forEach( ( key ) => {

			const value = obj[ key ];

			if ( Array.isArray( value ) ) {

				file += `${indent}${value[ 0 ]},\n`;

			} else {

				file += `${indent}${key}: {\n`;

				writeObj( value as {[key: string]: unknown} );

				file += `${indent}},\n`;

			}

		} );

		indent = indent.slice( 0, - 1 );

	};

	const rootKey = path.basename( compDir.replace( /\/+$/, '' ) );
	const rootObj = componentCatGroups[ rootKey ];

	if ( rootObj && typeof rootObj === 'object' && ! Array.isArray( rootObj ) ) {

		writeObj( rootObj as {[key: string]: unknown} );

	}

	file += "};\n";

	fs.writeFileSync( outFile, file );

};

const updateAllProjects = ( projectsDir: string ) => {

	if ( ! fs.existsSync( projectsDir ) ) return;

	const entries = fs.readdirSync( projectsDir, { withFileTypes: true } );

	entries
		.filter( ( e ) => e.isDirectory() && ! e.name.startsWith( '.' ) )
		.forEach( ( e ) => {

			const compDir = path.join( projectsDir, e.name, 'components' );
			const outFile = path.join( projectsDir, e.name, '_generated', 'componentList.ts' );

			updateComponentListForDir( compDir, outFile );

		} );

};

export const ResourceManager = ( options?: {
	componentsDir?: string;
	outputFile?: string;
	projectsDir?: string;
} ): Plugin => {

	const useProjectsDir = !! options?.projectsDir;
	let componentsDir = options?.componentsDir || "./src/ts/Resources/Components/";
	let componentListFile = options?.outputFile || "./src/ts/Resources/_data/componentList.ts";

	return ( {
		name: 'ResourceManager',
		enforce: 'pre',
		configureServer: () => {

			if ( watcher !== null ) {

				watcher.close();

			}

			if ( useProjectsDir ) {

				const projectsDir = options!.projectsDir!;

				updateAllProjects( projectsDir );

				watcher = chokidar.watch( path.join( projectsDir, '*/components' ), {
					ignored: /[\\/\\]\./,
					persistent: true,
				} );

				const onFileChange = ( filePath: string ) => {

					const relative = path.relative( projectsDir, filePath );
					const projectName = relative.split( path.sep )[ 0 ];

					const compDir = path.join( projectsDir, projectName, 'components' );
					const outFile = path.join( projectsDir, projectName, '_generated', 'componentList.ts' );

					updateComponentListForDir( compDir, outFile );

				};

				watcher.on( 'ready', () => {

					watcher!.on( 'add', onFileChange );
					watcher!.on( 'change', ( p ) => {

						if ( p.endsWith( 'index.ts' ) ) onFileChange( p );

					} );
					watcher!.on( 'unlink', onFileChange );
					watcher!.on( 'error', ( err ) => console.log( `Watcher error: ${err}` ) );

				} );

			} else {

				watcher = chokidar.watch( componentsDir, {
					ignored: /[\\/\\]\./,
					persistent: true
				} );

				const onChange = () => updateComponentListForDir( componentsDir, componentListFile );

				watcher.on( 'ready', () => {

					watcher!.on( 'add', onChange );
					watcher!.on( 'change', ( p ) => {

						if ( p.endsWith( 'index.ts' ) ) onChange();

					} );
					watcher!.on( 'unlink', onChange );
					watcher!.on( 'error', ( err ) => console.log( `Watcher error: ${err}` ) );

				} );

			}

		},
		buildStart: () => {

			if ( useProjectsDir ) {

				updateAllProjects( options!.projectsDir! );

			} else {

				updateComponentListForDir( componentsDir, componentListFile );

			}

		},
		buildEnd: () => {

			if ( watcher ) {

				watcher.close();
				watcher = null;

			}

		},
	} );

};
