import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

import { trackPointerDrag } from "uipower";

import { useOREditor } from "../../../hooks/useOREditor";
import { addClip, clipKey, decodeTracks, deleteSelected, duplicateSelected, EditClip, encodeTracks, moveSelected, resizeSelected, setActiveParam, trimSelected } from "../lib/clipEdit";

import type { Music } from "../../../../../../builtin/Components/Utility/Music";
import type { MusicTrackData } from "../../../../../../builtin/Components/Utility/Music/instrument";
import type { EditAreaActions } from "../../../../../lib/Editor";

// 帯のどこを押したか。左端・右端は長さを変える取っ手
export type ClipPart = "body" | "left" | "right";

// 選んでいる帯（clipKey の文字列）と、開いている帯
export type ClipSelection = {
	keys: Set<string>;
	active: string | null;
};

// 何もない所のダブルクリックで、まだ1つも置いていないときに置く帯の長さ（拍）。1小節
const DEFAULT_CLIP_LENGTH = 4;

const EMPTY_SELECTION: ClipSelection = { keys: new Set(), active: null };

// 開いている帯の長さ。見つからなければ fallback
const activeLength = ( clipsByTrack: EditClip[][], fallback: number ) => {

	for ( const clips of clipsByTrack ) {

		for ( const clip of clips ) {

			if ( clip.active ) return clip.length;

		}

	}

	return fallback;

};

type ClipEditingOptions = {
	music: Music;
	tracks: MusicTrackData[];
	// 表示の 1 拍あたりの px。ドラッグの量を拍に直す
	pxPerBeat: number;
	// ポインタの X（clientX）の、曲の頭からの拍
	beatAt: ( clientX: number ) => number;
};

// Music パネルの帯の選択と編集。編集はどれも EditorAPI を通し、ドラッグは beginEdit で undo 1回にまとめる。
// シーンを読み直すと Music が作り直され、パネルが key で作り直すので、選択も前のシーンの帯を指したまま残らない
export const useMusicClipEditing = ( options: ClipEditingOptions ) => {

	const { editor } = useOREditor();
	const { music, tracks, pxPerBeat, beatAt } = options;

	const [ selection, setSelection ] = useState<ClipSelection>( EMPTY_SELECTION );

	// 直前に置いた帯の長さ。次のダブルクリックで同じ長さの帯を置く
	const lastLengthRef = useRef( DEFAULT_CLIP_LENGTH );

	const decode = () => {

		return decodeTracks( tracks, selection.keys, selection.active );

	};

	// 編集した帯を確定する（undo 1回）。並べ直した後の選択に付け替える
	const commitClips = ( clips: EditClip[][] ) => {

		const encoded = encodeTracks( tracks, clips );

		editor.api.setField( music, "tracks", encoded.tracks, { merge: false } );
		setSelection( { keys: encoded.selection, active: encoded.active } );

	};

	/*-------------------------------
		Pointer
	-------------------------------*/

	// 帯を押したところから、選び方を決めてドラッグ（動かす・長さ・頭を削る・Alt でコピーして動かす）を追う
	const onClipPointerDown = ( e: ReactPointerEvent, track: number, clip: number, part: ClipPart ) => {

		if ( e.button !== 0 ) return;

		// レーンの何もない所を押したときの選択の解除まで届かせない
		e.stopPropagation();

		const key = clipKey( track, clip );
		const wasSelected = selection.keys.has( key );

		let keys = selection.keys;

		if ( e.shiftKey ) {

			keys = new Set( keys );

			if ( wasSelected ) {

				keys.delete( key );

			} else {

				keys.add( key );

			}

		} else if ( ! wasSelected ) {

			keys = new Set( [ key ] );

		}

		// Shift で外した帯は動かさない。開いている帯は残っている選択のどれかに任せず外す
		if ( e.shiftKey && wasSelected ) {

			let active = selection.active;

			if ( active === key ) active = null;

			setSelection( { keys, active } );

			return;

		}

		const pressedSelection: ClipSelection = { keys, active: key };

		setSelection( pressedSelection );

		const base = decodeTracks( tracks, keys, key );
		const grabbed = base[ track ][ clip ];
		const grabbedEnd = grabbed.start + grabbed.length;
		const copy = e.altKey && part === "body";
		const shiftKey = e.shiftKey;
		const edit = editor.api.beginEdit( music, "tracks" );

		trackPointerDrag( e, {
			onMove: ( dx ) => {

				const raw = dx / pxPerBeat;

				let next: EditClip[][];

				// 1拍のグリッドに吸着させるのは押した帯の端。選んだほかの帯も同じ拍数だけ動く
				if ( part === "right" ) {

					next = resizeSelected( base, Math.round( grabbedEnd + raw ) - grabbedEnd );

				} else if ( part === "left" ) {

					next = trimSelected( base, Math.round( grabbed.start + raw ) - grabbed.start );

				} else {

					next = moveSelected( base, Math.round( grabbed.start + raw ) - grabbed.start, copy );

				}

				// 長さを変えた帯は、次にダブルクリックで置く帯の長さにする（直前に置いた帯を伸ばしてから続けて置けるように）
				if ( part !== "body" ) {

					lastLengthRef.current = activeLength( next, grabbed.length );

				}

				const encoded = encodeTracks( tracks, next );

				edit.set( encoded.tracks );
				setSelection( { keys: encoded.selection, active: encoded.active } );

			},
			onEnd: ( dragged ) => {

				if ( dragged ) {

					edit.commit();

					return;

				}

				// 選んでいた帯を動かさずに離したら、その帯だけを選び直す（押した時点では選択ごと動かせるよう残している）
				if ( wasSelected && ! shiftKey ) {

					setSelection( { keys: new Set( [ key ] ), active: key } );

				}

			},
			onCancel: () => {

				edit.cancel();
				setSelection( pressedSelection );

			},
		} );

	};

	// レーンの何もない所を押したら選択を外す（Shift のときは足し引きの途中なので残す）
	const onLanePointerDown = ( e: ReactPointerEvent ) => {

		if ( e.button !== 0 || e.shiftKey ) return;

		setSelection( EMPTY_SELECTION );

	};

	// 何もない所のダブルクリックで、押した拍（1拍に切り捨て）に直前に置いた帯と同じ長さの帯を置く
	const onLaneDoubleClick = ( clientX: number, track: number ) => {

		const start = Math.max( 0, Math.floor( beatAt( clientX ) ) );

		commitClips( addClip( decode(), track, start, lastLengthRef.current ) );

	};

	/*-------------------------------
		Keyboard
	-------------------------------*/

	// 編集領域のキー。Delete / Backspace で消し、Ctrl+D（macOS は Cmd+D）で選んだ帯をすぐ後ろへ並べる
	const handleKeyDown = ( e: KeyboardEvent ) => {

		const cmd = e.ctrlKey || e.metaKey;

		if ( ( e.key === "Delete" || e.key === "Backspace" ) && ! cmd ) {

			if ( selection.keys.size > 0 ) {

				commitClips( deleteSelected( decode() ) );

			}

			return true;

		}

		if ( e.code === "KeyD" && cmd && ! e.shiftKey && ! e.altKey ) {

			// ブラウザのブックマークの割り当てを止める
			e.preventDefault();

			if ( selection.keys.size > 0 ) {

				commitClips( duplicateSelected( decode() ) );

			}

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

	/*-------------------------------
		Params
	-------------------------------*/

	// 開いている帯の数値。InputNumber のドラッグの間は beginEdit で undo 1回にまとめる
	const paramEditRef = useRef<ReturnType<typeof editor.api.beginEdit> | null>( null );

	const setParam = ( index: number, value: number ) => {

		const encoded = encodeTracks( tracks, setActiveParam( decode(), index, value ) );

		if ( paramEditRef.current ) {

			paramEditRef.current.set( encoded.tracks );

		} else {

			editor.api.setField( music, "tracks", encoded.tracks, { merge: false } );

		}

	};

	const beginParamDrag = () => {

		paramEditRef.current = editor.api.beginEdit( music, "tracks" );

	};

	const endParamDrag = () => {

		if ( paramEditRef.current ) {

			paramEditRef.current.commit();
			paramEditRef.current = null;

		}

	};

	return {
		selection,
		onClipPointerDown,
		onLanePointerDown,
		onLaneDoubleClick,
		onPointerEnter,
		onPointerLeave,
		setParam,
		beginParamDrag,
		endParamDrag,
	};

};
