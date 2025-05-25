import * as GLP from 'glpower';

import { Camera } from '../../../Component/Camera';
import { Mesh } from '../../../Component/Mesh';
import { Entity } from '../../../Entity';
import { Geometry } from '../../../Geometry';
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
	entity.name = "SPZGaussianSplat";

	// ガウシアンスプラット用のジオメトリを作成
	const geometry = new Geometry();

	// 平面ジオメトリの頂点データを設定
	const planePositions = new Float32Array( [
		- 0.5, - 0.5, 0.0,
		0.5, - 0.5, 0.0,
		0.5, 0.5, 0.0,
		- 0.5, - 0.5, 0.0,
		0.5, 0.5, 0.0,
		- 0.5, 0.5, 0.0
	] );

	const planeUVs = new Float32Array( [
		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 0.0,
		1.0, 1.0,
		0.0, 1.0
	] );

	// 基本的なメッシュデータの設定
	geometry.setAttribute( "position", planePositions, 3 );
	geometry.setAttribute( "uv", planeUVs, 2 );

	// インスタンス数の設定
	const numPoints = gaussianData.positions.length / 3;

	// インスタンスIDのみをアトリビュートとして設定
	const instanceIds = new Float32Array( numPoints );
	for ( let i = 0; i < numPoints; i ++ ) {

		instanceIds[ i ] = i;

	}

	geometry.setAttribute( "instanceId", instanceIds, 1, { instanceDivisor: 1 } );

	// テクスチャデータの準備
	// ガウシアンスプラットのデータをテクスチャにパッキング
	// テクスチャサイズの計算（2のべき乗にする）
	const texWidth = Math.pow( 2, Math.ceil( Math.log2( Math.sqrt( numPoints * 2 ) ) ) );
	const texHeight = Math.pow( 2, Math.ceil( Math.log2( ( numPoints * 2 ) / texWidth ) ) );

	// データをテクスチャに格納するためのバッファ
	const textureData = new Float32Array( texWidth * texHeight * 4 );
	textureData.fill( 0 );

	// packHalf2x16ユーティリティ関数
	function floatToHalf( float: number ): number {

		const floatView = new Float32Array( 1 );
		const int32View = new Int32Array( floatView.buffer );

		floatView[ 0 ] = float;
		const f = int32View[ 0 ];

		const sign = ( f >> 31 ) & 0x0001;
		const exp = ( f >> 23 ) & 0x00ff;
		let frac = f & 0x007fffff;

		let newExp;
		if ( exp === 0 ) {

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

	function packHalf2x16( x: number, y: number ): number {

		return ( floatToHalf( x ) | ( floatToHalf( y ) << 16 ) ) >>> 0;

	}

	// データパッキング: 各ガウシアンの情報をテクスチャに詰め込む
	for ( let i = 0; i < numPoints; i ++ ) {

		// 1番目のテクセル: 位置データ (xyz)
		const posIdx = i * 2 * 4; // 各ガウシアンに2テクセル使用
		textureData[ posIdx + 0 ] = gaussianData.positions[ i * 3 + 0 ]; // x
		textureData[ posIdx + 1 ] = gaussianData.positions[ i * 3 + 1 ]; // y
		textureData[ posIdx + 2 ] = gaussianData.positions[ i * 3 + 2 ]; // z
		textureData[ posIdx + 3 ] = gaussianData.alphas[ i ]; // アルファ値

		// 2番目のテクセル: 共分散行列と色情報
		// 回転とスケールから共分散行列を計算
		const scale = [
			gaussianData.scales[ i * 3 + 0 ],
			gaussianData.scales[ i * 3 + 1 ],
			gaussianData.scales[ i * 3 + 2 ]
		];

		const rot = [
			gaussianData.rotations[ i * 4 + 0 ],
			gaussianData.rotations[ i * 4 + 1 ],
			gaussianData.rotations[ i * 4 + 2 ],
			gaussianData.rotations[ i * 4 + 3 ]
		];

		// 回転行列を計算
		const M = [
			1.0 - 2.0 * ( rot[ 1 ] * rot[ 1 ] + rot[ 2 ] * rot[ 2 ] ),
			2.0 * ( rot[ 0 ] * rot[ 1 ] - rot[ 3 ] * rot[ 2 ] ),
			2.0 * ( rot[ 0 ] * rot[ 2 ] + rot[ 3 ] * rot[ 1 ] ),

			2.0 * ( rot[ 0 ] * rot[ 1 ] + rot[ 3 ] * rot[ 2 ] ),
			1.0 - 2.0 * ( rot[ 0 ] * rot[ 0 ] + rot[ 2 ] * rot[ 2 ] ),
			2.0 * ( rot[ 1 ] * rot[ 2 ] - rot[ 3 ] * rot[ 0 ] ),

			2.0 * ( rot[ 0 ] * rot[ 2 ] - rot[ 3 ] * rot[ 1 ] ),
			2.0 * ( rot[ 1 ] * rot[ 2 ] + rot[ 3 ] * rot[ 0 ] ),
			1.0 - 2.0 * ( rot[ 0 ] * rot[ 0 ] + rot[ 1 ] * rot[ 1 ] )
		];

		// スケールをマトリックスに適用
		const scaledM = M.map( ( k, i ) => k * scale[ Math.floor( i / 3 ) ] );

		// 共分散行列の計算 (Σ = M * M^T)
		const sigma = [
			scaledM[ 0 ] * scaledM[ 0 ] + scaledM[ 3 ] * scaledM[ 3 ] + scaledM[ 6 ] * scaledM[ 6 ],
			scaledM[ 0 ] * scaledM[ 1 ] + scaledM[ 3 ] * scaledM[ 4 ] + scaledM[ 6 ] * scaledM[ 7 ],
			scaledM[ 0 ] * scaledM[ 2 ] + scaledM[ 3 ] * scaledM[ 5 ] + scaledM[ 6 ] * scaledM[ 8 ],
			scaledM[ 1 ] * scaledM[ 1 ] + scaledM[ 4 ] * scaledM[ 4 ] + scaledM[ 7 ] * scaledM[ 7 ],
			scaledM[ 1 ] * scaledM[ 2 ] + scaledM[ 4 ] * scaledM[ 5 ] + scaledM[ 7 ] * scaledM[ 8 ],
			scaledM[ 2 ] * scaledM[ 2 ] + scaledM[ 5 ] * scaledM[ 5 ] + scaledM[ 8 ] * scaledM[ 8 ]
		];

		// 共分散行列をhalf floatとしてパック
		const attrIdx = posIdx + 4;

		// Uint32Arrayを使ってfloatからビットを取得
		const dataView = new DataView( new ArrayBuffer( 4 * 4 ) ); // 4つのfloat32用

		// 共分散行列の要素をパッキング
		const packed1 = packHalf2x16( 4.0 * sigma[ 0 ], 4.0 * sigma[ 1 ] );
		const packed2 = packHalf2x16( 4.0 * sigma[ 2 ], 4.0 * sigma[ 3 ] );
		const packed3 = packHalf2x16( 4.0 * sigma[ 4 ], 4.0 * sigma[ 5 ] );

		dataView.setUint32( 0, packed1, true );
		dataView.setUint32( 4, packed2, true );
		dataView.setUint32( 8, packed3, true );

		// 色情報をパック
		const r = Math.min( 255, Math.max( 0, Math.floor( gaussianData.colors[ i * 3 + 0 ] * 255 ) ) );
		const g = Math.min( 255, Math.max( 0, Math.floor( gaussianData.colors[ i * 3 + 1 ] * 255 ) ) );
		const b = Math.min( 255, Math.max( 0, Math.floor( gaussianData.colors[ i * 3 + 2 ] * 255 ) ) );
		const a = 255; // 完全不透明

		// ビットパッキング: 32ビットのuintにRGBA値を詰め込む
		const colorBits = ( r ) | ( g << 8 ) | ( b << 16 ) | ( a << 24 );
		dataView.setUint32( 12, colorBits, true );

		// floatとして値を取り出す
		textureData[ attrIdx + 0 ] = dataView.getFloat32( 0, true );
		textureData[ attrIdx + 1 ] = dataView.getFloat32( 4, true );
		textureData[ attrIdx + 2 ] = dataView.getFloat32( 8, true );
		textureData[ attrIdx + 3 ] = dataView.getFloat32( 12, true );

	}

	// データテクスチャの作成
	const dataTexture = new GLP.GLPowerTexture( gl );
	dataTexture.setting( {
		type: gl.FLOAT,
		internalFormat: gl.RGBA32F,
		format: gl.RGBA,
		magFilter: gl.NEAREST,
		minFilter: gl.NEAREST,
	} );

	// テクスチャにデータをアタッチ
	dataTexture.attach( {
		width: texWidth,
		height: texHeight,
		data: textureData
	} );

	// ユニフォーム変数の設定
	const uniforms: GLP.Uniforms = {
		uDataTexture: { value: dataTexture, type: '1i' },
		uDataTexSize: { value: [ texWidth, texHeight ], type: '2fv' },
		uPointCount: { value: numPoints, type: '1f' },
		uSplatSize: { value: 1.0, type: "1f" },
	};

	// 球面調和関数のテクスチャ処理
	if ( gaussianData.sphericalHarmonics ) {

		const shDegree = header.shDegree;
		const size = getSHSize( shDegree );

		// すべての次数でテクスチャとして設定
		const numPoints = gaussianData.positions.length / 3;

		// 係数の最大数（4次まで対応可能な16に設定）
		const maxCoeffs = 16;

		// テクスチャサイズの計算（2のべき乗にする）
		const texWidth = Math.pow( 2, Math.ceil( Math.log2( Math.ceil( Math.sqrt( numPoints * maxCoeffs ) ) ) ) );
		const texHeight = Math.pow( 2, Math.ceil( Math.log2( Math.ceil( ( numPoints * maxCoeffs ) / texWidth ) ) ) );

		// テクスチャデータの作成（RGBA形式、各ピクセルに1つの係数のRGB値を保存）
		const textureData = new Float32Array( texWidth * texHeight * 4 );
		textureData.fill( 0 ); // デフォルト値を0に設定

		// 実際の係数の数（次数によって異なる）
		const numCoeffs = Math.pow( shDegree + 1, 2 ) - 1;

		// SH係数をテクスチャに詰め込む
		for ( let p = 0; p < numPoints; p ++ ) {

			for ( let i = 0; i < numCoeffs; i ++ ) {

				// テクスチャ内の位置を計算
				const pixelIndex = p * maxCoeffs + i;
				const tx = pixelIndex % texWidth;
				const ty = Math.floor( pixelIndex / texWidth );
				const tIdx = ( ty * texWidth + tx ) * 4; // RGBA形式なので4倍

				// RGB成分をテクスチャに設定
				for ( let c = 0; c < 3; c ++ ) { // RGB

					const shIdx = p * size + i * 3 + c;
					textureData[ tIdx + c ] = gaussianData.sphericalHarmonics[ shIdx ];

				}

				// アルファチャンネルは使用しないが、1.0に設定
				textureData[ tIdx + 3 ] = 1.0;

			}

		}

		// テクスチャの作成
		const texture = new GLP.GLPowerTexture( gl );

		// 設定を適用
		texture.setting( {
			type: gl.FLOAT,
			internalFormat: gl.RGBA32F,
			format: gl.RGBA,
			magFilter: gl.NEAREST,
			minFilter: gl.NEAREST,
		} );

		// イメージデータを作成
		const imageData = {
			width: texWidth,
			height: texHeight,
			data: textureData
		};

		// テクスチャにデータをアタッチ
		texture.attach( imageData );

		// マテリアルにテクスチャとサイズ情報を設定
		uniforms.uSHTexture = { value: texture, type: '1i' };
		uniforms.uSHTexSize = { value: [ texWidth, texHeight ], type: '2fv' };
		uniforms.uSHCoeffCount = { value: numCoeffs, type: '1f' };
		uniforms.uMaxCoeffCount = { value: maxCoeffs, type: '1f' };

	}

	// ガウシアンスプラット用のマテリアルを作成
	const material = new Material( {
		phase: [ "ui" ], // レンダリングフェーズの設定
		frag: spzFrag,
		vert: spzVert,
		drawType: "TRIANGLES", // 三角形プリミティブとして描画（平面メッシュ用）
		uniforms: {
			...uniforms,
			uInstanceCount: { value: numPoints, type: '1i' },
			uSortIndices: { value: null, type: '1i' }, // ソート用のインデックステクスチャ
			uFocal: { value: new GLP.Vector( 1164.6601287484507, 1159.5880733038064 ), type: '2fv' },
			uViewport: { value: new GLP.Vector(), type: "2fv" }
		},
		defines: {
			"USE_GAUSSIAN_SPLAT": "",
			"USE_TEXTURE_DATA": "", // テクスチャベースのデータ使用フラグ
			"SH_DEGREE": header.shDegree.toString()
		},
		blending: "NORMAL"
	} );

	// アンチエイリアスフラグをチェック
	if ( ( header.flags & 0x1 ) !== 0 || options.antialias ) {

		material.defines[ "USE_ANTIALIAS" ] = "";

	}

	// 常にソート機能を有効にする
	material.defines[ "USE_SORTING" ] = "";

	// 球面調和関数の次数に応じてdefinesを追加
	if ( header.shDegree > 0 ) {

		material.defines[ "USE_SPHERICAL_HARMONICS" ] = "";
		// 常にテクスチャを使用
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
		sortEnabled: true
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
