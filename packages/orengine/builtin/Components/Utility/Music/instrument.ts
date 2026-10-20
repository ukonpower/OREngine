// このファイルは他のモジュールを import しない（player ビルドの走査が Node から player.ts 経由で直接読むため）

// 楽器を登録するライブラリの種類。builtin/Library/Instruments/<名前>/ と <projectDir>/Resources/Library/Instruments/<名前>/ に
// index.ts と index.glsl を置く。host/vite/plugins/ShaderBuilder の INSTRUMENT_SHADER のディレクトリ名と一致させる
export const INSTRUMENT_KIND = 'Instruments';

// 楽器の .glsl を保存したときに ShaderBuilder がページへ出すイベントの名前。ShaderBuilder の INSTRUMENT_HOT_EVENT と一致させる
export const INSTRUMENT_HOT_EVENT = 'orengine:instrument';

// 楽器1つ。ライブラリの index.ts で `export default` するとディレクトリ名で登録される
export type Instrument = {
	// index.glsl を import したもの。ShaderBuilder が music モジュールと生成の main を前後に足した完成形になっている
	shader: string;
	// 同時に鳴らせるノートの数。noteSound の楽器だけが使う
	maxNotes?: number;
};

// トラック1つの保存の形。シーン JSON の props はキーが terser に改名されるので、キーを持たない配列にする
// [ 名前, 楽器の名前, 音量（1 で等倍）, パン（-1 左 〜 1 右） ]
export type MusicTrackData = [ string, string, number, number ];
