import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

import { OREngineGUICore } from '~/ts/OREngineGUICore';

/*-------------------------------
	Editor
-------------------------------*/

const useOREngineGUIContext = () => {

	const [ gui, setGUI ] = useState<OREngineGUICore>( () => new OREngineGUICore() );

	useEffect( () => {

		if ( gui.disposed ) {

			const gui = new OREngineGUICore();
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
