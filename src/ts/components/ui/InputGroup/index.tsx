import { Button } from "../Button";
import { PropertyBlock } from "../Property/PropertyBlock";
import { Value } from "../Property/Value";
import { ValueInputProps } from "../Property/Value/ValueInput";

import style from './index.module.scss';

export type InputGroupProps = {
	initialValues: {[key: string]:ValueInputProps<any>}
}

export const InputGroup = ( props: InputGroupProps ) => {

	const initialValuees = props.initialValues;

	const propKeys = Object.keys( props.initialValues );

	const propElms: JSX.Element[] = [];

	for ( let i = 0; i < propKeys.length; i ++ ) {

		const key = propKeys[ i ];
		const prop = initialValuees[ key ];
		const value = prop.value;
		// const opt = prop.opt;

		console.log( prop.value );


		propElms.push( <Value key={i} label={key} value={value} onChange={() =>{

			console.log( "onChange" );

		} } /> );

	}

	console.log( "aaa" );


	return <div className="">
		<PropertyBlock label="Params" noMargin >
			{propElms}
		</PropertyBlock>
		<div className={style.submit}>
			<Button >OK</Button>
		</div>
	</div>;

};
