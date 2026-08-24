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
const fullscreen = ( customTabs?: EditorCustomTabs ): Story => ( {
	args: { editorData: storyEditorData, customTabs },
	decorators: [
		( Story ) => <div style={{ width: '100vw', height: '100vh' }}><Story /></div>,
		withOREngine( storyScene ),
	],
} );

export const Default = fullscreen();

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
