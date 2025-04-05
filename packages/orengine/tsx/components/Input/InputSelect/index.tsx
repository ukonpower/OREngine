import style from './index.module.scss';

export type SelectList = ( {
	value: any,
	label: string,
} | string )[]

interface InputTextProps<T> {
	value: T;
	selectList: SelectList | ( () => SelectList ),
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

	let list = props.selectList;

	if ( typeof list == "function" ) {

		list = list();

	}

	return <div className={style.inputSelect}>
		<select className={style.input} onChange={( e ) => {

			if ( onChange ) {

				onChange( e.target.value as T );

			}

		}} value={value}>
			{list.map( ( v, i ) => {

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
