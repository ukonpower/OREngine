import * as BSP from 'basepower';

import { AgentCommandError, errorMessage } from './Command';
import { installErrorCollector } from './ErrorCollector';
import { observeCommands } from './ObserveCommands';
import { AGENT_EVENT, RESPONSE_CHUNK_SIZE } from './Protocol';
import { writeCommands } from './WriteCommands';

import type { AgentCommandContext, AgentCommandTable } from './Command';
import type { AgentRequest, AgentResult } from './Protocol';
import type { Editor } from '../Editor';
import type { ViteHotContext } from 'vite/types/hot.js';

const commands: AgentCommandTable = {
	...observeCommands,
	...writeCommands,
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

let attached: Attached | null = null;

/*-------------------------------
	Request
-------------------------------*/

const runCommand = async ( request: AgentRequest ): Promise<AgentResult> => {

	const command = commands[ request.command ];

	if ( ! command ) {

		return { ok: false, error: `不明なコマンドです: ${request.command}（使えるコマンド: ${Object.keys( commands ).join( ', ' )}）` };

	}

	if ( ! attached ) {

		return { ok: false, error: 'エディタの初期化が終わっていません。少し待ってから再実行してください' };

	}

	const ctx: AgentCommandContext = {
		editor: attached.editor,
		engine: attached.editor.engine,
		tabId,
		sceneName: attached.getSceneName(),
		unsaved: attached.unsaved,
	};

	try {

		const result = await command( ctx, { args: request.args, options: request.options } );

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

	hot.send( AGENT_EVENT.hello, { tabId, url: location.href, focused: document.hasFocus() } );

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

	opts.editor.api.commandManager.on( 'change', onChange );
	opts.editor.on( 'save', onSaved );
	opts.editor.engine.on( 'loaded', onSaved );

	attached = current;

	return () => {

		opts.editor.api.commandManager.off( 'change', onChange );
		opts.editor.off( 'save', onSaved );
		opts.editor.engine.off( 'loaded', onSaved );

		if ( attached === current ) {

			attached = null;

		}

	};

};
