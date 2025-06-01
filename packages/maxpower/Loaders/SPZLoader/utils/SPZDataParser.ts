import { SPZGaussianData } from './CoordinateSystemConverter';

// SPZのヘッダー情報
export type SPZHeader = {
	magic: number;
	version: number;
	numPoints: number;
	shDegree: number;
	fractionalBits: number;
	flags: number;
	reserved: number;
};

// 固定小数点からの変換用定数
const MAX_INT_24 = 0x7FFFFF;
const QUAT_COMPONENT_MAX = 127;

/**
 * 球面調和関数のサイズを計算する
 * @param shDegree 球面調和関数の次数
 * @returns 球面調和関数のサイズ
 */
export function getSHSize( shDegree: number ): number {

	return ( Math.pow( shDegree + 1, 2 ) - 1 ) * 3;

}

/**
 * SPZヘッダーを解析する
 * @param arrayBuffer バイナリデータ
 * @returns SPZヘッダー情報
 */
export function parseHeader( arrayBuffer: ArrayBuffer ): SPZHeader {

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

/**
 * SPZデータを解析する
 * @param arrayBuffer バイナリデータ
 * @param header SPZヘッダー情報
 * @returns SPZガウシアンデータ
 */
export function parseGaussianData( arrayBuffer: ArrayBuffer, header: SPZHeader ): SPZGaussianData {

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
	const shSize = getSHSize( header.shDegree );
	const SH_SIZE = shSize > 0 ? shSize : 0;

	// 結果の配列を初期化
	const positions = new Float32Array( numPoints * 3 );
	const scales = new Float32Array( numPoints * 3 );
	const rotations = new Float32Array( numPoints * 4 ); // クォータニオン(x,y,z,w)
	const alphas = new Float32Array( numPoints );
	const colors = new Float32Array( numPoints * 3 );
	const sphericalHarmonics = SH_SIZE > 0 ? new Float32Array( numPoints * SH_SIZE ) : null;

	// 各属性のオフセットを計算（READMEの正しい順序に合わせる）
	// 正しい順序: Position → Alpha → Color → Scale → Rotation → SH
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

	const colorScale = 0.15;

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
				scales[ i * 3 + j ] = Math.exp( ( logScale ) / 16.0 - 10.0 );

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

			// 符号なし8ビット整数として3成分を読み込み（C++実装に合わせて127.5で除算してから1を引く）
			const x = dataView.getUint8( rotOffset ) / 127.5 - 1.0;
			const y = dataView.getUint8( rotOffset + 1 ) / 127.5 - 1.0;
			const z = dataView.getUint8( rotOffset + 2 ) / 127.5 - 1.0;

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
