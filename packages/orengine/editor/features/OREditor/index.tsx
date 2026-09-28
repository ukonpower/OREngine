import React, { useMemo } from 'react';

import * as MXP from 'maxpower';
import { InputWindow, InputWindowProvider, Panel, Popover, PopoverProvider } from 'uipower';

import { useLayout } from '../../hooks/useLayout';

import { EditorSettings } from './features/EditorSettings';
import { EntityAdd } from './features/EntityAdd';
import { EntityProperty } from './features/EntityProperty';
import { ExportControl } from './features/ExportControl';
import { Timer } from './features/GPUTimer';
import { Hierarchy } from './features/Hierarchy';
import { KeyFrame } from './features/KeyFrame';
import { PanelLayout } from './features/PanelLayout';
import { RendererSettings } from './features/RendererSettings';
import { SceneControl } from './features/SceneControl';
import { Screen, VIEWPORT_PANEL_ID } from './features/Screen';
import { Textures } from './features/Textures';
import { Timeline } from './features/Timeline';
import style from './index.module.scss';
import { OREditorProvider, OREditorSaveCallback, SceneSelection } from './providers/OREditorProvider';

import type { PanelDefinition, PanelId, PanelLayoutMode } from './features/PanelLayout';
import type { FieldUIDefinition } from './lib/fieldUI';

export type { SceneSelection } from './providers/OREditorProvider';
export type { PanelDefinition, PanelId } from './features/PanelLayout';
export type { FieldUIDefinition } from './lib/fieldUI';

// レイアウトツリー上の配置は PanelLayout 側の defaultLayout / defaultLayoutSP がこの id を参照して決める。
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

// エンティティを選択したとき前面に出すパネル（選択の結果を見る場所）。選ぶ操作をした pane は切り替えない。
// SP のように1つの pane に両方あるときは後ろの Property が前に出る
const activateOnSelect: PanelId[] = [ "hierarchy", "property" ];

export const OREditor: React.FC<{onSave?: OREditorSaveCallback, editorData?: MXP.SerializeField, projectName?: string, panels?: PanelDefinition[], scenes?: SceneSelection, fieldUIs?: FieldUIDefinition[] }> = ( props ) => {

	const layout = useLayout();

	// 利用者のパネルはビルトインの後ろに並べる。identity が毎レンダー変わると
	// PanelLayout の派生計算が空回りするので、渡されないときは定数配列をそのまま使う
	const panels = useMemo( () => {

		if ( ! props.panels ) return builtinPanels;

		return [ ...builtinPanels, ...props.panels ];

	}, [ props.panels ] );

	let layoutMode: PanelLayoutMode = "pc";

	if ( layout.isSP ) {

		layoutMode = "sp";

	}

	return <OREditorProvider projectName={props.projectName} onSave={props.onSave} editorData={props.editorData} scenes={props.scenes} fieldUIs={props.fieldUIs}>
		<PopoverProvider>
			<InputWindowProvider>
				<div className={style.editor}>
					<PanelLayout mode={layoutMode} panels={panels} activateOnSelect={activateOnSelect} />
				</div>
				<EntityAdd />
				<KeyFrame />
				<InputWindow />
				<Popover />
			</InputWindowProvider>
		</PopoverProvider>
	</OREditorProvider>;

};
