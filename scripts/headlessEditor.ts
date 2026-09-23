import { AGENT_HEADLESS_PARAM } from '../packages/orengine/editor/lib/AgentBridge/Protocol/index.ts';

import type { Browser, Request } from '@playwright/test';

// エディタのタブが無いときに、scripts/scene.ts が代わりの接続先として開く headless Chromium

// WebGL2 / WebGPU とも Metal で描かせるためのフラグ（#80 の実測: Playwright 1.62.1 / Apple Silicon）。
// 無いと WebGL2 は SwiftShader（CPU）になり、WebGPU は --enable-unsafe-webgpu だけだと SwiftShader の fallback で canvas が真っ黒になる
const LAUNCH_ARGS = [ '--enable-unsafe-webgpu', '--use-angle=metal' ];

// ウィンドウサイズは固定する。エディタの描画解像度（Screen パネルの大きさ）がこれで決まり、shot（#83）の出力サイズになるため。
// 1920x1080 は一般的なデスクトップの画面サイズで、ユーザーの editor.json のパネル配置がそのまま無理なく収まる。
// deviceScaleFactor も 1 に固定し、実行環境の画面の倍率で出力サイズが変わらないようにする
const VIEWPORT = { width: 1920, height: 1080 };
const DEVICE_SCALE_FACTOR = 1;

// editor.save() の後、ファイルへの書き込み（POST）が終わるまで待つ上限
const SAVE_TIMEOUT_MS = 10000;

// エディタページの保存先 API（packages/orengine/editor/components/pages/EditorPage の onSave と一致させる）。
// onSave は scenes/<name> → editor の順に POST するので、editor の POST が出た時点で保存の POST は出揃っている
const SAVE_API_PREFIX = '/api/projects/';
const SAVE_EDITOR_SUFFIX = '/editor';

export type HeadlessEditor = {
	// ページが editor.save() で出した POST がすべて応答を返すまで待つ
	waitForSave: () => Promise<void>;
	close: () => Promise<void>;
};

// headless Chromium でエディタを開く。タブの登録とシーンの読み込みはページ側で進むので、ここでは待たない
export const openHeadlessEditor = async ( devServerUrl: string ): Promise<HeadlessEditor> => {

	// ユーザーのタブへ繋ぐときに Playwright の読み込み時間を掛けないよう、使うときだけ読む
	const { chromium } = await import( '@playwright/test' );

	const browser: Browser = await chromium.launch( { args: LAUNCH_ARGS } );

	try {

		// webgpu の dev サーバーは自己署名証明書の HTTPS なので、証明書のエラーを無視する（CLI の HTTP も同じ扱い）
		const context = await browser.newContext( {
			viewport: VIEWPORT,
			deviceScaleFactor: DEVICE_SCALE_FACTOR,
			ignoreHTTPSErrors: true,
		} );

		const page = await context.newPage();

		const saveRequests: Request[] = [];

		let resolveEditorPosted: () => void = () => {};
		const editorPosted = new Promise<void>( ( resolve ) => {

			resolveEditorPosted = resolve;

		} );

		page.on( 'request', ( request ) => {

			if ( request.method() !== 'POST' ) return;

			const pathname = new URL( request.url() ).pathname;

			if ( ! pathname.startsWith( SAVE_API_PREFIX ) ) return;

			saveRequests.push( request );

			if ( pathname.endsWith( SAVE_EDITOR_SUFFIX ) ) {

				resolveEditorPosted();

			}

		} );

		const url = new URL( '/', devServerUrl );
		url.searchParams.set( AGENT_HEADLESS_PARAM, '' );

		await page.goto( url.toString() );

		const waitForSave = async () => {

			let timer: NodeJS.Timeout | undefined;

			const timeout = new Promise<never>( ( _resolve, reject ) => {

				timer = setTimeout( () => reject( new Error( `保存が ${SAVE_TIMEOUT_MS}ms 以内に終わりませんでした` ) ), SAVE_TIMEOUT_MS );

			} );

			try {

				await Promise.race( [ editorPosted, timeout ] );

				for ( const request of saveRequests ) {

					const response = await Promise.race( [ request.response(), timeout ] );

					if ( ! response || ! response.ok() ) {

						let status = '応答なし';

						if ( response ) {

							status = `HTTP ${response.status()}`;

						}

						throw new Error( `保存に失敗しました（POST ${new URL( request.url() ).pathname}: ${status}）` );

					}

				}

			} finally {

				clearTimeout( timer );

			}

		};

		return {
			waitForSave,
			close: () => browser.close(),
		};

	} catch ( e ) {

		await browser.close();

		throw e;

	}

};
