// tmp/shader-minified/（npm run build が生成するダンプ）の全シェーダーを GLSL→WGSL 変換にかけ、
// PASS/FAIL を集計する。
//
// 実行時の shaderParse（defines 注入・ライト数埋め込み・ループ展開）は node から TS を直接
// import できないため、検証用にこのスクリプト内へ再実装している
// （packages/maxpower/shader/ShaderParser/index.ts と同等の処理）。
//
// 使い方: npm run build && node scripts/verify-wgsl.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { transpile, validateWgsl } from '../host/vite/plugins/WgslTranspiler/transpile.mjs';

const ROOT = path.resolve( path.dirname( fileURLToPath( import.meta.url ) ), '..' );
const DUMP_DIR = path.join( ROOT, 'tmp/shader-minified' );

const LIGHT_COUNTS = {
	NUM_LIGHT_DIR: 1,
	NUM_SHADOWMAP_DIR: 2,
	NUM_LIGHT_SPOT: 1,
	NUM_SHADOWMAP_SPOT: 2,
};

// マテリアル側が実行時に注入する数値 define。値が無いと配列長やループ上限が未定義になるため、
// 呼び出し元の実装（Bloom / PMREMRender / DeferredRenderer / PipelinePostProcess）と同じ値を入れる
const MATERIAL_DEFINES = {
	GAUSS_WEIGHTS: 8,
	NUM_SAMPLES: 2,
	SSAOSAMPLE: 8,
	TILE: 16,
};

const RENDER_TYPE_DEFINES = [ 'IS_DEFERRED', 'IS_FORWARD', 'IS_DEPTH' ];

const VERTEX_EXT = new Set( [ '.vs', '.vert' ] );
const FRAGMENT_EXT = new Set( [ '.fs', '.frag', '.glsl' ] );

// spikes/ のダンプはスパイクが吐いた前処理済み中間ファイルで、エンジンのシェーダーではない
const EXCLUDE_PREFIX = 'spikes/';

const CONCURRENCY = 8;

/*-------------------------------
	shaderParse の再現
-------------------------------*/

const insertDefines = ( shader, defines ) => Object.keys( defines ).map( ( k ) => `#define ${k} ${defines[ k ]}\n` ).join( '' ) + shader;

const insertLights = ( shader ) => Object.entries( LIGHT_COUNTS ).reduce( ( acc, [ key, count ] ) => acc.replaceAll( key, String( count ) ), shader );

const unrollLoop = ( shader ) => shader.replace( /#pragma\sloop_start\s(\d+)*([\s\S]+?)#pragma\sloop_end/g, ( _, loop, body ) => {

	let str = '';

	for ( let i = 0; i < Number( loop ); i ++ ) str += body.replaceAll( 'LOOP_INDEX', String( i ) );

	return str;

} );

// glpower の examples は shaderParse を通らず自前で #version / precision を持つため、重複を避けて落とす
const stripHeader = ( shader ) => shader.replace( /^[^\S\n]*(#version|precision)\b.*$/gm, '' );

const shaderParse = ( shader, defines ) => unrollLoop( insertLights( '#version 300 es\nprecision highp float;\n' + insertDefines( stripHeader( shader ), defines ) ) );

/*-------------------------------
	検証対象の収集
-------------------------------*/

// ダンプのファイル名（元パスの / を __ に置換したもの）から元パスと stage を復元する
const toCase = ( fileName, source ) => {

	const sourcePath = fileName.replaceAll( '__', '/' );
	const ext = path.extname( sourcePath );

	if ( VERTEX_EXT.has( ext ) === false && FRAGMENT_EXT.has( ext ) === false ) return [];
	if ( sourcePath.startsWith( EXCLUDE_PREFIX ) ) return [];

	const stage = VERTEX_EXT.has( ext ) ? 'vertex' : 'fragment';
	const category = sourcePath.startsWith( 'packages/maxpower/' ) || sourcePath.startsWith( 'packages/orengine/' ) ? 'required'
		: sourcePath.startsWith( 'demo/' ) ? 'demo' : 'other';

	// レンダータイプで分岐するシェーダーは3バリアント、しないものは1バリアント
	const variants = RENDER_TYPE_DEFINES.some( ( d ) => source.includes( d ) )
		? RENDER_TYPE_DEFINES.map( ( d ) => ( { variant: d, defines: { ...MATERIAL_DEFINES, [ d ]: '' } } ) )
		: [ { variant: '-', defines: { ...MATERIAL_DEFINES } } ];

	return variants.map( ( v ) => ( { sourcePath, stage, category, ...v, glsl: shaderParse( source, v.defines ) } ) );

};

const collectCases = () => {

	const cases = [];

	for ( const fileName of fs.readdirSync( DUMP_DIR ).sort() ) {

		cases.push( ...toCase( fileName, fs.readFileSync( path.join( DUMP_DIR, fileName ), 'utf-8' ) ) );

	}

	return cases;

};

/*-------------------------------
	実行
-------------------------------*/

// 1ケースを変換し、生成された WGSL を naga の validate モードにもかける
const runCase = async ( c, index ) => {

	const result = await transpile( c.glsl, c.stage );

	if ( result.error ) return { ...c, ok: false, error: result.error };

	const invalid = await validateWgsl( result.wgsl, `case${index}` );

	return invalid ? { ...c, ok: false, error: invalid } : { ...c, ok: true };

};

// 同時実行数を絞りつつ全ケースを流す
const runAll = async ( cases ) => {

	const results = new Array( cases.length );
	let cursor = 0;

	const worker = async () => {

		while ( cursor < cases.length ) {

			const i = cursor ++;

			results[ i ] = await runCase( cases[ i ], i );

		}

	};

	await Promise.all( Array.from( { length: CONCURRENCY }, worker ) );

	return results;

};

/*-------------------------------
	出力
-------------------------------*/

const CATEGORY_LABEL = {
	required: '必須セット (packages/maxpower, packages/orengine)',
	demo: 'demo/',
	other: 'その他 (packages/glpower)',
};

const summarize = ( results ) => {

	let failed = 0;

	for ( const category of [ 'required', 'demo', 'other' ] ) {

		const group = results.filter( ( r ) => r.category === category );

		if ( group.length === 0 ) continue;

		const pass = group.filter( ( r ) => r.ok ).length;

		console.log( `\n===== ${CATEGORY_LABEL[ category ]}: ${pass}/${group.length} PASS =====` );

		for ( const r of group ) {

			console.log( `${r.ok ? 'PASS' : 'FAIL'}  ${r.stage.padEnd( 8 )} ${r.variant.padEnd( 11 )} ${r.sourcePath}` );

			if ( ! r.ok ) console.log( `      ${r.error.split( '\n' ).filter( ( l ) => l.trim() ).join( '\n      ' )}` );

		}

		if ( category === 'required' ) failed = group.length - pass;

	}

	const pass = results.filter( ( r ) => r.ok ).length;

	console.log( `\n===== 合計: ${pass}/${results.length} PASS =====` );

	return failed;

};

if ( ! fs.existsSync( DUMP_DIR ) ) {

	console.error( `${DUMP_DIR} がありません。先に npm run build を実行してください` );
	process.exit( 1 );

}

const cases = collectCases();

console.log( `${cases.length} ケースを変換します（同時実行 ${CONCURRENCY}）` );

const results = await runAll( cases );

process.exit( summarize( results ) > 0 ? 1 : 0 );
