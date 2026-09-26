import { AGENT_HEADLESS_PARAM } from '../packages/orengine/editor/lib/AgentBridge/Protocol/index.ts';

import type { Browser } from '@playwright/test';

// エディタのタブが無いときに、scripts/scene.ts が代わりの接続先として開く headless Chromium

// WebGL2 / WebGPU とも Metal で描かせるためのフラグ（#80 の実測: Playwright 1.62.1 / Apple Silicon）。
// 無いと WebGL2 は SwiftShader（CPU）になり、WebGPU は --enable-unsafe-webgpu だけだと SwiftShader の fallback で canvas が真っ黒になる
const LAUNCH_ARGS = [ '--enable-unsafe-webgpu', '--use-angle=metal' ];

// ウィンドウサイズは固定する。エディタの描画解像度（Screen パネルの大きさ）がこれで決まり、shot（#83）の出力サイズになるため。
// 1920x1080 は一般的なデスクトップの画面サイズで、ユーザーの editor.json のパネル配置がそのまま無理なく収まる。
// deviceScaleFactor も 1 に固定し、実行環境の画面の倍率で出力サイズが変わらないようにする
const VIEWPORT = { width: 1920, height: 1080 };
const DEVICE_SCALE_FACTOR = 1;

export type HeadlessEditor = {
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

		const url = new URL( '/', devServerUrl );
		url.searchParams.set( AGENT_HEADLESS_PARAM, '' );

		await page.goto( url.toString() );

		return {
			close: () => browser.close(),
		};

	} catch ( e ) {

		await browser.close();

		throw e;

	}

};
