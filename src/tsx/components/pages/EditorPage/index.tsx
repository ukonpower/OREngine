import * as MXP from 'maxpower';
import { OREditor, OREngine } from "orengine";
import { OREngineProjectData } from "packages/orengine/ts/Engine/ProjectSerializer";
import { useEffect, useState } from "react";

import ProjectData from "~/../data/scene.json";
import { gl } from "~/ts/Globals";
import { initResouces } from "~/ts/Resources";
import { FileSystem } from "~/ts/Utils/FileSystem";

const fileSystem = new FileSystem();

initResouces();

export const EditorPage = () => {

	const [ projectData, setProjectData ] = useState<OREngineProjectData>();
	const [ editorData, setEditorData ] = useState<MXP.SerializeField>();

	useEffect( () => {

		fileSystem.get<OREngineProjectData>( "scene.json" ).then( ( data ) => {

			if ( ! data ) return;

			setProjectData( data );

		} );

		fileSystem.get<MXP.SerializeField>( "editor.json" ).then( ( data ) => {

			if ( ! data ) return;

			setEditorData( data );

		} );

		if ( import.meta.env.PROD ) {

			setProjectData( ProjectData );

		}

	}, [] );

	return (
		<OREngine gl={gl} project={projectData} >
			<OREditor editorData={editorData} onSave={( projectData, editorData ) => {

				fileSystem.set( "scene.json", projectData );
				fileSystem.set( "editor.json", editorData );

			}} />
		</OREngine>
	);

};
