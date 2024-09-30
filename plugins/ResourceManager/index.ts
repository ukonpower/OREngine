
import fs from 'fs';
import path from 'path';

import chokidar from 'chokidar';
import { Plugin } from 'vite';


let watcher: chokidar.FSWatcher | null = null;

const componentsDir = "./src/ts/gl/Resources/Components/";
const componentListFile = "./src/ts/gl/Resources/_data/componentList.ts";

const updateComponentList = ( ) => {

	const getIndexTsFiles = ( dir: string, fileList:string[] = [] ) => {

		const files = fs.readdirSync( dir );

		files.forEach( file => {

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

	const fileList = getIndexTsFiles( componentsDir );

	const components = fileList.map( ( file ) => {

		const fileContent = fs.readFileSync( file, 'utf-8' );

		const lines = fileContent.split( '\n' );

		const componentClassName = lines.find( ( line ) => line.startsWith( 'export class' ) );

		if ( componentClassName === undefined ) {

			return;

		}

		const componentClassNameArray = componentClassName.split( ' ' );

		const componentName = componentClassNameArray[ 2 ];
		componentsDir;
		return {

			name: componentName,
			path: path.relative( path.dirname( componentsDir ), file ).replace( /\\/g, '/' ),
			relativePath: path.relative( path.dirname( componentListFile ), file ).replace( /\\/g, '/' ),


		};

	} );

	// componentlist

	const componentCatGroups: {[category: string]: any} = {};

	components.forEach( ( component ) => {

		if ( component === undefined ) {

			return;

		}

		const splitPath = component.path.split( '/' );

		let targetGropus = componentCatGroups;

		for ( let i = 0; i < splitPath.length; i ++ ) {

			const dir = splitPath[ i ];

			if ( i == splitPath.length - 2 ) {

				targetGropus[ dir ] = [ component.name, component.relativePath ];

				break;

			}

			const catArray = targetGropus[ dir ] = targetGropus[ dir ] || {};

			targetGropus = catArray;

		}


	} );

	// write file

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

	const _ = ( obj: any ) => {

		indent += "\t";

		Object.keys( obj ).forEach( ( key ) => {

			const value = obj[ key ];

			if ( Array.isArray( value ) ) {

				file += `${indent}${value[ 0 ]},\n`;

			} else {

				file += `${indent}${key}: {\n`;

				_( value );

				file += `${indent}},\n`;

			}

		} );

		indent = indent.slice( 0, - 1 );

	};

	_( componentCatGroups[ "Components" ] );

	file += "};\n";

	fs.writeFileSync( componentListFile, file );

};

export const ResourceManager = (): Plugin => ( {
	name: 'ResourceManager',
	enforce: 'pre',
	configureServer: ( server ) => {

		if ( watcher !== null ) {

			watcher.close();

		}

		watcher = chokidar.watch( "./src/ts/gl/Resources/Components/", {
			ignored: /[\\/\\]\./,
			persistent: true
		} );

		const onAddFile = ( ) => {

			updateComponentList();

		};

		const onUnlinkFile = ( ) => {

			updateComponentList();

		};

		const onChangeFile = ( path: string ) => {

			if ( path.endsWith( 'index.ts' ) ) {

				updateComponentList();

			}

		};

		watcher.on( 'ready', () => {

			watcher.on( 'add', onAddFile );

			watcher.on( 'change', onChangeFile );

			watcher.on( 'unlink', onUnlinkFile );

			watcher.on( 'error', function ( err ) {

				console.log( `Watcher error: ${err}` );

			} );

		} );


	},
	buildStart: () => {

		updateComponentList();

	},
	buildEnd: () => {

		if ( watcher ) {

			watcher.close();
			watcher = null;

		}

	},
} );
