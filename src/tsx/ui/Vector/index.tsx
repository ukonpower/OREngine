import * as GLP from 'glpower';
import { useCallback, useRef } from 'react';

import { Value, ValueType } from '../Value';

import style from './index.module.scss';

type VectorProps = {
	value: number[],
	step?: number,
	disabled?: boolean,
	onChange?: ( value: GLP.IVector4 ) => void
}

const axisDict = ["x", "y", "z", "w"]

export const Vector = ( { onChange, disabled, ...props }: VectorProps ) => {

	const valueRef = useRef<number[]>( );
	valueRef.current = props.value;

	const onChangeValue = useCallback( ( axisIndex: number, newAxisValue: ValueType ) => {

		if ( onChange && valueRef.current ) {

			const newValue: any = {}

			for ( let i = 0; i < valueRef.current.length; i++ ) {

				newValue[i] = valueRef.current[i]
				
			}

			newValue[ axisIndex ] = newAxisValue as number;

			onChange( newValue );

		}

	}, [ onChange ] );

	const array = [];
	
	for ( let i = 0; i < props.value.length; i++ ) {
		
		array.push( <Value key={i} label={axisDict[i]} disabled={disabled} value={props.value[i]} step={props.step} onChange={(value) => {onChangeValue(i,value)}}/> );
		
	}

	return <div className={style.vector}>
		{array.map( ( value ) => {

			return value;

		} )}
	</div>

};
