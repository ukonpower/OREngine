import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { expect, request, test } from '@playwright/test';

import { runDev } from '../../host/runner';
import { ProjectData } from '../../host/server/Project/ProjectData';
import { AGENT_ENDPOINT } from '../../packages/orengine/editor/lib/AgentBridge/Protocol';
import { headlessEditorUrl, launchHeadlessEditor } from '../../scripts/headlessEditor';

import type { DevHandle } from '../../host/runner';
import type { AgentHttpRequest, AgentOptions, AgentResult } from '../../packages/orengine/editor/lib/AgentBridge/Protocol';
import type { HeadlessEditor } from '../../scripts/headlessEditor';
import type { APIRequestContext, Page } from '@playwright/test';

// demo-webgl（webgl）と demo-webgpu（webgpu）の全シーンを撮り、<シーン名>/<バックエンド>.png に置く（npm run scene-shots）。
// バックエンドごとに dev サーバーと headless Chromium を立て、ブラウザを開いたままシーンを順に開き直して shot で撮る。
// PNG の比較と書き換えは toMatchSnapshot（playwright.config.ts の updateSnapshots: 'changed'）に任せる

const testDir = path.dirname( fileURLToPath( import.meta.url ) );
const rootDir = path.join( testDir, '../..' );

// 全シーン共通の撮り方。0 秒から 1/60 秒ずつ SHOT_FRAMES コマ進め、時間方向に積むパス（ssrTemporal・lightShaft 等）を落ち着かせてから撮る
const SHOT_TIME = 1;
const SHOT_FRAMES = 60;
const SHOT_SIZE = '960x540';

// シーンを開いてから描き終えるまで（初回は vite の変換・シェーダーの minify が走る）
const SCENE_LOAD_TIMEOUT_MS = 120000;
// SHOT_FRAMES コマぶんの描画と読み戻し・PNG のエンコード（webgpu の初回はパイプライン生成も入る）
const SHOT_TIMEOUT_MS = 120000;
const ERRORS_TIMEOUT_MS = 10000;
// AgentBridge 側のタイムアウトに対し、HTTP の応答が返ってくるまで余分に待つ時間
const HTTP_TIMEOUT_MARGIN_MS = 5000;
// 開き直したページがタブとして登録されたかを確かめ直す間隔
const POLL_INTERVAL_MS = 200;
// シーンを読み込んで通信が落ち着いた後、撮る前にページのフレームを回す数。
// BLidge のシーンは通信の後も画像のデコードと 100ms のタイマーを挟んでからエンティティ（カメラ含む）を作る。
// 初回はシェーダーのコンパイルでメインスレッドが塞がり、通信が落ち着いた時点ではまだ作られていないことがある（実測で1回、カメラが無く失敗）。
// フレームはメインスレッドが空かないと回らないので、回った数でタイマーが走れる時間を確かめる。30 は 60fps で約0.5秒
const SETTLE_FRAMES = 30;

type Backend = {
	// レンダラー名。出力の PNG の名前（<シーン名>/<name>.png）にも使う
	name: 'webgl' | 'webgpu';
	projectDir: string;
	// ユーザーの dev サーバー（既定 3000 / 3001）・BLidge（3100）から離した番号。使用中なら後ろの空き番号へずれる。
	// ユーザーのタブがこの dev サーバーに繋がると、コマンドがそちらへ送られてしまう
	port: number;
	apiPort: number;
	scenes: string[];
};

// シーン名は dev サーバーの一覧（ProjectData.listSceneNames）と同じ規則でファイルから集める
const createBackend = ( name: Backend[ 'name' ], project: string, port: number ): Backend => {

	const projectDir = path.join( rootDir, project );

	return {
		name,
		projectDir,
		port,
		apiPort: port + 1,
		scenes: new ProjectData( project, projectDir ).listSceneNames(),
	};

};

const BACKENDS: Backend[] = [
	createBackend( 'webgl', 'demo-webgl', 3300 ),
	createBackend( 'webgpu', 'demo-webgpu', 3310 ),
];

// errors コマンドの応答（packages/orengine/editor/lib/AgentBridge/ObserveCommands）
type SceneErrors = {
	shader: unknown[];
	gpu: unknown[];
	console: unknown[];
	unresolvedComponents: unknown[];
};

const sleep = ( ms: number ) => new Promise<void>( ( resolve ) => setTimeout( resolve, ms ) );

// ページの requestAnimationFrame が count 回まわるまで待つ
const waitFrames = ( page: Page, count: number ) => page.evaluate( ( frames ) => new Promise<void>( ( resolve ) => {

	let left = frames;

	const step = () => {

		left --;

		if ( left <= 0 ) {

			resolve();
			return;

		}

		requestAnimationFrame( step );

	};

	requestAnimationFrame( step );

} ), count );

/*-------------------------------
	PNG
-------------------------------*/

// 今のシーンに無い PNG を消す。どちらの demo にも無くなったシーンはフォルダごと消す
const removeStaleShots = () => {

	for ( const entry of fs.readdirSync( testDir, { withFileTypes: true } ) ) {

		if ( ! entry.isDirectory() ) continue;

		const dir = path.join( testDir, entry.name );
		let used = false;

		for ( const backend of BACKENDS ) {

			if ( backend.scenes.includes( entry.name ) ) {

				used = true;
				continue;

			}

			fs.rmSync( path.join( dir, `${backend.name}.png` ), { force: true } );

		}

		if ( ! used ) {

			fs.rmSync( dir, { recursive: true, force: true } );

		}

	}

};

/*-------------------------------
	AgentBridge
-------------------------------*/

// AgentBridge（host/vite/plugins/AgentBridge）へコマンドを送り、HTTP のステータスとページの応答を返す
const postCommand = async ( api: APIRequestContext, command: string, args: string[], options: AgentOptions, timeoutMs: number ) => {

	const body: AgentHttpRequest = { args, options, timeoutMs };
	const response = await api.post( `${AGENT_ENDPOINT}/${command}`, { data: body, timeout: timeoutMs + HTTP_TIMEOUT_MARGIN_MS } );
	const result = await response.json() as AgentResult;

	return { status: response.status(), result };

};

// コマンドを実行させて結果を返す。失敗は例外にする
const runCommand = async ( api: APIRequestContext, command: string, args: string[], options: AgentOptions, timeoutMs: number ) => {

	const { result } = await postCommand( api, command, args, options, timeoutMs );

	if ( ! result.ok ) {

		throw new Error( `${command} に失敗しました: ${result.error}` );

	}

	return result.result;

};

// 開き直したページがタブとして登録され、scene を読み込み終えるまで待つ。
// headless のページは、シーンの読み込みと最初の描画が済むまで status の応答を待たせる（AgentBridge の headless の準備待ち）
const waitForScene = async ( api: APIRequestContext, scene: string ) => {

	const deadline = Date.now() + SCENE_LOAD_TIMEOUT_MS;

	for ( ;; ) {

		const { result } = await postCommand( api, 'status', [], {}, SCENE_LOAD_TIMEOUT_MS );

		// タブの登録がまだ（503）・前のページの切断（502）・前のページの応答は、新しいページに入れ替わるまで聞き直す
		if ( result.ok ) {

			const status = result.result as { scene: string | null };

			if ( status.scene === scene ) return;

		}

		if ( Date.now() > deadline ) {

			throw new Error( `${scene} を ${SCENE_LOAD_TIMEOUT_MS}ms 以内に開けませんでした（最後の status: ${JSON.stringify( result )}）` );

		}

		await sleep( POLL_INTERVAL_MS );

	}

};

// シーンのエラーをシーン名と一緒に出す。撮影は止めない
const reportErrors = ( scene: string, backend: Backend, errors: SceneErrors ) => {

	const count = errors.shader.length + errors.gpu.length + errors.console.length + errors.unresolvedComponents.length;

	if ( count === 0 ) return;

	console.error( `[scene-shots] ${scene}（${backend.name}）でエラーが出ています\n${JSON.stringify( errors, null, 2 )}` );

};

/*-------------------------------
	Tests
-------------------------------*/

test.beforeAll( () => {

	removeStaleShots();

} );

for ( const backend of BACKENDS ) {

	test.describe( backend.name, () => {

		let devServer: DevHandle | null = null;
		let devServerUrl = '';
		let api: APIRequestContext | null = null;
		let editor: HeadlessEditor | null = null;

		test.beforeAll( async () => {

			devServer = await runDev( {
				projectDir: backend.projectDir,
				renderer: backend.name,
				port: backend.port,
				apiPort: backend.apiPort,
				cacheDir: path.join( rootDir, 'node_modules/.vite-scene-shots', backend.name ),
				writeDevServerInfo: false,
			} );

			const url = devServer.vite.resolvedUrls?.local[ 0 ];

			if ( ! url ) {

				throw new Error( `${backend.name} の dev サーバーの URL が分かりません` );

			}

			devServerUrl = url;

			// webgpu の dev サーバーは自己署名証明書の HTTPS
			api = await request.newContext( { baseURL: devServerUrl, ignoreHTTPSErrors: true } );
			editor = await launchHeadlessEditor();

		} );

		// 途中で失敗していても、立ち上がったものはすべて止める。ページの接続を先に切ってから dev サーバーを閉じる
		test.afterAll( async () => {

			if ( editor ) await editor.close();
			if ( api ) await api.dispose();
			if ( devServer ) await devServer.close();

		} );

		for ( const scene of backend.scenes ) {

			test( scene, async () => {

				if ( ! editor || ! api ) {

					throw new Error( `${backend.name} の dev サーバーかブラウザが立っていません` );

				}

				// BLidge のシーンのように、エンジンの読み込み後に fetch で読むものがあるので、通信が落ち着くまで待つ
				await editor.page.goto( headlessEditorUrl( devServerUrl, scene ), { waitUntil: 'networkidle', timeout: SCENE_LOAD_TIMEOUT_MS } );
				await waitForScene( api, scene );
				await waitFrames( editor.page, SETTLE_FRAMES );

				// 出力先の引数は CLI 用（ページは使わない）
				const shotOptions = { time: String( SHOT_TIME ), frames: String( SHOT_FRAMES ), size: SHOT_SIZE };
				const shot = await runCommand( api, 'shot', [ `${scene}.png` ], shotOptions, SHOT_TIMEOUT_MS ) as { png: string };
				const errors = await runCommand( api, 'errors', [], {}, ERRORS_TIMEOUT_MS ) as SceneErrors;

				reportErrors( scene, backend, errors );

				expect( Buffer.from( shot.png, 'base64' ) ).toMatchSnapshot( [ scene, `${backend.name}.png` ] );

			} );

		}

	} );

}
