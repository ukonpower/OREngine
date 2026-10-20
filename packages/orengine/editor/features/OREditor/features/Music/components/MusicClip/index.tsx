import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react';

import { PEAK_SAMPLES } from '../../../../../../lib/MusicWaveform';

import style from './index.module.scss';

import type { ClipPart } from '../../hooks/useMusicClipEditing';

// 帯の中の、拍の範囲（曲の頭からの拍）
export type BeatRange = {
	start: number;
	end: number;
};

// 帯の波形の描き方。曲の音（トラックの波形の素）のうち、この帯が鳴らしている区間だけを描く
export type ClipWaveform = {
	peaks: Float32Array;
	// トラック全体の振れ幅の最大。小さい音のトラックでも帯いっぱいに描けるよう、これで割る
	peakMax: number;
	sampleRate: number;
	bpm: number;
	// 波形の素が更新されるたびに増える。描き直しのきっかけ
	version: number;
};

type MusicClipProps = {
	start: number;
	end: number;
	// 曲の頭からの拍で、レーンの左端の拍と 1 拍あたりの px
	viewStart: number;
	pxPerBeat: number;
	laneWidth: number;
	// 下に重なっている帯の数。重なった帯ほど上下を詰めて描き、下の帯の隠れた部分が見えるようにする
	depth: number;
	selected: boolean;
	active: boolean;
	// この帯が鳴らしている区間と、上の帯に隠れている区間
	sounding: BeatRange[];
	hidden: BeatRange[];
	waveform: ClipWaveform | null;
	onPointerDown: ( e: ReactPointerEvent, part: ClipPart ) => void;
};

// レーンの外へ大きくはみ出す帯は、この幅（レーンの幅に対する倍数）で切って描く。拡大したとき要素が何万 px にもならないように
const OVERFLOW_LANES = 1;

// 波形を canvas に描く。x は canvas の左端の、曲の頭からの拍
const drawWaveform = ( canvas: HTMLCanvasElement, waveform: ClipWaveform, fromBeat: number, pxPerBeat: number, sounding: BeatRange[] ) => {

	const ratio = window.devicePixelRatio || 1;
	const width = Math.max( 1, Math.round( canvas.clientWidth * ratio ) );
	const height = Math.max( 1, Math.round( canvas.clientHeight * ratio ) );

	canvas.width = width;
	canvas.height = height;

	const context = canvas.getContext( '2d' );

	if ( ! context ) return;

	context.clearRect( 0, 0, width, height );

	// 色は scss の color（デザイントークン）から取る
	context.fillStyle = getComputedStyle( canvas ).color;

	const samplesPerBeat = 60 / waveform.bpm * waveform.sampleRate;
	const beatsPerPixel = 1 / ( pxPerBeat * ratio );
	const center = height / 2;

	for ( const range of sounding ) {

		const firstX = Math.max( 0, Math.floor( ( range.start - fromBeat ) / beatsPerPixel ) );
		const lastX = Math.min( width, Math.ceil( ( range.end - fromBeat ) / beatsPerPixel ) );

		for ( let x = firstX; x < lastX; x ++ ) {

			const beatA = Math.max( range.start, fromBeat + x * beatsPerPixel );
			const beatB = Math.min( range.end, fromBeat + ( x + 1 ) * beatsPerPixel );

			if ( beatB <= beatA ) continue;

			const firstPeak = Math.floor( beatA * samplesPerBeat / PEAK_SAMPLES );
			const lastPeak = Math.min( waveform.peaks.length, Math.ceil( beatB * samplesPerBeat / PEAK_SAMPLES ) );

			let peak = 0;

			for ( let p = firstPeak; p < lastPeak; p ++ ) {

				peak = Math.max( peak, waveform.peaks[ p ] );

			}

			const h = Math.max( ratio, peak / waveform.peakMax * height );

			context.fillRect( x, center - h / 2, 1, h );

		}

	}

};

// タイムラインの帯1つ。左右の端は長さを変える取っ手、真ん中は動かす所
export const MusicClip = ( props: MusicClipProps ) => {

	const canvasRef = useRef<HTMLCanvasElement>( null );

	const left = ( props.start - props.viewStart ) * props.pxPerBeat;
	const right = ( props.end - props.viewStart ) * props.pxPerBeat;

	const drawLeft = Math.max( left, - props.laneWidth * OVERFLOW_LANES );
	const drawRight = Math.min( right, props.laneWidth * ( 1 + OVERFLOW_LANES ) );

	// 波形はレーンに見えている所だけを描く
	const visibleLeft = Math.max( drawLeft, 0 );
	const visibleRight = Math.min( drawRight, props.laneWidth );
	const visibleFromBeat = props.viewStart + visibleLeft / props.pxPerBeat;

	const { waveform, pxPerBeat, sounding } = props;

	useEffect( () => {

		const canvas = canvasRef.current;

		if ( ! canvas || ! waveform ) return;

		drawWaveform( canvas, waveform, visibleFromBeat, pxPerBeat, sounding );

	}, [ waveform, visibleFromBeat, pxPerBeat, sounding, visibleRight ] );

	if ( drawRight <= drawLeft ) return null;

	const onPointerDown = ( e: ReactPointerEvent<HTMLDivElement> ) => {

		const handle = ( e.target as HTMLElement ).closest( '[data-music_handle]' );

		let part: ClipPart = "body";

		if ( handle ) {

			part = handle.getAttribute( 'data-music_handle' ) as ClipPart;

		}

		props.onPointerDown( e, part );

	};

	const hiddenElms = [];

	for ( const range of props.hidden ) {

		const hiddenLeft = ( range.start - props.start ) * props.pxPerBeat + left - drawLeft;
		const hiddenWidth = ( range.end - range.start ) * props.pxPerBeat;

		hiddenElms.push( <div key={range.start} className={style.hidden} style={{ left: hiddenLeft, width: hiddenWidth }} /> );

	}

	let canvasElm = null;

	if ( props.waveform && visibleRight > visibleLeft ) {

		canvasElm = <canvas ref={canvasRef} className={style.waveform} style={{ left: visibleLeft - drawLeft, width: visibleRight - visibleLeft }} />;

	}

	return <div
		className={style.clip}
		data-selected={props.selected}
		data-active={props.active}
		style={{ left: drawLeft, width: drawRight - drawLeft, '--depth': props.depth } as React.CSSProperties}
		onPointerDown={onPointerDown}
	>
		{canvasElm}
		{hiddenElms}
		{left >= drawLeft && <div className={style.handle} data-music_handle="left" data-side="left" />}
		{right <= drawRight && <div className={style.handle} data-music_handle="right" data-side="right" />}
	</div>;

};
