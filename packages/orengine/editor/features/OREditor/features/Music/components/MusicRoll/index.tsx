import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';

import { InputSelect, trackPointerDrag, type SelectOption } from 'uipower';

import { useOREditor } from '../../../../hooks/useOREditor';
import { useViewWheel } from '../../../../hooks/useViewWheel';
import { dragZoomFactor, hasZoomModifier } from '../../../../lib/viewGesture';
import { useSerializableField } from '../../../SerializableField/hooks/useSerializableProps';
import { useElementWidth } from '../../hooks/useElementWidth';
import { NotePart, useMusicNoteEditing } from '../../hooks/useMusicNoteEditing';
import { useMusicView } from '../../hooks/useMusicView';
import { decodeNotes, PITCH_COUNT } from '../../lib/noteEdit';
import { MusicPlayhead } from '../MusicPlayhead';
import { BEATS_PER_BAR, MusicRuler } from '../MusicRuler';

import style from './index.module.scss';

import type { Music } from '../../../../../../../builtin/Components/Utility/Music';
import type { MusicClip } from '../../../../../../../builtin/Components/Utility/Music/clips';
import type { MusicNoteData, MusicTrackData } from '../../../../../../../builtin/Components/Utility/Music/instrument';

// グリッドの選択肢。値は1小節を何分割するか（editor.json の music/grid）で、0 はグリッドなし。3連符は入れない
const GRID_OPTIONS: SelectOption[] = [
	{ label: '1/4', value: 4 },
	{ label: '1/8', value: 8 },
	{ label: '1/16', value: 16 },
	{ label: '1/32', value: 32 },
	{ label: 'None', value: 0 },
];

// editor.json に書かれていないときのグリッド（1/16）
const DEFAULT_GRID_DIVISION = 16;

// 小節の番号どうし・グリッドの線どうしの間をこれより詰めない（px）
const MIN_LABEL_SPACING = 48;
const MIN_LINE_SPACING = 6;

// 鍵盤の黒鍵（オクターブの中の番号。0 が C）
const BLACK_KEYS = new Set( [ 1, 3, 6, 8, 10 ] );

// 開いたときに真ん中に見せる高さ。ノートが無い帯は C4
const DEFAULT_CENTER_PITCH = 60;

const EMPTY_NOTES: MusicNoteData[] = [];

// 小節の番号を出す間隔（小節）。2 の累乗で、間が MIN_LABEL_SPACING より広くなる最小のもの
const labelStepBars = ( pxPerBeat: number ) => {

	let bars = 1;

	while ( bars * BEATS_PER_BAR * pxPerBeat < MIN_LABEL_SPACING && bars < 1024 ) {

		bars *= 2;

	}

	return bars;

};

// MIDI の音高の名前（C4 = 60）。鍵盤の C にだけ出す
const pitchLabel = ( pitch: number ) => {

	return `C${Math.floor( pitch / 12 ) - 1}`;

};

type MusicRollProps = {
	music: Music;
	tracks: MusicTrackData[];
	// 開いている帯の clipKey と、曲の頭からの拍に置き直した帯
	activeKey: string;
	clip: MusicClip;
	bpm: number;
	trackName: string;
	// その高さの1音を鳴らす。clipBeat は鳴らす所の帯の中の拍
	preview: ( pitch: number, velocity: number, clipBeat: number ) => void;
};

// Music パネルの下半分。開いている帯1つのピアノロールと Velocity の段。横は帯の中の時間、縦は音の高さ。
// 帯の外は斜線で、そこにあるノートは鳴らない
export const MusicRoll = ( props: MusicRollProps ) => {

	const { editor, engine } = useOREditor();
	const { clip, bpm } = props;

	let notes = EMPTY_NOTES;

	if ( clip.notes ) notes = clip.notes;

	const [ divisionValue, setDivision ] = useSerializableField<number>( editor, "music/grid" );

	let division = DEFAULT_GRID_DIVISION;

	if ( divisionValue !== undefined ) division = Number( divisionValue );

	// グリッドの1目（拍）。1/4 = 1拍
	let grid = 0;

	if ( division > 0 ) grid = BEATS_PER_BAR / division;

	/*-------------------------------
		View
	-------------------------------*/

	// 初めは帯の中の時間のうち、帯が鳴らしている範囲を見せる
	const { view, viewRef, setView, zoom, scroll } = useMusicView( clip.offset, clip.end - clip.start );

	const rootRef = useRef<HTMLDivElement>( null );
	const bodyRef = useRef<HTMLDivElement>( null );
	const rulerRef = useRef<HTMLDivElement>( null );
	const contentRef = useRef<HTMLDivElement>( null );
	const velocityRef = useRef<HTMLDivElement>( null );
	const laneWidth = useElementWidth( rulerRef );

	const pxPerBeat = Math.max( laneWidth, 1 ) / Math.max( view.end - view.start, 1e-6 );

	// 1つの音高の行の高さ（px）。行の高さは scss のトークンで決まるので、並べた全体の高さから測る
	const [ keyHeight, setKeyHeight ] = useState( 1 );

	useEffect( () => {

		const content = contentRef.current;

		if ( ! content ) return;

		const measure = () => {

			setKeyHeight( Math.max( 1, content.clientHeight / PITCH_COUNT ) );

		};

		const observer = new ResizeObserver( measure );
		observer.observe( content );
		measure();

		return () => {

			observer.disconnect();

		};

	}, [] );

	// 開いたときに、ノートの高さの真ん中（ノートが無ければ C4）を縦の真ん中に見せる。
	// 開いたとき（帯が変わると key で作り直される）だけ合わせるので、そのときのノートを ref で持つ
	const openedNotesRef = useRef( notes );

	useLayoutEffect( () => {

		const body = bodyRef.current;
		const content = contentRef.current;

		if ( ! body || ! content ) return;

		let low = Infinity;
		let high = - Infinity;

		for ( const note of decodeNotes( openedNotesRef.current, new Set() ) ) {

			low = Math.min( low, note.pitch );
			high = Math.max( high, note.pitch );

		}

		let center = DEFAULT_CENTER_PITCH;

		if ( low <= high ) center = ( low + high ) / 2;

		const rowHeight = content.clientHeight / PITCH_COUNT;

		body.scrollTop = ( PITCH_COUNT - 1 - center ) * rowHeight - body.clientHeight / 2;

	}, [] );

	// ポインタの位置の、帯の中の拍と音高
	const beatAt = ( clientX: number ) => {

		const ruler = rulerRef.current;

		if ( ! ruler ) return 0;

		return viewRef.current.start + ( clientX - ruler.getBoundingClientRect().left ) / pxPerBeat;

	};

	const pitchAt = ( clientY: number ) => {

		const content = contentRef.current;

		if ( ! content ) return DEFAULT_CENTER_PITCH;

		const row = Math.floor( ( clientY - content.getBoundingClientRect().top ) / keyHeight );

		return Math.min( PITCH_COUNT - 1, Math.max( 0, PITCH_COUNT - 1 - row ) );

	};

	// 帯の中の拍 ↔ 曲の頭からの拍
	const songBeatOf = ( clipBeat: number ) => {

		return clip.start + clipBeat - clip.offset;

	};

	// 今の再生位置の、帯の中の拍。タイムラインの時刻の単位は秒×60
	const playheadBeat = () => {

		const songBeat = engine.frame.current / 60 * bpm / 60;

		return songBeat - clip.start + clip.offset;

	};

	// wheel: 横（拍）はパン・拡大縮小、縦は音高のスクロール（Timeline と同じ読み替え）
	useViewWheel( rootRef, ( gesture, e ) => {

		e.preventDefault();

		const ruler = rulerRef.current;
		const body = bodyRef.current;

		if ( ! ruler || ! body ) return;

		const rect = ruler.getBoundingClientRect();
		const width = Math.max( 1, rect.width );

		if ( gesture.type === "pan" ) {

			if ( gesture.x !== 0 ) scroll( gesture.x / width );
			if ( gesture.y !== 0 ) body.scrollTop += gesture.y;

			return;

		}

		if ( gesture.x !== 1 ) {

			zoom( gesture.x, ( e.clientX - rect.left ) / width );

		}

	} );

	// 中ボタンのドラッグで横にパン、Ctrl（Cmd）なら横に拡大縮小する。ずれで動かすので Pointer Lock を取る
	const onRootPointerDown = ( e: ReactPointerEvent<HTMLDivElement> ) => {

		if ( e.button !== 1 ) return;

		e.preventDefault();

		const ruler = rulerRef.current;

		if ( ! ruler ) return;

		const rect = ruler.getBoundingClientRect();
		const anchor = ( e.clientX - rect.left ) / Math.max( 1, rect.width );
		const startView = viewRef.current;
		const zoomDrag = hasZoomModifier( e );

		let lastDx = 0;

		trackPointerDrag( e, {
			lock: true,
			onMove: ( dx ) => {

				if ( zoomDrag ) {

					zoom( dragZoomFactor( lastDx - dx ), anchor );
					lastDx = dx;

					return;

				}

				const beats = dx / pxPerBeat;

				setView( { start: startView.start - beats, end: startView.end - beats } );

			},
			onEnd: () => {},
		} );

	};

	// 目盛りを押した位置（帯の中の時間）へ再生位置を合わせ、ドラッグで追う
	const onRulerPointerDown = ( e: ReactPointerEvent<HTMLDivElement> ) => {

		if ( e.button !== 0 ) return;

		const seek = ( clientX: number ) => {

			const songBeat = Math.max( 0, songBeatOf( beatAt( clientX ) ) );

			engine.seek( songBeat * 60 / bpm * 60 );

		};

		const startX = e.clientX;

		seek( startX );

		trackPointerDrag( e, {
			onMove: ( dx ) => seek( startX + dx ),
			onEnd: () => {},
		} );

	};

	/*-------------------------------
		Editing
	-------------------------------*/

	const editing = useMusicNoteEditing( {
		music: props.music,
		tracks: props.tracks,
		activeKey: props.activeKey,
		notes,
		grid,
		pxPerBeat,
		keyHeight,
		beatAt,
		pitchAt,
		playheadBeat,
		preview: props.preview,
	} );

	const onGridPointerDown = ( e: ReactPointerEvent<HTMLDivElement> ) => {

		const noteElm = ( e.target as HTMLElement ).closest( '[data-music_note]' );

		if ( ! noteElm ) {

			editing.onGridPointerDown( e );

			return;

		}

		let part: NotePart = "body";

		if ( ( e.target as HTMLElement ).closest( '[data-music_note_handle]' ) ) part = "right";

		editing.onNotePointerDown( e, Number( noteElm.getAttribute( 'data-music_note' ) ), part );

	};

	const onGridPointerMove = ( e: ReactPointerEvent<HTMLDivElement> ) => {

		const overNote = ( e.target as HTMLElement ).closest( '[data-music_note]' ) !== null;

		editing.onGridPointerMove( e, overNote );

	};

	const onGridDoubleClick = ( e: React.MouseEvent<HTMLDivElement> ) => {

		const noteElm = ( e.target as HTMLElement ).closest( '[data-music_note]' );

		if ( noteElm ) {

			editing.onNoteDoubleClick( e, Number( noteElm.getAttribute( 'data-music_note' ) ) );

			return;

		}

		editing.onGridDoubleClick( e );

	};

	const onVelocityPointerDown = ( e: ReactPointerEvent<HTMLDivElement> ) => {

		const bar = ( e.target as HTMLElement ).closest( '[data-music_velocity]' );
		const lane = velocityRef.current;

		if ( ! bar || ! lane ) return;

		editing.onVelocityPointerDown( e, Number( bar.getAttribute( 'data-music_velocity' ) ), lane.clientHeight );

	};

	const onKeyPointerDown = ( e: ReactPointerEvent, pitch: number ) => {

		if ( e.button !== 0 ) return;

		props.preview( pitch, 1, clip.offset );

	};

	/*-------------------------------
		Render
	-------------------------------*/

	const xOf = ( beat: number ) => {

		return ( beat - view.start ) * pxPerBeat;

	};

	const keyElms = [];
	const rowElms = [];

	for ( let row = 0; row < PITCH_COUNT; row ++ ) {

		const pitch = PITCH_COUNT - 1 - row;
		const black = BLACK_KEYS.has( pitch % 12 );

		let label = null;

		if ( pitch % 12 === 0 ) label = <span className={style.key_label}>{pitchLabel( pitch )}</span>;

		keyElms.push( <div key={pitch} className={style.key} data-black={black} onPointerDown={( e ) => onKeyPointerDown( e, pitch )}>{label}</div> );
		rowElms.push( <div key={pitch} className={style.row} data-black={black} data-octave={pitch % 12 === 0} /> );

	}

	const decoded = decodeNotes( notes, editing.selection );
	const clipEnd = clip.offset + clip.end - clip.start;

	const noteElms = [];
	const velocityElms = [];

	for ( let i = 0; i < decoded.length; i ++ ) {

		const note = decoded[ i ];
		const left = xOf( note.start );
		const width = Math.max( 1, note.length * pxPerBeat );

		if ( left + width < 0 || left > laneWidth ) continue;

		// 帯の外（中の時間の始まりより前・帯の終わりより後）に始まるノートは鳴らない
		const outside = note.start < clip.offset || note.start >= clipEnd;
		const rowStyle = { left, width, '--row': PITCH_COUNT - 1 - note.pitch } as React.CSSProperties;

		noteElms.push( <div key={i} className={style.note} style={rowStyle} data-music_note={i} data-selected={note.selected} data-outside={outside}>
			<div className={style.note_handle} data-music_note_handle />
		</div> );

		const velocityStyle = { left, '--velocity': note.velocity } as React.CSSProperties;

		velocityElms.push( <div key={i} className={style.velocity_bar} style={velocityStyle} data-music_velocity={i} data-selected={note.selected}>
			<div className={style.velocity_fill} />
		</div> );

	}

	// 帯の外の斜線
	const outsideElms = [];
	const clipLeft = xOf( clip.offset );
	const clipRight = xOf( clipEnd );

	if ( clipLeft > 0 ) {

		outsideElms.push( <div key="before" className={style.outside} style={{ left: 0, width: Math.min( clipLeft, laneWidth ) }} /> );

	}

	if ( clipRight < laneWidth ) {

		const left = Math.max( 0, clipRight );

		outsideElms.push( <div key="after" className={style.outside} style={{ left, width: laneWidth - left }} /> );

	}

	let boxElm = null;

	if ( editing.box ) {

		const box = editing.box;
		const boxStyle = {
			left: xOf( box.startBeat ),
			width: ( box.endBeat - box.startBeat ) * pxPerBeat,
			'--row': PITCH_COUNT - 1 - box.highPitch,
			'--rows': box.highPitch - box.lowPitch + 1,
		} as React.CSSProperties;

		boxElm = <div className={style.box} style={boxStyle} />;

	}

	// 修飾キーを押している間の置き先
	let ghostElm = null;

	if ( editing.ghost ) {

		const ghost = editing.ghost;
		const ghostStyle = {
			left: xOf( ghost.start ),
			width: Math.max( 1, ghost.length * pxPerBeat ),
			'--row': PITCH_COUNT - 1 - ghost.pitch,
		} as React.CSSProperties;

		ghostElm = <div className={style.ghost} style={ghostStyle} />;

	}

	// 縦の線。小節・拍・グリッドの目を、間が詰まりすぎない細かさまで背景で引く
	const labelBars = labelStepBars( pxPerBeat );
	const offsetPx = - view.start * pxPerBeat;
	const lineSteps = [ labelBars * BEATS_PER_BAR ];

	if ( pxPerBeat >= MIN_LINE_SPACING ) lineSteps.push( 1 );
	if ( grid > 0 && grid < 1 && grid * pxPerBeat >= MIN_LINE_SPACING ) lineSteps.push( grid );

	const backgroundImage = [];
	const backgroundSize = [];
	const backgroundPosition = [];
	const lineColors = [ "var(--or-bg-hover)", "var(--or-bg-active)", "var(--or-bg-surface)" ];

	for ( let i = 0; i < lineSteps.length; i ++ ) {

		backgroundImage.push( `linear-gradient(to right, ${lineColors[ i ]} 1px, transparent 1px)` );
		backgroundSize.push( `${lineSteps[ i ] * pxPerBeat}px 100%` );
		backgroundPosition.push( `${offsetPx}px 0` );

	}

	const linesStyle = { backgroundImage: backgroundImage.join( "," ), backgroundSize: backgroundSize.join( "," ), backgroundPosition: backgroundPosition.join( "," ) };

	return <div
		ref={rootRef}
		className={style.roll}
		onPointerEnter={editing.onPointerEnter}
		onPointerLeave={editing.onPointerLeave}
		onPointerDown={onRootPointerDown}
	>
		<div className={style.header}>
			<div className={style.corner}>
				<span className={style.corner_label} title={props.trackName}>Grid</span>
				<div className={style.corner_input}>
					<InputSelect value={division} selectList={GRID_OPTIONS} onChange={( v ) => setDivision( Number( v ) )} />
				</div>
			</div>
			<MusicRuler ref={rulerRef} viewStart={view.start} viewEnd={view.end} pxPerBeat={pxPerBeat} labelBars={labelBars} onPointerDown={onRulerPointerDown} />
		</div>
		<div ref={bodyRef} className={style.body}>
			<div ref={contentRef} className={style.content}>
				<div className={style.keys}>{keyElms}</div>
				<div
					className={style.grid}
					onPointerDown={onGridPointerDown}
					onPointerMove={onGridPointerMove}
					onPointerLeave={editing.onGridPointerLeave}
					onDoubleClick={onGridDoubleClick}
				>
					{rowElms}
					<div className={style.lines} style={linesStyle} />
					{outsideElms}
					{noteElms}
					{ghostElm}
					{boxElm}
				</div>
			</div>
		</div>
		<div className={style.velocity}>
			<div className={style.velocity_label}>Velocity</div>
			<div ref={velocityRef} className={style.velocity_lane} onPointerDown={onVelocityPointerDown}>
				{velocityElms}
			</div>
		</div>
		<MusicPlayhead bpm={bpm} viewStart={songBeatOf( view.start )} pxPerBeat={pxPerBeat} laneWidth={laneWidth} />
	</div>;

};
