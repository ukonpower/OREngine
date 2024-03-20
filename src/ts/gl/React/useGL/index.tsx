import { createContext, useEffect, useState } from 'react';

import { GLEditor } from '../../Editor';

export type TGLContext = HooksContext<typeof useGL>;
export const GLContext = createContext<TGLContext>( {} );

export const useGL = () => {

	const [ glEditor, setGLEditor ] = useState<GLEditor>();

	useEffect( () => {

		const glEditor = new GLEditor();
		setGLEditor( glEditor );

		return () => {

			glEditor.dispose();

		};

	}, [] );

	return {
		glEditor
	};

};
