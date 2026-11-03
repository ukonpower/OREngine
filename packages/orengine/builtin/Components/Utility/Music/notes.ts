// ノートの帯のノートを、生成に使う形に直す（読み込み時・帯を編集したとき）。
// 帯の位置と中の時間で曲の頭からの時刻に直し、帯の外・上の帯に隠れた区間のノートを落とし、はみ出しを切ってから、
// 同時に鳴らせる数（maxNotes）の枠へ割り当てる。シェーダーは枠ごとに「その時刻に鳴っているノート1つ」だけを見る
import type { MusicClip, MusicSegment } from './clips';

// 変換したあとのノート1つ。時刻は曲の頭からの秒
export type MusicNote = {
	start: number;
	// noteSound の n.length。帯の終わり（隠れる前から鳴っていたノートは上の帯の始まり）で切ったあとの長さ
	length: number;
	// この時刻から鳴らさない。ノートの終わり＋release を、帯の区間の終わりと、枠を奪われた時刻で切ったもの
	stop: number;
	pitch: number;
	// 割り当てた枠（0 〜 maxNotes - 1）
	slot: number;
	// 鳴らした帯の、トラックの帯の並びでの番号
	clip: number;
};

// 枠の行のうち、ノートの無い所の開始の時刻。シェーダーの二分探索が「今より後に始まるノート」として扱い、通り越さない
const NO_NOTE_TIME = 1e9;

// 帯の区間（segments）ごとに、その区間を鳴らす帯のノートを拾い、開始の順に枠へ割り当てる。
// 枠が埋まっていれば、一番早く始まったノート（余韻中も含む）をその時刻で切って枠を譲らせる（シンセのボイススティール）。
// サンプルごとにシェーダーで選ぶと、一度落としたノートが途中から鳴り直すため、ここで先に決める
export const resolveNotes = ( clips: MusicClip[], segments: MusicSegment[], beatSec: number, release: number, maxNotes: number ): MusicNote[] => {

	const candidates: MusicNote[] = [];

	for ( const segment of segments ) {

		const clip = clips[ segment.clip ];

		if ( ! clip.notes ) continue;

		// この区間が鳴らす、帯の中の時間の範囲
		const from = segment.clipBeat;
		const to = from + segment.end - segment.start;

		let noteBeat = 0;

		for ( const note of clip.notes ) {

			noteBeat += note[ 0 ];

			// 開始が区間の外のノート（帯の外・上の帯に隠れた所）は鳴らさない
			if ( noteBeat < from || noteBeat >= to ) continue;
			if ( note[ 1 ] <= 0 ) continue;

			const startBeat = segment.start + noteBeat - from;
			const endBeat = Math.min( startBeat + note[ 1 ], segment.end );

			// stop には、ひとまず鳴らす区間の終わりを入れておく（余韻もここで切る）
			candidates.push( {
				start: startBeat * beatSec,
				length: ( endBeat - startBeat ) * beatSec,
				stop: segment.end * beatSec,
				pitch: note[ 2 ],
				slot: 0,
				clip: segment.clip,
			} );

		}

	}

	// 区間は時刻の順なので、候補は区間ごとには開始の順に並んでいる。区間をまたいで並べ直す（sort は安定なので、同じ開始は拾った順のまま）
	candidates.sort( ( a, b ) => a.start - b.start );

	const slotCount = Math.max( 1, Math.floor( maxNotes ) );
	// 枠ごとに、最後に割り当てたノート。まだ割り当てていない枠は空
	const slots: MusicNote[] = [];
	const assigned: MusicNote[] = [];

	for ( const note of candidates ) {

		note.stop = Math.min( note.start + note.length + release, note.stop );

		let slot = - 1;

		for ( let i = 0; i < slotCount; i ++ ) {

			const current = slots[ i ];

			if ( ! current || current.stop <= note.start ) {

				slot = i;

				break;

			}

		}

		if ( slot < 0 ) {

			slot = 0;

			for ( let i = 1; i < slotCount; i ++ ) {

				if ( slots[ i ].start < slots[ slot ].start ) slot = i;

			}

			slots[ slot ].stop = note.start;

		}

		note.slot = slot;
		slots[ slot ] = note;
		assigned.push( note );

	}

	// 同じ時刻に枠の数より多くのノートがあると、先のノートは鳴る前に切られる
	const result: MusicNote[] = [];

	for ( const note of assigned ) {

		if ( note.stop > note.start ) result.push( note );

	}

	return result;

};

// 生成シェーダーに渡すノートのテクスチャ（RGBA32F）の中身。1行が1つの枠で、枠の中は開始の順。
// 行の長さは一番多い枠に揃え、足りない所は NO_NOTE_TIME で埋める
export const buildNoteTexture = ( notes: MusicNote[], maxNotes: number ) => {

	const slotCount = Math.max( 1, Math.floor( maxNotes ) );
	// notes は開始の順なので、枠ごとに前から詰めれば枠の中も開始の順になる
	const rows: MusicNote[][] = [];

	for ( let i = 0; i < slotCount; i ++ ) {

		rows.push( [] );

	}

	for ( const note of notes ) {

		rows[ note.slot ].push( note );

	}

	let rowNotes = 1;

	for ( const row of rows ) {

		rowNotes = Math.max( rowNotes, row.length );

	}

	// ノート1つに1画素で ( 開始, 止める時刻, 長さ, 音高 )。music_note.part.glsl の読み方と一致させる
	const width = rowNotes;
	const data = new Float32Array( width * slotCount * 4 );

	for ( let slot = 0; slot < slotCount; slot ++ ) {

		for ( let i = 0; i < rowNotes; i ++ ) {

			const offset = ( slot * width + i ) * 4;
			const note = rows[ slot ][ i ];

			if ( ! note ) {

				data[ offset ] = NO_NOTE_TIME;

				continue;

			}

			data[ offset ] = note.start;
			data[ offset + 1 ] = note.stop;
			data[ offset + 2 ] = note.length;
			data[ offset + 3 ] = note.pitch;

		}

	}

	return { data, width, height: slotCount };

};
