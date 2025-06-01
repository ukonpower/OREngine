import { SPZGaussianData } from '../utils/CoordinateSystemConverter';

/**
 * .splatファイルかどうかを判定する
 * @param data ファイルデータ
 * @returns .splatファイルかどうか
 */
export function isSplatFormat( data: ArrayBuffer ): boolean {

	// .splatファイルのサイズが32バイトの倍数であることをチェック
	const SPLAT_ROW_LENGTH = 32; // 3*4 + 3*4 + 4 + 4 = 32 bytes
	return data.byteLength % SPLAT_ROW_LENGTH === 0;

}

/**
 * Splatファイルからガウシアンデータを解析する
 * @param buffer ファイルバッファ
 * @returns ガウシアンデータ
 */
export function parseSplat( buffer: ArrayBuffer ): SPZGaussianData {

	const SPLAT_ROW_LENGTH = 32; // 各スプラットのバイト数
	const vertexCount = Math.floor( buffer.byteLength / SPLAT_ROW_LENGTH );

	const f_buffer = new Float32Array( buffer );
	const u_buffer = new Uint8Array( buffer );

	// データ配列の初期化
	const positions = new Float32Array( vertexCount * 3 );
	const scales = new Float32Array( vertexCount * 3 );
	const rotations = new Float32Array( vertexCount * 4 );
	const colors = new Float32Array( vertexCount * 3 );
	const alphas = new Float32Array( vertexCount );

	// データを解析
	for ( let i = 0; i < vertexCount; i ++ ) {

		// 位置データ (f_buffer[8*i + 0,1,2])
		positions[ i * 3 + 0 ] = f_buffer[ 8 * i + 0 ];
		positions[ i * 3 + 1 ] = f_buffer[ 8 * i + 1 ];
		positions[ i * 3 + 2 ] = f_buffer[ 8 * i + 2 ];

		// スケールデータ (f_buffer[8*i + 3,4,5])
		scales[ i * 3 + 0 ] = f_buffer[ 8 * i + 3 ];
		scales[ i * 3 + 1 ] = f_buffer[ 8 * i + 4 ];
		scales[ i * 3 + 2 ] = f_buffer[ 8 * i + 5 ];

		// 色データ (u_buffer[32*i + 24,25,26,27] → RGBA)
		colors[ i * 3 + 0 ] = u_buffer[ 32 * i + 24 + 0 ] / 255.0;
		colors[ i * 3 + 1 ] = u_buffer[ 32 * i + 24 + 1 ] / 255.0;
		colors[ i * 3 + 2 ] = u_buffer[ 32 * i + 24 + 2 ] / 255.0;
		alphas[ i ] = u_buffer[ 32 * i + 24 + 3 ] / 255.0;

		// 回転データ (u_buffer[32*i + 28,29,30,31] → quaternion)
		rotations[ i * 4 + 0 ] = ( u_buffer[ 32 * i + 28 + 0 ] - 128 ) / 128.0;
		rotations[ i * 4 + 1 ] = ( u_buffer[ 32 * i + 28 + 1 ] - 128 ) / 128.0;
		rotations[ i * 4 + 2 ] = ( u_buffer[ 32 * i + 28 + 2 ] - 128 ) / 128.0;
		rotations[ i * 4 + 3 ] = ( u_buffer[ 32 * i + 28 + 3 ] - 128 ) / 128.0;

	}

	return {
		positions,
		colors,
		scales,
		rotations,
		alphas,
		sphericalHarmonics: null // .splatファイルにはSHデータが含まれていない
	};

}

/**
 * Splat形式用の仮のSPZHeaderを作成する
 * @param vertexCount ガウシアンの数
 * @returns 仮のSPZHeader
 */
export function createSplatDummyHeader( vertexCount: number ) {

	return {
		magic: 0x5053474E, // SPZ magic number
		version: 2,
		numPoints: vertexCount,
		shDegree: 0, // .splatファイルにはSHデータが含まれていない
		fractionalBits: 8, // 適当なデフォルト値
		flags: 0,
		reserved: 0
	};

}
