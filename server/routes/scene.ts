import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';

import { projectManager } from '../Project';
import { getWSBridge } from '../ws';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );

export const sceneRouter = express.Router();

const PROJECTS_DIR = path.resolve( __dirname, '../../projects' );
const EXTERNAL_PROJECT_DIR = process.env.ORENGINE_PROJECT_DIR
	? path.resolve( process.env.ORENGINE_PROJECT_DIR )
	: null;

/**
 * プロジェクト名をサニタイズし、安全なディレクトリパスを返す
 */
function resolveProjectDir( name: string ): string | null {

	if ( EXTERNAL_PROJECT_DIR ) return EXTERNAL_PROJECT_DIR;

	if ( ! name || name.includes( '..' ) || name.includes( '/' ) || name.includes( '\\' ) ) {

		return null;

	}

	const projectDir = path.join( PROJECTS_DIR, name );
	const resolved = path.resolve( projectDir );

	// PROJECTS_DIR 配下であることを確認
	if ( ! resolved.startsWith( path.resolve( PROJECTS_DIR ) ) ) {

		return null;

	}

	return resolved;

}

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

// Scene
sceneRouter.get( '/projects/:name/scene', ( req, res ) => {

	try {

		const project = projectManager.getProject( req.params.name );
		res.json( project.getSceneFileData() );

	} catch ( err: any ) {

		res.status( 500 ).json( { error: err.message || 'Failed to get scene' } );

	}

} );

sceneRouter.post( '/projects/:name/scene', ( req, res ) => {

	const projectDir = resolveProjectDir( req.params.name );

	if ( ! projectDir ) {

		res.status( 400 ).json( { error: 'Invalid project name' } );
		return;

	}

	writeJsonFile( path.join( projectDir, 'scene.json' ), req.body, res );

	// オンメモリ状態も更新
	try {

		const project = projectManager.getProject( req.params.name );
		project.syncFromBrowser( req.body );

		const bridge = getWSBridge();
		if ( bridge ) {

			bridge.broadcastState( req.params.name, req.body, { fullReload: true } );

		}

	} catch { /* ignore */ }

} );

// Editor
sceneRouter.get( '/projects/:name/editor', ( req, res ) => {

	const projectDir = resolveProjectDir( req.params.name );

	if ( ! projectDir ) {

		res.status( 400 ).json( { error: 'Invalid project name' } );
		return;

	}

	readJsonFile( path.join( projectDir, 'editor.json' ), res );

} );

sceneRouter.post( '/projects/:name/editor', ( req, res ) => {

	const projectDir = resolveProjectDir( req.params.name );

	if ( ! projectDir ) {

		res.status( 400 ).json( { error: 'Invalid project name' } );
		return;

	}

	writeJsonFile( path.join( projectDir, 'editor.json' ), req.body, res );

} );
