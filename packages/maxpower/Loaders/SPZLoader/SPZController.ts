import * as GLP from 'glpower';

import { Component, ComponentParams, ComponentUpdateEvent } from '../../Component';
import { Camera } from '../../Component/Camera';
import { Material } from '../../Material';

// SPZコントローラーのパラメータ型
export type SPZControllerParams = {
	gaussianPositions: Float32Array;
	numPoints: number;
	material: Material;
	gl: WebGL2RenderingContext;
	sortEnabled?: boolean;
};

/**
 * SPZガウシアンデータを制御するコンポーネント
 */
export class SPZController extends Component {

	private gaussianPositions: Float32Array;
	private numPoints: number;
	private material: Material;
	private gl: WebGL2RenderingContext;

	constructor( params: ComponentParams<SPZControllerParams> ) {

		super( params );

		const args = params.args;

		this.gaussianPositions = args.gaussianPositions;
		this.numPoints = args.numPoints;
		this.material = args.material;
		this.gl = args.gl;

		// コンポーネントのタグをつける
		this._tag = "spz-controller";

		this.updateSort();

		window.addEventListener( "keydown", ( e )=>{

			if ( e.key === "s" ) {

				this.updateSort();

			}

		} );

	}

	/**
	 * カメラに基づいてガウシアンの深度ソートを実行
	 * @param camera カメラコンポーネント
	 */
	public updateSort() {

		// シーンからカメラを検索
		const findCameraInEntity = ( ): Camera | null => {

			const rootEntity = this.entity.getRootEntity();

			const cameraEntity = rootEntity.findEntityByName( "Camera" );

			if ( cameraEntity ) {

				const camera = cameraEntity.getComponentByTag<Camera>( "camera" );

				if ( camera ) return camera;

			}

			return null;

		};

		const camera = findCameraInEntity();

		if ( ! camera ) return;

		// カメラのプロジェクションパラメータを取得して焦点距離を設定
		const cameraParams = camera.projectionMatrix;
		const viewportWidth = 1920 / 4;
		const viewportHeight = 1080 / 4;
		const focalX = cameraParams.elm[ 0 ] * viewportWidth / 2.0;
		const focalY = cameraParams.elm[ 5 ] * viewportHeight / 2.0;

		// 焦点距離とビューポートサイズをユニフォームに設定
		this.material.uniforms.uFocal.value.set( focalX, focalY );

		// カメラのビュー行列を取得
		const viewMatrix = camera.viewMatrix;

		// ソート用の深度配列
		const depths: { index: number, depth: number }[] = [];

		// 各ガウシアンの深度を計算
		for ( let i = 0; i < this.numPoints; i ++ ) {

			// ガウシアンの位置
			const x = this.gaussianPositions[ i * 3 ];
			const y = this.gaussianPositions[ i * 3 + 1 ];
			const z = this.gaussianPositions[ i * 3 + 2 ];

			const outPos = new GLP.Vector( x, y, z ).applyMatrix4AsPosition( viewMatrix );

			depths.push( { index: i, depth: outPos.z } );

		}

		// 深度でソート（奥から手前へ）
		depths.sort( ( a, b ) => a.depth - b.depth );

		// ソート後のインデックス配列
		const sortedIndices = new Float32Array( this.numPoints );

		for ( let i = 0; i < this.numPoints; i ++ ) {

			sortedIndices[ i ] = depths[ i ].index;

		}

		// テクスチャの幅と高さを計算（2のべき乗）
		const texWidth = Math.pow( 2, Math.ceil( Math.log2( Math.sqrt( this.numPoints ) ) ) );
		const texHeight = Math.pow( 2, Math.ceil( Math.log2( this.numPoints / texWidth ) ) );

		// テクスチャデータ
		const textureData = new Float32Array( texWidth * texHeight * 4 );
		textureData.fill( 0 );

		// インデックスをテクスチャに格納
		for ( let i = 0; i < this.numPoints; i ++ ) {

			textureData[ i * 4 ] = sortedIndices[ i ];

		}

		const texture = this.material.uniforms.uSortTex.value as GLP.GLPowerTexture;

		// イメージデータを作成
		const imageData = {
			width: texWidth,
			height: texHeight,
			data: textureData
		};

		// テクスチャにデータをアタッチ
		texture.attach( imageData );

	}

	/**
	 * コンポーネントの更新処理
	 */
	public update( event: ComponentUpdateEvent ) {

		super.update( event );

		// this.updateSort();

		this.material.uniforms.uViewport.value.copy( event.resolution );

	}

}
