import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

export const componentsRouter = express.Router();

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );
const COMPONENTS_DIR = path.resolve( __dirname, '../../src/ts/Resources/Components' );

function validateSegment( segment: string ): boolean {

	return !! segment && ! segment.includes( '..' ) && ! segment.includes( '/' ) && ! segment.includes( '\\' );

}

function resolveComponentPath( relativePath: string ): string | null {

	const segments = relativePath.split( '/' ).filter( s => s.length > 0 );

	for ( const seg of segments ) {

		if ( ! validateSegment( seg ) ) return null;

	}

	const resolved = path.resolve( COMPONENTS_DIR, ...segments );

	if ( ! resolved.startsWith( path.resolve( COMPONENTS_DIR ) ) ) return null;

	return resolved;

}

type ComponentTreeNode = {
	name: string;
	path: string;
	isComponent: boolean;
	children: ComponentTreeNode[];
};

function scanComponentTree( dir: string, relativePath: string = '' ): ComponentTreeNode[] {

	if ( ! fs.existsSync( dir ) ) return [];

	const entries = fs.readdirSync( dir, { withFileTypes: true } )
		.filter( e => e.isDirectory() && ! e.name.startsWith( '_' ) )
		.sort( ( a, b ) => a.name.localeCompare( b.name ) );

	const result: ComponentTreeNode[] = [];

	for ( const entry of entries ) {

		const entryPath = path.join( dir, entry.name );
		const entryRelative = relativePath ? `${relativePath}/${entry.name}` : entry.name;
		const hasIndex = fs.existsSync( path.join( entryPath, 'index.ts' ) );
		const children = scanComponentTree( entryPath, entryRelative );

		result.push( {
			name: entry.name,
			path: entryRelative,
			isComponent: hasIndex,
			children,
		} );

	}

	return result;

}

// GET: コンポーネントツリー一覧
componentsRouter.get( '/components', ( _req, res ) => {

	try {

		const tree = scanComponentTree( COMPONENTS_DIR );
		res.json( tree );

	} catch ( err ) {

		console.error( 'Failed to list components:', err );
		res.status( 500 ).json( { error: 'Failed to list components' } );

	}

} );

// POST: コンポーネント作成
componentsRouter.post( '/components', ( req, res ) => {

	try {

		const { dirPath, componentName } = req.body;

		if ( ! componentName || ! validateSegment( componentName ) ) {

			res.status( 400 ).json( { error: 'Invalid component name' } );
			return;

		}

		let targetDir = COMPONENTS_DIR;

		if ( dirPath && dirPath.trim() ) {

			const resolved = resolveComponentPath( dirPath );

			if ( ! resolved ) {

				res.status( 400 ).json( { error: 'Invalid directory path' } );
				return;

			}

			targetDir = resolved;

		}

		const componentDir = path.join( targetDir, componentName );

		if ( fs.existsSync( componentDir ) ) {

			res.status( 409 ).json( { error: 'Component already exists' } );
			return;

		}

		fs.mkdirSync( componentDir, { recursive: true } );

		const template = `import * as MXP from 'maxpower';

export class ${componentName} extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

	}

}
`;

		fs.writeFileSync( path.join( componentDir, 'index.ts' ), template );

		const relativePath = dirPath ? `${dirPath}/${componentName}` : componentName;

		res.status( 201 ).json( {
			componentName,
			path: relativePath,
		} );

	} catch ( err ) {

		console.error( 'Failed to create component:', err );
		res.status( 500 ).json( { error: 'Failed to create component' } );

	}

} );

// DELETE: コンポーネント削除
componentsRouter.delete( '/components/:componentPath(*)', ( req, res ) => {

	try {

		const componentPath = req.params.componentPath;
		const resolved = resolveComponentPath( componentPath );

		if ( ! resolved ) {

			res.status( 400 ).json( { error: 'Invalid path' } );
			return;

		}

		if ( ! fs.existsSync( resolved ) ) {

			res.status( 404 ).json( { error: 'Component not found' } );
			return;

		}

		fs.rmSync( resolved, { recursive: true } );

		// 親ディレクトリが空なら削除
		const parentDir = path.dirname( resolved );

		if ( parentDir !== path.resolve( COMPONENTS_DIR ) && fs.existsSync( parentDir ) ) {

			const remaining = fs.readdirSync( parentDir );

			if ( remaining.length === 0 ) {

				fs.rmSync( parentDir, { recursive: true } );

			}

		}

		res.json( { deleted: true } );

	} catch ( err ) {

		console.error( 'Failed to delete component:', err );
		res.status( 500 ).json( { error: 'Failed to delete component' } );

	}

} );

// GET: コンポーネントファイルの絶対パス（外部エディタ用）
componentsRouter.get( '/components/:componentPath(*)/filepath', ( req, res ) => {

	try {

		const componentPath = req.params.componentPath;
		const resolved = resolveComponentPath( componentPath );

		if ( ! resolved ) {

			res.status( 400 ).json( { error: 'Invalid path' } );
			return;

		}

		const filePath = path.join( resolved, 'index.ts' );

		if ( ! fs.existsSync( filePath ) ) {

			res.status( 404 ).json( { error: 'File not found' } );
			return;

		}

		res.json( { absolutePath: filePath } );

	} catch ( err ) {

		console.error( 'Failed to get component path:', err );
		res.status( 500 ).json( { error: 'Failed to get component path' } );

	}

} );
