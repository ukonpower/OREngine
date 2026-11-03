import { type PointerEvent as ReactPointerEvent, type Ref } from 'react';

import style from './index.module.scss';

// 小節の拍の数（4/4 固定）
export const BEATS_PER_BAR = 4;

type MusicRulerProps = {
	viewStart: number;
	viewEnd: number;
	pxPerBeat: number;
	// 小節の番号を出す間隔（小節）
	labelBars: number;
	onPointerDown: ( e: ReactPointerEvent<HTMLDivElement> ) => void;
	ref?: Ref<HTMLDivElement>;
};

// 小節の目盛り。押した位置へ再生位置を合わせる（ドラッグで追う）。幅はレーンと同じで、拍を px に直す基準にもなる
export const MusicRuler = ( props: MusicRulerProps ) => {

	const labels = [];
	const stepBeats = props.labelBars * BEATS_PER_BAR;

	let beat = Math.max( 0, Math.ceil( props.viewStart / stepBeats ) * stepBeats );

	while ( beat < props.viewEnd ) {

		const bar = beat / BEATS_PER_BAR;

		labels.push( <span key={beat} className={style.label} style={{ left: ( beat - props.viewStart ) * props.pxPerBeat }}>{bar + 1}</span> );

		beat += stepBeats;

	}

	return <div ref={props.ref} className={style.ruler} onPointerDown={props.onPointerDown}>
		{labels}
	</div>;

};
