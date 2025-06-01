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
 * float値をhalf形式（16ビット）に変換する
 * @param float 変換するfloat値
 * @returns 16ビット半精度浮動小数点数
 */

const _floatView = new Float32Array( 1 );
const _int32View = new Int32Array( _floatView.buffer );

function floatToHalf( float: number ) {

	_floatView[ 0 ] = float;
	const f = _int32View[ 0 ];

	const sign = ( f >> 31 ) & 0x0001;
	const exp = ( f >> 23 ) & 0x00ff;
	let frac = f & 0x007fffff;

	let newExp;
	if ( exp == 0 ) {

		newExp = 0;

	} else if ( exp < 113 ) {

		newExp = 0;
		frac |= 0x00800000;
		frac = frac >> ( 113 - exp );
		if ( frac & 0x01000000 ) {

			newExp = 1;
			frac = 0;

		}

	} else if ( exp < 142 ) {

		newExp = exp - 112;

	} else {

		newExp = 31;
		frac = 0;

	}

	return ( sign << 15 ) | ( newExp << 10 ) | ( frac >> 13 );

}

/**
 * 2つのfloat値を32ビットのuint値にパックする
 * @param x 1つ目のfloat値
 * @param y 2つ目のfloat値
 * @returns パックされた32ビット値
 */
function packHalf2x16( x: number, y: number ): number {

	return ( floatToHalf( x ) | ( floatToHalf( y ) << 16 ) ) >>> 0;

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

	// 共分散行列テクスチャ (σの6要素をUint32としてパッキング)
	const covarianceData = new Uint32Array( texWidth * texHeight * 4 );
	covarianceData.fill( 0 );

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
			gaussianData.rotations[ i * 4 + 3 ]
		];

		const scale = [
			gaussianData.scales[ i * 3 + 0 ],
			gaussianData.scales[ i * 3 + 1 ],
			gaussianData.scales[ i * 3 + 2 ]
		];

		// M = S * R の計算
		const M = [
			// 第1行
			( 1.0 - 2.0 * ( rot[ 2 ] * rot[ 2 ] + rot[ 3 ] * rot[ 3 ] ) ),
			( 2.0 * ( rot[ 1 ] * rot[ 2 ] + rot[ 0 ] * rot[ 3 ] ) ),
			( 2.0 * ( rot[ 1 ] * rot[ 3 ] - rot[ 0 ] * rot[ 2 ] ) ),
			// 第2行
			( 2.0 * ( rot[ 1 ] * rot[ 2 ] - rot[ 0 ] * rot[ 3 ] ) ),
			( 1.0 - 2.0 * ( rot[ 1 ] * rot[ 1 ] + rot[ 3 ] * rot[ 3 ] ) ),
			( 2.0 * ( rot[ 2 ] * rot[ 3 ] + rot[ 0 ] * rot[ 1 ] ) ),
			// 第3行
			( 2.0 * ( rot[ 1 ] * rot[ 3 ] + rot[ 0 ] * rot[ 2 ] ) ),
			( 2.0 * ( rot[ 2 ] * rot[ 3 ] - rot[ 0 ] * rot[ 1 ] ) ),
			( 1.0 - 2.0 * ( rot[ 1 ] * rot[ 1 ] + rot[ 2 ] * rot[ 2 ] ) )
		].map( ( k, i ) => k * scale[ Math.floor( i / 3 ) ] );

		// シグマ行列（共分散行列）の計算
		const sigma = [
			M[ 0 ] * M[ 0 ] + M[ 3 ] * M[ 3 ] + M[ 6 ] * M[ 6 ],
			M[ 0 ] * M[ 1 ] + M[ 3 ] * M[ 4 ] + M[ 6 ] * M[ 7 ],
			M[ 0 ] * M[ 2 ] + M[ 3 ] * M[ 5 ] + M[ 6 ] * M[ 8 ],
			M[ 1 ] * M[ 1 ] + M[ 4 ] * M[ 4 ] + M[ 7 ] * M[ 7 ],
			M[ 1 ] * M[ 2 ] + M[ 4 ] * M[ 5 ] + M[ 7 ] * M[ 8 ],
			M[ 2 ] * M[ 2 ] + M[ 5 ] * M[ 5 ] + M[ 8 ] * M[ 8 ]
		];

		// 共分散行列データをmain.jsと同じ方法でパッキング
		// main.jsでは4倍のスケールが適用されている
		covarianceData[ idx + 0 ] = packHalf2x16( 4 * sigma[ 0 ], 4 * sigma[ 1 ] );
		covarianceData[ idx + 1 ] = packHalf2x16( 4 * sigma[ 2 ], 4 * sigma[ 3 ] );
		covarianceData[ idx + 2 ] = packHalf2x16( 4 * sigma[ 4 ], 4 * sigma[ 5 ] );
		covarianceData[ idx + 3 ] = 0; // パディング

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

	// 共分散行列テクスチャの作成 (UINTテクスチャ)
	const covarianceTexture = new GLP.GLPowerTexture( gl );
	covarianceTexture.setting( {
		type: gl.UNSIGNED_INT,
		internalFormat: gl.RGBA32UI,
		format: gl.RGBA_INTEGER,
		magFilter: gl.NEAREST,
		minFilter: gl.NEAREST,
	} );
	covarianceTexture.attach( {
		width: texWidth,
		height: texHeight,
		data: covarianceData
	} );

	// ユニフォーム変数の設定
	const uniforms: GLP.Uniforms = {
		uPositionTexture: { value: positionTexture, type: '1i' },
		uColorTexture: { value: colorTexture, type: '1i' },
		uSortTex: { value: sortTexture, type: '1i' },
		uCovarianceTexture: { value: covarianceTexture, type: '1i' },
		uDataTexSize: { value: new GLP.Vector( texWidth, texHeight ), type: '2fv' },
		uInstanceCount: { value: numPoints, type: '1i' },
		uFocal: { value: new GLP.Vector( 1164.6601287484507, 1159.5880733038064 ), type: '2fv' },
		uViewport: { value: new GLP.Vector(), type: "2fv" }
	};

	// 球面調和関数のテクスチャ処理
	if ( gaussianData.sphericalHarmonics ) {

		const shDegree = header.shDegree;
		const size = getSHSize( shDegree );

		// SH次数に応じてテクスチャを作成
		if ( shDegree > 0 ) {

			// SH0テクスチャ（0次と1次の係数）
			const sh0Data = new Uint32Array( texWidth * texHeight * 4 );
			sh0Data.fill( 0 );

			for ( let i = 0; i < numPoints; i ++ ) {

				const idx = i * 4;

				// 1次のSH係数（インデックス1-3）を取得
				const sh1_r = gaussianData.sphericalHarmonics[ i * size + 1 * 3 + 0 ];
				const sh1_g = gaussianData.sphericalHarmonics[ i * size + 1 * 3 + 1 ];
				const sh1_b = gaussianData.sphericalHarmonics[ i * size + 1 * 3 + 2 ];

				const sh2_r = gaussianData.sphericalHarmonics[ i * size + 2 * 3 + 0 ];
				const sh2_g = gaussianData.sphericalHarmonics[ i * size + 2 * 3 + 1 ];
				const sh2_b = gaussianData.sphericalHarmonics[ i * size + 2 * 3 + 2 ];

				const sh3_r = gaussianData.sphericalHarmonics[ i * size + 3 * 3 + 0 ];
				const sh3_g = gaussianData.sphericalHarmonics[ i * size + 3 * 3 + 1 ];
				const sh3_b = gaussianData.sphericalHarmonics[ i * size + 3 * 3 + 2 ];

				// float値を8ビット整数に変換してパック
				const pack = ( r: number, g: number, b: number, a: number ) => {

					const ur = Math.max( 0, Math.min( 255, Math.round( ( r + 1.0 ) * 127.5 ) ) );
					const ug = Math.max( 0, Math.min( 255, Math.round( ( g + 1.0 ) * 127.5 ) ) );
					const ub = Math.max( 0, Math.min( 255, Math.round( ( b + 1.0 ) * 127.5 ) ) );
					const ua = Math.max( 0, Math.min( 255, Math.round( ( a + 1.0 ) * 127.5 ) ) );
					return ( ua << 24 ) | ( ub << 16 ) | ( ug << 8 ) | ur;

				};

				sh0Data[ idx + 0 ] = pack( sh1_r, sh1_g, sh1_b, sh2_r );
				sh0Data[ idx + 1 ] = pack( sh2_g, sh2_b, sh3_r, sh3_g );
				sh0Data[ idx + 2 ] = pack( sh3_b, 0, 0, 0 );
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

				const pack = ( r: number, g: number, b: number, a: number ) => {

					const ur = Math.max( 0, Math.min( 255, Math.round( ( r + 1.0 ) * 127.5 ) ) );
					const ug = Math.max( 0, Math.min( 255, Math.round( ( g + 1.0 ) * 127.5 ) ) );
					const ub = Math.max( 0, Math.min( 255, Math.round( ( b + 1.0 ) * 127.5 ) ) );
					const ua = Math.max( 0, Math.min( 255, Math.round( ( a + 1.0 ) * 127.5 ) ) );
					return ( ua << 24 ) | ( ub << 16 ) | ( ug << 8 ) | ur;

				};

				sh1Data[ idx + 0 ] = pack( sh4_r, sh4_g, sh4_b, sh5_r );
				sh1Data[ idx + 1 ] = pack( sh5_g, sh5_b, sh6_r, sh6_g );
				sh1Data[ idx + 2 ] = pack( sh6_b, sh7_r, sh7_g, sh7_b );
				sh1Data[ idx + 3 ] = pack( sh8_r, sh8_g, sh8_b, 0 );

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
				const coeffs = [];
				for ( let j = 9; j < 16; j ++ ) {

					if ( j * 3 + 2 < size ) {

						coeffs.push(
							gaussianData.sphericalHarmonics[ i * size + j * 3 + 0 ],
							gaussianData.sphericalHarmonics[ i * size + j * 3 + 1 ],
							gaussianData.sphericalHarmonics[ i * size + j * 3 + 2 ]
						);

					} else {

						coeffs.push( 0, 0, 0 );

					}

				}

				const pack = ( r: number, g: number, b: number, a: number ) => {

					const ur = Math.max( 0, Math.min( 255, Math.round( ( r + 1.0 ) * 127.5 ) ) );
					const ug = Math.max( 0, Math.min( 255, Math.round( ( g + 1.0 ) * 127.5 ) ) );
					const ub = Math.max( 0, Math.min( 255, Math.round( ( b + 1.0 ) * 127.5 ) ) );
					const ua = Math.max( 0, Math.min( 255, Math.round( ( a + 1.0 ) * 127.5 ) ) );
					return ( ua << 24 ) | ( ub << 16 ) | ( ug << 8 ) | ur;

				};

				sh2Data[ idx + 0 ] = pack( coeffs[ 0 ], coeffs[ 1 ], coeffs[ 2 ], coeffs[ 3 ] );
				sh2Data[ idx + 1 ] = pack( coeffs[ 4 ], coeffs[ 5 ], coeffs[ 6 ], coeffs[ 7 ] );
				sh2Data[ idx + 2 ] = pack( coeffs[ 8 ], coeffs[ 9 ], coeffs[ 10 ], coeffs[ 11 ] );
				sh2Data[ idx + 3 ] = pack( coeffs[ 12 ], coeffs[ 13 ], coeffs[ 14 ], coeffs[ 15 ] );

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
			"USE_GAUSSIAN_SPLAT": "",
			"SH_DEGREE": header.shDegree.toString(),
			"USE_COVARIANCE_TEXTURE": "" // 共分散行列テクスチャを使用する
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
		gl: gl,
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
