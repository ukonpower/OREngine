import React, { createContext, useContext, useEffect, useState } from 'react';

import { Editor } from '../../../ts/GUI';

/*-------------------------------
	Editor
-------------------------------*/

const useOREngineGUIContext = () => {

	const [ gui, setGUI ] = useState<Editor>( () => new Editor() );

	useEffect( () => {

		if ( gui.disposed ) {

			const gui = new Editor();
			setGUI( gui );

		}

		return () => {

			gui.dispose();

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
