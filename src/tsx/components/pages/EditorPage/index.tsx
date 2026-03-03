import * as MXP from 'maxpower';
import { OREditor, OREngine } from "orengine/react";
import { OREngineProjectData } from "orengine";
import { useEffect, useState } from "react";

import { gl } from "~/ts/Globals";
import { initResouces } from "~project/index";
import { MIDIMIX } from "~/ts/Resources/Components/_Samples/MIDI/MIDIMIX";

initResouces();

const projectName = new URLSearchParams( location.search ).get( 'project' ) || 'default';

export const EditorPage = () => {

	const [ projectData, setProjectData ] = useState<OREngineProjectData>();
	const [ editorData, setEditorData ] = useState<MXP.SerializeField>();

	useEffect( () => {

		fetch( `/api/projects/${projectName}/scene` ).then( r => r.json() ).then( ( data ) => {

			if ( ! data ) return;

			setProjectData( data );

		} ).catch( () => {

			// fallback: try import for production
			import( "~project/scene.json" ).then( ( mod ) => {

				setProjectData( mod.default );

			} );

		} );

		fetch( `/api/projects/${projectName}/editor` ).then( r => r.json() ).then( ( data ) => {

			if ( ! data ) return;

			setEditorData( data );

		} ).catch( () => {} );

	}, [] );

	return (
		<OREngine gl={gl} project={projectData} >
			<OREditor editorData={editorData} projectName={projectName} midiMixController={MIDIMIX} onSave={( projectData, editorData ) => {

				fetch( `/api/projects/${projectName}/scene`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify( projectData ),
				} );

				fetch( `/api/projects/${projectName}/editor`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify( editorData ),
				} );

			}} />
		</OREngine>
	);

};
