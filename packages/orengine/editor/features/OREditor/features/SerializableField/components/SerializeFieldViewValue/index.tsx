import React, { createElement } from 'react';

import { SerializeFieldDirectoryValue } from 'maxpower';
import { InputColor, Label, Vector } from 'uipower';

import { useOREditor } from '../../../../hooks/useOREditor';
import { findFieldUI } from '../../../../lib/fieldUI';
import { KeyFrameIndicator } from '../../../KeyFrame/components/KeyFrameIndicator';
import { useKeyFrameField } from '../../../KeyFrame/hooks/useKeyFrameField';
import { useFieldDragEdit } from '../../hooks/useFieldDragEdit';
import { useSerializeFieldView } from '../../hooks/useSerializeFieldView';
import { Value } from '../Value';
import { ValueArray } from '../ValueArray';

import style from './index.module.scss';

export const SerializeFieldViewValue: React.FC<{ path:string, field: SerializeFieldDirectoryValue }> = ( props ) => {

	const { editor, engine, fieldUIs } = useOREditor();
	const { target } = useSerializeFieldView();
	const fieldEdit = useFieldDragEdit( target, props.path );
	const keyFrame = useKeyFrameField( target, props.path );
	const value = props.field.value;
	const valueType = typeof value;
	const opt = props.field.opt;
	const format = opt?.format;
	const label = opt?.label || props.path.split( "/" ).pop();
	const isWrap = ( format && format.type == "vector" );

	// キーを打ったフィールドは、ラベルの後ろにキーの状態を出す
	let indicator = null;

	if ( keyFrame.state ) {

		indicator = <KeyFrameIndicator state={keyFrame.state} />;

	}

	const title = <>{label}{indicator}</>;

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

		return <div {...keyFrame.rowProps}>
			<Label title={title} vertical={fieldUIEntry.layout === 'block'}>{fieldUIElm}</Label>
		</div>;

	}

	let valueElm: React.ReactNode = null;

	if ( Array.isArray( value ) ) {

		if ( format?.type == "vector" ) {

			valueElm = <Vector value={value as number[]} {...opt} {...fieldEdit} />;

		} else if ( format?.type == "color" ) {

			valueElm = <InputColor value={value as number[]} {...opt} onChange={( v ) => {

				editor.api.setField( target, props.path, v );

			}} />;

		} else {


			valueElm = <ValueArray value={value} {...opt} {...fieldEdit} />;

		}

	} else {

		valueElm = <Value value={value} {...opt} {...fieldEdit} />;

		// 関数フィールドは Button ひとつなので、ラベル行に入れず行いっぱいに伸ばす。キーの状態はボタンの右に出す
		if ( valueType === "function" ) {

			return <div className={style.action} {...keyFrame.rowProps}>{valueElm}{indicator}</div>;

		}

	}

	return <div {...keyFrame.rowProps}>
		<Label title={title} vertical={isWrap} >
			{valueElm}
		</Label>
	</div>;

};
