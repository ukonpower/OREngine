import * as GLP from 'glpower';

import { Camera } from '../../../Component/Camera';
import { Mesh } from '../../../Component/Mesh';
import { Entity } from '../../../Entity';
import { PlaneGeometry } from '../../../Geometry/PlaneGeometry';
import { Material } from '../../../Material';
import { hotUpdate } from '../../../Utils/Hot';
import { GaussianSplattingController } from '../GaussianSplattingController';
import { SPZHeader, getSHSize } from '../parsers/SPZDataParser';
import spzFrag from '../shaders/3dgs.fs';
import spzVert from '../shaders/3dgs.vs';

import { SPZGaussianData } from './CoordinateSystemConverter';


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
		width: 4,
		height: 4,
		widthSegments: 1,
		heightSegments: 1
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

	// 色テクスチャ
	const colorData = new Float32Array( texWidth * texHeight * 4 );
	colorData.fill( 0 );

	// ソートテクスチャ
	const sortData = new Float32Array( texWidth * texHeight * 4 );
	sortData.fill( 0 );

	// 共分散行列テクスチャ (σの6要素を2枚のテクスチャに分割)
	const covariance1Data = new Float32Array( texWidth * texHeight * 4 );
	covariance1Data.fill( 0 );

	const covariance2Data = new Float32Array( texWidth * texHeight * 4 );
	covariance2Data.fill( 0 );

	// データを各テクスチャに分離して格納
	for ( let i = 0; i < numPoints; i ++ ) {

		const idx = i * 4;

		// 位置データ (xyz + パディング)
		positionData[ idx + 0 ] = gaussianData.positions[ i * 3 + 0 ];
		positionData[ idx + 1 ] = gaussianData.positions[ i * 3 + 1 ];
		positionData[ idx + 2 ] = gaussianData.positions[ i * 3 + 2 ];
		positionData[ idx + 3 ] = 0.0; // パディング

		// 色データ (rgba)
		colorData[ idx + 0 ] = gaussianData.colors[ i * 3 + 0 ];
		colorData[ idx + 1 ] = gaussianData.colors[ i * 3 + 1 ];
		colorData[ idx + 2 ] = gaussianData.colors[ i * 3 + 2 ];
		colorData[ idx + 3 ] = gaussianData.alphas[ i ]; // アルファ値

		// 共分散行列の計算
		const rot = [
			gaussianData.rotations[ i * 4 + 0 ],
			gaussianData.rotations[ i * 4 + 1 ],
			gaussianData.rotations[ i * 4 + 2 ],
			- gaussianData.rotations[ i * 4 + 3 ]
		];

		const scale = [
			gaussianData.scales[ i * 3 + 0 ],
			gaussianData.scales[ i * 3 + 1 ],
			gaussianData.scales[ i * 3 + 2 ]
		];

		const quaternion = new GLP.Quaternion( rot[ 0 ], rot[ 1 ], rot[ 2 ], rot[ 3 ] );
		const rotMatrix = new GLP.Matrix().identity().applyQuaternion( quaternion );
		const scaleMatrix = new GLP.Matrix().applyScale( new GLP.Vector( scale[ 0 ], scale[ 1 ], scale[ 2 ] ).multiply( 2 ) );
		const m = rotMatrix.preMultiply( scaleMatrix ).elm;

		const covariances = [];
		covariances[ 0 ] = m[ 0 ] * m[ 0 ] + m[ 1 ] * m[ 1 ] + m[ 2 ] * m[ 2 ];
		covariances[ 1 ] = m[ 0 ] * m[ 4 ] + m[ 1 ] * m[ 5 ] + m[ 2 ] * m[ 6 ];
		covariances[ 2 ] = m[ 0 ] * m[ 8 ] + m[ 1 ] * m[ 9 ] + m[ 2 ] * m[ 10 ];
		covariances[ 3 ] = m[ 4 ] * m[ 4 ] + m[ 5 ] * m[ 5 ] + m[ 6 ] * m[ 6 ];
		covariances[ 4 ] = m[ 4 ] * m[ 8 ] + m[ 5 ] * m[ 9 ] + m[ 6 ] * m[ 10 ];
		covariances[ 5 ] = m[ 8 ] * m[ 8 ] + m[ 9 ] * m[ 9 ] + m[ 10 ] * m[ 10 ];

		// normalize covA, covB
		let factor = - 10000;
		for ( let covIndex = 0; covIndex < 6; covIndex ++ ) {

			factor = Math.max( factor, Math.abs( covariances[ covIndex ] ) );

		}

		positionData[ idx + 3 ] = factor;

		covariance1Data[ idx + 0 ] = covariances[ 0 ] / factor;
		covariance1Data[ idx + 1 ] = covariances[ 1 ] / factor;
		covariance1Data[ idx + 2 ] = covariances[ 2 ] / factor;
		covariance1Data[ idx + 3 ] = 0; // パディング

		covariance2Data[ idx + 0 ] = covariances[ 3 ] / factor;
		covariance2Data[ idx + 1 ] = covariances[ 4 ] / factor;
		covariance2Data[ idx + 2 ] = covariances[ 5 ] / factor;
		covariance2Data[ idx + 3 ] = 0; // パディング

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

	// 共分散行列テクスチャの作成（1枚目）
	const covariance1Texture = new GLP.GLPowerTexture( gl );
	covariance1Texture.setting( {
		type: gl.FLOAT,
		internalFormat: gl.RGBA32F,
		format: gl.RGBA,
		magFilter: gl.NEAREST,
		minFilter: gl.NEAREST,
	} );
	covariance1Texture.attach( {
		width: texWidth,
		height: texHeight,
		data: covariance1Data
	} );

	// 共分散行列テクスチャの作成（2枚目）
	const covariance2Texture = new GLP.GLPowerTexture( gl );
	covariance2Texture.setting( {
		type: gl.FLOAT,
		internalFormat: gl.RGBA32F,
		format: gl.RGBA,
		magFilter: gl.NEAREST,
		minFilter: gl.NEAREST,
	} );
	covariance2Texture.attach( {
		width: texWidth,
		height: texHeight,
		data: covariance2Data
	} );

	// ユニフォーム変数の設定
	const uniforms: GLP.Uniforms = {
		uPositionTexture: { value: positionTexture, type: '1i' },
		uColorTexture: { value: colorTexture, type: '1i' },
		uSortTex: { value: sortTexture, type: '1i' },
		uCovariance1Texture: { value: covariance1Texture, type: '1i' },
		uCovariance2Texture: { value: covariance2Texture, type: '1i' },
		uDataTexSize: { value: new GLP.Vector( texWidth, texHeight ), type: '2fv' },
		uInstanceCount: { value: numPoints, type: '1i' },
		uFocal: { value: new GLP.Vector( 1164.6601287484507, 1159.5880733038064 ), type: '2fv' },
		uViewport: { value: new GLP.Vector(), type: "2fv" }
	};

	// 球面調和関数のテクスチャ処理
	if ( gaussianData.sphericalHarmonics ) {

		const shDegree = header.shDegree;
		const size = getSHSize( shDegree );

		// Babylon.jsのSHパッキング方法に合わせてpackヘルパー関数を統一
		const packSHComponent = ( value: number ): number => {

			// 値を [-1, 1] の範囲から [0, 255] にマッピング
			return Math.max( 0, Math.min( 255, Math.round( ( value + 1.0 ) * 127.5 ) ) );

		};

		const packUint32 = ( r: number, g: number, b: number, a: number ): number => {

			const ur = packSHComponent( r );
			const ug = packSHComponent( g );
			const ub = packSHComponent( b );
			const ua = packSHComponent( a );
			return ( ua << 24 ) | ( ub << 16 ) | ( ug << 8 ) | ur;

		};

		// SH次数に応じてテクスチャを作成
		if ( shDegree > 0 ) {

			// SH0テクスチャ（1次の係数）
			const sh0Data = new Uint32Array( texWidth * texHeight * 4 );
			sh0Data.fill( 0 );

			for ( let i = 0; i < numPoints; i ++ ) {

				const idx = i * 4;

				// 1次のSH係数（インデックス1-3）を取得
				// シェーダーのcomputeSH関数の順序に合わせる: sh[1], sh[2], sh[3]
				const sh1_r = gaussianData.sphericalHarmonics[ i * size + 1 * 3 + 0 ];
				const sh1_g = gaussianData.sphericalHarmonics[ i * size + 1 * 3 + 1 ];
				const sh1_b = gaussianData.sphericalHarmonics[ i * size + 1 * 3 + 2 ];

				const sh2_r = gaussianData.sphericalHarmonics[ i * size + 2 * 3 + 0 ];
				const sh2_g = gaussianData.sphericalHarmonics[ i * size + 2 * 3 + 1 ];
				const sh2_b = gaussianData.sphericalHarmonics[ i * size + 2 * 3 + 2 ];

				const sh3_r = gaussianData.sphericalHarmonics[ i * size + 3 * 3 + 0 ];
				const sh3_g = gaussianData.sphericalHarmonics[ i * size + 3 * 3 + 1 ];
				const sh3_b = gaussianData.sphericalHarmonics[ i * size + 3 * 3 + 2 ];

				// シェーダーのデータ読み取り順序に合わせてパック
				// sh0.x: sh1_r, sh1_g, sh1_b, sh2_r
				// sh0.y: sh2_g, sh2_b, sh3_r, sh3_g
				// sh0.z: sh3_b, (padding), (padding), (padding)
				sh0Data[ idx + 0 ] = packUint32( sh1_r, sh1_g, sh1_b, sh2_r );
				sh0Data[ idx + 1 ] = packUint32( sh2_g, sh2_b, sh3_r, sh3_g );
				sh0Data[ idx + 2 ] = packUint32( sh3_b, 0, 0, 0 );
				sh0Data[ idx + 3 ] = 0; // パディング

			}

			const sh0Texture = new GLP.GLPowerTexture( gl );
			sh0Texture.setting( {
				type: gl.UNSIGNED_INT,
				internalFormat: gl.RGBA32UI,
				format: gl.RGBA_INTEGER,
				magFilter: gl.NEAREST,
				minFilter: gl.NEAREST,
			} );
			sh0Texture.attach( {
				width: texWidth,
				height: texHeight,
				data: sh0Data
			} );

			uniforms.uShTexture0 = { value: sh0Texture, type: '1i' };

		}

		if ( shDegree > 1 ) {

			// SH1テクスチャ（2次の係数）
			const sh1Data = new Uint32Array( texWidth * texHeight * 4 );
			sh1Data.fill( 0 );

			for ( let i = 0; i < numPoints; i ++ ) {

				const idx = i * 4;

				// 2次のSH係数（インデックス4-8）を取得
				// シェーダーのcomputeSH関数に合わせる順序
				const sh4_r = gaussianData.sphericalHarmonics[ i * size + 4 * 3 + 0 ];
				const sh4_g = gaussianData.sphericalHarmonics[ i * size + 4 * 3 + 1 ];
				const sh4_b = gaussianData.sphericalHarmonics[ i * size + 4 * 3 + 2 ];

				const sh5_r = gaussianData.sphericalHarmonics[ i * size + 5 * 3 + 0 ];
				const sh5_g = gaussianData.sphericalHarmonics[ i * size + 5 * 3 + 1 ];
				const sh5_b = gaussianData.sphericalHarmonics[ i * size + 5 * 3 + 2 ];

				const sh6_r = gaussianData.sphericalHarmonics[ i * size + 6 * 3 + 0 ];
				const sh6_g = gaussianData.sphericalHarmonics[ i * size + 6 * 3 + 1 ];
				const sh6_b = gaussianData.sphericalHarmonics[ i * size + 6 * 3 + 2 ];

				const sh7_r = gaussianData.sphericalHarmonics[ i * size + 7 * 3 + 0 ];
				const sh7_g = gaussianData.sphericalHarmonics[ i * size + 7 * 3 + 1 ];
				const sh7_b = gaussianData.sphericalHarmonics[ i * size + 7 * 3 + 2 ];

				const sh8_r = gaussianData.sphericalHarmonics[ i * size + 8 * 3 + 0 ];
				const sh8_g = gaussianData.sphericalHarmonics[ i * size + 8 * 3 + 1 ];
				const sh8_b = gaussianData.sphericalHarmonics[ i * size + 8 * 3 + 2 ];

				// シェーダーのデータ読み取り順序に合わせてパック
				// sh1.x: sh4_r, sh4_g, sh4_b, sh5_r
				// sh1.y: sh5_g, sh5_b, sh6_r, sh6_g
				// sh1.z: sh6_b, sh7_r, sh7_g, sh7_b
				// sh1.w: sh8_r, sh8_g, sh8_b, (padding)
				sh1Data[ idx + 0 ] = packUint32( sh4_r, sh4_g, sh4_b, sh5_r );
				sh1Data[ idx + 1 ] = packUint32( sh5_g, sh5_b, sh6_r, sh6_g );
				sh1Data[ idx + 2 ] = packUint32( sh6_b, sh7_r, sh7_g, sh7_b );
				sh1Data[ idx + 3 ] = packUint32( sh8_r, sh8_g, sh8_b, 0 );

			}

			const sh1Texture = new GLP.GLPowerTexture( gl );
			sh1Texture.setting( {
				type: gl.UNSIGNED_INT,
				internalFormat: gl.RGBA32UI,
				format: gl.RGBA_INTEGER,
				magFilter: gl.NEAREST,
				minFilter: gl.NEAREST,
			} );
			sh1Texture.attach( {
				width: texWidth,
				height: texHeight,
				data: sh1Data
			} );

			uniforms.uShTexture1 = { value: sh1Texture, type: '1i' };

		}

		if ( shDegree > 2 ) {

			// SH2テクスチャ（3次の係数）
			const sh2Data = new Uint32Array( texWidth * texHeight * 4 );
			sh2Data.fill( 0 );

			for ( let i = 0; i < numPoints; i ++ ) {

				const idx = i * 4;

				// 3次のSH係数（インデックス9-15）を取得
				// シェーダーのcomputeSH関数に合わせる順序
				const getSHCoeff = ( index: number, channel: number ) => {

					const globalIdx = i * size + index * 3 + channel;
					return globalIdx < gaussianData.sphericalHarmonics!.length ? gaussianData.sphericalHarmonics![ globalIdx ] : 0;

				};

				// sh[9] から sh[15] までの係数を順番に取得
				const sh9_r = getSHCoeff( 9, 0 );
				const sh9_g = getSHCoeff( 9, 1 );
				const sh9_b = getSHCoeff( 9, 2 );

				const sh10_r = getSHCoeff( 10, 0 );
				const sh10_g = getSHCoeff( 10, 1 );
				const sh10_b = getSHCoeff( 10, 2 );

				const sh11_r = getSHCoeff( 11, 0 );
				const sh11_g = getSHCoeff( 11, 1 );
				const sh11_b = getSHCoeff( 11, 2 );

				const sh12_r = getSHCoeff( 12, 0 );
				const sh12_g = getSHCoeff( 12, 1 );
				const sh12_b = getSHCoeff( 12, 2 );

				const sh13_r = getSHCoeff( 13, 0 );
				const sh13_g = getSHCoeff( 13, 1 );
				const sh13_b = getSHCoeff( 13, 2 );

				const sh14_r = getSHCoeff( 14, 0 );
				const sh14_g = getSHCoeff( 14, 1 );
				const sh14_b = getSHCoeff( 14, 2 );

				const sh15_r = getSHCoeff( 15, 0 );
				const sh15_g = getSHCoeff( 15, 1 );
				const sh15_b = getSHCoeff( 15, 2 );

				// シェーダーのデータ読み取り順序に合わせてパック
				// sh2.x: sh9_r, sh9_g, sh9_b, sh10_r
				// sh2.y: sh10_g, sh10_b, sh11_r, sh11_g
				// sh2.z: sh11_b, sh12_r, sh12_g, sh12_b
				// sh2.w: sh13_r, sh13_g, sh13_b, sh14_r
				// 注意: sh[14]とsh[15]の残りの要素はシェーダー側で0にパディング
				sh2Data[ idx + 0 ] = packUint32( sh9_r, sh9_g, sh9_b, sh10_r );
				sh2Data[ idx + 1 ] = packUint32( sh10_g, sh10_b, sh11_r, sh11_g );
				sh2Data[ idx + 2 ] = packUint32( sh11_b, sh12_r, sh12_g, sh12_b );
				sh2Data[ idx + 3 ] = packUint32( sh13_r, sh13_g, sh13_b, sh14_r );

			}

			const sh2Texture = new GLP.GLPowerTexture( gl );
			sh2Texture.setting( {
				type: gl.UNSIGNED_INT,
				internalFormat: gl.RGBA32UI,
				format: gl.RGBA_INTEGER,
				magFilter: gl.NEAREST,
				minFilter: gl.NEAREST,
			} );
			sh2Texture.attach( {
				width: texWidth,
				height: texHeight,
				data: sh2Data
			} );

			uniforms.uShTexture2 = { value: sh2Texture, type: '1i' };

		}

	}

	console.log( uniforms );


	// ガウシアンスプラット用のマテリアルを作成
	const material = new Material( {
		phase: [ "ui" ],
		frag: spzFrag,
		vert: spzVert,
		uniforms,
		defines: {
			"SH_DEGREE": header.shDegree.toString(),
		},
		// depthTest: false,
	} );

	// 球面調和関数の次数に応じてdefinesを追加
	if ( header.shDegree > 0 ) {

		material.defines[ "USE_SPHERICAL_HARMONICS" ] = "";
		material.defines[ "USE_SH_TEXTURE" ] = "";

	}

	if ( import.meta.hot ) {

		import.meta.hot.accept( '../shaders/3dgs.fs', ( module ) => {

			if ( module ) {

				material.frag = hotUpdate( 'spzFrag', module.default );
				material.requestUpdate();

			}

		} );

		import.meta.hot.accept( '../shaders/3dgs.vs', ( module ) => {

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
	const controller = entity.addComponent( GaussianSplattingController, {
		gaussianPositions: gaussianData.positions,
		numPoints: numPoints,
		material: material,
	} );

	// 深度ソート用の関数
	const updateSort = ( camera: Camera ) => {

		controller.updateSort();

	};

	return {
		scene: entity,
		updateSort
	};

}
