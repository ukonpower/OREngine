import { SerializeFieldObjective } from "maxpower";
import React from "react";

import { Label } from "../Label";
import { Value, ValueProps } from "../Value";

import style from './index.module.scss';

export const ValueArray = <T extends SerializeFieldObjective[]>( props: ValueProps<T> ) => {

	const elms: React.ReactNode[] = [];
	const value = props.value;
	const format = props.format;
	const labelCb = format?.type == "array" ? format.labels : undefined;

	if ( value === undefined ) return null;

	for ( let i = 0; i < value.length; i ++ ) {

		const arrayValue = value[ i ];

		let label = i.toString();

		if ( labelCb ) {

			label += "/ " + labelCb( arrayValue, i );

		}

		elms.push(
			<Label title={label} key={i}>
				<Value {...props} value={arrayValue} onChange={( v ) => {

					const newValue = value.concat();

					newValue[ i ] = v;

					if ( props.onChange ) {

						props.onChange( newValue as T );

					}

				}}/>
			</Label>
		);

	}

	return <div className={style.container}>{elms}</div>;

};
