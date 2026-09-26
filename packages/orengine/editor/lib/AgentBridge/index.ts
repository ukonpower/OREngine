import * as BSP from 'basepower';

import { AgentCommandError, errorMessage } from './Command';
import { installErrorCollector } from './ErrorCollector';
import { observeCommands } from './ObserveCommands';
import { AGENT_EVENT, AGENT_HEADLESS_PARAM, RESPONSE_CHUNK_SIZE } from './Protocol';
import { sceneCommands } from './SceneCommands';
import { settingObserveCommands, settingWriteCommands } from './SettingCommands';
import { shotCommands } from './ShotCommand';
import { writeCommands } from './WriteCommands';

import type { AgentCommandContext, AgentCommandTable, AgentSceneControl } from './Command';
import type { AgentRequest, AgentResult } from './Protocol';
import type { Editor } from '../Editor';
import type { ViteHotContext } from 'vite/types/hot.js';

// 書き込み系。実行後にファイルへ保存し、応答に書き込み先（write）を付ける
const mutatingCommands: AgentCommandTable = {
	...writeCommands,
	...settingWriteCommands,
	...sceneCommands,
};

const commands: AgentCommandTable = {
	...observeCommands,
	...settingObserveCommands,
	...mutatingCommands,
	...shotCommands,
};

export type AgentBridgeOptions = {
	editor: Editor;
	// コマンド実行時に最新のシーン一覧・操作を読む。シーンを持たないページは null
	getScenes: () => AgentSceneControl | null;
	// 直前の editor.save() によるファイルへの書き込みの完了を待つ。失敗したら reject する
	waitForSave: () => Promise<void>;
};

type Attached = AgentBridgeOptions & {
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

const runCommand = async ( hot: ViteHotContext, request: AgentRequest ): Promise<AgentResult> => {

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

	const scenes = attached.getScenes();

	const ctx: AgentCommandContext = {
		editor: attached.editor,
		engine: attached.editor.engine,
		tabId,
		headless,
		sceneName: scenes?.current ?? null,
		scenes,
		unsaved: attached.unsaved,
	};

	// コマンドの await 中にエディタが作り直されると attached が差し替わるので、保存を待つ相手は実行開始時のものに固定する
	const current = attached;

	try {

		const result = await command( ctx, { args: request.args, options: request.options } );

		if ( mutatingCommands[ request.command ] === undefined ) {

			return { ok: true, result };

		}

		// 書き込みは接続先によらずその場でファイルへ保存する。タブのままだと Ctrl+S せずに閉じたとき黙って消え、
		// headless はコマンドごとに CLI が閉じるため。タブに CLI 以前の未保存の変更があれば一緒に保存される。
		// scene-open のあとも保存して editor.json の scene を更新し、次に開く headless が同じシーンを開くようにする
		ctx.editor.save();

		try {

			// エージェントが応答の直後にファイルを読んでも反映済みであるよう、書き込みの完了まで応答を待たせる
			await current.waitForSave();

		} catch ( e ) {

			return { ok: false, error: `タブには反映しましたが、ファイルへの保存に失敗しました: ${errorMessage( e )}` };

		}

		// 他のエディタタブは古いシーンのままなので、サーバーにリロードさせる
		hot.send( AGENT_EVENT.saved, { tabId } );

		return { ok: true, result, write: { connection: headless ? 'headless' : 'tab' } };

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

			respond( hot, request.id, await runCommand( hot, request ) );

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

	const current: Attached = { ...opts, unsaved: false };

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
