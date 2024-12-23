import { useEffect, useState } from "react";

import { Editor } from "../../../../ts/Editor";
import { useOREngine } from "../../../hooks/useOREngine";

export const useOREditorContext = () => {

	const { engine } = useOREngine();
	const [ gui, setGUI ] = useState<Editor>( new Editor( engine ) );

	useEffect( () => {

		return () => {

			gui.dispose();

		};

	}, [ gui ] );

	return {
		engine,
		gui
	};

};
