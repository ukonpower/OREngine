import style from './index.module.scss';

type ValueProps = {
	label?: string
	value: string | number,
	precision?: number
	editable?: boolean,
	onChange?: ( key: string, value: string ) => void
}

export const Value = ( props: ValueProps ) => {

	let value = props.value;

	if ( typeof value == "number" ) {

		value = value.toFixed( props.precision || 3 );

	}

	return <div className={style.value} >
		{props.label && <div className={style.value_label}>{props.label}</div>}
		{
			props.editable ?
				<input className={style.value_value} data-editable type="text" value={value} onChange={( e ) => {

					if ( props.onChange ) {

						props.onChange( props.label || '', e.target.value );

					}

				}}/> :
				<div className={style.value_value} >
					{value}
				</div>
		}

	</div>;

};
