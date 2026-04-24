
import { useContext } from "react";

import { InputWindowContext } from "../components/InputWindow/contexts/InputWindowContext";

export const useInputWindow = () => {

	const context = useContext( InputWindowContext );

	if ( context === null ) {

		throw new Error( "useInputWindow must be used within InputWindowContext" );

	}

	return context;

};
