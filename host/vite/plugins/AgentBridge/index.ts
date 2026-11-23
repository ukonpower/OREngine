import crypto from 'crypto';
import path from 'path';

import { AGENT_BASELINE_ENDPOINT, AGENT_ENDPOINT, AGENT_EVENT, AGENT_NO_TAB_STATUS, AGENT_TAB_HEADER, DEFAULT_TIMEOUT_MS, DEFAULT_WAIT_MS } from '../../../../packages/orengine/editor/lib/AgentBridge/Protocol';
import { registerDevServer, unregisterDevServer } from '../../../devServerRegistry';

import type { AgentFocus, AgentHello, AgentHttpRequest, AgentReady, AgentRequest, AgentResponseChunk, AgentSaved, AgentServerInfo, AgentTabInfo, AgentUpdated } from '../../../../packages/orengine/editor/lib/AgentBridge/Protocol';
import type { DevServerOwner } from '../../../devServerRegistry';
import type { RendererName } from '../../configs';
import type { ServerResponse } from 'http';
import type { Plugin, WebSocketClient } from 'vite';

type Tab = AgentTabInfo & {
	client: WebSocketClient;
	// 最後にリロード（full-reload）を送った時刻。再接続（hello）で 0 に戻る
	reloadRequestedAt: number;
	// 切れた時刻（connected が false の間だけ意味がある）
	disconnectedAt: number;
};

type Pending = {
	tabId: string;
	chunks: string[];
	received: number;
	res: ServerResponse;
	timer: NodeJS.Timeout;
};

export type AgentBridgeOptions = {
	project: string;
	projectDir: string;
	renderer: RendererName;
	// null なら登録簿（host/devServerRegistry）に載せない。URL を自分で知っている呼び出し側（tests/scene-shots）が、
	// orengine-cli の接続先の候補に入らないようにする
	owner: DevServerOwner | null;
};

// リロードで切れたタブの再接続を待つ時間。切れてからこの時間が過ぎたら閉じたタブとみなして外す。
// リロードを送っていないのに切れた（タブを閉じた・本人が F5 した）ときは短く待つ
const RELOAD_RECONNECT_MS = 30000;
const CLOSE_GRACE_MS = 3000;

// リロードを送ってからこの時間たっても切れないタブは、読み込み直しを止めている（未保存の確認で「とどまる」など）とみなす
const RELOAD_STUCK_MS = 8000;

// タブの状態を確かめ直す間隔
const WAIT_POLL_MS = 50;

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

const sleep = ( ms: number ) => new Promise<void>( ( resolve ) => setTimeout( resolve, ms ) );

// ユーザーのタブのうち最後にフォーカスされたもの。一度もフォーカスされていなければ最後に登録されたもの。
// headless のページはユーザーのタブが1つも無いときだけ選ぶ（別の CLI が開いたまま閉じる途中のこともあるため）。
// リロード中で切れているタブも候補に入れる（戻ってくるのを待つため）
const pickTab = ( tabs: Map<string, Tab> ) => {

	let picked: Tab | null = null;

	for ( const tab of tabs.values() ) {

		if ( ! picked ) {

			picked = tab;
			continue;

		}

		if ( picked.headless && ! tab.headless ) {

			picked = tab;
			continue;

		}

		if ( ! picked.headless && tab.headless ) {

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

// full-reload がこのタブを読み込み直させるか。vite のクライアント（vite/dist/client/client.mjs の full-reload）と同じ判定
const reloadsTab = ( payload: { path?: string }, tabUrl: string ) => {

	if ( ! payload.path || ! payload.path.endsWith( '.html' ) ) return true;

	const pagePath = decodeURI( new URL( tabUrl ).pathname );

	if ( payload.path === '/index.html' ) return true;

	return pagePath === payload.path || ( pagePath.endsWith( '/' ) && pagePath + 'index.html' === payload.path );

};

const toTabInfo = ( tab: Tab ): AgentTabInfo => ( {
	id: tab.id,
	url: tab.url,
	headless: tab.headless,
	connected: tab.connected,
	ready: tab.ready,
	scene: tab.scene,
	focusedAt: tab.focusedAt,
	registeredAt: tab.registeredAt,
	pendingUpdates: tab.pendingUpdates,
	stale: tab.stale,
} );

type WaitResult = { tab: Tab } | { status: number; error: string };

// CLI からの HTTP リクエストを、HMR WebSocket 経由でエディタタブへ中継する
export const AgentBridge = ( opts: AgentBridgeOptions ): Plugin => ( {
	name: 'orengine-agent-bridge',
	apply: 'serve',
	configureServer( server ) {

		const tabs = new Map<string, Tab>();
		const pending = new Map<string, Pending>();
		const watchedSockets = new WeakSet<object>();
		const startedAt = Date.now();
		let lastRequestAt = 0;

		/*-------------------------------
			Tabs
		-------------------------------*/

		// 切れたタブは、リロードなら再接続を待つためにしばらく残す。応答待ちのリクエストは失敗させる
		const watchClose = ( client: WebSocketClient ) => {

			if ( watchedSockets.has( client.socket ) ) return;

			watchedSockets.add( client.socket );

			client.socket.on( 'close', () => {

				for ( const tab of tabs.values() ) {

					if ( tab.client.socket !== client.socket ) continue;

					tab.connected = false;
					tab.ready = false;
					tab.disconnectedAt = Date.now();

					for ( const [ id, p ] of [ ...pending.entries() ] ) {

						if ( p.tabId !== tab.id ) continue;

						clearTimeout( p.timer );
						pending.delete( id );
						sendJson( p.res, 502, { ok: false, error: '応答を待っている間にエディタのタブが切断されました（リロードされた可能性があります）', interrupted: true } );

					}

				}

			} );

		};

		// 再接続しないまま待つ時間を過ぎたタブを外す
		const sweep = setInterval( () => {

			const now = Date.now();

			for ( const tab of [ ...tabs.values() ] ) {

				if ( tab.connected ) continue;

				let grace = CLOSE_GRACE_MS;

				if ( tab.reloadRequestedAt > 0 ) grace = RELOAD_RECONNECT_MS;

				if ( now - tab.disconnectedAt > grace ) tabs.delete( tab.id );

			}

		}, 1000 );

		sweep.unref();

		server.httpServer?.once( 'close', () => clearInterval( sweep ) );

		server.ws.on( AGENT_EVENT.hello, ( data: AgentHello, client: WebSocketClient ) => {

			const now = Date.now();
			const previous = tabs.get( data.tabId );

			// リロードで戻ってきたタブはフォーカスの順番を引き継ぐ（戻ってくる間に別のタブへ接続先が移らないように）
			let focusedAt = data.focused ? now : 0;

			if ( previous ) focusedAt = Math.max( focusedAt, previous.focusedAt );

			tabs.set( data.tabId, {
				id: data.tabId,
				url: data.url,
				client,
				headless: data.headless,
				connected: true,
				ready: data.ready,
				scene: data.scene,
				registeredAt: previous?.registeredAt ?? now,
				focusedAt,
				pendingUpdates: 0,
				stale: false,
				reloadRequestedAt: 0,
				disconnectedAt: 0,
			} );

			watchClose( client );

		} );

		server.ws.on( AGENT_EVENT.focus, ( data: AgentFocus ) => {

			const tab = tabs.get( data.tabId );

			if ( tab ) tab.focusedAt = Date.now();

		} );

		server.ws.on( AGENT_EVENT.ready, ( data: AgentReady ) => {

			const tab = tabs.get( data.tabId );

			if ( ! tab ) return;

			tab.ready = data.ready;
			tab.scene = data.scene;

		} );

		server.ws.on( AGENT_EVENT.updated, ( data: AgentUpdated ) => {

			const tab = tabs.get( data.tabId );

			if ( tab ) tab.pendingUpdates = Math.max( 0, tab.pendingUpdates - 1 );

		} );

		const requestReload = ( tab: Tab ) => {

			if ( tab.connected ) tab.reloadRequestedAt = Date.now();

		};

		// vite（と ProjectWatchReload）がタブへ送る更新・リロードを数える。
		// タブはそれを反映し終えたら updated / hello で知らせてくるので、それまではコマンドを送らない
		const originalSend = server.ws.send.bind( server.ws ) as ( ...args: unknown[] ) => void;

		server.ws.send = ( ( ...args: unknown[] ) => {

			const payload = args[ 0 ] as { type?: string; path?: string };

			if ( typeof payload === 'object' && payload !== null ) {

				for ( const tab of tabs.values() ) {

					if ( ! tab.connected ) continue;

					if ( payload.type === 'update' ) tab.pendingUpdates ++;

					if ( payload.type === 'full-reload' && reloadsTab( payload, tab.url ) ) requestReload( tab );

				}

			}

			originalSend( ...args );

		} ) as typeof server.ws.send;

		// 保存したタブ以外のエディタタブ（ユーザーのタブ・headless とも）をフルリロードさせる。
		// API 経由の保存は ProjectWatchReload のリロードを recentWrites でタブを区別せず抑制するので、ここで個別に送る。
		// 外部からファイルを編集したときのリロードと同じく、リロードされるタブに未保存の変更があればブラウザの離脱の確認が出る
		server.ws.on( AGENT_EVENT.saved, ( data: AgentSaved ) => {

			for ( const tab of tabs.values() ) {

				if ( tab.id === data.tabId || ! tab.connected ) continue;

				requestReload( tab );
				tab.client.send( { type: 'full-reload' } );

			}

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
			p.res.setHeader( AGENT_TAB_HEADER, p.tabId );
			p.res.end( p.chunks.join( '' ) );

		} );

		/*-------------------------------
			Wait
		-------------------------------*/

		// 送り先のタブが、リロード・コードの更新・シーンの読み込みを終えるまで待つ。
		// 待っても終わらないときは理由を返す（黙って古いタブ・読み込み途中のタブへ送らない）
		const waitForTab = async ( waitMs: number ): Promise<WaitResult> => {

			const deadline = Date.now() + waitMs;

			for ( ;; ) {

				const tab = pickTab( tabs );

				if ( ! tab ) {

					return { status: AGENT_NO_TAB_STATUS, error: 'エディタのタブが接続されていません' };

				}

				let waiting = '';

				if ( tab.stale ) {

					return { status: 409, error: staleMessage( tab ) };

				}

				if ( ! tab.connected ) {

					waiting = 'リロードしたタブの再接続';

				} else if ( tab.reloadRequestedAt > 0 ) {

					if ( Date.now() - tab.reloadRequestedAt > RELOAD_STUCK_MS ) {

						tab.stale = true;

						return { status: 409, error: staleMessage( tab ) };

					}

					waiting = 'タブのリロード';

				} else if ( ! tab.ready ) {

					waiting = 'タブのシーンの読み込み';

				} else if ( tab.pendingUpdates > 0 ) {

					waiting = 'タブのコードの更新（HMR）';

				} else {

					return { tab };

				}

				if ( Date.now() > deadline ) {

					return { status: 504, error: `${waitMs}ms 待っても${waiting}が終わりませんでした（${tab.url}）。タブでエラーが出ていないか確かめてください` };

				}

				await sleep( WAIT_POLL_MS );

			}

		};

		const staleMessage = ( tab: Tab ) => {

			let who = '本人のタブ';

			if ( tab.headless ) who = 'headless のページ';

			return `${who}（${tab.url}）が、コードやシーンファイルの変更によるリロードをしていません（未保存の変更の確認で止まっている可能性があります）。古いコード・古いシーンのままなので、タブで保存するか変更を破棄してリロードしてもらってください`;

		};

		/*-------------------------------
			HTTP
		-------------------------------*/

		server.middlewares.use( AGENT_ENDPOINT, async ( req, res ) => {

			const command = ( req.url ?? '' ).replace( /^\//, '' ).split( '?' )[ 0 ];

			if ( req.method === 'GET' && ! command ) {

				const info: AgentServerInfo = {
					project: opts.project,
					projectDir: opts.projectDir,
					renderer: opts.renderer,
					owner: opts.owner ?? 'user',
					pid: process.pid,
					startedAt,
					lastRequestAt,
					tabs: [ ...tabs.values() ].map( toTabInfo ),
				};

				sendJson( res, 200, info );
				return;

			}

			if ( req.method !== 'POST' ) {

				sendJson( res, 405, { ok: false, error: 'POST only' } );
				return;

			}

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

			lastRequestAt = Date.now();

			const waited = await waitForTab( body.waitMs ?? DEFAULT_WAIT_MS );

			if ( ! ( 'tab' in waited ) ) {

				sendJson( res, waited.status, { ok: false, error: waited.error } );
				return;

			}

			const tab = waited.tab;
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

		// 「本人が画面で変えた値」の基準（タブの AgentBridge/ChangeTracker が読み書きする）。dev サーバーを閉じると消える
		const baselines = new Map<string, string>();

		server.middlewares.use( AGENT_BASELINE_ENDPOINT, async ( req, res ) => {

			const scene = decodeURIComponent( ( req.url ?? '' ).replace( /^\//, '' ).split( '?' )[ 0 ] );

			if ( req.method === 'GET' ) {

				const saved = baselines.get( scene );

				if ( saved === undefined ) {

					sendJson( res, 404, { error: 'no baseline' } );
					return;

				}

				res.statusCode = 200;
				res.setHeader( 'Content-Type', 'application/json' );
				res.end( saved );
				return;

			}

			if ( req.method === 'POST' ) {

				baselines.set( scene, await readBody( req ) );
				sendJson( res, 200, { ok: true } );
				return;

			}

			sendJson( res, 405, { error: 'GET / POST only' } );

		} );

		/*-------------------------------
			Registry
		-------------------------------*/

		const owner = opts.owner;

		if ( owner === null ) return;

		let url: string | null = null;

		server.httpServer?.once( 'listening', () => {

			const address = server.httpServer?.address();

			if ( ! address || typeof address === 'string' ) return;

			const protocol = server.config.server.https ? 'https' : 'http';

			url = `${protocol}://localhost:${address.port}`;

			registerDevServer( {
				url,
				pid: process.pid,
				project: opts.project,
				projectDir: path.resolve( opts.projectDir ),
				renderer: opts.renderer,
				owner,
				startedAt,
			} );

		} );

		server.httpServer?.once( 'close', () => {

			if ( url ) unregisterDevServer( url, process.pid );

		} );

	},
} );
