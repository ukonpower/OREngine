// このファイルは他のモジュールを import しない（Node の tsx から builtin の並べ方と一緒に直接読まれるため）

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

// 並べ方1種。builtin/Layouts/<名前>/index.ts と <projectDir>/Resources/Layouts/<名前>/index.ts に
// `export const layout: ClonerLayout` として置くと、ディレクトリ名で登録される
export type ClonerLayout = {
	// 数値の既定値。キーがそのまま Cloner のフィールド params/<キー> になる
	params: ClonerLayoutParams;
	count: ( params: ClonerLayoutParams ) => number;
	place: ( index: number, count: number, params: ClonerLayoutParams ) => ClonerPlacement;
};

const LAYOUT_PATH_REGEX = /\/Layouts\/([^/]+)\/index\.ts$/;

// import.meta.glob（eager）の結果から、ディレクトリ名 → 並べ方 の表を作る。
// キーは '<何か>/Layouts/<名前>/index.ts' の形。layout を export していないモジュールは飛ばす
export const collectLayouts = ( modules: Record<string, unknown> ): Map<string, ClonerLayout> => {

	const table = new Map<string, ClonerLayout>();

	for ( const modulePath of Object.keys( modules ) ) {

		const match = modulePath.match( LAYOUT_PATH_REGEX );

		if ( ! match ) continue;

		const mod = modules[ modulePath ] as { layout?: ClonerLayout } | null;

		if ( ! mod || ! mod.layout ) continue;

		table.set( match[ 1 ], mod.layout );

	}

	return table;

};
