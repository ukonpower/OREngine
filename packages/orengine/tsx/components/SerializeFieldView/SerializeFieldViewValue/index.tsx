import { SerializeFieldDirectoryValue } from 'maxpower';
import React from 'react';

import { useSerializeFieldView } from '../../../hooks/useSerializeFieldView';
import { Label } from '../../Label';
import { Value } from '../../Value';
import { ValueArray } from '../../ValueArray';
import { Vector } from '../../Vector';

export const SerializeFieldViewValue: React.FC<{ path:string, field: SerializeFieldDirectoryValue }> = ( props ) => {

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

				target.setField( props.path, v );

			}} />;

		} else {


			valueElm = <ValueArray value={value} {...opt} onChange={( v ) => {

				target.setField( props.path, v );

			} }/>;

		}

	} else {

		valueElm = <Value value={value} {...opt} onChange={( v ) => {

			target.setField( props.path, v );

		}}/>;

		if ( valueType === "function" ) {

			return valueElm;

		}

	}

	return <Label title={label} vertical={isWrap} >
		{valueElm}
	</Label>;

};
