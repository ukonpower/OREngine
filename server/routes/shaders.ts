import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

export const shadersRouter = express.Router();

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );
const SHADERS_DIR = path.resolve( __dirname, '../../src/ts/Resources/Shaders' );

function validateName( name: string ): boolean {

	return !! name && ! name.includes( '..' ) && ! name.includes( '/' ) && ! name.includes( '\\' );

}

const VERT_TEMPLATE = `void main() {
	gl_Position = vec4( 0.0, 0.0, 0.0, 1.0 );
}
`;

const FRAG_TEMPLATE = `void main() {
	outColor0 = vec4( 1.0, 1.0, 1.0, 1.0 );
}
`;

// GET: シェーダー一覧
shadersRouter.get( '/shaders', ( _req, res ) => {

	try {

		if ( ! fs.existsSync( SHADERS_DIR ) ) {

			res.json( [] );
			return;

		}

		const entries = fs.readdirSync( SHADERS_DIR, { withFileTypes: true } );
		const items: { name: string, hasVert: boolean, hasFrag: boolean }[] = [];

		entries.forEach( entry => {

			if ( ! entry.isDirectory() || entry.name.startsWith( '_' ) ) return;

			const shaderDir = path.join( SHADERS_DIR, entry.name );
			const hasVert = fs.existsSync( path.join( shaderDir, 'index.vs' ) );
			const hasFrag = fs.existsSync( path.join( shaderDir, 'index.fs' ) );

			if ( hasVert || hasFrag ) {

				items.push( { name: entry.name, hasVert, hasFrag } );

			}

		} );

		res.json( items );

	} catch ( err ) {

		console.error( 'Failed to list shaders:', err );
		res.status( 500 ).json( { error: 'Failed to list shaders' } );

	}

} );

// POST: シェーダー作成
shadersRouter.post( '/shaders', ( req, res ) => {

	try {

		const { name } = req.body;

		if ( ! name || ! validateName( name ) ) {

			res.status( 400 ).json( { error: 'Invalid shader name' } );
			return;

		}

		const shaderDir = path.join( SHADERS_DIR, name );

		if ( fs.existsSync( shaderDir ) ) {

			res.status( 409 ).json( { error: 'Shader already exists' } );
			return;

		}

		fs.mkdirSync( shaderDir, { recursive: true } );
		fs.writeFileSync( path.join( shaderDir, 'index.vs' ), VERT_TEMPLATE );
		fs.writeFileSync( path.join( shaderDir, 'index.fs' ), FRAG_TEMPLATE );

		res.status( 201 ).json( { name, hasVert: true, hasFrag: true } );

	} catch ( err ) {

		console.error( 'Failed to create shader:', err );
		res.status( 500 ).json( { error: 'Failed to create shader' } );

	}

} );

// DELETE: シェーダー削除
shadersRouter.delete( '/shaders/:name', ( req, res ) => {

	try {

		const name = req.params.name;

		if ( ! validateName( name ) ) {

			res.status( 400 ).json( { error: 'Invalid name' } );
			return;

		}

		const shaderDir = path.join( SHADERS_DIR, name );

		if ( ! fs.existsSync( shaderDir ) ) {

			res.status( 404 ).json( { error: 'Shader not found' } );
			return;

		}

		fs.rmSync( shaderDir, { recursive: true } );
		res.json( { deleted: true } );

	} catch ( err ) {

		console.error( 'Failed to delete shader:', err );
		res.status( 500 ).json( { error: 'Failed to delete shader' } );

	}

} );

// GET: シェーダーディレクトリの絶対パス
shadersRouter.get( '/shaders/:name/filepath', ( req, res ) => {

	try {

		const name = req.params.name;

		if ( ! validateName( name ) ) {

			res.status( 400 ).json( { error: 'Invalid name' } );
			return;

		}

		const shaderDir = path.join( SHADERS_DIR, name );

		if ( ! fs.existsSync( shaderDir ) ) {

			res.status( 404 ).json( { error: 'Shader not found' } );
			return;

		}

		res.json( { absolutePath: shaderDir } );

	} catch ( err ) {

		console.error( 'Failed to get shader path:', err );
		res.status( 500 ).json( { error: 'Failed to get shader path' } );

	}

} );
