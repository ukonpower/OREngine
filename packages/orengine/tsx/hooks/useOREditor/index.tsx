import { useContext } from "react";

import { OREditorContext } from "../../components/OREditor/Context/OREditorContext";

export const useOREditor = () => {

	const context = useContext( OREditorContext );

	if ( context === null ) {

		throw new Error( "useEditor must be used within a EditorProvider" );

	}

	return context;

};
