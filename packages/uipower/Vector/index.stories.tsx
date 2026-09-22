import { useState } from 'react';

import { withInputWindow } from '@or-storybook/decorators/withInputWindow';

import { Vector } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';

// value は呼び出し側が持つ制御コンポーネントなので、story 側で状態を持たせて操作できるようにする
const VectorSample = ( props: ComponentProps<typeof Vector> ) => {

	const [ value, setValue ] = useState( props.value );

	return <Vector {...props} value={value} onChange={setValue} />;

};

const meta = {
	title: 'ui/Vector',
	component: Vector,
	args: { value: [ 0, 1.5, - 2 ] },
	render: ( args ) => <VectorSample {...args} />,
	// 配列の先頭が内側。軸ごとの InputNumber が useInputWindow を通るので Provider で包む
	decorators: [
		( Story ) => <div style={{ width: '200px', padding: '10px' }}><Story /></div>,
		withInputWindow,
	],
} satisfies Meta<typeof Vector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Vec3: Story = {};

export const Vec4: Story = {
	args: { value: [ 0, 0, 0, 1 ] },
};

export const Vec2: Story = {
	args: { value: [ 1920, 1080 ], step: 10 },
};

export const Disabled: Story = {
	args: { disabled: true },
};
