import * as GLP from 'glpower';

import { Camera } from '../../Component/Camera';
import { Mesh } from '../../Component/Mesh';
import { Entity } from '../../Entity';
import { Geometry } from '../../Geometry';
import { Material } from '../../Material';
import { hotUpdate } from '../../Utils/Hot';


import spzFrag from './shaders/spz.fs';
import spzVert from './shaders/spz.vs';
import { SPZController } from './SPZController';

// SPZの座標系タイプ
export enum CoordinateSystem {
	UNSPECIFIED = 0,
	RUB = 1, // Right, Up, Backward (OpenGL/three.js)
	RDF = 2, // Right, Down, Forward (PLY)
	LUF = 3, // Left, Up, Forward (GLB)
	RUF = 4 // Right, Up, Forward (Unity)
}

export type SPZHeader = {
	magic: number;
	version: number;
	numPoints: number;
	shDegree: number;
	fractionalBits: number;
	flags: number;
	reserved: number;
};

export type SPZResult = {
	scene: Entity;
	updateSort: ( camera: Camera ) => void;
}

export type SPZLoaderOptions = {
	sourceCoordinateSystem?: CoordinateSystem; // 入力データの座標系
	targetCoordinateSystem?: CoordinateSystem; // 出力データの座標系
	antialias?: boolean;
	isCompressed?: boolean; // データがgzipで圧縮されているかどうか
}

// 固定小数点からの変換用定数
const MAX_INT_24 = 0x7FFFFF;
const QUAT_COMPONENT_MAX = 127;

// SPZガウシアンデータ型
export type SPZGaussianData = {
	positions: Float32Array;
	colors: Float32Array;
	scales: Float32Array;
	rotations: Float32Array;
	alphas: Float32Array;
	sphericalHarmonics: Float32Array | null;
}

export class SPZLoader extends GLP.EventEmitter {

	private gl: WebGL2RenderingContext;

	constructor( gl: WebGL2RenderingContext ) {

		super();

		this.gl = gl;

	}

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

				decompressedData = await this.gunzipData( arrayBuffer );

			} catch ( error ) {

				console.warn( `SPZLoader: 解凍に失敗しました: ${error}。非圧縮データとして処理を続行します。` );

			}

		}

		// 3. SPZヘッダーの解析
		const header = this.parseHeader( decompressedData );

		// 4. SPZデータの解析
		const gaussianData = this.parseGaussianData( decompressedData, header );

		// 5. 座標系の変換（必要な場合）
		if ( opts.sourceCoordinateSystem !== CoordinateSystem.UNSPECIFIED &&
			opts.targetCoordinateSystem !== CoordinateSystem.UNSPECIFIED &&
			opts.sourceCoordinateSystem !== opts.targetCoordinateSystem ) {

			this.convertCoordinateSystem( gaussianData, opts.sourceCoordinateSystem, opts.targetCoordinateSystem );

		}

		// 6. メッシュの生成
		const result = this.createGaussianEntity( gaussianData, header, opts );

		return result;

	}

	// gzipデータの解凍 (DecompressionStream APIを使用)
	private async gunzipData( compressedData: ArrayBuffer ): Promise<ArrayBuffer> {

		try {

			// 最初にDOMのDecompressionStreamを試す
			if ( typeof DecompressionStream !== 'undefined' ) {

				// Web Streams APIを使用したgzip解凍
				const ds = new DecompressionStream( 'gzip' );
				const compressedBuffer = new Uint8Array( compressedData );
				const readableStream = new ReadableStream( {
					start( controller ) {

						controller.enqueue( compressedBuffer );
						controller.close();

					}
				} );

				const decompressedStream = readableStream.pipeThrough( ds );
				const reader = decompressedStream.getReader();

				const chunks = [];
				let totalLength = 0;

				while ( true ) {

					const { done, value } = await reader.read();
					if ( done ) break;
					chunks.push( value );
					totalLength += value.length;

				}

				// チャンクを結合
				const result = new Uint8Array( totalLength );
				let offset = 0;
				for ( const chunk of chunks ) {

					result.set( chunk, offset );
					offset += chunk.length;

				}

				return result.buffer;

			} else {

				// DecompressionStreamが利用できない場合はパース処理で対応
				console.warn( "SPZLoader: DecompressionStreamが利用できません。gzipヘッダーを無視して処理を続行します。" );

				// gzipヘッダーをスキップ (10バイト)
				// 1-2: ID bytes (0x1f, 0x8b)
				// 3: Compression Method (8 for DEFLATE)
				// 4: Flags
				// 5-8: Last Modified Time (Unix timestamp)
				// 9: Extra Flags
				// 10: OS ID
				const data = new Uint8Array( compressedData );

				// 簡易チェック: gzipヘッダーの最初の2バイトが正しいか確認
				if ( data[ 0 ] === 0x1f && data[ 1 ] === 0x8b ) {

					// gzipヘッダーをスキップして、DEFLATEデータだけを返す
					// 実際はもっと複雑だが、単純化のためにここではヘッダーをスキップするだけ
					const skipHeaderData = data.slice( 10 );
					return skipHeaderData.buffer;

				}

				// gzipヘッダーが見つからない場合は元のデータをそのまま返す
				return compressedData;

			}

		} catch ( error ) {

			console.error( "SPZLoader: gzip解凍に失敗しました:", error );
			throw new Error( `SPZLoader: gzip解凍に失敗しました: ${error}` );

		}

	}

	private parseHeader( arrayBuffer: ArrayBuffer ): SPZHeader {

		const dataView = new DataView( arrayBuffer );

		// SPZヘッダーの解析
		const header: SPZHeader = {
			magic: dataView.getUint32( 0, true ),
			version: dataView.getUint32( 4, true ),
			numPoints: dataView.getUint32( 8, true ),
			shDegree: dataView.getUint8( 12 ),
			fractionalBits: dataView.getUint8( 13 ),
			flags: dataView.getUint8( 14 ),
			reserved: dataView.getUint8( 15 )
		};

		// マジックナンバーの確認 (0x5053474E)
		if ( header.magic !== 0x5053474E ) {

			throw new Error( "Invalid SPZ file format: wrong magic number" );

		}

		// バージョンの確認
		if ( header.version !== 2 ) {

			throw new Error( `Unsupported SPZ version: ${header.version}` );

		}

		return header;

	}

	private parseGaussianData( arrayBuffer: ArrayBuffer, header: SPZHeader ): SPZGaussianData {

		const headerSize = 16; // ヘッダーサイズ: 16バイト
		const numPoints = header.numPoints;
		const fractionalBits = header.fractionalBits;

		// データビューの作成
		const dataView = new DataView( arrayBuffer );
		const dataLength = arrayBuffer.byteLength;

		// 各データ型のサイズ（バイト単位）
		const POSITION_SIZE = 3 * 3; // 3座標 x 3バイト (24ビット)
		const SCALE_SIZE = 3; // 3成分 x 1バイト
		const ROTATION_SIZE = 3; // 3成分 x 1バイト (w成分は計算で求める)
		const ALPHA_SIZE = 1; // 1バイト
		const COLOR_SIZE = 3; // 3成分(RGB) x 1バイト

		// 球面調和関数の係数の数とサイズを計算
		const shSize = this.getSHSize( header.shDegree );
		const SH_SIZE = shSize > 0 ? shSize : 0;

		console.log( SH_SIZE );


		// 結果の配列を初期化
		const positions = new Float32Array( numPoints * 3 );
		const scales = new Float32Array( numPoints * 3 );
		const rotations = new Float32Array( numPoints * 4 ); // クォータニオン(x,y,z,w)
		const alphas = new Float32Array( numPoints );
		const colors = new Float32Array( numPoints * 3 );
		const sphericalHarmonics = SH_SIZE > 0 ? new Float32Array( numPoints * SH_SIZE ) : null;

		// 各属性のオフセットを計算
		const offsetPosition = headerSize;
		const offsetAlpha = offsetPosition + numPoints * POSITION_SIZE;
		const offsetColor = offsetAlpha + numPoints * ALPHA_SIZE;
		const offsetScale = offsetColor + numPoints * COLOR_SIZE;
		const offsetRotation = offsetScale + numPoints * SCALE_SIZE;
		const offsetSH = offsetRotation + numPoints * ROTATION_SIZE;

		// 必要最小限のデータサイズを確認
		const minRequiredSize = offsetRotation + numPoints * ROTATION_SIZE;
		if ( dataLength < minRequiredSize ) {

			console.error( `SPZLoader: データが不完全です。必要サイズ: ${minRequiredSize}バイト、実際のサイズ: ${dataLength}バイト` );
			// それでも可能な限りデータを読み込むために処理を続行

		}

		// SHデータが必要な場合は、そのサイズも確認
		let hasSH = false;
		if ( SH_SIZE > 0 ) {

			const requiredSizeWithSH = offsetSH + numPoints * SH_SIZE;
			hasSH = dataLength >= requiredSizeWithSH;

			if ( ! hasSH ) {

				console.warn( `SPZLoader: 球面調和関数データが不完全または存在しません。` );

			}

		}

		// --------- 位置データの解析 ---------
		const maxPositionIndex = Math.min( numPoints, Math.floor( ( dataLength - offsetPosition ) / POSITION_SIZE ) );
		for ( let i = 0; i < maxPositionIndex; i ++ ) {

			const posOffset = offsetPosition + i * POSITION_SIZE;

			// 3バイト（24ビット）の固定小数点から浮動小数点へ変換
			for ( let j = 0; j < 3; j ++ ) {

				if ( posOffset + j * 3 + 2 < dataLength ) {

					let value = 0;
					// 24ビット整数を3バイトから読み込む（リトルエンディアン）
					value = dataView.getUint8( posOffset + j * 3 ) |
							( dataView.getUint8( posOffset + j * 3 + 1 ) << 8 ) |
							( dataView.getUint8( posOffset + j * 3 + 2 ) << 16 );

					// 24ビット符号付き整数に変換（最上位ビットが1なら負数）
					if ( value & 0x800000 ) {

						value = value - 0x1000000;

					}

					// 固定小数点から浮動小数点に変換
					positions[ i * 3 + j ] = value / ( 1 << fractionalBits );

				}

			}

		}

		// --------- アルファ値の解析 ---------
		const maxAlphaIndex = Math.min( numPoints, Math.floor( ( dataLength - offsetAlpha ) / ALPHA_SIZE ) );
		for ( let i = 0; i < maxAlphaIndex; i ++ ) {

			if ( offsetAlpha + i < dataLength ) {

				const alpha = dataView.getUint8( offsetAlpha + i ) / 255.0; // 0-255を0-1に正規化
				alphas[ i ] = alpha;

			}

		}

		// --------- カラーの解析 ---------
		const maxColorIndex = Math.min( numPoints, Math.floor( ( dataLength - offsetColor ) / COLOR_SIZE ) );
		for ( let i = 0; i < maxColorIndex; i ++ ) {

			const colorOffset = offsetColor + i * COLOR_SIZE;
			for ( let j = 0; j < 3; j ++ ) {

				if ( colorOffset + j < dataLength ) {

					// 8ビットカラーを0-1の範囲に正規化
					colors[ i * 3 + j ] = dataView.getUint8( colorOffset + j ) / 255.0;

				}

			}

		}

		// --------- スケールの解析 ---------
		const maxScaleIndex = Math.min( numPoints, Math.floor( ( dataLength - offsetScale ) / SCALE_SIZE ) );
		for ( let i = 0; i < maxScaleIndex; i ++ ) {

			const scaleOffset = offsetScale + i * SCALE_SIZE;
			for ( let j = 0; j < 3; j ++ ) {

				if ( scaleOffset + j < dataLength ) {

					// 対数エンコーディングされたスケール値をデコード
					const logScale = dataView.getUint8( scaleOffset + j );
					// 指数変換で元のスケール値に戻す
					scales[ i * 3 + j ] = Math.exp( logScale / 32.0 - 4.0 );

				} else {

					// デフォルト値を設定
					scales[ i * 3 + j ] = 0.01;

				}

			}

		}

		// --------- 回転の解析 ---------
		const maxRotationIndex = Math.min( numPoints, Math.floor( ( dataLength - offsetRotation ) / ROTATION_SIZE ) );
		for ( let i = 0; i < maxRotationIndex; i ++ ) {

			const rotOffset = offsetRotation + i * ROTATION_SIZE;

			if ( rotOffset + 2 < dataLength ) {

				// 符号付き8ビット整数として3成分を読み込み
				const x = dataView.getInt8( rotOffset ) / QUAT_COMPONENT_MAX;
				const y = dataView.getInt8( rotOffset + 1 ) / QUAT_COMPONENT_MAX;
				const z = dataView.getInt8( rotOffset + 2 ) / QUAT_COMPONENT_MAX;

				// w成分の計算 (正規化された四元数なので |x|^2 + |y|^2 + |z|^2 + |w|^2 = 1)
				let w = 1.0 - x * x - y * y - z * z;
				w = w > 0 ? Math.sqrt( w ) : 0;

				// 四元数の成分を設定
				rotations[ i * 4 ] = x;
				rotations[ i * 4 + 1 ] = y;
				rotations[ i * 4 + 2 ] = z;
				rotations[ i * 4 + 3 ] = w;

			} else {

				// デフォルト値（単位クォータニオン）を設定
				rotations[ i * 4 ] = 0;
				rotations[ i * 4 + 1 ] = 0;
				rotations[ i * 4 + 2 ] = 0;
				rotations[ i * 4 + 3 ] = 1;

			}

		}

		// --------- 球面調和関数の解析 ---------
		if ( sphericalHarmonics && SH_SIZE > 0 && hasSH ) {

			const shCoeffs = SH_SIZE / 3; // RGB成分を除いた係数の数
			const maxSHIndex = Math.min( numPoints, Math.floor( ( dataLength - offsetSH ) / ( shCoeffs * 3 ) ) );

			for ( let i = 0; i < maxSHIndex; i ++ ) {

				const shOffset = offsetSH + i * shCoeffs * 3; // 各ガウシアンごとのオフセット

				for ( let j = 0; j < shCoeffs; j ++ ) {

					for ( let c = 0; c < 3; c ++ ) { // R, G, B成分

						const byteIdx = shOffset + j * 3 + c;
						if ( byteIdx < dataLength ) {

							// インデックス計算: 各ガウシアンのSH係数のRGB成分
							const idx = i * SH_SIZE + j * 3 + c;

							// 8ビット符号付き整数を読み込み、適切にスケーリング
							let value = dataView.getInt8( byteIdx );

							// 次数に応じた適切なスケーリング
							// SPZフォーマットでは、0次は5ビット、1次と2次は4ビットの精度
							if ( j === 0 ) { // DC項（0次）

								value = value / 16.0; // 5ビット精度

							} else { // 1次以上

								value = value / 8.0; // 4ビット精度

							}

							sphericalHarmonics[ idx ] = value;

						}

					}

				}

			}

		} else if ( sphericalHarmonics ) {

			// SHデータがない場合は、すべてのSH係数を0に設定
			sphericalHarmonics.fill( 0 );

		}

		return {
			positions,
			colors,
			scales,
			rotations,
			alphas,
			sphericalHarmonics
		};

	}

	private getSHSize( shDegree: number ): number {

		return ( Math.pow( shDegree + 1, 2 ) - 1 ) * 3;

	}

	private convertCoordinateSystem( data: SPZGaussianData, sourceSystem: CoordinateSystem, targetSystem: CoordinateSystem ): void {

		// 各座標系間の変換行列を適用してpositions、rotations、その他のベクトルを変換

		// RDF (PLY) から RUB (OpenGL) への変換
		if ( sourceSystem === CoordinateSystem.RDF && targetSystem === CoordinateSystem.RUB ) {

			// Y軸を反転し、Z軸を反転（右手系は維持）
			for ( let i = 0; i < data.positions.length / 3; i ++ ) {

				// Y軸反転
				data.positions[ i * 3 + 1 ] = - data.positions[ i * 3 + 1 ];
				// Z軸反転
				data.positions[ i * 3 + 2 ] = - data.positions[ i * 3 + 2 ];

				// 回転クォータニオンの変換（Y軸とZ軸の反転に対応）
				// q' = qYZ = [qx, -qy, -qz, qw]
				data.rotations[ i * 4 + 1 ] = - data.rotations[ i * 4 + 1 ];
				data.rotations[ i * 4 + 2 ] = - data.rotations[ i * 4 + 2 ];

			}

		} else if ( sourceSystem === CoordinateSystem.LUF && targetSystem === CoordinateSystem.RUB ) {

			// LUF (GLB) から RUB (OpenGL) への変換

			// X軸を反転し、Z軸を反転（右手系は維持）
			for ( let i = 0; i < data.positions.length / 3; i ++ ) {

				// X軸反転
				data.positions[ i * 3 ] = - data.positions[ i * 3 ];
				// Z軸反転
				data.positions[ i * 3 + 2 ] = - data.positions[ i * 3 + 2 ];

				// 回転クォータニオンの変換（X軸とZ軸の反転に対応）
				// q' = qXZ = [-qx, qy, -qz, qw]
				data.rotations[ i * 4 ] = - data.rotations[ i * 4 ];
				data.rotations[ i * 4 + 2 ] = - data.rotations[ i * 4 + 2 ];

			}

		} else if ( sourceSystem === CoordinateSystem.RUF && targetSystem === CoordinateSystem.RUB ) {

			// RUF (Unity) から RUB (OpenGL) への変換

			// Z軸のみ反転（右手系は維持）
			for ( let i = 0; i < data.positions.length / 3; i ++ ) {

				// Z軸反転
				data.positions[ i * 3 + 2 ] = - data.positions[ i * 3 + 2 ];

				// 回転クォータニオンの変換（Z軸の反転に対応）
				// q' = qZ = [qx, qy, -qz, qw]
				data.rotations[ i * 4 + 2 ] = - data.rotations[ i * 4 + 2 ];

			}

		}

		// 他の座標系間の変換も必要に応じて実装

	}

	private createGaussianEntity( gaussianData: SPZGaussianData, header: SPZHeader, options: SPZLoaderOptions ): SPZResult {

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

		// データパッキング: 各ガウシアンの情報をテクスチャに詰め込む
		for ( let i = 0; i < numPoints; i ++ ) {

			// 1番目のテクセル: 位置データ (xyz)
			const posIdx = i * 2 * 4; // 各ガウシアンに2テクセル使用
			textureData[ posIdx + 0 ] = gaussianData.positions[ i * 3 + 0 ]; // x
			textureData[ posIdx + 1 ] = gaussianData.positions[ i * 3 + 1 ]; // y
			textureData[ posIdx + 2 ] = gaussianData.positions[ i * 3 + 2 ]; // z
			textureData[ posIdx + 3 ] = gaussianData.alphas[ i ]; // アルファ値

			// 2番目のテクセル: スケール、回転、色
			const attrIdx = posIdx + 4;
			// スケール (xyz)
			textureData[ attrIdx + 0 ] = gaussianData.scales[ i * 3 + 0 ];
			textureData[ attrIdx + 1 ] = gaussianData.scales[ i * 3 + 1 ];
			textureData[ attrIdx + 2 ] = gaussianData.scales[ i * 3 + 2 ];

			// 色情報はRGBA形式で1つのfloatに詰め込む (ビットパッキング)
			const r = Math.min( 255, Math.max( 0, Math.floor( gaussianData.colors[ i * 3 + 0 ] * 255 ) ) );
			const g = Math.min( 255, Math.max( 0, Math.floor( gaussianData.colors[ i * 3 + 1 ] * 255 ) ) );
			const b = Math.min( 255, Math.max( 0, Math.floor( gaussianData.colors[ i * 3 + 2 ] * 255 ) ) );
			const a = 255; // 完全不透明

			// ビットパッキング: 32ビットのfloatにRGBA値を詰め込む
			// floatのビット表現をUint32として解釈し、そこにRGBAを詰め込む
			const colorBits = ( r ) | ( g << 8 ) | ( b << 16 ) | ( a << 24 );
			const colorFloat = new Float32Array( new Uint32Array( [ colorBits ] ).buffer )[ 0 ];
			textureData[ attrIdx + 3 ] = colorFloat;

		}

		// 3番目のテクセルグループ: 回転情報 (クォータニオン)
		for ( let i = 0; i < numPoints; i ++ ) {

			const rotIdx = ( numPoints * 2 * 4 ) + ( i * 4 ); // 位置&スケールの後に配置
			// 正規化されたクォータニオンをテクスチャに格納
			const x = gaussianData.rotations[ i * 4 + 0 ];
			const y = gaussianData.rotations[ i * 4 + 1 ];
			const z = gaussianData.rotations[ i * 4 + 2 ];
			const w = gaussianData.rotations[ i * 4 + 3 ];

			// 長さを計算して正規化
			const length = Math.sqrt( x * x + y * y + z * z + w * w );

			textureData[ rotIdx + 0 ] = x / length; // x
			textureData[ rotIdx + 1 ] = y / length; // y
			textureData[ rotIdx + 2 ] = z / length; // z
			textureData[ rotIdx + 3 ] = w / length; // w

		}

		// データテクスチャの作成
		const dataTexture = new GLP.GLPowerTexture( this.gl );
		dataTexture.setting( {
			type: this.gl.FLOAT,
			internalFormat: this.gl.RGBA32F,
			format: this.gl.RGBA,
			magFilter: this.gl.NEAREST,
			minFilter: this.gl.NEAREST,
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

		// 球面調和関数のテクスチャ処理（既存コード）
		if ( gaussianData.sphericalHarmonics ) {

			const shDegree = header.shDegree;
			const size = this.getSHSize( shDegree );

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
			const texture = new GLP.GLPowerTexture( this.gl );

			// 設定を適用
			texture.setting( {
				type: this.gl.FLOAT,
				internalFormat: this.gl.RGBA32F,
				format: this.gl.RGBA,
				magFilter: this.gl.NEAREST,
				minFilter: this.gl.NEAREST,
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
			phase: [ "forward" ], // レンダリングフェーズの設定
			frag: spzFrag,
			vert: spzVert,
			drawType: "TRIANGLES", // 三角形プリミティブとして描画（平面メッシュ用）
			uniforms: {
				...uniforms,
				uInstanceCount: { value: numPoints, type: '1i' },
				uSortIndices: { value: null, type: '1i' } // ソート用のインデックステクスチャ
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

			import.meta.hot.accept( './shaders/spz.fs', ( module ) => {

				if ( module ) {

					material.frag = hotUpdate( 'spzFrag', module.default );
					material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/spz.vs', ( module ) => {

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
			gl: this.gl,
			sortEnabled: true
		} );

		// 深度ソート用の関数（下位互換性のため残す）
		const updateSort = ( camera: Camera ) => {

			controller.updateSort( camera );

		};

		return {
			scene: entity,
			updateSort
		};

	}

}

export { SPZController } from './SPZController';

