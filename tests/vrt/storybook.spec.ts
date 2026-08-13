import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { expect, test } from '@playwright/test';

import type { Page } from '@playwright/test';

const rootDir = path.join( path.dirname( fileURLToPath( import.meta.url ) ), '../..' );
const indexPath = path.join( rootDir, 'storybook-static/index.json' );

// このタグを付けたストーリーは撮影しない。再生中のように絵が止まらないものを外すための逃げ道
const SKIP_TAG = 'no-vrt';

const shotOptions = { fullPage: true, animations: 'disabled', caret: 'hide' } as const;

// 実測に基づく安定待ちのパラメータ。最も遅い AllPatterns で描画が落ち着くのが読み込みから約500ms、
// 波形やグリッドが段階的に現れる途中の状態が最長で約180ms保たれるため、
// 100ms間隔で4回連続一致（=約400ms以上変化なし）を完了条件にする
const STABLE_INTERVAL = 100;
const STABLE_SAMPLES = 4;
const STABLE_TIMEOUT = 10000;

type StoryIndex = {
	entries: Record<string, {
		type: string,
		id: string,
		title: string,
		name: string,
		tags?: string[],
	}>,
};

// ビルド済み Storybook の索引から撮影対象のストーリーを集める
const listStories = () => {

	if ( ! fs.existsSync( indexPath ) ) {

		throw new Error( `storybook-static/index.json が見つかりません。先に npm run build-storybook を実行してください: ${indexPath}` );

	}

	const storyIndex: StoryIndex = JSON.parse( fs.readFileSync( indexPath, 'utf-8' ) );

	return Object.values( storyIndex.entries ).filter( ( entry ) => entry.type === 'story' && ! ( entry.tags || [] ).includes( SKIP_TAG ) );

};

// 描画完了をアプリ側が通知しないので、画面が変化しなくなったことをもって完了とみなす。
// 音源のデコードのようにDOMを変えないまま絵だけ後から変わる経路があり、DOM上の条件では判定できない
const waitForStable = async ( page: Page ) => {

	let previous = await page.screenshot( shotOptions );
	let stableCount = 0;

	const deadline = Date.now() + STABLE_TIMEOUT;

	while ( Date.now() < deadline ) {

		await page.waitForTimeout( STABLE_INTERVAL );

		const current = await page.screenshot( shotOptions );

		stableCount = current.equals( previous ) ? stableCount + 1 : 0;
		previous = current;

		if ( stableCount >= STABLE_SAMPLES ) return;

	}

};

const stories = listStories();

test.describe( 'storybook', () => {

	for ( const story of stories ) {

		test( story.id, async ( { page } ) => {

			await page.goto( `/iframe.html?id=${story.id}&viewMode=story`, { waitUntil: 'load' } );

			await page.waitForFunction( () => document.fonts.status === 'loaded' );
			await waitForStable( page );

			// fullPage は設定ファイル側の expect には置けないので撮影時に指定する。
			// ビューポートより縦に長いストーリーが黙って切れないようにするため
			await expect( page ).toHaveScreenshot( `${story.id}.png`, { fullPage: true } );

		} );

	}

} );
