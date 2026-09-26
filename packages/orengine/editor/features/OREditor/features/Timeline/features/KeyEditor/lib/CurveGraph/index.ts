import * as MXP from 'maxpower';

import { getCurveKeys } from '../KeyChannels';

// 数値配列の要素の番号ごとの線の色（uipower のトークン）。数値1本のカーブは curveColor が既定の色を返す
const AXIS_COLORS = [ "var(--or-axis-x)", "var(--or-axis-y)", "var(--or-axis-z)", "var(--or-axis-w)" ];

export const curveColor = ( element: number | null ) => {

	if ( element === null || element >= AXIS_COLORS.length ) return "var(--or-text-muted)";

	return AXIS_COLORS[ element ];

};

// カーブ表示の値の範囲
export type ValueRange = {
	min: number;
	max: number;
};

// 表示の範囲の上下に足す余白（範囲の幅に対する割合）
const RANGE_MARGIN = 0.1;

// 値の目盛りを1本置く間隔の目安（px）
const TICK_SPACING = 40;

// カーブの線を取る間隔（px）
const SAMPLE_STEP = 2;

// 表示するカーブのキーとハンドルがすべて収まる値の範囲。平らなカーブは上下に 1 ずつ広げる
export const fitValueRange = ( curves: MXP.CurveTable, curveIds: string[] ): ValueRange => {

	let min = Infinity;
	let max = - Infinity;

	for ( const id of curveIds ) {

		const keys = getCurveKeys( curves[ id ] );

		for ( let i = 0; i < keys.length; i ++ ) {

			const key = keys[ i ];
			const values = [ key.coordinate.y ];

			// ハンドルは Bezier の区間に効いているものだけを入れる（CONSTANT・LINEAR のキーは使われないハンドルを持っている）
			if ( key.interpolation == "BEZIER" ) values.push( key.handleRight.y );
			if ( i > 0 && keys[ i - 1 ].interpolation == "BEZIER" ) values.push( key.handleLeft.y );

			for ( const value of values ) {

				min = Math.min( min, value );
				max = Math.max( max, value );

			}

		}

	}

	if ( min > max ) return { min: - 1, max: 1 };

	if ( max - min < 1e-6 ) return { min: min - 1, max: max + 1 };

	const margin = ( max - min ) * RANGE_MARGIN;

	return { min: min - margin, max: max + margin };

};

// 1px ぶんの量 unitPerPx より細かくならない、10 の累乗の刻み
const stepOf = ( unitPerPx: number ) => {

	return Math.pow( 10, Math.floor( Math.log10( unitPerPx ) ) );

};

// ドラッグで動かした値を、画面の 1px より細かい桁を落として丸める（シーン JSON に長い小数を書かないため）
export const roundToPixel = ( value: number, unitPerPx: number ) => {

	const step = stepOf( unitPerPx );
	const digits = Math.max( 0, - Math.floor( Math.log10( step ) ) );

	return Number( ( Math.round( value / step ) * step ).toFixed( digits ) );

};

// 値の目盛り。高さ height（px）に TICK_SPACING ごとくらいの本数で、1・2・5 × 10 の累乗の切りのよい値に置く
export const valueTicks = ( range: ValueRange, height: number ) => {

	const ticks: number[] = [];
	const count = Math.max( 1, Math.floor( height / TICK_SPACING ) );
	const rough = ( range.max - range.min ) / count;
	const base = Math.pow( 10, Math.floor( Math.log10( rough ) ) );

	let step = base * 10;

	if ( rough <= base ) {

		step = base;

	} else if ( rough <= base * 2 ) {

		step = base * 2;

	} else if ( rough <= base * 5 ) {

		step = base * 5;

	}

	const digits = Math.max( 0, - Math.floor( Math.log10( step ) ) );

	for ( let value = Math.ceil( range.min / step ) * step; value <= range.max; value += step ) {

		ticks.push( Number( value.toFixed( digits ) ) );

	}

	return ticks;

};

// カーブを評価する FCurve。カーブは編集のたびに作り直されるので、カーブそのものをキーにして使い回す
const fcurveCache = new WeakMap<MXP.CurveData, MXP.FCurve>();

const getFCurve = ( curve: MXP.CurveData ) => {

	let fcurve = fcurveCache.get( curve );

	if ( ! fcurve ) {

		fcurve = new MXP.FCurve( MXP.decodeKeyFrames( curve.k ) );
		fcurveCache.set( curve, fcurve );

	}

	return fcurve;

};

// カーブの線の SVG パス。再生と同じ FCurve で評価した値を SAMPLE_STEP px ごとに結ぶ（Bezier・補間の見た目が再生結果と一致する）
export const curvePath = ( curve: MXP.CurveData, toFrame: ( x: number ) => number, toY: ( value: number ) => number, width: number ) => {

	if ( curve.k.length == 0 ) return "";

	const fcurve = getFCurve( curve );
	const points: string[] = [];

	for ( let x = 0; x <= width + SAMPLE_STEP; x += SAMPLE_STEP ) {

		points.push( x + "," + toY( fcurve.getValue( toFrame( x ) ) ).toFixed( 1 ) );

	}

	return "M" + points.join( "L" );

};
