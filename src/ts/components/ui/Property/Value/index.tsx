import { useCallback } from 'react';

import { InputBoolean } from '../../Input/InputCheckBox';
import { InputNumber } from '../../Input/InputNumber';
import { InputSelect } from '../../Input/InputSelect';
import { InputText } from '../../Input/InputText';

import style from './index.module.scss';

export type ValueType = number | boolean | string | Array<String>;

export type ValueOpt = {
	readOnly?: boolean,
	precision?: number,
	selectList?: string[]
	slideScale?: number,
}

export type ValueProps = {
	label?: string
	value: ValueType,
	onChange?: ( value: ValueType, label: string ) => void
	vertical?: boolean
	disabled?: boolean
	labelAutoWidth?: boolean
} & ValueOpt

export const Value = ( { value, label, onChange, ...props }: ValueProps ) => {

	/*-------------------------------
		Change
	-------------------------------*/

	const onChangeValue = useCallback( ( e: ValueType ) => {

		if ( props.disabled ) return;

		if ( onChange ) {

			onChange( e, label || '' );

		}

	}, [ label, onChange, props.disabled ] );

	/*-------------------------------
		Elm
	-------------------------------*/

	let inputElm = null;

	if ( typeof value == "string" ) {

		const selctList = props.selectList;

		if ( selctList ) {

			inputElm = <InputSelect {...props} value={value} onChange={onChangeValue} selectList={selctList} />;

		} else {

			inputElm = <InputText {...props} value={value} onChange={onChangeValue} />;

		}

	}

	if ( typeof value == "number" ) {

		inputElm = <InputNumber {...props} value={value} onChange={onChangeValue} />;

	}

	if ( typeof value == "boolean" ) {

		inputElm = <InputBoolean {...props} checked={value} onChange={onChangeValue} />;

	}

	return <div className={style.value} data-value_vertical={props.vertical} >
		{label && <div className={style.value_label} data-auto_width={props.labelAutoWidth} >{label}</div>}
		<div className={style.input}>
			<div className={style.input_value}></div>
			{inputElm}
		</div>
	</div>;

};
