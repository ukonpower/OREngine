import * as MXP from 'maxpower';
import { LayoutSplit, OREditor, OREngine, Panel, PanelContainer } from "orengine/react";
import { OREngineProjectData } from "orengine";
import { Engine } from "orengine/ts/Engine";

import { gl, globalUniforms } from "~/ts/Globals";
import { initResouces, initResourceInstances } from "~project/Resources";
import { MIDIMIX } from "~project/Resources/Components/VJ/MIDIMIX";
import { MIDIMIXMapping } from "~project/Resources/Components/VJ/MIDIMIXMapping";
import { VJEffectVariant } from "~project/Resources/Components/VJ/VJEffectVariant";
import { VJManager } from "~project/Resources/Components/VJ/VJManager";
import { VJMatrix } from "~project/Resources/Components/VJ/VJMatrix";

import { MIDIMIXController, MIDIMIXEmu } from '~project/tsx/MIDIMIXEmu';
import { VJDebug, VJDebugController } from '~project/tsx/VJDebug';

import SceneData from '~project/scene.json';
import EditorData from '~project/editor.json';

initResouces();

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
	onChange: ( cb ) => {

		VJEffectVariant.onChange( cb );
		VJMatrix.onChange( cb );

	},
	offChange: ( cb ) => {

		VJEffectVariant.offChange( cb );
		VJMatrix.offChange( cb );

	},
	getPattern: () => VJMatrix.getPattern(),
	setCell: ( name, beat, id ) => VJMatrix.setCell( name, beat, id ),
};

export const EditorPageStatic = () => {

	const projectData = SceneData as OREngineProjectData;
	const editorData = EditorData as MXP.SerializeField;

	return (
		<OREngine gl={gl} project={projectData} onEngineInit={( glCtx ) => {

			initResourceInstances( glCtx, globalUniforms );

		}} >
			<OREditor editorData={editorData} projectName="OYSRZ" customTabs={{
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
			}} onSave={() => {

				// 静的版では保存は無効

			}} />
		</OREngine>
	);

};
