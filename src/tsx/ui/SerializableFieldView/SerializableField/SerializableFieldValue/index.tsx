import { useSerializableFieldView } from '../..';

import { useSerializableField } from '~/tsx/hooks/useSerializableProps';
import { Label } from '~/tsx/ui/Label';
import { Value } from '~/tsx/ui/Value';

export const SerializableFieldValue: React.FC<{ path: string }> = ( props ) => {

	const { target } = useSerializableFieldView();
	const [ value, setValue ] = useSerializableField( target, props.path );
	const opt = target.getFieldOpt( props.path );
	const name = props.path.split( "/" ).pop();

	return <Label title={name} >
		<Value value={value} opt={opt} onChange={( v ) => {

			setValue( v );

		}}/>
	</Label>;

};
