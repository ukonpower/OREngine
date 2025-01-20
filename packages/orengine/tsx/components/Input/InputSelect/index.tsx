import style from './index.module.scss';

interface InputTextProps<T> {
	value: T;
	selectList: ( {label: string, value: T} | string )[],
	onChange?: ( value: T ) => void;
	disabled?: boolean;
	readOnly?: boolean;
}

export const InputSelect = <T extends string | number, >( { onChange, value, ...props }: InputTextProps<T> ) => {

	if ( props.readOnly ) {

		return <div className={style.inputSelect}>
			<input className={style.input} value={value} readOnly={true} />
		</div>;

	}

	return <div className={style.inputSelect}>
		<select className={style.input} onChange={( e ) => {

			if ( onChange ) {

				onChange( e.target.value as T );

			}

		}} value={value}>
			{props.selectList.map( ( v, i ) => {

				let label = "";
				let value: string | number = "";

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
