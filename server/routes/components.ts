import * as fs from 'fs';
import * as path from 'path';

import express from 'express';

import { ProjectManager } from '../Project';

function validateSegment( segment: string ): boolean {

	return !! segment && ! segment.includes( '..' ) && ! segment.includes( '/' ) && ! segment.includes( '\\' );

}

function resolveComponentPath( componentsDir: string, relativePath: string ): string | null {

	const segments = relativePath.split( '/' ).filter( s => s.length > 0 );

	for ( const seg of segments ) {

		if ( ! validateSegment( seg ) ) return null;

	}

	const resolved = path.resolve( componentsDir, ...segments );

	if ( ! resolved.startsWith( path.resolve( componentsDir ) ) ) return null;

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

export const createComponentsRouter = ( pm: ProjectManager ) => {

	const router = express.Router();

	// GET: コンポーネントツリー一覧
	router.get( '/projects/:project/components', ( _req, res ) => {

		try {

			const resourcesDir = pm.getResourcesDir();
			const componentsDir = path.join( resourcesDir, 'Components' );
			const tree = scanComponentTree( componentsDir );
			res.json( tree );

		} catch ( err ) {

			console.error( 'Failed to list components:', err );
			res.status( 500 ).json( { error: 'Failed to list components' } );

		}

	} );

	// POST: コンポーネント作成
	router.post( '/projects/:project/components', ( req, res ) => {

		try {

			const resourcesDir = pm.getResourcesDir();
			const componentsDir = path.join( resourcesDir, 'Components' );
			const { dirPath, componentName } = req.body;

			if ( ! componentName || ! validateSegment( componentName ) ) {

				res.status( 400 ).json( { error: 'Invalid component name' } );
				return;

			}

			let targetDir = componentsDir;

			if ( dirPath && dirPath.trim() ) {

				const resolved = resolveComponentPath( componentsDir, dirPath );

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
	router.delete( '/projects/:project/components/:componentPath(*)', ( req, res ) => {

		try {

			const resourcesDir = pm.getResourcesDir();
			const componentsDir = path.join( resourcesDir, 'Components' );
			const componentPath = req.params[ "componentPath(*)" ];
			const resolved = resolveComponentPath( componentsDir, componentPath );

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

			if ( parentDir !== path.resolve( componentsDir ) && fs.existsSync( parentDir ) ) {

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
	router.get( '/projects/:project/components/:componentPath(*)/filepath', ( req, res ) => {

		try {

			const resourcesDir = pm.getResourcesDir();
			const componentsDir = path.join( resourcesDir, 'Components' );
			const componentPath = req.params[ "componentPath(*)" ];
			const resolved = resolveComponentPath( componentsDir, componentPath );

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

	return router;

};
