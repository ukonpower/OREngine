import type { LayoutNode, PaneNode, PanelDefinition, PanelId, SplitDirection, SplitItem, SplitNode } from './types';
import type { PanelSlot } from '../../..';

// スロットへ差し込むカスタムパネル群。active は default 指定されたタブ
export interface SlotTabs {
	tabs: PanelId[];
	active?: PanelId;
}

export type CustomSlotTabs = Partial<Record<PanelSlot, SlotTabs>>;

export type PanelResolver = ( tabId: PanelId ) => PanelDefinition | undefined;

// タブ id から定義を引く。"<定義id>:<instance>" 形式は multiple な定義にだけ解決する
export function findPanel( panels: ReadonlyMap<PanelId, PanelDefinition>, tabId: PanelId ): PanelDefinition | undefined {

	const exact = panels.get( tabId );

	if ( exact ) return exact;

	const sep = tabId.indexOf( ":" );

	if ( sep === - 1 ) return undefined;

	const def = panels.get( tabId.slice( 0, sep ) );

	return def?.multiple ? def : undefined;

}

// multiple なタブ id の instance 部分（"<定義id>:<instance>" の後半）
export function tabInstance( tabId: PanelId ) {

	return tabId.slice( tabId.indexOf( ":" ) + 1 );

}

// 定義から新しく置くタブの id を作る。multiple なら毎回別 instance になる
export function newTabId( def: PanelDefinition ): PanelId {

	return def.multiple ? `${ def.id }:${ crypto.randomUUID() }` : def.id;

}

// 定義とタブ id から表示内容を作る
export function panelContent( def: PanelDefinition, tabId: PanelId ) {

	return def.multiple ? def.content( tabInstance( tabId ) ) : def.content;

}

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

	const screenPane = pane( [ "viewport:main" ] );
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

// 木の pane を出現順に列挙する
export function collectPanes( root: LayoutNode ): PaneNode[] {

	if ( root.type === "pane" ) return [ root ];

	return root.children.flatMap( ( item ) => collectPanes( item.node ) );

}

// 不変条件（空 pane なし・split は2子以上・同方向の入れ子なし・ratio 合計1）へ木を畳み直す。
// すべて畳まれて消えたら null
const normalize = ( node: LayoutNode ): LayoutNode | null => {

	if ( node.type === "pane" ) return node.tabs.length > 0 ? node : null;

	const flat: SplitItem[] = [];

	node.children.forEach( ( item ) => {

		const child = normalize( item.node );

		if ( ! child ) return;

		if ( child.type === "split" && child.direction === node.direction ) {

			// 同方向の入れ子は親に吸収する。子の取り分は元の区画の ratio で按分
			child.children.forEach( ( c ) => flat.push( { ratio: item.ratio * c.ratio, node: c.node } ) );

		} else {

			flat.push( child === item.node ? item : { ...item, node: child } );

		}

	} );

	if ( flat.length === 0 ) return null;
	if ( flat.length === 1 ) return flat[ 0 ].node;

	const sum = flat.reduce( ( s, item ) => s + item.ratio, 0 );

	if ( Math.abs( sum - 1 ) > 1e-6 ) {

		return { ...node, children: flat.map( ( item ) => ( { ...item, ratio: item.ratio / sum } ) ) };

	}

	const changed = flat.length !== node.children.length || flat.some( ( item, i ) => item !== node.children[ i ] );

	return changed ? { ...node, children: flat } : node;

};

// editor.json 由来の値を検証・修復して木にする。定義に解決できないタブは落とし、
// multiple なタブ id（= 1つのビューポート）が2箇所以上にあれば最初の1箇所だけ残し、空になった枝は畳む。
// 修復不能なら null（呼び出し側でデフォルトへ）
export function parseLayout( value: unknown, resolve: PanelResolver ): LayoutNode | null {

	const seenIds = new Set<string>();
	const seenInstanceTabs = new Set<PanelId>();

	const takeId = ( raw: unknown ) => {

		const id = typeof raw === "string" && raw !== "" && ! seenIds.has( raw ) ? raw : crypto.randomUUID();
		seenIds.add( id );

		return id;

	};

	const parseNode = ( v: unknown ): LayoutNode | null => {

		if ( typeof v !== "object" || v === null ) return null;

		const obj = v as Record<string, unknown>;

		if ( obj.type === "pane" ) {

			if ( ! Array.isArray( obj.tabs ) ) return null;

			const tabs = [ ...new Set( obj.tabs.filter( ( t ): t is PanelId => typeof t === "string" ) ) ]
				.filter( ( t ) => {

					const def = resolve( t );

					if ( ! def ) return false;
					if ( ! def.multiple ) return true;
					if ( seenInstanceTabs.has( t ) ) return false;

					seenInstanceTabs.add( t );

					return true;

				} );

			if ( tabs.length === 0 ) return null;

			const active = typeof obj.active === "string" && tabs.includes( obj.active ) ? obj.active : tabs[ 0 ];

			return { type: "pane", id: takeId( obj.id ), tabs, active };

		}

		if ( obj.type === "split" ) {

			if ( obj.direction !== "horizontal" && obj.direction !== "vertical" ) return null;
			if ( ! Array.isArray( obj.children ) ) return null;

			const children: SplitItem[] = [];

			obj.children.forEach( ( rawItem ) => {

				if ( typeof rawItem !== "object" || rawItem === null ) return;

				const itemObj = rawItem as Record<string, unknown>;
				const node = parseNode( itemObj.node );

				if ( ! node ) return;

				const ratio = typeof itemObj.ratio === "number" && isFinite( itemObj.ratio ) && itemObj.ratio > 0 ? itemObj.ratio : 1;

				children.push( { ratio, node } );

			} );

			if ( children.length === 0 ) return null;
			if ( children.length === 1 ) return children[ 0 ].node;

			return { type: "split", id: takeId( obj.id ), direction: obj.direction, children };

		}

		return null;

	};

	const parsed = parseNode( value );

	return parsed ? normalize( parsed ) : null;

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

// pane の index 位置へタブを挿してアクティブにする（省略時は末尾）。既に同じタブがある pane へは何もしない
export function addTab( root: LayoutNode, paneId: string, panelId: PanelId, index?: number ): LayoutNode {

	return replaceNode( root, paneId, ( node ) => {

		if ( node.type !== "pane" || node.tabs.includes( panelId ) ) return node;

		const tabs = [ ...node.tabs ];

		tabs.splice( Math.max( 0, Math.min( index ?? tabs.length, tabs.length ) ), 0, panelId );

		return { ...node, tabs, active: panelId };

	} );

}

// タブを toPane の index 位置へ移してアクティブにする（index は移動前のタブ列基準・省略時は末尾）。
// 並びが変わらない指定や、移動先に同じタブが既にある指定は何もしない（rootをそのまま返す）
export function moveTab( root: LayoutNode, fromPaneId: string, panelId: PanelId, toPaneId: string, index?: number ): LayoutNode {

	if ( fromPaneId === toPaneId ) {

		return replaceNode( root, fromPaneId, ( node ) => {

			if ( node.type !== "pane" ) return node;

			const from = node.tabs.indexOf( panelId );

			if ( from === - 1 ) return node;

			const tabs = node.tabs.filter( ( t ) => t !== panelId );

			// index は自分を含む移動前の並びで数えているので、自分より後ろへの挿入は1つ詰める
			const raw = index ?? node.tabs.length;
			const insert = Math.max( 0, Math.min( from < raw ? raw - 1 : raw, tabs.length ) );

			if ( insert === from ) return node;

			tabs.splice( insert, 0, panelId );

			return { ...node, tabs, active: panelId };

		} );

	}

	const panes = collectPanes( root );
	const from = panes.find( ( p ) => p.id === fromPaneId );
	const to = panes.find( ( p ) => p.id === toPaneId );

	// 移動先が無い・重複になる状態で closeTab だけ通るとタブが消えてしまうので、先にまとめて弾く
	if ( ! from || ! to || ! from.tabs.includes( panelId ) || to.tabs.includes( panelId ) ) return root;

	return addTab( closeTab( root, fromPaneId, panelId ), toPaneId, panelId, index );

}

export type SplitEdge = "left" | "right" | "top" | "bottom";

// targetPane の領域を edge 側で50:50に分け、fromPane から抜いたタブだけの新しい pane をそこへ入れる。
// 親 split が同方向なら normalize が平坦化する（見た目は半々のまま）。何も変わらない指定は root をそのまま返す
export function splitPane( root: LayoutNode, targetPaneId: string, edge: SplitEdge, fromPaneId: string, panelId: PanelId ): LayoutNode {

	const panes = collectPanes( root );
	const from = panes.find( ( p ) => p.id === fromPaneId );

	if ( ! from || ! from.tabs.includes( panelId ) || ! panes.some( ( p ) => p.id === targetPaneId ) ) return root;

	// 唯一のタブで自分自身を分割しても元の形に戻るだけ
	if ( fromPaneId === targetPaneId && from.tabs.length === 1 ) return root;

	const removed = closeTab( root, fromPaneId, panelId );

	const newPane: PaneNode = { type: "pane", id: crypto.randomUUID(), tabs: [ panelId ], active: panelId };

	const replaced = replaceNode( removed, targetPaneId, ( node ) => {

		const children: SplitItem[] = [ { ratio: 0.5, node: newPane }, { ratio: 0.5, node } ];

		if ( edge === "right" || edge === "bottom" ) children.reverse();

		return {
			type: "split",
			id: crypto.randomUUID(),
			direction: edge === "left" || edge === "right" ? "horizontal" : "vertical",
			children,
		};

	} );

	if ( replaced === removed ) return root;

	return normalize( replaced ) ?? root;

}

// pane からタブを取り除く。空になった pane は消え、split が畳まれて隣に結合される。
// 木ごと消える操作（最後の1枚を閉じる等）は無効で、root をそのまま返す
export function closeTab( root: LayoutNode, paneId: string, panelId: PanelId ): LayoutNode {

	const removed = replaceNode( root, paneId, ( node ) => {

		if ( node.type !== "pane" || ! node.tabs.includes( panelId ) ) return node;

		const index = node.tabs.indexOf( panelId );
		const tabs = node.tabs.filter( ( t ) => t !== panelId );
		const active = node.active !== panelId || tabs.length === 0 ? node.active : tabs[ Math.min( index, tabs.length - 1 ) ];

		return { ...node, tabs, active };

	} );

	if ( removed === root ) return root;

	return normalize( removed ) ?? root;

}

// split の比率一式を差し替える（LayoutSplit のドラッグ終了コールバックから呼ぶ）。
// 個数が合わない指定は何もしない
export function setRatios( root: LayoutNode, splitId: string, ratios: number[] ): LayoutNode {

	return replaceNode( root, splitId, ( node ) => {

		if ( node.type !== "split" || node.children.length !== ratios.length ) return node;

		return { ...node, children: node.children.map( ( item, i ) => ( { ...item, ratio: ratios[ i ] } ) ) };

	} );

}
