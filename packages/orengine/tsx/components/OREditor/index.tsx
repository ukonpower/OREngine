
import * as MXP from 'maxpower';
import { OREngineProjectData } from 'packages/orengine/ts/Engine/ProjectSerializer';
import React, { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { useLayout } from '../../hooks/useLayout';
import { InputWindow } from '../InputWindow';
import { InputWindowContext } from '../InputWindow/Context/InputWindowContext';
import { useInputWindowContext } from '../InputWindow/Hooks/useInputWindowContext';
import { LayoutSplit } from '../LayoutSplit';
import { MouseMenu } from '../MouseMenu';
import { MouseMenuContext } from '../MouseMenu/Context/MouseMenuContext';
import { useMouseMenuContext } from '../MouseMenu/Hooks/useMouseMenuContext';
import { Panel } from '../Panel';
import { PanelContainer } from '../PanelContainer';
import { ComponentExplorer } from '../Panels/ComponentExplorer';
import { EntityProperty } from '../Panels/EntityProperty';
import { Timer } from '../Panels/GPUTimer';
import { Hierarchy } from '../Panels/Hierarchy';
import { MIDIMIXController, MIDIMIXEmu } from '../Panels/MIDIMIXEmu';
import { ProjectControl } from '../Panels/ProjectControl';
import { RendererSettings } from '../Panels/RendererSettings';
import { Screen } from '../Panels/Screen';
import { Timeline } from '../Panels/Timeline';

import { OREditorContext } from './Context/OREditorContext';
import { useOREditorContext } from './Hooks/useOREditorContext';
import style from './index.module.scss';

 type OREditorSaveCallback = ( projectData: OREngineProjectData, editorData: MXP.SerializeField ) => void

export const OREditor: React.FC<{onSave?: OREditorSaveCallback, editorData?: MXP.SerializeField, projectName?: string, midiMixController?: MIDIMIXController }> = ( props ) => {

	const editorContext = useOREditorContext( props.projectName );

	useEffect( () => {

		if ( ! editorContext.editor || ! props.onSave ) return;

		editorContext.editor.on( "save", props.onSave );

		return () => {

			editorContext.editor.off( "save", props.onSave );

		};

	}, [ editorContext.editor, props.onSave ] );

	useEffect( () => {

		if ( ! editorContext.editor || ! props.editorData ) return;

		editorContext.editor.deserialize( props.editorData );

	}, [ props.editorData, editorContext.editor ] );


       const layout = useLayout();
       const mouseMenuContext = useMouseMenuContext();
       const inputWindowContext = useInputWindowContext();

	let editorElm = null;

	if ( layout.isPC ) {

		editorElm = (
			<>
				<LayoutSplit direction="vertical">
					<LayoutSplit.Item flex={1}>
						<LayoutSplit direction="horizontal">
							<LayoutSplit.Item size="300px">
								<LayoutSplit direction="vertical">
									<LayoutSplit.Item flex={1}>
										<PanelContainer>
											<PanelContainer.Tab title='Scene'>
												<Panel>
													<Hierarchy />
												</Panel>
											</PanelContainer.Tab>
											<PanelContainer.Tab title='Components'>
												<Panel>
													<ComponentExplorer />
												</Panel>
											</PanelContainer.Tab>
											<PanelContainer.Tab title='Project'>
												<Panel>
													<ProjectControl />
												</Panel>
											</PanelContainer.Tab>
											<PanelContainer.Tab title='Renderer'>
												<Panel>
													<RendererSettings />
												</Panel>
											</PanelContainer.Tab>
										</PanelContainer>
									</LayoutSplit.Item>
									<LayoutSplit.Item size="20vh">
										<PanelContainer>
											<PanelContainer.Tab title='Timer'>
												<Panel noPadding>
													<Timer />
												</Panel>
											</PanelContainer.Tab>
										</PanelContainer>
									</LayoutSplit.Item>
								</LayoutSplit>
							</LayoutSplit.Item>
							<LayoutSplit.Item flex={1}>
								<Screen />
							</LayoutSplit.Item>
							<LayoutSplit.Item size="300px">
								<PanelContainer>
									<PanelContainer.Tab title='Property'>
										<Panel>
											<EntityProperty />
										</Panel>
									</PanelContainer.Tab>
								</PanelContainer>
							</LayoutSplit.Item>
						</LayoutSplit>
					</LayoutSplit.Item>
					<LayoutSplit.Item size="160px">
						<PanelContainer>
							<PanelContainer.Tab title='Timeline'>
								<Panel noPadding>
									<Timeline />
								</Panel>
							</PanelContainer.Tab>
							{props.midiMixController && <PanelContainer.Tab title='MIDIMIXEmu'>
								<Panel>
									<MIDIMIXEmu controller={props.midiMixController}/>
								</Panel>
							</PanelContainer.Tab>}
						</PanelContainer>
					</LayoutSplit.Item>
				</LayoutSplit>
				<MouseMenu />
			</>
		);

	} else {

		editorElm = (
			<>
				<LayoutSplit direction="vertical">
					<LayoutSplit.Item size="35vh" style={{ minHeight: '200px' }}>
						<Screen />
					</LayoutSplit.Item>
					<LayoutSplit.Item flex={1}>
						<PanelContainer>
							<PanelContainer.Tab title='Scene / Property'>
								<LayoutSplit direction="horizontal">
									<LayoutSplit.Item flex={1} overflow padding>
										<Hierarchy />
									</LayoutSplit.Item>
									<LayoutSplit.Item flex={1} overflow padding>
										<EntityProperty />
									</LayoutSplit.Item>
								</LayoutSplit>
							</PanelContainer.Tab>
							<PanelContainer.Tab title='Components'>
								<Panel>
									<ComponentExplorer />
								</Panel>
							</PanelContainer.Tab>
							<PanelContainer.Tab title='Project'>
								<Panel>
									<ProjectControl />
								</Panel>
							</PanelContainer.Tab>
							<PanelContainer.Tab title='Renderer'>
								<Panel>
									<RendererSettings />
								</Panel>
							</PanelContainer.Tab>
							{props.midiMixController && <PanelContainer.Tab title='MIDI'>
								<Panel>
									<MIDIMIXEmu controller={props.midiMixController}/>
								</Panel>
							</PanelContainer.Tab>}
						</PanelContainer>
					</LayoutSplit.Item>
					<LayoutSplit.Item size="120px">
						<PanelContainer>
							<PanelContainer.Tab title='Timeline'>
								<Panel noPadding>
									<ErrorBoundary fallback={<div>エラーだよ</div>}>
										<Timeline />
									</ErrorBoundary>
								</Panel>
							</PanelContainer.Tab>
						</PanelContainer>
					</LayoutSplit.Item>
				</LayoutSplit>
				<MouseMenu />
			</>
		);

	}

	return <OREditorContext.Provider value={editorContext}>
		<MouseMenuContext.Provider value={mouseMenuContext}>
			<InputWindowContext.Provider value={inputWindowContext}>
				<div className={style.editor}>
					{editorElm}
				</div>
				<InputWindow />
			</InputWindowContext.Provider>
		</MouseMenuContext.Provider>
	</OREditorContext.Provider>;

};
