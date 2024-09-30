import { createContext } from 'react';

import { TGLContext } from '../useGL';

export const EditorContext = createContext<HooksContext<typeof useEditor>>( {} );

export const useEditor = ( glContext: TGLContext ) => {

	const { glEditor } = glContext;

	return {
		glEditor,
	};

};
