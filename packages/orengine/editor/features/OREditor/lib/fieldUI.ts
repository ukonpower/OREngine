
import * as MXP from 'maxpower';

import type { Engine } from '../../../../core/Engine';
import type { Editor, FieldEdit } from '../../../lib';
import type React from 'react';

// フィールド UI が受け取る props。T はフィールドの値、C はフィールドを持つコンポーネント
export type FieldUIProps<T extends MXP.SerializeFieldValue = MXP.SerializeFieldValue, C extends MXP.Serializable = MXP.Serializable> = {
	value: T;
	// 1回で終わる変更（クリック等）。連続した変更は beginEdit を使う
	setValue: ( value: T ) => void;
	// ドラッグ等の連続した変更。commit した時点で undo 1回ぶんになる
	beginEdit: () => FieldEdit;
	target: C;
	path: string;
	opt?: MXP.SerializableFieldOpt;
	engine: Engine;
	editor: Editor;
};

export type FieldUI<T extends MXP.SerializeFieldValue = any, C extends MXP.Serializable = MXP.Serializable> = React.FC<FieldUIProps<T, C>>;

// プロパティパネルでの並べ方。inline は既定の入力と同じくラベルの右、block はラベルの下に行いっぱい（canvas など幅の要る UI 向け）
export type FieldUILayout = 'inline' | 'block';

export type FieldUIEntry = {
	ui: FieldUI;
	layout: FieldUILayout;
};

// defineFieldUIs に書く形。部品だけ渡したときは inline になる
export type FieldUIOption<C extends MXP.Serializable> = FieldUI<any, C> | { ui: FieldUI<any, C>, layout?: FieldUILayout };

// あるコンポーネントクラスの、フィールドパス → フィールド UI の対応
export type FieldUIDefinition = {
	target: abstract new ( ...args: any[] ) => MXP.Serializable;
	fields: { [ path: string ]: FieldUIEntry };
};

// コンポーネントの editor.tsx で fieldUIs として export する対応表を作る
export const defineFieldUIs = <C extends MXP.Serializable>( target: abstract new ( ...args: any[] ) => C, fields: { [ path: string ]: FieldUIOption<C> } ): FieldUIDefinition => {

	const entries: FieldUIDefinition[ 'fields' ] = {};

	for ( const [ path, option ] of Object.entries( fields ) ) {

		if ( typeof option === 'function' ) {

			entries[ path ] = { ui: option as FieldUI, layout: 'inline' };

		} else {

			entries[ path ] = { ui: option.ui as FieldUI, layout: option.layout ?? 'inline' };

		}

	}

	return { target, fields: entries };

};

// 対応はクラスの完全一致で引く（継承先には引き継がない。フィールド構成が変わりうるため）
export const findFieldUI = ( definitions: FieldUIDefinition[] | undefined, target: MXP.Serializable, path: string ): FieldUIEntry | null => {

	if ( ! definitions ) return null;

	for ( const def of definitions ) {

		if ( target.constructor !== def.target ) continue;

		const entry = def.fields[ path ];

		if ( entry ) return entry;

	}

	return null;

};
