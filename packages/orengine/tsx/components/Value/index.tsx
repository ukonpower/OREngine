import { SerializableFieldFormat, SerializeFieldObjective, SerializeFieldPrimitive, SerializeFieldValue } from 'maxpower';
import React from 'react';

import { Button } from '../Button';
import { InputBoolean } from '../Input/InputCheckBox';
import { InputNumber } from '../Input/InputNumber';
import { InputSelect } from '../Input/InputSelect';
import { InputText } from '../Input/InputText';
import { Vector } from '../Vector';

export type ValueOpt = {
	label?: string | React.ReactNode,
	readOnly?: boolean,
	step?: number,
	disabled?: boolean,
}

export type ValueProps<T> = {
	value: T | undefined,
	onChange?: ( value: T ) => void
	format?: SerializableFieldFormat
} & ValueOpt

export const Value = <T extends SerializeFieldObjective>( props : ValueProps<T> ) => {

	let inputElm = null;

	const onChange = props.onChange;
	const value = props.value;
	const format = props.format;

	const onChangeValue = ( value: any ) => {

		if ( onChange ) {

			onChange( value as T );

		}

	};

	if ( value === undefined || value === null ) return null;

	if ( format ) {

		if ( format.type == "vector" && Array.isArray( value ) ) {

			inputElm = <Vector value={value as number[]} onChange={onChangeValue} />;

		} else if ( format.type == "select" ) {

			inputElm = <InputSelect value={value} onChange={onChangeValue} selectList={format.list}/>;

		}

	}

	if ( ! inputElm ) {

		if ( typeof value === "number" ) {

			inputElm = <InputNumber {...props} value={value} onChange={onChangeValue} />;

		} else if ( typeof value === "string" ) {

			inputElm = <InputText {...props} value={value} onChange={onChangeValue} />;

		} else if ( typeof value == "boolean"	) {

			inputElm = <InputBoolean {...props} checked={value} onChange={onChangeValue}/>;

		} else if ( typeof value == "function" ) {

			const text = props.label || "Run";

			inputElm = <Button onClick={() => {

				( value as () => void )();

			}} >
				{text}
			</ Button >;

		} else {

			inputElm = <InputText {...props} value={JSON.stringify( value )} onChange={() => {}} />;

		}

	}

	return inputElm;

};
