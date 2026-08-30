import type React from 'react';

// タブの識別子。単一パネルは定義 id そのもの、複数置けるパネルは "<定義id>:<instance>"
export type PanelId = string;

// レイアウトに配置できるパネル1種の定義。pane = パネルを収める枠 / panel = 中身、と使い分ける
export type PanelDefinition = {
	id: PanelId;
	title: string;
} & (
	// レイアウト内に同時1つまで。Panel ラッパー込みの完成形を持つ
	| { multiple?: false; content: React.ReactNode }
	// 「+」で追加するたびに "<id>:<instance>" のタブが新しく増える（Screen 用。タブごとに独立したビューポートを持つ）
	| { multiple: true; content: ( instanceId: string ) => React.ReactNode }
);

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
