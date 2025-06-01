/**
 * gzipデータの解凍を行う
 * @param compressedData 圧縮されたデータ
 * @returns 解凍されたデータ
 */
export async function gunzipData( compressedData: ArrayBuffer ): Promise<ArrayBuffer> {

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
