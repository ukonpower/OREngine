import type { ClonerLayout } from 'orengine';

// seed と番号から、その番号専用の乱数列を作る（mulberry32）。place は番号ごとに呼ばれるので通しの乱数列は使えない
const createRandom = ( seed: number, index: number ) => {

	let state = ( Math.round( seed ) * 7919 + index * 104729 ) >>> 0;

	return () => {

		state = ( state + 0x6D2B79F5 ) >>> 0;
		let r = Math.imul( state ^ ( state >>> 15 ), state | 1 );
		r ^= r + Math.imul( r ^ ( r >>> 7 ), r | 61 );

		return ( ( r ^ ( r >>> 14 ) ) >>> 0 ) / 4294967296;

	};

};

// 原点が中心で大きさ size の箱の中に、seed で決まる位置へ一様に散らばらせる
export const layout: ClonerLayout = {
	params: { count: 32, size: [ 2, 2, 2 ], seed: 0 },
	count( params ) {

		return Math.max( 0, Math.round( params.count as number ) );

	},
	place( index, _count, params ) {

		const size = params.size as number[];
		const random = createRandom( params.seed as number, index );

		const position = [
			( random() - 0.5 ) * size[ 0 ],
			( random() - 0.5 ) * size[ 1 ],
			( random() - 0.5 ) * size[ 2 ],
		];

		return { position };

	},
};
