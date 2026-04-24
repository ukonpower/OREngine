import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Engine } from '../../../engine/Engine';
import { capturedLogs, clearCapturedLogs } from '../../../engine/ConsoleCapture';

import type { Editor } from '..';
import type { EditorAPI } from '../EditorAPI';

type BridgeRequest = {
	id: string;
	action: string;
	params: Record<string, any>;
};

export class EditorAPIBridge {

	private _ws: WebSocket | null = null;
	private _editor: Editor;
	private _api: EditorAPI;
	private _engine: Engine;
	private _projectName: string;
	private _disposed = false;
	private _isPrimary = false;
	private _clientCount = 0;
	private _clientId: string | null = null;

	constructor( editor: Editor, projectName: string ) {

		this._editor = editor;
		this._api = editor.api;
		this._engine = editor.engine;
		this._projectName = projectName;
		this._connect();

	}

	public get clientId(): string | null {

		return this._clientId;

	}

	private _connect() {

		if ( this._disposed ) return;

		const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
		this._ws = new WebSocket( `${protocol}//${location.host}/ws/editor` );

		this._ws.onopen = () => {

			this._send( { type: 'register', projectName: this._projectName } );

		};

		this._ws.onmessage = ( e ) => this._handleMessage( e );

		this._ws.onclose = () => {

			this._isPrimary = false;
			this._clientCount = 0;
			this._clientId = null;

			this._editor.emit( 'update/apiStatus', [ {
				connected: false,
				isPrimary: false,
				clientCount: 0,
			} ] );

			if ( ! this._disposed ) setTimeout( () => this._connect(), 3000 );

		};

		this._ws.onerror = () => {

			this._ws?.close();

		};

	}

	private _handleMessage( e: MessageEvent ) {

		const msg = JSON.parse( e.data );

		switch ( msg.type ) {

		case 'executeAction':
			this._handleExecuteAction( msg );
			break;

		case 'statePush':
			this._handleStatePush( msg );
			break;

		case 'clientStatus':
			this._isPrimary = msg.isPrimary;
			this._clientCount = msg.clientCount;
			this._clientId = msg.clientId ?? null;
			this._editor.emit( 'update/apiStatus', [ {
				connected: true,
				isPrimary: this._isPrimary,
				clientCount: this._clientCount,
			} ] );
			break;

		default:
			// 既存の BridgeRequest 処理（後方互換）
			if ( msg.id && msg.action ) {

				this._handleLegacyRequest( msg as BridgeRequest );

			}

			break;

		}

	}

	// サーバーからの操作実行指示: EditorAPI経由で実行（Undo可能）
	private _handleExecuteAction( msg: { projectName: string; action: string; params: Record<string, any> } ) {

		try {

			this._dispatch( msg.action, msg.params );

		} catch ( err: any ) {

			console.error( `executeAction failed: ${msg.action}`, err );

		}

	}

	// サーバーからの再接続時の状態プッシュ
	private _handleStatePush( msg: {
		sceneData?: any;
		fullReload?: boolean;
		resources?: {
			textures: { name: string; config: any }[];
		};
	} ) {

		if ( msg.fullReload && msg.sceneData ) {

			this._engine.load( msg.sceneData );
			this._api.commandManager.clear();
			return;

		}

		if ( msg.sceneData ) {

			this._engine.deserialize( msg.sceneData );
			this._engine.emit( "update/graph" );

		}

		if ( msg.resources ) {

			const { textures } = msg.resources;

			const currentTextures = Engine.resources.textureList.map( t => t.name );

			for ( const name of currentTextures ) {

				Engine.resources.removeTextureResource( name );

			}

			for ( const t of textures ) {

				Engine.resources.addTextureResource( t.name, t.config );

			}

		}

		this._api.commandManager.clear();

	}

	// 既存の BridgeRequest 処理
	private _handleLegacyRequest( req: BridgeRequest ) {

		try {

			const data = this._dispatch( req.action, req.params );
			this._send( { id: req.id, success: true, data } );

		} catch ( err: any ) {

			this._send( { id: req.id, success: false, error: err.message || String( err ) } );

		}

	}

	private _dispatch( action: string, params: Record<string, any> ): unknown {

		switch ( action ) {

		case 'getStatus':
			return {
				connected: true,
				canUndo: this._api.canUndo,
				canRedo: this._api.canRedo,
				selectedEntityId: this._editor.serialize()?.selectedEntityId ?? null,
			};

		case 'getScene':
			return this._buildSceneTree( this._engine.root );

		case 'getEntity': {

			const entity = this._findEntity( params.uuid as string );
			return this._serializeEntity( entity );

		}

		case 'searchEntities': {

			const query = ( params.query as string || '' ).toLowerCase();
			const results: unknown[] = [];

			this._engine.root.traverse( ( e ) => {

				if ( e.name.toLowerCase().includes( query ) ) {

					results.push( {
						uuid: e.uuid,
						name: e.name,
						parentUuid: e.parent?.uuid ?? null,
						components: Array.from( e.components.values() ).map(
							c => c.constructor.name
						),
					} );

				}

			} );

			return results;

		}

		case 'getAvailableComponents': {

			const list = Engine.resources?.componentList || [];

			return list.map( ( item ) => ( {
				name: item.name,
				className: item.component.name,
			} ) );

		}

		case 'getComponentDetail': {

			const entity = this._findEntity( params.uuid as string );
			const compClass = this._resolveComponentClass( params.componentName as string );
			const comp = entity.getComponent( compClass );

			if ( ! comp ) throw new Error( `Component ${params.componentName} not found` );

			return {
				uuid: comp.uuid,
				name: comp.constructor.name,
				fields: comp.serialize(),
				fieldsDirectory: comp.serializeToDirectory(),
			};

		}

		case 'createEntity': {

			const parent = this._findEntity( params.parentUuid as string );
			const created = this._api.createEntity( parent, params.name as string || 'New Entity' );
			return { uuid: created.uuid, name: created.name };

		}

		case 'deleteEntity': {

			const entity = this._findEntity( params.uuid as string );
			this._api.deleteEntity( entity );
			return { success: true };

		}

		case 'selectEntity': {

			if ( ! params.uuid ) {

				this._api.selectEntity( null );

			} else {

				const entity = this._findEntity( params.uuid as string );
				this._api.selectEntity( entity );

			}

			return { success: true };

		}

		case 'addComponent': {

			const entity = this._findEntity( params.uuid as string );
			const compClass = this._resolveComponentClass( params.componentName as string );
			const comp = this._api.addComponent( entity, compClass );
			return { uuid: comp.uuid, componentName: params.componentName };

		}

		case 'removeComponent': {

			const entity = this._findEntity( params.uuid as string );
			const compClass = this._resolveComponentClass( params.componentName as string );
			const comp = entity.getComponent( compClass );

			if ( ! comp ) throw new Error( `Component ${params.componentName} not found on entity` );

			this._api.removeComponent( entity, compClass, comp );
			return { success: true };

		}

		case 'setField': {

			const target = this._findSerializable( params.targetUuid as string );
			this._api.setField( target, params.path as string, params.value );
			return { success: true };

		}

		case 'undo':
			this._api.undo();
			return { success: true, canUndo: this._api.canUndo, canRedo: this._api.canRedo };

		case 'redo':
			this._api.redo();
			return { success: true, canUndo: this._api.canUndo, canRedo: this._api.canRedo };

			// --- リソース読み取り ---

		case 'getResources': {

			return {
				textures: Engine.resources.textureList.map( t => ( {
					name: t.name,
					config: t.serialize( { mode: "export" } ),
				} ) ),
			};

		}

		// --- テクスチャ操作 ---

		case 'addTexture': {

			const { name, config } = params as { name: string; config: any };
			this._api.addTexture( name, config || {} );
			return { name };

		}

		case 'updateTexture': {

			const { name, config } = params as { name: string; config: any };
			this._api.updateTexture( name, config );
			const resource = Engine.resources.getTextureResource( name );
			return { name, config: resource?.serialize( { mode: "export" } ) };

		}

		case 'removeTexture': {

			const { name } = params as { name: string };
			this._api.removeTexture( name );
			return { success: true };

		}

		case 'getTexture': {

			const { name } = params as { name: string };
			const resource = Engine.resources.getTextureResource( name );
			if ( ! resource ) throw new Error( `Texture not found: ${name}` );

			return { name, config: resource.serialize( { mode: "export" } ) };

		}

		// --- シェーダー通知 ---

		case 'notifyShaderAdded': {

			Engine.resources.emit( "update" );
			return { success: true };

		}

		case 'notifyShaderRemoved': {

			Engine.resources.emit( "update" );
			return { success: true };

		}

		case 'getShaderErrors': {

			const errors = Array.from( GLP.shaderErrors.entries() ).map( ( [ name, log ] ) => ( { name, log } ) );
			return { errors };

		}

		case 'getConsoleErrors': {

			let logs = [ ...capturedLogs ];

			if ( params.level ) {

				const levels = new Set( ( params.level as string ).split( ',' ) );
				logs = logs.filter( l => levels.has( l.type ) );

			}

			return { errors: logs };

		}

		case 'clearConsoleErrors': {

			clearCapturedLogs();
			return { success: true };

		}

		// --- タイムライン制御 ---

		case 'timelinePlay': {

			this._engine.play();
			return { success: true };

		}

		case 'timelineStop': {

			this._engine.stop();
			return { success: true };

		}

		case 'timelineSeek': {

			this._engine.seek( params.frame as number );
			return { frame: params.frame };

		}

		case 'getTimelineStatus': {

			return {
				playing: this._engine.frame.playing,
				currentFrame: this._engine.frame.current,
				duration: this._engine.frameSetting.duration,
				fps: this._engine.frameSetting.fps,
			};

		}

		// --- カメラ制御 ---

		case 'setCameraPosition': {

			const eye = params.eye as { x: number; y: number; z: number };
			const target = params.target as { x: number; y: number; z: number };
			const orbitControls = this._editor.editorCamera.orbitControls;
			orbitControls.setPosition(
				new GLP.Vector( eye.x, eye.y, eye.z ),
				new GLP.Vector( target.x, target.y, target.z )
			);
			return { success: true };

		}

		case 'getCameraPosition': {

			const orbitControls = this._editor.editorCamera.orbitControls;
			return {
				eye: { x: orbitControls.eye.x, y: orbitControls.eye.y, z: orbitControls.eye.z },
				target: { x: orbitControls.target.x, y: orbitControls.target.y, z: orbitControls.target.z },
			};

		}

		// --- スクリーンショット ---

		case 'captureScreenshot': {

			const canvas = this._engine.canvas as HTMLCanvasElement;
			const format = ( params.format as string ) || 'png';
			const quality = ( params.quality as number ) || 0.9;
			const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
			const dataUrl = canvas.toDataURL( mimeType, quality );
			return { image: dataUrl, width: canvas.width, height: canvas.height, format };

		}

		default:
			throw new Error( `Unknown action: ${action}` );

		}

	}

	private _findEntity( uuid: string ): MXP.Entity {

		const entity = this._engine.root.findEntityByUUID( uuid );

		if ( ! entity ) throw new Error( `Entity not found: ${uuid}` );

		return entity;

	}

	private _findSerializable( uuid: string ): MXP.Serializable {

		const entity = this._engine.root.findEntityByUUID( uuid );

		if ( entity ) return entity;

		let found: MXP.Serializable | null = null;

		this._engine.root.traverse( ( e ) => {

			if ( found ) return;

			e.components.forEach( ( comp ) => {

				if ( comp.uuid === uuid ) found = comp;

			} );

		} );

		if ( found ) return found;

		throw new Error( `Serializable not found: ${uuid}` );

	}

	private _resolveComponentClass( name: string ): typeof MXP.Component {

		const item = Engine.resources?.getComponent( name );

		if ( ! item ) throw new Error( `Component class not found: ${name}` );

		return item.component;

	}

	private _buildSceneTree( entity: MXP.Entity ): unknown {

		return {
			uuid: entity.uuid,
			name: entity.name,
			position: { x: entity.position.x, y: entity.position.y, z: entity.position.z },
			euler: { x: entity.euler.x, y: entity.euler.y, z: entity.euler.z },
			scale: { x: entity.scale.x, y: entity.scale.y, z: entity.scale.z },
			components: Array.from( entity.components.entries() ).map(
				( [ , comp ] ) => ( { uuid: comp.uuid, name: comp.constructor.name } )
			),
			children: entity.children.map( c => this._buildSceneTree( c ) ),
		};

	}

	private _serializeEntity( entity: MXP.Entity ): unknown {

		return {
			uuid: entity.uuid,
			name: entity.name,
			position: { x: entity.position.x, y: entity.position.y, z: entity.position.z },
			euler: { x: entity.euler.x, y: entity.euler.y, z: entity.euler.z },
			scale: { x: entity.scale.x, y: entity.scale.y, z: entity.scale.z },
			components: Array.from( entity.components.entries() ).map(
				( [ , comp ] ) => ( {
					uuid: comp.uuid,
					name: comp.constructor.name,
					fields: comp.serialize(),
				} )
			),
			childrenCount: entity.children.length,
			parentUuid: entity.parent?.uuid ?? null,
		};

	}

	private _send( data: any ) {

		if ( this._ws?.readyState === WebSocket.OPEN ) {

			this._ws.send( JSON.stringify( data ) );

		}

	}

	public requestPrimary(): void {

		this._send( { type: 'requestPrimary' } );

	}

	public dispose() {

		this._disposed = true;
		this._ws?.close();

	}

}
