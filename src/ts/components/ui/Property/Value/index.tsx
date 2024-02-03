import { useCallback } from 'react';

import style from './index.module.scss';
import { ValueInput } from './ValueInput';

export type ValueType = number | boolean | string;

export type ValueProps = {
	label?: string
	value: ValueType,
	precision?: number
	slideScale?: number,
	readOnly?: boolean,
	onChange?: ( value: ValueType, label: string ) => void
}

export const Value = ( props: ValueProps ) => {

	const label = props.label;
	const onChange = props.onChange;

	const onChangeValue = useCallback( ( e: ValueType ) => {

		if ( onChange ) {

			onChange( e, label || '' );

		}

	}, [ label, onChange ] );

	return <div className={style.value} >
		{props.label && <div className={style.value_label}>{props.label}</div>}
		<ValueInput value={props.value} onChange={onChangeValue} slideScale={props.slideScale} precision={props.precision} readOnly={props.readOnly} />
	</div>;

};
