import { SerializableFieldType, SerializeFieldValue } from 'maxpower';

import { Button } from '../Button';
import { InputBoolean } from '../Input/InputCheckBox';
import { InputNumber } from '../Input/InputNumber';
import { InputSelect } from '../Input/InputSelect';
import { InputText } from '../Input/InputText';
import { Vector } from '../Vector';

export type ValueProps<T extends SerializeFieldValue> = {
	value: T | undefined,
	onChange?: ( value: T ) => void
	disabled?: boolean,
	format?: SerializableFieldType,
	readOnly?: boolean,
}

export const Value = <T extends SerializeFieldValue>( { value, onChange, format, readOnly }: ValueProps<T> ) => {

	let inputElm = null;

	if ( format ) {

		if ( format.type == "vector" && Array.isArray( value ) ) {

			inputElm = <Vector value={value} onChange={( v ) => {

				if ( onChange ) {

					onChange( v as T );

				}

			}} />;

		} else if ( format.type == "select" ) {

			inputElm = <InputSelect value={value} onChange={onChange} selectList={format.list}/>;

		}

	}

	if ( ! inputElm ) {

		if ( typeof value === "number" ) {

			inputElm = <InputNumber value={value} onChange={onChange} />;

		} else if ( typeof value === "string" ) {

			inputElm = <InputText value={value} readOnly={readOnly} onChange={onChange} />;

		} else if ( typeof value == "boolean"	) {

			inputElm = <InputBoolean checked={value} onChange={onChange}/>;

		} else if ( typeof value == "function" ) {

			const text = "btn";

			inputElm = <Button onClick={() => {

				value();

			}} >
				{text}
			</ Button >;

		}

	}

	return inputElm;

};
