import { ReactNode, useEffect, useRef } from "react";

import * as MXP from "maxpower";
import { OREngineProjectData } from "orengine";

import { attachAgentBridge, type AgentSceneControl } from "../../../lib";
import { OREditorContext } from "../contexts/OREditorContext";
import { useOREditorContext } from "../hooks/useOREditorContext";

export type OREditorSaveCallback = ( projectData: OREngineProjectData, editorData: MXP.SerializeField ) => void;

// プロジェクト内のシーン一覧と、開いているシーンの切替・新規作成・削除。
// ファイルの実体はページ側（EditorPage）が持つので、エディタ UI はこの窓口だけを見る。
// シーン CLI（AgentBridge）も同じ窓口を使うので、型の定義は lib 側に置いている
export type SceneSelection = AgentSceneControl;

// Editor インスタンスを生成し、保存コールバックと初期化を紐付けて配下ツリーへ提供する
export const OREditorProvider: React.FC<{ children?: ReactNode, projectName?: string, onSave?: OREditorSaveCallback, editorData?: MXP.SerializeField, scenes?: SceneSelection }> = ( props ) => {

	const editorContext = useOREditorContext( props.projectName );

	useEffect( () => {

		if ( ! editorContext.editor || ! props.onSave ) return;

		editorContext.editor.on( "save", props.onSave );

		return () => {

			editorContext.editor.off( "save", props.onSave );

		};

	}, [ editorContext.editor, props.onSave ] );

	// AgentBridge はシーンのファイルを知らないので、コマンド実行時に最新の一覧・操作を読ませる
	const scenesRef = useRef<SceneSelection | null>( null );
	const scenes = props.scenes ?? null;

	useEffect( () => {

		scenesRef.current = scenes;

	}, [ scenes ] );

	useEffect( () => {

		return attachAgentBridge( { editor: editorContext.editor, getScenes: () => scenesRef.current } );

	}, [ editorContext.editor ] );

	useEffect( () => {

		if ( ! editorContext.editor ) return;

		editorContext.editor.bootstrap( props.editorData );

	}, [ props.editorData, editorContext.editor ] );

	return <OREditorContext.Provider value={{ ...editorContext, scenes: props.scenes }}>{props.children}</OREditorContext.Provider>;

};
