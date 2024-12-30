import { useContext } from "react";

import { OREngineContext } from "../../components/OREngine/Context/OREngineContext";

export const useOREngine = () => {

	const context = useContext( OREngineContext );

	if ( context === null ) {

		throw new Error( "useOREngine must be used within a OREngineProvider" );

	}

	return context;

};
