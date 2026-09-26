import React, { createElement } from 'react';

import { SerializeFieldDirectoryValue } from 'maxpower';
import { InputColor, Label, Vector } from 'uipower';

import { useOREditor } from '../../../../hooks/useOREditor';
import { findFieldUI } from '../../../../lib/fieldUI';
import { useSerializeFieldView } from '../../hooks/useSerializeFieldView';
import { Value } from '../Value';
import { ValueArray } from '../ValueArray';

import style from './index.module.scss';

export const SerializeFieldViewValue: React.FC<{ path:string, field: SerializeFieldDirectoryValue }> = ( props ) => {

	const { editor, engine, fieldUIs } = useOREditor();
	const { target } = useSerializeFieldView();
	const value = props.field.value;
	const valueType = typeof value;
	const opt = props.field.opt;
	const format = opt?.format;
	const label = opt?.label || props.path.split( "/" ).pop();
	const isWrap = ( format && format.type == "vector" );

	// editor.tsx で差し替えられたフィールドは、既定の入力の代わりにその UI を出す。並べ方は定義の layout に従う
	const fieldUIEntry = findFieldUI( fieldUIs, target, props.path );

	if ( fieldUIEntry ) {

		// FieldUI はモジュールスコープで定義された部品を引いてきたものだが、JSX で書くと
		// react-hooks/static-components が「レンダー中に作った部品」と誤認するので createElement で描く
		const fieldUIElm = createElement( fieldUIEntry.ui, {
			value,
			setValue: ( v ) => editor.api.setField( target, props.path, v ),
			beginEdit: () => editor.api.beginEdit( target, props.path ),
			target,
			path: props.path,
			opt,
			engine,
			editor,
		} );

		return <Label title={label} vertical={fieldUIEntry.layout === 'block'}>{fieldUIElm}</Label>;

	}

	let valueElm: React.ReactNode = null;

	if ( Array.isArray( value ) ) {

		if ( format?.type == "vector" ) {

			valueElm = <Vector value={value as number[]} {...opt} onChange={( v ) => {

				editor.api.setField( target, props.path, v );

			}} />;

		} else if ( format?.type == "color" ) {

			valueElm = <InputColor value={value as number[]} {...opt} onChange={( v ) => {

				editor.api.setField( target, props.path, v );

			}} />;

		} else {


			valueElm = <ValueArray value={value} {...opt} onChange={( v ) => {

				editor.api.setField( target, props.path, v );

			} }/>;

		}

	} else {

		valueElm = <Value value={value} {...opt} onChange={( v ) => {

			editor.api.setField( target, props.path, v );

		}}/>;

		// 関数フィールドは Button ひとつなので、ラベル行に入れず行いっぱいに伸ばす
		if ( valueType === "function" ) {

			return <div className={style.action}>{valueElm}</div>;

		}

	}

	return <Label title={label} vertical={isWrap} >
		{valueElm}
	</Label>;

};
