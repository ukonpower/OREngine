import express from 'express';

import { getWSBridge } from '../ws';

export const editorRouter = express.Router();

async function bridgeAction( action: string, params: Record<string, unknown>, res: express.Response ) {

	const bridge = getWSBridge();

	if ( ! bridge || ! bridge.connected ) {

		res.status( 503 ).json( { error: 'Editor not connected' } );
		return;

	}

	const result = await bridge.send( action, params );

	if ( result.success ) {

		res.json( result.data );

	} else {

		res.status( 400 ).json( { error: result.error } );

	}

}

// --- 読み取り系 ---

editorRouter.get( '/editor/status', ( req, res ) => {

	bridgeAction( 'getStatus', {}, res );

} );

editorRouter.get( '/editor/scene', ( req, res ) => {

	bridgeAction( 'getScene', {}, res );

} );

editorRouter.get( '/editor/entity/:uuid', ( req, res ) => {

	bridgeAction( 'getEntity', { uuid: req.params.uuid }, res );

} );

editorRouter.get( '/editor/search', ( req, res ) => {

	bridgeAction( 'searchEntities', { query: req.query.q }, res );

} );

editorRouter.get( '/editor/components', ( req, res ) => {

	bridgeAction( 'getAvailableComponents', {}, res );

} );

editorRouter.get( '/editor/entity/:uuid/component/:componentName', ( req, res ) => {

	bridgeAction( 'getComponentDetail', {
		uuid: req.params.uuid,
		componentName: req.params.componentName
	}, res );

} );

// --- エンティティ操作 ---

editorRouter.post( '/editor/entity', ( req, res ) => {

	bridgeAction( 'createEntity', req.body, res );

} );

editorRouter.delete( '/editor/entity/:uuid', ( req, res ) => {

	bridgeAction( 'deleteEntity', { uuid: req.params.uuid }, res );

} );

editorRouter.post( '/editor/entity/:uuid/select', ( req, res ) => {

	bridgeAction( 'selectEntity', { uuid: req.params.uuid }, res );

} );

// --- コンポーネント操作 ---

editorRouter.post( '/editor/entity/:uuid/component', ( req, res ) => {

	bridgeAction( 'addComponent', { uuid: req.params.uuid, ...req.body }, res );

} );

editorRouter.delete( '/editor/entity/:uuid/component/:componentName', ( req, res ) => {

	bridgeAction( 'removeComponent', {
		uuid: req.params.uuid,
		componentName: req.params.componentName
	}, res );

} );

// --- フィールド操作 ---

editorRouter.post( '/editor/field', ( req, res ) => {

	bridgeAction( 'setField', req.body, res );

} );

// --- Undo/Redo ---

editorRouter.post( '/editor/undo', ( req, res ) => {

	bridgeAction( 'undo', {}, res );

} );

editorRouter.post( '/editor/redo', ( req, res ) => {

	bridgeAction( 'redo', {}, res );

} );
