import * as GLP from 'glpower';
import { useCallback, useRef } from 'react';

import { InputNumber } from '../Input/InputNumber';
import { Label } from '../Label';

import style from './index.module.scss';

type VectorProps = {
	value: number[],
	step?: number,
	disabled?: boolean,
	onChange?: ( value: GLP.IVector4 ) => void
}

const axisDict = [ "x", "y", "z", "w" ];

export const Vector = ( { onChange, disabled, ...props }: VectorProps ) => {

	const valueRef = useRef<number[]>( );
	valueRef.current = props.value;

	const onChangeValue = useCallback( ( axisIndex: number, newAxisValue: ValueType ) => {

		if ( onChange && valueRef.current ) {

			const newValue: any = {};

			for ( let i = 0; i < valueRef.current.length; i ++ ) {

				newValue[ i ] = valueRef.current[ i ];

			}

			newValue[ axisIndex ] = newAxisValue as number;

			onChange( newValue );

		}

	}, [ onChange ] );

	const array = [];

	for ( let i = 0; i < props.value.length; i ++ ) {

		array.push(
			<Label title={axisDict[ i ]} > <InputNumber key={i} disabled={disabled} value={props.value[ i ]} step={props.step} onChange={( value ) => {

				onChangeValue( i, value );

			}}/></Label> );

	}

	return <div className={style.vector}>
		{array.map( ( value ) => {

			return value;

		} )}
	</div>;

};
