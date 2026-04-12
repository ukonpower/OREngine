
import * as MXP from 'maxpower';
import { OREngineProjectData } from 'packages/orengine/ts/Engine/ProjectSerializer';
import React, { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { useLayout } from '../../hooks/useLayout';
import { useSerializableField } from '../../hooks/useSerializableProps';
import { InputWindow } from '../InputWindow';
import { InputWindowContext } from '../InputWindow/Context/InputWindowContext';
import { useInputWindowContext } from '../InputWindow/Hooks/useInputWindowContext';
import { LayoutSplit } from '../LayoutSplit';
import { MouseMenu } from '../MouseMenu';
import { MouseMenuContext } from '../MouseMenu/Context/MouseMenuContext';
import { useMouseMenuContext } from '../MouseMenu/Hooks/useMouseMenuContext';
import { Panel } from '../Panel';
import { PanelContainer } from '../PanelContainer';
import { AssetProperty } from '../Panels/AssetProperty';
import { AssetViewer } from '../Panels/AssetViewer';
import { EntityProperty } from '../Panels/EntityProperty';
import { Timer } from '../Panels/GPUTimer';
import { Hierarchy } from '../Panels/Hierarchy';
import { ProjectControl } from '../Panels/ProjectControl';
import { RendererSettings } from '../Panels/RendererSettings';
import { Screen } from '../Panels/Screen';
import { Timeline } from '../Panels/Timeline';

import { OREditorContext } from './Context/OREditorContext';
import { useOREditorContext } from './Hooks/useOREditorContext';
import style from './index.module.scss';

 type OREditorSaveCallback = ( projectData: OREngineProjectData, editorData: MXP.SerializeField ) => void

export type PanelSlot = "scene" | "timer" | "assets" | "property" | "timeline";

export const OREditor: React.FC<{onSave?: OREditorSaveCallback, editorData?: MXP.SerializeField, projectName?: string, customTabs?: Partial<Record<PanelSlot, React.ReactNode>> }> = ( props ) => {

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
       const [ selectedAsset ] = useSerializableField( editorContext.editor, "selectedAsset" );
       const mouseMenuContext = useMouseMenuContext();
       const inputWindowContext = useInputWindowContext();

	let editorElm = null;

	if ( layout.isPC ) {

		editorElm = (
			<>
				<LayoutSplit direction="vertical" storageKey="orengine-editor-pc-main">
					<LayoutSplit.Item flex={1} minSize={300}>
						<LayoutSplit direction="horizontal" storageKey="orengine-editor-pc-horizontal">
							<LayoutSplit.Item size="300px" minSize={200}>
								<LayoutSplit direction="vertical" storageKey="orengine-editor-pc-left">
									<LayoutSplit.Item flex={1} minSize={150}>
										<PanelContainer>
											<PanelContainer.Tab title='Scene'>
												<Panel>
													<Hierarchy />
												</Panel>
											</PanelContainer.Tab>
											{props.customTabs?.scene}
										</PanelContainer>
									</LayoutSplit.Item>
									<LayoutSplit.Item size="20vh" minSize={100}>
										<PanelContainer>
											<PanelContainer.Tab title='Timer'>
												<Panel noPadding>
													<Timer />
												</Panel>
											</PanelContainer.Tab>
											{props.customTabs?.timer}
										</PanelContainer>
									</LayoutSplit.Item>
								</LayoutSplit>
							</LayoutSplit.Item>
							<LayoutSplit.Item flex={1} minSize={300}>
								<LayoutSplit direction="vertical" storageKey="orengine-editor-pc-center">
									<LayoutSplit.Item flex={1} minSize={200}>
										<Screen />
									</LayoutSplit.Item>
									<LayoutSplit.Item size="200px" minSize={120}>
										<PanelContainer>
											<PanelContainer.Tab title='Assets'>
												<Panel noPadding>
													<AssetViewer />
												</Panel>
											</PanelContainer.Tab>
											{props.customTabs?.assets}
										</PanelContainer>
									</LayoutSplit.Item>
								</LayoutSplit>
							</LayoutSplit.Item>
							<LayoutSplit.Item size="300px" minSize={200}>
								<LayoutSplit direction="vertical" storageKey={selectedAsset ? "orengine-editor-pc-right-asset" : "orengine-editor-pc-right"}>
									<LayoutSplit.Item flex={1} minSize={200}>
										<PanelContainer>
											<PanelContainer.Tab title='Property'>
												<Panel>
													<EntityProperty />
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
											{props.customTabs?.property}
										</PanelContainer>
									</LayoutSplit.Item>
									{selectedAsset && <LayoutSplit.Item size="35%" minSize={150}>
										<PanelContainer>
											<PanelContainer.Tab title='Asset'>
												<Panel>
													<AssetProperty />
												</Panel>
											</PanelContainer.Tab>
										</PanelContainer>
									</LayoutSplit.Item>}
								</LayoutSplit>
							</LayoutSplit.Item>
						</LayoutSplit>
					</LayoutSplit.Item>
					<LayoutSplit.Item size="160px" minSize={80}>
						<PanelContainer>
							<PanelContainer.Tab title='Timeline'>
								<Panel noPadding>
									<Timeline />
								</Panel>
							</PanelContainer.Tab>
							{props.customTabs?.timeline}
						</PanelContainer>
					</LayoutSplit.Item>
				</LayoutSplit>
				<MouseMenu />
			</>
		);

	} else {

		editorElm = (
			<>
				<LayoutSplit direction="vertical" storageKey="orengine-editor-sp-main">
					<LayoutSplit.Item size="35vh" minSize={200} style={{ minHeight: '200px' }}>
						<Screen />
					</LayoutSplit.Item>
					<LayoutSplit.Item flex={1} minSize={200}>
						<PanelContainer>
							<PanelContainer.Tab title='Scene / Property'>
								<LayoutSplit direction="horizontal" storageKey="orengine-editor-sp-sceneProp">
									<LayoutSplit.Item flex={1} minSize={120} overflow padding>
										<Hierarchy />
									</LayoutSplit.Item>
									<LayoutSplit.Item flex={1} minSize={120} overflow padding>
										<EntityProperty />
									</LayoutSplit.Item>
								</LayoutSplit>
							</PanelContainer.Tab>
							<PanelContainer.Tab title='Assets'>
								<Panel noPadding>
									<AssetViewer />
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
							{props.customTabs?.scene}
							{props.customTabs?.property}
							{props.customTabs?.assets}
							{props.customTabs?.timeline}
							{props.customTabs?.timer}
						</PanelContainer>
					</LayoutSplit.Item>
					<LayoutSplit.Item size="120px" minSize={80}>
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
