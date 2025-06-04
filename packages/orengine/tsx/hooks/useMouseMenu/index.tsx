import { useContext } from "react";

import { MouseMenuContext } from "../../components/MouseMenu/Context/MouseMenuContext";

export const useMouseMenu = () => {

	const context = useContext( MouseMenuContext );
	if ( context === null ) {

		throw new Error( "useMouseMenu must be used within a MouseMenuProvider" );

	}

	return context;

};
