import type { ClonerLayout } from 'orengine/builtin';

// XZ 平面の円周（arc 度ぶんの弧）に並べる。各複製はローカル +X が外を向く
const layout: ClonerLayout = {
	params: { count: 12, radius: 1, arc: 360 },
	paramOptions: { count: { int: true, min: 0, step: 1 } },
	count( params ) {

		return params.count as number;

	},
	place( index, count, params ) {

		const radius = params.radius as number;
		const arc = params.arc as number;
		const arcRad = arc * Math.PI / 180;

		// 一周のときは最後と最初が重ならないよう count で割り、弧のときは両端に置くため count - 1 で割る
		let step = 0;

		if ( arc >= 360 ) {

			step = Math.PI * 2 / count;

		} else if ( count >= 2 ) {

			step = arcRad / ( count - 1 );

		}

		const angle = index * step;

		return {
			position: [ Math.cos( angle ) * radius, 0, - Math.sin( angle ) * radius ],
			rotation: [ 0, angle, 0 ],
			order: index / count,
		};

	},
};

export default layout;
