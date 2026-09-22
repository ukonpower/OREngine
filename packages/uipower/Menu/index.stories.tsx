import { Menu } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'ui/Menu',
	component: Menu,
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'OREngineCube',
		items: [
			{ label: 'Add Entity' },
			{ label: 'Delete Entity' },
		],
	},
};

// 枝は右端に印が付く。サブメニューは hover で開く
export const Branches: Story = {
	args: {
		items: [
			{ label: 'General', children: [ { label: 'Hierarchy' }, { label: 'Property' } ] },
			{ label: 'Rendering', children: [ { label: 'Timer' }, { label: 'Textures' } ] },
			{ label: 'Timeline' },
		],
	},
};
