import { SPZGaussianData } from '../utils/CoordinateSystemConverter';
import { gunzipData } from '../utils/SPZDataCompression';

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


/**
 * SPZファイルからガウシアンデータを解析する
 * @param buffer ファイルバッファ
 * @param isCompressed 圧縮されているかどうか
 * @returns ガウシアンデータとヘッダー
 */
export async function parseSPZ( buffer: ArrayBuffer, isCompressed?: boolean ): Promise<{ gaussianData: SPZGaussianData, header: any }> {

	// データの解凍（必要な場合）
	let decompressedData = buffer;

	// isCompressedが指定されていない場合は自動判定を試行
	if ( isCompressed === undefined ) {

		try {

			decompressedData = await gunzipData( buffer );
			console.log( '3DGSLoader: SPZデータを解凍しました' );

		} catch ( error ) {

			console.log( '3DGSLoader: 非圧縮SPZデータとして処理します' );
			decompressedData = buffer;

		}

	} else if ( isCompressed ) {

		try {

			decompressedData = await gunzipData( buffer );

		} catch ( error ) {

			console.warn( `3DGSLoader: 解凍に失敗しました: ${error}。非圧縮データとして処理を続行します。` );

		}

	}

	// SPZヘッダーの解析
	const header = parseSPZHeader( decompressedData );

	// SPZデータの解析
	const gaussianData = parseSPZData( decompressedData, header );

	return { gaussianData, header };

}


// 固定小数点からの変換用定数
const MAX_INT_24 = 0x7FFFFF;
const QUAT_COMPONENT_MAX = 127;

/**
 * 球面調和関数の量子化された値を元の値に戻す
 * C++のunquantizeSH関数と同等
 * @param x 量子化された8ビット値
 * @returns 逆量子化された値
 */
function unquantizeSH( x: number ): number {

	return ( x - 128.0 ) / 128.0;

}

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
export function parseSPZHeader( arrayBuffer: ArrayBuffer ): SPZHeader {

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
export function parseSPZData( arrayBuffer: ArrayBuffer, header: SPZHeader ): SPZGaussianData {

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

	// https://github.com/BabylonJS/Babylon.js/blob/bf55c4ad156aed0635f6b593289ec8d0eb30fa0e/packages/dev/loaders/src/SPLAT/splatFileLoader.ts#L246-L261

	const maxColorIndex = Math.min( numPoints, Math.floor( ( dataLength - offsetColor ) / COLOR_SIZE ) );

	const shC0 = 0.282;

	for ( let i = 0; i < maxColorIndex; i ++ ) {

		const colorOffset = offsetColor + i * COLOR_SIZE;

		for ( let component = 0; component < 3; component ++ ) {

			if ( colorOffset + component < dataLength ) {

				const byteValue = dataView.getUint8( colorOffset + component );
				const value = ( byteValue - 127.5 ) / ( colorScale * 255 );
				const rgbValue = ( 0.5 + shC0 * value ) * 255;
				colors[ i * 3 + component ] = Math.max( 0, Math.min( 255, rgbValue ) ) / 255.0;

			}

		}

	}

	// --------- スケールの解析 ---------

	const maxScaleIndex = Math.min( numPoints, Math.floor( ( dataLength - offsetScale ) / SCALE_SIZE ) );
	for ( let i = 0; i < maxScaleIndex; i ++ ) {

		const scaleOffset = offsetScale + i * SCALE_SIZE;
		for ( let j = 0; j < 3; j ++ ) {

			// 対数エンコーディングされたスケール値をデコード
			const logScale = dataView.getUint8( scaleOffset + j );

			// 指数変換で元のスケール値に戻す
			scales[ i * 3 + j ] = Math.exp( ( logScale ) / 16.0 - 10.0 );

		}

	}

	// --------- 回転の解析 ---------
	const maxRotationIndex = Math.min( numPoints, Math.floor( ( dataLength - offsetRotation ) / ROTATION_SIZE ) );
	for ( let i = 0; i < maxRotationIndex; i ++ ) {

		const rotOffset = offsetRotation + i * ROTATION_SIZE;

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

	}

	// --------- 球面調和関数の解析 ---------
	if ( sphericalHarmonics && SH_SIZE > 0 && hasSH ) {

		// C++実装と同じシンプルな処理：packed.sh.size()分だけ順番に処理
		const totalSHElements = numPoints * SH_SIZE;
		const maxSHElements = Math.min( totalSHElements, dataLength - offsetSH );

		for ( let i = 0; i < maxSHElements; i ++ ) {

			const byteIdx = offsetSH + i;

			if ( byteIdx < dataLength ) {

				const quantizedValue = dataView.getUint8( byteIdx );

				// C++のunquantizeSH関数と同等の逆量子化
				// (quantizedValue - 128.0) / 128.0 で -1.0 から 1.0 の範囲に変換
				const value = unquantizeSH( quantizedValue );

				sphericalHarmonics[ i ] = value;

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
		sphericalHarmonics,
		shDegree: header.shDegree
	};

}
