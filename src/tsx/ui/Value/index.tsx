import { SerializableFieldOpt, SerializeFieldValue } from 'maxpower';

import { Button } from '../Button';
import { InputBoolean } from '../Input/InputCheckBox';
import { InputNumber } from '../Input/InputNumber';
import { InputText } from '../Input/InputText';
import { Vector } from '../Vector';

import style from './index.module.scss';

export type ValueProps<T extends SerializeFieldValue> = {
	value: T | undefined,
	onChange?: ( value: T ) => void
	disabled?: boolean,
	opt?: SerializableFieldOpt,
}

export const Value = <T extends SerializeFieldValue>( { value, onChange, opt, }: ValueProps<T> ) => {

	let inputElm = null;

	if ( opt ) {

		if ( opt.format ) {

			if ( opt.format.type == "vector" && Array.isArray( value ) ) {

				inputElm = <Vector value={value} onChange={( v ) => {

					if ( onChange ) {

						onChange( v as T );

					}

				}} />;

			}

		}

	}

	if ( ! inputElm ) {

		if ( typeof value === "number" ) {

			inputElm = <InputNumber value={value} onChange={onChange} />;

		} else if ( typeof value === "string" ) {

			inputElm = <InputText value={value} onChange={onChange} />;

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
