import { useContext } from 'react';

import { SerializeFieldViewContext } from '../contexts/SerializeFieldViewContext';

export const useSerializeFieldView = () => {

	const context = useContext( SerializeFieldViewContext );
	if ( ! context ) {

		throw new Error( 'SerializeFieldViewContext is not defined' );

	}

	return context;

};
