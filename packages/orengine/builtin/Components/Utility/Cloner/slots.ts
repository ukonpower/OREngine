import * as MTP from 'mathpower';

import type { ClonerLayout, ClonerLayoutParams } from './layout';

// 時間差の順番の決め方。Cloner の delay/order の選択肢と同じ並び
export type ClonerOrder = 'layout' | 'index' | 'center' | 'x' | 'y' | 'z' | 'random';

export type ClonerSettings = {
	order: ClonerOrder;
	// 最初に動き出す複製と最後に動き出す複製の差（秒）
	spread: number;
	jitterPosition: number[];
	// ラジアン
	jitterRotation: number[];
	// 1 ± jitterScale 倍の範囲で3軸そろえて変える
	jitterScale: number;
	seed: number;
};

// 持ち場1個分。rotation はオイラー角（ラジアン）、delay は秒
export type ClonerSlotSpec = {
	position: number[];
	rotation: number[];
	scale: number[];
	delay: number;
};

// 順番の値の最大と最小の差がこれ未満なら、全部同じ順番とみなす
const ORDER_EPSILON = 1e-9;

// 複製1個の順番の値（大小だけが意味を持つ）。random は呼び出し側が引いた乱数を渡す
const orderValue = ( order: ClonerOrder, index: number, position: number[], layoutOrder: number | undefined, randomValue: number ): number => {

	if ( order === 'layout' ) {

		if ( layoutOrder === undefined ) {

			return index;

		}

		return layoutOrder;

	}

	if ( order === 'center' ) {

		return Math.hypot( position[ 0 ], position[ 1 ], position[ 2 ] );

	}

	if ( order === 'x' ) {

		return position[ 0 ];

	}

	if ( order === 'y' ) {

		return position[ 1 ];

	}

	if ( order === 'z' ) {

		return position[ 2 ];

	}

	if ( order === 'random' ) {

		return randomValue;

	}

	return index;

};

// 並べ方と設定から、全複製の持ち場と遅れを求める
export const computeSlots = ( layout: ClonerLayout, params: ClonerLayoutParams, settings: ClonerSettings ): ClonerSlotSpec[] => {

	const count = layout.count( params );

	// ばらつきと別の乱数列にするため seed + 1
	const orderRandom = MTP.MathUtils.randomSeed( settings.seed + 1 );

	const orders: number[] = [];
	const slots: ClonerSlotSpec[] = [];

	// ばらつき: 複製ごとに必ず7回引く（位置 xyz・回転 xyz・大きさ）。量が 0 の軸も引くので、
	// あるばらつきを足しても他のばらつきの値は変わらない
	const jitterRandom = MTP.MathUtils.randomSeed( settings.seed );

	for ( let index = 0; index < count; index ++ ) {

		const placement = layout.place( index, count, params );

		orders.push( orderValue( settings.order, index, placement.position, placement.order, orderRandom() ) );

		const position: number[] = [];

		for ( let axis = 0; axis < 3; axis ++ ) {

			const r = jitterRandom();
			position.push( placement.position[ axis ] + ( r * 2 - 1 ) * settings.jitterPosition[ axis ] );

		}

		let baseRotation = [ 0, 0, 0 ];

		if ( placement.rotation ) {

			baseRotation = placement.rotation;

		}

		const rotation: number[] = [];

		for ( let axis = 0; axis < 3; axis ++ ) {

			const r = jitterRandom();
			rotation.push( baseRotation[ axis ] + ( r * 2 - 1 ) * settings.jitterRotation[ axis ] );

		}

		let baseScale = [ 1, 1, 1 ];

		if ( placement.scale ) {

			baseScale = placement.scale;

		}

		const scaleFactor = 1 + ( jitterRandom() * 2 - 1 ) * settings.jitterScale;
		const scale: number[] = [];

		for ( let axis = 0; axis < 3; axis ++ ) {

			scale.push( baseScale[ axis ] * scaleFactor );

		}

		slots.push( { position, rotation, scale, delay: 0 } );

	}

	// 順番の値を 0〜1 にそろえて遅れにする
	let min = Infinity;
	let max = - Infinity;

	for ( const value of orders ) {

		min = Math.min( min, value );
		max = Math.max( max, value );

	}

	const range = max - min;

	for ( let index = 0; index < slots.length; index ++ ) {

		let normalized = 0;

		if ( range >= ORDER_EPSILON ) {

			normalized = ( orders[ index ] - min ) / range;

		}

		slots[ index ].delay = normalized * settings.spread;

	}

	return slots;

};

// 遅らせた時刻（秒×60）。loopFrames があればその長さで [0, loopFrames) に折り返す
export const shiftFrame = ( frame: number, delayFrames: number, loopFrames: number | null ): number => {

	const f = frame - delayFrames;

	if ( loopFrames === null || loopFrames <= 0 ) {

		return f;

	}

	return ( ( f % loopFrames ) + loopFrames ) % loopFrames;

};
