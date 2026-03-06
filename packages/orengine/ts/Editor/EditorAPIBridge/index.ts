import * as MXP from 'maxpower';

import { Engine } from '../../Engine';

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
	private _disposed = false;

	constructor( editor: Editor ) {

		this._editor = editor;
		this._api = editor.api;
		this._engine = editor.engine;
		this._connect();

	}

	private _connect() {

		if ( this._disposed ) return;

		const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
		this._ws = new WebSocket( `${protocol}//${location.host}/ws/editor` );

		this._ws.onmessage = ( e ) => this._handleMessage( e );

		this._ws.onclose = () => {

			if ( ! this._disposed ) setTimeout( () => this._connect(), 3000 );

		};

		this._ws.onerror = () => {

			this._ws?.close();

		};

	}

	private _handleMessage( e: MessageEvent ) {

		const msg = JSON.parse( e.data );

		switch ( msg.type ) {

			case 'syncRequest':
				this._handleSyncRequest( msg );
				break;

			case 'executeAction':
				this._handleExecuteAction( msg );
				break;

			default:
				// 既存の BridgeRequest 処理（後方互換）
				if ( msg.id && msg.action ) {

					this._handleLegacyRequest( msg as BridgeRequest );

				}

				break;

		}

	}

	// サーバーからの同期リクエスト: 現在のシーンスナップショットを返す
	private _handleSyncRequest( msg: { id: string; projectName: string } ) {

		const sceneData = this._engine.serialize( { mode: "export" } );

		this._send( {
			type: 'syncResponse',
			id: msg.id,
			sceneData,
		} as any );

	}

	// サーバーからの操作実行指示: EditorAPI経由で実行（Undo可能）
	private _handleExecuteAction( msg: { projectName: string; action: string; params: Record<string, any> } ) {

		try {

			this._dispatch( msg.action, msg.params );

		} catch ( err: any ) {

			console.error( `executeAction failed: ${msg.action}`, err );

		}

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

	public dispose() {

		this._disposed = true;
		this._ws?.close();

	}

}
