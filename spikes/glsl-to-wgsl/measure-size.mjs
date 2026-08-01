// 同じ 1 本のシェーダー（deferredShading.fs）について、現行の WebGL2 経路（shader_minifier で
// minify した GLSL）と WGSL 各経路のバイト数を比較する。64kb intro では packed サイズが
// 最重要指標なので gzip 後の値も測る。
//
// 前提: リポジトリルートで `npm run build` を一度実行し tmp/shader-minified/ が存在すること
// 使い方: node measure-size.mjs

import { execFileSync } from 'child_process';
import { gzipSync } from 'zlib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { transform } from './preprocess.mjs';
import { shaderParse } from './resolve.mjs';

const HERE = path.dirname( fileURLToPath( import.meta.url ) );
const REPO = path.resolve( HERE, '../..' );
const OUT_DIR = path.join( HERE, 'out' );
const MINIFIED = path.join( REPO, 'tmp/shader-minified/packages__maxpower__Component__Renderer__DeferredRenderer__shaders__deferredShading.fs' );

if ( ! fs.existsSync( MINIFIED ) ) {

	console.error( `minify 済みダンプがありません: ${MINIFIED}\nリポジトリルートで npm run build を一度実行してください` );
	process.exit( 1 );

}

const naga = ( args ) => execFileSync( path.join( process.env.HOME, '.cargo/bin/naga' ), args, { encoding: 'utf-8' } );

// WGSL のユーザー定義識別子を短縮したときのサイズを測る。
// WGSL には shader_minifier 相当が無いため、その不在がどれだけ効くかの見積もりに使う
const shortenIdentifiers = ( code ) => {

	const names = new Set();

	for ( const m of code.matchAll( /\bfn\s+([A-Za-z_]\w*)/g ) ) if ( m[ 1 ] !== 'main' ) names.add( m[ 1 ] );

	for ( const m of code.matchAll( /\blet\s+(_e\d+)/g ) ) names.add( m[ 1 ] );

	for ( const m of code.matchAll( /\bvar\s*(?:<[^>]*>)?\s*([A-Za-z_]\w*)/g ) ) names.add( m[ 1 ] );

	const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

	// 元の識別子と衝突しないよう Z を接頭辞にする
	const short = ( i ) => {

		let s = '';

		do {

			s = alphabet[ i % 52 ] + s;
			i = Math.floor( i / 52 ) - 1;

		} while ( i >= 0 );

		return `Z${s}`;

	};

	[ ...names ].forEach( ( name, i ) => {

		code = code.replace( new RegExp( `\\b${name}\\b`, 'g' ), short( i ) );

	} );

	return code;

};

// minify 済み GLSL を入口にして WGSL まで通す
const wgslFromMinified = () => {

	const src = path.join( OUT_DIR, 'minified.full.frag' );
	const pre = path.join( OUT_DIR, 'minified.vk.frag' );
	const wgsl = path.join( OUT_DIR, 'minified.direct.wgsl' );

	fs.writeFileSync( src, shaderParse( fs.readFileSync( MINIFIED, 'utf-8' ) ) );
	fs.writeFileSync( pre, transform( execFileSync( 'glslangValidator', [ '-E', src ], { encoding: 'utf-8' } ) ) );

	naga( [ '--input-kind', 'glsl', '--shader-stage', 'frag', pre, wgsl ] );

	return wgsl;

};

const rows = [];

const add = ( label, file ) => {

	const buf = fs.readFileSync( file );

	rows.push( { label, raw: buf.length, gzip: gzipSync( buf, { level: 9 } ).length } );

};

add( '現行 WebGL2: minified GLSL', MINIFIED );
add( 'WGSL: 生GLSL入口 / naga GLSL frontend', path.join( OUT_DIR, 'deferredShading.direct.wgsl' ) );
add( 'WGSL: 生GLSL入口 / SPIR-V 経由', path.join( OUT_DIR, 'deferredShading.spv.wgsl' ) );
add( 'WGSL: minified入口 / naga GLSL frontend', wgslFromMinified() );

for ( const [ label, file ] of [
	[ 'WGSL: 生GLSL入口 / SPIR-V + 識別子短縮', 'deferredShading.spv.wgsl' ],
	[ 'WGSL: minified入口 / frontend + 識別子短縮', 'minified.direct.wgsl' ],
] ) {

	const src = path.join( OUT_DIR, file );
	const out = src.replace( /\.wgsl$/, '.short.wgsl' );

	fs.writeFileSync( out, shortenIdentifiers( fs.readFileSync( src, 'utf-8' ) ) );

	naga( [ out ] );

	add( label, out );

}

const base = rows[ 0 ];

console.log( `${'route'.padEnd( 44 )}${'raw'.padStart( 8 )}${'gzip'.padStart( 8 )}${'gzip比'.padStart( 9 )}` );

for ( const r of rows ) {

	console.log( `${r.label.padEnd( 44 )}${String( r.raw ).padStart( 8 )}${String( r.gzip ).padStart( 8 )}${`${( r.gzip / base.gzip ).toFixed( 2 )}x`.padStart( 10 )}` );

}
