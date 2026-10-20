import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

import { trackPointerDrag } from "uipower";

import { useOREditor } from "../../../hooks/useOREditor";
import { moveTrack, uniqueTrackName, updateTrack } from "../lib/clipEdit";

import type { Music } from "../../../../../../builtin/Components/Utility/Music";
import type { MusicTrackData } from "../../../../../../builtin/Components/Utility/Music/instrument";

// トラックの行の要素に付ける、その行のトラックの番号の属性（MusicTimeline の行と一致させる）
export const TRACK_INDEX_ATTRIBUTE = "data-music_track";

// 音量・パンのような数値を、InputNumber のドラッグの間は beginEdit で undo 1回にまとめて書く
type NumberEdit = {
	set: ( index: number, update: { volume?: number, pan?: number } ) => void;
	begin: () => void;
	end: () => void;
};

// Music パネルのトラックの見出しの編集（名前・音量・パン・楽器・追加・削除・並べ替え）。どれも EditorAPI を通して undo 1回
export const useMusicTrackEditing = ( music: Music, tracks: MusicTrackData[] ) => {

	const { editor } = useOREditor();

	const commit = ( next: MusicTrackData[] ) => {

		editor.api.setField( music, "tracks", next, { merge: false } );

	};

	/*-------------------------------
		Fields
	-------------------------------*/

	const numberEditRef = useRef<ReturnType<typeof editor.api.beginEdit> | null>( null );

	const numberEdit: NumberEdit = {
		set: ( index, update ) => {

			const next = updateTrack( tracks, index, update );

			if ( numberEditRef.current ) {

				numberEditRef.current.set( next );

			} else {

				commit( next );

			}

		},
		begin: () => {

			numberEditRef.current = editor.api.beginEdit( music, "tracks" );

		},
		end: () => {

			if ( numberEditRef.current ) {

				numberEditRef.current.commit();
				numberEditRef.current = null;

			}

		},
	};

	// 名前を変える。空なら変えず、ほかのトラックとぶつかったら番号を振る
	const rename = ( index: number, name: string ) => {

		const trimmed = name.trim();

		if ( trimmed === "" || trimmed === tracks[ index ][ 0 ] ) return;

		commit( updateTrack( tracks, index, { name: uniqueTrackName( tracks, trimmed, index ) } ) );

	};

	// 楽器を変える。帯とノートは残す（ノートの楽器からコードの楽器に変えても、ノートは鳴らないまま残り、戻せば鳴る）
	const changeInstrument = ( index: number, instrument: string ) => {

		commit( updateTrack( tracks, index, { instrument } ) );

	};

	const remove = ( index: number ) => {

		const next = tracks.slice();
		next.splice( index, 1 );

		commit( next );

	};

	// 楽器を選んでトラックを足す。名前は楽器名（ぶつかったら番号を振る）
	const add = ( instrument: string ) => {

		const next = tracks.slice();
		next.push( [ uniqueTrackName( tracks, instrument, - 1 ), instrument, 1, 0, []] );

		commit( next );

	};

	/*-------------------------------
		Reorder
	-------------------------------*/

	// ドラッグ中に落とすと移る先の行。null は無し
	const [ dropTarget, setDropTarget ] = useState<number | null>( null );

	// ポインタの下の行のトラックの番号。行の外なら null
	const findTrackIndex = ( x: number, y: number ) => {

		const element = document.elementFromPoint( x, y );

		if ( ! element ) return null;

		const row = element.closest( `[${TRACK_INDEX_ATTRIBUTE}]` );

		if ( ! row ) return null;

		return Number( row.getAttribute( TRACK_INDEX_ATTRIBUTE ) );

	};

	// 見出しのドラッグで並べ替える。離した行の位置へ移す（Hierarchy の行のドラッグと同じく、落とす先の行を枠で示す）
	const onHeadPointerDown = ( e: ReactPointerEvent, index: number ) => {

		if ( e.button !== 0 ) return;

		// 見出しの中の入力欄・ボタンは、それぞれの操作に任せる
		if ( ( e.target as HTMLElement ).closest( "button, input" ) ) return;

		let target: number | null = null;

		trackPointerDrag( e, {
			onMove: ( _dx, _dy, ev ) => {

				target = findTrackIndex( ev.clientX, ev.clientY );

				if ( target === index ) target = null;

				setDropTarget( target );

			},
			onEnd: ( dragged ) => {

				setDropTarget( null );

				if ( ! dragged || target === null ) return;

				commit( moveTrack( tracks, index, target ) );

			},
			onCancel: () => {

				setDropTarget( null );

			},
		} );

	};

	return { numberEdit, rename, changeInstrument, remove, add, dropTarget, onHeadPointerDown };

};
