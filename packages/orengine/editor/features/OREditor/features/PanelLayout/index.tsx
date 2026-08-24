import { useMemo, useState } from 'react';

import { LayoutSplit } from '../../../../components/ui/LayoutSplit';
import { Panel } from '../../../../components/ui/Panel';
import { PanelContainer } from '../../../../components/ui/PanelContainer';

import { defaultLayout, selectTab, setRatios } from './lib/layoutTree';

import type { EditorCustomTabs, PanelSlot } from '../..';
import type { CustomSlotTabs } from './lib/layoutTree';
import type { LayoutNode, PanelDefinition, PanelId } from './lib/types';

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

	// fixed パネル（Screen）はタブヘッダーを持たず pane 全面に表示する
	if ( defs.length === 1 && defs[ 0 ].fixed ) return defs[ 0 ].content;

	return <PanelContainer
		tabs={defs.map( ( def ) => ( { id: def.id, title: def.title, content: def.content } ) )}
		active={node.active}
		onSelect={( id ) => props.onSelectTab( node.id, id )}
	/>;

};

export type PanelLayoutProps = {
	// ビルトインパネルの定義。デフォルトレイアウト上の配置は defaultLayout が id で決める
	panels: PanelDefinition[];
	customTabs?: EditorCustomTabs;
};

// パネルレイアウトのデータ駆動レンダラー。ツリー（配置・比率・アクティブタブ）を状態として持つ
export const PanelLayout = ( props: PanelLayoutProps ) => {

	const custom = useMemo( () => convertCustomTabs( props.customTabs ), [ props.customTabs ] );

	// ツリーは初回マウント時に確定する（customTabs のマウント後の増減には追従しない）
	const [ layout, setLayout ] = useState<LayoutNode>( () => defaultLayout( custom.slots ) );

	const panels = useMemo( () => {

		const map = new Map<PanelId, PanelDefinition>();

		[ ...props.panels, ...custom.definitions ].forEach( ( def ) => map.set( def.id, def ) );

		return map;

	}, [ props.panels, custom ] );

	const onSelectTab = ( paneId: string, panelId: PanelId ) => setLayout( ( prev ) => selectTab( prev, paneId, panelId ) );
	const onRatiosChange = ( splitId: string, ratios: number[] ) => setLayout( ( prev ) => setRatios( prev, splitId, ratios ) );

	return <LayoutNodeView node={layout} panels={panels} onSelectTab={onSelectTab} onRatiosChange={onRatiosChange} />;

};
