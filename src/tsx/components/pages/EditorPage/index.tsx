import * as MXP from 'maxpower';
import { LayoutSplit, MIDIMIXController, MIDIMIXEmu, OREditor, OREngine, Panel, PanelContainer } from "orengine/react";
import { OREngineProjectData } from "orengine";
import { Engine } from "orengine/ts/Engine";
import { useEffect, useState } from "react";

import { gl, globalUniforms } from "~/ts/Globals";
import { initResouces, initResourceInstances } from "~project/Resources";
import { MIDIMIX } from "~project/Resources/Components/VJ/MIDIMIX";
import { MIDIMIXMapping } from "~project/Resources/Components/VJ/MIDIMIXMapping";
import { VJEffectVariant } from "~project/Resources/Components/VJ/VJEffectVariant";
import { VJManager } from "~project/Resources/Components/VJ/VJManager";

import { VJDebug, VJDebugController } from '../../VJDebug';


initResouces();

const projectName = new URLSearchParams( location.search ).get( 'project' ) || 'DemoProject';

const midimixAdapter: MIDIMIXController = {
	getLine: ( index ) => MIDIMIX.getLine( index ),
	get side() { return MIDIMIX.side; },
	emulateControl: ( type, id, value ) => MIDIMIX.emulateControl( type, id, value ),
	on: ( event, callback ) => MIDIMIX.on( event, callback ),
	off: ( event, callback ) => MIDIMIX.off( event, callback ),
};

const vjDebugAdapter: VJDebugController = {
	getEffectNames: () => VJEffectVariant.getEffectNames(),
	getVariantIds: ( name ) => VJEffectVariant.getVariantIds( name ),
	getActiveVariants: () => VJEffectVariant.getActiveVariants(),
	setVariant: ( name, id ) => VJEffectVariant.setVariant( name, id ),
	getBeatIndex: () => VJManager.beatCount,
	onChange: ( cb ) => VJEffectVariant.onChange( cb ),
	offChange: ( cb ) => VJEffectVariant.offChange( cb ),
	getPresets: () => [],
	getActivePresetIndex: () => - 1,
	selectPreset: () => {},
	addPreset: () => {},
	removePreset: () => {},
	updatePreset: () => {},
	generateRandomPreset: () => ( { name: "Random", effectPattern: {}, intensity: 0.5 } ),
};

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
		<OREngine gl={gl} project={projectData} onEngineInit={( glCtx ) => {

			initResourceInstances( glCtx, globalUniforms );

		}} >
			<OREditor editorData={editorData} projectName={projectName} customTabs={{
				assets: [
					<PanelContainer.Tab key="vjpanel" title='VJ'>
						<Panel>
							<LayoutSplit direction="horizontal" storageKey="vjpanel-split">
								<LayoutSplit.Item flex={1} minSize={300}>
									<MIDIMIXEmu controller={midimixAdapter} labels={MIDIMIXMapping.getLabels()} />
								</LayoutSplit.Item>
								<LayoutSplit.Item flex={1} minSize={200}>
									<VJDebug controller={vjDebugAdapter} />
								</LayoutSplit.Item>
							</LayoutSplit>
						</Panel>
					</PanelContainer.Tab>,
				],
			}} onSave={( projectData, editorData ) => {

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
