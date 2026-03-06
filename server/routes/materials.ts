import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

export const materialsRouter = express.Router();

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );
const MATERIALS_DIR = path.resolve( __dirname, '../../src/ts/Resources/Materials' );

function validateName( name: string ): boolean {

	return !! name && ! name.includes( '..' ) && ! name.includes( '/' ) && ! name.includes( '\\' );

}

// GET: マテリアル一覧
materialsRouter.get( '/materials', ( _req, res ) => {

	try {

		if ( ! fs.existsSync( MATERIALS_DIR ) ) {

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

				} else if ( entry.isFile() && entry.name.endsWith( '.mat' ) ) {

					const name = path.basename( entry.name, '.mat' );
					const config = JSON.parse( fs.readFileSync( fullPath, 'utf-8' ) );
					items.push( { name, config } );

				}

			} );

		};

		scanDir( MATERIALS_DIR );
		res.json( items );

	} catch ( err ) {

		console.error( 'Failed to list materials:', err );
		res.status( 500 ).json( { error: 'Failed to list materials' } );

	}

} );

// GET: マテリアル詳細
materialsRouter.get( '/materials/:name', ( req, res ) => {

	try {

		const name = req.params.name;

		if ( ! validateName( name ) ) {

			res.status( 400 ).json( { error: 'Invalid name' } );
			return;

		}

		const matPath = path.join( MATERIALS_DIR, `${name}.mat` );

		if ( ! fs.existsSync( matPath ) ) {

			res.status( 404 ).json( { error: 'Material not found' } );
			return;

		}

		const config = JSON.parse( fs.readFileSync( matPath, 'utf-8' ) );
		res.json( { name, config } );

	} catch ( err ) {

		console.error( 'Failed to get material:', err );
		res.status( 500 ).json( { error: 'Failed to get material' } );

	}

} );

// POST: マテリアル作成
materialsRouter.post( '/materials', ( req, res ) => {

	try {

		const { name, ...config } = req.body;

		if ( ! name || ! validateName( name ) ) {

			res.status( 400 ).json( { error: 'Invalid material name' } );
			return;

		}

		if ( ! fs.existsSync( MATERIALS_DIR ) ) {

			fs.mkdirSync( MATERIALS_DIR, { recursive: true } );

		}

		const matPath = path.join( MATERIALS_DIR, `${name}.mat` );

		if ( fs.existsSync( matPath ) ) {

			res.status( 409 ).json( { error: 'Material already exists' } );
			return;

		}

		fs.writeFileSync( matPath, JSON.stringify( config, null, 2 ) );
		res.status( 201 ).json( { name, config } );

	} catch ( err ) {

		console.error( 'Failed to create material:', err );
		res.status( 500 ).json( { error: 'Failed to create material' } );

	}

} );

// PUT: マテリアル更新
materialsRouter.put( '/materials/:name', ( req, res ) => {

	try {

		const name = req.params.name;

		if ( ! validateName( name ) ) {

			res.status( 400 ).json( { error: 'Invalid name' } );
			return;

		}

		const matPath = path.join( MATERIALS_DIR, `${name}.mat` );

		if ( ! fs.existsSync( matPath ) ) {

			res.status( 404 ).json( { error: 'Material not found' } );
			return;

		}

		fs.writeFileSync( matPath, JSON.stringify( req.body, null, 2 ) );
		res.json( { name, config: req.body } );

	} catch ( err ) {

		console.error( 'Failed to update material:', err );
		res.status( 500 ).json( { error: 'Failed to update material' } );

	}

} );

// DELETE: マテリアル削除
materialsRouter.delete( '/materials/:name', ( req, res ) => {

	try {

		const name = req.params.name;

		if ( ! validateName( name ) ) {

			res.status( 400 ).json( { error: 'Invalid name' } );
			return;

		}

		const matPath = path.join( MATERIALS_DIR, `${name}.mat` );

		if ( ! fs.existsSync( matPath ) ) {

			res.status( 404 ).json( { error: 'Material not found' } );
			return;

		}

		fs.unlinkSync( matPath );
		res.json( { deleted: true } );

	} catch ( err ) {

		console.error( 'Failed to delete material:', err );
		res.status( 500 ).json( { error: 'Failed to delete material' } );

	}

} );

// GET: マテリアルファイルの絶対パス
materialsRouter.get( '/materials/:name/filepath', ( req, res ) => {

	try {

		const name = req.params.name;

		if ( ! validateName( name ) ) {

			res.status( 400 ).json( { error: 'Invalid name' } );
			return;

		}

		const matPath = path.join( MATERIALS_DIR, `${name}.mat` );

		if ( ! fs.existsSync( matPath ) ) {

			res.status( 404 ).json( { error: 'Material not found' } );
			return;

		}

		res.json( { absolutePath: matPath } );

	} catch ( err ) {

		console.error( 'Failed to get material path:', err );
		res.status( 500 ).json( { error: 'Failed to get material path' } );

	}

} );
