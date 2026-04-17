import * as fs from 'fs';
import * as path from 'path';

import express from 'express';

import { ProjectManager } from '../Project';
import { SceneDataEditor } from '../SceneDataEditor';
import { getWSBridge } from '../ws';

let pm: ProjectManager;

export const createEditorRouter = ( projectManager: ProjectManager ) => {

	pm = projectManager;
	return editorRouter;

};

const editorRouter = express.Router();

const RESOURCE_MUTATING_ACTIONS = new Set( [
	'addMaterial', 'updateMaterial', 'removeMaterial',
	'addTexture', 'updateTexture', 'removeTexture',
] );

function validateName( name: string ): boolean {

	return !! name && ! name.includes( '..' ) && ! name.includes( '/' ) && ! name.includes( '\\' );

}

async function persistResourceChange(
	_projectName: string,
	action: string,
	params: Record<string, unknown>,
	result: any,
) {

	const resourcesDir = pm.getResourcesDir();

	if ( ! resourcesDir ) return;

	const materialsDir = path.join( resourcesDir, 'Materials' );
	const texturesDir = path.join( resourcesDir, 'Textures' );

	switch ( action ) {

	case 'addMaterial': {

		const name = params.name as string;

		if ( ! validateName( name ) ) break;

		if ( ! fs.existsSync( materialsDir ) ) {

			fs.mkdirSync( materialsDir, { recursive: true } );

		}

		const config = result?.config ?? params.config ?? {};
		fs.writeFileSync( path.join( materialsDir, `${name}.mat` ), JSON.stringify( config, null, '\t' ) + '\n' );
		break;

	}

	case 'updateMaterial': {

		const name = params.name as string;

		if ( ! validateName( name ) ) break;

		if ( ! fs.existsSync( materialsDir ) ) {

			fs.mkdirSync( materialsDir, { recursive: true } );

		}

		const config = result?.config ?? params.config ?? {};
		fs.writeFileSync( path.join( materialsDir, `${name}.mat` ), JSON.stringify( config, null, '\t' ) + '\n' );
		break;

	}

	case 'removeMaterial': {

		const name = params.name as string;

		if ( ! validateName( name ) ) break;

		const matPath = path.join( materialsDir, `${name}.mat` );

		if ( fs.existsSync( matPath ) ) {

			fs.unlinkSync( matPath );

		}

		break;

	}

	case 'addTexture': {

		const name = params.name as string;

		if ( ! validateName( name ) ) break;

		if ( ! fs.existsSync( texturesDir ) ) {

			fs.mkdirSync( texturesDir, { recursive: true } );

		}

		const config = result?.config ?? params.config ?? {};
		fs.writeFileSync( path.join( texturesDir, `${name}.tex` ), JSON.stringify( config, null, '\t' ) + '\n' );
		break;

	}

	case 'updateTexture': {

		const name = params.name as string;

		if ( ! validateName( name ) ) break;

		if ( ! fs.existsSync( texturesDir ) ) {

			fs.mkdirSync( texturesDir, { recursive: true } );

		}

		const config = result?.config ?? params.config ?? {};
		fs.writeFileSync( path.join( texturesDir, `${name}.tex` ), JSON.stringify( config, null, '\t' ) + '\n' );
		break;

	}

	case 'removeTexture': {

		const name = params.name as string;

		if ( ! validateName( name ) ) break;

		const texPath = path.join( texturesDir, `${name}.tex` );

		if ( fs.existsSync( texPath ) ) {

			fs.unlinkSync( texPath );

		}

		break;

	}

	}

}

const WRITE_ACTIONS = new Set( [
	'createEntity', 'deleteEntity', 'addComponent', 'removeComponent', 'setField',
] );

const BUILTIN_COMPONENTS = [
	{ name: 'Light', className: 'Light' },
	{ name: 'Camera', className: 'Camera' },
	{ name: 'Mesh', className: 'Mesh' },
];

function getAvailableComponentsFromFiles( _projectName: string ): { name: string; className: string }[] {

	const resourcesDir = pm.getResourcesDir();
	const componentsDir = resourcesDir ? path.join( resourcesDir, 'Components' ) : '';
	const result: { name: string; className: string }[] = [ ...BUILTIN_COMPONENTS ];

	function scan( dir: string ) {

		if ( ! fs.existsSync( dir ) ) return;

		const entries = fs.readdirSync( dir, { withFileTypes: true } )
			.filter( e => e.isDirectory() && ! e.name.startsWith( '_' ) );

		for ( const entry of entries ) {

			const entryPath = path.join( dir, entry.name );
			const hasIndex = fs.existsSync( path.join( entryPath, 'index.ts' ) );

			if ( hasIndex ) {

				result.push( { name: entry.name, className: entry.name } );

			}

			scan( entryPath );

		}

	}

	scan( componentsDir );

	return result;

}

function handleActionLocal(
	projectName: string,
	action: string,
	params: Record<string, unknown>,
): unknown {

	const project = pm.getProject();
	const sceneData = project.getSceneFileData();
	const editor = new SceneDataEditor( sceneData );

	let result: unknown;

	switch ( action ) {

	case 'getScene':
		result = editor.getScene();
		break;

	case 'getEntity':
		result = editor.getEntity( params.uuid as string );
		break;

	case 'searchEntities':
		result = editor.searchEntities( params.query as string || '' );
		break;

	case 'createEntity':
		result = editor.createEntity( params.parentUuid as string || '0', params.name as string || 'New Entity' );
		break;

	case 'deleteEntity':
		editor.deleteEntity( params.uuid as string );
		result = { success: true };
		break;

	case 'addComponent':
		result = editor.addComponent( params.uuid as string, params.componentName as string );
		break;

	case 'removeComponent':
		editor.removeComponent( params.uuid as string, params.componentName as string );
		result = { success: true };
		break;

	case 'setField':
		editor.setField( params.targetUuid as string, params.path as string, params.value );
		result = { success: true };
		break;

	case 'getAvailableComponents':
		result = getAvailableComponentsFromFiles( projectName );
		break;

	case 'getStatus':
		result = { connected: false, canUndo: false, canRedo: false, selectedEntityId: null };
		break;

	case 'getShaderErrors':
	case 'getConsoleErrors':
	case 'clearConsoleErrors':
	case 'getComponentDetail':
	case 'selectEntity':
	case 'undo':
	case 'redo':
	case 'timelinePlay':
	case 'timelineStop':
	case 'timelineSeek':
	case 'getTimelineStatus':
	case 'captureScreenshot':
	case 'setCameraPosition':
	case 'getCameraPosition':
		throw new Error( `Action '${action}' requires browser connection` );

	default:
		throw new Error( `Unknown action: ${action}` );

	}

	if ( WRITE_ACTIONS.has( action ) ) {

		project.incrementRevision();

	}

	return result;

}

async function handleActionInternal(
	projectName: string,
	action: string,
	params: Record<string, unknown>,
): Promise<any> {

	const bridge = getWSBridge();

	if ( bridge && bridge.isProjectConnected( projectName ) ) {

		const primaryClient = bridge.getPrimaryClient( projectName );
		const result = await bridge.send( projectName, action, params );

		if ( ! result.success ) {

			throw new Error( result.error );

		}

		if ( RESOURCE_MUTATING_ACTIONS.has( action ) ) {

			await persistResourceChange( projectName, action, params, result.data );

		}

		if ( WRITE_ACTIONS.has( action ) ) {

			const snapshot = await bridge.requestSync( projectName );

			if ( snapshot ) {

				const project = pm.getProject();
				project.syncFromBrowser( snapshot );
				bridge.broadcastState( projectName, snapshot, {
					fullReload: true,
					exclude: primaryClient,
				} );

			}

		}

		return result.data;

	}

	return handleActionLocal( projectName, action, params );

}

async function handleAction(
	projectName: string,
	action: string,
	params: Record<string, unknown>,
	res: express.Response,
) {

	try {

		const data = await handleActionInternal( projectName, action, params );
		res.json( data );

	} catch ( err: any ) {

		const message = err.message || String( err );
		const requiresBrowser = message.includes( 'requires browser connection' );
		const isTimeout = message === 'Timeout';
		const status = ( requiresBrowser || isTimeout ) ? 503 : 400;
		const body: Record<string, string> = { error: message };

		if ( requiresBrowser ) body.hint = '対象プロジェクトをブラウザで開いてください';

		res.status( status ).json( body );

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

// --- オブジェクトコントロール ---

// lookAt行列からquaternionを抽出
function matrixToQuaternion( m: number[] ): number[] {

	// m: column-major [col0x, col0y, col0z, 0, col1x, col1y, col1z, 0, col2x, col2y, col2z, 0, ...]
	const m11 = m[ 0 ], m12 = m[ 4 ], m13 = m[ 8 ];
	const m21 = m[ 1 ], m22 = m[ 5 ], m23 = m[ 9 ];
	const m31 = m[ 2 ], m32 = m[ 6 ], m33 = m[ 10 ];

	const trace = m11 + m22 + m33;
	let x: number, y: number, z: number, w: number;

	if ( trace > 0 ) {

		const s = 0.5 / Math.sqrt( trace + 1.0 );
		w = 0.25 / s;
		x = ( m32 - m23 ) * s;
		y = ( m13 - m31 ) * s;
		z = ( m21 - m12 ) * s;

	} else if ( m11 > m22 && m11 > m33 ) {

		const s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );
		w = ( m32 - m23 ) / s;
		x = 0.25 * s;
		y = ( m12 + m21 ) / s;
		z = ( m13 + m31 ) / s;

	} else if ( m22 > m33 ) {

		const s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );
		w = ( m13 - m31 ) / s;
		x = ( m12 + m21 ) / s;
		y = 0.25 * s;
		z = ( m23 + m32 ) / s;

	} else {

		const s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );
		w = ( m21 - m12 ) / s;
		x = ( m13 + m31 ) / s;
		y = ( m23 + m32 ) / s;
		z = 0.25 * s;

	}

	return [ x, y, z, w ];

}

// quaternion乗算: a * b
function quatMultiply( a: number[], b: number[] ): number[] {

	const ax = a[ 0 ], ay = a[ 1 ], az = a[ 2 ], aw = a[ 3 ];
	const bx = b[ 0 ], by = b[ 1 ], bz = b[ 2 ], bw = b[ 3 ];

	return [
		aw * bx + ax * bw + ay * bz - az * by,
		aw * by - ax * bz + ay * bw + az * bx,
		aw * bz + ax * by - ay * bx + az * bw,
		aw * bw - ax * bx - ay * by - az * bz,
	];

}

// quaternionからXYZ euler抽出
function quatToEulerXYZ( q: number[] ): number[] {

	const x = q[ 0 ], y = q[ 1 ], z = q[ 2 ], w = q[ 3 ];

	// quaternion → rotation matrix elements
	const m11 = 1 - 2 * ( y * y + z * z );
	const m12 = 2 * ( x * y - z * w );
	const m13 = 2 * ( x * z + y * w );
	const m22 = 1 - 2 * ( x * x + z * z );
	const m23 = 2 * ( y * z - x * w );
	const m32 = 2 * ( y * z + x * w );
	const m33 = 1 - 2 * ( x * x + y * y );

	const eulerY = Math.asin( Math.min( 1.0, Math.max( - 1.0, m13 ) ) );
	let eulerX: number, eulerZ: number;

	if ( Math.abs( m13 ) < 0.9999999 ) {

		eulerX = Math.atan2( - m23, m33 );
		eulerZ = Math.atan2( - m12, m11 );

	} else {

		eulerX = Math.atan2( m32, m22 );
		eulerZ = 0;

	}

	return [ eulerX, eulerY, eulerZ ];

}

function computeLookAtEuler(
	eyeX: number, eyeY: number, eyeZ: number,
	targetX: number, targetY: number, targetZ: number,
	isLight: boolean,
): number[] {

	// lookAt行列構築 (Matrix.lookAt と同じ)
	let zx = eyeX - targetX, zy = eyeY - targetY, zz = eyeZ - targetZ;
	const zLen = Math.sqrt( zx * zx + zy * zy + zz * zz ) || 1;
	zx /= zLen; zy /= zLen; zz /= zLen;

	// xAxis = normalize(up × zAxis), up = (0,1,0)
	let xx = zz, xz = - zx;
	const xy = 0;
	const xLen = Math.sqrt( xx * xx + xz * xz ) || 1;
	xx /= xLen; xz /= xLen;

	// yAxis = zAxis × xAxis
	const yx = zy * xz - zz * xy;
	const yy = zz * xx - zx * xz;
	const yz = zx * xy - zy * xx;

	// column-major matrix: col0=xAxis, col1=yAxis, col2=zAxis
	const mat = [
		xx, xy, xz, 0,
		yx, yy, yz, 0,
		zx, zy, zz, 0,
		0, 0, 0, 1,
	];

	let quat = matrixToQuaternion( mat );

	// Light補正: entity.lookAt後に quaternion.multiply(Quaternion.fromEuler(PI/2, 0, 0))
	if ( isLight ) {

		const halfAngle = Math.PI / 4; // PI/2 の半分
		const correctionQuat = [ Math.sin( halfAngle ), 0, 0, Math.cos( halfAngle ) ];
		quat = quatMultiply( quat, correctionQuat );

	}

	return quatToEulerXYZ( quat );

}

editorRouter.post( '/projects/:projectName/editor/entity/:uuid/lookAt', async ( req, res ) => {

	try {

		const projectName = req.params.projectName;
		const uuid = req.params.uuid;
		const { target } = req.body as { target: number[] };

		if ( ! Array.isArray( target ) || target.length < 3 ) {

			res.status( 400 ).json( { error: 'target must be [x, y, z]' } );
			return;

		}

		// エンティティの現在位置を取得
		const entity = await handleActionInternal( projectName, 'getEntity', { uuid } );
		const pos = entity.position || entity.pos || { x: 0, y: 0, z: 0 };
		const eyeX = pos.x ?? pos[ 0 ] ?? 0;
		const eyeY = pos.y ?? pos[ 1 ] ?? 0;
		const eyeZ = pos.z ?? pos[ 2 ] ?? 0;

		const hasLight = entity.components?.some(
			( c: any ) => c.name === 'Light'
		);

		const euler = computeLookAtEuler( eyeX, eyeY, eyeZ, target[ 0 ], target[ 1 ], target[ 2 ], !! hasLight );

		await handleActionInternal( projectName, 'setField', {
			targetUuid: uuid,
			path: 'euler',
			value: euler,
		} );

		res.json( { success: true, euler, lightCorrected: !! hasLight } );

	} catch ( err: any ) {

		res.status( 400 ).json( { error: err.message || String( err ) } );

	}

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

		const project = pm.getProject();
		const bridge = getWSBridge();

		if ( bridge && bridge.isProjectConnected( req.params.projectName ) ) {

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
				{ parentUuid: entityDef.parentUuid || '0', name: entityDef.name }
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

					if ( ! compDef.componentName ) {

						throw new Error( 'components[].componentName is required' );

					}

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

		res.json( { success: true, count: fields.length } );

	} catch ( err: any ) {

		res.status( 400 ).json( { error: err.message || String( err ) } );

	}

} );

// --- シェーダーエラー ---

editorRouter.get( '/projects/:projectName/editor/shader-errors', async ( req, res ) => {

	handleAction( req.params.projectName, 'getShaderErrors', {}, res );

} );

// --- コンソールエラー ---

editorRouter.get( '/projects/:projectName/editor/console-errors', ( req, res ) => {

	const level = req.query.level as string | undefined;
	handleAction( req.params.projectName, 'getConsoleErrors', { level }, res );

} );

editorRouter.post( '/projects/:projectName/editor/console-errors/clear', ( req, res ) => {

	handleAction( req.params.projectName, 'clearConsoleErrors', {}, res );

} );

// --- タイムライン制御 ---

editorRouter.post( '/projects/:projectName/editor/timeline/play', ( req, res ) => {

	handleAction( req.params.projectName, 'timelinePlay', {}, res );

} );

editorRouter.post( '/projects/:projectName/editor/timeline/stop', ( req, res ) => {

	handleAction( req.params.projectName, 'timelineStop', {}, res );

} );

editorRouter.post( '/projects/:projectName/editor/timeline/seek', ( req, res ) => {

	handleAction( req.params.projectName, 'timelineSeek', { frame: req.body.frame }, res );

} );

editorRouter.get( '/projects/:projectName/editor/timeline/status', ( req, res ) => {

	handleAction( req.params.projectName, 'getTimelineStatus', {}, res );

} );

// --- スクリーンショット ---

editorRouter.get( '/projects/:projectName/editor/screenshot', async ( req, res ) => {

	try {

		const format = ( req.query.format as string ) || 'png';
		const quality = req.query.quality ? parseFloat( req.query.quality as string ) : undefined;

		const data = await handleActionInternal( req.params.projectName, 'captureScreenshot', {
			format,
			quality,
		} );

		const dataUrl = data.image as string;
		const base64 = dataUrl.split( ',' )[ 1 ];
		const buffer = Buffer.from( base64, 'base64' );
		const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';

		res.setHeader( 'Content-Type', mimeType );
		res.setHeader( 'Content-Length', buffer.length );
		res.send( buffer );

	} catch ( err: any ) {

		const message = err.message || String( err );
		const requiresBrowser = message.includes( 'requires browser connection' );
		const status = requiresBrowser ? 503 : 400;
		res.status( status ).json( { error: message } );

	}

} );

// --- カメラ制御 ---

editorRouter.get( '/projects/:projectName/editor/camera/position', ( req, res ) => {

	handleAction( req.params.projectName, 'getCameraPosition', {}, res );

} );

editorRouter.post( '/projects/:projectName/editor/camera/position', ( req, res ) => {

	handleAction( req.params.projectName, 'setCameraPosition', {
		eye: req.body.eye,
		target: req.body.target,
	}, res );

} );

// --- HMRイベント ---

const hmrEvents: { file: string; moduleCount: number; timestamp: number }[] = [];

editorRouter.post( '/internal/hmr-events', ( req, res ) => {

	hmrEvents.push( req.body );
	if ( hmrEvents.length > 50 ) hmrEvents.shift();
	res.json( { success: true } );

} );

editorRouter.get( '/projects/:projectName/editor/hmr-events', ( _req, res ) => {

	res.json( { events: [ ...hmrEvents ] } );

} );

// --- Viteエラー ---

const viteErrors: { file: string; message: string; plugin?: string; timestamp: number }[] = [];

editorRouter.post( '/internal/vite-errors', ( req, res ) => {

	viteErrors.push( req.body );
	if ( viteErrors.length > 100 ) viteErrors.shift();
	res.json( { success: true } );

} );

editorRouter.get( '/projects/:projectName/editor/vite-errors', ( _req, res ) => {

	res.json( { errors: [ ...viteErrors ] } );

} );

editorRouter.post( '/projects/:projectName/editor/vite-errors/clear', ( _req, res ) => {

	viteErrors.length = 0;
	res.json( { success: true } );

} );

// --- リロード ---

editorRouter.post( '/projects/:projectName/editor/reload', async ( req, res ) => {

	const { projectName } = req.params;

	try {

		const project = pm.getProject();
		project.reloadFromDisk();

		const bridge = getWSBridge();

		if ( bridge ) {

			bridge.pushFullReload( projectName );

		}

		res.json( { success: true } );

	} catch ( e: any ) {

		res.status( 500 ).json( { error: e.message } );

	}

} );
