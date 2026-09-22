import { useContext } from "react";

import { PopoverContext } from "../contexts/PopoverContext";

export const usePopover = () => {

	const context = useContext( PopoverContext );

	if ( context === null ) {

		throw new Error( "usePopover must be used within PopoverProvider" );

	}

	return context;

};
