import * as BSP from 'basepower';
import * as MXP from 'maxpower';

import { batchCommands } from './BatchCommand';
import { changeCommands, trackWrite } from './ChangeTracker';
import { AgentCommandError, errorMessage } from './Command';
import { installErrorCollector } from './ErrorCollector';
import { keyFrameObserveCommands, keyFrameWriteCommands } from './KeyFrameCommands';
import { observeCommands } from './ObserveCommands';
import { AGENT_EVENT, AGENT_HEADLESS_KEEP, AGENT_HEADLESS_PARAM, RESPONSE_CHUNK_SIZE } from './Protocol';
import { sceneCommands } from './SceneCommands';
import { settingObserveCommands, settingWriteCommands } from './SettingCommands';
import { shotCommands } from './ShotCommand';
import { writeCommands } from './WriteCommands';

import type { AgentCommandContext, AgentCommandTable, AgentSceneControl } from './Command';
import type { AgentConnection, AgentRequest, AgentResult } from './Protocol';
import type { Editor } from '../Editor';
import type { ViteHotContext } from 'vite/types/hot.js';

// 書き込み系。実行後にファイルへ保存し、応答に書き込み先（write）を付ける
const mutatingCommands: AgentCommandTable = {
	...writeCommands,
	...settingWriteCommands,
	...keyFrameWriteCommands,
	...sceneCommands,
};

const commands: AgentCommandTable = {
	...observeCommands,
	...changeCommands,
	...settingObserveCommands,
	...keyFrameObserveCommands,
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

// タブごとに1つ。sessionStorage に置き、リロードしても同じ ID で名乗る（dev サーバーがリロード後のタブを同じタブとして待つため）
const TAB_ID_KEY = 'orengine:agent:tabId';

const loadTabId = () => {

	try {

		const saved = sessionStorage.getItem( TAB_ID_KEY );

		if ( saved ) return saved;

		const id = BSP.ID.genUUID();
		sessionStorage.setItem( TAB_ID_KEY, id );

		return id;

	} catch {

		return BSP.ID.genUUID();

	}

};

const tabId = loadTabId();

// CLI が headless Chromium で開いたページか。CLI が URL にクエリを付けて開く
const headlessParam = new URLSearchParams( location.search ).get( AGENT_HEADLESS_PARAM );
const headless = headlessParam !== null;

let connection: AgentConnection = 'tab';

if ( headlessParam === AGENT_HEADLESS_KEEP ) {

	connection = 'own';

} else if ( headless ) {

	connection = 'headless';

}

// シーンの読み込み後、headless のページがコマンドを受け付ける前に待つフレーム数。
// シェーダーは最初の描画でコンパイルされるので、1フレーム描き終えるまで待たないと errors にシェーダーエラーが出ない。
// 読み込み直後の rAF はエディタの描画より先に呼ばれうるので、2フレーム待って1回ぶんの描画を確実に挟む。
// 本人のタブは背景にあると rAF が止まるので待たない
const HEADLESS_WARMUP_FRAMES = 2;

let attached: AgentBridgeOptions | null = null;
let hot: ViteHotContext | null = null;

// シーンを読み込み終えてコマンドを受けられるか。dev サーバーはこれが true になるまでコマンドを送らない
let ready = false;
let readyWaiters: ( () => void )[] = [];

// コードの更新・リロードの予告を受けるたびに増える。実行中に変わったら、読み取り系の結果は信じられない
let codeEpoch = 0;

const setReady = ( value: boolean ) => {

	ready = value;

	if ( ready ) {

		for ( const resolve of readyWaiters ) resolve();

		readyWaiters = [];

	}

	hot?.send( AGENT_EVENT.ready, { tabId, ready, scene: attached?.getScenes()?.current ?? null } );

};

const waitReady = () => new Promise<void>( ( resolve ) => {

	if ( ready ) {

		resolve();
		return;

	}

	readyWaiters.push( resolve );

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

const isMutating = ( command: string, args: string[] ) => {

	if ( command === 'batch' ) return batchHasWrite( args );

	return mutatingCommands[ command ] !== undefined;

};

const { batch, batchHasWrite } = batchCommands( { commands, mutatingCommands } );

const allCommands: AgentCommandTable = { ...commands, batch };

const runCommand = async ( request: AgentRequest ): Promise<AgentResult> => {

	const command = allCommands[ request.command ];

	if ( ! command ) {

		return { ok: false, error: `不明なコマンドです: ${request.command}（使えるコマンド: ${Object.keys( allCommands ).join( ', ' )}）` };

	}

	await waitReady();

	if ( ! attached ) {

		return { ok: false, error: 'エディタの初期化が終わっていません。少し待ってから再実行してください' };

	}

	const scenes = attached.getScenes();

	const ctx: AgentCommandContext = {
		editor: attached.editor,
		engine: attached.editor.engine,
		tabId,
		headless,
		connection,
		sceneName: scenes?.current ?? null,
		scenes,
		unsaved: attached.editor.unsaved,
	};

	// コマンドの await 中にエディタが作り直されると attached が差し替わるので、保存を待つ相手は実行開始時のものに固定する
	const current = attached;
	const mutating = isMutating( request.command, request.args );
	const epoch = codeEpoch;

	try {

		const input = { args: request.args, options: request.options };
		let result: unknown;

		// 本人が画面で変えた値（changes）と見分けるため、シーン CLI の書き込みで変わった値を基準に足す。
		// シーンを切り替えるコマンドは前後で別のシーンになるので対象外
		if ( mutating && sceneCommands[ request.command ] === undefined ) {

			result = await trackWrite( ctx, async () => command( ctx, input ) );

		} else {

			result = await command( ctx, input );

		}

		if ( ! mutating ) {

			// 撮影の途中で HMR の更新が入ると、古いコードと新しいコードの混ざった絵になる
			if ( codeEpoch !== epoch ) {

				return { ok: false, error: '実行中にタブがコードの更新を受けたので、結果を捨てました', interrupted: true };

			}

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
		hot?.send( AGENT_EVENT.saved, { tabId } );

		return { ok: true, result, write: { connection } };

	} catch ( e ) {

		if ( e instanceof AgentCommandError ) {

			return { ok: false, error: e.message, candidates: e.candidates };

		}

		return { ok: false, error: errorMessage( e ) };

	}

};

// 応答を JSON 文字列にして、RESPONSE_CHUNK_SIZE ずつ送る
const respond = ( id: string, result: AgentResult ) => {

	let json: string;

	try {

		json = JSON.stringify( result );

	} catch ( e ) {

		json = JSON.stringify( { ok: false, error: `応答を JSON にできませんでした: ${errorMessage( e )}` } );

	}

	const count = Math.max( 1, Math.ceil( json.length / RESPONSE_CHUNK_SIZE ) );

	for ( let index = 0; index < count; index ++ ) {

		const chunk = json.slice( index * RESPONSE_CHUNK_SIZE, ( index + 1 ) * RESPONSE_CHUNK_SIZE );

		hot?.send( AGENT_EVENT.response, { id, index, count, chunk } );

	}

};

/*-------------------------------
	Tab
-------------------------------*/

// dev サーバーへタブを登録し、フォーカスの通知とリクエストの受付を始める。
// 通信路が HMR の WebSocket なので、dev サーバー配信時（import.meta.hot がある時）だけ動く
const connect = ( context: ViteHotContext ) => {

	hot = context;

	installErrorCollector();

	// コマンドは1件ずつ順に実行する。途中で await するコマンド（shot の読み戻し等）が
	// エンジンの共有状態を一時的に書き換えている間に、次のコマンドが割り込まないようにするため
	let queue: Promise<void> = Promise.resolve();

	context.on( AGENT_EVENT.request, ( request: AgentRequest ) => {

		if ( request.tabId !== tabId ) return;

		queue = queue.then( async () => {

			respond( request.id, await runCommand( request ) );

		} );

	} );

	context.on( 'vite:beforeUpdate', () => {

		codeEpoch ++;

	} );

	context.on( 'vite:beforeFullReload', () => {

		codeEpoch ++;

	} );

	// dev サーバーは送った更新の数と突き合わせ、反映し終えるまでこのタブへコマンドを送らない
	context.on( 'vite:afterUpdate', () => {

		context.send( AGENT_EVENT.updated, { tabId } );

	} );

	const notifyFocus = () => {

		context.send( AGENT_EVENT.focus, { tabId } );

	};

	window.addEventListener( 'focus', notifyFocus );
	window.addEventListener( 'pointerdown', notifyFocus );

	context.send( AGENT_EVENT.hello, {
		tabId,
		url: location.href,
		focused: document.hasFocus(),
		headless,
		ready,
		scene: attached?.getScenes()?.current ?? null,
	} );

};

if ( import.meta.hot ) {

	// HMR（React の Fast Refresh が上の境界で受ける）でこのモジュールだけを読み直すと、古いモジュールの受付（hot.on）と
	// 受付可の状態が残り、同じ tabId で2つが名乗り合う。読み直されたらページごとリロードする。
	// hot.data は同じモジュールの読み直しの間だけ残る（vite 8 の hot.decline は何もしないので使えない）
	if ( import.meta.hot.data.agentConnected ) {

		location.reload();

	} else {

		import.meta.hot.data.agentConnected = true;

		connect( import.meta.hot );

	}

}

/*-------------------------------
	Attach
-------------------------------*/

// シーンを読み込み終えたエンジン。React の effect のやり直し（Fast Refresh など）で同じエディタが繋ぎ直されたとき、
// loaded はもう出ないので、これを見て受付を再開する
const loadedEngines = new WeakSet<object>();

// コマンドの操作対象にするエディタを繋ぐ。戻り値で外す
export const attachAgentBridge = ( opts: AgentBridgeOptions ) => {

	const engine = opts.editor.engine;

	// 読み込み直後に後から作られるもの（BLidge のエンティティ等。MXP.addRenderWait で登録される）を待ってから受け付ける。
	// 待たないと、リロード直後のコマンドが「エンティティが見つかりません」で落ちる
	const onLoaded = async () => {

		loadedEngines.add( engine );

		// シーンの切り替え（scene-open・Scene パネル）でも、後から作られるものが揃うまで次のコマンドを待たせる
		if ( ready ) setReady( false );

		await MXP.waitRenderReady();

		if ( headless ) {

			await waitFrames( HEADLESS_WARMUP_FRAMES );

		}

		if ( attached === opts ) setReady( true );

	};

	engine.on( 'loaded', onLoaded );

	attached = opts;

	if ( loadedEngines.has( engine ) ) setReady( true );

	return () => {

		engine.off( 'loaded', onLoaded );

		if ( attached === opts ) {

			attached = null;
			setReady( false );

		}

	};

};
