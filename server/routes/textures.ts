import express from 'express';
import * as fs from 'fs';
import * as path from 'path';

import { ProjectManager } from '../Project';


function validateName( name: string ): boolean {

	return !! name && ! name.includes( '..' ) && ! name.includes( '/' ) && ! name.includes( '\\' );

}

export const createTexturesRouter = ( pm: ProjectManager ) => {

	const router = express.Router();

	// GET: テクスチャ一覧
	router.get( '/projects/:project/textures', ( _req, res ) => {

		try {

			const resourcesDir = pm.getResourcesDir();
			const texturesDir = path.join( resourcesDir, 'Textures' );

			if ( ! fs.existsSync( texturesDir ) ) {

				res.json( [] );
				return;

			}

			const items: { name: string, config: any }[] = [];

			const scanDir = ( dir: string ) => {

				const entries = fs.readdirSync( dir, { withFileTypes: true } );

				entries.forEach( entry => {

					if ( entry.name.startsWith( '_' ) ) return;

					const fullPath = path.join( dir, entry.name );

					if ( entry.isDirectory() ) {

						scanDir( fullPath );

					} else if ( entry.isFile() && entry.name.endsWith( '.tex' ) ) {

						const name = path.basename( entry.name, '.tex' );
						const config = JSON.parse( fs.readFileSync( fullPath, 'utf-8' ) );
						items.push( { name, config } );

					}

				} );

			};

			scanDir( texturesDir );
			res.json( items );

		} catch ( err ) {

			console.error( 'Failed to list textures:', err );
			res.status( 500 ).json( { error: 'Failed to list textures' } );

		}

	} );

	// POST: テクスチャ同期
	router.post( '/projects/:project/textures/sync', ( req, res ) => {

		try {

			const resourcesDir = pm.getResourcesDir();
			const texturesDir = path.join( resourcesDir, 'Textures' );
			const names: string[] = req.body.names || [];

			if ( ! fs.existsSync( texturesDir ) ) {

				res.json( { deleted: [] } );
				return;

			}

			const deleted: string[] = [];
			const files = fs.readdirSync( texturesDir ).filter( f => f.endsWith( '.tex' ) );

			for ( const file of files ) {

				const name = path.basename( file, '.tex' );

				if ( ! names.includes( name ) ) {

					fs.unlinkSync( path.join( texturesDir, file ) );
					deleted.push( name );

				}

			}

			res.json( { deleted } );

		} catch ( err ) {

			console.error( 'Failed to sync textures:', err );
			res.status( 500 ).json( { error: 'Failed to sync textures' } );

		}

	} );

	// GET: テクスチャ詳細
	router.get( '/projects/:project/textures/:name', ( req, res ) => {

		try {

			const resourcesDir = pm.getResourcesDir();
			const texturesDir = path.join( resourcesDir, 'Textures' );
			const name = req.params.name;

			if ( ! validateName( name ) ) {

				res.status( 400 ).json( { error: 'Invalid name' } );
				return;

			}

			const texPath = path.join( texturesDir, `${name}.tex` );

			if ( ! fs.existsSync( texPath ) ) {

				res.status( 404 ).json( { error: 'Texture not found' } );
				return;

			}

			const config = JSON.parse( fs.readFileSync( texPath, 'utf-8' ) );
			res.json( { name, config } );

		} catch ( err ) {

			console.error( 'Failed to get texture:', err );
			res.status( 500 ).json( { error: 'Failed to get texture' } );

		}

	} );

	// POST: テクスチャ作成
	router.post( '/projects/:project/textures', ( req, res ) => {

		try {

			const resourcesDir = pm.getResourcesDir();
			const texturesDir = path.join( resourcesDir, 'Textures' );
			const { name, ...config } = req.body;

			if ( ! name || ! validateName( name ) ) {

				res.status( 400 ).json( { error: 'Invalid texture name' } );
				return;

			}

			if ( ! fs.existsSync( texturesDir ) ) {

				fs.mkdirSync( texturesDir, { recursive: true } );

			}

			const texPath = path.join( texturesDir, `${name}.tex` );

			if ( fs.existsSync( texPath ) ) {

				res.status( 409 ).json( { error: 'Texture already exists' } );
				return;

			}

			fs.writeFileSync( texPath, JSON.stringify( config, null, 2 ) );
			res.status( 201 ).json( { name, config } );

		} catch ( err ) {

			console.error( 'Failed to create texture:', err );
			res.status( 500 ).json( { error: 'Failed to create texture' } );

		}

	} );

	// PUT: テクスチャ更新
	router.put( '/projects/:project/textures/:name', ( req, res ) => {

		try {

			const resourcesDir = pm.getResourcesDir();
			const texturesDir = path.join( resourcesDir, 'Textures' );
			const name = req.params.name;

			if ( ! validateName( name ) ) {

				res.status( 400 ).json( { error: 'Invalid name' } );
				return;

			}

			if ( ! fs.existsSync( texturesDir ) ) {

				fs.mkdirSync( texturesDir, { recursive: true } );

			}

			const texPath = path.join( texturesDir, `${name}.tex` );
			fs.writeFileSync( texPath, JSON.stringify( req.body, null, 2 ) );
			res.json( { name, config: req.body } );

		} catch ( err ) {

			console.error( 'Failed to update texture:', err );
			res.status( 500 ).json( { error: 'Failed to update texture' } );

		}

	} );

	// DELETE: テクスチャ削除
	router.delete( '/projects/:project/textures/:name', ( req, res ) => {

		try {

			const resourcesDir = pm.getResourcesDir();
			const texturesDir = path.join( resourcesDir, 'Textures' );
			const name = req.params.name;

			if ( ! validateName( name ) ) {

				res.status( 400 ).json( { error: 'Invalid name' } );
				return;

			}

			const texPath = path.join( texturesDir, `${name}.tex` );

			if ( ! fs.existsSync( texPath ) ) {

				res.status( 404 ).json( { error: 'Texture not found' } );
				return;

			}

			fs.unlinkSync( texPath );
			res.json( { deleted: true } );

		} catch ( err ) {

			console.error( 'Failed to delete texture:', err );
			res.status( 500 ).json( { error: 'Failed to delete texture' } );

		}

	} );

	// GET: テクスチャファイルの絶対パス
	router.get( '/projects/:project/textures/:name/filepath', ( req, res ) => {

		try {

			const resourcesDir = pm.getResourcesDir();
			const texturesDir = path.join( resourcesDir, 'Textures' );
			const name = req.params.name;

			if ( ! validateName( name ) ) {

				res.status( 400 ).json( { error: 'Invalid name' } );
				return;

			}

			const texPath = path.join( texturesDir, `${name}.tex` );

			if ( ! fs.existsSync( texPath ) ) {

				res.status( 404 ).json( { error: 'Texture not found' } );
				return;

			}

			res.json( { absolutePath: texPath } );

		} catch ( err ) {

			console.error( 'Failed to get texture path:', err );
			res.status( 500 ).json( { error: 'Failed to get texture path' } );

		}

	} );

	return router;

};
