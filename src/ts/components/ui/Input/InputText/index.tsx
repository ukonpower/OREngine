

import style from './index.module.scss';

interface InputTextProps {
	value: string;
	onChange?: ( value: string ) => void;
	disable?: boolean;
	readOnly?: boolean;
}

export const InputText = ( { onChange, value, ...props }: InputTextProps ) => {

	return <div className={style.inputNumber}>
		<input className={style.input} type="text" value={value || '-'} disabled={props.disable} readOnly={props.readOnly}
			onChange={( e ) => {

				onChange && onChange( e.target.value );

			}}
		/>
	</div>;


};
