import { ListItem } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'ui/ListItem',
	component: ListItem,
	// 行は親の幅いっぱいに広がるので、一覧に置いたときの幅を与える
	decorators: [ ( Story ) => <div style={{ width: '220px', padding: '10px' }}><Story /></div> ],
} satisfies Meta<typeof ListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { children: 'OREngineCube' },
};

export const Selected: Story = {
	args: { selected: true, children: 'OREngineCube' },
};

// 中身の並べ方は利用側が決める。ここでは名前を伸ばして右端にバッジを置く
export const WithBadge: Story = {
	args: {
		selected: true,
		children: <>
			<span style={{ flex: 1, minWidth: 0 }}>main</span>
			<span style={{ color: 'var(--or-text-dim)', fontSize: 'var(--or-font-xs)' }}>opened</span>
		</>,
	},
};

export const List: Story = {
	render: () => <>
		<ListItem>main</ListItem>
		<ListItem selected>intro</ListItem>
		<ListItem>title</ListItem>
	</>,
};
