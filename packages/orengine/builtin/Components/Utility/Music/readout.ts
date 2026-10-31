// 絵のコンポーネントから音を引く読み口（Music の lastNote / currentClip）の探索。
// どちらも読み込み時に作った区間・変換したあとのノートを見るだけの純関数で、時刻は event の timeCode（曲の頭からの秒）
import { CLIP_PARAM_COUNT } from './instrument';

import type { MusicClip, MusicSegment } from './clips';
import type { MusicNote } from './notes';

// lastNote が返す、直前に鳴り始めたノート
export type MusicNoteReadout = {
	// ノートが鳴り始めてからの秒
	since: number;
	pitch: number;
	// ノートの長さ（秒）。帯の終わりと、maxNotes の枠を奪われた時刻で切ったあとの長さ
	length: number;
};

// currentClip が返す、今鳴っている帯
export type MusicClipReadout = {
	// 帯の頭からの秒。上の帯に隠れた後で続きから鳴り出したときも、帯の頭から数える
	since: number;
	// 帯の数値（CLIP_PARAM_COUNT 個。書かれていない数値は 0）
	params: number[];
};

// time までに鳴り始めた最後のノート。同じ時刻に鳴り始めた和音は一番低い音を返す（ルートの目安）。
// notes は resolveNotes の結果（開始の順）。まだ1つも鳴り始めていなければ null
export const findLastNote = ( notes: MusicNote[], time: number ): MusicNoteReadout | null => {

	// 開始が time より後の最初のノートを二分探索で探す。その1つ前が、直前に鳴り始めたノート
	let low = 0;
	let high = notes.length;

	while ( low < high ) {

		const mid = Math.floor( ( low + high ) / 2 );

		if ( notes[ mid ].start <= time ) {

			low = mid + 1;

		} else {

			high = mid;

		}

	}

	if ( low === 0 ) return null;

	const start = notes[ low - 1 ].start;

	// 同じ時刻に鳴り始めたノートは並びの順が音高の順とは限らないので、さかのぼって一番低い音を選ぶ
	let lowest = notes[ low - 1 ];

	for ( let i = low - 2; i >= 0; i -- ) {

		const note = notes[ i ];

		if ( note.start !== start ) break;

		if ( note.pitch < lowest.pitch ) {

			lowest = note;

		}

	}

	// 枠を奪われたノートは length でなく stop が縮むので、鳴っていた長さは stop までに切る
	const length = Math.min( lowest.length, lowest.stop - lowest.start );

	return { since: time - start, pitch: lowest.pitch, length };

};

// time に鳴っている帯。重なった所は区間（resolveClipSegments）が決めた、実際に鳴っている帯を返す。帯の外なら null
export const findCurrentClip = ( clips: MusicClip[], segments: MusicSegment[], beatSec: number, time: number ): MusicClipReadout | null => {

	for ( const segment of segments ) {

		// 秒で比べる。生成（generator.ts）・ノートの変換（notes.ts）と同じく、拍 × beatSec で秒に直す
		if ( time < segment.start * beatSec ) return null;
		if ( time >= segment.end * beatSec ) continue;

		const clip = clips[ segment.clip ];
		const params: number[] = [];

		for ( let i = 0; i < CLIP_PARAM_COUNT; i ++ ) {

			params.push( clip.params[ i ] || 0 );

		}

		return { since: time - clip.start * beatSec, params };

	}

	return null;

};
