import { useCallback } from 'react';

import style from './index.module.scss';
import { ValueInput } from './ValueInput';

export type ValueType = number | boolean | string;

export type ValueProps = {
	label?: string
	value: ValueType,
	precision?: number
	readOnly?: boolean,
	onChange?: ( label: string, value: ValueType ) => void
}

export const Value = ( props: ValueProps ) => {

	const value = props.value;
	const onChange = props.onChange;
	const label = props.label;

	const onChangeValue = useCallback( ( e: ValueType ) => {

		if ( onChange ) {

			onChange( label || '', e );

		}

	}, [ label, onChange ] );

	return <div className={style.value} >
		{props.label && <div className={style.value_label}>{props.label}</div>}
		<ValueInput value={value} onChange={onChangeValue} readOnly={props.readOnly} />
	</div>;

};
