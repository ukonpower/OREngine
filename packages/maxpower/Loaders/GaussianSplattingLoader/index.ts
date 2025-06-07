import * as GLP from 'glpower';

import { isSplatFormat } from './parsers/SplatDataParser';
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
	private spzWorker: Worker | null = null;
	private splatWorker: Worker | null = null;

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

		// 3. 形式に応じた処理（専用WebWorkerで実行）
		let gaussianData: SPZGaussianData;
		let header: any = null;

		if ( format === 'splat' ) {

			console.log( '3DGSLoader: Splat形式として読み込みます' );
			const result = await this.parseSplatWithWorker( arrayBuffer );
			gaussianData = result.gaussianData;
			header = result.header;

		} else if ( format === 'spz' ) {

			console.log( '3DGSLoader: SPZ形式として読み込みます' );
			const result = await this.parseSPZWithWorker( arrayBuffer, opts.isCompressed );
			gaussianData = result.gaussianData;
			header = result.header;

		} else {

			throw new Error( '3DGSLoader: サポートされていないファイル形式です。SplatまたはSPZ形式のファイルを指定してください。' );

		}

		// 4. メッシュの生成
		const finalResult = createGaussianEntity( this.gl, gaussianData, header, opts );

		return finalResult;

	}

	/**
	 * SplatファイルをWebWorkerで解析する
	 * @param buffer ファイルバッファ
	 * @returns 解析結果
	 */
	private async parseSplatWithWorker( buffer: ArrayBuffer ): Promise<{ gaussianData: SPZGaussianData; header: any }> {

		return new Promise( ( resolve, reject ) => {

			if ( ! this.splatWorker ) {


				const workerModule = new URL( './workers/SplatParserWorker.ts', import.meta.url );
				this.splatWorker = new Worker( workerModule, { type: 'module' } );

			}

			this.splatWorker.onmessage = ( event: MessageEvent ) => {

				const { type, data } = event.data;

				if ( type === 'result' ) {

					resolve( data );

				} else if ( type === 'error' ) {

					reject( new Error( data.error ) );

				}

			};

			this.splatWorker.onerror = ( error ) => {

				reject( new Error( `SplatWorker error: ${error.message}` ) );

			};

			const message = {
				type: 'parse',
				data: { buffer }
			};

			this.splatWorker.postMessage( message, [ buffer ] );

		} );

	}

	/**
	 * SPZファイルをWebWorkerで解析する
	 * @param buffer ファイルバッファ
	 * @param isCompressed 圧縮されているかどうか
	 * @returns 解析結果
	 */
	private async parseSPZWithWorker( buffer: ArrayBuffer, isCompressed?: boolean ): Promise<{ gaussianData: SPZGaussianData; header: any }> {

		return new Promise( ( resolve, reject ) => {

			if ( ! this.spzWorker ) {

				const workerModule = new URL( './workers/SPZParserWorker.ts', import.meta.url );
				this.spzWorker = new Worker( workerModule, { type: 'module' } );

			}

			this.spzWorker.onmessage = ( event: MessageEvent ) => {

				const { type, data } = event.data;

				if ( type === 'result' ) {

					resolve( data );

				} else if ( type === 'error' ) {

					reject( new Error( data.error ) );

				}

			};

			this.spzWorker.onerror = ( error ) => {

				reject( new Error( `SPZWorker error: ${error.message}` ) );

			};

			const message = {
				type: 'parse',
				data: { buffer, isCompressed }
			};

			this.spzWorker.postMessage( message, [ buffer ] );

		} );

	}

	/**
	 * リソースをクリーンアップしてWebWorkerを終了する
	 */
	public terminate(): void {

		if ( this.splatWorker ) {

			this.splatWorker.terminate();
			this.splatWorker = null;

		}

		if ( this.spzWorker ) {

			this.spzWorker.terminate();
			this.spzWorker = null;

		}

	}

}
