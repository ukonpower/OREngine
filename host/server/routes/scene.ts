import * as fs from 'fs';
import * as path from 'path';

import express from 'express';

import { ProjectManager } from '../Project';
import { isValidSceneName } from '../Project/ProjectData';
import { markWritten } from '../recentWrites';


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
		markWritten( filePath );
		res.json( { success: true } );

	} catch ( err ) {

		console.error( `Failed to write ${filePath}:`, err );
		res.status( 500 ).json( { error: 'Failed to write file' } );

	}

}

export const createSceneRouter = ( pm: ProjectManager ) => {

	const router = express.Router();

	// Scenes
	router.get( '/projects/:name/scenes', ( _req, res ) => {

		res.json( pm.getProject().listSceneNames() );

	} );

	router.get( '/projects/:name/scenes/:scene', ( req, res ) => {

		const sceneName = req.params.scene;

		if ( ! isValidSceneName( sceneName ) ) {

			res.status( 400 ).json( { error: 'Invalid scene name' } );
			return;

		}

		try {

			res.json( pm.getProject().getSceneFileData( sceneName ) );

		} catch ( err: any ) {

			res.status( 404 ).json( { error: err.message || 'Failed to get scene' } );

		}

	} );

	router.post( '/projects/:name/scenes/:scene', ( req, res ) => {

		const sceneName = req.params.scene;

		if ( ! isValidSceneName( sceneName ) ) {

			res.status( 400 ).json( { error: 'Invalid scene name' } );
			return;

		}

		const project = pm.getProject();

		// 新規シーンの作成にも同じ経路を使うので、初回は scenes/ 自体が無いことがある
		fs.mkdirSync( project.scenesDir, { recursive: true } );

		writeJsonFile( project.sceneFilePath( sceneName ), req.body, res );

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
