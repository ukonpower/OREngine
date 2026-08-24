
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import * as MXP from 'maxpower';

import { LayoutSplit } from '../../components/ui/LayoutSplit';
import { Panel } from '../../components/ui/Panel';
import { PanelContainer } from '../../components/ui/PanelContainer';
import { useLayout } from '../../hooks/useLayout';

import { EditorSettings } from './features/EditorSettings';
import { EntityProperty } from './features/EntityProperty';
import { Timer } from './features/GPUTimer';
import { Hierarchy } from './features/Hierarchy';
import { InputWindow } from './features/InputWindow';
import { InputWindowProvider } from './features/InputWindow/providers/InputWindowProvider';
import { MouseMenu } from './features/MouseMenu';
import { MouseMenuProvider } from './features/MouseMenu/providers/MouseMenuProvider';
import { PanelLayout } from './features/PanelLayout';
import { ProjectControl } from './features/ProjectControl';
import { RendererSettings } from './features/RendererSettings';
import { Screen } from './features/Screen';
import { Textures } from './features/Textures';
import { Timeline } from './features/Timeline';
import style from './index.module.scss';
import { OREditorProvider, OREditorSaveCallback } from './providers/OREditorProvider';

import type { PanelDefinition } from './features/PanelLayout';

export type PanelSlot = "leftTop" | "leftBottom" | "mainBottom" | "rightTop" | "footer";

export type CustomTab = {
	title: string;
	content: React.ReactNode;
	default?: boolean;
};

export type EditorCustomTabs = Partial<Record<PanelSlot, CustomTab[]>>;

const renderCustomTabs = ( tabs: CustomTab[] | undefined ) => {

	if ( ! tabs ) return null;

	return tabs.map( ( tab ) => (
		<PanelContainer.Tab key={tab.title} title={tab.title}>
			<Panel>{tab.content}</Panel>
		</PanelContainer.Tab>
	) );

};

const defaultTabTitle = ( tabs: CustomTab[] | undefined ) => tabs?.find( ( t ) => t.default )?.title;

export const OREditor: React.FC<{onSave?: OREditorSaveCallback, editorData?: MXP.SerializeField, projectName?: string, customTabs?: EditorCustomTabs }> = ( props ) => {

	const layout = useLayout();

	let editorElm = null;

	if ( layout.isPC ) {

		// レイアウトツリー上の配置は PanelLayout 側の defaultLayout がこの id を参照して決める
		const builtinPanels: PanelDefinition[] = [
			{ id: "scene", title: "Scene", content: <Panel><Hierarchy /></Panel> },
			{ id: "timer", title: "Timer", content: <Panel noPadding><Timer /></Panel> },
			{ id: "screen", title: "Screen", content: <Screen />, fixed: true },
			{ id: "property", title: "Property", content: <Panel><EntityProperty /></Panel> },
			{ id: "textures", title: "Textures", content: <Panel noPadding><Textures /></Panel> },
			{ id: "project", title: "Project", content: <Panel><ProjectControl /></Panel> },
			{ id: "renderer", title: "Renderer", content: <Panel><RendererSettings /></Panel> },
			{ id: "editor-settings", title: "Editor", content: <Panel><EditorSettings /></Panel> },
			{ id: "timeline", title: "Timeline", content: <Panel noPadding><Timeline /></Panel> },
		];

		editorElm = (
			<>
				<PanelLayout panels={builtinPanels} customTabs={props.customTabs} />
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

	return <OREditorProvider projectName={props.projectName} onSave={props.onSave} editorData={props.editorData}>
		<MouseMenuProvider>
			<InputWindowProvider>
				<div className={style.editor}>
					{editorElm}
				</div>
				<InputWindow />
			</InputWindowProvider>
		</MouseMenuProvider>
	</OREditorProvider>;

};
