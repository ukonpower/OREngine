import React from 'react';

import { SerializeFieldDirectoryValue } from 'maxpower';

import { InputColor } from '../../../../../components/composites/Input/InputColor';
import { Value } from '../../../../../components/composites/Value';
import { ValueArray } from '../../../../../components/composites/ValueArray';
import { Vector } from '../../../../../components/composites/Vector';
import { Label } from '../../../../../components/primitives/Label';
import { useOREditor } from '../../../../OREditor/hooks/useOREditor';
import { useSerializeFieldView } from '../../../hooks/useSerializeFieldView';

export const SerializeFieldViewValue: React.FC<{ path:string, field: SerializeFieldDirectoryValue }> = ( props ) => {

	const { editor } = useOREditor();
	const { target } = useSerializeFieldView();
	const value = props.field.value;
	const valueType = typeof value;
	const opt = props.field.opt;
	const format = opt?.format;
	const label = opt?.label || props.path.split( "/" ).pop();
	const isWrap = ( format && format.type == "vector" );

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

		if ( valueType === "function" ) {

			return valueElm;

		}

	}

	return <Label title={label} vertical={isWrap} >
		{valueElm}
	</Label>;

};
