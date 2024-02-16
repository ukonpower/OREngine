

import style from './index.module.scss';

interface InputTextProps {
	value: string;
	selectList: string[],
	onChange?: ( value: string ) => void;
	disable?: boolean;
	readOnly?: boolean;
}

export const InputSelect = ( { onChange, value, ...props }: InputTextProps ) => {

	return <div className={style.inputSelect}>
		{/* <input className={style.input} type="text" value={value || '-'} disabled={props.disable} readOnly={props.readOnly}
			onChange={( e ) => {

				onChange && onChange( e.target.value );

			}}
		/> */}

		<select className={style.input} name="choice">
			<option value="first">First Value</option>
			<option value="second" selected>Second Value</option>
			<option value="third">Third Value</option>
		</select>
	</div>;


};
