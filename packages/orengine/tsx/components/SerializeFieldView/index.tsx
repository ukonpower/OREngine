import * as MXP from 'maxpower';
import { createContext, useContext } from 'react';

import { useWatchSerializable } from '../../hooks/useWatchSerializable';

import { SerializeFieldViewDir } from './SerializeFieldViewDir';

const SerializeFieldViewContext = createContext<ReturnType<typeof useSerializeFieldViewContext> | undefined>( undefined );

type SerializeFieldViewProps = {
	target: MXP.Serializable
}

const useSerializeFieldViewContext = ( props: SerializeFieldViewProps ) => {

	useWatchSerializable( props.target );

	return {
		target: props.target
	};

};

export const useSerializeFieldView = () => {

	const context = useContext( SerializeFieldViewContext );

	if ( ! context ) {

		throw new Error( "SerializeFieldViewContext is not defined" );

	}

	return context;

};

export const SerializeFieldView: React.FC<SerializeFieldViewProps > = ( props ) => {

	const context = useSerializeFieldViewContext( props );

	const fields = context.target.serializeToDirectory();

	return <SerializeFieldViewContext.Provider value={context} >
		<SerializeFieldViewDir fields={fields}/>
	</SerializeFieldViewContext.Provider>;

};
