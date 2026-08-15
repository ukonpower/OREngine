import React from 'react';

import { SerializableFieldFormat, SerializeFieldObjective } from 'maxpower';

import { Button } from '../../../../../../components/ui/Button';
import { InputBoolean } from '../../../../../../components/ui/Input/InputCheckBox';
import { InputColor } from '../../../../../../components/ui/Input/InputColor';
import { InputNumber } from '../../../../../../components/ui/Input/InputNumber';
import { InputSelect } from '../../../../../../components/ui/Input/InputSelect';
import { InputText } from '../../../../../../components/ui/Input/InputText';
import { Vector } from '../../../../../../components/ui/Vector';
import { InputComponentRef } from '../InputComponentRef';
import { InputEntityRef } from '../InputEntityRef';
import { InputResourceSelect } from '../InputResourceSelect';

export type ValueType = SerializeFieldObjective;

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

	if ( format ) {

		if ( format.type == "entity" ) {

			inputElm = <InputEntityRef value={value as string | null} onChange={onChangeValue} />;

		} else if ( format.type == "component" ) {

			inputElm = <InputComponentRef value={value as string | null} onChange={onChangeValue} />;

		} else if ( format.type == "vector" && Array.isArray( value ) ) {

			inputElm = <Vector value={value as number[]} onChange={onChangeValue} />;

		} else if ( format.type == "color" && Array.isArray( value ) ) {

			inputElm = <InputColor value={value as number[]} onChange={onChangeValue} />;

		} else if ( format.type == "select" ) {

			inputElm = <InputSelect value={value} onChange={onChangeValue} selectList={format.list}/>;

		} else if ( format.type == "resource" ) {

			inputElm = <InputResourceSelect value={value} onChange={onChangeValue} selectList={format.list} resourceType={format.resourceType}/>;

		}

	}

	if ( value === undefined || value === null ) return inputElm;

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
