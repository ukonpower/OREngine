import { WebSocketServer, WebSocket } from 'ws';

import type { Server } from 'http';

export type BridgeRequest = {
	id: string;
	action: string;
	params: Record<string, unknown>;
};

export type BridgeResponse = {
	id: string;
	success: boolean;
	data?: unknown;
	error?: string;
};

class EditorWSBridge {

	private _wss: WebSocketServer;
	private _client: WebSocket | null = null;
	private _pending: Map<string, {
		resolve: ( value: any ) => void;
		timer: NodeJS.Timeout;
	}> = new Map();
	private _idCounter = 0;

	constructor( server: Server ) {

		this._wss = new WebSocketServer( { server, path: '/ws/editor' } );

		this._wss.on( 'connection', ( ws ) => {

			this._client = ws;

			ws.on( 'message', ( raw ) => {

				const msg = JSON.parse( raw.toString() );

				// syncResponse の場合
				if ( msg.type === 'syncResponse' && msg.id ) {

					const pending = this._pending.get( msg.id );

					if ( pending ) {

						clearTimeout( pending.timer );
						pending.resolve( msg );
						this._pending.delete( msg.id );

					}

					return;

				}

				// 既存の BridgeResponse
				const res: BridgeResponse = msg;
				const pending = this._pending.get( res.id );

				if ( pending ) {

					clearTimeout( pending.timer );
					pending.resolve( res );
					this._pending.delete( res.id );

				}

			} );

			ws.on( 'close', () => {

				if ( this._client === ws ) this._client = null;

			} );

		} );

	}

	get connected(): boolean {

		return this._client?.readyState === WebSocket.OPEN;

	}

	send( action: string, params: Record<string, unknown> = {}, timeout = 10000 ): Promise<BridgeResponse> {

		return new Promise( ( resolve ) => {

			if ( ! this._client || this._client.readyState !== WebSocket.OPEN ) {

				resolve( { id: '', success: false, error: 'Editor not connected' } );
				return;

			}

			const id = String( ++ this._idCounter );

			const timer = setTimeout( () => {

				this._pending.delete( id );
				resolve( { id, success: false, error: 'Timeout' } );

			}, timeout );

			this._pending.set( id, { resolve, timer } );
			this._client.send( JSON.stringify( { id, action, params } ) );

		} );

	}

	async requestSync( projectName: string, timeout = 5000 ): Promise<any | null> {

		if ( ! this.connected ) return null;

		const id = String( ++ this._idCounter );

		return new Promise( ( resolve ) => {

			const timer = setTimeout( () => {

				this._pending.delete( id );
				resolve( null );

			}, timeout );

			this._pending.set( id, {
				resolve: ( res: any ) => {

					clearTimeout( timer );
					resolve( res.sceneData ?? null );

				},
				timer,
			} );

			this._client!.send( JSON.stringify( { type: 'syncRequest', id, projectName } ) );

		} );

	}

	executeAction( projectName: string, action: string, params: Record<string, unknown> ): void {

		if ( this._client?.readyState === WebSocket.OPEN ) {

			this._client.send( JSON.stringify( { type: 'executeAction', projectName, action, params } ) );

		}

	}

}

let bridge: EditorWSBridge | null = null;

export function initWSBridge( server: Server ): EditorWSBridge {

	bridge = new EditorWSBridge( server );
	return bridge;

}

export function getWSBridge(): EditorWSBridge | null {

	return bridge;

}
