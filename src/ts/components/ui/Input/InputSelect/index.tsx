

import style from './index.module.scss';

interface InputTextProps {
	value: string;
	selectList: string[],
	onChange?: ( value: string ) => void;
	disable?: boolean;
	readOnly?: boolean;
}

export const InputSelect = ( { onChange, value, ...props }: InputTextProps ) => {

	console.log( value );

	return <div className={style.inputSelect}>
		<select className={style.input} onChange={( e ) => {

			console.log( e );


			onChange && onChange( e.target.value );

		}} value={value}>
			{props.selectList.map( ( v, i ) => {

				return <option key={i} value={v}>{v}</option>;

			} ) }
		</select>
	</div>;


};
