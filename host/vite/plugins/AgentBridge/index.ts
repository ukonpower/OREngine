import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

import { AGENT_ENDPOINT, AGENT_EVENT, DEFAULT_TIMEOUT_MS } from '../../../../packages/orengine/editor/lib/AgentBridge/Protocol';

import type { AgentFocus, AgentHello, AgentHttpRequest, AgentRequest, AgentResponseChunk } from '../../../../packages/orengine/editor/lib/AgentBridge/Protocol';
import type { ServerResponse } from 'http';
import type { Plugin, WebSocketClient } from 'vite';

type Tab = {
	id: string;
	url: string;
	client: WebSocketClient;
	registeredAt: number;
	// 0 = 登録後にフォーカスされていない
	focusedAt: number;
};

type Pending = {
	tabId: string;
	chunks: string[];
	received: number;
	res: ServerResponse;
	timer: NodeJS.Timeout;
};

export type AgentBridgeOptions = {
	// dev サーバーの URL を CLI へ伝えるファイル。ポートの繰り上がりや https（webgpu）を CLI 側で推測させないため
	infoFile: string;
};

const sendJson = ( res: ServerResponse, status: number, body: unknown ) => {

	res.statusCode = status;
	res.setHeader( 'Content-Type', 'application/json' );
	res.end( JSON.stringify( body ) );

};

const readBody = ( req: NodeJS.ReadableStream ) => new Promise<string>( ( resolve, reject ) => {

	let body = '';

	req.setEncoding( 'utf8' );
	req.on( 'data', ( chunk: string ) => body += chunk );
	req.on( 'end', () => resolve( body ) );
	req.on( 'error', reject );

} );

// 最後にフォーカスされたタブ。一度もフォーカスされていなければ最後に登録されたタブ
const pickTab = ( tabs: Map<string, Tab> ) => {

	let picked: Tab | null = null;

	for ( const tab of tabs.values() ) {

		if ( ! picked ) {

			picked = tab;
			continue;

		}

		if ( tab.focusedAt > picked.focusedAt ) {

			picked = tab;

		} else if ( tab.focusedAt === picked.focusedAt && tab.registeredAt > picked.registeredAt ) {

			picked = tab;

		}

	}

	return picked;

};

// CLI からの HTTP リクエストを、HMR WebSocket 経由でエディタタブへ中継する
export const AgentBridge = ( opts: AgentBridgeOptions ): Plugin => ( {
	name: 'orengine-agent-bridge',
	apply: 'serve',
	configureServer( server ) {

		const tabs = new Map<string, Tab>();
		const pending = new Map<string, Pending>();
		const watchedSockets = new WeakSet<object>();

		/*-------------------------------
			Tabs
		-------------------------------*/

		// タブが閉じたら登録を外し、そのタブへ投げて応答待ちのリクエストを失敗させる
		const watchClose = ( client: WebSocketClient ) => {

			if ( watchedSockets.has( client.socket ) ) return;

			watchedSockets.add( client.socket );

			client.socket.on( 'close', () => {

				for ( const tab of [ ...tabs.values() ] ) {

					if ( tab.client.socket !== client.socket ) continue;

					tabs.delete( tab.id );

					for ( const [ id, p ] of [ ...pending.entries() ] ) {

						if ( p.tabId !== tab.id ) continue;

						clearTimeout( p.timer );
						pending.delete( id );
						sendJson( p.res, 502, { ok: false, error: '応答を待っている間にエディタのタブが切断されました' } );

					}

				}

			} );

		};

		server.ws.on( AGENT_EVENT.hello, ( data: AgentHello, client: WebSocketClient ) => {

			const now = Date.now();

			tabs.set( data.tabId, {
				id: data.tabId,
				url: data.url,
				client,
				registeredAt: now,
				focusedAt: data.focused ? now : 0,
			} );

			watchClose( client );

		} );

		server.ws.on( AGENT_EVENT.focus, ( data: AgentFocus ) => {

			const tab = tabs.get( data.tabId );

			if ( tab ) tab.focusedAt = Date.now();

		} );

		server.ws.on( AGENT_EVENT.response, ( data: AgentResponseChunk ) => {

			const p = pending.get( data.id );

			if ( ! p ) return;

			if ( p.chunks[ data.index ] === undefined ) {

				p.chunks[ data.index ] = data.chunk;
				p.received ++;

			}

			if ( p.received < data.count ) return;

			clearTimeout( p.timer );
			pending.delete( data.id );

			// タブが JSON にした文字列をそのまま返す（ここで parse し直すと大きな応答で無駄になる）
			p.res.statusCode = 200;
			p.res.setHeader( 'Content-Type', 'application/json' );
			p.res.end( p.chunks.join( '' ) );

		} );

		/*-------------------------------
			HTTP
		-------------------------------*/

		server.middlewares.use( AGENT_ENDPOINT, async ( req, res ) => {

			if ( req.method !== 'POST' ) {

				sendJson( res, 405, { ok: false, error: 'POST only' } );
				return;

			}

			const command = ( req.url ?? '' ).replace( /^\//, '' ).split( '?' )[ 0 ];

			if ( ! command ) {

				sendJson( res, 400, { ok: false, error: `コマンド名がありません（POST ${AGENT_ENDPOINT}/<command>）` } );
				return;

			}

			let body: AgentHttpRequest;

			try {

				const raw = await readBody( req );
				body = raw ? JSON.parse( raw ) : { args: [], options: {} };

			} catch {

				sendJson( res, 400, { ok: false, error: 'リクエストの JSON を読めません' } );
				return;

			}

			const tab = pickTab( tabs );

			if ( ! tab ) {

				sendJson( res, 503, { ok: false, error: 'エディタのタブが接続されていません。dev サーバーのエディタをブラウザで開いてください' } );
				return;

			}

			const id = crypto.randomUUID();
			const timeoutMs = body.timeoutMs ?? DEFAULT_TIMEOUT_MS;

			const timer = setTimeout( () => {

				pending.delete( id );
				sendJson( res, 504, { ok: false, error: `エディタのタブが ${timeoutMs}ms 以内に応答しませんでした（--timeout で延ばせます）` } );

			}, timeoutMs );

			pending.set( id, { tabId: tab.id, chunks: [], received: 0, res, timer } );

			const request: AgentRequest = {
				id,
				tabId: tab.id,
				command,
				args: body.args ?? [],
				options: body.options ?? {},
			};

			tab.client.send( AGENT_EVENT.request, request );

		} );

		/*-------------------------------
			Info file
		-------------------------------*/

		server.httpServer?.once( 'listening', () => {

			const address = server.httpServer?.address();

			if ( ! address || typeof address === 'string' ) return;

			const protocol = server.config.server.https ? 'https' : 'http';

			fs.mkdirSync( path.dirname( opts.infoFile ), { recursive: true } );
			fs.writeFileSync( opts.infoFile, JSON.stringify( { url: `${protocol}://localhost:${address.port}` }, null, '\t' ) );

		} );

		server.httpServer?.once( 'close', () => {

			fs.rmSync( opts.infoFile, { force: true } );

		} );

	},
} );
