import fs from 'node:fs';

import { AGENT_NO_TAB_STATUS } from '../../packages/orengine/editor/lib/AgentBridge/Protocol/index.ts';
import { openHeadlessEditor } from '../headlessEditor.ts';

import { CliError, parseArgs, splitLine } from './args.ts';
import { COMMANDS, usageText } from './commands.ts';
import { fetchServerInfo, getJson, sendCommand } from './http.ts';
import { writeShotPng } from './output.ts';
import { collectCandidates, connectionLine, describeCandidate, resolveServer, startOwnServer, stopOwnServers } from './servers.ts';

import type { CommandResponse } from './http.ts';
import type { ResolvedServer } from './servers.ts';
import type { HeadlessEditor } from '../headlessEditor.ts';
import type { AgentHttpRequest, AgentOptions, AgentResult } from '../../packages/orengine/editor/lib/AgentBridge/Protocol/index.ts';

// orengine-cli: dev サーバー（host/vite/plugins/AgentBridge）経由で、開いているエディタタブにコマンドを実行させる。
//   npx orengine-cli <command> [args...]
// 接続先は立っている dev サーバーから選び（servers.ts）、無ければ自分用の dev サーバーを立てる。
// 本人の dev サーバーにタブが無ければ headless Chromium でエディタを開いて代わりに使い（scripts/headlessEditor.ts）、コマンドが終わったら閉じる

// headless のページが開いてからタブとして登録され、シーンを読み込み終えるまでに待つ上限
const HEADLESS_LOAD_TIMEOUT_MS = 30000;

// headless のページがタブとして登録されたかを確かめ直す間隔
const HEADLESS_POLL_INTERVAL_MS = 200;

// タブのリロード・コードの更新・シーンの読み込みを待つ上限。status は今の様子を早く見せたいので短くする
const WAIT_MS = 60000;
const STATUS_WAIT_MS = 15000;

// 実行中にタブがリロード・コードの更新を受けた読み取り系のコマンドを、やり直す回数
const INTERRUPT_RETRIES = 3;

// CLI 自身が使い、タブへは渡さないオプション
const CLI_OPTIONS = [ 'timeout', 'url', 'project', 'renderer' ];

/*-------------------------------
	Send
-------------------------------*/

const sleep = ( ms: number ) => new Promise<void>( ( resolve ) => setTimeout( resolve, ms ) );

// headless Chromium でエディタを開き、タブとして登録されるのを待ってからコマンドを送る。書き込みの保存はページが応答の前に済ませている
const sendCommandHeadless = async ( baseUrl: string, command: string, request: AgentHttpRequest ): Promise<CommandResponse> => {

	let editor: HeadlessEditor;

	try {

		editor = await openHeadlessEditor( baseUrl );

	} catch ( e ) {

		throw new CliError( `エディタのタブが無いので headless Chromium で開こうとしましたが、失敗しました（Playwright の Chromium が無ければ npx playwright install chromium）\n${( e as Error ).message}` );

	}

	try {

		const deadline = Date.now() + HEADLESS_LOAD_TIMEOUT_MS;

		for ( ;; ) {

			const response = await sendCommand( baseUrl, command, request );

			if ( response.status !== AGENT_NO_TAB_STATUS ) {

				return response;

			}

			if ( Date.now() > deadline ) {

				throw new CliError( `headless Chromium で開いたエディタが ${HEADLESS_LOAD_TIMEOUT_MS}ms 以内にタブとして登録されませんでした` );

			}

			await sleep( HEADLESS_POLL_INTERVAL_MS );

		}

	} finally {

		await editor.close();

	}

};

// タブへ送る。タブが無ければ headless で開き、読み取り系が途中で切れたらやり直す
const sendToTab = async ( baseUrl: string, command: string, request: AgentHttpRequest, write: boolean ): Promise<CommandResponse> => {

	for ( let attempt = 0; ; attempt ++ ) {

		let response = await sendCommand( baseUrl, command, request );

		if ( response.status === AGENT_NO_TAB_STATUS ) {

			response = await sendCommandHeadless( baseUrl, command, request );

		}

		const result = response.result;

		if ( result.ok || ! result.interrupted ) return response;

		if ( write ) {

			throw new CliError( `${result.error}\n書き込みの途中で切れたので、反映されたかは分かりません。status・get で確かめてからやり直してください` );

		}

		if ( attempt >= INTERRUPT_RETRIES ) return response;

		process.stderr.write( `[orengine-cli] ${result.error}。待ってからやり直します\n` );

	}

};

const failWith = ( result: AgentResult ) => {

	if ( result.ok ) return;

	const lines = [ result.error ];

	if ( result.candidates !== undefined ) {

		lines.push( 'candidates:', JSON.stringify( result.candidates, null, 2 ) );

	}

	throw new CliError( lines.join( '\n' ) );

};

const print = ( output: unknown ) => {

	// process.exit を呼ばずに終わらせる（大きな出力がパイプに書き切られる前に切れないように）
	process.stdout.write( JSON.stringify( output, null, 2 ) + '\n' );

};

/*-------------------------------
	REST
-------------------------------*/

// シーンファイルの REST（host/server/routes/scene.ts）。dev サーバーは1プロジェクトだけを配信していて
// URL の :name を見ない（ProjectManager.getProject）ので、プロジェクト名は固定値で埋める
const SCENE_API_BASE = '/api/projects/current';

const fetchSceneNames = async ( baseUrl: string, timeoutMs: number ) => {

	return await getJson( baseUrl, `${SCENE_API_BASE}/scenes`, timeoutMs ) as string[];

};

// opened: タブが今開いているシーン（タブが無ければ null。headless は起動しない）
// lastOpened: editor.json の scene。タブを開いたとき・headless が開くシーン
const listScenes = async ( server: ResolvedServer, _args: string[], timeoutMs: number ) => {

	const baseUrl = server.url;
	const names = await fetchSceneNames( baseUrl, timeoutMs );
	const editor = await getJson( baseUrl, `${SCENE_API_BASE}/editor`, timeoutMs ) as { scene?: unknown } | null;

	let lastOpened: string | null = null;

	if ( editor && typeof editor.scene === 'string' ) {

		lastOpened = editor.scene;

	}

	let opened: string | null = null;
	let connection: string | null = null;

	const response = await sendCommand( baseUrl, 'status', { args: [], options: {}, timeoutMs, waitMs: STATUS_WAIT_MS } );

	if ( response.status !== AGENT_NO_TAB_STATUS && response.result.ok ) {

		const status = response.result.result as { connection: string; scene: string | null };

		opened = status.scene;
		connection = status.connection;

	}

	return { scenes: names, opened, connection, lastOpened };

};

const getScene = async ( server: ResolvedServer, args: string[], timeoutMs: number ) => {

	const name = args[ 0 ];

	if ( name === undefined ) {

		throw new CliError( `引数が足りません。使い方: ${COMMANDS[ 'scene-get' ].usage}` );

	}

	const data = await getJson( server.url, `${SCENE_API_BASE}/scenes/${encodeURIComponent( name )}`, timeoutMs );

	if ( data === null ) {

		const names = await fetchSceneNames( server.url, timeoutMs );

		throw new CliError( `シーンがありません: ${name}\ncandidates:\n${JSON.stringify( names, null, 2 )}` );

	}

	return data;

};

// タブを通さずに CLI が処理するコマンド
const REST_COMMANDS: { [ name: string ]: ( server: ResolvedServer, args: string[], timeoutMs: number ) => Promise<unknown> } = {
	scenes: listScenes,
	'scene-get': getScene,
};

/*-------------------------------
	status
-------------------------------*/

// タブの status に、dev サーバーから見たタブの状態（コードの更新を反映し終えたか）と、立っている dev サーバーの一覧を足す
const runStatus = async ( server: ResolvedServer, timeoutMs: number ) => {

	const servers = [];

	for ( const candidate of server.candidates ) {

		servers.push( describeCandidate( candidate ) );

	}

	const base = {
		server: { url: server.url, project: server.info.project, renderer: server.info.renderer, owner: server.info.owner },
		servers,
	};

	let response: CommandResponse;

	try {

		response = await sendToTab( server.url, 'status', { args: [], options: {}, timeoutMs, waitMs: STATUS_WAIT_MS }, false );

	} catch ( e ) {

		return { ...base, problem: ( e as Error ).message, tabs: server.info.tabs };

	}

	if ( ! response.result.ok ) {

		return { ...base, problem: response.result.error, tabs: server.info.tabs };

	}

	// 応答したタブが、dev サーバーが送ったコードの更新・リロードをすべて反映し終えているか（古いコードで動いていないか）
	const info = await fetchServerInfo( server.url, timeoutMs );
	let code: unknown = null;

	for ( const tab of info.tabs ) {

		if ( tab.id !== response.tabId ) continue;

		code = { upToDate: tab.pendingUpdates === 0 && ! tab.stale && tab.connected, pendingUpdates: tab.pendingUpdates, stale: tab.stale };

	}

	return { ...( response.result.result as object ), code, ...base };

};

/*-------------------------------
	batch
-------------------------------*/

type BatchStep = { command: string; args: string[]; options: AgentOptions };

// 1行1コマンド。先頭の orengine-cli（npx orengine-cli）は書いても書かなくてもよい
const readBatchSteps = ( file: string | undefined ) => {

	let text: string;

	if ( file === undefined ) {

		text = fs.readFileSync( 0, 'utf-8' );

	} else {

		text = fs.readFileSync( file, 'utf-8' );

	}

	const steps: BatchStep[] = [];

	for ( const rawLine of text.split( '\n' ) ) {

		const line = rawLine.trim();

		if ( line === '' || line.startsWith( '#' ) ) continue;

		let words = splitLine( line );

		if ( words[ 0 ] === 'npx' ) words = words.slice( 1 );
		if ( words[ 0 ] === 'orengine-cli' ) words = words.slice( 1 );

		const [ command, ...rest ] = words;
		const { args, options } = parseArgs( rest );

		steps.push( { command, args, options } );

	}

	if ( steps.length === 0 ) {

		throw new CliError( 'batch に実行するコマンドがありません' );

	}

	return steps;

};

const runBatch = async ( server: ResolvedServer, file: string | undefined, timeoutMs: number ) => {

	const steps = readBatchSteps( file );

	let write = false;

	for ( const step of steps ) {

		if ( COMMANDS[ step.command ]?.write ) write = true;

	}

	const response = await sendToTab( server.url, 'batch', { args: [ JSON.stringify( steps ) ], options: {}, timeoutMs, waitMs: WAIT_MS }, write );
	const result = response.result;

	failWith( result );

	if ( ! result.ok ) return null;

	const outputs: unknown[] = [];
	const results = result.result as unknown[];

	for ( let i = 0; i < steps.length; i ++ ) {

		let output = results[ i ];

		if ( steps[ i ].command === 'shot' ) output = writeShotPng( steps[ i ].args[ 0 ], output );

		outputs.push( { command: steps[ i ].command, result: output } );

	}

	return { ...result.write, results: outputs };

};

/*-------------------------------
	dev
-------------------------------*/

const runDevCommand = async ( sub: string | undefined, options: AgentOptions ) => {

	if ( sub === undefined || sub === 'list' ) {

		const { candidates, removed } = await collectCandidates();
		const servers = [];

		for ( const candidate of candidates ) {

			servers.push( describeCandidate( candidate ) );

		}

		return { servers, removedStale: removed };

	}

	if ( sub === 'start' ) {

		const started = await startOwnServer( stringOption( options, 'project' ), stringOption( options, 'renderer' ) );

		return { url: started.url, project: started.info.project, renderer: started.info.renderer, owner: started.info.owner };

	}

	if ( sub === 'stop' ) {

		const stopped = await stopOwnServers();

		return { stopped };

	}

	throw new CliError( `dev のサブコマンドは list / start / stop です: ${sub}` );

};

/*-------------------------------
	Main
-------------------------------*/

const stringOption = ( options: AgentOptions, name: string ) => {

	const value = options[ name ];

	if ( typeof value === 'string' ) return value;

	return null;

};

const main = async () => {

	const [ command, ...rest ] = process.argv.slice( 2 );

	if ( ! command || command === 'help' || command === '--help' ) {

		console.log( usageText() );
		return;

	}

	const spec = COMMANDS[ command ];

	if ( ! spec ) {

		throw new CliError( `不明なコマンドです: ${command}\n\n${usageText()}` );

	}

	const { args, options } = parseArgs( rest );

	if ( command === 'dev' ) {

		print( await runDevCommand( args[ 0 ], options ) );
		return;

	}

	let timeoutMs = spec.timeoutMs;

	if ( typeof options.timeout === 'string' ) {

		timeoutMs = Number( options.timeout );

		if ( ! Number.isFinite( timeoutMs ) || timeoutMs <= 0 ) {

			throw new CliError( `--timeout はミリ秒の正の数で指定してください: ${options.timeout}` );

		}

	}

	const server = await resolveServer( {
		url: stringOption( options, 'url' ) ?? ( process.env.ORENGINE_DEV_URL || null ),
		project: stringOption( options, 'project' ),
		renderer: stringOption( options, 'renderer' ),
		allowStart: true,
	} );

	for ( const name of CLI_OPTIONS ) {

		delete options[ name ];

	}

	process.stderr.write( connectionLine( server ) + '\n' );

	for ( const entry of server.removed ) {

		process.stderr.write( `[orengine-cli] 止まった dev サーバーの情報が残っていたので消しました: ${entry.url}（${entry.project}）\n` );

	}

	const restCommand = REST_COMMANDS[ command ];

	if ( restCommand ) {

		print( await restCommand( server, args, timeoutMs ) );
		return;

	}

	if ( command === 'status' ) {

		print( await runStatus( server, timeoutMs ) );
		return;

	}

	if ( command === 'batch' ) {

		print( await runBatch( server, args[ 0 ], timeoutMs ) );
		return;

	}

	const response = await sendToTab( server.url, command, { args, options, timeoutMs, waitMs: WAIT_MS }, spec.write === true );
	const result = response.result;

	failWith( result );

	if ( ! result.ok ) return;

	let output = result.result;

	// 書き込み系は接続先を先頭に出す。接続先はコマンドごとに変わりうるので、最初の status だけでは undo が効くかを判断できない
	if ( result.write !== undefined ) output = { ...result.write, ...( result.result as object ) };

	// shot の PNG は base64 で返ってくるのでファイルへ書き出し、stdout には残りの情報だけ出す
	if ( command === 'shot' ) output = writeShotPng( args[ 0 ], result.result );

	print( output );

};

main().catch( ( e ) => {

	if ( e instanceof CliError ) {

		console.error( `[orengine-cli] ${e.message}` );

	} else {

		console.error( e );

	}

	process.exitCode = 1;

} );
