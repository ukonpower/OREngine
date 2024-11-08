import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

import { Editor } from '~/ts/gl/Editor';

const useOREditorProvider = () => {

	const editorRef = useRef<Editor | null>( null );

	if( editorRef.current == null ) {

		console.log("new");
		
		
		editorRef.current = new Editor();

	}

	useEffect(() => {

		
	},[])

	useEffect( () => {

		return () => {

			console.log("daaaapo");
			if( editorRef.current ) {

				editorRef.current.dispose();
				editorRef.current = null;	
				
			}

		};

	}, [] );

	return {
		editor: editorRef.current,
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
