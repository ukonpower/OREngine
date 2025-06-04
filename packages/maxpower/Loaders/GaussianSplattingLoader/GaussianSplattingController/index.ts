import * as GLP from 'glpower';

import { Component, ComponentParams, ComponentUpdateEvent } from '../../../Component';
import { Camera } from '../../../Component/Camera';
import { Material } from '../../../Material';

import { SortWorkerMessage, SortWorkerResponse } from './sortWorker';

// SPZコントローラーのパラメータ型
export type SPZControllerParams = {
	gaussianPositions: Float32Array;
	numPoints: number;
	material: Material;
	sortEnabled?: boolean;
};

/**
 * SPZガウシアンデータを制御するコンポーネント
 */
export class GaussianSplattingController extends Component {

	private gaussianPositions: Float32Array;
	private numPoints: number;
	private material: Material;
	private sortWorker: Worker | null = null;
	private isSorting: boolean = false;
	private oldDirection: GLP.Vector = new GLP.Vector( 0, 0, 0 );
	private frameIdLastUpdate: number = - 1;

	constructor( params: ComponentParams<SPZControllerParams> ) {

		super( params );

		const args = params.args;

		this.gaussianPositions = args.gaussianPositions;
		this.numPoints = args.numPoints;
		this.material = args.material;

		// コンポーネントのタグをつける
		this._tag = "3dgs-controller";

		// WebWorkerを初期化
		this.initWorker();

	}

	/**
	 * WebWorkerを初期化
	 */
	private initWorker(): void {

		try {

			// WebWorkerを作成（相対パスを使用）
			this.sortWorker = new Worker( new URL( './sortWorker.ts', import.meta.url ), {
				type: 'module'
			} );

			// Workerからのメッセージを処理
			this.sortWorker.onmessage = ( e: MessageEvent<SortWorkerResponse> ) => {

				this.handleWorkerMessage( e.data );

			};

			this.sortWorker.onerror = ( error ) => {

				console.error( 'Sort Worker Error:', error );
				this.isSorting = false;

			};

		} catch ( error ) {

			console.warn( 'WebWorker not supported, falling back to main thread sorting:', error );
			this.sortWorker = null;

		}

	}

	/**
	 * Workerからのメッセージを処理
	 */
	private handleWorkerMessage( data: SortWorkerResponse ): void {

		if ( data.type === 'sorted' ) {

			this.applySortedIndices( data.sortedIndices );
			this.isSorting = false;

		}

	}

	/**
	 * ソートされたインデックスをテクスチャに適用
	 */
	private applySortedIndices( sortedIndices: Uint32Array ): void {

		// テクスチャサイズを計算
		const { width: texWidth, height: texHeight } = this.calculateTextureSize();

		// テクスチャデータを作成
		const textureData = new Float32Array( texWidth * texHeight * 4 );
		textureData.fill( 0 );

		// インデックスをテクスチャに格納
		for ( let i = 0; i < this.numPoints; i ++ ) {

			textureData[ i * 4 ] = sortedIndices[ i ];

		}

		// テクスチャを更新
		const texture = this.material.uniforms.uSortTex.value as GLP.GLPowerTexture;
		const imageData = {
			width: texWidth,
			height: texHeight,
			data: textureData
		};

		texture.attach( imageData );

	}

	/**
	 * シーンからカメラコンポーネントを検索
	 * @returns カメラコンポーネント、見つからない場合はnull
	 */
	private findCamera(): Camera | null {

		const rootEntity = this.entity.getRootEntity();
		const cameraEntity = rootEntity.findEntityByName( "Camera" );

		if ( cameraEntity ) {

			const camera = cameraEntity.getComponentByTag<Camera>( "camera" );
			if ( camera ) return camera;

		}

		return null;

	}

	/**
	 * テクスチャサイズを計算（2のべき乗）
	 * @returns テクスチャの幅と高さ
	 */
	private calculateTextureSize(): { width: number, height: number } {

		const width = Math.pow( 2, Math.ceil( Math.log2( Math.sqrt( this.numPoints ) ) ) );
		const height = Math.pow( 2, Math.ceil( Math.log2( this.numPoints / width ) ) );

		return { width, height };

	}

	/**
	 * カメラに基づいてガウシアンの深度ソートを実行（Babylon.js互換版）
	 */
	public updateSort(): void {

		const camera = this.findCamera();
		if ( ! camera ) return;

		const frameId = Date.now();

		// カメラの向きベクトルを計算
		const cameraViewMatrix = camera.viewMatrix;
		const cameraDirection = new GLP.Vector(
			cameraViewMatrix.elm[ 2 ],
			cameraViewMatrix.elm[ 6 ],
			cameraViewMatrix.elm[ 10 ]
		).normalize();

		// カメラの向きが大きく変わった場合のみソート実行
		const dot = cameraDirection.dot( this.oldDirection );
		const shouldSort = frameId !== this.frameIdLastUpdate && Math.abs( dot - 1 ) >= 0.01;

		if ( ! shouldSort && ! this.isSorting ) return;

		// 既にソート中の場合はスキップ
		if ( this.isSorting ) return;

		this.isSorting = true;
		this.frameIdLastUpdate = frameId;
		this.oldDirection.copy( cameraDirection );

		if ( ! this.sortWorker ) return;

		// ビュー行列を平坦化した配列に変換
		const viewMatrixArray = Array.from( camera.viewMatrix.elm );

		const message: SortWorkerMessage = {
			type: 'sort',
			gaussianPositions: this.gaussianPositions,
			numPoints: this.numPoints,
			viewMatrix: viewMatrixArray,
		};

		this.sortWorker.postMessage( message );

	}

	/**
	 * コンポーネントの更新処理
	 */
	public update( event: ComponentUpdateEvent ): void {

		super.update( event );

		const camera = this.findCamera();

		if ( ! camera ) return;

		// カメラのプロジェクションパラメータを取得して焦点距離を設定
		const cameraParams = camera.projectionMatrix;
		const viewportWidth = event.resolution.x;
		const viewportHeight = event.resolution.y;
		const focalX = cameraParams.elm[ 0 ] * viewportWidth / 2.0;
		const focalY = cameraParams.elm[ 5 ] * viewportHeight / 2.0;

		// 焦点距離をユニフォームに設定
		this.material.uniforms.uFocal.value.set( focalX, focalY );
		this.material.uniforms.uViewport.value.copy( event.resolution );

		this.updateSort();

	}

	/**
	 * リソースのクリーンアップ
	 */
	public dispose(): void {

		if ( this.sortWorker ) {

			this.sortWorker.terminate();
			this.sortWorker = null;

		}

		super.dispose();

	}

}
