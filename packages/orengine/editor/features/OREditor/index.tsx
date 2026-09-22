import React, { useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import * as MXP from 'maxpower';
import { InputWindow, InputWindowProvider, LayoutSplit, Panel, PanelContainer, Popover, PopoverProvider } from 'uipower';

import { useLayout } from '../../hooks/useLayout';

import { EditorSettings } from './features/EditorSettings';
import { EntityAdd } from './features/EntityAdd';
import { EntityProperty } from './features/EntityProperty';
import { ExportControl } from './features/ExportControl';
import { Timer } from './features/GPUTimer';
import { Hierarchy } from './features/Hierarchy';
import { PanelLayout } from './features/PanelLayout';
import { RendererSettings } from './features/RendererSettings';
import { SceneControl } from './features/SceneControl';
import { Screen, VIEWPORT_PANEL_ID } from './features/Screen';
import { Textures } from './features/Textures';
import { Timeline } from './features/Timeline';
import style from './index.module.scss';
import { OREditorProvider, OREditorSaveCallback, SceneSelection } from './providers/OREditorProvider';

import type { PanelDefinition, PanelId } from './features/PanelLayout';

export type { SceneSelection } from './providers/OREditorProvider';
export type { PanelDefinition, PanelId } from './features/PanelLayout';

// レイアウトツリー上の配置は PanelLayout 側の defaultLayout がこの id を参照して決める。
// レンダーごとに identity が変わると PanelLayout の派生計算が空回りするのでモジュールスコープに置く
const builtinPanels: PanelDefinition[] = [
	{ id: "hierarchy", title: "Hierarchy", category: "General", content: <Panel><Hierarchy /></Panel> },
	{ id: "timer", title: "Timer", category: "Rendering", content: <Panel noPadding><Timer /></Panel> },
	{ id: VIEWPORT_PANEL_ID, title: "Screen", category: "General", multiple: true, content: ( viewportId ) => <Screen viewportId={viewportId} /> },
	{ id: "property", title: "Property", category: "General", content: <Panel><EntityProperty /></Panel> },
	{ id: "textures", title: "Textures", category: "Rendering", content: <Panel noPadding><Textures /></Panel> },
	{ id: "scene", title: "Scene", category: "General", content: <Panel><SceneControl /></Panel> },
	{ id: "export", title: "Export", category: "Project", content: <Panel><ExportControl /></Panel> },
	{ id: "renderer", title: "Renderer", category: "Rendering", content: <Panel><RendererSettings /></Panel> },
	{ id: "editor-settings", title: "Editor", category: "Project", content: <Panel><EditorSettings /></Panel> },
	{ id: "timeline", title: "Timeline", category: "Animation", content: <Panel noPadding><Timeline /></Panel> },
];

// SP のタブ一覧に並べるパネル。Screen（上段）と Timeline（下段）は専用領域を持ち、
// Hierarchy と Property は横並びの複合タブにまとめるので、ここからは外す。
// multiple なパネルはタブを増やす操作が SP に無いので置けない
const spPanelTabs = ( panels: PanelDefinition[] ) => {

	const tabs: { id: PanelId, title: string, content: React.ReactNode }[] = [];

	for ( const def of panels ) {

		if ( def.multiple ) continue;
		if ( def.id === "hierarchy" || def.id === "property" || def.id === "timeline" ) continue;

		tabs.push( { id: def.id, title: def.title, content: def.content } );

	}

	return tabs;

};

export const OREditor: React.FC<{onSave?: OREditorSaveCallback, editorData?: MXP.SerializeField, projectName?: string, panels?: PanelDefinition[], scenes?: SceneSelection }> = ( props ) => {

	const layout = useLayout();

	// 利用者のパネルはビルトインの後ろに並べる。identity が毎レンダー変わると
	// PanelLayout の派生計算が空回りするので、渡されないときは定数配列をそのまま使う
	const panels = useMemo( () => {

		if ( ! props.panels ) return builtinPanels;

		return [ ...builtinPanels, ...props.panels ];

	}, [ props.panels ] );

	let editorElm = null;

	if ( layout.isPC ) {

		editorElm = <PanelLayout panels={panels} />;

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
						<Screen viewportId="main" />
					</LayoutSplit.Item>
					<LayoutSplit.Item flex={1} minSize={200}>
						<PanelContainer storageKey="orengine-panel-sp-main">
							<PanelContainer.Tab title='Hierarchy / Property'>
								<LayoutSplit direction="horizontal" storageKey="orengine-editor-sp-hierarchyProp">
									<LayoutSplit.Item flex={1} minSize={120} overflow padding>
										<Hierarchy />
									</LayoutSplit.Item>
									<LayoutSplit.Item flex={1} minSize={120} overflow padding>
										<EntityProperty />
									</LayoutSplit.Item>
								</LayoutSplit>
							</PanelContainer.Tab>
							{spPanelTabs( panels ).map( ( tab ) => (
								<PanelContainer.Tab key={tab.id} title={tab.title}>
									{tab.content}
								</PanelContainer.Tab>
							) )}
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
			</>
		);

	}

	return <OREditorProvider projectName={props.projectName} onSave={props.onSave} editorData={props.editorData} scenes={props.scenes}>
		<PopoverProvider>
			<InputWindowProvider>
				<div className={style.editor}>
					{editorElm}
				</div>
				<EntityAdd />
				<InputWindow />
				<Popover />
			</InputWindowProvider>
		</PopoverProvider>
	</OREditorProvider>;

};
