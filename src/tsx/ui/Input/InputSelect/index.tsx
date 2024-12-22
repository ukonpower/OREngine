

import style from './index.module.scss';

interface InputTextProps {
	value: string;
	selectList: ( {label: string, value: any} | string )[],
	onChange?: ( value: string ) => void;
	disabled?: boolean;
	readOnly?: boolean;
}

export const InputSelect = ( { onChange, value, ...props }: InputTextProps ) => {

	if ( props.readOnly ) {

		return <div className={style.inputSelect}>
			<input className={style.input} value={value} readOnly={true} />
		</div>;

	}

	return <div className={style.inputSelect}>
		<select className={style.input} onChange={( e ) => {

			if ( onChange ) {

				onChange( e.target.value );

			}

		}} value={value}>
			{props.selectList.map( ( v, i ) => {

				let label = "";
				let value = "";

				if ( typeof v === "string" ) {

					label = v;
					value = v;

				} else {

					label = v.label;
					value = v.value;

				}

				return <option key={i} value={value}>{label}</option>;

			} ) }
		</select>
	</div>;


};
