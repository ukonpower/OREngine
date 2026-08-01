// 完全形 GLSL(ES 3.00) を「naga が受理する Vulkan 方言 GLSL」へ機械変換する。
// 各 transform が REPORT.md の前処理規則 R1〜R7 と 1:1 対応する。
//
// 使い方: node preprocess.mjs   （out/*.full.frag → out/*.vk.frag）

import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname( fileURLToPath( import.meta.url ) );
const OUT_DIR = path.join( HERE, 'out' );

const OPAQUE_TYPE = /^(sampler|image|texture|atomic_uint)/;
const TEXTURE_BUILTINS = [ 'texture', 'textureLod', 'textureGrad', 'textureSize', 'texelFetch' ];

/*-------------------------------
	ソース走査のユーティリティ
-------------------------------*/

// open の位置（'(' のインデックス）から対応する ')' の位置を返す
const matchParen = ( code, open ) => {

	let depth = 0;

	for ( let i = open; i < code.length; i ++ ) {

		if ( code[ i ] === '(' ) depth ++;
		else if ( code[ i ] === ')' && -- depth === 0 ) return i;

	}

	return - 1;

};

// 引数リスト本文をトップレベルのカンマで分割する
const splitArgs = ( body ) => {

	const args = [];
	let depth = 0;
	let start = 0;

	for ( let i = 0; i < body.length; i ++ ) {

		const c = body[ i ];

		if ( c === '(' || c === '[' ) depth ++;
		else if ( c === ')' || c === ']' ) depth --;
		else if ( c === ',' && depth === 0 ) {

			args.push( body.slice( start, i ) );
			start = i + 1;

		}

	}

	if ( body.trim() !== '' ) args.push( body.slice( start ) );

	return args;

};

// 名前 name の関数呼び出しをすべて走査し、引数配列を書き換える
const rewriteCalls = ( code, name, rewriteArgs ) => {

	const pattern = new RegExp( `\\b${name}\\s*\\(`, 'g' );
	let result = '';
	let last = 0;
	let m;

	while ( ( m = pattern.exec( code ) ) !== null ) {

		const open = m.index + m[ 0 ].length - 1;
		const close = matchParen( code, open );

		if ( close < 0 ) continue;

		const args = rewriteArgs( splitArgs( code.slice( open + 1, close ) ) );

		if ( ! args ) continue;

		result += code.slice( last, m.index ) + `${name}( ${args.join( ', ' )} )`;
		last = close + 1;
		pattern.lastIndex = close + 1;

	}

	return result + code.slice( last );

};

/*-------------------------------
	前処理規則
-------------------------------*/

// R1: プリプロセッサをここで畳む。以降の規則が #if/#define を考えなくて済む
export const flatten = ( file ) => execFileSync( 'glslangValidator', [ '-E', file ], { encoding: 'utf-8' } );

// R0: 1行1宣言・1宣言子に正規化する。minify 済みソースは宣言をカンマと1行に詰めるため、
// 以降の行アンカー正規表現がそのままでは当たらない。
// 直前が ; } か行頭のものだけを対象にして layout(...) 付き宣言を分断しないようにする
const normalizeDeclarations = ( code ) => code
	.replace( /(^|[;}])[^\S\n]*uniform\s+(\w+)\s+([^;]+);/gm, ( _, head, type, decls ) => head + decls.split( ',' ).map( ( d ) => `\nuniform ${type} ${d.trim()};` ).join( '' ) + '\n' )
	.replace( /(^|[;}])[^\S\n]*(in|out)\s+(\w+)\s+(\w+)\s*;/gm, ( _, head, dir, type, name ) => `${head}\n${dir} ${type} ${name};\n` );

// R2: naga の GLSL フロントエンドは ES プロファイルを受理しないので desktop 460 にする
const rewriteVersion = ( code ) => code
	.replace( /^#version .*$/m, '#version 460' )
	.replace( /^\s*precision\s+\w+\s+\w+\s*;\s*$/gm, '' );

// トップレベルの uniform 宣言を列挙する
const collectUniforms = ( code ) => [ ...code.matchAll( /^\s*uniform\s+(\w+)\s+(\w+)\s*(?:\[\s*(\d+)\s*\])?\s*;\s*$/gm ) ].map( ( m ) => ( {
	raw: m[ 0 ],
	type: m[ 1 ],
	name: m[ 2 ],
	count: m[ 3 ] ? Number( m[ 3 ] ) : null,
	opaque: OPAQUE_TYPE.test( m[ 1 ] ),
} ) );

// R3: sampler 配列を要素ごとの個別 uniform に展開する。
// WGSL のコア機能に texture 配列が無いため。ループ展開後の添字はすべてリテラル
const unrollSamplerArrays = ( code ) => {

	for ( const u of collectUniforms( code ).filter( ( u ) => u.opaque && u.count !== null ) ) {

		const decls = Array.from( { length: u.count }, ( _, i ) => `uniform ${u.type} ${u.name}_${i};` ).join( '\n' );

		code = code.replace( u.raw, `\n${decls}\n` );
		code = code.replace( new RegExp( `\\b${u.name}\\s*\\[\\s*(\\d+)\\s*\\]`, 'g' ), ( _, i ) => `${u.name}_${i}` );

	}

	return code;

};

// R4: combined sampler を texture / sampler の2オブジェクトへ分離する。
// WGSL は combined sampler を持たず、naga は SPIR-V の OpTypeSampledImage も受理しない
const splitSamplers = ( code ) => {

	const samplers = collectUniforms( code ).filter( ( u ) => u.opaque );
	const names = new Set( samplers.map( ( u ) => u.name ) );

	samplers.forEach( ( u, i ) => {

		const texType = u.type.replace( /^sampler/, 'texture' );

		code = code.replace( u.raw, [
			'',
			`layout(set = 0, binding = ${1 + i * 2}) uniform ${texType} ${u.name}_tex;`,
			`layout(set = 0, binding = ${2 + i * 2}) uniform sampler ${u.name}_smp;`,
			'',
		].join( '\n' ) );

	} );

	// R5: sampler を受け取る関数は (texture, sampler) の2引数に開き、呼び出し側も展開する。
	// glslang は「sampler コンストラクタは使用箇所に現れなければならない」ため関数を跨げない
	const signature = /(\w+)\s+(\w+)\s*\(([^)]*)\)\s*\{/g;
	const expanded = new Map();

	for ( const m of [ ...code.matchAll( signature ) ] ) {

		const params = splitArgs( m[ 3 ] );
		const positions = [];

		const rewritten = params.map( ( p, i ) => {

			const pm = p.match( /^\s*(\w*sampler\w*)\s+(\w+)\s*$/ );

			if ( ! pm ) return p;

			positions.push( i );
			names.add( pm[ 2 ] );

			return ` ${pm[ 1 ].replace( /^sampler/, 'texture' )} ${pm[ 2 ]}_tex, sampler ${pm[ 2 ]}_smp`;

		} );

		if ( positions.length === 0 ) continue;

		expanded.set( m[ 2 ], positions );
		code = code.replace( m[ 0 ], `${m[ 1 ]} ${m[ 2 ]}(${rewritten.join( ',' )}) {` );

	}

	for ( const [ fn, positions ] of expanded ) {

		code = rewriteCalls( code, fn, ( args ) => {

			// 定義側は書き換え済みで引数が素の識別子にならないため自然に素通りする
			if ( ! positions.every( ( p ) => names.has( args[ p ]?.trim() ) ) ) return null;

			return args.flatMap( ( a, i ) => positions.includes( i ) ? [ `${a.trim()}_tex`, `${a.trim()}_smp` ] : [ a.trim() ] );

		} );

	}

	// R6: テクスチャ組み込み関数の第1引数を sampler2D(tex, smp) のインライン構築に置き換える
	for ( const builtin of TEXTURE_BUILTINS ) {

		code = rewriteCalls( code, builtin, ( args ) => {

			const first = args[ 0 ]?.trim();

			if ( ! names.has( first ) ) return null;

			return [ `sampler2D( ${first}_tex, ${first}_smp )`, ...args.slice( 1 ).map( ( a ) => a.trim() ) ];

		} );

	}

	return code;

};

// R7: ブロック外の非 opaque uniform を std140 ブロックへまとめる。
// 本文の参照はフィールド名でそのまま解決されるので書き換え不要
const wrapLooseUniforms = ( code ) => {

	const loose = collectUniforms( code ).filter( ( u ) => ! u.opaque );

	if ( loose.length === 0 ) return code;

	const block = [
		'layout(set = 0, binding = 0) uniform Params {',
		...loose.map( ( u ) => `\t${u.type} ${u.name}${u.count === null ? '' : `[${u.count}]`};` ),
		'};',
	].join( '\n' );

	code = code.replace( loose[ 0 ].raw, `\n${block}\n` );

	for ( const u of loose.slice( 1 ) ) code = code.replace( u.raw, '\n' );

	return code;

};

// R8: Vulkan 方言は stage 入出力すべてに location を要求する
const addInputLocations = ( code ) => {

	let location = 0;

	return code.replace( /^\s*in\s+(\w+)\s+(\w+)\s*;\s*$/gm, ( _, type, name ) => `\nlayout(location = ${location ++}) in ${type} ${name};\n` );

};

/*-------------------------------
	実行
-------------------------------*/

const PIPELINE = [ normalizeDeclarations, rewriteVersion, unrollSamplerArrays, splitSamplers, wrapLooseUniforms, addInputLocations ];

// 平坦化済み GLSL に前処理規則をすべて適用する
export const transform = ( code ) => PIPELINE.reduce( ( acc, step ) => step( acc ), code );

if ( import.meta.main ) {

	for ( const name of [ 'minimal', 'deferredShading' ] ) {

		const out = path.join( OUT_DIR, `${name}.vk.frag` );

		fs.writeFileSync( out, transform( flatten( path.join( OUT_DIR, `${name}.full.frag` ) ) ) );

		console.log( `wrote ${path.basename( out )}` );

	}

}
