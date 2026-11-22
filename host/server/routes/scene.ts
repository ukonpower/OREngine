import * as fs from 'fs';
import * as path from 'path';

import express from 'express';

import { ProjectManager } from '../Project';
import { isValidSceneName } from '../Project/ProjectData';
import { markWritten } from '../recentWrites';


// エディタの設定のうち、作品としてコミットする editor.json に置くもの。出力の解像度は player・ギャラリーのビルドが読む。
// それ以外（開いているシーン・選択・パネルの配置・ビューポートのカメラ等、操作のたびに変わる状態）は editor.local.json（gitignore）に置き、
// 作品のコミットに毎回 editor.json の差分が乗らないようにする
const SHARED_EDITOR_KEYS = [ 'resolution/width', 'resolution/height' ];

const EDITOR_FILE = 'editor.json';
const EDITOR_LOCAL_FILE = 'editor.local.json';

// 無ければ null
function readJsonObject( filePath: string ): Record<string, unknown> | null {

	if ( ! fs.existsSync( filePath ) ) return null;

	return JSON.parse( fs.readFileSync( filePath, 'utf-8' ) ) as Record<string, unknown>;

}

function writeJson( filePath: string, data: unknown ): void {

	fs.writeFileSync( filePath, JSON.stringify( data, null, '\t' ) + '\n' );
	markWritten( filePath );

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

	router.delete( '/projects/:name/scenes/:scene', ( req, res ) => {

		const sceneName = req.params.scene;

		if ( ! isValidSceneName( sceneName ) ) {

			res.status( 400 ).json( { error: 'Invalid scene name' } );
			return;

		}

		const project = pm.getProject();
		const filePath = project.sceneFilePath( sceneName );

		try {

			project.deleteScene( sceneName );

			// 削除もエディタ発の操作なので、watch のフルリロードで編集中の状態を飛ばさない
			markWritten( filePath );
			res.json( { success: true } );

		} catch ( err: any ) {

			res.status( 404 ).json( { error: err.message || 'Failed to delete scene' } );

		}

	} );

	// Editor
	// editor.json（コミットする）を土台に、editor.local.json（コミットしない操作の状態）を重ねて返す
	router.get( '/projects/:name/editor', ( _req, res ) => {

		const shared = readJsonObject( path.join( pm.projectDir, EDITOR_FILE ) );
		const local = readJsonObject( path.join( pm.projectDir, EDITOR_LOCAL_FILE ) );

		if ( shared === null && local === null ) {

			res.status( 404 ).json( { error: 'File not found' } );
			return;

		}

		res.json( { ...shared, ...local } );

	} );

	// SHARED_EDITOR_KEYS は editor.json へ（変わったときだけ書く）、それ以外は editor.local.json へ分けて書く
	router.post( '/projects/:name/editor', ( req, res ) => {

		const body = req.body as Record<string, unknown>;
		const sharedFile = path.join( pm.projectDir, EDITOR_FILE );
		const shared = readJsonObject( sharedFile ) ?? {};
		const local: Record<string, unknown> = {};
		let sharedChanged = false;

		for ( const key of Object.keys( body ) ) {

			if ( ! SHARED_EDITOR_KEYS.includes( key ) ) {

				local[ key ] = body[ key ];
				continue;

			}

			if ( JSON.stringify( shared[ key ] ) !== JSON.stringify( body[ key ] ) ) {

				shared[ key ] = body[ key ];
				sharedChanged = true;

			}

		}

		try {

			if ( sharedChanged ) writeJson( sharedFile, shared );

			writeJson( path.join( pm.projectDir, EDITOR_LOCAL_FILE ), local );
			res.json( { success: true } );

		} catch ( err ) {

			console.error( 'Failed to write editor settings:', err );
			res.status( 500 ).json( { error: 'Failed to write file' } );

		}

	} );

	// 開いたシーンだけを editor.local.json に書く（シーンを開くたびにエディタの状態ごと保存しないため）
	router.post( '/projects/:name/editor/scene', ( req, res ) => {

		const scene = ( req.body as { scene?: unknown } ).scene;

		if ( typeof scene !== 'string' || ! isValidSceneName( scene ) ) {

			res.status( 400 ).json( { error: 'Invalid scene name' } );
			return;

		}

		const localFile = path.join( pm.projectDir, EDITOR_LOCAL_FILE );
		const local = readJsonObject( localFile ) ?? {};

		local.scene = scene;

		try {

			writeJson( localFile, local );
			res.json( { success: true } );

		} catch ( err ) {

			console.error( `Failed to write ${localFile}:`, err );
			res.status( 500 ).json( { error: 'Failed to write file' } );

		}

	} );

	return router;

};
