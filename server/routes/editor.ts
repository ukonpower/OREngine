import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';

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

async function handleActionInternal(
	projectName: string,
	action: string,
	params: Record<string, unknown>,
): Promise<any> {

	const bridge = getWSBridge();
	const browserConnected = bridge && bridge.connected;

	if ( browserConnected ) {

		const result = await bridge!.send( action, params );

		if ( ! result.success ) {

			throw new Error( result.error );

		}

		if ( RESOURCE_MUTATING_ACTIONS.has( action ) ) {

			await persistResourceChange( action, params, result.data );

		}

		return result.data;

	} else {

		const project = projectManager.getProject( projectName );

		if ( RESOURCE_MUTATING_ACTIONS.has( action ) ) {

			await persistResourceChange( action, params, params );
			project.markDirty();
			return { success: true };

		} else if ( MUTATING_ACTIONS.has( action ) ) {

			const data = project.dispatch( action, params );
			project.markDirty();
			return data;

		} else {

			return project.dispatch( action, params );

		}

	}

}

async function syncFromBrowser( projectName: string ) {

	const bridge = getWSBridge();

	if ( bridge && bridge.connected ) {

		const project = projectManager.getProject( projectName );
		const snapshot = await bridge.requestSync( projectName );

		if ( snapshot ) {

			project.syncFromBrowser( snapshot );

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

		const data = await handleActionInternal( projectName, action, params );

		if ( MUTATING_ACTIONS.has( action ) ) {

			await syncFromBrowser( projectName );

		}

		res.json( data );

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

// --- バッチ操作 ---

editorRouter.post( '/projects/:projectName/editor/entities', async ( req, res ) => {

	try {

		const projectName = req.params.projectName;
		const { entities } = req.body as {
			entities: {
				name?: string;
				parentUuid: string;
				position?: number[];
				euler?: number[];
				scale?: number[];
				components?: {
					componentName: string;
					fields?: Record<string, unknown>;
				}[];
			}[];
		};

		if ( ! Array.isArray( entities ) ) {

			res.status( 400 ).json( { error: 'entities must be an array' } );
			return;

		}

		const results = [];

		for ( const entityDef of entities ) {

			const createResult = await handleActionInternal(
				projectName, 'createEntity',
				{ parentUuid: entityDef.parentUuid, name: entityDef.name }
			);
			const entityUuid = createResult.uuid;

			if ( entityDef.position ) {

				await handleActionInternal( projectName, 'setField',
					{ targetUuid: entityUuid, path: 'position', value: entityDef.position } );

			}

			if ( entityDef.euler ) {

				await handleActionInternal( projectName, 'setField',
					{ targetUuid: entityUuid, path: 'euler', value: entityDef.euler } );

			}

			if ( entityDef.scale ) {

				await handleActionInternal( projectName, 'setField',
					{ targetUuid: entityUuid, path: 'scale', value: entityDef.scale } );

			}

			const componentResults = [];

			if ( entityDef.components ) {

				for ( const compDef of entityDef.components ) {

					const compResult = await handleActionInternal(
						projectName, 'addComponent',
						{ uuid: entityUuid, componentName: compDef.componentName }
					);
					const compUuid = compResult.uuid;

					if ( compDef.fields ) {

						for ( const [ fieldPath, fieldValue ] of Object.entries( compDef.fields ) ) {

							await handleActionInternal( projectName, 'setField',
								{ targetUuid: compUuid, path: fieldPath, value: fieldValue } );

						}

					}

					componentResults.push( { uuid: compUuid, componentName: compDef.componentName } );

				}

			}

			results.push( { uuid: entityUuid, name: entityDef.name, components: componentResults } );

		}

		await syncFromBrowser( projectName );

		res.json( { entities: results } );

	} catch ( err: any ) {

		res.status( 400 ).json( { error: err.message || String( err ) } );

	}

} );

editorRouter.post( '/projects/:projectName/editor/fields', async ( req, res ) => {

	try {

		const projectName = req.params.projectName;
		const { fields } = req.body as {
			fields: { targetUuid: string; path: string; value: unknown }[];
		};

		if ( ! Array.isArray( fields ) ) {

			res.status( 400 ).json( { error: 'fields must be an array' } );
			return;

		}

		for ( const field of fields ) {

			await handleActionInternal( projectName, 'setField', field );

		}

		await syncFromBrowser( projectName );

		res.json( { success: true, count: fields.length } );

	} catch ( err: any ) {

		res.status( 400 ).json( { error: err.message || String( err ) } );

	}

} );
