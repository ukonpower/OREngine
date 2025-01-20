import { SerializableFieldFormat, SerializeFieldValue } from 'maxpower';

import { Button } from '../Button';
import { InputBoolean } from '../Input/InputCheckBox';
import { InputNumber } from '../Input/InputNumber';
import { InputSelect } from '../Input/InputSelect';
import { InputText } from '../Input/InputText';
import { Vector } from '../Vector';

export type ValueOpt = {
	readOnly?: boolean,
	step?: number,
	disabled?: boolean,
}

export type ValueProps<T extends SerializeFieldValue> = {
	value: T | undefined,
	onChange?: ( value: T ) => void
	format?: SerializableFieldFormat
} & ValueOpt

export const Value = <T extends SerializeFieldValue>( { value, onChange, format, step, readOnly }: ValueProps<T> ) => {

	let inputElm = null;

	const onChangeValue = ( value: any ) => {

		if ( onChange ) {

			onChange( value as T );

		}

	};

	if ( value === undefined ) return null;


	if ( format ) {

		if ( format.type == "vector" && Array.isArray( value ) ) {

			inputElm = <Vector value={value as number[]} onChange={onChangeValue} />;

		} else if ( format.type == "select" ) {

			inputElm = <InputSelect value={value} onChange={onChangeValue} selectList={format.list}/>;

		}

	}

	if ( ! inputElm ) {

		if ( typeof value === "number" ) {

			inputElm = <InputNumber value={value} onChange={onChangeValue} step={step} />;

		} else if ( typeof value === "string" ) {

			inputElm = <InputText value={value} readOnly={readOnly} onChange={onChangeValue} />;

		} else if ( typeof value == "boolean"	) {

			inputElm = <InputBoolean checked={value} onChange={onChangeValue}/>;

		} else if ( typeof value == "function" ) {

			const text = "btn";

			inputElm = <Button onClick={() => {

				( value as () => void )();

			}} >
				{text}
			</ Button >;

		}

	}

	return inputElm;

};
