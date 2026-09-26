import { Panel } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'ui/Panel',
	component: Panel,
	// Panel は大きさを親から貰うので枠を与える
	decorators: [ ( Story ) => <div style={{ width: '260px', height: '160px' }}><Story /></div> ],
} satisfies Meta<typeof Panel>;

export default meta;

type Story = StoryObj<typeof meta>;

const content = <>
	<div>Entity</div>
	<div style={{ color: '#777' }}>position</div>
	<div style={{ color: '#777' }}>rotation</div>
</>;

export const Default: Story = {
	args: { children: content },
};

export const NoPadding: Story = {
	args: { noPadding: true, children: content },
};

export const Scrollable: Story = {
	args: {
		children: Array.from( { length: 40 }, ( _, i ) => <div key={i} style={{ color: '#777' }}>row {i}</div> ),
	},
};
