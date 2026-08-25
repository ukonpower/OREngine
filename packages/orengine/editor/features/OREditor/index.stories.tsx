import { withOREngine } from '@or-storybook/decorators/withOREditor';
import { storyEditorData, storyScene } from '@or-storybook/fixtures/scene';

import { OREditor } from '.';

import type { EditorCustomTabs } from '.';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'OREditor/Layout',
	component: OREditor,
} satisfies Meta<typeof OREditor>;

export default meta;

type Story = StoryObj<typeof meta>;

// エディタ全体のパネルレイアウトを検証するストーリー。ビューポートいっぱいに広げて撮る
const fullscreen = ( customTabs?: EditorCustomTabs, editorData = storyEditorData ): Story => ( {
	args: { editorData, customTabs },
	decorators: [
		( Story ) => <div style={{ width: '100vw', height: '100vh' }}><Story /></div>,
		withOREngine( storyScene ),
	],
} );

export const Default = fullscreen();

// editor.json に保存されたレイアウトツリーの復元描画を固定する。
// デフォルトとの違い: フッター無し・Timeline は左 pane のタブ・Screen は他タブと同居・
// 右カラムが上下2分割・アクティブタブの復元
export const SavedLayout = fullscreen( undefined, {
	...storyEditorData,
	panelLayout: {
		type: "split", id: "root", direction: "horizontal",
		children: [
			{ ratio: 0.2, node: { type: "pane", id: "left", tabs: [ "scene", "timeline" ], active: "timeline" } },
			{ ratio: 0.55, node: { type: "pane", id: "center", tabs: [ "screen", "project" ], active: "screen" } },
			{ ratio: 0.25, node: { type: "split", id: "right", direction: "vertical", children: [
				{ ratio: 0.6, node: { type: "pane", id: "rightTop", tabs: [ "property", "textures" ], active: "textures" } },
				{ ratio: 0.4, node: { type: "pane", id: "rightBottom", tabs: [ "timer" ], active: "timer" } },
			] } },
		],
	},
} );

// customTabs の5スロット注入と default タブ指定の見え方を固定する
export const CustomTabs = fullscreen( {
	leftTop: [ { title: 'Assets', content: <div>custom leftTop</div> } ],
	mainBottom: [
		{ title: 'Console', content: <div>custom mainBottom 1</div>, default: true },
		{ title: 'Log', content: <div>custom mainBottom 2</div> },
	],
	rightTop: [ { title: 'Custom', content: <div>custom rightTop</div>, default: true } ],
	footer: [ { title: 'Notes', content: <div>custom footer</div> } ],
} );
