import * as GLP from 'glpower';

import { SPZController } from './SPZController';
import { convertCoordinateSystem } from './utils/CoordinateSystemConverter';
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
			isCompressed: true, // デフォルトでは圧縮されていると仮定
			...options
		};

		// 1. データの取得
		const response = await fetch( path );
		const arrayBuffer = await response.arrayBuffer();

		// 2. データの解凍（必要な場合）
		let decompressedData = arrayBuffer;
		if ( opts.isCompressed ) {

			try {

				decompressedData = await gunzipData( arrayBuffer );

			} catch ( error ) {

				console.warn( `SPZLoader: 解凍に失敗しました: ${error}。非圧縮データとして処理を続行します。` );

			}

		}

		// 3. SPZヘッダーの解析
		const header = parseHeader( decompressedData );

		// 4. SPZデータの解析
		const gaussianData = parseGaussianData( decompressedData, header );

		// 5. 座標系の変換（必要な場合）
		if ( opts.sourceCoordinateSystem !== CoordinateSystem.UNSPECIFIED &&
			opts.targetCoordinateSystem !== CoordinateSystem.UNSPECIFIED &&
			opts.sourceCoordinateSystem !== opts.targetCoordinateSystem ) {

			convertCoordinateSystem( gaussianData, opts.sourceCoordinateSystem, opts.targetCoordinateSystem );

		}

		// 6. メッシュの生成
		const result = createGaussianEntity( this.gl, gaussianData, header, opts );

		return result;

	}

}

export { SPZController } from './SPZController';
export type { SPZGaussianData } from './utils/CoordinateSystemConverter';

