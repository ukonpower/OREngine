import { ReactNode, useEffect } from "react";

import * as MXP from "maxpower";
import { OREngineProjectData } from "orengine";

import { OREditorContext } from "../contexts/OREditorContext";
import { useOREditorContext } from "../hooks/useOREditorContext";

export type OREditorSaveCallback = ( projectData: OREngineProjectData, editorData: MXP.SerializeField ) => void;

// Editor インスタンスを生成し、保存コールバックと初期化を紐付けて配下ツリーへ提供する
export const OREditorProvider: React.FC<{ children?: ReactNode, projectName?: string, onSave?: OREditorSaveCallback, editorData?: MXP.SerializeField }> = ( props ) => {

	const editorContext = useOREditorContext( props.projectName );

	useEffect( () => {

		if ( ! editorContext.editor || ! props.onSave ) return;

		editorContext.editor.on( "save", props.onSave );

		return () => {

			editorContext.editor.off( "save", props.onSave );

		};

	}, [ editorContext.editor, props.onSave ] );

	useEffect( () => {

		if ( ! editorContext.editor ) return;

		editorContext.editor.bootstrap( props.editorData );

	}, [ props.editorData, editorContext.editor ] );

	return <OREditorContext.Provider value={editorContext}>{props.children}</OREditorContext.Provider>;

};
