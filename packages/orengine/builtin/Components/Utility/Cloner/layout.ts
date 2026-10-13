// このファイルは他のモジュールを import しない（player ビルドの走査が Node から player.ts 経由で直接読むため）

// Cloner の並べ方を登録するライブラリの種類。builtin/Library/ClonerLayouts/<名前>/index.ts と
// <projectDir>/Resources/Library/ClonerLayouts/<名前>/index.ts に並べ方を置く
export const CLONER_LAYOUT_KIND = 'ClonerLayouts';

// layout を指定していない Cloner が使う並べ方
export const DEFAULT_CLONER_LAYOUT = 'Grid';

// 並べ方の数値。パネルに出て、キーも打てる。number[] はベクトル（3要素）として表示する
export type ClonerLayoutParams = { [ name: string ]: number | number[] };

// 並べ方の数値1つの入力の決まり。maxpower の SerializableFieldOpt の同名の項目と同じ意味で、そのままフィールドに渡す
// （このファイルは import できないので型を写している）
export type ClonerLayoutParamOption = {
	// 整数に丸める。個数・seed など、小数が意味を持たない値に付ける
	int?: boolean;
	min?: number;
	max?: number;
	step?: number;
};

// index 番目の複製の持ち場。rotation はオイラー角（ラジアン）
export type ClonerPlacement = {
	position: number[];
	rotation?: number[];
	scale?: number[];
	// 時間差の順番に使う値。大小だけが意味を持ち、Cloner が 0〜1 にそろえる。無ければ番号順
	order?: number;
};

// 並べ方1種。ライブラリの index.ts で `export default` するとディレクトリ名で登録される
export type ClonerLayout = {
	// 数値の既定値。キーがそのまま Cloner のフィールド params/<キー> になる
	params: ClonerLayoutParams;
	// params のキーごとの入力の決まり。フィールドを通った値だけが count / place に届くので、ここで丸めれば並べ方の側で丸めなくてよい
	paramOptions?: { [ name: string ]: ClonerLayoutParamOption };
	count: ( params: ClonerLayoutParams ) => number;
	place: ( index: number, count: number, params: ClonerLayoutParams ) => ClonerPlacement;
};
