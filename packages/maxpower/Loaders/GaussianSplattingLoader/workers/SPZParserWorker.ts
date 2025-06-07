// SPZファイル専用のパーシングWebWorker

import { parseSPZ } from '../parsers/SPZDataParser';
import { SPZGaussianData } from '../utils/CoordinateSystemConverter';

// SPZ専用メッセージタイプ
export type SPZWorkerMessage = {
	type: 'parse';
	data: {
		buffer: ArrayBuffer;
		isCompressed?: boolean;
	};
};

export type SPZWorkerResponse = {
	type: 'result' | 'error';
	data: {
		gaussianData?: SPZGaussianData;
		header?: any;
		error?: string;
	};
};

( self as any ).onmessage = async ( event: MessageEvent<SPZWorkerMessage> ) => {

	const { type, data } = event.data;

	if ( type === 'parse' ) {

		try {

			const { buffer, isCompressed } = data;
			const result = await parseSPZ( buffer, isCompressed );

			// 結果を送信
			const response: SPZWorkerResponse = {
				type: 'result',
				data: {
					gaussianData: result.gaussianData,
					header: result.header
				}
			};

			( self as any ).postMessage( response );

		} catch ( error ) {

			// エラーを送信
			const response: SPZWorkerResponse = {
				type: 'error',
				data: {
					error: error instanceof Error ? error.message : 'SPZ parse error'
				}
			};

			( self as any ).postMessage( response );

		}

	}

};
