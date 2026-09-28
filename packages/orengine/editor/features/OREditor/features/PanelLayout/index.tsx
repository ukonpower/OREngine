import { useEffect, useMemo, useState } from 'react';

import { LayoutSplit, Menu, PanelContainer, pointAnchor, usePopover } from 'uipower';

import { useOREditor } from '../../hooks/useOREditor';
import { VIEWPORT_PANEL_ID } from '../Screen';
import { useSerializableField } from '../SerializableField/hooks/useSerializableProps';

import { DragOverlay } from './components/DragOverlay';
import { useInteractionPane } from './hooks/useInteractionPane';
import { useTabDrag } from './hooks/useTabDrag';
import { useTabLongPress } from './hooks/useTabLongPress';
import style from './index.module.scss';
import { buildAddTabMenu } from './lib/addTabMenu';
import { activatePanels, addTab, closeTab, collectPanes, defaultLayout, defaultLayoutSP, findPanel, newTabId, panelContent, parseLayout, selectTab, setRatios, tabInstance } from './lib/layoutTree';

import type { PanelResolver } from './lib/layoutTree';
import type { LayoutNode, PaneNode, PanelDefinition, PanelId } from './lib/types';
import type { Editor } from '../../../../lib';
import type * as MXP from 'maxpower';

export type { LayoutNode, PanelDefinition, PanelId } from './lib/types';

// どの画面向けの木を使うか。field 名は Editor（lib/Editor）の panelLayout / panelLayoutSP と一致させる
export type PanelLayoutMode = "pc" | "sp";

const layoutModes = {
	pc: { field: "panelLayout", defaultLayout },
	sp: { field: "panelLayoutSP", defaultLayout: defaultLayoutSP },
} as const;

// 全モードの木に置かれている Screen タブのビューポート id。表示していないモードの木のものも含める
const liveViewportIds = ( editor: Editor, resolve: PanelResolver ) => {

	const ids = new Set<string>();

	for ( const mode of Object.values( layoutModes ) ) {

		const layout = parseLayout( editor.getField( mode.field ), resolve ) ?? mode.defaultLayout();

		for ( const pane of collectPanes( layout ) ) {

			for ( const tab of pane.tabs ) {

				if ( resolve( tab )?.id === VIEWPORT_PANEL_ID ) ids.add( tabInstance( tab ) );

			}

		}

	}

	return ids;

};

type LayoutNodeViewProps = {
	node: LayoutNode;
	resolve: PanelResolver;
	onSelectTab: ( paneId: string, panelId: PanelId ) => void;
	onRatiosChange: ( splitId: string, ratios: number[] ) => void;
	onTabContextMenu: ( paneId: string, panelId: PanelId, event: React.MouseEvent ) => void;
	onTabPointerDown: ( paneId: string, panelId: PanelId, event: React.PointerEvent ) => void;
	onAddTab: ( paneId: string, event: React.MouseEvent ) => void;
	hasAddable: ( pane: PaneNode ) => boolean;
};

// レイアウトツリーを LayoutSplit / PanelContainer に展開する再帰レンダラー
const LayoutNodeView = ( props: LayoutNodeViewProps ) => {

	const node = props.node;

	if ( node.type === "split" ) {

		return <LayoutSplit
			direction={node.direction}
			ratios={node.children.map( ( item ) => item.ratio )}
			onRatiosChange={( ratios ) => props.onRatiosChange( node.id, ratios )}
		>
			{node.children.map( ( item ) => (
				<LayoutSplit.Item key={item.node.id}>
					<LayoutNodeView {...props} node={item.node} />
				</LayoutSplit.Item>
			) )}
		</LayoutSplit>;

	}

	const tabs = node.tabs.flatMap( ( id ) => {

		const def = props.resolve( id );

		return def ? [ { id, title: def.title, content: panelContent( def, id ) } ] : [];

	} );

	if ( tabs.length === 0 ) return null;

	const canAdd = props.hasAddable( node );

	return <div className={style.pane} data-pane-id={node.id}>
		<PanelContainer
			tabs={tabs}
			active={node.active}
			onSelect={( id ) => props.onSelectTab( node.id, id )}
			onTabContextMenu={( id, e ) => props.onTabContextMenu( node.id, id, e )}
			onTabPointerDown={( id, e ) => props.onTabPointerDown( node.id, id, e )}
			onAddClick={canAdd ? ( e ) => props.onAddTab( node.id, e ) : undefined}
		/>
	</div>;

};

export type PanelLayoutProps = {
	mode: PanelLayoutMode;
	// 配置できるパネルの定義（ビルトイン + 利用者が渡したもの）。
	// デフォルトレイアウト上の配置は defaultLayout が id で決める
	panels: PanelDefinition[];
	// エンティティが選択されたとき、それを含む pane でアクティブにするパネル
	activateOnSelect?: PanelId[];
};

// パネルレイアウトのデータ駆動レンダラー。ツリー（配置・比率・アクティブタブ）は
// Editor の panelLayout（PC）/ panelLayoutSP（SP）field が持ち主で、保存（Ctrl+S）で editor.json に載る
export const PanelLayout = ( props: PanelLayoutProps ) => {

	const { editor } = useOREditor();
	const { open, closeAll } = usePopover();

	const panels = useMemo( () => {

		const map = new Map<PanelId, PanelDefinition>();

		props.panels.forEach( ( def ) => map.set( def.id, def ) );

		return map;

	}, [ props.panels ] );

	const resolve = useMemo( (): PanelResolver => ( tabId ) => findPanel( panels, tabId ), [ panels ] );

	const layoutMode = layoutModes[ props.mode ];

	const [ savedLayout, setSavedLayout ] = useSerializableField<MXP.SerializeFieldValue>( editor, layoutMode.field );

	// 保存値を検証して木にする。壊れている場合はデフォルトへ
	const layout = useMemo( () => parseLayout( savedLayout, resolve ) ?? layoutMode.defaultLayout(), [ savedLayout, resolve, layoutMode ] );

	// 閉じた Screen タブのビューポートは戻ってこないので、その設定を保存データに残さない。
	// 表示していないモードの木にある Screen の設定まで消さないよう、全モードの木を見る。
	// Canvas のアンマウント（設定の書き戻し）より後に走るよう effect で行う
	useEffect( () => {

		editor.pruneViewportSettings( liveViewportIds( editor, resolve ) );

	}, [ layout, resolve, editor ] );

	const { currentPaneId } = useInteractionPane();

	// 選択の経路（ビューポート・Hierarchy・シーン CLI…）によらず拾うため、field の更新イベントを購読する。
	// 同じエンティティの再選択でもイベントは出る。選ぶ操作をした pane は keepPaneId として触らない（見ているタブを勝手に変えない）。
	// editor.json の読み込みで流し込まれた選択では切り替えず、保存されたタブのまま開く。
	// ここでは要求を立てるだけにし、描画後の最新の木に対して下の effect で切り替える
	const [ activateRequest, setActivateRequest ] = useState<{ keepPaneId: string | null } | null>( null );

	useEffect( () => {

		const onSelect = () => {

			if ( editor.bootstrapping ) return;

			if ( editor.getField( "selectedEntityId" ) ) setActivateRequest( { keepPaneId: currentPaneId() } );

		};

		editor.on( "fields/update/selectedEntityId", onSelect );

		return () => {

			editor.off( "fields/update/selectedEntityId", onSelect );

		};

	}, [ editor, currentPaneId ] );

	// field は素通しの箱なので、木の型はこの feature 側で保証して受け渡す
	const apply = ( next: LayoutNode ) => {

		if ( next !== layout ) setSavedLayout( next as unknown as MXP.SerializeFieldValue );

	};

	const activateOnSelect = props.activateOnSelect;

	useEffect( () => {

		if ( ! activateRequest ) return;

		setActivateRequest( null );

		if ( ! activateOnSelect ) return;

		const next = activatePanels( layout, activateOnSelect, activateRequest.keepPaneId );

		// apply は毎レンダー作り直されるので deps に載せず、同じ field へ直接書く
		if ( next !== layout ) editor.setField( layoutMode.field, next as unknown as MXP.SerializeFieldValue );

	}, [ activateRequest, activateOnSelect, layout, editor, layoutMode ] );

	const onSelectTab = ( paneId: string, panelId: PanelId ) => apply( selectTab( layout, paneId, panelId ) );
	const onRatiosChange = ( splitId: string, ratios: number[] ) => apply( setRatios( layout, splitId, ratios ) );

	const { dragState, onTabPointerDown: onTabDragPointerDown } = useTabDrag( layout, apply, resolve );

	// 追加候補は、その pane にまだ無いパネル（同じパネルを別 pane に出すのは許す）。
	// multiple なパネルは追加のたびに新しいタブになるので常に候補
	const addablePanels = ( pane: PaneNode ) =>
		[ ...panels.values() ].filter( ( def ) => def.multiple || ! pane.tabs.includes( def.id ) );

	// ヘッダーの「+」から開くタブ追加メニュー
	const openAddTabMenu = ( paneId: string, e: React.MouseEvent ) => {

		const pane = collectPanes( layout ).find( ( p ) => p.id === paneId );

		if ( ! pane ) return;

		const addable = addablePanels( pane );

		if ( addable.length === 0 ) return;

		const items = buildAddTabMenu( addable, ( def ) => {

			apply( addTab( layout, paneId, newTabId( def ) ) );
			closeAll();

		} );

		open( <Menu items={items} />, pointAnchor( e.clientX, e.clientY ) );

	};

	// タブの右クリック・長押しメニュー（Unity の Close Tab 相当。追加はヘッダーの「+」から）
	const openTabMenu = ( paneId: string, panelId: PanelId, x: number, y: number ) => {

		// 最後の1タブを閉じるとタブヘッダーごと消えて操作の足場が無くなるので閉じさせない
		const canClose = collectPanes( layout ).reduce( ( n, p ) => n + p.tabs.length, 0 ) > 1;

		if ( ! canClose ) return;

		open( <Menu title={resolve( panelId )?.title} items={[
			{
				label: "Close Tab",
				onClick: () => {

					apply( closeTab( layout, paneId, panelId ) );
					closeAll();

				},
			},
		]} />, pointAnchor( x, y ) );

	};

	const onTabContextMenu = ( paneId: string, panelId: PanelId, e: React.MouseEvent ) => openTabMenu( paneId, panelId, e.clientX, e.clientY );

	const { onTabPointerDown: onTabLongPressPointerDown } = useTabLongPress( openTabMenu );

	// タッチではタブを動かさず、長押しでメニューを出すだけにする。
	// タブのドラッグを受けるとタブヘッダーの横スクロールと取り合いになるため
	const onTabPointerDown = ( paneId: string, panelId: PanelId, e: React.PointerEvent ) => {

		if ( e.pointerType === "touch" ) {

			onTabLongPressPointerDown( paneId, panelId, e );

		} else {

			onTabDragPointerDown( paneId, panelId, e );

		}

	};

	return <>
		<LayoutNodeView node={layout} resolve={resolve} onSelectTab={onSelectTab} onRatiosChange={onRatiosChange} onTabContextMenu={onTabContextMenu} onTabPointerDown={onTabPointerDown} onAddTab={openAddTabMenu} hasAddable={( pane ) => addablePanels( pane ).length > 0} />
		{dragState && <DragOverlay drag={dragState} />}
	</>;

};
