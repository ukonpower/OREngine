import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

import { trackPointerDrag } from "uipower";

import { isTrackAudible } from "../../../../../../builtin/Components/Utility/Music/monitor";
import { useOREditor } from "../../../hooks/useOREditor";
import { useSerializableField } from "../../SerializableField/hooks/useSerializableProps";
import { moveTrack, uniqueTrackName, updateTrack } from "../lib/clipEdit";

import type { Music } from "../../../../../../builtin/Components/Utility/Music";
import type { MusicTrackData } from "../../../../../../builtin/Components/Utility/Music/instrument";

// トラックの行の要素に付ける、その行のトラックの番号の属性（MusicTimeline の行と一致させる）
export const TRACK_INDEX_ATTRIBUTE = "data-music_track";

// 音量・パンのような数値を、スライダーのドラッグの間は beginEdit で undo 1回にまとめて書く
type NumberEdit = {
	set: ( index: number, update: { volume?: number, pan?: number } ) => void;
	begin: () => void;
	end: () => void;
	cancel: () => void;
};

const NO_NAMES: string[] = [];

// names から name を除いた並び
const withoutName = ( names: string[], name: string ) => {

	const next: string[] = [];

	for ( const n of names ) {

		if ( n !== name ) next.push( n );

	}

	return next;

};

// Music パネルのトラックの見出しの編集（名前・音量・パン・楽器・追加・削除・並べ替え）。どれも EditorAPI を通して undo 1回。
// ミュート・ソロは聴き比べのための editor.json の状態なので、undo には載せない
export const useMusicTrackEditing = ( music: Music, tracks: MusicTrackData[] ) => {

	const { editor } = useOREditor();

	const [ muteValue, setMute ] = useSerializableField<string[]>( editor, "music/mute" );
	const [ soloValue, setSolo ] = useSerializableField<string[]>( editor, "music/solo" );

	const mute = muteValue || NO_NAMES;
	const solo = soloValue || NO_NAMES;

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
		cancel: () => {

			if ( numberEditRef.current ) {

				numberEditRef.current.cancel();
				numberEditRef.current = null;

			}

		},
	};

	/*-------------------------------
		Mute / Solo
	-------------------------------*/

	// トラックの状態。silent はミュート・ほかのトラックのソロで鳴っていないこと
	const monitorState = ( index: number ) => {

		const name = tracks[ index ][ 0 ];

		return {
			muted: mute.includes( name ),
			soloed: solo.includes( name ),
			silent: ! isTrackAudible( { mute, solo }, tracks, name ),
		};

	};

	const toggleMute = ( index: number ) => {

		const name = tracks[ index ][ 0 ];

		if ( mute.includes( name ) ) {

			setMute( withoutName( mute, name ) );

		} else {

			setMute( [ ...mute, name ] );

		}

	};

	// ソロはそのトラックだけを鳴らす（押すたびに聴くトラックが切り替わる）。additive（Ctrl / Cmd）ならソロに足し引きする
	const toggleSolo = ( index: number, additive: boolean ) => {

		const name = tracks[ index ][ 0 ];

		if ( solo.includes( name ) ) {

			setSolo( withoutName( solo, name ) );

		} else if ( additive ) {

			setSolo( [ ...solo, name ] );

		} else {

			setSolo( [ name ] );

		}

	};

	// ミュート・ソロはトラック名で持つので、名前の変更・削除に合わせて付け替える
	// （そのままだと名前を変えたトラックの状態が外れ、後から同じ名前で足したトラックに残りが付く）
	const replaceMonitorName = ( from: string, to: string | null ) => {

		if ( mute.includes( from ) ) {

			const next = withoutName( mute, from );

			if ( to !== null ) next.push( to );

			setMute( next );

		}

		if ( solo.includes( from ) ) {

			const next = withoutName( solo, from );

			if ( to !== null ) next.push( to );

			setSolo( next );

		}

	};

	// 名前を変える。空なら変えず、ほかのトラックとぶつかったら番号を振る
	const rename = ( index: number, name: string ) => {

		const trimmed = name.trim();
		const current = tracks[ index ][ 0 ];

		if ( trimmed === "" || trimmed === current ) return;

		const next = uniqueTrackName( tracks, trimmed, index );

		commit( updateTrack( tracks, index, { name: next } ) );
		replaceMonitorName( current, next );

	};

	// 楽器を変える。帯とノートは残す（ノートの楽器からコードの楽器に変えても、ノートは鳴らないまま残り、戻せば鳴る）
	const changeInstrument = ( index: number, instrument: string ) => {

		commit( updateTrack( tracks, index, { instrument } ) );

	};

	const remove = ( index: number ) => {

		const name = tracks[ index ][ 0 ];
		const next = tracks.slice();
		next.splice( index, 1 );

		commit( next );
		replaceMonitorName( name, null );

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
		if ( ( e.target as HTMLElement ).closest( "button, input, [role=slider]" ) ) return;

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

	return { numberEdit, rename, changeInstrument, remove, add, monitorState, toggleMute, toggleSolo, dropTarget, onHeadPointerDown };

};
