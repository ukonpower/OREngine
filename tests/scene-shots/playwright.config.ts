import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from '@playwright/test';

const testDir = path.dirname( fileURLToPath( import.meta.url ) );
const rootDir = path.join( testDir, '../..' );

// npm run scene-shots の設定。撮影の流れは sceneShots.spec.ts。ローカルの Mac 専用（Metal で描くため CI には載せない）
export default defineConfig( {
	testDir,

	// <シーン名>/<バックエンド>.png に置く。git の差分で見るファイルなので、プラットフォーム名などは付けない
	snapshotPathTemplate: '{testDir}/{arg}{ext}',

	// 無い PNG は書き、許容誤差を超えて変わった PNG だけを書き換える（誤差以内ならファイルに触れず、git の差分にならない）
	updateSnapshots: 'changed',

	// 書き換えた PNG の元画像などは成果物ではないので gitignore 済みの tmp へ出す
	outputDir: path.join( rootDir, 'tmp/scene-shots-results' ),

	reporter: 'list',

	retries: 0,

	// バックエンドごとに dev サーバーとブラウザを1つずつ立て、シーンを順に撮る
	workers: 1,

	// 初回は依存の事前バンドル・vite の変換・シェーダーの minify が走り、最初のシーンを開くまでが長い
	timeout: 5 * 60 * 1000,

	// 撮るたびの揺れ（webgl の SSAO のサンプルが Math.random・GPU の誤差）を許す幅。
	// main を3回撮った実測（2026-10）で、画素ごとの色の差は threshold 0.03 で最大1画素、0.05 以上では0画素だった（webgpu は 0.005 でも0画素）。
	// threshold はその倍以上をとり、超えた画素も 100（960x540 の約0.02%）までは書き換えない
	expect: {
		toMatchSnapshot: {
			threshold: 0.1,
			maxDiffPixels: 100,
		},
	},
} );
