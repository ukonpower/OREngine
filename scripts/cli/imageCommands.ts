import fs from 'node:fs';
import path from 'node:path';

import { CliError } from './args.ts';
import { cropImage, decodePng, diffImages, imageStats, makeSheet, pixelAt, readPng, writePng } from './image.ts';

import type { Image } from './image.ts';
import type { AgentOptions } from '../../packages/orengine/editor/lib/AgentBridge/Protocol/index.ts';

// 画像を扱うコマンド（img）と、shot / frames の PNG の書き出し。dev サーバーを使わない

/*-------------------------------
	shot
-------------------------------*/

// shot の応答（packages/orengine/editor/lib/AgentBridge/ShotCommand の戻り値）
type ShotResult = {
	png: string;
	[ key: string ]: unknown;
};

// shot の応答の PNG（base64）を outPath へ書き出し、stdout に出す情報（PNG 本体を除いたもの）と、一色かどうかを返す。
// 一色（真っ黒など）の PNG を成功と思い込まないよう、明るさの幅を見る
export const writeShotPng = ( outPath: string, result: unknown ) => {

	const { png, ...info } = result as ShotResult;
	const file = path.resolve( outPath );
	const buffer = Buffer.from( png, 'base64' );

	fs.mkdirSync( path.dirname( file ), { recursive: true } );
	fs.writeFileSync( file, buffer );

	const stats = imageStats( decodePng( buffer ) );

	if ( stats.flat ) {

		process.stderr.write( `[orengine-cli] 撮った絵が一色です（平均の色 ${stats.mean.join( ',' )}）: ${file}。カメラ・読み込み・シーンのエラー（errors）を確かめてください\n` );

	}

	return { path: file, ...info, flat: stats.flat };

};

/*-------------------------------
	frames
-------------------------------*/

type FramesResult = {
	width: number;
	height: number;
	view: string;
	camera: unknown;
	frames: { frame: number; time: number; png: string }[];
};

// 隣り合うコマの差が、これより大きく、かつ差の中央値の JUMP_RATIO 倍より大きければ「急に変わった」とする（ちらつき・ループの継ぎ目）。
// 差は RGB の差の絶対値の平均（0〜255）。動きの速いシーンでも中央値との比で見るので、常に変わっている絵を全部拾わない
const JUMP_MIN_MEAN = 1;
const JUMP_RATIO = 3;

// 差の大きい順に出す数
const LARGEST_COUNT = 5;

const median = ( values: number[] ) => {

	const sorted = [ ...values ];

	sorted.sort( ( a, b ) => a - b );

	if ( sorted.length === 0 ) return 0;

	return sorted[ Math.floor( sorted.length / 2 ) ];

};

// frames の応答を dir へ書き出す（frame-<番号>.png と、番号入りで並べた sheet.png）。隣り合うコマの差から急に変わった箇所を探す
export const writeFrames = ( dir: string, result: unknown, cols: number | null ) => {

	const { width, height, view, camera, frames } = result as FramesResult;
	const outDir = path.resolve( dir );
	const images: Image[] = [];
	const labels: string[] = [];
	const files: string[] = [];
	const flat: number[] = [];

	fs.mkdirSync( outDir, { recursive: true } );

	for ( const item of frames ) {

		const buffer = Buffer.from( item.png, 'base64' );
		const file = path.join( outDir, `frame-${String( item.frame ).padStart( 4, '0' )}.png` );
		const image = decodePng( buffer );

		fs.writeFileSync( file, buffer );
		files.push( file );
		images.push( image );
		labels.push( String( item.frame ) );

		if ( imageStats( image ).flat ) flat.push( item.frame );

	}

	const diffs: { from: number; to: number; mean: number; changedRatio: number }[] = [];

	for ( let i = 1; i < images.length; i ++ ) {

		const diff = diffImages( images[ i - 1 ], images[ i ] );

		diffs.push( { from: frames[ i - 1 ].frame, to: frames[ i ].frame, mean: diff.mean, changedRatio: diff.changedRatio } );

	}

	const means: number[] = [];

	for ( const diff of diffs ) means.push( diff.mean );

	const typical = median( means );
	const jumps = [];

	for ( const diff of diffs ) {

		if ( diff.mean > JUMP_MIN_MEAN && diff.mean > typical * JUMP_RATIO ) {

			jumps.push( diff );

		}

	}

	const sorted = [ ...diffs ];

	sorted.sort( ( a, b ) => b.mean - a.mean );

	const largest = sorted.slice( 0, LARGEST_COUNT );

	let columns = cols;

	if ( columns === null ) columns = Math.ceil( Math.sqrt( images.length ) );

	const sheet = writePng( path.join( outDir, 'sheet.png' ), makeSheet( images, columns, labels ) );

	return {
		dir: outDir,
		sheet,
		size: `${width}x${height}`,
		view,
		camera,
		count: files.length,
		first: files[ 0 ],
		last: files[ files.length - 1 ],
		// 一色（真っ黒など）のコマ
		flat,
		// 隣り合うコマの差の中央値と、それより JUMP_RATIO 倍以上大きい差（急に変わった箇所）
		typicalDiff: typical,
		jumps,
		largest,
	};

};

/*-------------------------------
	img
-------------------------------*/

const IMG_USAGE = [
	'img diff <a.png> <b.png> [--out <差の画像.png>]   2枚の差（平均・最大・差のある画素の割合と範囲）',
	'img crop <in.png> <x> <y> <幅> <高さ> <out.png>    切り抜く',
	'img pixel <in.png> <x> <y>                        1画素の色（0〜255 と 0〜1）',
	'img stats <in.png> [...]                          平均の色・明るさの幅・一色か',
	'img sheet <out.png> <in.png> [...] [--cols <列>]  同じ大きさの絵を並べる（左上に番号）',
].join( '\n' );

const requireInt = ( raw: string | undefined, name: string ) => {

	const value = Number( raw );

	if ( raw === undefined || ! Number.isInteger( value ) ) {

		throw new CliError( `${name} は整数で指定してください: ${raw}\n${IMG_USAGE}` );

	}

	return value;

};

const requirePath = ( raw: string | undefined, name: string ) => {

	if ( raw === undefined ) throw new CliError( `${name} がありません\n${IMG_USAGE}` );

	return raw;

};

export const runImageCommand = ( args: string[], options: AgentOptions ) => {

	const [ sub, ...rest ] = args;

	if ( sub === 'diff' ) {

		const diff = diffImages( readPng( requirePath( rest[ 0 ], 'a.png' ) ), readPng( requirePath( rest[ 1 ], 'b.png' ) ) );
		const { heat, ...result } = diff;
		let out: string | null = null;

		if ( typeof options.out === 'string' ) out = writePng( options.out, heat );

		return { ...result, out };

	}

	if ( sub === 'crop' ) {

		const image = readPng( requirePath( rest[ 0 ], 'in.png' ) );
		const cropped = cropImage( image, requireInt( rest[ 1 ], 'x' ), requireInt( rest[ 2 ], 'y' ), requireInt( rest[ 3 ], '幅' ), requireInt( rest[ 4 ], '高さ' ) );

		return { path: writePng( requirePath( rest[ 5 ], 'out.png' ), cropped ), width: cropped.width, height: cropped.height };

	}

	if ( sub === 'pixel' ) {

		return pixelAt( readPng( requirePath( rest[ 0 ], 'in.png' ) ), requireInt( rest[ 1 ], 'x' ), requireInt( rest[ 2 ], 'y' ) );

	}

	if ( sub === 'stats' ) {

		const results = [];

		for ( const file of rest ) {

			results.push( { path: path.resolve( file ), ...imageStats( readPng( file ) ) } );

		}

		return results;

	}

	if ( sub === 'sheet' ) {

		const out = requirePath( rest[ 0 ], 'out.png' );
		const inputs = rest.slice( 1 );
		const images: Image[] = [];
		const labels: string[] = [];

		for ( let i = 0; i < inputs.length; i ++ ) {

			images.push( readPng( inputs[ i ] ) );
			labels.push( String( i + 1 ) );

		}

		let cols = Math.ceil( Math.sqrt( images.length ) );

		if ( options.cols !== undefined ) cols = requireInt( String( options.cols ), '--cols' );

		const sheet = makeSheet( images, cols, labels );
		const order: { [ label: string ]: string } = {};

		for ( let i = 0; i < inputs.length; i ++ ) order[ labels[ i ] ] = path.resolve( inputs[ i ] );

		return { path: writePng( out, sheet ), width: sheet.width, height: sheet.height, order };

	}

	throw new CliError( `img のサブコマンドが違います: ${sub}\n${IMG_USAGE}` );

};
