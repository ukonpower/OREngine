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
	// 同時に鳴らせるノートの数。noteSound の楽器だけが使う
	maxNotes?: number;
	// 帯の数値（Song.clipParam の x, y, z, w）の名前。Music パネルの表示にだけ使い、名前の無い数値はパネルに出さない
	params?: string[];
};

// 楽器の完成形のシェーダーが、音色の関数 name（trackSound / noteSound）を定義しているか。
// 呼び出し（main の `trackSound( s )`）は返り値の型が前に付かないので、`vec2 trackSound(` で定義だけを拾える
export const definesSoundFunction = ( shader: string, name: string ) => {

	return new RegExp( `vec2\\s+${name}\\s*\\(` ).test( shader );

};

// ノート1つの保存の形（#274 で鳴らす）。[ 前のノートからの拍, 長さ（拍）, 音高, 強さ ]
export type MusicNoteData = [ number, number, number, number ];

// 帯1つの保存の形。[ 前の帯からの拍, 長さ（拍）, 中の時間の始まり（拍）, 数値, ノート ]。
// 数値を使わない帯は4つ目から省く（ノートの帯では数値の代わりに [] を置く）。最初の帯の開始は曲の頭からの拍
export type MusicClipData = [ number, number, number, number[]?, MusicNoteData[]? ];

// トラック1つの保存の形。シーン JSON の props はキーが terser に改名されるので、キーを持たない配列にする
// [ 名前, 楽器の名前, 音量（1 で等倍）, パン（-1 左 〜 1 右）, 帯 ]
export type MusicTrackData = [ string, string, number, number, MusicClipData[] ];
