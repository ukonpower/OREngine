import { DragOverlay } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'OREditor/PanelLayout/DragOverlay',
	component: DragOverlay,
} satisfies Meta<typeof DragOverlay>;

export default meta;

type Story = StoryObj<typeof meta>;

// コンテンツ領域の右半分へ分割ドロップするときのハイライトとゴースト
export const ZoneRight: Story = {
	args: {
		drag: {
			panelId: "property",
			title: "Property",
			startX: 640,
			startY: 360,
			target: { kind: "zone", paneId: "pane", zone: "right", rect: { left: 480, top: 120, width: 320, height: 400 } },
		},
	},
};

// タブヘッダーの2番目へ挿入するときのインジケータ線
export const TabInsert: Story = {
	args: {
		drag: {
			panelId: "property",
			title: "Property",
			startX: 320,
			startY: 160,
			target: { kind: "tabs", paneId: "pane", index: 1, rect: { left: 199, top: 100, width: 2, height: 20 } },
		},
	},
};
