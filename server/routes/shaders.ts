import express from 'express';
import * as fs from 'fs';
import * as path from 'path';

import { ProjectManager } from '../Project';


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

const VERT_TEMPLATE_MESH = `#include <common>
#include <vert_h>

void main( void ) {

	#include <vert_in>

	#include <vert_out>

}
`;

const FRAG_TEMPLATE_MESH = `#include <common>
#include <packing>
#include <frag_h>

void main( void ) {

	#include <frag_in>

	outColor = vec4( 1.0 );

	#include <frag_out>

}
`;

const FRAG_TEMPLATE_TEXTURE = `#include <common>
#include <frag_h>

layout ( location = 0 ) out vec4 outColor;

void main( void ) {

	outColor = vec4( vUv, 0.0, 1.0 );

}
`;

function getTemplates( template?: string ): { vert: string; frag: string } {

	switch ( template ) {

	case 'mesh':
		return { vert: VERT_TEMPLATE_MESH, frag: FRAG_TEMPLATE_MESH };

	case 'texture':
		return { vert: VERT_TEMPLATE, frag: FRAG_TEMPLATE_TEXTURE };

	default:
		return { vert: VERT_TEMPLATE, frag: FRAG_TEMPLATE };

	}

}

export const createShadersRouter = ( pm: ProjectManager ) => {

	const router = express.Router();

	// GET: シェーダー一覧
	router.get( '/projects/:project/shaders', ( _req, res ) => {

		try {

			const resourcesDir = pm.getResourcesDir();
			const shadersDir = path.join( resourcesDir, 'Shaders' );

			if ( ! fs.existsSync( shadersDir ) ) {

				res.json( [] );
				return;

			}

			const entries = fs.readdirSync( shadersDir, { withFileTypes: true } );
			const items: { name: string, hasVert: boolean, hasFrag: boolean }[] = [];

			entries.forEach( entry => {

				if ( ! entry.isDirectory() || entry.name.startsWith( '_' ) ) return;

				const shaderDir = path.join( shadersDir, entry.name );
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
	router.post( '/projects/:project/shaders', ( req, res ) => {

		try {

			const resourcesDir = pm.getResourcesDir();
			const shadersDir = path.join( resourcesDir, 'Shaders' );
			const { name, template } = req.body;

			if ( ! name || ! validateName( name ) ) {

				res.status( 400 ).json( { error: 'Invalid shader name' } );
				return;

			}

			const shaderDir = path.join( shadersDir, name );

			if ( fs.existsSync( shaderDir ) ) {

				res.status( 409 ).json( { error: 'Shader already exists' } );
				return;

			}

			const templates = getTemplates( template );

			fs.mkdirSync( shaderDir, { recursive: true } );
			fs.writeFileSync( path.join( shaderDir, 'index.vs' ), templates.vert );
			fs.writeFileSync( path.join( shaderDir, 'index.fs' ), templates.frag );

			res.status( 201 ).json( { name, hasVert: true, hasFrag: true } );

		} catch ( err ) {

			console.error( 'Failed to create shader:', err );
			res.status( 500 ).json( { error: 'Failed to create shader' } );

		}

	} );

	// DELETE: シェーダー削除
	router.delete( '/projects/:project/shaders/:name', ( req, res ) => {

		try {

			const resourcesDir = pm.getResourcesDir();
			const shadersDir = path.join( resourcesDir, 'Shaders' );
			const name = req.params.name;

			if ( ! validateName( name ) ) {

				res.status( 400 ).json( { error: 'Invalid name' } );
				return;

			}

			const shaderDir = path.join( shadersDir, name );

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
	router.get( '/projects/:project/shaders/:name/filepath', ( req, res ) => {

		try {

			const resourcesDir = pm.getResourcesDir();
			const shadersDir = path.join( resourcesDir, 'Shaders' );
			const name = req.params.name;

			if ( ! validateName( name ) ) {

				res.status( 400 ).json( { error: 'Invalid name' } );
				return;

			}

			const shaderDir = path.join( shadersDir, name );

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

	return router;

};
