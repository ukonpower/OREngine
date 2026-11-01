import { useMemo, type CSSProperties, type MouseEvent, type PointerEvent as ReactPointerEvent } from 'react';

import { decodeClips, MusicClip as MusicClipRange, resolveClipSegments } from '../../../../../../../builtin/Components/Utility/Music/clips';
import { clipKey } from '../../lib/clipEdit';
import { BeatRange, ClipNoteMark, ClipWaveform, MusicClip } from '../MusicClip';

import style from './index.module.scss';

import type { MusicClipData } from '../../../../../../../builtin/Components/Utility/Music/instrument';
import type { ClipPart, ClipSelection } from '../../hooks/useMusicClipEditing';

type MusicLaneProps = {
	track: number;
	clips: MusicClipData[];
	viewStart: number;
	pxPerBeat: number;
	laneWidth: number;
	selection: ClipSelection;
	waveform: ClipWaveform | null;
	// ノートのトラックなら、帯の中にノートの縮図を描く
	showNotes: boolean;
	// ミュート・ほかのトラックのソロで鳴っていない。帯を薄く出す
	silent: boolean;
	// 目盛りの線の間隔（拍）。小節の線と拍の線
	barStep: number;
	beatStep: number;
	onClipPointerDown: ( e: ReactPointerEvent, track: number, clip: number, part: ClipPart ) => void;
	onLanePointerDown: ( e: ReactPointerEvent ) => void;
	onLaneDoubleClick: ( clientX: number, track: number ) => void;
};

// 1つの帯の描き方。index はトラックの帯の並びでの番号
type ClipLayout = {
	index: number;
	clip: MusicClipRange;
	sounding: BeatRange[];
	// 帯の範囲に始まるノート（曲の頭からの拍）
	notes: ClipNoteMark[];
};

// 帯のノートを曲の頭からの拍に置き直す。帯の範囲（中の時間の始まり〜帯の終わり）に始まるものだけ
const clipNoteMarks = ( clip: MusicClipRange ): ClipNoteMark[] => {

	const marks: ClipNoteMark[] = [];

	if ( ! clip.notes ) return marks;

	let noteBeat = 0;

	for ( const note of clip.notes ) {

		noteBeat += note[ 0 ];

		const start = clip.start + noteBeat - clip.offset;

		if ( start < clip.start || start >= clip.end ) continue;

		marks.push( { start, end: Math.min( start + note[ 1 ], clip.end ), pitch: note[ 2 ] } );

	}

	return marks;

};

// 帯ごとに鳴らしている区間を求め、勝つ帯が手前になる順に並べる
const layoutClips = ( data: MusicClipData[] ): ClipLayout[] => {

	const clips = decodeClips( data );
	const segments = resolveClipSegments( clips );
	const layouts: ClipLayout[] = [];

	for ( let i = 0; i < clips.length; i ++ ) {

		const clip = clips[ i ];
		const sounding: BeatRange[] = [];

		for ( const segment of segments ) {

			if ( segment.clip !== i ) continue;

			sounding.push( { start: segment.start, end: segment.end } );

		}

		layouts.push( { index: i, clip, sounding, notes: clipNoteMarks( clip ) } );

	}

	// 重なった所は後に始まる帯（同じ開始なら並びの後ろ）が鳴るので、その順に後ろへ並べて手前に描く。
	// 帯は行の高さいっぱいに描くので、下の帯の重なった部分は隠れて押せない
	layouts.sort( ( a, b ) => {

		if ( a.clip.start !== b.clip.start ) return a.clip.start - b.clip.start;

		return a.index - b.index;

	} );

	return layouts;

};

// 目盛りの線の背景。小節の線と、拡大したときだけ拍の線を引く（barStep / beatStep は拍。beatStep が 0 なら拍の線なし）。
// トラックの行の下の空き（MusicTimeline）も同じ線を引き、行が終わった所で線が途切れないようにする
export const laneGridStyle = ( viewStart: number, pxPerBeat: number, barStep: number, beatStep: number ): CSSProperties => {

	const offsetPx = - viewStart * pxPerBeat;

	const backgroundImage = [ "linear-gradient(to right, var(--or-bg-hover) 1px, transparent 1px)" ];
	const backgroundSize = [ `${barStep * pxPerBeat}px 100%` ];
	const backgroundPosition = [ `${offsetPx}px 0` ];

	if ( beatStep > 0 ) {

		backgroundImage.push( "linear-gradient(to right, var(--or-bg-active) 1px, transparent 1px)" );
		backgroundSize.push( `${beatStep * pxPerBeat}px 100%` );
		backgroundPosition.push( `${offsetPx}px 0` );

	}

	return { backgroundImage: backgroundImage.join( "," ), backgroundSize: backgroundSize.join( "," ), backgroundPosition: backgroundPosition.join( "," ), backgroundRepeat: "repeat-x" };

};

// 1トラックの帯を並べるレーン。何もない所のダブルクリックで帯を置く
export const MusicLane = ( props: MusicLaneProps ) => {

	const layouts = useMemo( () => layoutClips( props.clips ), [ props.clips ] );

	const onPointerDown = ( e: ReactPointerEvent<HTMLDivElement> ) => {

		if ( e.target !== e.currentTarget ) return;

		props.onLanePointerDown( e );

	};

	const onDoubleClick = ( e: MouseEvent<HTMLDivElement> ) => {

		if ( e.target !== e.currentTarget ) return;

		props.onLaneDoubleClick( e.clientX, props.track );

	};

	const clipElms = [];

	for ( const layout of layouts ) {

		const key = clipKey( props.track, layout.index );

		let notes: ClipNoteMark[] | null = null;

		if ( props.showNotes ) notes = layout.notes;

		clipElms.push( <MusicClip
			key={key}
			start={layout.clip.start}
			end={layout.clip.end}
			viewStart={props.viewStart}
			pxPerBeat={props.pxPerBeat}
			laneWidth={props.laneWidth}
			selected={props.selection.keys.has( key )}
			active={props.selection.active === key}
			sounding={layout.sounding}
			waveform={props.waveform}
			notes={notes}
			onPointerDown={( e, part ) => props.onClipPointerDown( e, props.track, layout.index, part )}
		/> );

	}

	const gridStyle = laneGridStyle( props.viewStart, props.pxPerBeat, props.barStep, props.beatStep );

	return <div
		className={style.lane}
		data-silent={props.silent}
		style={gridStyle}
		onPointerDown={onPointerDown}
		onDoubleClick={onDoubleClick}
	>
		{clipElms}
	</div>;

};
