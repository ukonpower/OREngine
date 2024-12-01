import { SerializeFieldsAsDirectoryValue } from 'maxpower';

import { useSerializableFieldView } from '../..';

import { Label } from '~/tsx/ui/Label';
import { Value } from '~/tsx/ui/Value';

export const SerializableFieldValue: React.FC<{ path:string, field: SerializeFieldsAsDirectoryValue }> = ( props ) => {

	const { target } = useSerializableFieldView();
	const value = props.field.value;
	const opt = props.field.opt;
	const name = props.path.split( "/" ).pop();

	let isVertical = false;

	if ( opt && opt.format && opt.format.type == "vector" ) {

		isVertical = true;

	}

	return <Label title={name} vertical={isVertical} >
		<Value value={value} format={opt?.format} onChange={( v ) => {

			target.setField( props.path, v );

		}}/>
	</Label>;

};
