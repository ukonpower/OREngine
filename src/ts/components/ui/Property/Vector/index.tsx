import * as GLP from 'glpower';
import { useCallback, useRef } from 'react';

import { Value, ValueType } from '../Value';

import style from './index.module.scss';

type VectorProps = {
	value: GLP.IVector4,
	type?: "vec2"| "vec3"| "vec4"
	slideScale?: number,
	disabled?: boolean,
	onChange?: ( value: GLP.IVector4 ) => void
}

export const Vector = ( { onChange, disabled, ...props }: VectorProps ) => {

	const valueRef = useRef<GLP.IVector4>( );
	valueRef.current = props.value;

	const onChangeValue = useCallback( ( value: ValueType, label: string ) => {

		if ( onChange && valueRef.current ) {

			const val: any = {
				x: valueRef.current.x,
				y: valueRef.current.y,
				z: valueRef.current.z,
				w: valueRef.current.w
			};

			val[ label.toLowerCase() ] = value as number;

			onChange( val );

		}

	}, [ onChange ] );

	const array = [
		<Value key={"x"} label='X' disabled={disabled} value={props.value.x} slideScale={props.slideScale} onChange={onChangeValue}/>,
		<Value key={"y"} label='Y' disabled={disabled} value={props.value.y} slideScale={props.slideScale} onChange={onChangeValue}/>
	];

	if ( ! props.type || props.type == "vec3" || props.type == "vec4" ) {

		array.push( <Value key={"z"} label='Z' disabled={disabled} value={props.value.z} slideScale={props.slideScale} onChange={onChangeValue}/> );

	}

	if ( props.type == "vec4" ) {

		array.push( <Value key={"w"} label='W' disabled={disabled} value={props.value.w} slideScale={props.slideScale} onChange={onChangeValue}/> );

	}


	return <div className={style.vector}>
		{array.map( ( value ) => {

			return value;

		} )}
	</div>;

};
