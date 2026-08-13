import { Block } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'ui/Block',
	component: Block,
	decorators: [ ( Story ) => <div style={{ width: '260px', padding: '10px' }}><Story /></div> ],
} satisfies Meta<typeof Block>;

export default meta;

type Story = StoryObj<typeof meta>;

const content = <div style={{ color: '#777', padding: '5px' }}>position / rotation / scale</div>;

export const Default: Story = {
	args: { label: 'Transform', children: content },
};

export const Accordion: Story = {
	args: { label: 'Transform', accordion: true, children: content },
};

export const AccordionClosed: Story = {
	args: { label: 'Transform', accordion: true, defaultClose: true, children: content },
};

export const WithBackground: Story = {
	args: { label: 'Transform', bg: true, children: content },
};

export const Nested: Story = {
	args: {
		label: 'Entity',
		accordion: true,
		bg: true,
		children: <>
			<Block label="Transform" accordion={true}>{content}</Block>
			<Block label="Material" accordion={true} defaultClose={true}>{content}</Block>
		</>,
	},
};
