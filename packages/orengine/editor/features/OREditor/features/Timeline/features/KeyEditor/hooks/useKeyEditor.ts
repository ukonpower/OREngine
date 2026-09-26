import { useContext } from "react";

import { KeyEditorContext } from "../contexts/KeyEditorContext";

export const useKeyEditor = () => {

	const context = useContext( KeyEditorContext );

	if ( context === null ) {

		throw new Error( "useKeyEditor must be used within a KeyEditorProvider" );

	}

	return context;

};
