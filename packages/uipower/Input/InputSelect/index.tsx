import style from './index.module.scss';

// 選択肢。ラベルと値を分けたいときだけオブジェクトで渡す
export type SelectOption = string | {
	label: string;
	value: string | number;
}

interface InputSelectProps<T> {
	value: T;
	selectList: SelectOption[] | ( () => SelectOption[] ),
	onChange?: ( value: T ) => void;
	disabled?: boolean;
	readOnly?: boolean;
}

export const InputSelect = <T extends string | number, >( { onChange, value, ...props }: InputSelectProps<T> ) => {

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
