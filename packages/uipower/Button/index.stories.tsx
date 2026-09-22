import { Button } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'ui/Button',
	component: Button,
	// ボタンは親の幅いっぱいに広がるので、パネル内に置いたときの幅を与える
	decorators: [ ( Story ) => <div style={{ width: '200px', padding: '10px' }}><Story /></div> ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { children: 'Save' },
};

export const LongLabel: Story = {
	args: { children: 'Save the current scene to scene.json' },
};

export const Submit: Story = {
	args: { children: 'Submit', type: 'submit' },
};
