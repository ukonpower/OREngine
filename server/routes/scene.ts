import express from 'express';
import * as fs from 'fs';
import * as path from 'path';

import { ProjectManager } from '../Project';
import { getWSBridge } from '../ws';


function readJsonFile( filePath: string, res: express.Response ): void {

	if ( ! fs.existsSync( filePath ) ) {

		res.status( 404 ).json( { error: 'File not found' } );
		return;

	}

	try {

		const content = fs.readFileSync( filePath, 'utf-8' );
		const data = JSON.parse( content );
		res.json( data );

	} catch ( err ) {

		console.error( `Failed to read ${filePath}:`, err );
		res.status( 500 ).json( { error: 'Failed to read file' } );

	}

}

function writeJsonFile( filePath: string, data: unknown, res: express.Response ): void {

	try {

		const dir = path.dirname( filePath );

		if ( ! fs.existsSync( dir ) ) {

			res.status( 404 ).json( { error: 'Project not found' } );
			return;

		}

		fs.writeFileSync( filePath, JSON.stringify( data, null, '\t' ) + '\n' );
		res.json( { success: true } );

	} catch ( err ) {

		console.error( `Failed to write ${filePath}:`, err );
		res.status( 500 ).json( { error: 'Failed to write file' } );

	}

}

export const createSceneRouter = ( pm: ProjectManager ) => {

	const router = express.Router();

	// Scene
	router.get( '/projects/:name/scene', ( _req, res ) => {

		try {

			res.json( pm.getProject().getSceneFileData() );

		} catch ( err: any ) {

			res.status( 500 ).json( { error: err.message || 'Failed to get scene' } );

		}

	} );

	router.post( '/projects/:name/scene', ( req, res ) => {

		writeJsonFile( path.join( pm.projectDir, 'scene.json' ), req.body, res );

		const bridge = getWSBridge();

		if ( bridge ) {

			const clientId = req.header( 'x-orengine-client-id' );
			const exclude = clientId ? bridge.findClientById( pm.name, clientId ) : null;

			bridge.broadcastState( pm.name, req.body, { fullReload: true, exclude } );

		}

	} );

	// Editor
	router.get( '/projects/:name/editor', ( _req, res ) => {

		readJsonFile( path.join( pm.projectDir, 'editor.json' ), res );

	} );

	router.post( '/projects/:name/editor', ( req, res ) => {

		writeJsonFile( path.join( pm.projectDir, 'editor.json' ), req.body, res );

	} );

	return router;

};
