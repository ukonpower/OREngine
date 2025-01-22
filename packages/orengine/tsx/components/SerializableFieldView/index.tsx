import * as MXP from 'maxpower';
import { createContext, useContext } from 'react';

import { useWatchSerializable } from '../../hooks/useWatchSerializable';

import { SerializableField } from './SerializableField';

const SerializableFieldViewContext = createContext<ReturnType<typeof useSerializableFieldViewContext> | undefined>( undefined );

type SerializableFieldViewProps = {
	target: MXP.Serializable
}

const useSerializableFieldViewContext = ( props: SerializableFieldViewProps ) => {

	return {
		target: props.target
	};

};

export const useSerializableFieldView = () => {

	const context = useContext( SerializableFieldViewContext );

	if ( ! context ) {

		throw new Error( "SerializableFieldViewContext is not defined" );

	}

	return context;

};

export const SerializableFieldView: React.FC<SerializableFieldViewProps > = ( props ) => {

	const context = useSerializableFieldViewContext( props );

	useWatchSerializable( context.target );

	const fields = context.target.serializeToDirectory();

	return <SerializableFieldViewContext.Provider value={context} >
		<SerializableField fields={fields}/>
	</SerializableFieldViewContext.Provider>;

};
