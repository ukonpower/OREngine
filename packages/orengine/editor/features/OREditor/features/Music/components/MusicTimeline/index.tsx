import { useEffect, useMemo, useRef, useState, type MouseEvent, type PointerEvent as ReactPointerEvent } from 'react';

import { Engine } from 'orengine';
import { Button, InputNumber, Menu, MenuItem, trackPointerDrag, usePopover } from 'uipower';

import { decodeClips } from '../../../../../../../builtin/Components/Utility/Music/clips';
import { INSTRUMENT_KIND, instrumentSoundKind } from '../../../../../../../builtin/Components/Utility/Music/instrument';
import { useOREditor } from '../../../../hooks/useOREditor';
import { useViewWheel } from '../../../../hooks/useViewWheel';
import { dragZoomFactor, hasZoomModifier } from '../../../../lib/viewGesture';
import { useSerializableField } from '../../../SerializableField/hooks/useSerializableProps';
import { useElementWidth } from '../../hooks/useElementWidth';
import { useMusicClipEditing } from '../../hooks/useMusicClipEditing';
import { TRACK_INDEX_ATTRIBUTE, useMusicTrackEditing } from '../../hooks/useMusicTrackEditing';
import { useMusicView } from '../../hooks/useMusicView';
import { MusicNotePreview } from '../../lib/notePreview';
import { ClipWaveform } from '../MusicClip';
import { MusicClipParams } from '../MusicClipParams';
import { MusicLane } from '../MusicLane';
import { MusicPlayhead } from '../MusicPlayhead';
import { MusicRoll } from '../MusicRoll';
import { BEATS_PER_BAR, MusicRuler } from '../MusicRuler';
import { MusicTrackHead, TrackKind } from '../MusicTrackHead';

import style from './index.module.scss';

import type { Music } from '../../../../../../../builtin/Components/Utility/Music';
import type { Instrument, MusicTrackData } from '../../../../../../../builtin/Components/Utility/Music/instrument';

// 小節の番号どうしの間をこれより詰めない（px）。詰まるときは2小節・4小節…ごとに出す
const MIN_LABEL_SPACING = 48;

// 1拍がこれより広く見えるときだけ、拍の線も引く（px）
const MIN_BEAT_LINE_SPACING = 12;

const EMPTY_TRACKS: MusicTrackData[] = [];

// 楽器の .glsl がどちらの音色の関数を書いているかで、トラックの鳴らし方を決める（トラックの側に種類は持たない）
const trackKind = ( instrumentName: string ): TrackKind => {

	const instrument = Engine.resources.getLibraryItem<Instrument>( INSTRUMENT_KIND, instrumentName );

	if ( ! instrument ) return null;

	const kind = instrumentSoundKind( instrument.shader );

	if ( kind === "note" || kind === "code" ) return kind;

	return null;

};

// 小節の番号を出す間隔（小節）。2 の累乗で、間が MIN_LABEL_SPACING より広くなる最小のもの
const labelStepBars = ( pxPerBeat: number ) => {

	let bars = 1;

	while ( bars * BEATS_PER_BAR * pxPerBeat < MIN_LABEL_SPACING && bars < 1024 ) {

		bars *= 2;

	}

	return bars;

};

// Music パネルのタイムライン。左にトラックの見出し、右に帯を並べ、上に小節の目盛り、下に開いている帯の数値を出す
export const MusicTimeline = ( props: { music: Music } ) => {

	const { editor, engine } = useOREditor();
	const { music } = props;

	const [ tracksValue ] = useSerializableField<MusicTrackData[]>( music, "tracks" );
	const [ bpmValue ] = useSerializableField<number>( music, "bpm" );
	const [ durationValue ] = useSerializableField<number>( engine, "timeline/duration" );

	const tracks = tracksValue || EMPTY_TRACKS;
	const bpm = bpmValue || 1;

	// timeline/duration の単位は秒×60
	const songBeats = ( durationValue || 0 ) / 60 * bpm / 60;

	/*-------------------------------
		View
	-------------------------------*/

	const { view, viewRef, setView, zoom, scroll } = useMusicView( 0, songBeats );

	const mainRef = useRef<HTMLDivElement>( null );
	const bodyRef = useRef<HTMLDivElement>( null );
	const rulerRef = useRef<HTMLDivElement>( null );
	const laneWidth = useElementWidth( rulerRef );

	const pxPerBeat = Math.max( laneWidth, 1 ) / Math.max( view.end - view.start, 1e-6 );

	// ポインタの X の、曲の頭からの拍。目盛りとレーンは同じ左端・同じ幅
	const beatAt = ( clientX: number ) => {

		const ruler = rulerRef.current;

		if ( ! ruler ) return 0;

		const rect = ruler.getBoundingClientRect();

		return viewRef.current.start + ( clientX - rect.left ) / pxPerBeat;

	};

	// wheel: 横（拍）はパン・拡大縮小、縦は行のスクロール（Timeline と同じ読み替え）
	useViewWheel( mainRef, ( gesture, e ) => {

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
	const onMainPointerDown = ( e: ReactPointerEvent<HTMLDivElement> ) => {

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

	// 目盛りを押した位置へ再生位置を合わせ、ドラッグで追う
	const onRulerPointerDown = ( e: ReactPointerEvent<HTMLDivElement> ) => {

		if ( e.button !== 0 ) return;

		const seek = ( clientX: number ) => {

			const beat = Math.max( 0, beatAt( clientX ) );

			// 時刻の単位は秒×60
			engine.seek( beat * 60 / bpm * 60 );

		};

		const startX = e.clientX;

		seek( startX );

		trackPointerDrag( e, {
			onMove: ( dx ) => seek( startX + dx ),
			onEnd: () => {},
		} );

	};

	/*-------------------------------
		Waveform
	-------------------------------*/

	// 生成した音が届くたびに波形を描き直す。かたまりごとに届くので、1フレームに1回へまとめる
	const [ peaksVersion, setPeaksVersion ] = useState( 0 );

	useEffect( () => {

		let frame = 0;

		const onUpdate = () => {

			if ( frame ) return;

			frame = requestAnimationFrame( () => {

				frame = 0;
				setPeaksVersion( ( v ) => v + 1 );

			} );

		};

		engine.on( "update/music", onUpdate );

		return () => {

			engine.off( "update/music", onUpdate );

			if ( frame ) cancelAnimationFrame( frame );

		};

	}, [ engine ] );

	const trackCount = tracks.length;

	const waveforms = useMemo( () => {

		const result: ( ClipWaveform | null )[] = [];
		const peaks = editor.musicTrackPeaks;

		for ( let i = 0; i < trackCount; i ++ ) {

			const trackPeaks = peaks.get( i );

			if ( ! trackPeaks ) {

				result.push( null );

				continue;

			}

			let peakMax = 0;

			for ( let p = 0; p < trackPeaks.length; p ++ ) {

				peakMax = Math.max( peakMax, trackPeaks[ p ] );

			}

			if ( peakMax <= 0 ) {

				result.push( null );

				continue;

			}

			result.push( { peaks: trackPeaks, peakMax, sampleRate: peaks.sampleRate, bpm, version: peaksVersion } );

		}

		return result;

	}, [ editor, trackCount, bpm, peaksVersion ] );

	/*-------------------------------
		Preview
	-------------------------------*/

	// 試聴の生成（シェーダーのコンパイル）はロールで初めて鳴らすときに用意し、パネルを閉じたら捨てる
	const previewRef = useRef<MusicNotePreview | null>( null );

	useEffect( () => {

		return () => {

			if ( previewRef.current ) {

				previewRef.current.dispose();
				previewRef.current = null;

			}

		};

	}, [] );

	const previewNote: MusicNotePreview[ "play" ] = ( request ) => {

		if ( ! previewRef.current ) {

			previewRef.current = new MusicNotePreview( engine );

		}

		previewRef.current.play( request );

	};

	/*-------------------------------
		Editing
	-------------------------------*/

	const kinds: TrackKind[] = [];
	const noteTracks: boolean[] = [];

	for ( const track of tracks ) {

		const kind = trackKind( track[ 1 ] );

		kinds.push( kind );
		noteTracks.push( kind === "note" );

	}

	const clipEditing = useMusicClipEditing( { music, tracks, pxPerBeat, beatAt, noteTracks } );
	const trackEditing = useMusicTrackEditing( music, tracks );

	const instrumentNames = Engine.resources.getLibraryItemNames( INSTRUMENT_KIND );

	const { open: openPopover, closeAll } = usePopover();

	const onClickAdd = ( e: MouseEvent<HTMLButtonElement> ) => {

		const items: MenuItem[] = [];

		for ( const name of instrumentNames ) {

			items.push( {
				label: name,
				onClick: () => {

					trackEditing.add( name );
					closeAll();

				},
			} );

		}

		const rect = e.currentTarget.getBoundingClientRect();

		openPopover( <Menu title="Add Track" items={items} />, { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom } );

	};

	// BPM。InputNumber のドラッグの間は undo 1回にまとめる
	const bpmEditRef = useRef<ReturnType<typeof editor.api.beginEdit> | null>( null );

	const onChangeBpm = ( value: number ) => {

		if ( bpmEditRef.current ) {

			bpmEditRef.current.set( value );

			return;

		}

		editor.api.setField( music, "bpm", value, { merge: false } );

	};

	const onBpmDragStart = () => {

		bpmEditRef.current = editor.api.beginEdit( music, "bpm" );

	};

	const onBpmDragEnd = () => {

		if ( bpmEditRef.current ) {

			bpmEditRef.current.commit();
			bpmEditRef.current = null;

		}

	};

	/*-------------------------------
		Render
	-------------------------------*/

	const labelBars = labelStepBars( pxPerBeat );

	let beatStep = 0;

	if ( pxPerBeat >= MIN_BEAT_LINE_SPACING ) beatStep = 1;

	const rows = [];

	for ( let i = 0; i < tracks.length; i ++ ) {

		const track = tracks[ i ];
		const kind = kinds[ i ];

		// コードの帯は生成した音の波形、ノートの帯はノートの縮図を描く
		let waveform: ClipWaveform | null = null;

		if ( kind === "code" ) waveform = waveforms[ i ];

		const rowAttributes = { [ TRACK_INDEX_ATTRIBUTE ]: i };

		rows.push( <div key={i} className={style.row} {...rowAttributes}>
			<div className={style.row_head}>
				<MusicTrackHead
					name={track[ 0 ]}
					instrument={track[ 1 ]}
					kind={kind}
					volume={track[ 2 ]}
					pan={track[ 3 ]}
					instrumentNames={instrumentNames}
					dropTarget={trackEditing.dropTarget === i}
					onPointerDown={( e ) => trackEditing.onHeadPointerDown( e, i )}
					onRename={( name ) => trackEditing.rename( i, name )}
					onChangeNumber={( update ) => trackEditing.numberEdit.set( i, update )}
					onNumberDragStart={trackEditing.numberEdit.begin}
					onNumberDragEnd={trackEditing.numberEdit.end}
					onChangeInstrument={( instrument ) => trackEditing.changeInstrument( i, instrument )}
					onDelete={() => trackEditing.remove( i )}
				/>
			</div>
			<MusicLane
				track={i}
				clips={track[ 4 ] || []}
				viewStart={view.start}
				pxPerBeat={pxPerBeat}
				laneWidth={laneWidth}
				selection={clipEditing.selection}
				waveform={waveform}
				showNotes={kind === "note"}
				barStep={labelBars * BEATS_PER_BAR}
				beatStep={beatStep}
				onClipPointerDown={clipEditing.onClipPointerDown}
				onLanePointerDown={clipEditing.onLanePointerDown}
				onLaneDoubleClick={clipEditing.onLaneDoubleClick}
			/>
		</div> );

	}

	// 開いている帯の数値の欄（楽器が数値に名前を付けているときだけ）と、ノートの帯ならピアノロール
	let paramsElm = null;
	let rollElm = null;
	const active = clipEditing.selection.active;

	if ( active ) {

		const parts = active.split( ":" );
		const trackIndex = Number( parts[ 0 ] );
		const clipIndex = Number( parts[ 1 ] );
		const track = tracks[ trackIndex ];

		if ( track ) {

			const instrument = Engine.resources.getLibraryItem<Instrument>( INSTRUMENT_KIND, track[ 1 ] );
			const clip = decodeClips( track[ 4 ] || [] )[ clipIndex ];

			if ( instrument && instrument.params && instrument.params.length > 0 && clip ) {

				paramsElm = <MusicClipParams
					trackName={track[ 0 ]}
					names={instrument.params}
					values={clip.params}
					onChange={clipEditing.setParam}
					onDragStart={clipEditing.beginParamDrag}
					onDragEnd={clipEditing.endParamDrag}
				/>;

			}

			if ( clip && kinds[ trackIndex ] === "note" ) {

				const preview = ( pitch: number, velocity: number, clipBeat: number ) => {

					previewNote( { instrument: track[ 1 ], pitch, velocity, bpm, params: clip.params, clipBeat, volume: track[ 2 ], pan: track[ 3 ] } );

				};

				// 開く帯が変わったら選択・表示範囲ごと作り直す
				rollElm = <MusicRoll
					key={active}
					music={music}
					tracks={tracks}
					activeKey={active}
					clip={clip}
					bpm={bpm}
					trackName={track[ 0 ]}
					preview={preview}
				/>;

			}

		}

	}

	// 曲の終わりより後ろは鳴らないので暗くする
	const songEndX = ( songBeats - view.start ) * pxPerBeat;

	let outsideElm = null;

	if ( songEndX < laneWidth ) {

		outsideElm = <div className={style.outside} style={{ '--x': `${Math.max( 0, songEndX )}px` } as React.CSSProperties} />;

	}

	return <div className={style.timeline}>
		<div
			ref={mainRef}
			className={style.main}
			onPointerEnter={clipEditing.onPointerEnter}
			onPointerLeave={clipEditing.onPointerLeave}
			onPointerDown={onMainPointerDown}
		>
			<div className={style.header}>
				<div className={style.corner}>
					<span className={style.corner_label}>BPM</span>
					<div className={style.corner_input}>
						<InputNumber value={bpm} min={1} step={1} onChange={onChangeBpm} onDragStart={onBpmDragStart} onDragEnd={onBpmDragEnd} />
					</div>
				</div>
				<MusicRuler ref={rulerRef} viewStart={view.start} viewEnd={view.end} pxPerBeat={pxPerBeat} labelBars={labelBars} onPointerDown={onRulerPointerDown} />
			</div>
			<div ref={bodyRef} className={style.body}>
				{rows}
				<div className={style.add}>
					<Button square title="Add Track" onClick={onClickAdd}>+</Button>
				</div>
			</div>
			{outsideElm}
			<MusicPlayhead bpm={bpm} viewStart={view.start} pxPerBeat={pxPerBeat} laneWidth={laneWidth} />
		</div>
		{paramsElm}
		{rollElm}
	</div>;

};
