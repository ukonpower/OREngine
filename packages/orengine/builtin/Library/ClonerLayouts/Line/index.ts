import type { ClonerLayout } from 'orengine/builtin';

// direction の向きに、長さ length の線分上へ等間隔に並べる。中心が原点
const layout: ClonerLayout = {
	params: { count: 10, length: 4, direction: [ 1, 0, 0 ] },
	paramOptions: { count: { int: true, min: 0, step: 1 } },
	count( params ) {

		return params.count as number;

	},
	place( index, count, params ) {

		const length = params.length as number;
		const direction = params.direction as number[];

		let dx = 1;
		let dy = 0;
		let dz = 0;
		const directionLength = Math.sqrt( direction[ 0 ] * direction[ 0 ] + direction[ 1 ] * direction[ 1 ] + direction[ 2 ] * direction[ 2 ] );

		if ( directionLength > 0 ) {

			dx = direction[ 0 ] / directionLength;
			dy = direction[ 1 ] / directionLength;
			dz = direction[ 2 ] / directionLength;

		}

		// 1個だけのときは線分の真ん中に置く
		let t = 0.5;

		if ( count >= 2 ) {

			t = index / ( count - 1 );

		}

		const offset = ( t - 0.5 ) * length;

		return { position: [ dx * offset, dy * offset, dz * offset ] };

	},
};

export default layout;
