import * as GLP from 'glpower';

import { Value } from '../Value';

import style from './index.module.scss';

type VectorProps = {
	value: GLP.IVector4,
	type?: "vec2"| "vec3"| "vec4"
	onChange?: ( value: GLP.Vector ) => {}
}

export const Vector = ( props: VectorProps ) => {

	const array = [
		<Value key={"x"} label='X' value={props.value.x} editable/>,
		<Value key={"y"} label='Y' value={props.value.y} editable/>
	];

	if ( ! props.type || props.type == "vec3" || props.type == "vec4" ) {

		array.push( <Value key={"z"} label='Z' value={props.value.z} editable/> );

	}

	if ( props.type == "vec4" ) {

		array.push( <Value key={"w"} label='W' value={props.value.w} editable/> );

	}


	return <div className={style.vector}>
		{array.map( ( value ) => {

			return value;

		} )}
	</div>;

};
