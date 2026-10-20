// Music パネルの帯の編集。tracks を曲の頭からの拍の帯に置き直して編集し、保存の形（開始は前の帯からの差分）に戻す。
// どの関数も元の表を書き換えず、新しい表を返す（undo の SetFieldCommand が前の表をそのまま持つため）
import type { MusicClipData, MusicNoteData, MusicTrackData } from '../../../../../../builtin/Components/Utility/Music/instrument';

// 編集の間だけ使う帯
export type EditClip = {
	start: number;
	length: number;
	offset: number;
	params: number[];
	// ノートの帯だけが持つ（#274）。編集では中身に触れずに持ち回る
	notes: MusicNoteData[] | null;
	selected: boolean;
	// 開いている帯（最後に選んだ帯）。#274 のロールと帯の数値の欄はこの帯を相手にする
	active: boolean;
};

// 帯の指し方。トラックの番号と、そのトラックの帯の並びでの番号
export type ClipRef = {
	track: number;
	clip: number;
};

// 選択（Set）に入れる帯の文字列
export const clipKey = ( track: number, clip: number ) => {

	return `${track}:${clip}`;

};

// 帯の長さの下限（拍）。グリッドの1拍
const MIN_CLIP_LENGTH = 1;

/*-------------------------------
	Decode / Encode
-------------------------------*/

// tracks の帯を、トラックごとの編集用の帯に置き直す。selection に入っている帯は selected、active の帯は active にする
export const decodeTracks = ( tracks: MusicTrackData[], selection: Set<string>, active: string | null ): EditClip[][] => {

	const result: EditClip[][] = [];

	for ( let t = 0; t < tracks.length; t ++ ) {

		const clips: EditClip[] = [];
		const data = tracks[ t ][ 4 ] || [];

		let start = 0;

		for ( let c = 0; c < data.length; c ++ ) {

			const clip = data[ c ];

			start += clip[ 0 ];

			let params: number[] = [];

			if ( clip[ 3 ] ) {

				params = clip[ 3 ];

			}

			let notes: MusicNoteData[] | null = null;

			if ( clip[ 4 ] ) {

				notes = clip[ 4 ];

			}

			const key = clipKey( t, c );

			clips.push( { start, length: clip[ 1 ], offset: clip[ 2 ], params, notes, selected: selection.has( key ), active: key === active } );

		}

		result.push( clips );

	}

	return result;

};

// 末尾の 0 の数値を落とす（書かなかった数値は 0 なので、JSON を短くできる）
const trimParams = ( params: number[] ) => {

	let count = params.length;

	while ( count > 0 && ! params[ count - 1 ] ) {

		count --;

	}

	return params.slice( 0, count );

};

const encodeClip = ( clip: EditClip, previousStart: number ): MusicClipData => {

	const delta = clip.start - previousStart;
	const params = trimParams( clip.params );

	// ノートの帯は数値を使わなくても [] を置いて、5つ目のノートの位置を保つ
	if ( clip.notes ) {

		return [ delta, clip.length, clip.offset, params, clip.notes ];

	}

	if ( params.length > 0 ) {

		return [ delta, clip.length, clip.offset, params ];

	}

	return [ delta, clip.length, clip.offset ];

};

// 編集した帯を tracks の保存の形に戻す。帯は開始の順に並べ直し（同じ開始は元の並びのまま）、並べ直した後の選択とアクティブも返す
export const encodeTracks = ( tracks: MusicTrackData[], clipsByTrack: EditClip[][] ) => {

	const nextTracks: MusicTrackData[] = [];
	const selection = new Set<string>();
	let active: string | null = null;

	for ( let t = 0; t < tracks.length; t ++ ) {

		const track = tracks[ t ];

		// sort は同じ値の並びを保つので、重ねた帯の勝ち負け（同じ開始は並びの後ろ）が並べ直しで入れ替わらない
		const sorted = clipsByTrack[ t ].slice();
		sorted.sort( ( a, b ) => a.start - b.start );

		const data: MusicClipData[] = [];

		let previousStart = 0;

		for ( let c = 0; c < sorted.length; c ++ ) {

			const clip = sorted[ c ];

			data.push( encodeClip( clip, previousStart ) );
			previousStart = clip.start;

			if ( clip.selected ) {

				selection.add( clipKey( t, c ) );

			}

			if ( clip.active ) {

				active = clipKey( t, c );

			}

		}

		nextTracks.push( [ track[ 0 ], track[ 1 ], track[ 2 ], track[ 3 ], data ] );

	}

	return { tracks: nextTracks, selection, active };

};

/*-------------------------------
	Edit
-------------------------------*/

// 元とつながらない帯のコピー。数値・ノートの配列も複製する
const copyClip = ( clip: EditClip ): EditClip => {

	let notes: MusicNoteData[] | null = null;

	if ( clip.notes ) {

		notes = [];

		for ( const note of clip.notes ) {

			notes.push( [ note[ 0 ], note[ 1 ], note[ 2 ], note[ 3 ] ] );

		}

	}

	return { ...clip, params: clip.params.slice(), notes };

};

// 動かした帯を並びの後ろに足す。同じ開始の帯どうしは並びの後ろが鳴る（手前に描く）ので、動かした先で下に隠れないように
const placeOnTop = ( clips: EditClip[], moved: EditClip[] ) => {

	for ( const clip of moved ) {

		clips.push( clip );

	}

	return clips;

};

// 選んだ帯を delta 拍動かす。copy なら元を残してコピーを動かし、コピーを選ぶ（Alt+ドラッグ）。
// 曲の頭より前へは出さない（選んだ帯の一番前が 0 で止まる）
export const moveSelected = ( clipsByTrack: EditClip[][], delta: number, copy: boolean ) => {

	let earliest = Infinity;

	for ( const clips of clipsByTrack ) {

		for ( const clip of clips ) {

			if ( clip.selected ) earliest = Math.min( earliest, clip.start );

		}

	}

	const applied = Math.max( delta, - earliest );
	const result: EditClip[][] = [];

	for ( const clips of clipsByTrack ) {

		const next: EditClip[] = [];
		const movedClips: EditClip[] = [];

		for ( const clip of clips ) {

			if ( ! clip.selected ) {

				next.push( clip );

				continue;

			}

			if ( copy ) {

				next.push( { ...clip, selected: false, active: false } );

			}

			const moved = copyClip( clip );
			moved.start = clip.start + applied;
			movedClips.push( moved );

		}

		result.push( placeOnTop( next, movedClips ) );

	}

	return result;

};

// 選んだ帯の右端を delta 拍動かす。中の時間はそのまま先へ続く
export const resizeSelected = ( clipsByTrack: EditClip[][], delta: number ) => {

	const result: EditClip[][] = [];

	for ( const clips of clipsByTrack ) {

		const next: EditClip[] = [];

		for ( const clip of clips ) {

			if ( ! clip.selected ) {

				next.push( clip );

				continue;

			}

			const minLength = Math.min( MIN_CLIP_LENGTH, clip.length );

			next.push( { ...clip, length: Math.max( minLength, clip.length + delta ) } );

		}

		result.push( next );

	}

	return result;

};

// 選んだ帯の頭を delta 拍削る（負なら伸ばす）。中の音はその場に残すので、中の時間の始まりも同じだけずらす。
// 中の時間の始まりは 0 より前に戻さず、長さは下限より短くしない
export const trimSelected = ( clipsByTrack: EditClip[][], delta: number ) => {

	const result: EditClip[][] = [];

	for ( const clips of clipsByTrack ) {

		const next: EditClip[] = [];
		const trimmedClips: EditClip[] = [];

		for ( const clip of clips ) {

			if ( ! clip.selected ) {

				next.push( clip );

				continue;

			}

			const minLength = Math.min( MIN_CLIP_LENGTH, clip.length );

			let applied = Math.max( delta, - clip.offset, - clip.start );
			applied = Math.min( applied, clip.length - minLength );

			trimmedClips.push( { ...clip, start: clip.start + applied, length: clip.length - applied, offset: clip.offset + applied } );

		}

		result.push( placeOnTop( next, trimmedClips ) );

	}

	return result;

};

// 選んだ帯を消す
export const deleteSelected = ( clipsByTrack: EditClip[][] ) => {

	const result: EditClip[][] = [];

	for ( const clips of clipsByTrack ) {

		const next: EditClip[] = [];

		for ( const clip of clips ) {

			if ( ! clip.selected ) next.push( clip );

		}

		result.push( next );

	}

	return result;

};

// 選んだ帯を、選んだ帯の範囲（一番前の頭から一番後ろの終わりまで）のすぐ後ろへ並べ、並べたほうを選ぶ（Ctrl+D）
export const duplicateSelected = ( clipsByTrack: EditClip[][] ) => {

	let first = Infinity;
	let last = - Infinity;

	for ( const clips of clipsByTrack ) {

		for ( const clip of clips ) {

			if ( ! clip.selected ) continue;

			first = Math.min( first, clip.start );
			last = Math.max( last, clip.start + clip.length );

		}

	}

	const span = last - first;
	const result: EditClip[][] = [];

	for ( const clips of clipsByTrack ) {

		const next: EditClip[] = [];
		const copiedClips: EditClip[] = [];

		for ( const clip of clips ) {

			if ( ! clip.selected ) {

				next.push( clip );

				continue;

			}

			next.push( { ...clip, selected: false, active: false } );

			const copied = copyClip( clip );
			copied.start = clip.start + span;
			copiedClips.push( copied );

		}

		result.push( placeOnTop( next, copiedClips ) );

	}

	return result;

};

// track に帯を1つ置き、それだけを選ぶ
export const addClip = ( clipsByTrack: EditClip[][], track: number, start: number, length: number ) => {

	const result: EditClip[][] = [];

	for ( let t = 0; t < clipsByTrack.length; t ++ ) {

		const next: EditClip[] = [];

		for ( const clip of clipsByTrack[ t ] ) {

			next.push( { ...clip, selected: false, active: false } );

		}

		if ( t === track ) {

			next.push( { start, length, offset: 0, params: [], notes: null, selected: true, active: true } );

		}

		result.push( next );

	}

	return result;

};

// アクティブの帯の数値の index 番目を value にする。数値の名前は楽器ごとに違うので、選んだ帯すべてではなく開いている帯だけを変える
export const setActiveParam = ( clipsByTrack: EditClip[][], index: number, value: number ) => {

	const result: EditClip[][] = [];

	for ( const clips of clipsByTrack ) {

		const next: EditClip[] = [];

		for ( const clip of clips ) {

			if ( ! clip.active ) {

				next.push( clip );

				continue;

			}

			const params = clip.params.slice();

			while ( params.length <= index ) {

				params.push( 0 );

			}

			params[ index ] = value;

			next.push( { ...clip, params } );

		}

		result.push( next );

	}

	return result;

};

/*-------------------------------
	Track
-------------------------------*/

// ほかのトラックとぶつからない名前。ぶつかったら `Kick 2` のように番号を振る（#275 でトラックを名前で引くため）。
// except は自分の番号（名前を変えるとき、自分の今の名前とはぶつからない扱いにする）
export const uniqueTrackName = ( tracks: MusicTrackData[], baseName: string, except: number ) => {

	const used = new Set<string>();

	for ( let i = 0; i < tracks.length; i ++ ) {

		if ( i !== except ) used.add( tracks[ i ][ 0 ] );

	}

	if ( ! used.has( baseName ) ) return baseName;

	let index = 2;

	while ( used.has( `${baseName} ${index}` ) ) {

		index ++;

	}

	return `${baseName} ${index}`;

};

// from 番目のトラックを to 番目へ移す
export const moveTrack = ( tracks: MusicTrackData[], from: number, to: number ) => {

	const next = tracks.slice();
	const moved = next.splice( from, 1 );

	next.splice( to, 0, moved[ 0 ] );

	return next;

};

// index 番目のトラックの一部を差し替える
export const updateTrack = ( tracks: MusicTrackData[], index: number, update: { name?: string, instrument?: string, volume?: number, pan?: number } ) => {

	const next = tracks.slice();
	const track = tracks[ index ];

	let name = track[ 0 ];
	let instrument = track[ 1 ];
	let volume = track[ 2 ];
	let pan = track[ 3 ];

	if ( update.name !== undefined ) name = update.name;
	if ( update.instrument !== undefined ) instrument = update.instrument;
	if ( update.volume !== undefined ) volume = update.volume;
	if ( update.pan !== undefined ) pan = update.pan;

	next[ index ] = [ name, instrument, volume, pan, track[ 4 ] || [] ];

	return next;

};
