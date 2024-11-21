import React, { createContext, useContext, useEffect, useRef } from 'react';
import { OREngineGUICore } from '~/ts/OREngineGUICore';


/*-------------------------------
	Editor
-------------------------------*/

const useOREngineGUIContext = () => {

	const guiRef = useRef<OREngineGUICore | null>( null );

	if( guiRef.current == null ) {

		guiRef.current = new OREngineGUICore();

	}

	useEffect( () => {

		return () => {

			if( guiRef.current ) {

				guiRef.current.dispose();
				guiRef.current = null;	
				
			}

		};

	}, [] );

	return {
		editor: guiRef.current,
	};

};


const OREditorContext = createContext<
  ReturnType<typeof useOREngineGUIContext> | undefined
>( undefined );

export const useOREngineGUI = () => {

	const context = useContext( OREditorContext );
	
	if ( context === undefined )
		throw new Error( 'useOREngineGUI must be used within a OREditorProvider' );
	
	return context;

};

export const OREditor: React.FC<{ children?: React.ReactNode }> = ( {
	children,
} ) => {

	const context = useOREngineGUIContext();

	return (
		<OREditorContext.Provider value={context}>
			{children}
		</OREditorContext.Provider>
	);

};