import React, { useEffect, useState } from "react";

import { Editor } from "../../../../../ts/Editor";
import { useOREngine } from "../../../../hooks/useOREngine";

export const useOREditorContext = () => {

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
		editor
	};

};
