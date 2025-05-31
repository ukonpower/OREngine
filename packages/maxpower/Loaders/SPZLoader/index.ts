import * as GLP from 'glpower';

import { SPZGaussianData } from './utils/CoordinateSystemConverter';
import { gunzipData } from './utils/SPZDataCompression';
import { parseHeader, parseGaussianData } from './utils/SPZDataParser';
import { createGaussianEntity, SPZResult, SPZLoaderOptions } from './utils/SPZMeshBuilder';

// SPZの座標系タイプ
export enum CoordinateSystem {
	UNSPECIFIED = 0,
	RUB = 1, // Right, Up, Backward (OpenGL/three.js)
	RDF = 2, // Right, Down, Forward (PLY)
	LUF = 3, // Left, Up, Forward (GLB)
	RUF = 4 // Right, Up, Forward (Unity)
}

/**
 * .splatファイルかどうかを判定する
 * @param data ファイルデータ
 * @returns .splatファイルかどうか
 */
function isSplatFormat( data: ArrayBuffer ): boolean {

	// .splatファイルのサイズが32バイトの倍数であることをチェック
	const SPLAT_ROW_LENGTH = 32; // 3*4 + 3*4 + 4 + 4 = 32 bytes
	return data.byteLength % SPLAT_ROW_LENGTH === 0;

}

/**
 * .splatファイルからガウシアンデータを解析する
 * main.jsのロジックを参考に実装
 * @param buffer ファイルバッファ
 * @returns ガウシアンデータ
 */
function parseSplatData( buffer: ArrayBuffer ): SPZGaussianData {

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

	// main.jsのロジックに基づいてデータを解析
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
		// main.jsでは-128/128でノーマライズされている
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
 * .splatフォーマット用の仮のSPZHeaderを作成する
 * @param vertexCount ガウシアンの数
 * @returns 仮のSPZHeader
 */
function createDummyHeader( vertexCount: number ) {

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

/**
 * SPZファイルをロードして3Dシーンに変換するローダークラス
 */
export class SPZLoader extends GLP.EventEmitter {

	private gl: WebGL2RenderingContext;

	/**
	 * コンストラクタ
	 * @param gl WebGL2コンテキスト
	 */
	constructor( gl: WebGL2RenderingContext ) {

		super();

		this.gl = gl;

	}

	/**
	 * SPZファイルをロードする
	 * @param path SPZファイルのパス
	 * @param options ローダーオプション
	 * @returns SPZ結果オブジェクト
	 */
	public async load( path: string, options: SPZLoaderOptions = {} ): Promise<SPZResult> {

		// デフォルトオプションの設定
		const opts = {
			sourceCoordinateSystem: CoordinateSystem.UNSPECIFIED,
			targetCoordinateSystem: CoordinateSystem.RUB, // OpenGL標準
			antialias: true,
			isCompressed: undefined, // 自動判定
			...options
		};

		// 1. データの取得
		const response = await fetch( path );
		const arrayBuffer = await response.arrayBuffer();

		// 2. ファイルフォーマットの判定と処理
		let gaussianData: SPZGaussianData;
		let header: any = null;

		// .splatフォーマットかどうかを判定
		if ( isSplatFormat( arrayBuffer ) ) {

			console.log( 'SPZLoader: .splatフォーマットとして読み込みます' );
			gaussianData = parseSplatData( arrayBuffer );

			// .splatフォーマット用の仮のheaderを作成
			header = createDummyHeader( gaussianData.positions.length / 3 );

		} else {

			console.log( 'SPZLoader: SPZフォーマットとして読み込みます' );

			// 3. データの解凍（必要な場合）
			let decompressedData = arrayBuffer;

			// isCompressedが指定されていない場合は自動判定を試行
			if ( opts.isCompressed === undefined ) {

				try {

					decompressedData = await gunzipData( arrayBuffer );
					console.log( 'SPZLoader: データを解凍しました' );

				} catch ( error ) {

					console.log( 'SPZLoader: 非圧縮データとして処理します' );
					decompressedData = arrayBuffer;

				}

			} else if ( opts.isCompressed ) {

				try {

					decompressedData = await gunzipData( arrayBuffer );

				} catch ( error ) {

					console.warn( `SPZLoader: 解凍に失敗しました: ${error}。非圧縮データとして処理を続行します。` );

				}

			}

			// 4. SPZヘッダーの解析
			header = parseHeader( decompressedData );

			// 5. SPZデータの解析
			gaussianData = parseGaussianData( decompressedData, header );

		}

		console.log( header );

		console.log( gaussianData );

		// 6. メッシュの生成
		const result = createGaussianEntity( this.gl, gaussianData, header, opts );

		return result;

	}

}

export { SPZController } from './SPZController';
export type { SPZGaussianData } from './utils/CoordinateSystemConverter';

