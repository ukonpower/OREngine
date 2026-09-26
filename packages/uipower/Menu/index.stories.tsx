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

// 検索欄に入力すると、階層を無視して名前が一致する葉だけをグループ名つきで並べる。Enter で先頭を確定する
export const Search: Story = {
	args: {
		title: 'Add Entity',
		items: [
			{ label: 'Empty' },
			{ label: 'Built-in', children: [ { label: 'Light' }, { label: 'Camera' } ] },
			{ label: 'Camera', children: [ { label: 'LookAt' }, { label: 'OrbitControls' } ] },
			{ label: 'Samples', children: [ { label: 'Lines', children: [ { label: 'SpiralLine' } ] } ] },
		],
	},
	play: async ( { canvas, userEvent } ) => {

		await userEvent.type( canvas.getByPlaceholderText( 'Search' ), 'li' );

	},
};
