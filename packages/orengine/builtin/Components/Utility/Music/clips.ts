// 帯（DAW のクリップ）の並びを、どの拍からどの拍までをどの帯が鳴らすかの区間に切る。
// Music の生成とエディタの Music パネルの両方が使う。重なりの解決はここだけで行う
import type { MusicClipData } from './instrument';

// 曲の頭からの拍に置き直した帯1つ
export type MusicClip = {
	start: number;
	end: number;
	// 帯の頭での、帯の中の拍（中の時間の始まり）
	offset: number;
	// 帯の数値。書かれていない数値は省いたまま持ち、使う側で 0 とみなす
	params: number[];
};

// 1つの帯が鳴らす区間。start / end は曲の頭からの拍
export type MusicSegment = {
	start: number;
	end: number;
	// 鳴らす帯の、トラックの帯の並びでの番号
	clip: number;
	// 区間の頭での、帯の中の拍
	clipBeat: number;
};

// 保存の形（開始は前の帯からの差分）を、曲の頭からの拍に置き直す
export const decodeClips = ( data: MusicClipData[] ): MusicClip[] => {

	const clips: MusicClip[] = [];

	let start = 0;

	for ( const clip of data ) {

		start += clip[ 0 ];

		let params: number[] = [];

		if ( clip[ 3 ] ) {

			params = clip[ 3 ];

		}

		clips.push( { start, end: start + clip[ 1 ], offset: clip[ 2 ], params } );

	}

	return clips;

};

// beat を鳴らす帯の番号。重なった所は後に始まる帯、開始が同じなら並びの後ろの帯が鳴らす。どの帯にも入らなければ -1
const findSoundingClip = ( clips: MusicClip[], beat: number ) => {

	let sounding = - 1;

	for ( let i = 0; i < clips.length; i ++ ) {

		const clip = clips[ i ];

		if ( beat < clip.start || beat >= clip.end ) continue;

		// 並びの前から見るので、開始が同じなら後ろの帯で置き換わる
		if ( sounding < 0 || clip.start >= clips[ sounding ].start ) {

			sounding = i;

		}

	}

	return sounding;

};

// 帯の並びを、鳴らす帯ごとの区間に切る。区間は時刻の順で、帯の外（どの帯も鳴らさない所）は区間に入らない。
// 上の帯に隠れた下の帯は、隠れ終わった所から続きの中の時間で鳴る（中の時間は裏でも曲と同じ速さで進む）
export const resolveClipSegments = ( clips: MusicClip[] ): MusicSegment[] => {

	// 鳴らす帯が変わりうるのは、どれかの帯の頭か終わりだけ
	const bounds: number[] = [];

	for ( const clip of clips ) {

		if ( clip.end <= clip.start ) continue;

		bounds.push( clip.start );
		bounds.push( clip.end );

	}

	bounds.sort( ( a, b ) => a - b );

	const segments: MusicSegment[] = [];

	for ( let i = 0; i < bounds.length - 1; i ++ ) {

		const from = bounds[ i ];
		const to = bounds[ i + 1 ];

		if ( to <= from ) continue;

		const sounding = findSoundingClip( clips, from );

		if ( sounding < 0 ) continue;

		// 同じ帯が続くなら1つの区間にまとめる（描画の回数を減らすため）
		const last = segments[ segments.length - 1 ];

		if ( last && last.clip === sounding && last.end === from ) {

			last.end = to;

			continue;

		}

		const clip = clips[ sounding ];

		segments.push( { start: from, end: to, clip: sounding, clipBeat: clip.offset + from - clip.start } );

	}

	return segments;

};
