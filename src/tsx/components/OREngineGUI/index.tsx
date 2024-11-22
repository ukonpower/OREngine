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

	const gui = guiRef.current;
	
	useEffect( () => {

		return () => {

			if( guiRef.current ) {

				guiRef.current.dispose();
				guiRef.current = null;	
				
			}

		};

	}, [] );

	return {
		gui,
		engine: gui.engine
	};

};


const OREngineGUIContext = createContext<
  ReturnType<typeof useOREngineGUIContext> | undefined
>( undefined );

export const useOREngineGUI = () => {

	const context = useContext( OREngineGUIContext );
	
	if ( context === undefined )
		throw new Error( 'useOREngineGUI must be used within a OREditorProvider' );
	
	return context;

};

export const OREngineGUI: React.FC<{ children?: React.ReactNode }> = ( {
	children,
} ) => {

	const context = useOREngineGUIContext();

	return (
		<OREngineGUIContext.Provider value={context}>
			{children}
		</OREngineGUIContext.Provider>
	);

};