import * as MXP from 'maxpower';
import { OREngineProjectData } from "orengine";
import { OREditor, OREngine } from "orengine/react";
import { Engine } from "orengine/ts/Engine";

import type { EditorCustomTabs } from "../EditorPage";

import "~orengine/styles/style.scss";


export interface EditorPageStaticProps {
	projectName?: string;
	sceneData: OREngineProjectData;
	editorData?: MXP.SerializeField;
	initResourceInstances: ( engine: Engine ) => void;
	customTabs?: EditorCustomTabs;
}

export const EditorPageStatic = ( props: EditorPageStaticProps ) => (
	<OREngine project={props.sceneData} onEngineInit={( engine ) => {

		props.initResourceInstances( engine );

	}} >
		<OREditor editorData={props.editorData} projectName={props.projectName ?? 'Static'} customTabs={props.customTabs} onSave={() => { /* 静的版は保存無効 */ }} />
	</OREngine>
);
