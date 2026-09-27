// ライブラリの1件。コンポーネントが種類と名前で引く部品（Cloner の並べ方など）で、中身の型は使う側が決める
export type LibraryItem = {
	kind: string;
	name: string;
	item: unknown;
};

// '<何か>/Library/<種類>/<名前>/index.ts' の形。host の registry.ts と PlayerRegistry の走査と一致させる
const LIBRARY_PATH_REGEX = /\/Library\/([^/]+)\/([^/]+)\/index\.ts$/;

// import.meta.glob（eager）の結果から、ライブラリの一覧を作る。default export の無いモジュールは飛ばす
export const collectLibrary = ( modules: Record<string, unknown> ): LibraryItem[] => {

	const items: LibraryItem[] = [];

	for ( const modulePath of Object.keys( modules ) ) {

		const match = modulePath.match( LIBRARY_PATH_REGEX );

		if ( ! match ) continue;

		const mod = modules[ modulePath ] as { default?: unknown } | null;

		if ( ! mod || mod.default === undefined ) continue;

		items.push( { kind: match[ 1 ], name: match[ 2 ], item: mod.default } );

	}

	return items;

};
