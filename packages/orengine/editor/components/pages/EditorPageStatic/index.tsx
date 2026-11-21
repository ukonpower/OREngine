import * as MXP from 'maxpower';
import { OREngineProjectData } from "orengine";
import { Engine } from "orengine";

import { OREditor, type FieldUIDefinition, type PanelDefinition } from "../../../features/OREditor";
import { OREngineProvider } from "../../../features/OREngine/providers/OREngineProvider";

import "uipower/styles/style.scss";


export interface EditorPageStaticProps {
	projectName?: string;
	sceneData: OREngineProjectData;
	editorData?: MXP.SerializeField;
	initResourceInstances: ( engine: Engine ) => void;
	panels?: PanelDefinition[];
	fieldUIs?: FieldUIDefinition[];
}

// 保存先の無いエディタ（GitHub Pages のデモ）。onSave を渡さないので、保存しても何も書かれず、未保存の確認も出ない
export const EditorPageStatic = ( props: EditorPageStaticProps ) => (
	<OREngineProvider project={props.sceneData} onEngineInit={( engine ) => {

		props.initResourceInstances( engine );

	}} >
		<OREditor editorData={props.editorData} projectName={props.projectName ?? 'Static'} panels={props.panels} fieldUIs={props.fieldUIs} />
	</OREngineProvider>
);
