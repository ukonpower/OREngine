import { LayoutSplit } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'ui/LayoutSplit',
	component: LayoutSplit,
	// 分割の比率は親の大きさに対して決まるので枠を与える
	decorators: [ ( Story ) => <div style={{ width: '480px', height: '240px' }}><Story /></div> ],
} satisfies Meta<typeof LayoutSplit>;

export default meta;

type Story = StoryObj<typeof meta>;

const pane = ( label: string, color: string ) => (
	<div style={{ width: '100%', height: '100%', backgroundColor: color, color: '#ccc', padding: '8px' }}>{label}</div>
);

// 分割位置は storageKey があると localStorage から復元されるため、story では指定しない
export const Horizontal: Story = {
	render: () => (
		<LayoutSplit>
			<LayoutSplit.Item flex={1}>{pane( 'flex 1', '#181818' )}</LayoutSplit.Item>
			<LayoutSplit.Item flex={2}>{pane( 'flex 2', '#242424' )}</LayoutSplit.Item>
		</LayoutSplit>
	),
};

export const Vertical: Story = {
	render: () => (
		<LayoutSplit direction="vertical">
			<LayoutSplit.Item flex={2}>{pane( 'flex 2', '#181818' )}</LayoutSplit.Item>
			<LayoutSplit.Item flex={1}>{pane( 'flex 1', '#242424' )}</LayoutSplit.Item>
		</LayoutSplit>
	),
};

export const FixedSize: Story = {
	render: () => (
		<LayoutSplit>
			<LayoutSplit.Item size={120}>{pane( 'size 120px', '#181818' )}</LayoutSplit.Item>
			<LayoutSplit.Item>{pane( '残り', '#242424' )}</LayoutSplit.Item>
		</LayoutSplit>
	),
};

export const Nested: Story = {
	render: () => (
		<LayoutSplit>
			<LayoutSplit.Item size={140}>{pane( 'sidebar', '#181818' )}</LayoutSplit.Item>
			<LayoutSplit.Item>
				<LayoutSplit direction="vertical">
					<LayoutSplit.Item flex={2}>{pane( 'screen', '#242424' )}</LayoutSplit.Item>
					<LayoutSplit.Item flex={1}>{pane( 'timeline', '#2f2f2f' )}</LayoutSplit.Item>
				</LayoutSplit>
			</LayoutSplit.Item>
		</LayoutSplit>
	),
};
