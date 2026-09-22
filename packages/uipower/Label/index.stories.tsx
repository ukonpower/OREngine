import { Button } from '../Button';

import { Label } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'ui/Label',
	component: Label,
	decorators: [ ( Story ) => <div style={{ width: '240px', padding: '10px' }}><Story /></div> ],
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { title: 'name', children: <Button>select</Button> },
};

export const AlignRight: Story = {
	args: { title: 'x', labelAlign: 'right', children: <Button>select</Button> },
};

export const Vertical: Story = {
	args: { title: 'material', vertical: true, children: <Button>select</Button> },
};

export const LongTitle: Story = {
	args: { title: 'directionalLightShadowBias', children: <Button>select</Button> },
};
