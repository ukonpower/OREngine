
import * as MXP from 'maxpower';
import { OREngineProjectData } from 'packages/orengine/ts/Engine/ProjectSerializer';
import React, { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { useLayout } from '../../hooks/useLayout';
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

	let editorElm = null;

	if ( layout.isPC ) {

		editorElm = (
			<>
				<div className={style.vert}>
					<div className={`${style.horiz} ${style.flex}`}>
						<div className={style.vert} style={{ width: '300px' }}>
							<div className={style.flex}>
								<PanelContainer>
									<Panel title='Scene'>
										<Hierarchy />
									</Panel>
									<Panel title='Components'>
										<ComponentExplorer />
									</Panel>
																		<Panel title='Project'>
										<ProjectControl />
									</Panel>
									<Panel title='Renderer'>
										<RendererSettings />
									</Panel>
								</PanelContainer>
							</div>
							<div style={{ height: '20vh' }}>
								<PanelContainer>
									<Panel title='Timer' noPadding>
										<Timer />
									</Panel>
								</PanelContainer>
							</div>
						</div>
						<div className={`${style.flex}`}>
							<Screen />
						</div>
						<div style={{ width: '300px' }}>
							<PanelContainer>
								<Panel title='Property'>
									<EntityProperty />
								</Panel>
							</PanelContainer>
						</div>
					</div>
					<div style={{ height: '160px' }}>
						<PanelContainer>
							<Panel title='Timeline' noPadding>
								<Timeline />
							</Panel>
							{props.midiMixController && <Panel title='MIDIMIXEmu'>
								<MIDIMIXEmu controller={props.midiMixController}/>
							</Panel>}
						</PanelContainer>
					</div>
				</div>
				<MouseMenu />
			</>
		);

	} else {

		editorElm = (
			<div className={style.editor}>
				<div className={style.vert}>
					<div className={`${style.flex}`}>
						<Screen />
					</div>
					<div className={style.horiz} style={{ height: '55vh' }}>
						<div className={style.vert} style={{ width: '45vw' }}>
							<div style={{ flex: '1' }}>
								<PanelContainer>
									<Panel title='Scene'>
										<Hierarchy />
									</Panel>
									<Panel title='Components'>
										<ComponentExplorer />
									</Panel>
																		<Panel title='Project'>
										<ProjectControl />
									</Panel>
									<Panel title='Renderer'>
										<RendererSettings />
									</Panel>
								</PanelContainer>
							</div>
							<div style={{ height: '15vh' }}>
								<PanelContainer>
									<Panel title='Timer' noPadding>
										<Timer />
									</Panel>
								</PanelContainer>
							</div>
						</div>
						<div className={`${style.flex}`}>
							<PanelContainer>
								<Panel title='Property'>
									<EntityProperty />
								</Panel>
							</PanelContainer>
						</div>
					</div>
					<div style={{ height: '15vh' }}>
						<PanelContainer>
							<Panel title='Timeline' noPadding>
								<ErrorBoundary fallback={<div>エラーだよ</div>}>
									<Timeline />
								</ErrorBoundary>
							</Panel>
							{props.midiMixController && <Panel title='MIDIMIXEmu'>
								<MIDIMIXEmu controller={props.midiMixController}/>
							</Panel>}
						</PanelContainer>
					</div>
				</div>
				<MouseMenu />
			</div>
		);

	}

	return <OREditorContext.Provider value={editorContext}>
		<MouseMenuContext.Provider value={mouseMenuContext}>
			<div className={style.editor}>
				{editorElm}
			</div>
		</MouseMenuContext.Provider>
	</OREditorContext.Provider>;

};
