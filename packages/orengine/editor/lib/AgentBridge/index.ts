import * as BSP from 'basepower';

import { AgentCommandError, errorMessage } from './Command';
import { installErrorCollector } from './ErrorCollector';
import { observeCommands } from './ObserveCommands';
import { AGENT_EVENT, AGENT_HEADLESS_PARAM, RESPONSE_CHUNK_SIZE } from './Protocol';
import { shotCommands } from './ShotCommand';
import { writeCommands } from './WriteCommands';

import type { AgentCommandContext, AgentCommandTable } from './Command';
import type { AgentRequest, AgentResult } from './Protocol';
import type { Editor } from '../Editor';
import type { ViteHotContext } from 'vite/types/hot.js';

const commands: AgentCommandTable = {
	...observeCommands,
	...writeCommands,
	...shotCommands,
};

export type AgentBridgeOptions = {
	editor: Editor;
	getSceneName: () => string | null;
};

type Attached = {
	editor: Editor;
	getSceneName: () => string | null;
	unsaved: boolean;
};

// ページ（タブ）ごとに1つ。エディタが作り直されても同じタブとして扱う
const tabId = BSP.ID.genUUID();

// CLI が headless Chromium で開いたページか。CLI が URL にクエリを付けて開く
const headless = new URLSearchParams( location.search ).has( AGENT_HEADLESS_PARAM );

// シーンの読み込み後、コマンドを受け付ける前に待つフレーム数。
// シェーダーは最初の描画でコンパイルされるので、1フレーム描き終えるまで待たないと errors にシェーダーエラーが出ない。
// 読み込み直後の rAF はエディタの描画より先に呼ばれうるので、2フレーム待って1回ぶんの描画を確実に挟む
const HEADLESS_WARMUP_FRAMES = 2;

let attached: Attached | null = null;

// headless のページは CLI が開いた直後にコマンドを受けるので、シーンの読み込みと最初の描画が済むまで実行を待たせる
let resolveHeadlessReady: () => void = () => {};

const headlessReady = new Promise<void>( ( resolve ) => {

	resolveHeadlessReady = resolve;

} );

// count フレームぶん rAF を待つ
const waitFrames = ( count: number ) => new Promise<void>( ( resolve ) => {

	const step = ( left: number ) => {

		if ( left <= 0 ) {

			resolve();
			return;

		}

		requestAnimationFrame( () => step( left - 1 ) );

	};

	step( count );

} );

/*-------------------------------
	Request
-------------------------------*/

const runCommand = async ( request: AgentRequest ): Promise<AgentResult> => {

	const command = commands[ request.command ];

	if ( ! command ) {

		return { ok: false, error: `不明なコマンドです: ${request.command}（使えるコマンド: ${Object.keys( commands ).join( ', ' )}）` };

	}

	if ( headless ) {

		await headlessReady;

	}

	if ( ! attached ) {

		return { ok: false, error: 'エディタの初期化が終わっていません。少し待ってから再実行してください' };

	}

	const ctx: AgentCommandContext = {
		editor: attached.editor,
		engine: attached.editor.engine,
		tabId,
		headless,
		sceneName: attached.getSceneName(),
		unsaved: attached.unsaved,
	};

	try {

		const result = await command( ctx, { args: request.args, options: request.options } );

		// headless のページはコマンドごとに CLI が閉じるので、書き込みはその場でファイルへ確定する。
		// ユーザーのタブでは保存しない（確定はユーザーの Ctrl+S）
		if ( headless && writeCommands[ request.command ] !== undefined ) {

			ctx.editor.save();

			return { ok: true, result, saved: true };

		}

		return { ok: true, result };

	} catch ( e ) {

		if ( e instanceof AgentCommandError ) {

			return { ok: false, error: e.message, candidates: e.candidates };

		}

		return { ok: false, error: errorMessage( e ) };

	}

};

// 応答を JSON 文字列にして、RESPONSE_CHUNK_SIZE ずつ送る
const respond = ( hot: ViteHotContext, id: string, result: AgentResult ) => {

	let json: string;

	try {

		json = JSON.stringify( result );

	} catch ( e ) {

		json = JSON.stringify( { ok: false, error: `応答を JSON にできませんでした: ${errorMessage( e )}` } );

	}

	const count = Math.max( 1, Math.ceil( json.length / RESPONSE_CHUNK_SIZE ) );

	for ( let index = 0; index < count; index ++ ) {

		const chunk = json.slice( index * RESPONSE_CHUNK_SIZE, ( index + 1 ) * RESPONSE_CHUNK_SIZE );

		hot.send( AGENT_EVENT.response, { id, index, count, chunk } );

	}

};

/*-------------------------------
	Tab
-------------------------------*/

// dev サーバーへタブを登録し、フォーカスの通知とリクエストの受付を始める。
// 通信路が HMR の WebSocket なので、dev サーバー配信時（import.meta.hot がある時）だけ動く
const connect = ( hot: ViteHotContext ) => {

	installErrorCollector();

	// コマンドは1件ずつ順に実行する。途中で await するコマンド（shot の読み戻し等）が
	// エンジンの共有状態を一時的に書き換えている間に、次のコマンドが割り込まないようにするため
	let queue: Promise<void> = Promise.resolve();

	hot.on( AGENT_EVENT.request, ( request: AgentRequest ) => {

		if ( request.tabId !== tabId ) return;

		queue = queue.then( async () => {

			respond( hot, request.id, await runCommand( request ) );

		} );

	} );

	const notifyFocus = () => {

		hot.send( AGENT_EVENT.focus, { tabId } );

	};

	window.addEventListener( 'focus', notifyFocus );
	window.addEventListener( 'pointerdown', notifyFocus );

	hot.send( AGENT_EVENT.hello, { tabId, url: location.href, focused: document.hasFocus(), headless } );

};

if ( import.meta.hot ) {

	connect( import.meta.hot );

}

/*-------------------------------
	Attach
-------------------------------*/

// コマンドの操作対象にするエディタを繋ぐ。戻り値で外す
export const attachAgentBridge = ( opts: AgentBridgeOptions ) => {

	const current: Attached = { editor: opts.editor, getSceneName: opts.getSceneName, unsaved: false };

	const onChange = () => {

		current.unsaved = true;

	};

	const onSaved = () => {

		current.unsaved = false;

	};

	const onLoaded = () => {

		current.unsaved = false;

		if ( headless ) {

			waitFrames( HEADLESS_WARMUP_FRAMES ).then( resolveHeadlessReady );

		}

	};

	opts.editor.api.commandManager.on( 'change', onChange );
	opts.editor.on( 'save', onSaved );
	opts.editor.engine.on( 'loaded', onLoaded );

	attached = current;

	return () => {

		opts.editor.api.commandManager.off( 'change', onChange );
		opts.editor.off( 'save', onSaved );
		opts.editor.engine.off( 'loaded', onLoaded );

		if ( attached === current ) {

			attached = null;

		}

	};

};
