import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { DEV_SERVER_REGISTRY_DIR, listDevServers, readProjectHistory } from '../../host/devServerRegistry.ts';

import { CliError } from './args.ts';
import { fetchServerInfo } from './http.ts';

import type { DevServerEntry } from '../../host/devServerRegistry.ts';
import type { AgentServerInfo, AgentTabInfo } from '../../packages/orengine/editor/lib/AgentBridge/Protocol/index.ts';

// 接続先の dev サーバーを選ぶ。立っているものが無ければ、自分用の dev サーバー（ownServer.ts）を立てる

const repoRoot = path.resolve( fileURLToPath( import.meta.url ), '../../..' );

const OWN_SERVER_SCRIPT = path.join( repoRoot, 'scripts/cli/ownServer.ts' );

// 登録簿にある dev サーバーへ状態を聞くときに待つ時間。応答しないものは候補から外す
const INFO_TIMEOUT_MS = 2000;

// 自分用の dev サーバーが立ち、headless のページがシーンを読み込み終えるまでに待つ上限。
// 初回は vite の依存の事前バンドル・シェーダーの minify が走る
const OWN_SERVER_START_TIMEOUT_MS = 180000;

const POLL_MS = 300;

export type ServerCandidate = {
	entry: DevServerEntry;
	info: AgentServerInfo | null;
	// 応答しなかった理由
	error: string | null;
};

export type ResolvedServer = {
	url: string;
	info: AgentServerInfo;
	// このコマンドのために自分用の dev サーバーを立てた
	started: boolean;
	candidates: ServerCandidate[];
	// プロセスが居なくなっていたので登録簿から消したもの
	removed: DevServerEntry[];
};

export type ServerOptions = {
	url: string | null;
	project: string | null;
	renderer: string | null;
	// false なら立っているものが無くても自分用を立てずにエラーにする（dev list 等）
	allowStart: boolean;
};

const sleep = ( ms: number ) => new Promise<void>( ( resolve ) => setTimeout( resolve, ms ) );

/*-------------------------------
	Candidates
-------------------------------*/

// 登録簿の dev サーバーに状態を聞く。応答しないもの（起動途中・固まっている）も error 付きで返す
export const collectCandidates = async () => {

	const { live, removed } = listDevServers();

	const candidates = await Promise.all( live.map( async ( entry ): Promise<ServerCandidate> => {

		try {

			return { entry, info: await fetchServerInfo( entry.url, INFO_TIMEOUT_MS ), error: null };

		} catch ( e ) {

			return { entry, info: null, error: ( e as Error ).message };

		}

	} ) );

	return { candidates, removed };

};

// --project はプロジェクトディレクトリのパス（実行した場所から）か、その名前
const matchesProject = ( entry: DevServerEntry, project: string ) => {

	if ( entry.project === project ) return true;

	return entry.projectDir === path.resolve( project );

};

const userTabs = ( info: AgentServerInfo ) => info.tabs.filter( ( tab ) => ! tab.headless );

const latestFocus = ( tabs: AgentTabInfo[] ) => {

	let latest = - 1;

	for ( const tab of tabs ) {

		latest = Math.max( latest, tab.focusedAt, tab.registeredAt );

	}

	return latest;

};

// 本人のタブが開いている dev サーバーのうち、最後にフォーカスされたタブのもの（本人が今見ているもの）。
// 無ければ本人の dev サーバーの新しいもの、それも無ければ自分用の dev サーバーの新しいもの
const pickCandidate = ( candidates: ServerCandidate[] ) => {

	let picked: ServerCandidate | null = null;
	let pickedFocus = - 1;

	for ( const candidate of candidates ) {

		if ( ! candidate.info || candidate.entry.owner !== 'user' ) continue;

		const tabs = userTabs( candidate.info );

		if ( tabs.length === 0 ) continue;

		const focus = latestFocus( tabs );

		if ( focus > pickedFocus ) {

			picked = candidate;
			pickedFocus = focus;

		}

	}

	if ( picked ) return picked;

	// candidates は新しく立ったものから並んでいる（listDevServers）
	for ( const owner of [ 'user', 'cli' ] ) {

		for ( const candidate of candidates ) {

			if ( candidate.info && candidate.entry.owner === owner ) return candidate;

		}

	}

	return null;

};

/*-------------------------------
	Resolve
-------------------------------*/

export const resolveServer = async ( opts: ServerOptions ): Promise<ResolvedServer> => {

	const { candidates, removed } = await collectCandidates();

	if ( opts.url ) {

		let info: AgentServerInfo;

		try {

			info = await fetchServerInfo( opts.url, INFO_TIMEOUT_MS );

		} catch ( e ) {

			throw new CliError( `--url（ORENGINE_DEV_URL）の dev サーバーに接続できません: ${opts.url}\n${( e as Error ).message}` );

		}

		return { url: opts.url, info, started: false, candidates, removed };

	}

	let matched = candidates;

	if ( opts.project ) {

		const project = opts.project;

		matched = candidates.filter( ( candidate ) => matchesProject( candidate.entry, project ) );

	}

	const picked = pickCandidate( matched );

	if ( picked && picked.info ) {

		return { url: picked.entry.url, info: picked.info, started: false, candidates, removed };

	}

	if ( ! opts.allowStart ) {

		throw new CliError( '立っている dev サーバーがありません' );

	}

	const started = await startOwnServer( opts.project, opts.renderer );

	return { url: started.url, info: started.info, started: true, candidates, removed };

};

/*-------------------------------
	Own server
-------------------------------*/

const isProjectDir = ( dir: string ) => fs.existsSync( path.join( dir, 'scenes' ) );

// 自分用の dev サーバーで開くプロジェクト。--project > 本人が最後に dev サーバーを立てたプロジェクト > ORENGINE_PROJECT > demo-webgl
const resolveOwnProject = ( project: string | null ) => {

	const history = readProjectHistory();

	if ( project ) {

		const dir = path.resolve( project );

		if ( isProjectDir( dir ) ) return dir;

		// 名前だけ渡されたときは、本人が立てたことのあるプロジェクトから探す
		for ( const known of Object.keys( history ) ) {

			if ( path.basename( known ) === project && isProjectDir( known ) ) return known;

		}

		throw new CliError( `--project のプロジェクトディレクトリ（scenes/ を持つもの）が見つかりません: ${project}` );

	}

	let latest: string | null = null;
	let latestAt = - 1;

	for ( const [ dir, item ] of Object.entries( history ) ) {

		if ( item.startedAt > latestAt && isProjectDir( dir ) ) {

			latest = dir;
			latestAt = item.startedAt;

		}

	}

	if ( latest ) return latest;

	const fallback = path.resolve( repoRoot, process.env.ORENGINE_PROJECT || 'demo-webgl' );

	if ( isProjectDir( fallback ) ) return fallback;

	throw new CliError( '自分用の dev サーバーで開くプロジェクトが分かりません。--project <ディレクトリ> を指定してください' );

};

// --renderer > 本人がそのプロジェクトで最後に使ったレンダラー > ORENGINE_RENDERER > webgl
const resolveOwnRenderer = ( projectDir: string, renderer: string | null ) => {

	let name = renderer;

	if ( ! name ) name = readProjectHistory()[ projectDir ]?.renderer ?? null;

	if ( ! name ) name = process.env.ORENGINE_RENDERER || 'webgl';

	if ( name !== 'webgl' && name !== 'webgpu' && name !== 'headless' ) {

		throw new CliError( `--renderer は webgl / webgpu / headless のどれかです: ${name}` );

	}

	return name;

};

const logTail = ( file: string ) => {

	try {

		return fs.readFileSync( file, 'utf-8' ).split( '\n' ).slice( - 30 ).join( '\n' );

	} catch {

		return '';

	}

};

// 自分用の dev サーバーをこのプロセスから切り離して立て、headless のページがシーンを読み込み終えるまで待つ。
// 使われなくなったら自分で閉じる（ownServer.ts）ので、CLI は立てたら任せる
export const startOwnServer = async ( project: string | null, renderer: string | null ) => {

	const projectDir = resolveOwnProject( project );
	const rendererName = resolveOwnRenderer( projectDir, renderer );

	fs.mkdirSync( DEV_SERVER_REGISTRY_DIR, { recursive: true } );

	const logFile = path.join( DEV_SERVER_REGISTRY_DIR, `own-${Date.now()}.log` );
	const log = fs.openSync( logFile, 'w' );

	process.stderr.write( `[orengine-cli] 立っている dev サーバーが無いので、自分用の dev サーバーを立てます（${path.basename( projectDir )} / ${rendererName}）\n` );

	const child = spawn( process.execPath, [ '--import', 'tsx', OWN_SERVER_SCRIPT, projectDir, rendererName, logFile ], {
		cwd: repoRoot,
		detached: true,
		stdio: [ 'ignore', log, log ],
		env: { ...process.env, ORENGINE_DEV_URL: '' },
	} );

	child.unref();
	fs.closeSync( log );

	let exited = false;

	child.on( 'exit', () => {

		exited = true;

	} );

	const deadline = Date.now() + OWN_SERVER_START_TIMEOUT_MS;

	for ( ;; ) {

		if ( exited ) {

			throw new CliError( `自分用の dev サーバーが起動の途中で終了しました（ログ: ${logFile}）\n${logTail( logFile )}` );

		}

		if ( Date.now() > deadline ) {

			throw new CliError( `自分用の dev サーバーが ${OWN_SERVER_START_TIMEOUT_MS}ms 以内に使えるようになりませんでした（ログ: ${logFile}）\n${logTail( logFile )}` );

		}

		const entry = listDevServers().live.find( ( item ) => item.pid === child.pid );

		if ( entry ) {

			try {

				const info = await fetchServerInfo( entry.url, INFO_TIMEOUT_MS );

				if ( info.tabs.some( ( tab ) => tab.ready ) ) {

					return { url: entry.url, info };

				}

			} catch {

				// まだ応答しない
			}

		}

		await sleep( POLL_MS );

	}

};

// 自分用の dev サーバーを閉じる。本人の dev サーバーには触らない
export const stopOwnServers = async () => {

	const stopped: DevServerEntry[] = [];

	for ( const entry of listDevServers().live ) {

		if ( entry.owner !== 'cli' ) continue;

		process.kill( entry.pid, 'SIGTERM' );
		stopped.push( entry );

	}

	const deadline = Date.now() + 10000;

	while ( Date.now() < deadline ) {

		const remaining = listDevServers().live.filter( ( entry ) => stopped.some( ( item ) => item.pid === entry.pid ) );

		if ( remaining.length === 0 ) break;

		await sleep( POLL_MS );

	}

	return stopped;

};

// status・dev list に出す、dev サーバー1台ぶんの要約
export const describeCandidate = ( candidate: ServerCandidate ) => {

	const entry = candidate.entry;

	if ( ! candidate.info ) {

		return { url: entry.url, project: entry.project, renderer: entry.renderer, owner: entry.owner, error: candidate.error };

	}

	const tabs = candidate.info.tabs;

	return {
		url: entry.url,
		project: entry.project,
		renderer: entry.renderer,
		owner: entry.owner,
		tabs: userTabs( candidate.info ).length,
		headlessTabs: tabs.length - userTabs( candidate.info ).length,
	};

};

const ownerLabel = ( owner: string ) => {

	if ( owner === 'cli' ) return '自分用の dev サーバー';

	return '本人の dev サーバー';

};

// 毎回 stderr に出す接続先の1行。後から立った dev サーバーへ黙って接続先が移らないように、どれに繋いだかを必ず見せる
export const connectionLine = ( resolved: ResolvedServer ) => {

	const info = resolved.info;
	const others: string[] = [];

	for ( const candidate of resolved.candidates ) {

		if ( candidate.entry.url === resolved.url ) continue;

		others.push( `${candidate.entry.project}（${candidate.entry.url}）` );

	}

	let line = `[orengine-cli] 接続先: ${resolved.url}（${info.project} / ${info.renderer} / ${ownerLabel( info.owner )}）`;

	if ( others.length > 0 ) line += ` ほかに立っている dev サーバー: ${others.join( '、' )}`;

	return line;

};
