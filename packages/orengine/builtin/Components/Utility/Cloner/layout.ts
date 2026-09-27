// このファイルは他のモジュールを import しない（player ビルドの走査が Node から player.ts 経由で直接読むため）

// Cloner の並べ方を登録するライブラリの種類。builtin/Library/ClonerLayouts/<名前>/index.ts と
// <projectDir>/Resources/Library/ClonerLayouts/<名前>/index.ts に並べ方を置く
export const CLONER_LAYOUT_KIND = 'ClonerLayouts';

// layout を指定していない Cloner が使う並べ方
export const DEFAULT_CLONER_LAYOUT = 'Grid';

// 並べ方の数値。パネルに出て、キーも打てる。number[] はベクトル（3要素）として表示する
export type ClonerLayoutParams = { [ name: string ]: number | number[] };

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
	count: ( params: ClonerLayoutParams ) => number;
	place: ( index: number, count: number, params: ClonerLayoutParams ) => ClonerPlacement;
};
