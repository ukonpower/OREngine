import { useEffect, useMemo, useRef, useState, type MouseEvent, type PointerEvent as ReactPointerEvent } from "react";

import { trackPointerDrag } from "uipower";

import { useOREditor } from "../../../hooks/useOREditor";
import { decodeTracks, encodeTracks, setActiveNotes } from "../lib/clipEdit";
import { addNote, copyNotes, decodeNotes, deleteNotes, duplicateNotes, EditNote, encodeNotes, moveNotes, NoteClipboard, notesInRect, pasteNotes, quantizeNotes, resizeNotes, shiftVelocity, snapBeat, snapDelta } from "../lib/noteEdit";

import type { Music } from "../../../../../../builtin/Components/Utility/Music";
import type { MusicNoteData, MusicTrackData } from "../../../../../../builtin/Components/Utility/Music/instrument";
import type { EditAreaActions } from "../../../../../lib/Editor";

// ノートのどこを押したか。右端は長さを変える取っ手
export type NotePart = "body" | "right";

// 矩形選択の範囲。帯の中の拍と音高
export type NoteBoxRect = {
	startBeat: number;
	endBeat: number;
	lowPitch: number;
	highPitch: number;
};

// 小節の拍の数（4/4 固定。MusicRuler の BEATS_PER_BAR と同じ）
const BEATS_PER_BAR = 4;

// まだ1つも置いていないときに置くノートの長さ（拍）と強さ
const DEFAULT_NOTE_LENGTH = 0.25;
const DEFAULT_VELOCITY = 1;

// グリッドが「なし」のときに ← / → で動かす量（拍）。1/16
const FREE_ARROW_STEP = 0.25;

// コピーしたノート。帯をまたいで貼れるよう、パネル（帯）ごとではなく1つを持つ
let noteClipboard: NoteClipboard | null = null;

type NoteEditingOptions = {
	music: Music;
	tracks: MusicTrackData[];
	// 開いている帯の clipKey（tracks の中の帯を指す）
	activeKey: string;
	notes: MusicNoteData[];
	// グリッドの1目（拍）。0 はグリッドなし
	grid: number;
	// 表示の 1 拍あたりの px と、1つの音高の行の高さ（px）。ドラッグの量を拍・半音に直す
	pxPerBeat: number;
	keyHeight: number;
	// ポインタの位置の、帯の中の拍と音高
	beatAt: ( clientX: number ) => number;
	pitchAt: ( clientY: number ) => number;
	// 今の再生位置の、帯の中の拍（Ctrl+V の貼り付け先）
	playheadBeat: () => number;
	// その高さの1音を鳴らす。clipBeat は鳴らす所の帯の中の拍
	preview: ( pitch: number, velocity: number, clipBeat: number ) => void;
};

// ピアノロールのノートの選択と編集。編集はどれも EditorAPI を通し、ドラッグは beginEdit で undo 1回にまとめる。
// 選択はノートの番号（並べ直した後の番号へ付け替える）で持ち、開く帯が変わったら MusicRoll が key で作り直す
export const useMusicNoteEditing = ( options: NoteEditingOptions ) => {

	const { editor } = useOREditor();
	const { music, tracks, activeKey, notes, grid, pxPerBeat, keyHeight, beatAt, pitchAt } = options;

	const [ selection, setSelection ] = useState<Set<number>>( () => new Set() );
	const [ box, setBox ] = useState<NoteBoxRect | null>( null );

	// 直前に置いたノートの長さ。次のダブルクリックで同じ長さのノートを置く
	const lastLengthRef = useRef( DEFAULT_NOTE_LENGTH );

	const decode = ( keys: Set<number> ) => {

		return decodeNotes( notes, keys );

	};

	// ノートを tracks に戻した表と、並べ直した後の選択
	const encode = ( next: EditNote[] ) => {

		const encoded = encodeNotes( next );
		const clips = setActiveNotes( decodeTracks( tracks, new Set(), activeKey ), encoded.notes );

		return { tracks: encodeTracks( tracks, clips ).tracks, selection: encoded.selection };

	};

	// 編集したノートを確定する（undo 1回）
	const commit = ( next: EditNote[] ) => {

		const encoded = encode( next );

		editor.api.setField( music, "tracks", encoded.tracks, { merge: false } );
		setSelection( encoded.selection );

	};

	const selectedNotes = () => {

		return decode( selection );

	};

	/*-------------------------------
		Pointer
	-------------------------------*/

	// ノートを押したところから、選び方を決めてドラッグ（動かす・長さ・Alt でコピーして動かす）を追う
	const onNotePointerDown = ( e: ReactPointerEvent, index: number, part: NotePart ) => {

		if ( e.button !== 0 ) return;

		e.stopPropagation();

		const wasSelected = selection.has( index );

		let keys = selection;

		if ( e.shiftKey ) {

			keys = new Set( keys );

			if ( wasSelected ) {

				keys.delete( index );

			} else {

				keys.add( index );

			}

		} else if ( ! wasSelected ) {

			keys = new Set( [ index ] );

		}

		setSelection( keys );

		// Shift で外したノートは動かさない
		if ( e.shiftKey && wasSelected ) return;

		const base = decode( keys );
		const grabbed = base[ index ];

		options.preview( grabbed.pitch, grabbed.velocity, grabbed.start );

		const copy = e.altKey && part === "body";
		const shiftKey = e.shiftKey;
		const edit = editor.api.beginEdit( music, "tracks" );

		let lastSemitones = 0;

		trackPointerDrag( e, {
			onMove: ( dx, dy ) => {

				const raw = dx / pxPerBeat;

				let next: EditNote[];

				// グリッドに吸着させるのは押したノートの端。選んだほかのノートも同じ量だけ動く
				if ( part === "right" ) {

					next = resizeNotes( base, snapDelta( grabbed.start + grabbed.length, raw, grid ), grid );

				} else {

					const semitones = Math.round( - dy / Math.max( keyHeight, 1 ) );

					next = moveNotes( base, snapDelta( grabbed.start, raw, grid ), semitones, copy );

					// 高さを変えたら、その高さで鳴らし直す（DAW と同じく、置く音を耳で探せるように）
					if ( semitones !== lastSemitones ) {

						lastSemitones = semitones;
						options.preview( grabbed.pitch + semitones, grabbed.velocity, grabbed.start );

					}

				}

				if ( part === "right" ) {

					for ( const note of next ) {

						if ( note.selected ) lastLengthRef.current = note.length;

					}

				}

				const encoded = encode( next );

				edit.set( encoded.tracks );
				setSelection( encoded.selection );

			},
			onEnd: ( dragged ) => {

				if ( dragged ) {

					edit.commit();

					return;

				}

				// 選んでいたノートを動かさずに離したら、そのノートだけを選び直す（押した時点では選択ごと動かせるよう残している）
				if ( wasSelected && ! shiftKey ) {

					setSelection( new Set( [ index ] ) );

				}

			},
			onCancel: () => {

				edit.cancel();
				setSelection( keys );

			},
		} );

	};

	// 何もない所を押したら選択を外し（Shift なら残す）、そこからのドラッグで矩形選択する
	const onGridPointerDown = ( e: ReactPointerEvent ) => {

		if ( e.button !== 0 ) return;

		const additive = e.shiftKey;
		const initial = selection;

		if ( ! additive ) {

			setSelection( new Set() );

		}

		const startBeat = beatAt( e.clientX );
		const startPitch = pitchAt( e.clientY );
		const startX = e.clientX;
		const startY = e.clientY;
		const base = decode( new Set() );

		trackPointerDrag( e, {
			onMove: ( dx, dy ) => {

				const endBeat = beatAt( startX + dx );
				const endPitch = pitchAt( startY + dy );

				const rect: NoteBoxRect = {
					startBeat: Math.min( startBeat, endBeat ),
					endBeat: Math.max( startBeat, endBeat ),
					lowPitch: Math.min( startPitch, endPitch ),
					highPitch: Math.max( startPitch, endPitch ),
				};

				const keys = notesInRect( base, rect.startBeat, rect.endBeat, rect.lowPitch, rect.highPitch );

				if ( additive ) {

					for ( const key of initial ) {

						keys.add( key );

					}

				}

				setBox( rect );
				setSelection( keys );

			},
			onEnd: () => {

				setBox( null );

			},
			onCancel: () => {

				setBox( null );
				setSelection( initial );

			},
		} );

	};

	// ノートのダブルクリックで消す
	const onNoteDoubleClick = ( e: MouseEvent, index: number ) => {

		e.stopPropagation();

		commit( deleteNotes( decode( new Set( [ index ] ) ) ) );

	};

	// 何もない所のダブルクリックで、押した拍（グリッドの手前の目）・高さに、直前に置いたノートと同じ長さのノートを置く
	const onGridDoubleClick = ( e: MouseEvent ) => {

		const start = Math.max( 0, snapBeat( beatAt( e.clientX ), grid, 'floor' ) );
		const pitch = pitchAt( e.clientY );

		commit( addNote( decode( new Set() ), start, lastLengthRef.current, pitch, DEFAULT_VELOCITY ) );
		options.preview( pitch, DEFAULT_VELOCITY, start );

	};

	// Velocity の段の棒を押したところから、上下のドラッグで強さを変える。選んでいるノートが複数なら、そろって増減する
	const onVelocityPointerDown = ( e: ReactPointerEvent, index: number, laneHeight: number ) => {

		if ( e.button !== 0 ) return;

		e.stopPropagation();

		let keys = selection;

		if ( e.shiftKey ) {

			keys = new Set( keys );
			keys.add( index );

		} else if ( ! selection.has( index ) ) {

			keys = new Set( [ index ] );

		}

		setSelection( keys );

		const base = decode( keys );
		const edit = editor.api.beginEdit( music, "tracks" );

		trackPointerDrag( e, {
			onMove: ( _dx, dy ) => {

				const encoded = encode( shiftVelocity( base, - dy / Math.max( laneHeight, 1 ) ) );

				edit.set( encoded.tracks );
				setSelection( encoded.selection );

			},
			onEnd: ( dragged ) => {

				if ( dragged ) edit.commit();

			},
			onCancel: () => {

				edit.cancel();
				setSelection( keys );

			},
		} );

	};

	/*-------------------------------
		Keyboard
	-------------------------------*/

	// 編集領域のキー（DAW に揃えた割り当て）。消費したら true
	const handleKeyDown = ( e: KeyboardEvent ) => {

		const cmd = e.ctrlKey || e.metaKey;
		const hasSelection = selection.size > 0;

		if ( ( e.key === "Delete" || e.key === "Backspace" ) && ! cmd ) {

			if ( hasSelection ) commit( deleteNotes( selectedNotes() ) );

			return true;

		}

		if ( cmd && ! e.shiftKey && ! e.altKey ) {

			if ( e.code === "KeyD" ) {

				// ブラウザのブックマークの割り当てを止める
				e.preventDefault();

				if ( hasSelection ) commit( duplicateNotes( selectedNotes(), BEATS_PER_BAR ) );

				return true;

			}

			if ( e.code === "KeyA" ) {

				// ページの文字の全選択を止める
				e.preventDefault();

				const keys = new Set<number>();

				for ( let i = 0; i < notes.length; i ++ ) {

					keys.add( i );

				}

				setSelection( keys );

				return true;

			}

			if ( e.code === "KeyC" ) {

				if ( hasSelection ) noteClipboard = copyNotes( selectedNotes() );

				return true;

			}

			if ( e.code === "KeyV" ) {

				if ( noteClipboard ) {

					const at = Math.max( 0, snapBeat( options.playheadBeat(), grid, 'floor' ) );

					commit( pasteNotes( decode( new Set() ), noteClipboard, at ) );

				}

				return true;

			}

		}

		if ( cmd || e.altKey ) return false;

		if ( e.code === "KeyQ" && ! e.shiftKey ) {

			if ( hasSelection && grid > 0 ) commit( quantizeNotes( selectedNotes(), grid ) );

			return true;

		}

		// 矢印は選んでいるノートがあるときだけ受ける（無ければタイムラインのコマ送りへ渡す）
		if ( ! hasSelection ) return false;

		if ( e.key === "ArrowUp" || e.key === "ArrowDown" ) {

			e.preventDefault();

			let semitones = 1;

			if ( e.shiftKey ) semitones = 12;

			if ( e.key === "ArrowDown" ) semitones = - semitones;

			commit( moveNotes( selectedNotes(), 0, semitones, false ) );

			return true;

		}

		if ( ( e.key === "ArrowLeft" || e.key === "ArrowRight" ) && ! e.shiftKey ) {

			e.preventDefault();

			let step = grid;

			if ( step <= 0 ) step = FREE_ARROW_STEP;

			if ( e.key === "ArrowLeft" ) step = - step;

			commit( moveNotes( selectedNotes(), step, 0, false ) );

			return true;

		}

		return false;

	};

	// 編集領域は Editor に参照で登録するので、1つの入れ物を使い回し、中身だけを今のレンダーのものにする
	const handleKeyDownRef = useRef( handleKeyDown );
	handleKeyDownRef.current = handleKeyDown;

	const editArea = useMemo<EditAreaActions>( () => {

		return {
			handleKeyDown: ( e ) => handleKeyDownRef.current( e ),
			deselect: () => setSelection( new Set() ),
		};

	}, [] );

	useEffect( () => {

		return () => {

			editor.leaveEditArea( editArea );

		};

	}, [ editor, editArea ] );

	const onPointerEnter = () => {

		editor.enterEditArea( editArea );

	};

	const onPointerLeave = () => {

		editor.leaveEditArea( editArea );

	};

	return {
		selection,
		box,
		onNotePointerDown,
		onNoteDoubleClick,
		onGridPointerDown,
		onGridDoubleClick,
		onVelocityPointerDown,
		onPointerEnter,
		onPointerLeave,
	};

};
