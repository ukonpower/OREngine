import * as GLP from 'glpower';

import { isSplatFormat, parseSplat, createSplatDummyHeader } from './parsers/SplatDataParser';
import { parseSPZ } from './parsers/SPZDataParser';
import { SPZGaussianData } from './utils/CoordinateSystemConverter';
import { createGaussianEntity, SPZResult, SPZLoaderOptions } from './utils/SPZMeshBuilder';

// 3DGSの座標系タイプ
export enum CoordinateSystem {
	UNSPECIFIED = 0,
	RUB = 1, // Right, Up, Backward (OpenGL/three.js)
	RDF = 2, // Right, Down, Forward (PLY)
	LUF = 3, // Left, Up, Forward (GLB)
	RUF = 4 // Right, Up, Forward (Unity)
}
/**
 * 3D Gaussian Splattingファイル（.splat, .spz）をロードして3Dシーンに変換するローダークラス
 */
export class GaussianSplattingLoader extends GLP.EventEmitter {

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
	 * ファイル形式を判定する
	 * @param data ファイルデータ
	 * @returns ファイル形式（'splat' | 'spz' | 'unknown'）
	 */
	public static detectFormat( data: ArrayBuffer ): 'splat' | 'spz' | 'unknown' {

		// Splat形式の判定
		if ( isSplatFormat( data ) ) {

			return 'splat';

		}

		// SPZ形式の判定（マジックナンバーをチェック）
		try {

			const dataView = new DataView( data );
			const magic = dataView.getUint32( 0, true );

			if ( magic === 559903 ) { // 'NGSB' in little endian

				return 'spz';

			}

		} catch ( error ) {

			// データが短すぎる場合など

		}

		return 'unknown';

	}

	/**
	 * 3D Gaussian Splattingファイルをロードする
	 * @param path ファイルのパス
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

		// 2. ファイル形式の判定
		const format = GaussianSplattingLoader.detectFormat( arrayBuffer );

		let gaussianData: SPZGaussianData;
		let header: any = null;

		// 3. 形式に応じた処理
		switch ( format ) {

		case 'splat': {

			console.log( '3DGSLoader: Splat形式として読み込みます' );
			gaussianData = parseSplat( arrayBuffer );
			header = createSplatDummyHeader( gaussianData.positions.length / 3 );
			break;

		}

		case 'spz': {

			console.log( '3DGSLoader: SPZ形式として読み込みます' );
			const result = await parseSPZ( arrayBuffer, opts.isCompressed );
			gaussianData = result.gaussianData;
			header = result.header;
			break;

		}

		default:
			throw new Error( '3DGSLoader: サポートされていないファイル形式です。SplatまたはSPZ形式のファイルを指定してください。' );

		}

		console.log( gaussianData );


		// 4. メッシュの生成
		const finalResult = createGaussianEntity( this.gl, gaussianData, header, opts );

		return finalResult;

	}

}
