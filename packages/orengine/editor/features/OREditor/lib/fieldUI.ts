
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

// あるコンポーネントクラスの、フィールドパス → フィールド UI の対応
export type FieldUIDefinition = {
	target: abstract new ( ...args: any[] ) => MXP.Serializable;
	fields: { [ path: string ]: FieldUI };
};

// コンポーネントの editor.tsx で fieldUIs として export する対応表を作る
export const defineFieldUIs = <C extends MXP.Serializable>( target: abstract new ( ...args: any[] ) => C, fields: { [ path: string ]: FieldUI<any, C> } ): FieldUIDefinition => {

	return { target, fields: fields as FieldUIDefinition[ 'fields' ] };

};

// 対応はクラスの完全一致で引く（継承先には引き継がない。フィールド構成が変わりうるため）
export const findFieldUI = ( definitions: FieldUIDefinition[] | undefined, target: MXP.Serializable, path: string ): FieldUI | null => {

	if ( ! definitions ) return null;

	for ( const def of definitions ) {

		if ( target.constructor !== def.target ) continue;

		const ui = def.fields[ path ];

		if ( ui ) return ui;

	}

	return null;

};
