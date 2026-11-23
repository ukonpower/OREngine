import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

import { CliError } from './args.ts';

// orengine-cli の画像の処理（PNG の読み書き・差分・切り抜き・画素・並べる）。
// 端末に PIL・ImageMagick が入っているかに頼らないよう、Node の zlib だけで PNG を扱う

export type Image = {
	width: number;
	height: number;
	// RGBA 8bit、左上から行ごと
	data: Uint8Array;
};

const PNG_SIGNATURE = Buffer.from( [ 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a ] );

/*-------------------------------
	PNG
-------------------------------*/

// 色の種類ごとのチャンネル数（PNG の仕様の color type）
const CHANNELS: { [ colorType: number ]: number } = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 };

const paeth = ( a: number, b: number, c: number ) => {

	const p = a + b - c;
	const pa = Math.abs( p - a );
	const pb = Math.abs( p - b );
	const pc = Math.abs( p - c );

	if ( pa <= pb && pa <= pc ) return a;
	if ( pb <= pc ) return b;

	return c;

};

// 8bit・16bit のインターレース無しの PNG を RGBA 8bit にする（shot・ブラウザ・一般的な画像ツールの出力はこれで読める）
export const decodePng = ( buffer: Buffer ): Image => {

	if ( buffer.length < 8 || ! buffer.subarray( 0, 8 ).equals( PNG_SIGNATURE ) ) {

		throw new CliError( 'PNG ではありません' );

	}

	let width = 0;
	let height = 0;
	let bitDepth = 0;
	let colorType = 0;
	let palette: Buffer | null = null;
	let transparency: Buffer | null = null;
	const idat: Buffer[] = [];

	let offset = 8;

	while ( offset < buffer.length ) {

		const length = buffer.readUInt32BE( offset );
		const type = buffer.toString( 'ascii', offset + 4, offset + 8 );
		const body = buffer.subarray( offset + 8, offset + 8 + length );

		if ( type === 'IHDR' ) {

			width = body.readUInt32BE( 0 );
			height = body.readUInt32BE( 4 );
			bitDepth = body[ 8 ];
			colorType = body[ 9 ];

			if ( body[ 12 ] !== 0 ) throw new CliError( 'インターレースの PNG は読めません' );

		} else if ( type === 'PLTE' ) {

			palette = body;

		} else if ( type === 'tRNS' ) {

			transparency = body;

		} else if ( type === 'IDAT' ) {

			idat.push( body );

		} else if ( type === 'IEND' ) {

			break;

		}

		offset += 12 + length;

	}

	const channels = CHANNELS[ colorType ];

	if ( channels === undefined || ( bitDepth !== 8 && bitDepth !== 16 ) ) {

		throw new CliError( `この PNG の形式は読めません（color type ${colorType}, bit depth ${bitDepth}）` );

	}

	const bytesPerSample = bitDepth / 8;
	const bpp = channels * bytesPerSample;
	const stride = width * bpp;
	const raw = zlib.inflateSync( Buffer.concat( idat ) );
	const pixels = Buffer.alloc( stride * height );

	// 行ごとのフィルタを戻す
	for ( let y = 0; y < height; y ++ ) {

		const filter = raw[ y * ( stride + 1 ) ];
		const src = y * ( stride + 1 ) + 1;
		const dst = y * stride;

		for ( let x = 0; x < stride; x ++ ) {

			const value = raw[ src + x ];
			let left = 0;
			let up = 0;
			let upLeft = 0;

			if ( x >= bpp ) left = pixels[ dst + x - bpp ];
			if ( y > 0 ) up = pixels[ dst - stride + x ];
			if ( x >= bpp && y > 0 ) upLeft = pixels[ dst - stride + x - bpp ];

			let predicted = 0;

			if ( filter === 1 ) predicted = left;
			else if ( filter === 2 ) predicted = up;
			else if ( filter === 3 ) predicted = Math.floor( ( left + up ) / 2 );
			else if ( filter === 4 ) predicted = paeth( left, up, upLeft );

			pixels[ dst + x ] = ( value + predicted ) & 0xff;

		}

	}

	const data = new Uint8Array( width * height * 4 );

	for ( let i = 0; i < width * height; i ++ ) {

		// 16bit は上位の byte だけを使う
		const sample = ( c: number ) => pixels[ i * bpp + c * bytesPerSample ];
		const out = i * 4;

		// 不透明度を持たない形式は 255
		data[ out + 3 ] = 255;

		if ( colorType === 3 ) {

			const index = sample( 0 );

			data[ out ] = palette![ index * 3 ];
			data[ out + 1 ] = palette![ index * 3 + 1 ];
			data[ out + 2 ] = palette![ index * 3 + 2 ];

			if ( transparency && index < transparency.length ) data[ out + 3 ] = transparency[ index ];

		} else if ( channels <= 2 ) {

			data[ out ] = sample( 0 );
			data[ out + 1 ] = sample( 0 );
			data[ out + 2 ] = sample( 0 );

			if ( channels === 2 ) data[ out + 3 ] = sample( 1 );

		} else {

			data[ out ] = sample( 0 );
			data[ out + 1 ] = sample( 1 );
			data[ out + 2 ] = sample( 2 );

			if ( channels === 4 ) data[ out + 3 ] = sample( 3 );

		}

	}

	return { width, height, data };

};

const chunk = ( type: string, body: Buffer ) => {

	const head = Buffer.alloc( 8 );
	head.writeUInt32BE( body.length, 0 );
	head.write( type, 4, 'ascii' );

	const crc = Buffer.alloc( 4 );
	crc.writeUInt32BE( zlib.crc32( Buffer.concat( [ head.subarray( 4 ), body ] ) ) >>> 0, 0 );

	return Buffer.concat( [ head, body, crc ] );

};

// RGBA 8bit の PNG にする。行のフィルタは Sub（左との差）だけにする（撮った絵ならこれで十分縮む）
export const encodePng = ( image: Image ) => {

	const stride = image.width * 4;
	const raw = Buffer.alloc( ( stride + 1 ) * image.height );

	for ( let y = 0; y < image.height; y ++ ) {

		const dst = y * ( stride + 1 );
		const src = y * stride;

		raw[ dst ] = 1;

		for ( let x = 0; x < stride; x ++ ) {

			let left = 0;

			if ( x >= 4 ) left = image.data[ src + x - 4 ];

			raw[ dst + 1 + x ] = ( image.data[ src + x ] - left ) & 0xff;

		}

	}

	const header = Buffer.alloc( 13 );
	header.writeUInt32BE( image.width, 0 );
	header.writeUInt32BE( image.height, 4 );
	header[ 8 ] = 8;
	header[ 9 ] = 6;

	return Buffer.concat( [
		PNG_SIGNATURE,
		chunk( 'IHDR', header ),
		chunk( 'IDAT', zlib.deflateSync( raw ) ),
		chunk( 'IEND', Buffer.alloc( 0 ) ),
	] );

};

export const readPng = ( file: string ) => {

	if ( ! fs.existsSync( file ) ) throw new CliError( `ファイルがありません: ${file}` );

	return decodePng( fs.readFileSync( file ) );

};

export const writePng = ( file: string, image: Image ) => {

	const resolved = path.resolve( file );

	fs.mkdirSync( path.dirname( resolved ), { recursive: true } );
	fs.writeFileSync( resolved, encodePng( image ) );

	return resolved;

};

/*-------------------------------
	Measure
-------------------------------*/

// 差があるとみなす1画素の差（RGB のどれかが 0〜255 でこれより大きい）。圧縮・GPU の揺れで出る 1〜2 の差を数えないため
const CHANGED_THRESHOLD = 8;

// 2枚の差。mean は RGB の差の絶対値の平均（0〜255）、changedRatio は差のある画素の割合、bounds は差のある画素を囲む矩形
export const diffImages = ( a: Image, b: Image ) => {

	if ( a.width !== b.width || a.height !== b.height ) {

		throw new CliError( `大きさが違います（${a.width}x${a.height} と ${b.width}x${b.height}）` );

	}

	let sum = 0;
	let max = 0;
	let changed = 0;
	let minX = Infinity;
	let minY = Infinity;
	let maxX = - 1;
	let maxY = - 1;
	const heat = new Uint8Array( a.width * a.height * 4 );

	for ( let i = 0; i < a.width * a.height; i ++ ) {

		let pixelMax = 0;

		for ( let c = 0; c < 3; c ++ ) {

			const d = Math.abs( a.data[ i * 4 + c ] - b.data[ i * 4 + c ] );

			sum += d;
			pixelMax = Math.max( pixelMax, d );

		}

		max = Math.max( max, pixelMax );

		// 差の画像: 差を 4 倍にして赤で、元の絵は暗くして下に敷く（どこが変わったかを位置と一緒に見られるように）
		const base = ( a.data[ i * 4 ] + a.data[ i * 4 + 1 ] + a.data[ i * 4 + 2 ] ) / 12;

		heat[ i * 4 ] = Math.min( 255, base + pixelMax * 4 );
		heat[ i * 4 + 1 ] = base;
		heat[ i * 4 + 2 ] = base;
		heat[ i * 4 + 3 ] = 255;

		if ( pixelMax <= CHANGED_THRESHOLD ) continue;

		changed ++;

		const x = i % a.width;
		const y = Math.floor( i / a.width );

		minX = Math.min( minX, x );
		minY = Math.min( minY, y );
		maxX = Math.max( maxX, x );
		maxY = Math.max( maxY, y );

	}

	let bounds: { x: number; y: number; width: number; height: number } | null = null;

	if ( changed > 0 ) bounds = { x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1 };

	return {
		mean: round( sum / ( a.width * a.height * 3 ) ),
		max,
		changedRatio: round( changed / ( a.width * a.height ) ),
		bounds,
		heat: { width: a.width, height: a.height, data: heat },
	};

};

// 1枚の明るさの様子。真っ黒・真っ白・ほぼ一色の PNG を見分けるため
export const imageStats = ( image: Image ) => {

	let sum = [ 0, 0, 0 ];
	let minLuma = 255;
	let maxLuma = 0;

	for ( let i = 0; i < image.width * image.height; i ++ ) {

		const r = image.data[ i * 4 ];
		const g = image.data[ i * 4 + 1 ];
		const b = image.data[ i * 4 + 2 ];
		const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

		sum = [ sum[ 0 ] + r, sum[ 1 ] + g, sum[ 2 ] + b ];
		minLuma = Math.min( minLuma, luma );
		maxLuma = Math.max( maxLuma, luma );

	}

	const count = image.width * image.height;

	return {
		width: image.width,
		height: image.height,
		mean: [ round( sum[ 0 ] / count ), round( sum[ 1 ] / count ), round( sum[ 2 ] / count ) ],
		minLuma: round( minLuma ),
		maxLuma: round( maxLuma ),
		// 明るさの幅が 2 以下 = 一色（真っ黒の PNG を成功と思い込まないため）
		flat: maxLuma - minLuma <= 2,
	};

};

const round = ( value: number ) => Math.round( value * 1000 ) / 1000;

/*-------------------------------
	Edit
-------------------------------*/

export const cropImage = ( image: Image, x: number, y: number, width: number, height: number ): Image => {

	if ( x < 0 || y < 0 || width < 1 || height < 1 || x + width > image.width || y + height > image.height ) {

		throw new CliError( `切り抜く範囲が画像（${image.width}x${image.height}）からはみ出しています: ${x},${y} ${width}x${height}` );

	}

	const data = new Uint8Array( width * height * 4 );

	for ( let row = 0; row < height; row ++ ) {

		const src = ( ( y + row ) * image.width + x ) * 4;

		data.set( image.data.subarray( src, src + width * 4 ), row * width * 4 );

	}

	return { width, height, data };

};

export const pixelAt = ( image: Image, x: number, y: number ) => {

	if ( x < 0 || y < 0 || x >= image.width || y >= image.height ) {

		throw new CliError( `画素が画像（${image.width}x${image.height}）の外です: ${x},${y}` );

	}

	const i = ( y * image.width + x ) * 4;
	const rgba = [ image.data[ i ], image.data[ i + 1 ], image.data[ i + 2 ], image.data[ i + 3 ] ];
	const unit: number[] = [];

	for ( const value of rgba ) {

		unit.push( round( value / 255 ) );

	}

	return { x, y, rgba, unit };

};

/*-------------------------------
	Sheet
-------------------------------*/

// 番号を書くための 3x5 の数字（1 = 塗る）。並べた絵のどれが何フレーム目かを、画像だけで読めるように
const DIGITS: { [ digit: string ]: string[] } = {
	0: [ '111', '101', '101', '101', '111' ],
	1: [ '010', '110', '010', '010', '111' ],
	2: [ '111', '001', '111', '100', '111' ],
	3: [ '111', '001', '111', '001', '111' ],
	4: [ '101', '101', '111', '001', '001' ],
	5: [ '111', '100', '111', '001', '111' ],
	6: [ '111', '100', '111', '101', '111' ],
	7: [ '111', '001', '001', '001', '001' ],
	8: [ '111', '101', '111', '101', '111' ],
	9: [ '111', '101', '111', '001', '111' ],
	'-': [ '000', '000', '111', '000', '000' ],
	'.': [ '000', '000', '000', '000', '010' ],
};

// 数字の1画素を描く大きさ
const LABEL_SCALE = 2;

const fillRect = ( image: Image, x: number, y: number, width: number, height: number, value: number ) => {

	for ( let row = y; row < Math.min( y + height, image.height ); row ++ ) {

		for ( let col = x; col < Math.min( x + width, image.width ); col ++ ) {

			const i = ( row * image.width + col ) * 4;

			image.data[ i ] = image.data[ i + 1 ] = image.data[ i + 2 ] = value;
			image.data[ i + 3 ] = 255;

		}

	}

};

// 左上に黒地に白で文字を書く
const drawLabel = ( image: Image, x: number, y: number, text: string ) => {

	const charWidth = 4 * LABEL_SCALE;

	fillRect( image, x, y, text.length * charWidth + LABEL_SCALE, 7 * LABEL_SCALE, 0 );

	for ( let c = 0; c < text.length; c ++ ) {

		const glyph = DIGITS[ text[ c ] ];

		if ( ! glyph ) continue;

		for ( let row = 0; row < 5; row ++ ) {

			for ( let col = 0; col < 3; col ++ ) {

				if ( glyph[ row ][ col ] !== '1' ) continue;

				fillRect( image, x + LABEL_SCALE + c * charWidth + col * LABEL_SCALE, y + LABEL_SCALE + row * LABEL_SCALE, LABEL_SCALE, LABEL_SCALE, 255 );

			}

		}

	}

};

// 同じ大きさの絵を左上から横に cols 枚ずつ並べる（コンタクトシート）。labels があれば各マスの左上に書く
export const makeSheet = ( images: Image[], cols: number, labels: string[] | null ): Image => {

	if ( images.length === 0 ) throw new CliError( '並べる画像がありません' );

	const cellWidth = images[ 0 ].width;
	const cellHeight = images[ 0 ].height;
	const rows = Math.ceil( images.length / cols );
	const sheet: Image = { width: cellWidth * cols, height: cellHeight * rows, data: new Uint8Array( cellWidth * cols * cellHeight * rows * 4 ) };

	for ( let n = 0; n < images.length; n ++ ) {

		const image = images[ n ];

		if ( image.width !== cellWidth || image.height !== cellHeight ) {

			throw new CliError( `並べる画像の大きさがそろっていません（1枚目 ${cellWidth}x${cellHeight}、${n + 1}枚目 ${image.width}x${image.height}）` );

		}

		const ox = ( n % cols ) * cellWidth;
		const oy = Math.floor( n / cols ) * cellHeight;

		for ( let row = 0; row < cellHeight; row ++ ) {

			const src = row * cellWidth * 4;

			sheet.data.set( image.data.subarray( src, src + cellWidth * 4 ), ( ( oy + row ) * sheet.width + ox ) * 4 );

		}

		if ( labels ) drawLabel( sheet, ox, oy, labels[ n ] );

	}

	return sheet;

};
