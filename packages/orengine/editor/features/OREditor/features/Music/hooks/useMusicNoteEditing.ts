import { useEffect, useMemo, useRef, useState, type MouseEvent, type PointerEvent as ReactPointerEvent } from "react";

import { trackPointerDrag } from "uipower";

import { useOREditor } from "../../../hooks/useOREditor";
import { decodeTracks, encodeTracks, setActiveNotes } from "../lib/clipEdit";
import { addNote, copyNotes, decodeNotes, deleteNotes, duplicateNotes, EditNote, encodeNotes, moveNotes, NoteClipboard, notesInRect, pasteNotes, quantizeNotes, resizeNotes, snapBeat, snapDelta } from "../lib/noteEdit";

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

// まだ1つも置いていないときに置くノートの長さ（拍）
const DEFAULT_NOTE_LENGTH = 0.25;

// グリッドが「なし」のときに ← / → で動かす量（拍）。1/16
const FREE_ARROW_STEP = 0.25;

// コピーしたノート。帯をまたいで貼れるよう、パネル（帯）ごとではなく1つを持つ
let noteClipboard: NoteClipboard | null = null;

// macOS の Ctrl+クリックはブラウザが右クリック扱いにしてメニューを出すので、macOS では Cmd でノートを置く
const IS_MAC = typeof navigator !== "undefined" && navigator.userAgent.includes( "Mac" );

// ノートを置く修飾キー（macOS は Cmd、ほかは Ctrl）を押しているか
const hasPlaceModifier = ( e: { ctrlKey: boolean, metaKey: boolean } ) => {

	if ( IS_MAC ) return e.metaKey;

	return e.ctrlKey;

};

// 置き先を出す・置くときのポインタの位置
type PointerPos = {
	x: number;
	y: number;
};

// 修飾キーを押している間に出す、置き先のノート（帯の中の拍・長さと音高）
export type NoteGhost = {
	start: number;
	length: number;
	pitch: number;
};

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
	preview: ( pitch: number, clipBeat: number ) => void;
};

// ピアノロールのノートの選択と編集。編集はどれも EditorAPI を通し、ドラッグは beginEdit で undo 1回にまとめる。
// 選択はノートの番号（並べ直した後の番号へ付け替える）で持ち、開く帯が変わったら MusicRoll が key で作り直す
export const useMusicNoteEditing = ( options: NoteEditingOptions ) => {

	const { editor } = useOREditor();
	const { music, tracks, activeKey, notes, grid, pxPerBeat, keyHeight, beatAt, pitchAt } = options;

	const [ selection, setSelection ] = useState<Set<number>>( () => new Set() );
	const [ box, setBox ] = useState<NoteBoxRect | null>( null );

	// 直前に置いた・長さを変えたノートの長さ。次に置くノートを同じ長さにする
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

		options.preview( grabbed.pitch, grabbed.start );

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
						options.preview( grabbed.pitch + semitones, grabbed.start );

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

	// 何もない所を押したら選択を外し（Shift なら残す）、そこからのドラッグで矩形選択する。修飾キーを押していればそこにノートを置く
	const onGridPointerDown = ( e: ReactPointerEvent ) => {

		if ( e.button !== 0 ) return;

		if ( hasPlaceModifier( e ) ) {

			e.preventDefault();

			placeNote( e.clientX, e.clientY );

			// 置いたノートの上に置き先が重ならないよう、次にノートの外へ動くまで出さない
			hoverRef.current = null;
			setPlaceAt( null );

			return;

		}

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

	// 何もない所のダブルクリックでノートを置く。修飾キーを押していれば1回目のクリックで置いているので何もしない
	// （2回目のクリックは置いたノートの上で、ここで消すと置いてすぐ消えるため）
	const onGridDoubleClick = ( e: MouseEvent ) => {

		if ( hasPlaceModifier( e ) ) return;

		placeNote( e.clientX, e.clientY );

	};

	/*-------------------------------
		Place
	-------------------------------*/

	// ポインタの位置に置くノート。時刻はグリッドの手前の目、高さはポインタの行、長さは直前に置いた・長さを変えたノートと同じ
	const ghostAt = ( pos: PointerPos ): NoteGhost => {

		return {
			start: Math.max( 0, snapBeat( beatAt( pos.x ), grid, 'floor' ) ),
			length: lastLengthRef.current,
			pitch: pitchAt( pos.y ),
		};

	};

	const placeNote = ( clientX: number, clientY: number ) => {

		const ghost = ghostAt( { x: clientX, y: clientY } );

		commit( addNote( decode( new Set() ), ghost.start, ghost.length, ghost.pitch ) );
		options.preview( ghost.pitch, ghost.start );
		lastGhostPitchRef.current = ghost.pitch;

	};

	// グリッドの上（ノートの上を除く）のポインタの位置。動かすたびに描き直さないよう ref で持ち、置き先を出すときだけ state に写す
	const hoverRef = useRef<PointerPos | null>( null );
	const [ placeAt, setPlaceAt ] = useState<PointerPos | null>( null );

	// 最後に置き先を出した高さ。置き先を出し始めたとき（null から）と、押したまま高さが変わったときに鳴らす
	const lastGhostPitchRef = useRef<number | null>( null );

	// 修飾キーとポインタの位置から、置き先を出すか決める。出し始めたときと高さが変わったときに、その高さで鳴らす
	const updateGhost = ( held: boolean ) => {

		const hover = hoverRef.current;

		if ( ! held || ! hover ) {

			setPlaceAt( null );

			if ( ! held ) lastGhostPitchRef.current = null;

			return;

		}

		setPlaceAt( hover );

		const ghost = ghostAt( hover );
		const lastPitch = lastGhostPitchRef.current;

		if ( lastPitch !== ghost.pitch ) {

			options.preview( ghost.pitch, ghost.start );

		}

		lastGhostPitchRef.current = ghost.pitch;

	};

	// グリッドの上でポインタが動いた。overNote はノートの上か（ノートの上では置き先を出さない）
	const onGridPointerMove = ( e: ReactPointerEvent, overNote: boolean ) => {

		if ( overNote ) {

			hoverRef.current = null;

		} else {

			hoverRef.current = { x: e.clientX, y: e.clientY };

		}

		updateGhost( hasPlaceModifier( e ) );

	};

	const onGridPointerLeave = () => {

		hoverRef.current = null;
		setPlaceAt( null );

	};

	// 動かさずに修飾キーを押した・離したときにも置き先を出し入れする。window で受けるのは、Editor の編集領域へ渡るキーに修飾キーそのものが来るとは限らないため
	const updateGhostRef = useRef( updateGhost );
	updateGhostRef.current = updateGhost;

	useEffect( () => {

		const onKey = ( e: KeyboardEvent ) => {

			updateGhostRef.current( hasPlaceModifier( e ) );

		};

		// 押したままほかのウィンドウへ移ると keyup が来ないので、フォーカスが外れたら離した扱いにする
		const onBlur = () => {

			updateGhostRef.current( false );

		};

		window.addEventListener( "keydown", onKey );
		window.addEventListener( "keyup", onKey );
		window.addEventListener( "blur", onBlur );

		return () => {

			window.removeEventListener( "keydown", onKey );
			window.removeEventListener( "keyup", onKey );
			window.removeEventListener( "blur", onBlur );

		};

	}, [] );

	let ghost: NoteGhost | null = null;

	if ( placeAt ) ghost = ghostAt( placeAt );

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
		ghost,
		onNotePointerDown,
		onNoteDoubleClick,
		onGridPointerDown,
		onGridPointerMove,
		onGridPointerLeave,
		onGridDoubleClick,
		onPointerEnter,
		onPointerLeave,
	};

};
