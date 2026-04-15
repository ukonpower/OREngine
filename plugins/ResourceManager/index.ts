import * as fs from 'fs';
import * as path from 'path';

import * as chokidar from 'chokidar';
import { Plugin } from 'vite';

const writeEmptyExport = ( outFile: string, exportName: string, format: 'object' | 'array', arrayType?: string ) => {

	const outDir = path.dirname( outFile );

	if ( ! fs.existsSync( outDir ) ) {

		fs.mkdirSync( outDir, { recursive: true } );

	}

	const file = format === 'object'
		? `// @ts-nocheck\n\nexport const ${exportName}: {[key: string]: any} = {\n};\n`
		: `// @ts-nocheck\n\nexport const ${exportName}: ${arrayType}[] = [\n];\n`;

	const existing = fs.existsSync( outFile ) ? fs.readFileSync( outFile, 'utf-8' ) : '';

	if ( existing !== file ) {

		fs.writeFileSync( outFile, file );

	}

};

const updateComponentListForDir = ( compDir: string, outFile: string, exportName: string ) => {

	if ( ! fs.existsSync( compDir ) ) {

		writeEmptyExport( outFile, exportName, 'object' );
		return;

	}

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

				const existing = targetGroups[ dir ];

				if ( existing && typeof existing === 'object' && ! Array.isArray( existing ) ) {

					( existing as {[key: string]: unknown} )[ component.name ] = [ component.name, component.relativePath ];

				} else {

					targetGroups[ dir ] = [ component.name, component.relativePath ];

				}

				break;

			}

			let catArray = targetGroups[ dir ] = targetGroups[ dir ] || {};

			if ( Array.isArray( catArray ) ) {

				const existingComp = catArray;
				catArray = {};
				( catArray as {[key: string]: unknown} )[ existingComp[ 0 ] as string ] = existingComp;
				targetGroups[ dir ] = catArray;

			}

			targetGroups = catArray as {[key: string]: unknown};

		}

	} );

	let file = "// @ts-nocheck\n";

	components.forEach( ( component ) => {

		if ( component === undefined ) {

			return;

		}

		file += `import { ${component.name} } from '${component.relativePath}';\n`;

	} );

	file += "\n";

	file += `export const ${exportName}: {[key: string]: any} = {\n`;

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

	const existing = fs.existsSync( outFile ) ? fs.readFileSync( outFile, 'utf-8' ) : '';

	if ( existing !== file ) {

		fs.writeFileSync( outFile, file );

	}

};

const updateMaterialListForDir = ( matDir: string, shadersDir: string, outFile: string, exportName: string ) => {

	if ( ! fs.existsSync( matDir ) ) {

		writeEmptyExport( outFile, exportName, 'object' );
		return;

	}

	const outDir = path.dirname( outFile );

	if ( ! fs.existsSync( outDir ) ) {

		fs.mkdirSync( outDir, { recursive: true } );

	}

	const matFiles: { name: string, matPath: string, config: any, relativePath: string }[] = [];

	const scanDir = ( dir: string ) => {

		const entries = fs.readdirSync( dir, { withFileTypes: true } );

		entries.forEach( entry => {

			if ( entry.name.startsWith( '_' ) ) return;

			const fullPath = path.join( dir, entry.name );

			if ( entry.isDirectory() ) {

				scanDir( fullPath );

			} else if ( entry.isFile() && entry.name.endsWith( '.mat' ) ) {

				try {

					const name = path.basename( entry.name, '.mat' );
					const config = JSON.parse( fs.readFileSync( fullPath, 'utf-8' ) );
					const relativePath = path.relative( path.dirname( matDir ), fullPath ).replace( /\\/g, '/' );
					matFiles.push( { name, matPath: fullPath, config, relativePath } );

				} catch { /* skip incomplete file */ }

			}

		} );

	};

	scanDir( matDir );

	let file = "// @ts-nocheck\n\n";
	file += `export const ${exportName}: {[key: string]: any} = {\n`;

	matFiles.forEach( ( mat ) => {

		const config = { ...mat.config };

		if ( config.shader ) {

			const shaderName = config.shader;
			const shaderDir = path.join( shadersDir, shaderName );

			if ( fs.existsSync( path.join( shaderDir, 'index.vs' ) ) ) {

				config.vert = `${shaderName}/vert`;

			}

			if ( fs.existsSync( path.join( shaderDir, 'index.fs' ) ) ) {

				config.frag = `${shaderName}/frag`;

			}

			delete config.shader;

		}

		file += `\t${mat.name}: ${JSON.stringify( config )},\n`;

	} );

	file += "};\n";

	const existing = fs.existsSync( outFile ) ? fs.readFileSync( outFile, 'utf-8' ) : '';

	if ( existing !== file ) {

		fs.writeFileSync( outFile, file );

	}

};

const updateShaderListForDir = ( shadersDir: string, outFile: string, exportName: string ) => {

	if ( ! fs.existsSync( shadersDir ) ) {

		writeEmptyExport( outFile, exportName, 'array', '{name: string, source: string}' );
		return;

	}

	const outDir = path.dirname( outFile );

	if ( ! fs.existsSync( outDir ) ) {

		fs.mkdirSync( outDir, { recursive: true } );

	}

	const shaderItems: { name: string, varName: string, relPath: string }[] = [];

	const entries = fs.readdirSync( shadersDir, { withFileTypes: true } );

	entries.forEach( entry => {

		if ( ! entry.isDirectory() || entry.name.startsWith( '_' ) ) return;

		const shaderDir = path.join( shadersDir, entry.name );
		const vertPath = path.join( shaderDir, 'index.vs' );
		const fragPath = path.join( shaderDir, 'index.fs' );

		if ( fs.existsSync( vertPath ) ) {

			shaderItems.push( {
				name: `${entry.name}/vert`,
				varName: `${entry.name}Vert`,
				relPath: path.relative( path.dirname( outFile ), vertPath ).replace( /\\/g, '/' ),
			} );

		}

		if ( fs.existsSync( fragPath ) ) {

			shaderItems.push( {
				name: `${entry.name}/frag`,
				varName: `${entry.name}Frag`,
				relPath: path.relative( path.dirname( outFile ), fragPath ).replace( /\\/g, '/' ),
			} );

		}

	} );

	let file = "// @ts-nocheck\n";

	shaderItems.forEach( item => {

		file += `import ${item.varName} from '${item.relPath}';\n`;

	} );

	file += "\n";
	file += `export const ${exportName}: {name: string, source: string}[] = [\n`;

	shaderItems.forEach( item => {

		file += `\t{ name: ${JSON.stringify( item.name )}, source: ${item.varName} },\n`;

	} );

	file += "];\n";

	const existing = fs.existsSync( outFile ) ? fs.readFileSync( outFile, 'utf-8' ) : '';

	if ( existing !== file ) {

		fs.writeFileSync( outFile, file );

	}

};

const updateTextureListForDir = ( texDir: string, shadersDir: string, outFile: string, exportName: string ) => {

	if ( ! fs.existsSync( texDir ) ) {

		writeEmptyExport( outFile, exportName, 'array', '{name: string, frag?: string, resolution: number[], filter?: string, updateEveryFrame?: boolean}' );
		return;

	}

	const outDir = path.dirname( outFile );

	if ( ! fs.existsSync( outDir ) ) {

		fs.mkdirSync( outDir, { recursive: true } );

	}

	const texFiles: { name: string, config: any, relativePath: string }[] = [];

	const scanDir = ( dir: string ) => {

		const entries = fs.readdirSync( dir, { withFileTypes: true } );

		entries.forEach( entry => {

			if ( entry.name.startsWith( '_' ) ) return;

			const fullPath = path.join( dir, entry.name );

			if ( entry.isDirectory() ) {

				scanDir( fullPath );

			} else if ( entry.isFile() && entry.name.endsWith( '.tex' ) ) {

				try {

					const name = path.basename( entry.name, '.tex' );
					const config = JSON.parse( fs.readFileSync( fullPath, 'utf-8' ) );
					texFiles.push( { name, config, relativePath: path.relative( path.dirname( outFile ), fullPath ).replace( /\\/g, '/' ) } );

				} catch { /* skip incomplete file */ }

			}

		} );

	};

	scanDir( texDir );

	let file = "// @ts-nocheck\n\n";

	file += `export const ${exportName}: {name: string, frag?: string, resolution: number[], filter?: string, updateEveryFrame?: boolean}[] = [\n`;

	texFiles.forEach( ( tex ) => {

		const fragName = tex.config.frag || undefined;

		const res = tex.config.resolution || [ 1024, 1024 ];
		const filter = tex.config.filter ? `, filter: ${JSON.stringify( tex.config.filter )}` : '';
		const update = tex.config.updateEveryFrame ? `, updateEveryFrame: true` : '';
		file += `\t{ name: ${JSON.stringify( tex.name )}, frag: ${fragName ? JSON.stringify( fragName ) : 'undefined'}, resolution: ${JSON.stringify( res )}${filter}${update} },\n`;

	} );

	file += "];\n";

	const existing = fs.existsSync( outFile ) ? fs.readFileSync( outFile, 'utf-8' ) : '';

	if ( existing !== file ) {

		fs.writeFileSync( outFile, file );

	}

};

const updateAllProjects = ( projectsDir: string ) => {

	if ( ! fs.existsSync( projectsDir ) ) return;

	const entries = fs.readdirSync( projectsDir, { withFileTypes: true } );

	entries
		.filter( ( e ) => e.isDirectory() && ! e.name.startsWith( '.' ) )
		.forEach( ( e ) => {

			const compDir = path.join( projectsDir, e.name, 'components' );
			const outFile = path.join( projectsDir, e.name, '_generated', 'componentList.ts' );

			updateComponentListForDir( compDir, outFile, 'COMPONENTLIST' );

		} );

};

export const ResourceManager = ( options?: {
	componentsDir?: string;
	outputFile?: string;
	projectsDir?: string;
	exportName?: string;
	type?: 'class' | 'material' | 'shader' | 'texture';
	shadersDir?: string;
} ): Plugin => {

	const scanType = options?.type || 'class';
	const exportName = options?.exportName || "COMPONENTLIST";

	const useProjectsDir = !! options?.projectsDir;
	const componentsDir = options?.componentsDir || "./src/ts/Resources/Components/";
	const componentListFile = options?.outputFile || "./src/ts/Resources/_data/componentList.ts";
	const shadersDir = options?.shadersDir || "";

	let watcher: chokidar.FSWatcher | null = null;

	const update = () => {

		if ( scanType === 'material' ) {

			updateMaterialListForDir( componentsDir, shadersDir, componentListFile, exportName );

		} else if ( scanType === 'shader' ) {

			updateShaderListForDir( componentsDir, componentListFile, exportName );

		} else if ( scanType === 'texture' ) {

			updateTextureListForDir( componentsDir, shadersDir, componentListFile, exportName );

		} else {

			updateComponentListForDir( componentsDir, componentListFile, exportName );

		}

	};

	return ( {
		name: `ResourceManager-${exportName}`,
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

					updateComponentListForDir( compDir, outFile, 'COMPONENTLIST' );

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

				const watchDirs = [ componentsDir ];

				if ( ( scanType === 'material' || scanType === 'texture' ) && shadersDir && fs.existsSync( shadersDir ) ) {

					watchDirs.push( shadersDir );

				}

				watcher = chokidar.watch( watchDirs, {
					ignored: /[\\/\\]\./,
					persistent: true
				} );

				const onChange = () => update();

				watcher.on( 'ready', () => {

					watcher!.on( 'add', onChange );
					watcher!.on( 'change', ( p ) => {

						if ( scanType === 'material' ) {

							if ( p.endsWith( '.mat' ) || p.endsWith( '.vs' ) || p.endsWith( '.fs' ) ) onChange();

						} else if ( scanType === 'texture' ) {

							if ( p.endsWith( '.tex' ) || p.endsWith( '.fs' ) ) onChange();

						} else if ( scanType === 'shader' ) {

							onChange();

						} else {

							if ( p.endsWith( 'index.ts' ) ) onChange();

						}

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

				update();

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
