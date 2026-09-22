import React, { useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import * as MXP from 'maxpower';

import { LayoutSplit } from '../../components/ui/LayoutSplit';
import { Panel } from '../../components/ui/Panel';
import { PanelContainer } from '../../components/ui/PanelContainer';
import { useLayout } from '../../hooks/useLayout';

import { EditorSettings } from './features/EditorSettings';
import { EntityProperty } from './features/EntityProperty';
import { ExportControl } from './features/ExportControl';
import { Timer } from './features/GPUTimer';
import { Hierarchy } from './features/Hierarchy';
import { InputWindow } from './features/InputWindow';
import { InputWindowProvider } from './features/InputWindow/providers/InputWindowProvider';
import { MouseMenu } from './features/MouseMenu';
import { MouseMenuProvider } from './features/MouseMenu/providers/MouseMenuProvider';
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
	{ id: "hierarchy", title: "Hierarchy", content: <Panel><Hierarchy /></Panel> },
	{ id: "timer", title: "Timer", content: <Panel noPadding><Timer /></Panel> },
	{ id: VIEWPORT_PANEL_ID, title: "Screen", multiple: true, content: ( viewportId ) => <Screen viewportId={viewportId} /> },
	{ id: "property", title: "Property", content: <Panel><EntityProperty /></Panel> },
	{ id: "textures", title: "Textures", content: <Panel noPadding><Textures /></Panel> },
	{ id: "scene", title: "Scene", content: <Panel><SceneControl /></Panel> },
	{ id: "export", title: "Export", content: <Panel><ExportControl /></Panel> },
	{ id: "renderer", title: "Renderer", content: <Panel><RendererSettings /></Panel> },
	{ id: "editor-settings", title: "Editor", content: <Panel><EditorSettings /></Panel> },
	{ id: "timeline", title: "Timeline", content: <Panel noPadding><Timeline /></Panel> },
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

		editorElm = (
			<>
				<PanelLayout panels={panels} />
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
				<MouseMenu />
			</>
		);

	}

	return <OREditorProvider projectName={props.projectName} onSave={props.onSave} editorData={props.editorData} scenes={props.scenes}>
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
