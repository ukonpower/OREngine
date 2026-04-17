import * as MXP from 'maxpower';
import { OREditor, OREngine } from "orengine/react";
import { OREngineProjectData } from "orengine";

import { gl, globalUniforms } from "~orengine/ts/Globals";
import type { EditorCustomTabs } from "../EditorPage";

import "~orengine/styles/style.scss";


export interface EditorPageStaticProps {
	projectName?: string;
	sceneData: OREngineProjectData;
	editorData?: MXP.SerializeField;
	initResourceInstances: ( gl: WebGL2RenderingContext, globals?: { [key: string]: any } ) => void;
	customTabs?: EditorCustomTabs;
}

export const EditorPageStatic = ( props: EditorPageStaticProps ) => (
	<OREngine gl={gl} project={props.sceneData} onEngineInit={( glCtx ) => {

		props.initResourceInstances( glCtx, globalUniforms );

	}} >
		<OREditor editorData={props.editorData} projectName={props.projectName ?? 'Static'} customTabs={props.customTabs} onSave={() => { /* 静的版は保存無効 */ }} />
	</OREngine>
);
