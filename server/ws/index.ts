import { WebSocketServer, WebSocket } from 'ws';

import { HeadlessBrowser } from '../headless/HeadlessBrowser';

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

type ClientInfo = {
	projectName: string;
	clientId: string;
};

class EditorWSBridge {

	private _wss: WebSocketServer;
	private _clients: Map<WebSocket, ClientInfo> = new Map();
	private _pending: Map<string, {
		resolve: ( value: any ) => void;
		timer: NodeJS.Timeout;
	}> = new Map();
	private _idCounter = 0;
	private _clientIdCounter = 0;
	private _headless: HeadlessBrowser | null = null;

	constructor( server: Server ) {

		this._wss = new WebSocketServer( { server, path: '/ws/editor' } );

		this._wss.on( 'connection', ( ws ) => {

			ws.on( 'message', ( raw ) => {

				const msg = JSON.parse( raw.toString() );

				if ( msg.type === 'register' && msg.projectName ) {

					this._touchClient( ws, msg.projectName );
					this._broadcastClientStatus( msg.projectName );
					return;

				}

				if ( msg.type === 'requestPrimary' ) {

					const info = this._clients.get( ws );
					if ( ! info ) return;

					this._touchClient( ws, info.projectName );
					this._broadcastClientStatus( info.projectName );
					return;

				}

				this._touchClient( ws );

				const res: BridgeResponse = msg;
				const pending = this._pending.get( res.id );

				if ( pending ) {

					clearTimeout( pending.timer );
					pending.resolve( res );
					this._pending.delete( res.id );

				}

			} );

			ws.on( 'close', () => {

				const info = this._clients.get( ws );
				this._clients.delete( ws );

				if ( info ) {

					this._broadcastClientStatus( info.projectName );

				}

			} );

		} );

	}

	get connected(): boolean {

		return this._clients.size > 0;

	}

	private _touchClient( ws: WebSocket, projectName?: string ): void {

		const existing = this._clients.get( ws );
		const name = projectName ?? existing?.projectName;

		if ( ! name ) return;

		const clientId = existing?.clientId ?? String( ++ this._clientIdCounter );

		this._clients.delete( ws );
		this._clients.set( ws, { projectName: name, clientId } );

	}

	private _findClients( projectName: string ): WebSocket[] {

		const clients: WebSocket[] = [];

		for ( const [ ws, info ] of this._clients ) {

			if ( info.projectName === projectName && ws.readyState === WebSocket.OPEN ) {

				clients.push( ws );

			}

		}

		return clients;

	}

	private _broadcastClientStatus( projectName: string ): void {

		const clients = this._findClients( projectName );
		const primaryWs = this._findClient( projectName );

		for ( const ws of clients ) {

			const info = this._clients.get( ws );

			ws.send( JSON.stringify( {
				type: 'clientStatus',
				isPrimary: ws === primaryWs,
				clientId: info?.clientId,
				clientCount: clients.length,
			} ) );

		}

	}

	private _findClient( projectName: string ): WebSocket | null {

		const clients = this._findClients( projectName );
		return clients.at( - 1 ) ?? null;

	}

	findClientById( projectName: string, clientId: string ): WebSocket | null {

		for ( const [ ws, info ] of this._clients ) {

			if ( info.projectName === projectName && info.clientId === clientId && ws.readyState === WebSocket.OPEN ) {

				return ws;

			}

		}

		return null;

	}

	getPrimaryClient( projectName: string ): WebSocket | null {

		return this._findClient( projectName );

	}

	setHeadlessFallback( headless: HeadlessBrowser | null ): void {

		this._headless = headless;

	}

	async ensurePrimaryClient( projectName: string, waitMs = 15000 ): Promise<WebSocket | null> {

		const existing = this._findClient( projectName );
		if ( existing ) {

			this._headless?.touch();
			return existing;

		}

		if ( ! this._headless ) return null;

		await this._headless.ensureStarted();

		const start = Date.now();

		while ( Date.now() - start < waitMs ) {

			const client = this._findClient( projectName );
			if ( client ) return client;
			await new Promise( ( r ) => setTimeout( r, 200 ) );

		}

		return null;

	}

	async closeHeadless(): Promise<void> {

		if ( this._headless ) {

			await this._headless.close();
			this._headless = null;

		}

	}

	send( projectName: string, action: string, params: Record<string, unknown> = {}, timeout = 10000 ): Promise<BridgeResponse> {

		return new Promise( ( resolve ) => {

			const client = this._findClient( projectName );

			if ( ! client ) {

				resolve( { id: '', success: false, error: 'Editor not connected' } );
				return;

			}

			const id = String( ++ this._idCounter );

			const timer = setTimeout( () => {

				this._pending.delete( id );
				resolve( { id, success: false, error: 'Timeout' } );

			}, timeout );

			this._pending.set( id, { resolve, timer } );
			client.send( JSON.stringify( { id, action, params } ) );

		} );

	}

	executeAction( projectName: string, action: string, params: Record<string, unknown> ): void {

		for ( const [ ws, info ] of this._clients ) {

			if ( info.projectName === projectName && ws.readyState === WebSocket.OPEN ) {

				ws.send( JSON.stringify( { type: 'executeAction', projectName, action, params } ) );

			}

		}

	}

	isProjectConnected( projectName: string ): boolean {

		return this._findClient( projectName ) !== null;

	}

	broadcastState(
		projectName: string,
		sceneData: unknown,
		options: {
			exclude?: WebSocket | null;
			fullReload?: boolean;
		} = {},
	): void {

		for ( const ws of this._findClients( projectName ) ) {

			if ( options.exclude && ws === options.exclude ) {

				continue;

			}

			ws.send( JSON.stringify( {
				type: 'statePush',
				sceneData,
				fullReload: options.fullReload ?? true,
			} ) );

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
