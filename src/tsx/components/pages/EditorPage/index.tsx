import * as MXP from 'maxpower';
import { OREditor, OREngine, type PanelSlot, type CustomTab } from "orengine/react";
import { OREngineProjectData } from "orengine";
import { Engine } from "orengine/ts/Engine";
import { useEffect, useState } from "react";

import { gl, globalUniforms } from "~orengine/ts/Globals";

import "~orengine/styles/style.scss";

export type EditorCustomTabs = Partial<Record<PanelSlot, CustomTab[]>>;

export interface EditorPageProps {
	projectName?: string;
	sceneData?: OREngineProjectData;
	editorData?: MXP.SerializeField;
	initResourceInstances: ( gl: WebGL2RenderingContext, globals?: { [key: string]: any } ) => void;
	customTabs?: EditorCustomTabs;
	onBeforeSave?: () => void;
}

export const EditorPage = ( props: EditorPageProps ) => {

	const projectName = props.projectName ?? 'DefaultProject';

	const [ projectData, setProjectData ] = useState<OREngineProjectData | undefined>( props.sceneData );
	const [ editorData, setEditorData ] = useState<MXP.SerializeField | undefined>( props.editorData );

	useEffect( () => {

		if ( props.sceneData ) return;

		fetch( `/api/projects/${projectName}/scene` ).then( r => r.json() ).then( ( data ) => {

			if ( ! data ) return;
			setProjectData( data );

		} ).catch( () => {} );

	}, [ props.sceneData, projectName ] );

	useEffect( () => {

		if ( props.editorData ) return;

		fetch( `/api/projects/${projectName}/editor` ).then( r => r.json() ).then( ( data ) => {

			if ( ! data ) return;
			setEditorData( data );

		} ).catch( () => {} );

	}, [ props.editorData, projectName ] );

	return (
		<OREngine gl={gl} project={projectData} onEngineInit={( glCtx ) => {

			props.initResourceInstances( glCtx, globalUniforms );

		}} >
			<OREditor editorData={editorData} projectName={projectName} customTabs={props.customTabs} onSave={( savedScene, savedEditor ) => {

				props.onBeforeSave?.();

				fetch( `/api/projects/${projectName}/scene`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify( savedScene ),
				} );

				fetch( `/api/projects/${projectName}/editor`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify( savedEditor ),
				} );

				const textures = Engine.resources.textureList.map( t => ( {
					name: t.name,
					config: t.serialize( { mode: "export" } ),
				} ) );

				for ( const t of textures ) {

					fetch( `/api/projects/${projectName}/textures/${encodeURIComponent( t.name )}`, {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify( t.config ),
					} );

				}

				fetch( `/api/projects/${projectName}/textures/sync`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify( { names: textures.map( t => t.name ) } ),
				} );

			}} />
		</OREngine>
	);

};
