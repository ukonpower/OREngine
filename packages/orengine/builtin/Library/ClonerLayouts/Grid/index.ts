import type { ClonerLayout } from 'orengine/builtin';

// 3軸の格子に並べる。中心が原点で、番号は x → y → z の順に進む
const layout: ClonerLayout = {
	params: { count: [ 3, 3, 3 ], spacing: [ 1, 1, 1 ] },
	// 要素ごとに丸める。1 未満だと番号から格子の位置を割り出せない
	paramOptions: { count: { int: true, min: 1, step: 1 } },
	count( params ) {

		const counts = params.count as number[];
		const cx = counts[ 0 ];
		const cy = counts[ 1 ];
		const cz = counts[ 2 ];

		return cx * cy * cz;

	},
	place( index, _count, params ) {

		const counts = params.count as number[];
		const spacing = params.spacing as number[];
		const cx = counts[ 0 ];
		const cy = counts[ 1 ];
		const cz = counts[ 2 ];

		const ix = index % cx;
		const iy = Math.floor( index / cx ) % cy;
		const iz = Math.floor( index / ( cx * cy ) );

		const position = [
			( ix - ( cx - 1 ) / 2 ) * spacing[ 0 ],
			( iy - ( cy - 1 ) / 2 ) * spacing[ 1 ],
			( iz - ( cz - 1 ) / 2 ) * spacing[ 2 ],
		];

		return { position };

	},
};

export default layout;
