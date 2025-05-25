import * as GLP from 'glpower';

import { Camera } from '../../../Component/Camera';
import { Mesh } from '../../../Component/Mesh';
import { Entity } from '../../../Entity';
import { PlaneGeometry } from '../../../Geometry/PlaneGeometry';
import { Material } from '../../../Material';
import { hotUpdate } from '../../../Utils/Hot';
import spzFrag from '../shaders/spz.fs';
import spzVert from '../shaders/spz.vs';
import { SPZController } from '../SPZController';

import { SPZGaussianData } from './CoordinateSystemConverter';
import { SPZHeader, getSHSize } from './SPZDataParser';


export type SPZResult = {
	scene: Entity;
	updateSort: ( camera: Camera ) => void;
}

export type SPZLoaderOptions = {
	sourceCoordinateSystem?: number; // 入力データの座標系
	targetCoordinateSystem?: number; // 出力データの座標系
	antialias?: boolean;
	isCompressed?: boolean; // データがgzipで圧縮されているかどうか
}

/**
 * ガウシアンデータからメッシュを生成する
 * @param gl WebGL2コンテキスト
 * @param gaussianData ガウシアンデータ
 * @param header SPZヘッダー情報
 * @param options ローダーオプション
 * @returns SPZ結果オブジェクト
 */
export function createGaussianEntity( gl: WebGL2RenderingContext, gaussianData: SPZGaussianData, header: SPZHeader, options: SPZLoaderOptions ): SPZResult {

	const entity = new Entity();

	const geometry = new PlaneGeometry( {
		width: 1,
		height: 1
	} );

	// インスタンス数の設定
	const numPoints = gaussianData.positions.length / 3;

	// インスタンスIDのみをアトリビュートとして設定
	const instanceIds = new Float32Array( numPoints );

	for ( let i = 0; i < numPoints; i ++ ) {

		instanceIds[ i ] = i;

	}

	geometry.setAttribute( "instanceId", instanceIds, 1, { instanceDivisor: 1 } );

	/*-------------------------------
		DataTexture
	-------------------------------*/

	// テクスチャサイズの計算（2のべき乗にする）
	const texWidth = Math.pow( 2, Math.ceil( Math.log2( Math.sqrt( numPoints ) ) ) );
	const texHeight = Math.pow( 2, Math.ceil( Math.log2( numPoints / texWidth ) ) );

	// 位置テクスチャ
	const positionData = new Float32Array( texWidth * texHeight * 4 );
	positionData.fill( 0 );

	// スケールテクスチャ
	const scaleData = new Float32Array( texWidth * texHeight * 4 );
	scaleData.fill( 0 );

	// 回転テクスチャ
	const rotationData = new Float32Array( texWidth * texHeight * 4 );
	rotationData.fill( 0 );

	// 色テクスチャ
	const colorData = new Float32Array( texWidth * texHeight * 4 );
	colorData.fill( 0 );

	// ソートテクスチャ
	const sortData = new Float32Array( texWidth * texHeight * 4 );
	colorData.fill( 0 );

	// データを各テクスチャに分離して格納
	for ( let i = 0; i < numPoints; i ++ ) {

		const idx = i * 4;

		// 位置データ (xyz + パディング)
		positionData[ idx + 0 ] = gaussianData.positions[ i * 3 + 0 ];
		positionData[ idx + 1 ] = gaussianData.positions[ i * 3 + 1 ];
		positionData[ idx + 2 ] = gaussianData.positions[ i * 3 + 2 ];
		positionData[ idx + 3 ] = 0.0; // パディング

		// スケールデータ (xyz + パディング)
		scaleData[ idx + 0 ] = gaussianData.scales[ i * 3 + 0 ];
		scaleData[ idx + 1 ] = gaussianData.scales[ i * 3 + 1 ];
		scaleData[ idx + 2 ] = gaussianData.scales[ i * 3 + 2 ];
		scaleData[ idx + 3 ] = 0.0; // パディング

		// 回転データ (xyzw)
		rotationData[ idx + 0 ] = gaussianData.rotations[ i * 4 + 0 ];
		rotationData[ idx + 1 ] = gaussianData.rotations[ i * 4 + 1 ];
		rotationData[ idx + 2 ] = gaussianData.rotations[ i * 4 + 2 ];
		rotationData[ idx + 3 ] = gaussianData.rotations[ i * 4 + 3 ];

		// 色データ (rgba)
		colorData[ idx + 0 ] = gaussianData.colors[ i * 3 + 0 ];
		colorData[ idx + 1 ] = gaussianData.colors[ i * 3 + 1 ];
		colorData[ idx + 2 ] = gaussianData.colors[ i * 3 + 2 ];
		colorData[ idx + 3 ] = gaussianData.alphas[ i ]; // アルファ値

	}

	// 位置テクスチャの作成
	const positionTexture = new GLP.GLPowerTexture( gl );
	positionTexture.setting( {
		type: gl.FLOAT,
		internalFormat: gl.RGBA32F,
		format: gl.RGBA,
		magFilter: gl.NEAREST,
		minFilter: gl.NEAREST,
	} );
	positionTexture.attach( {
		width: texWidth,
		height: texHeight,
		data: positionData
	} );

	// スケールテクスチャの作成
	const scaleTexture = new GLP.GLPowerTexture( gl );
	scaleTexture.setting( {
		type: gl.FLOAT,
		internalFormat: gl.RGBA32F,
		format: gl.RGBA,
		magFilter: gl.NEAREST,
		minFilter: gl.NEAREST,
	} );
	scaleTexture.attach( {
		width: texWidth,
		height: texHeight,
		data: scaleData
	} );

	// 回転テクスチャの作成
	const rotationTexture = new GLP.GLPowerTexture( gl );
	rotationTexture.setting( {
		type: gl.FLOAT,
		internalFormat: gl.RGBA32F,
		format: gl.RGBA,
		magFilter: gl.NEAREST,
		minFilter: gl.NEAREST,
	} );
	rotationTexture.attach( {
		width: texWidth,
		height: texHeight,
		data: rotationData
	} );

	// 色テクスチャの作成
	const colorTexture = new GLP.GLPowerTexture( gl );
	colorTexture.setting( {
		type: gl.FLOAT,
		internalFormat: gl.RGBA32F,
		format: gl.RGBA,
		magFilter: gl.NEAREST,
		minFilter: gl.NEAREST,
	} );
	colorTexture.attach( {
		width: texWidth,
		height: texHeight,
		data: colorData
	} );

	// ソート用テクスチャの作成
	const sortTexture = new GLP.GLPowerTexture( gl );
	sortTexture.setting( {
		type: gl.FLOAT,
		internalFormat: gl.RGBA32F,
		format: gl.RGBA,
		magFilter: gl.NEAREST,
		minFilter: gl.NEAREST,
	} );
	sortTexture.attach( {
		width: texWidth,
		height: texHeight,
		data: sortData
	} );

	// ユニフォーム変数の設定
	const uniforms: GLP.Uniforms = {
		uPositionTexture: { value: positionTexture, type: '1i' },
		uScaleTexture: { value: scaleTexture, type: '1i' },
		uRotationTexture: { value: rotationTexture, type: '1i' },
		uColorTexture: { value: colorTexture, type: '1i' },
		uSortTex: { value: sortTexture, type: '1i' },
		uDataTexSize: { value: [ texWidth, texHeight ], type: '2fv' },
		uInstanceCount: { value: numPoints, type: '1i' },
		uFocal: { value: new GLP.Vector( 1164.6601287484507, 1159.5880733038064 ), type: '2fv' },
		uViewport: { value: new GLP.Vector(), type: "2fv" }
	};

	// 球面調和関数のテクスチャ処理
	// if ( gaussianData.sphericalHarmonics ) {

	// 	const shDegree = header.shDegree;
	// 	const size = getSHSize( shDegree );

	// 	// すべての次数でテクスチャとして設定
	// 	const numPoints = gaussianData.positions.length / 3;

	// 	// 係数の最大数（4次まで対応可能な16に設定）
	// 	const maxCoeffs = 16;

	// 	// テクスチャサイズの計算（2のべき乗にする）
	// 	const texWidth = Math.pow( 2, Math.ceil( Math.log2( Math.ceil( Math.sqrt( numPoints * maxCoeffs ) ) ) ) );
	// 	const texHeight = Math.pow( 2, Math.ceil( Math.log2( Math.ceil( ( numPoints * maxCoeffs ) / texWidth ) ) ) );

	// 	// テクスチャデータの作成（RGBA形式、各ピクセルに1つの係数のRGB値を保存）
	// 	const textureData = new Float32Array( texWidth * texHeight * 4 );
	// 	textureData.fill( 0 ); // デフォルト値を0に設定

	// 	// 実際の係数の数（次数によって異なる）
	// 	const numCoeffs = Math.pow( shDegree + 1, 2 ) - 1;

	// 	// SH係数をテクスチャに詰め込む
	// 	for ( let p = 0; p < numPoints; p ++ ) {

	// 		for ( let i = 0; i < numCoeffs; i ++ ) {

	// 			// テクスチャ内の位置を計算
	// 			const pixelIndex = p * maxCoeffs + i;
	// 			const tx = pixelIndex % texWidth;
	// 			const ty = Math.floor( pixelIndex / texWidth );
	// 			const tIdx = ( ty * texWidth + tx ) * 4; // RGBA形式なので4倍

	// 			// RGB成分をテクスチャに設定
	// 			for ( let c = 0; c < 3; c ++ ) { // RGB

	// 				const shIdx = p * size + i * 3 + c;
	// 				textureData[ tIdx + c ] = gaussianData.sphericalHarmonics[ shIdx ];

	// 			}

	// 			// アルファチャンネルは使用しないが、1.0に設定
	// 			textureData[ tIdx + 3 ] = 1.0;

	// 		}

	// 	}

	// 	// テクスチャの作成
	// 	const texture = new GLP.GLPowerTexture( gl );

	// 	// 設定を適用
	// 	texture.setting( {
	// 		type: gl.FLOAT,
	// 		internalFormat: gl.RGBA32F,
	// 		format: gl.RGBA,
	// 		magFilter: gl.NEAREST,
	// 		minFilter: gl.NEAREST,
	// 	} );

	// 	// イメージデータを作成
	// 	const imageData = {
	// 		width: texWidth,
	// 		height: texHeight,
	// 		data: textureData
	// 	};

	// 	// テクスチャにデータをアタッチ
	// 	texture.attach( imageData );

	// 	// マテリアルにテクスチャとサイズ情報を設定
	// 	uniforms.uSHTexture = { value: texture, type: '1i' };
	// 	uniforms.uSHTexSize = { value: [ texWidth, texHeight ], type: '2fv' };
	// 	uniforms.uSHCoeffCount = { value: numCoeffs, type: '1f' };
	// 	uniforms.uMaxCoeffCount = { value: maxCoeffs, type: '1f' };

	// }

	// ガウシアンスプラット用のマテリアルを作成
	const material = new Material( {
		phase: [ "ui" ],
		frag: spzFrag,
		vert: spzVert,
		uniforms,
		defines: {
			"USE_GAUSSIAN_SPLAT": "",
			"SH_DEGREE": header.shDegree.toString()
		},
		// depthTest: false,
	} );

	// 球面調和関数の次数に応じてdefinesを追加
	if ( header.shDegree > 0 ) {

		material.defines[ "USE_SPHERICAL_HARMONICS" ] = "";
		material.defines[ "USE_SH_TEXTURE" ] = "";

	}

	if ( import.meta.hot ) {

		import.meta.hot.accept( '../shaders/spz.fs', ( module ) => {

			if ( module ) {

				material.frag = hotUpdate( 'spzFrag', module.default );
				material.requestUpdate();

			}

		} );

		import.meta.hot.accept( '../shaders/spz.vs', ( module ) => {

			if ( module ) {

				material.vert = hotUpdate( 'spzVert', module.default );
				material.requestUpdate();

			}

		} );

	}

	// Meshコンポーネントを追加
	const mesh = entity.addComponent( Mesh );
	mesh.geometry = geometry;
	mesh.material = material;

	// SPZコントローラーコンポーネントを追加
	const controller = entity.addComponent( SPZController, {
		gaussianPositions: gaussianData.positions,
		numPoints: numPoints,
		material: material,
		gl: gl,
	} );

	// 深度ソート用の関数
	const updateSort = ( camera: Camera ) => {

		controller.updateSort( camera );

	};

	return {
		scene: entity,
		updateSort
	};

}
