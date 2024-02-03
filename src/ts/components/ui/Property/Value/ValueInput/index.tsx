
import { InputBoolean } from '../../../Input/InputCheckBox';
import { InputNumber } from '../../../Input/InputNumber';
import { InputText } from '../../../Input/InputText';

import style from './index.module.scss';

export type ValueInputProps<T> = {
	value: T,
	readOnly?: boolean,
	precision?: number
	onChange?: ( value: T ) => void
	slideScale?: number
}

export const ValueInput = <T extends number | boolean | string, >( { value, onChange, readOnly, ...props }: ValueInputProps<T> ) => {

	if ( typeof value == "string" ) {

		return <div className={style.input}>
			<div className={style.input_value}>
				<InputText value={value} readOnly={readOnly} onChange={( value ) => {

					onChange && onChange( value as T );

				}}/>
			</div>
		</div>;

	}

	if ( typeof value == "number" ) {

		return <div className={style.input}>
			<div className={style.input_value}>
				<InputNumber value={value} readOnly={readOnly} slideScale={props.slideScale} precision={props.precision} onChange={( value ) => {

					onChange && onChange( value as T );

				}}/>
			</div>
		</div>;

	}

	if ( typeof value == "boolean" ) {

		return <div className={style.input}>
			<div className={style.input_value}>
				<InputBoolean checked={value} onChange={( checked ) => {

					onChange && onChange( checked as T );

				}} readOnly={readOnly} />
			</div>
		</div>;

	}

};
