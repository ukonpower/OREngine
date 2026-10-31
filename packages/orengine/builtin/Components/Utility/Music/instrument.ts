// このファイルは他のモジュールを import しない（player ビルドの走査が Node から player.ts 経由で直接読むため）

// 楽器を登録するライブラリの種類。builtin/Library/Instruments/<名前>/ と <projectDir>/Resources/Library/Instruments/<名前>/ に
// index.ts と index.glsl を置く。host/vite/plugins/ShaderBuilder の INSTRUMENT_SHADER のディレクトリ名と一致させる
export const INSTRUMENT_KIND = 'Instruments';

// 楽器の .glsl を保存したときに ShaderBuilder がページへ出すイベントの名前。ShaderBuilder の INSTRUMENT_HOT_EVENT と一致させる
export const INSTRUMENT_HOT_EVENT = 'orengine:instrument';

// 帯の数値の数。music.module.glsl の Song.clipParam（vec4）と一致させる
export const CLIP_PARAM_COUNT = 4;

// 楽器1つ。ライブラリの index.ts で `export default` するとディレクトリ名で登録される
export type Instrument = {
	// index.glsl を import したもの。ShaderBuilder が music モジュールと生成の main を前後に足した完成形になっている
	shader: string;
	// 同時に鳴らせるノートの数（省略時 1）。noteSound の楽器だけが使う。毎サンプルこの数だけノートを調べる
	maxNotes?: number;
	// ノートが終わってからも鳴っている扱いにする秒（省略時 0）。noteSound の楽器だけが使い、余韻の形は .glsl の noteRelease で書く
	release?: number;
	// 帯の数値（Song.clipParam の x, y, z, w）の名前。Music パネルの表示にだけ使い、名前の無い数値はパネルに出さない
	params?: string[];
};

// 楽器の鳴らし方。note は noteSound、code は trackSound を書いた楽器。both・none は鳴らせない
export type InstrumentSoundKind = 'note' | 'code' | 'both' | 'none';

// 完成形のシェーダーで、音色の関数 name（trackSound / noteSound）が定義されている数。
// 呼び出し（main の `trackSound( s )`）は返り値の型が前に付かないので、`vec2 trackSound(` で定義だけを拾える
const countSoundFunction = ( shader: string, name: string ) => {

	const found = shader.match( new RegExp( `vec2\\s+${name}\\s*\\(`, 'g' ) );

	if ( ! found ) return 0;

	return found.length;

};

// 楽器の完成形のシェーダーから鳴らし方を決める（トラックの側に種類は持たない）。
// noteSound の楽器には ShaderBuilder が trackSound の本体（music_note.part.glsl）を足すので、
// 楽器の側でも trackSound を書いていると trackSound の定義が2つになる
export const instrumentSoundKind = ( shader: string ): InstrumentSoundKind => {

	const noteCount = countSoundFunction( shader, 'noteSound' );
	const trackCount = countSoundFunction( shader, 'trackSound' );

	if ( noteCount > 0 ) {

		if ( trackCount > 1 ) return 'both';

		return 'note';

	}

	if ( trackCount > 0 ) return 'code';

	return 'none';

};

// ノート1つの保存の形。[ 前のノートからの拍, 長さ（拍）, 音高（MIDI の番号。69 = A4 = 440Hz） ]。
// 時刻は帯の中の拍で、最初のノートは帯の中の時間の 0 から。同じ時刻の和音は差分 0
export type MusicNoteData = [ number, number, number ];

// 帯1つの保存の形。[ 前の帯からの拍, 長さ（拍）, 中の時間の始まり（拍）, 数値, ノート ]。
// 数値を使わない帯は4つ目から省く（ノートの帯では数値の代わりに [] を置く）。最初の帯の開始は曲の頭からの拍
export type MusicClipData = [ number, number, number, number[]?, MusicNoteData[]? ];

// トラック1つの保存の形。シーン JSON の props はキーが terser に改名されるので、キーを持たない配列にする
// [ 名前, 楽器の名前, 音量（1 で等倍）, パン（-1 左 〜 1 右）, 帯 ]
export type MusicTrackData = [ string, string, number, number, MusicClipData[] ];
