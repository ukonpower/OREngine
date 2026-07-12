import React, { useEffect, useState } from "react";

import { Editor } from "../../../lib";
import { useOREngine } from "../../OREngine/hooks/useOREngine";


export const useOREditorContext = ( projectName?: string ) => {

	const { engine } = useOREngine();

	const [ editor, setEditor ] = useState<Editor>( () => new Editor( engine ) );
	const editorRef = React.useRef<Editor>( editor );
	editorRef.current = editor;

	useEffect( () => {

		if ( ! editorRef.current.disposed && editorRef.current.engine.uuid == engine.uuid ) return;

		const editor = new Editor( engine );

		setEditor( editor );

	}, [ engine ] );

	useEffect( () => {

		return () => {

			editor.dispose();

		};


	}, [ editor ] );

	return {
		engine,
		editor,
		projectName,
	};

};
