import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import { projectManager } from '../Project';
import { getWSBridge } from '../ws';

export const editorRouter = express.Router();

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );
const MATERIALS_DIR = path.resolve( __dirname, '../../src/ts/Resources/Materials' );
const TEXTURES_DIR = path.resolve( __dirname, '../../src/ts/Resources/Textures' );

const MUTATING_ACTIONS = new Set( [
	'createEntity', 'deleteEntity',
	'addComponent', 'removeComponent',
	'setField',
] );

const RESOURCE_MUTATING_ACTIONS = new Set( [
	'addMaterial', 'updateMaterial', 'removeMaterial',
	'addTexture', 'updateTexture', 'removeTexture',
] );

function validateName( name: string ): boolean {

	return !! name && ! name.includes( '..' ) && ! name.includes( '/' ) && ! name.includes( '\\' );

}

async function persistResourceChange(
	action: string,
	params: Record<string, unknown>,
	result: any,
) {

	switch ( action ) {

		case 'addMaterial': {

			const name = params.name as string;

			if ( ! validateName( name ) ) break;

			if ( ! fs.existsSync( MATERIALS_DIR ) ) {

				fs.mkdirSync( MATERIALS_DIR, { recursive: true } );

			}

			const config = result?.config ?? params.config ?? {};
			fs.writeFileSync( path.join( MATERIALS_DIR, `${name}.mat` ), JSON.stringify( config, null, '\t' ) + '\n' );
			break;

		}

		case 'updateMaterial': {

			const name = params.name as string;

			if ( ! validateName( name ) ) break;

			if ( ! fs.existsSync( MATERIALS_DIR ) ) {

				fs.mkdirSync( MATERIALS_DIR, { recursive: true } );

			}

			const config = result?.config ?? params.config ?? {};
			fs.writeFileSync( path.join( MATERIALS_DIR, `${name}.mat` ), JSON.stringify( config, null, '\t' ) + '\n' );
			break;

		}

		case 'removeMaterial': {

			const name = params.name as string;

			if ( ! validateName( name ) ) break;

			const matPath = path.join( MATERIALS_DIR, `${name}.mat` );

			if ( fs.existsSync( matPath ) ) {

				fs.unlinkSync( matPath );

			}

			break;

		}

		case 'addTexture': {

			const name = params.name as string;

			if ( ! validateName( name ) ) break;

			if ( ! fs.existsSync( TEXTURES_DIR ) ) {

				fs.mkdirSync( TEXTURES_DIR, { recursive: true } );

			}

			const config = result?.config ?? params.config ?? {};
			fs.writeFileSync( path.join( TEXTURES_DIR, `${name}.tex` ), JSON.stringify( config, null, '\t' ) + '\n' );
			break;

		}

		case 'updateTexture': {

			const name = params.name as string;

			if ( ! validateName( name ) ) break;

			if ( ! fs.existsSync( TEXTURES_DIR ) ) {

				fs.mkdirSync( TEXTURES_DIR, { recursive: true } );

			}

			const config = result?.config ?? params.config ?? {};
			fs.writeFileSync( path.join( TEXTURES_DIR, `${name}.tex` ), JSON.stringify( config, null, '\t' ) + '\n' );
			break;

		}

		case 'removeTexture': {

			const name = params.name as string;

			if ( ! validateName( name ) ) break;

			const texPath = path.join( TEXTURES_DIR, `${name}.tex` );

			if ( fs.existsSync( texPath ) ) {

				fs.unlinkSync( texPath );

			}

			break;

		}

	}

}

async function handleAction(
	projectName: string,
	action: string,
	params: Record<string, unknown>,
	res: express.Response,
) {

	try {

		const bridge = getWSBridge();
		const browserConnected = bridge && bridge.connected;

		if ( browserConnected ) {

			// ブラウザ接続中: ブラウザに操作を委譲
			const result = await bridge!.send( action, params );

			if ( ! result.success ) {

				res.status( 400 ).json( { error: result.error } );
				return;

			}

			// 書き込み操作後はオンメモリ状態を同期
			if ( MUTATING_ACTIONS.has( action ) ) {

				const project = projectManager.getProject( projectName );
				const snapshot = await bridge!.requestSync( projectName );

				if ( snapshot ) {

					project.syncFromBrowser( snapshot );

				}

			}

			// リソース変更のファイル永続化
			if ( RESOURCE_MUTATING_ACTIONS.has( action ) ) {

				await persistResourceChange( action, params, result.data );

			}

			res.json( result.data );

		} else {

			const project = projectManager.getProject( projectName );

			if ( RESOURCE_MUTATING_ACTIONS.has( action ) ) {

				// ブラウザ未接続時のリソース変更: ファイル永続化 + dirtyフラグ
				await persistResourceChange( action, params, params );
				project.markDirty();
				res.json( { success: true } );

			} else if ( MUTATING_ACTIONS.has( action ) ) {

				// ブラウザ未接続時のシーン変更: オンメモリ処理 + dirtyフラグ
				const data = project.dispatch( action, params );
				project.markDirty();
				res.json( data );

			} else {

				// 読み取り操作
				const data = project.dispatch( action, params );
				res.json( data );

			}

		}

	} catch ( err: any ) {

		res.status( 400 ).json( { error: err.message || String( err ) } );

	}

}

// --- ステータス ---

editorRouter.get( '/projects/:projectName/editor/status', ( req, res ) => {

	handleAction( req.params.projectName, 'getStatus', {}, res );

} );

// --- 読み取り系 ---

editorRouter.get( '/projects/:projectName/editor/scene', ( req, res ) => {

	handleAction( req.params.projectName, 'getScene', {}, res );

} );

editorRouter.get( '/projects/:projectName/editor/entity/:uuid', ( req, res ) => {

	handleAction( req.params.projectName, 'getEntity', { uuid: req.params.uuid }, res );

} );

editorRouter.get( '/projects/:projectName/editor/search', ( req, res ) => {

	handleAction( req.params.projectName, 'searchEntities', { query: req.query.q }, res );

} );

editorRouter.get( '/projects/:projectName/editor/components', ( req, res ) => {

	handleAction( req.params.projectName, 'getAvailableComponents', {}, res );

} );

editorRouter.get( '/projects/:projectName/editor/entity/:uuid/component/:componentName', ( req, res ) => {

	handleAction( req.params.projectName, 'getComponentDetail', {
		uuid: req.params.uuid,
		componentName: req.params.componentName,
	}, res );

} );

// --- エンティティ操作 ---

editorRouter.post( '/projects/:projectName/editor/entity', ( req, res ) => {

	handleAction( req.params.projectName, 'createEntity', req.body, res );

} );

editorRouter.delete( '/projects/:projectName/editor/entity/:uuid', ( req, res ) => {

	handleAction( req.params.projectName, 'deleteEntity', { uuid: req.params.uuid }, res );

} );

editorRouter.post( '/projects/:projectName/editor/entity/:uuid/select', ( req, res ) => {

	handleAction( req.params.projectName, 'selectEntity', { uuid: req.params.uuid }, res );

} );

// --- コンポーネント操作 ---

editorRouter.post( '/projects/:projectName/editor/entity/:uuid/component', ( req, res ) => {

	handleAction( req.params.projectName, 'addComponent', { uuid: req.params.uuid, ...req.body }, res );

} );

editorRouter.delete( '/projects/:projectName/editor/entity/:uuid/component/:componentName', ( req, res ) => {

	handleAction( req.params.projectName, 'removeComponent', {
		uuid: req.params.uuid,
		componentName: req.params.componentName,
	}, res );

} );

// --- フィールド操作 ---

editorRouter.post( '/projects/:projectName/editor/field', ( req, res ) => {

	handleAction( req.params.projectName, 'setField', req.body, res );

} );

// --- Undo/Redo ---

editorRouter.post( '/projects/:projectName/editor/undo', ( _req, res ) => {

	const bridge = getWSBridge();

	if ( bridge && bridge.connected ) {

		bridge.executeAction( _req.params.projectName, 'undo', {} );
		res.json( { success: true } );

	} else {

		res.status( 400 ).json( { error: 'Undo requires browser connection' } );

	}

} );

editorRouter.post( '/projects/:projectName/editor/redo', ( _req, res ) => {

	const bridge = getWSBridge();

	if ( bridge && bridge.connected ) {

		bridge.executeAction( _req.params.projectName, 'redo', {} );
		res.json( { success: true } );

	} else {

		res.status( 400 ).json( { error: 'Redo requires browser connection' } );

	}

} );

// --- セーブ ---

editorRouter.post( '/projects/:projectName/editor/save', async ( req, res ) => {

	try {

		const project = projectManager.getProject( req.params.projectName );
		const bridge = getWSBridge();

		if ( bridge && bridge.connected ) {

			const snapshot = await bridge.requestSync( req.params.projectName );

			if ( snapshot ) {

				project.syncFromBrowser( snapshot );

			}

		}

		project.save();
		res.json( { success: true } );

	} catch ( err: any ) {

		res.status( 400 ).json( { error: err.message || String( err ) } );

	}

} );

// --- リソース操作 ---

editorRouter.get( '/projects/:projectName/editor/resources', ( req, res ) => {

	handleAction( req.params.projectName, 'getResources', {}, res );

} );

// マテリアル

editorRouter.post( '/projects/:projectName/editor/materials', ( req, res ) => {

	handleAction( req.params.projectName, 'addMaterial', req.body, res );

} );

editorRouter.get( '/projects/:projectName/editor/materials/:name', ( req, res ) => {

	handleAction( req.params.projectName, 'getMaterial', { name: req.params.name }, res );

} );

editorRouter.put( '/projects/:projectName/editor/materials/:name', ( req, res ) => {

	handleAction( req.params.projectName, 'updateMaterial', { name: req.params.name, config: req.body }, res );

} );

editorRouter.delete( '/projects/:projectName/editor/materials/:name', ( req, res ) => {

	handleAction( req.params.projectName, 'removeMaterial', { name: req.params.name }, res );

} );

// テクスチャ

editorRouter.post( '/projects/:projectName/editor/textures', ( req, res ) => {

	handleAction( req.params.projectName, 'addTexture', req.body, res );

} );

editorRouter.get( '/projects/:projectName/editor/textures/:name', ( req, res ) => {

	handleAction( req.params.projectName, 'getTexture', { name: req.params.name }, res );

} );

editorRouter.put( '/projects/:projectName/editor/textures/:name', ( req, res ) => {

	handleAction( req.params.projectName, 'updateTexture', { name: req.params.name, config: req.body }, res );

} );

editorRouter.delete( '/projects/:projectName/editor/textures/:name', ( req, res ) => {

	handleAction( req.params.projectName, 'removeTexture', { name: req.params.name }, res );

} );
