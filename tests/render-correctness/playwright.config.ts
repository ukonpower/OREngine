import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from '@playwright/test';

const testDir = path.dirname( fileURLToPath( import.meta.url ) );
const rootDir = path.join( testDir, '../..' );

// npm run render-correctness の設定。流れは renderCorrectness.spec.ts。ローカルの Mac 専用（Metal で描くため CI には載せない）
export default defineConfig( {
	testDir,

	outputDir: path.join( rootDir, 'tmp/render-correctness-results' ),

	reporter: 'list',

	retries: 0,

	// バックエンドごとに dev サーバーとブラウザを1つずつ立て、テストを順に走らせる
	workers: 1,

	// 初回は依存の事前バンドル・vite の変換・シェーダーの minify が走る
	timeout: 5 * 60 * 1000,
} );
