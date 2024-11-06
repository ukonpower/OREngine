import React, { createContext, useContext, useEffect, useState } from 'react';

import { Editor } from '~/ts/gl/Editor';

const useOREditorProvider = () => {

	const [ editor, setEditor ] = useState<Editor>( new Editor() );

	useEffect( () => {

		return () => {

			editor.dispose();

		};

	}, [] );

	return {
		editor,
	};

};

const OREditorContext = createContext<
  ReturnType<typeof useOREditorProvider> | undefined
>( undefined );

export const OREditor: React.FC<{ children: React.ReactNode }> = ( {
	children,
} ) => {

	const context = useOREditorProvider();

	return (
		<OREditorContext.Provider value={context}>
			{children}
		</OREditorContext.Provider>
	);

};

export const useOREditor = () => {

	const context = useContext( OREditorContext );
	if ( context === undefined )
		throw new Error( 'useOREditor must be used within a OREditorProvider' );
	return context;

};
