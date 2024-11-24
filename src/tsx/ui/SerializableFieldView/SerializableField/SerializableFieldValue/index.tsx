import { useSerializableFieldView } from '../..';

import { useSerializableField } from '~/tsx/hooks/useSerializableProps';
import { Vector } from '~/tsx/ui/Vector';

export const SerializableFieldValue: React.FC<{ path: string }> = ( props ) => {

	const { target } = useSerializableFieldView();
	const [ value, setValue ] = useSerializableField( target, props.path );
	const opt = target.getFieldOpt( props.path );

	let elm = null;

	if ( opt ) {

		if ( opt.format ) {

			if ( opt.format.type == "vector" && Array.isArray( value ) ) {

				elm = <Vector value={value} onChange={( v ) => {

					setValue( v );

				}} />;

			}

		}

	}

	if ( ! elm && typeof value === "number" ) {

		elm = <div className="">aaa</div>;

	}

	return elm;

};
