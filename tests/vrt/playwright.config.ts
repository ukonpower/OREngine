import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig, devices } from '@playwright/test';

const testDir = path.dirname( fileURLToPath( import.meta.url ) );
const rootDir = path.join( testDir, '../..' );

const port = Number( process.env.VRT_PORT ) || 6007;

export default defineConfig( {
	testDir,

	// ベースラインはストーリーIDそのままの1枚に対応させる（macOSローカル専用なので
	// プラットフォーム名・プロジェクト名の付与はしない）
	snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}',

	// 差分画像・トレースは成果物ではないので gitignore 済みの tmp へ出す
	outputDir: path.join( rootDir, 'tmp/vrt-results' ),

	reporter: 'list',

	// リトライで隠れると回帰と揺れの区別がつかなくなるため、1回で判定する
	retries: 0,

	// ローカルMacで走らせる前提なので、同時に立ち上げるブラウザを絞る
	workers: 2,

	use: {
		...devices[ 'Desktop Chrome' ],
		baseURL: `http://127.0.0.1:${port}`,
		viewport: { width: 1280, height: 720 },
		deviceScaleFactor: 1,
	},

	expect: {
		toHaveScreenshot: {
			animations: 'disabled',
			// ループ範囲を示す1px線がサブピクセルで揺れる実測があるため、
			// 全画素（1280x720 = 921,600）の 0.01% 程度を許容する
			maxDiffPixels: 100,
		},
	},

	webServer: {
		command: 'npx tsx tests/vrt/serve.ts',
		cwd: rootDir,
		url: `http://127.0.0.1:${port}/index.json`,
		env: { VRT_PORT: String( port ) },
		reuseExistingServer: true,
		stdout: 'ignore',
	},
} );
