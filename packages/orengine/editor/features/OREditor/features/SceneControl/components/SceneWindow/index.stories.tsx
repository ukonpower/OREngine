import { SceneWindow } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'OREditor/SceneWindow',
	component: SceneWindow,
} satisfies Meta<typeof SceneWindow>;

export default meta;

type Story = StoryObj<typeof meta>;

// ウィンドウは props だけで動くので、エディタの Provider を立てずに撮れる
const scenes = {
	names: [ 'main', 'intro', 'title', 'test' ],
	current: 'main',
	onSelect: async () => { /* storybook では切り替えない */ },
	onCreate: async () => { /* storybook では作らない */ },
	onDelete: async () => { /* storybook では消さない */ },
};

export const Default: Story = {
	args: {
		scenes,
		projectName: 'demo-webgl',
		onClose: () => { /* storybook では閉じない */ },
	},
};
