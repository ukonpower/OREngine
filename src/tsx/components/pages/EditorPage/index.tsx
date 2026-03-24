import * as MXP from 'maxpower';
import { OREditor, OREngine } from "orengine/react";
import { OREngineProjectData } from "orengine";
import { Engine } from "orengine/ts/Engine";
import { useEffect, useState } from "react";

import { gl, globalUniforms } from "~/ts/Globals";
import { initResouces, initResourceInstances } from "~project/Resources";


initResouces();

const projectName = new URLSearchParams( location.search ).get( 'project' ) || 'DemoProject';

export const EditorPage = () => {

	const [ projectData, setProjectData ] = useState<OREngineProjectData>();
	const [ editorData, setEditorData ] = useState<MXP.SerializeField>();

	useEffect( () => {

		fetch( `/api/projects/${projectName}/scene` ).then( r => r.json() ).then( ( data ) => {

			if ( ! data ) return;

			setProjectData( data );

		} ).catch( () => {} );

		fetch( `/api/projects/${projectName}/editor` ).then( r => r.json() ).then( ( data ) => {

			if ( ! data ) return;

			setEditorData( data );

		} ).catch( () => {} );

	}, [] );

	return (
		<OREngine gl={gl} project={projectData} onEngineInit={( glCtx ) => initResourceInstances( glCtx, globalUniforms )} >
			<OREditor editorData={editorData} projectName={projectName} onSave={( projectData, editorData ) => {

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

				const materials = Engine.resources.exportMaterialConfigs();

				for ( const m of materials ) {

					fetch( `/api/projects/${projectName}/materials/${encodeURIComponent( m.name )}`, {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify( m.config ),
					} );

				}

				const textures = Engine.resources.exportTextureConfigs();

				for ( const t of textures ) {

					fetch( `/api/projects/${projectName}/textures/${encodeURIComponent( t.name )}`, {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify( t.config ),
					} );

				}

				fetch( `/api/projects/${projectName}/materials/sync`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify( { names: materials.map( m => m.name ) } ),
				} );

				fetch( `/api/projects/${projectName}/textures/sync`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify( { names: textures.map( t => t.name ) } ),
				} );

			}} />
		</OREngine>
	);

};
