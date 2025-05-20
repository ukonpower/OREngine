import * as GLP from 'glpower';

import { Component, ComponentParams, ComponentUpdateEvent } from '../../Component';
import { Camera } from '../../Component/Camera';
import { Entity } from '../../Entity';
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
	private sortEnabled: boolean;
	private gl: WebGL2RenderingContext;

	constructor( params: ComponentParams<SPZControllerParams> ) {

		super( params );

		const args = params.args;

		this.gaussianPositions = args.gaussianPositions;
		this.numPoints = args.numPoints;
		this.material = args.material;
		this.gl = args.gl;
		this.sortEnabled = args.sortEnabled !== false;

		// コンポーネントのタグをつける
		this._tag = "spz-controller";

	}

	/**
	 * カメラに基づいてガウシアンの深度ソートを実行
	 * @param camera カメラコンポーネント
	 */
	public updateSort( camera: Camera ) {

		if ( ! this.sortEnabled ) return;

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

			// カメラ空間での位置を計算
			// 行列は列優先で格納されているため、適切なインデックスでアクセス
			// viewMatrix.elm[2], viewMatrix.elm[6], viewMatrix.elm[10] はビュー行列のz方向成分
			const elements = viewMatrix.elm;
			// Z方向の深度を計算（視点からの距離）
			const depth = elements[ 2 ] * x + elements[ 6 ] * y + elements[ 10 ] * z + elements[ 14 ];

			depths.push( { index: i, depth } );

		}

		// 深度でソート（奥から手前へ）
		depths.sort( ( a, b ) => b.depth - a.depth );

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

		// テクスチャの作成（既存のものがあれば再利用）
		let texture = this.material.uniforms.uSortIndices?.value as GLP.GLPowerTexture;

		if ( ! texture ) {

			// 新しくテクスチャを作成
			texture = new GLP.GLPowerTexture( this.gl );

			// 設定を適用
			texture.setting( {
				type: this.gl.FLOAT,
				internalFormat: this.gl.RGBA32F,
				format: this.gl.RGBA,
				magFilter: this.gl.NEAREST,
				minFilter: this.gl.NEAREST,
			} );

		}

		// イメージデータを作成
		const imageData = {
			width: texWidth,
			height: texHeight,
			data: textureData
		};

		// テクスチャにデータをアタッチ
		texture.attach( imageData );

		// マテリアルのユニフォームに設定
		this.material.uniforms.uSortIndices = { value: texture, type: '1i' };
		this.material.uniforms.uSortIndicesSize = { value: [ texWidth, texHeight ], type: '2fv' };
		this.material.uniforms.uSortEnabled = { value: 1.0, type: '1f' };

	}

	/**
	 * コンポーネントの更新処理
	 */
	public update( event: ComponentUpdateEvent ) {

		super.update( event );

		// シーンからカメラを検索
		const findCameraInEntity = ( ): Camera | null => {

			const rootEntity = this.entity.getRootEntity();

			// このエンティティのカメラコンポーネントを確認
			const cameraEntity = rootEntity.findEntityByName( "Camera" );

			if ( cameraEntity ) {

				const camera = cameraEntity.getComponentByTag<Camera>( "camera" );

				if ( camera ) return camera;

			}

			return null;

		};

		const camera = findCameraInEntity( );

		if ( camera ) {

			this.updateSort( camera );

		}

	}

}
