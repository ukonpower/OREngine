// Splatファイル専用のパーシングWebWorker

import { parseSplat, createSplatDummyHeader } from '../parsers/SplatDataParser';
import { SPZGaussianData } from '../utils/CoordinateSystemConverter';

// Splat専用メッセージタイプ
export type SplatWorkerMessage = {
	type: 'parse';
	data: {
		buffer: ArrayBuffer;
	};
};

export type SplatWorkerResponse = {
	type: 'result' | 'error';
	data: {
		gaussianData?: SPZGaussianData;
		header?: any;
		error?: string;
	};
};

( self as any ).onmessage = async ( event: MessageEvent<SplatWorkerMessage> ) => {

	const { type, data } = event.data;

	if ( type === 'parse' ) {

		try {

			console.log( 'SplatParseWorker: Splat形式として解析開始' );
			
			const { buffer } = data;
			const gaussianData = parseSplat( buffer );
			const header = createSplatDummyHeader( gaussianData.positions.length / 3 );

			// 結果を送信
			const response: SplatWorkerResponse = {
				type: 'result',
				data: {
					gaussianData,
					header
				}
			};

			( self as any ).postMessage( response );

		} catch ( error ) {

			// エラーを送信
			const response: SplatWorkerResponse = {
				type: 'error',
				data: {
					error: error instanceof Error ? error.message : 'Splat parse error'
				}
			};

			( self as any ).postMessage( response );

		}

	}

};
