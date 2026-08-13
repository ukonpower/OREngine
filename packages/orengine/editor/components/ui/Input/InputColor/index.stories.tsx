import { useState } from 'react';

import { InputColor } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';

// value は呼び出し側が持つ制御コンポーネントなので、story 側で状態を持たせて操作できるようにする
const ColorSample = ( props: ComponentProps<typeof InputColor> ) => {

	const [ value, setValue ] = useState( props.value );

	return <InputColor {...props} value={value} onChange={setValue} />;

};

const meta = {
	title: 'ui/Input/InputColor',
	component: InputColor,
	args: { value: [ 1, 1, 1 ] },
	render: ( args ) => <ColorSample {...args} />,
	decorators: [ ( Story ) => <div style={{ width: '160px', padding: '10px' }}><Story /></div> ],
} satisfies Meta<typeof InputColor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const White: Story = {};

// 値は 0..1 の RGB 配列
export const Orange: Story = {
	args: { value: [ 0.76, 0.29, 0 ] },
};

export const Undefined: Story = {
	args: { value: undefined },
};

export const Disabled: Story = {
	args: { value: [ 0.2, 0.5, 0.9 ], disabled: true },
};
