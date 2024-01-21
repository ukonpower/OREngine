import style from './index.module.scss';

type ValueProps = {
	label?: string
	value: string | number,
	precision?: number
	editable?: boolean,
}

export const Value = ( props: ValueProps ) => {

	let value = props.value;

	if ( typeof value == "number" ) {

		value = value.toFixed( props.precision || 3 );

	}

	return <div className={style.value} >
		{props.label && <div className={style.value_label}>{props.label}</div>}
		<div className={style.value_value} data-editable={props.editable}>
			{value}
		</div>
	</div>;

};
