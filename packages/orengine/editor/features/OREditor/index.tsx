
import * as MXP from 'maxpower';
import { OREngineProjectData } from 'orengine';
import React, { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { LayoutSplit } from '../../components/composites/LayoutSplit';
import { Panel } from '../../components/primitives/Panel';
import { PanelContainer } from '../../components/primitives/PanelContainer';
import { EditorSettings } from '../EditorSettings';
import { EntityProperty } from '../EntityProperty';
import { Timer } from '../GPUTimer';
import { Hierarchy } from '../Hierarchy';
import { InputWindow } from '../InputWindow/components/InputWindow';
import { InputWindowContext } from '../InputWindow/components/InputWindow/contexts/InputWindowContext';
import { useInputWindowContext } from '../InputWindow/hooks/useInputWindowContext';
import { useLayout } from '../Layout/hooks/useLayout';
import { MouseMenu } from '../MouseMenu/components/MouseMenu';
import { MouseMenuContext } from '../MouseMenu/components/MouseMenu/contexts/MouseMenuContext';
import { useMouseMenuContext } from '../MouseMenu/hooks/useMouseMenuContext';
import { ProjectControl } from '../ProjectControl';
import { RendererSettings } from '../RendererSettings';
import { Screen } from '../Screen';
import { Textures } from '../Textures';
import { Timeline } from '../Timeline/components/Timeline';

import { OREditorContext } from './contexts/OREditorContext';
import { useOREditorContext } from './hooks/useOREditorContext';
import style from './index.module.scss';

 type OREditorSaveCallback = ( projectData: OREngineProjectData, editorData: MXP.SerializeField ) => void

export type PanelSlot = "leftTop" | "leftBottom" | "mainBottom" | "rightTop" | "footer";

export type CustomTab = {
	title: string;
	content: React.ReactNode;
	default?: boolean;
};

const renderCustomTabs = ( tabs: CustomTab[] | undefined ) => {

	if ( ! tabs ) return null;

	return tabs.map( ( tab ) => (
		<PanelContainer.Tab key={tab.title} title={tab.title}>
			<Panel>{tab.content}</Panel>
		</PanelContainer.Tab>
	) );

};

const defaultTabTitle = ( tabs: CustomTab[] | undefined ) => tabs?.find( ( t ) => t.default )?.title;

export const OREditor: React.FC<{onSave?: OREditorSaveCallback, editorData?: MXP.SerializeField, projectName?: string, customTabs?: Partial<Record<PanelSlot, CustomTab[]>> }> = ( props ) => {

	const editorContext = useOREditorContext( props.projectName );

	useEffect( () => {

		if ( ! editorContext.editor || ! props.onSave ) return;

		editorContext.editor.on( "save", props.onSave );

		return () => {

			editorContext.editor.off( "save", props.onSave );

		};

	}, [ editorContext.editor, props.onSave ] );

	useEffect( () => {

		if ( ! editorContext.editor ) return;

		editorContext.editor.bootstrap( props.editorData );

	}, [ props.editorData, editorContext.editor ] );

	const layout = useLayout();
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
										<PanelContainer storageKey="orengine-panel-scene" defaultTabTitle={defaultTabTitle( props.customTabs?.leftTop )}>
											<PanelContainer.Tab title='Scene'>
												<Panel>
													<Hierarchy />
												</Panel>
											</PanelContainer.Tab>
											{renderCustomTabs( props.customTabs?.leftTop )}
										</PanelContainer>
									</LayoutSplit.Item>
									<LayoutSplit.Item size="20vh" minSize={100}>
										<PanelContainer storageKey="orengine-panel-timer" defaultTabTitle={defaultTabTitle( props.customTabs?.leftBottom )}>
											<PanelContainer.Tab title='Timer'>
												<Panel noPadding>
													<Timer />
												</Panel>
											</PanelContainer.Tab>
											{renderCustomTabs( props.customTabs?.leftBottom )}
										</PanelContainer>
									</LayoutSplit.Item>
								</LayoutSplit>
							</LayoutSplit.Item>
							<LayoutSplit.Item flex={1} minSize={300}>
								<LayoutSplit direction="vertical" storageKey="orengine-editor-pc-center">
									<LayoutSplit.Item flex={1} minSize={200}>
										<Screen />
									</LayoutSplit.Item>
									{props.customTabs?.mainBottom && <LayoutSplit.Item size="200px" minSize={120}>
										<PanelContainer storageKey="orengine-panel-assets" defaultTabTitle={defaultTabTitle( props.customTabs?.mainBottom )}>
											{renderCustomTabs( props.customTabs?.mainBottom )}
										</PanelContainer>
									</LayoutSplit.Item>}
								</LayoutSplit>
							</LayoutSplit.Item>
							<LayoutSplit.Item size="300px" minSize={200}>
								<PanelContainer storageKey="orengine-panel-property" defaultTabTitle={defaultTabTitle( props.customTabs?.rightTop )}>
									<PanelContainer.Tab title='Property'>
										<Panel>
											<EntityProperty />
										</Panel>
									</PanelContainer.Tab>
									<PanelContainer.Tab title='Textures'>
										<Panel noPadding>
											<Textures />
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
									<PanelContainer.Tab title='Editor'>
										<Panel>
											<EditorSettings />
										</Panel>
									</PanelContainer.Tab>
									{renderCustomTabs( props.customTabs?.rightTop )}
								</PanelContainer>
							</LayoutSplit.Item>
						</LayoutSplit>
					</LayoutSplit.Item>
					<LayoutSplit.Item size="160px" minSize={80}>
						<PanelContainer storageKey="orengine-panel-timeline" defaultTabTitle={defaultTabTitle( props.customTabs?.footer )}>
							<PanelContainer.Tab title='Timeline'>
								<Panel noPadding>
									<Timeline />
								</Panel>
							</PanelContainer.Tab>
							{renderCustomTabs( props.customTabs?.footer )}
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
					{/*
						56.25vw = 16:9（editor/lib の _baseResolution 1920x1080）。canvas は object-fit: contain なので、
						この高さを下回ると左右に黒帯が出て縮む。77px はヘッダー36px + CameraPad 40px + border 1px。
						min(55vh) は横長ウィンドウでプレビューが下のパネルを潰さないための上限
					*/}
					<LayoutSplit.Item size="calc( min( 56.25vw, 55vh ) + 77px )" minSize={200} style={{ minHeight: '200px' }}>
						<Screen />
					</LayoutSplit.Item>
					<LayoutSplit.Item flex={1} minSize={200}>
						<PanelContainer storageKey="orengine-panel-sp-main" defaultTabTitle={defaultTabTitle( props.customTabs?.mainBottom ) ?? defaultTabTitle( props.customTabs?.leftTop ) ?? defaultTabTitle( props.customTabs?.leftBottom ) ?? defaultTabTitle( props.customTabs?.rightTop ) ?? defaultTabTitle( props.customTabs?.footer )}>
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
							<PanelContainer.Tab title='Textures'>
								<Panel noPadding>
									<Textures />
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
							<PanelContainer.Tab title='Editor'>
								<Panel>
									<EditorSettings />
								</Panel>
							</PanelContainer.Tab>
							{renderCustomTabs( props.customTabs?.leftTop )}
							{renderCustomTabs( props.customTabs?.leftBottom )}
							{renderCustomTabs( props.customTabs?.mainBottom )}
							{renderCustomTabs( props.customTabs?.rightTop )}
							{renderCustomTabs( props.customTabs?.footer )}
						</PanelContainer>
					</LayoutSplit.Item>
					<LayoutSplit.Item size="120px" minSize={80}>
						<PanelContainer storageKey="orengine-panel-sp-timeline">
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
