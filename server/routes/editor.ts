import express from 'express';

import { projectManager } from '../Project';
import { getWSBridge } from '../ws';

export const editorRouter = express.Router();

const MUTATING_ACTIONS = new Set( [
	'createEntity', 'deleteEntity',
	'addComponent', 'removeComponent',
	'setField',
] );

async function handleAction(
	projectName: string,
	action: string,
	params: Record<string, unknown>,
	res: express.Response,
) {

	try {

		const project = projectManager.getProject( projectName );
		const bridge = getWSBridge();
		const browserConnected = bridge && bridge.connected;

		// 書き込み操作 & ブラウザ接続中 → まずブラウザの状態を同期
		if ( MUTATING_ACTIONS.has( action ) && browserConnected ) {

			const snapshot = await bridge!.requestSync( projectName );

			if ( snapshot ) {

				project.syncFromBrowser( snapshot );

			}

		}

		// サーバーのオンメモリ状態に操作を適用
		const data = project.dispatch( action, params );

		// 書き込み操作 & ブラウザ接続中 → ブラウザにコマンド実行を指示
		if ( MUTATING_ACTIONS.has( action ) && browserConnected ) {

			bridge!.executeAction( projectName, action, params );

		}

		res.json( data );

	} catch ( err: any ) {

		res.status( 400 ).json( { error: err.message || String( err ) } );

	}

}

// --- ステータス ---

editorRouter.get( '/projects/:projectName/editor/status', async ( req, res ) => {

	try {

		const bridge = getWSBridge();
		const browserConnected = bridge && bridge.connected;

		if ( browserConnected ) {

			const result = await bridge!.send( 'getStatus', {} );

			if ( result.success ) {

				res.json( result.data );
				return;

			}

		}

		// 未接続時はサーバーの情報のみ
		try {

			const project = projectManager.getProject( req.params.projectName );
			const data = project.dispatch( 'getStatus', {} );
			res.json( data );

		} catch {

			res.json( {
				connected: false,
				canUndo: false,
				canRedo: false,
				selectedEntityId: null,
			} );

		}

	} catch ( err: any ) {

		res.status( 400 ).json( { error: err.message || String( err ) } );

	}

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
