import { useCallback, useRef, useState } from "react";

// 横の表示範囲（曲の頭からの拍）
export type MusicView = {
	start: number;
	end: number;
};

// 表示範囲を初めに合わせる拍の数の下限（曲が短い・BPM が無いときでも何小節かは見えるように）
const MIN_VIEW_BEATS = 16;

const fullView = ( songBeats: number ): MusicView => {

	return { start: 0, end: Math.max( songBeats, MIN_VIEW_BEATS ) };

};

// Music パネルの横（拍）の表示範囲。wheel・中ボタンのドラッグで動かす
export const useMusicView = ( songBeats: number ) => {

	const [ view, setViewState ] = useState<MusicView>( () => fullView( songBeats ) );

	// 1フレームに wheel が何度も来るので、次の state を待たずに続けて動かせるよう ref も同時に更新する
	const viewRef = useRef( view );

	const setView = useCallback( ( next: MusicView ) => {

		viewRef.current = next;
		setViewState( next );

	}, [] );

	// 表示の範囲を scale 倍にする。anchor は拡大縮小しても動かない位置（表示の幅に対する 0〜1）
	const zoom = useCallback( ( scale: number, anchor: number ) => {

		const current = viewRef.current;
		const pivot = current.start + ( current.end - current.start ) * anchor;

		setView( { start: ( current.start - pivot ) * scale + pivot, end: ( current.end - pivot ) * scale + pivot } );

	}, [ setView ] );

	// 表示の範囲を動かす。delta は表示の幅に対する割合
	const scroll = useCallback( ( delta: number ) => {

		const current = viewRef.current;
		const beats = delta * ( current.end - current.start );

		setView( { start: current.start + beats, end: current.end + beats } );

	}, [ setView ] );

	const reset = useCallback( ( beats: number ) => {

		setView( fullView( beats ) );

	}, [ setView ] );

	return { view, viewRef, setView, zoom, scroll, reset };

};
