import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { RendererName } from './vite/configs';

// 立っている dev サーバーの登録簿。dev サーバー（host/vite/plugins/AgentBridge）が起動時に1台1ファイルで書き、閉じるときに消す。
// orengine-cli（scripts/cli）がこれを読んで接続先を選ぶ。dev サーバーが落ちてファイルだけ残ることがあるので、読む側が pid で生死を確かめる

const orengineRoot = path.resolve( fileURLToPath( import.meta.url ), '../..' );

export const DEV_SERVER_REGISTRY_DIR = path.join( orengineRoot, 'tmp/dev-servers' );

// プロジェクトごとに、本人が最後に dev サーバーを立てたときのレンダラー。
// orengine-cli が自分用の dev サーバーを立てるとき、--renderer が無ければこれを使う（外部プロジェクトのレンダラーは OREngine からは分からないため）
const PROJECT_HISTORY_FILE = path.join( DEV_SERVER_REGISTRY_DIR, 'projects.json' );

// user: 本人が npm run dev 等で立てたもの。cli: orengine-cli が自分用に立てたもの（使われなくなったら自分で閉じる）
export type DevServerOwner = 'user' | 'cli';

export type DevServerEntry = {
	url: string;
	pid: number;
	// プロジェクトディレクトリの名前（ORShorts なら project / project-webgl）
	project: string;
	projectDir: string;
	renderer: RendererName;
	owner: DevServerOwner;
	startedAt: number;
};

export type ProjectHistory = { [ projectDir: string ]: { renderer: RendererName; startedAt: number } };

const entryFile = ( port: number ) => path.join( DEV_SERVER_REGISTRY_DIR, `${port}.json` );

const portOf = ( url: string ) => Number( new URL( url ).port );

export const registerDevServer = ( entry: DevServerEntry ) => {

	fs.mkdirSync( DEV_SERVER_REGISTRY_DIR, { recursive: true } );
	fs.writeFileSync( entryFile( portOf( entry.url ) ), JSON.stringify( entry, null, '\t' ) );

	if ( entry.owner !== 'user' ) return;

	const history = readProjectHistory();
	history[ entry.projectDir ] = { renderer: entry.renderer, startedAt: entry.startedAt };
	fs.writeFileSync( PROJECT_HISTORY_FILE, JSON.stringify( history, null, '\t' ) );

};

// 同じポートを後から別の dev サーバーが使っていることがあるので、自分の pid のものだけ消す
export const unregisterDevServer = ( url: string, pid: number ) => {

	const file = entryFile( portOf( url ) );
	const entry = readEntry( file );

	if ( entry && entry.pid === pid ) {

		fs.rmSync( file, { force: true } );

	}

};

const readEntry = ( file: string ): DevServerEntry | null => {

	try {

		return JSON.parse( fs.readFileSync( file, 'utf-8' ) ) as DevServerEntry;

	} catch {

		return null;

	}

};

const isAlive = ( pid: number ) => {

	try {

		process.kill( pid, 0 );

		return true;

	} catch ( e ) {

		// EPERM はプロセスはあるが signal を送る権限が無い
		return ( e as NodeJS.ErrnoException ).code === 'EPERM';

	}

};

// 登録簿を読み、プロセスが居なくなったものは消して removed で返す
export const listDevServers = () => {

	const live: DevServerEntry[] = [];
	const removed: DevServerEntry[] = [];

	if ( ! fs.existsSync( DEV_SERVER_REGISTRY_DIR ) ) return { live, removed };

	for ( const name of fs.readdirSync( DEV_SERVER_REGISTRY_DIR ) ) {

		if ( ! /^\d+\.json$/.test( name ) ) continue;

		const file = path.join( DEV_SERVER_REGISTRY_DIR, name );
		const entry = readEntry( file );

		if ( entry && isAlive( entry.pid ) ) {

			live.push( entry );
			continue;

		}

		fs.rmSync( file, { force: true } );

		if ( entry ) removed.push( entry );

	}

	live.sort( ( a, b ) => b.startedAt - a.startedAt );

	return { live, removed };

};

export const readProjectHistory = (): ProjectHistory => {

	try {

		return JSON.parse( fs.readFileSync( PROJECT_HISTORY_FILE, 'utf-8' ) ) as ProjectHistory;

	} catch {

		return {};

	}

};
