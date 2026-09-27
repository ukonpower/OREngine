import type { ClonerLayout } from 'orengine';

// 球面上にフィボナッチ球でほぼ均等に並べる。番号は上から下へ進む
export const layout: ClonerLayout = {
	params: { count: 64, radius: 1 },
	count( params ) {

		return Math.max( 0, Math.round( params.count as number ) );

	},
	place( index, count, params ) {

		const radius = params.radius as number;

		const y = 1 - 2 * ( index + 0.5 ) / count;
		const r = Math.sqrt( 1 - y * y );
		// 黄金角ずつ回すと、隣り合う番号が重ならずに球面へ散らばる
		const phi = index * Math.PI * ( 3 - Math.sqrt( 5 ) );

		return {
			position: [ Math.cos( phi ) * r * radius, y * radius, Math.sin( phi ) * r * radius ],
			order: index / count,
		};

	},
};
