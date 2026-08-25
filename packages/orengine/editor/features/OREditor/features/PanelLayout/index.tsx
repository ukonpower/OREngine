import { useMemo } from 'react';

import { LayoutSplit } from '../../../../components/ui/LayoutSplit';
import { Panel } from '../../../../components/ui/Panel';
import { PanelContainer } from '../../../../components/ui/PanelContainer';
import { useOREditor } from '../../hooks/useOREditor';
import { Picker } from '../MouseMenu/components/Picker';
import { useMouseMenu } from '../MouseMenu/hooks/useMouseMenu';
import { useSerializableField } from '../SerializableField/hooks/useSerializableProps';

import { DragOverlay } from './components/DragOverlay';
import { useTabDrag } from './hooks/useTabDrag';
import style from './index.module.scss';
import { addTab, closeTab, collectPanes, defaultLayout, parseLayout, selectTab, setRatios } from './lib/layoutTree';

import type { EditorCustomTabs, PanelSlot } from '../..';
import type { CustomSlotTabs } from './lib/layoutTree';
import type { LayoutNode, PaneNode, PanelDefinition, PanelId } from './lib/types';
import type * as MXP from 'maxpower';

export type { LayoutNode, PanelDefinition, PanelId } from './lib/types';

// customTabs（スロット注入の公開API）をパネル定義とスロット配置へ読み替える
const convertCustomTabs = ( customTabs?: EditorCustomTabs ) => {

	const definitions: PanelDefinition[] = [];
	const slots: CustomSlotTabs = {};

	if ( ! customTabs ) return { definitions, slots };

	const usedIds = new Set<PanelId>();

	( Object.keys( customTabs ) as PanelSlot[] ).forEach( ( slot ) => {

		const tabs = customTabs[ slot ];

		if ( ! tabs || tabs.length === 0 ) return;

		const ids: PanelId[] = [];
		let active: PanelId | undefined;

		tabs.forEach( ( tab ) => {

			// id は表示に使わないので、タイトル重複時は連番で一意化するだけでよい
			let id = `custom/${ slot }/${ tab.title }`;

			for ( let n = 2; usedIds.has( id ); n ++ ) id = `custom/${ slot }/${ tab.title }-${ n }`;

			usedIds.add( id );
			ids.push( id );

			definitions.push( { id, title: tab.title, content: <Panel>{tab.content}</Panel> } );

			if ( tab.default && active === undefined ) active = id;

		} );

		slots[ slot ] = { tabs: ids, active };

	} );

	return { definitions, slots };

};

type LayoutNodeViewProps = {
	node: LayoutNode;
	panels: ReadonlyMap<PanelId, PanelDefinition>;
	onSelectTab: ( paneId: string, panelId: PanelId ) => void;
	onRatiosChange: ( splitId: string, ratios: number[] ) => void;
	onTabContextMenu: ( paneId: string, panelId: PanelId, event: React.MouseEvent ) => void;
	onTabPointerDown: ( paneId: string, panelId: PanelId, event: React.PointerEvent ) => void;
	onAddTab: ( paneId: string ) => void;
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

	const defs = node.tabs
		.map( ( id ) => props.panels.get( id ) )
		.filter( ( def ): def is PanelDefinition => def !== undefined );

	if ( defs.length === 0 ) return null;

	const canAdd = props.hasAddable( node );

	return <div className={style.pane} data-pane-id={node.id}>
		<PanelContainer
			tabs={defs.map( ( def ) => ( { id: def.id, title: def.title, content: def.content } ) )}
			active={node.active}
			onSelect={( id ) => props.onSelectTab( node.id, id )}
			onTabContextMenu={( id, e ) => props.onTabContextMenu( node.id, id, e )}
			onTabPointerDown={( id, e ) => props.onTabPointerDown( node.id, id, e )}
			onAddClick={canAdd ? () => props.onAddTab( node.id ) : undefined}
		/>
	</div>;

};

export type PanelLayoutProps = {
	// ビルトインパネルの定義。デフォルトレイアウト上の配置は defaultLayout が id で決める
	panels: PanelDefinition[];
	customTabs?: EditorCustomTabs;
};

// パネルレイアウトのデータ駆動レンダラー。ツリー（配置・比率・アクティブタブ）は
// Editor の panelLayout field が持ち主で、保存（Ctrl+S）で editor.json に載る
export const PanelLayout = ( props: PanelLayoutProps ) => {

	const { editor } = useOREditor();
	const { pushContent, closeAll } = useMouseMenu();

	const custom = useMemo( () => convertCustomTabs( props.customTabs ), [ props.customTabs ] );

	const panels = useMemo( () => {

		const map = new Map<PanelId, PanelDefinition>();

		[ ...props.panels, ...custom.definitions ].forEach( ( def ) => map.set( def.id, def ) );

		return map;

	}, [ props.panels, custom ] );

	const [ savedLayout, setSavedLayout ] = useSerializableField<MXP.SerializeFieldValue>( editor, "panelLayout" );

	// 保存値を検証して木にする。壊れている場合はデフォルトへ
	const layout = useMemo( () => {

		const uniqueIds = new Set( [ ...panels.values() ].filter( ( def ) => def.unique ).map( ( def ) => def.id ) );

		return parseLayout( savedLayout, new Set( panels.keys() ), uniqueIds ) ?? defaultLayout( custom.slots );

	}, [ savedLayout, panels, custom ] );

	// field は素通しの箱なので、木の型はこの feature 側で保証して受け渡す
	const apply = ( next: LayoutNode ) => {

		if ( next !== layout ) setSavedLayout( next as unknown as MXP.SerializeFieldValue );

	};

	const onSelectTab = ( paneId: string, panelId: PanelId ) => apply( selectTab( layout, paneId, panelId ) );
	const onRatiosChange = ( splitId: string, ratios: number[] ) => apply( setRatios( layout, splitId, ratios ) );

	const { dragState, onTabPointerDown } = useTabDrag( layout, apply, panels );

	// 追加候補は、その pane にまだ無いパネル（同じパネルを別 pane に出すのは許す）
	const addablePanels = ( pane: PaneNode ) =>
		[ ...panels.values() ].filter( ( def ) => ! pane.tabs.includes( def.id ) );

	// ヘッダーの「+」から開くタブ追加メニュー
	const openAddTabMenu = ( paneId: string ) => {

		const pane = collectPanes( layout ).find( ( p ) => p.id === paneId );

		if ( ! pane ) return;

		const addable = addablePanels( pane );

		if ( addable.length === 0 ) return;

		pushContent( <Picker list={addable.map( ( def ) => ( {
			label: def.title,
			onClick: () => {

				// unique パネル（Screen）は既存の配置から取り除いてから足す＝追加ではなく移動になる
				const from = def.unique ? collectPanes( layout ).find( ( p ) => p.tabs.includes( def.id ) ) : undefined;

				apply( addTab( from ? closeTab( layout, from.id, def.id ) : layout, paneId, def.id ) );
				closeAll();

			},
		} ) )} /> );

	};

	// タブの右クリックメニュー（Unity の Close Tab 相当。追加はヘッダーの「+」から）
	const onTabContextMenu = ( paneId: string, panelId: PanelId, e: React.MouseEvent ) => {

		e.preventDefault();

		// 最後の1タブを閉じるとタブヘッダーごと消えて操作の足場が無くなるので閉じさせない
		const canClose = collectPanes( layout ).reduce( ( n, p ) => n + p.tabs.length, 0 ) > 1;

		if ( ! canClose ) return;

		pushContent( <Picker label={panels.get( panelId )?.title} list={[
			{
				label: "Close Tab",
				onClick: () => {

					apply( closeTab( layout, paneId, panelId ) );
					closeAll();

				},
			},
		]} /> );

	};

	return <>
		<LayoutNodeView node={layout} panels={panels} onSelectTab={onSelectTab} onRatiosChange={onRatiosChange} onTabContextMenu={onTabContextMenu} onTabPointerDown={onTabPointerDown} onAddTab={openAddTabMenu} hasAddable={( pane ) => addablePanels( pane ).length > 0} />
		{dragState && <DragOverlay drag={dragState} />}
	</>;

};
