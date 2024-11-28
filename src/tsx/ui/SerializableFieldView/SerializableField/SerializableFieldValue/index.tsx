import { useSerializableFieldView } from '../..';

import { useSerializableField } from '~/tsx/hooks/useSerializableProps';
import { Label } from '~/tsx/ui/Label';
import { Value } from '~/tsx/ui/Value';

export const SerializableFieldValue: React.FC<{ path: string }> = ( props ) => {

	const { target } = useSerializableFieldView();
	const [ value, setValue ] = useSerializableField( target, props.path );
	const opt = target.getFieldOpt( props.path );
	const name = props.path.split( "/" ).pop();

	let isVertical = false;

	if ( opt && opt.format && opt.format.type == "vector" ) {

		isVertical = true;

	}

	return <Label title={name} vertical={isVertical} >
		<Value value={value} format={opt?.format} onChange={( v ) => {

			setValue( v );

		}}/>
	</Label>;

};
