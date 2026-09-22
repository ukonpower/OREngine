import { withOREngine } from '@or-storybook/decorators/withOREditor';
import { storyEditorData, storyScene } from '@or-storybook/fixtures/scene';
import { Block, Button, Panel } from 'uipower';

import { OREditor } from '.';

import type { PanelDefinition } from '.';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'OREditor/Layout',
	component: OREditor,
} satisfies Meta<typeof OREditor>;

export default meta;

type Story = StoryObj<typeof meta>;

// エディタ全体のパネルレイアウトを検証するストーリー。ビューポートいっぱいに広げて撮る
const fullscreen = ( panels?: PanelDefinition[], editorData = storyEditorData ): Story => ( {
	args: { editorData, panels },
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
			{ ratio: 0.2, node: { type: "pane", id: "left", tabs: [ "hierarchy", "timeline" ], active: "timeline" } },
			{ ratio: 0.55, node: { type: "pane", id: "center", tabs: [ "viewport:main", "scene" ], active: "viewport:main" } },
			{ ratio: 0.25, node: { type: "split", id: "right", direction: "vertical", children: [
				{ ratio: 0.6, node: { type: "pane", id: "rightTop", tabs: [ "property", "textures" ], active: "textures" } },
				{ ratio: 0.4, node: { type: "pane", id: "rightBottom", tabs: [ "timer" ], active: "timer" } },
			] } },
		],
	},
} );

// 利用者が足すパネル。content は Panel ラッパー込みで渡す（ビルトインと同じ扱い）。
// category はタブ追加メニュー上の階層で、"/" を掘るとサブメニューになる
const userPanels: PanelDefinition[] = [
	{
		id: "my-tool",
		title: "My Tool",
		category: "Tools/Debug",
		content: <Panel><Block label="My Tool"><Button>Run</Button></Block></Panel>,
	},
];

// panels で渡した定義がビルトインと同列に扱われることを固定する。
// 撮影されるのは右カラムに載せた My Tool タブだが、同じ定義から
// PC のタブ追加メニュー（各 pane ヘッダーの「+」）にも、SP のタブ一覧にも出る
export const UserPanel = fullscreen( userPanels, {
	...storyEditorData,
	panelLayout: {
		type: "split", id: "root", direction: "horizontal",
		children: [
			{ ratio: 0.2, node: { type: "pane", id: "left", tabs: [ "hierarchy", "scene" ], active: "hierarchy" } },
			{ ratio: 0.55, node: { type: "pane", id: "center", tabs: [ "viewport:main" ], active: "viewport:main" } },
			{ ratio: 0.25, node: { type: "pane", id: "right", tabs: [ "property", "my-tool" ], active: "my-tool" } },
		],
	},
} );
