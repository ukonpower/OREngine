import type React from 'react';

// パネル型の識別子（ビルトイン + customTabs 由来）
export type PanelId = string;

// レイアウトに配置できるパネル1種の定義。pane = パネルを収める枠 / panel = 中身、と使い分ける
export interface PanelDefinition {
	id: PanelId;
	title: string;
	// Panel ラッパー込みの完成形
	content: React.ReactNode;
	// true: この panel を含む pane は分割・結合・タブ移動の対象外で、タブヘッダーも持たない（Screen 用）
	fixed?: boolean;
}

// LayoutSplit の direction と同じ意味（horizontal = 子が横並び）
export type SplitDirection = "horizontal" | "vertical";

export type LayoutNode = SplitNode | PaneNode;

// 領域を direction 方向に n 分割する内部ノード。LayoutSplit 1つに対応する
export interface SplitNode {
	type: "split";
	id: string;
	direction: SplitDirection;
	// 常に2個以上。直下に同方向の split は置かない
	children: SplitItem[];
}

// split の1区画。ratio は兄弟間の配分で、合計が1
export interface SplitItem {
	ratio: number;
	node: LayoutNode;
}

// タブを束ねる末端ノード。PanelContainer 1つに対応する
export interface PaneNode {
	type: "pane";
	id: string;
	// 1個以上・pane 内で重複なし
	tabs: PanelId[];
	// 必ず tabs に含まれる
	active: PanelId;
}
