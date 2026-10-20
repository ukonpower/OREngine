// ピアノロールのノートの編集。開いている帯のノート（保存の形は開始が前のノートからの差分）を、帯の中の拍の絶対値に置き直して編集し、
// 保存の形に戻す。どの関数も元の配列を書き換えず、新しい配列を返す（undo の SetFieldCommand が前の表をそのまま持つため）
import type { MusicNoteData } from '../../../../../../builtin/Components/Utility/Music/instrument';

// 編集の間だけ使うノート。start は帯の中の拍
export type EditNote = {
	start: number;
	length: number;
	pitch: number;
	velocity: number;
	selected: boolean;
};

// MIDI の音高の範囲（0〜127）
export const PITCH_COUNT = 128;

// グリッドが「なし」のときに時刻を丸める細かさ（拍）。2 の累乗の分数にして、差分に直しても小数の誤差が積もらないようにする
const FREE_RESOLUTION = 1 / 128;

// 強さを丸める細かさ。JSON を短く保つ
const VELOCITY_RESOLUTION = 100;

// ノートの長さの下限（拍）。グリッドが「なし」のときの丸めの細かさと同じ
const MIN_NOTE_LENGTH = FREE_RESOLUTION;

// 拍を grid（拍。0 はグリッドなし）の目に丸める。mode は round（近い目）か floor（手前の目）
export const snapBeat = ( beat: number, grid: number, mode: 'round' | 'floor' ) => {

	let step = grid;

	if ( step <= 0 ) step = FREE_RESOLUTION;

	if ( mode === 'floor' ) {

		return Math.floor( beat / step + 1e-9 ) * step;

	}

	return Math.round( beat / step ) * step;

};

// 動かした時刻・長さを、グリッドなしの丸めの細かさに揃える。グリッドの目に乗っていないノートを掴んで動かすと、
// ほかのノートへ足す量が 0.39999… のような値になり、そのまま保存すると JSON が長くなり誤差も積もるため
const roundTime = ( beat: number ) => {

	return Math.round( beat / FREE_RESOLUTION ) * FREE_RESOLUTION;

};

const clampPitch = ( pitch: number ) => {

	return Math.min( PITCH_COUNT - 1, Math.max( 0, Math.round( pitch ) ) );

};

const clampVelocity = ( velocity: number ) => {

	return Math.min( 1, Math.max( 0, Math.round( velocity * VELOCITY_RESOLUTION ) / VELOCITY_RESOLUTION ) );

};

/*-------------------------------
	Decode / Encode
-------------------------------*/

// 保存の形のノートを、帯の中の拍の絶対値に置き直す。selection の番号のノートを選んだ状態にする
export const decodeNotes = ( notes: MusicNoteData[], selection: Set<number> ): EditNote[] => {

	const result: EditNote[] = [];

	let start = 0;

	for ( let i = 0; i < notes.length; i ++ ) {

		const note = notes[ i ];

		start += note[ 0 ];

		result.push( { start, length: note[ 1 ], pitch: note[ 2 ], velocity: note[ 3 ], selected: selection.has( i ) } );

	}

	return result;

};

// 編集したノートを保存の形に戻す。開始の順に並べ直し（同じ開始は低い音から）、並べ直した後の選択の番号も返す
export const encodeNotes = ( notes: EditNote[] ) => {

	const sorted = notes.slice();

	sorted.sort( ( a, b ) => {

		if ( a.start !== b.start ) return a.start - b.start;

		return a.pitch - b.pitch;

	} );

	const data: MusicNoteData[] = [];
	const selection = new Set<number>();

	let previousStart = 0;

	for ( let i = 0; i < sorted.length; i ++ ) {

		const note = sorted[ i ];

		data.push( [ note.start - previousStart, note.length, note.pitch, note.velocity ] );
		previousStart = note.start;

		if ( note.selected ) {

			selection.add( i );

		}

	}

	return { notes: data, selection };

};

/*-------------------------------
	Select
-------------------------------*/

// 帯の中の拍 [ startBeat, endBeat ) と音高 [ lowPitch, highPitch ] の矩形にかかるノートの番号
export const notesInRect = ( notes: EditNote[], startBeat: number, endBeat: number, lowPitch: number, highPitch: number ) => {

	const keys = new Set<number>();

	for ( let i = 0; i < notes.length; i ++ ) {

		const note = notes[ i ];

		if ( note.pitch < lowPitch || note.pitch > highPitch ) continue;
		if ( note.start + note.length <= startBeat || note.start >= endBeat ) continue;

		keys.add( i );

	}

	return keys;

};

/*-------------------------------
	Edit
-------------------------------*/

// 選んだノートを beats 拍・semitones 半音動かす。copy なら元を残してコピーを動かし、コピーを選ぶ（Alt+ドラッグ）。
// 帯の中の時間の 0 より前と、音高の範囲の外へは出さない（選んだノートのうち端のものが止まる）
export const moveNotes = ( notes: EditNote[], beats: number, semitones: number, copy: boolean ) => {

	let earliest = Infinity;
	let lowest = Infinity;
	let highest = - Infinity;

	for ( const note of notes ) {

		if ( ! note.selected ) continue;

		earliest = Math.min( earliest, note.start );
		lowest = Math.min( lowest, note.pitch );
		highest = Math.max( highest, note.pitch );

	}

	const appliedBeats = Math.max( beats, - earliest );
	const appliedSemitones = Math.min( Math.max( semitones, - lowest ), PITCH_COUNT - 1 - highest );

	const result: EditNote[] = [];

	for ( const note of notes ) {

		if ( ! note.selected ) {

			result.push( note );

			continue;

		}

		if ( copy ) {

			result.push( { ...note, selected: false } );

		}

		result.push( { ...note, start: roundTime( note.start + appliedBeats ), pitch: note.pitch + appliedSemitones } );

	}

	return result;

};

// 選んだノートの長さを delta 拍変える。下限は minLength（グリッドの1目。グリッドなしなら丸めの細かさ）
export const resizeNotes = ( notes: EditNote[], delta: number, minLength: number ) => {

	const lower = Math.max( minLength, MIN_NOTE_LENGTH );
	const result: EditNote[] = [];

	for ( const note of notes ) {

		if ( ! note.selected ) {

			result.push( note );

			continue;

		}

		result.push( { ...note, length: Math.max( Math.min( lower, note.length ), roundTime( note.length + delta ) ) } );

	}

	return result;

};

// 選んだノートの強さに delta を足す（0〜1 で止める）。複数を選んでいれば、そろって増減する
export const shiftVelocity = ( notes: EditNote[], delta: number ) => {

	const result: EditNote[] = [];

	for ( const note of notes ) {

		if ( ! note.selected ) {

			result.push( note );

			continue;

		}

		result.push( { ...note, velocity: clampVelocity( note.velocity + delta ) } );

	}

	return result;

};

// 選んだノートを消す
export const deleteNotes = ( notes: EditNote[] ) => {

	const result: EditNote[] = [];

	for ( const note of notes ) {

		if ( ! note.selected ) result.push( note );

	}

	return result;

};

// ノートを1つ置き、それだけを選ぶ
export const addNote = ( notes: EditNote[], start: number, length: number, pitch: number, velocity: number ) => {

	const result: EditNote[] = [];

	for ( const note of notes ) {

		result.push( { ...note, selected: false } );

	}

	result.push( { start, length, pitch: clampPitch( pitch ), velocity: clampVelocity( velocity ), selected: true } );

	return result;

};

// 選んだノートを、選んだ範囲（一番前の頭から一番後ろの終わりまで）を小節（4拍）に切り上げた長さだけ後ろへ並べ、並べたほうを選ぶ（Ctrl+D）
export const duplicateNotes = ( notes: EditNote[], beatsPerBar: number ) => {

	let first = Infinity;
	let last = - Infinity;

	for ( const note of notes ) {

		if ( ! note.selected ) continue;

		first = Math.min( first, note.start );
		last = Math.max( last, note.start + note.length );

	}

	if ( first === Infinity ) return notes;

	// 1e-9 は、ちょうど小節の長さの範囲を浮動小数の誤差で次の小節へ切り上げないため
	const span = Math.max( 1, Math.ceil( ( last - first ) / beatsPerBar - 1e-9 ) ) * beatsPerBar;
	const result: EditNote[] = [];
	const copied: EditNote[] = [];

	for ( const note of notes ) {

		if ( ! note.selected ) {

			result.push( note );

			continue;

		}

		result.push( { ...note, selected: false } );
		copied.push( { ...note, start: note.start + span } );

	}

	for ( const note of copied ) {

		result.push( note );

	}

	return result;

};

// 選んだノートの開始をグリッドの近い目に揃える（Q）。長さは変えない
export const quantizeNotes = ( notes: EditNote[], grid: number ) => {

	const result: EditNote[] = [];

	for ( const note of notes ) {

		if ( ! note.selected ) {

			result.push( note );

			continue;

		}

		result.push( { ...note, start: Math.max( 0, snapBeat( note.start, grid, 'round' ) ) } );

	}

	return result;

};

// コピーしたノート（選んだノート。開始は一番前のノートからの拍）
export type NoteClipboard = {
	start: number;
	length: number;
	pitch: number;
	velocity: number;
}[];

// 選んだノートをコピーする（Ctrl+C）。選んでいなければ null
export const copyNotes = ( notes: EditNote[] ): NoteClipboard | null => {

	let first = Infinity;

	for ( const note of notes ) {

		if ( note.selected ) first = Math.min( first, note.start );

	}

	if ( first === Infinity ) return null;

	const clipboard: NoteClipboard = [];

	for ( const note of notes ) {

		if ( ! note.selected ) continue;

		clipboard.push( { start: note.start - first, length: note.length, pitch: note.pitch, velocity: note.velocity } );

	}

	return clipboard;

};

// コピーしたノートを、帯の中の拍 at から貼り付け、貼ったノートを選ぶ（Ctrl+V）
export const pasteNotes = ( notes: EditNote[], clipboard: NoteClipboard, at: number ) => {

	const result: EditNote[] = [];

	for ( const note of notes ) {

		result.push( { ...note, selected: false } );

	}

	for ( const note of clipboard ) {

		result.push( { start: at + note.start, length: note.length, pitch: note.pitch, velocity: note.velocity, selected: true } );

	}

	return result;

};

// ドラッグで動かした量（拍）を、グリッドに合わせて押したノートの頭（または終わり）が目に乗る量にする。
// edge は押したノートの頭（動かす）か終わり（長さ）の拍
export const snapDelta = ( edge: number, raw: number, grid: number ) => {

	return snapBeat( edge + raw, grid, 'round' ) - edge;

};
