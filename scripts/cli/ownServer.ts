import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { runDev } from '../../host/runner.ts';
import { headlessEditorUrl, launchHeadlessEditor } from '../headlessEditor.ts';

import { fetchServerInfo } from './http.ts';

import type { RendererName } from '../../host/vite/configs.ts';

// orengine-cli が自分用に立てる dev サーバー（servers.ts の startOwnServer が切り離して起動する）。
//   node --import tsx scripts/cli/ownServer.ts <projectDir> <renderer> <logFile>
// headless Chromium でエディタを開いたままにし、コマンドを受けなくなって IDLE_CLOSE_MS たったら全部閉じて終わる。
// 出力は logFile へ書かれる（起動に失敗したときに CLI が末尾を見せる）。閉じるときに消す

const repoRoot = path.resolve( fileURLToPath( import.meta.url ), '../../..' );

// 本人の dev サーバー（既定 3000 / 3001）・BLidge（3100）・tests/scene-shots（3300 / 3310）から離した番号。使用中なら後ろの空き番号へずれる。
// 本人のタブがこの dev サーバーに繋がると、コマンドがそちらへ送られてしまう
const PORT = 3400;
const API_PORT = 3401;

// 最後のコマンドからこの時間たったら閉じる。Claude の1回の作業（コードを書いて撮って直す）の間は開いたままにしたいので長めに取る
const IDLE_CLOSE_MS = 10 * 60 * 1000;
const IDLE_CHECK_MS = 30 * 1000;

const [ projectDir, renderer, logFile ] = process.argv.slice( 2 ) as [ string, RendererName, string ];

const log = ( message: string ) => console.log( `[orengine-cli own-server] ${new Date().toISOString()} ${message}` );

const devServer = await runDev( {
	projectDir,
	renderer,
	port: PORT,
	apiPort: API_PORT,
	// 本人の dev サーバー（既定の node_modules/.vite）と置き場を分ける。設定の違う dev サーバーが同じ置き場を使うと、
	// 起動した側が依存の事前バンドルを作り直して入れ替え、動いている側の配信を壊す
	cacheDir: path.join( repoRoot, 'node_modules/.vite-cli', `${path.basename( projectDir )}-${renderer}` ),
	devServerOwner: 'cli',
} );

const url = devServer.vite.resolvedUrls?.local[ 0 ];

if ( ! url ) {

	log( 'dev サーバーの URL が分かりません' );
	await devServer.close();
	process.exit( 1 );

}

const baseUrl = new URL( url ).origin;

log( `dev サーバー: ${baseUrl}（${projectDir} / ${renderer}）` );

const editor = await launchHeadlessEditor();

let closing = false;

const shutdown = async ( reason: string ) => {

	if ( closing ) return;

	closing = true;
	log( `閉じます: ${reason}` );

	try {

		await editor.close();

	} finally {

		await devServer.close();
		fs.rmSync( logFile, { force: true } );
		process.exit( 0 );

	}

};

// ブラウザが落ちたら、コマンドを受けられない dev サーバーだけが残るので一緒に閉じる
editor.browser.on( 'disconnected', () => {

	shutdown( 'headless Chromium が終了しました' );

} );

await editor.page.goto( headlessEditorUrl( baseUrl, undefined, true ) );

log( 'headless のエディタを開きました' );

const idleTimer = setInterval( async () => {

	try {

		const info = await fetchServerInfo( baseUrl, 5000 );
		const last = Math.max( info.lastRequestAt, info.startedAt );

		if ( Date.now() - last > IDLE_CLOSE_MS ) {

			clearInterval( idleTimer );
			await shutdown( `${IDLE_CLOSE_MS / 60000} 分コマンドを受けなかった` );

		}

	} catch ( e ) {

		log( `状態を読めません: ${( e as Error ).message}` );

	}

}, IDLE_CHECK_MS );

// runDev も SIGINT / SIGTERM で dev サーバーを閉じるが、ブラウザも閉じたいので先に受ける
process.on( 'SIGTERM', () => shutdown( 'SIGTERM（orengine-cli dev stop）' ) );
