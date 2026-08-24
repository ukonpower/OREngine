import type { LayoutNode, PaneNode, PanelId, SplitDirection, SplitItem, SplitNode } from './types';
import type { PanelSlot } from '../../..';

// スロットへ差し込むカスタムパネル群。active は default 指定されたタブ
export interface SlotTabs {
	tabs: PanelId[];
	active?: PanelId;
}

export type CustomSlotTabs = Partial<Record<PanelSlot, SlotTabs>>;

const split = ( direction: SplitDirection, children: SplitItem[] ): SplitNode => ( {
	type: "split",
	id: crypto.randomUUID(),
	direction,
	children,
} );

const pane = ( tabs: PanelId[], active?: PanelId ): PaneNode => ( {
	type: "pane",
	id: crypto.randomUUID(),
	tabs,
	active: active ?? tabs[ 0 ],
} );

// ビルトインのタブ列の後ろへスロットのカスタムタブを足した pane を作る
const slotPane = ( builtin: PanelId[], slot?: SlotTabs ): PaneNode =>
	pane( [ ...builtin, ...( slot?.tabs ?? [] ) ], slot?.active );

// データ駆動化前の PC レイアウトと同じ構成・同じ初期サイズのデフォルト木を作る。
// 比率は基準解像度 1920x1080 で旧実装の px / vh 指定（左右カラム300px・フッター160px・
// 左下20vh=216px・mainBottom 200px）と一致する値。分母はスプリッタ4pxを除いた実効サイズ
export function defaultLayout( customSlots: CustomSlotTabs = {} ): LayoutNode {

	const screenPane = pane( [ "screen" ] );
	const mainBottom = customSlots.mainBottom;

	// mainBottom のカスタムタブがあるときだけ、Screen の下に pane を挟む
	const center: LayoutNode = mainBottom
		? split( "vertical", [
			{ ratio: 712 / 912, node: screenPane },
			{ ratio: 200 / 912, node: pane( mainBottom.tabs, mainBottom.active ) },
		] )
		: screenPane;

	return split( "vertical", [
		{ ratio: 916 / 1076, node: split( "horizontal", [
			{ ratio: 300 / 1912, node: split( "vertical", [
				{ ratio: 696 / 912, node: slotPane( [ "scene" ], customSlots.leftTop ) },
				{ ratio: 216 / 912, node: slotPane( [ "timer" ], customSlots.leftBottom ) },
			] ) },
			{ ratio: 1312 / 1912, node: center },
			{ ratio: 300 / 1912, node: slotPane( [ "property", "textures", "project", "renderer", "editor-settings" ], customSlots.rightTop ) },
		] ) },
		{ ratio: 160 / 1076, node: slotPane( [ "timeline" ], customSlots.footer ) },
	] );

}

// 木を辿って id が一致するノードを replace の結果で差し替える。見つからなければ同一参照を返す
const replaceNode = ( node: LayoutNode, targetId: string, replace: ( node: LayoutNode ) => LayoutNode ): LayoutNode => {

	if ( node.id === targetId ) return replace( node );

	if ( node.type === "split" ) {

		let changed = false;

		const children = node.children.map( ( item ) => {

			const next = replaceNode( item.node, targetId, replace );

			if ( next === item.node ) return item;

			changed = true;

			return { ...item, node: next };

		} );

		if ( changed ) return { ...node, children };

	}

	return node;

};

// pane のアクティブタブを切り替える。不正な指定は何もしない（rootをそのまま返す）
export function selectTab( root: LayoutNode, paneId: string, panelId: PanelId ): LayoutNode {

	return replaceNode( root, paneId, ( node ) => {

		if ( node.type !== "pane" || ! node.tabs.includes( panelId ) ) return node;

		return { ...node, active: panelId };

	} );

}

// split の比率一式を差し替える（LayoutSplit のドラッグ終了コールバックから呼ぶ）。
// 個数が合わない指定は何もしない
export function setRatios( root: LayoutNode, splitId: string, ratios: number[] ): LayoutNode {

	return replaceNode( root, splitId, ( node ) => {

		if ( node.type !== "split" || node.children.length !== ratios.length ) return node;

		return { ...node, children: node.children.map( ( item, i ) => ( { ...item, ratio: ratios[ i ] } ) ) };

	} );

}
