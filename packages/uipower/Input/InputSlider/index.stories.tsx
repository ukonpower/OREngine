import { useState } from 'react';

import { InputSlider } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';

// value は呼び出し側が持つ制御コンポーネントなので、story 側で状態を持たせて操作できるようにする
const SliderSample = ( props: ComponentProps<typeof InputSlider> ) => {

	const [ value, setValue ] = useState( props.value );

	return <InputSlider {...props} value={value} onChange={setValue} />;

};

const meta = {
	title: 'ui/Input/InputSlider',
	component: InputSlider,
	args: { value: 0.5, min: 0, max: 1, step: 0.01 },
	render: ( args ) => <SliderSample {...args} />,
	decorators: [ ( Story ) => <div style={{ width: '160px', padding: '10px' }}><Story /></div> ],
} satisfies Meta<typeof InputSlider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// パンのように真ん中が基準の値。0 から左右へ塗る
export const Origin: Story = {
	args: { value: - 0.4, min: - 1, max: 1, step: 0.01, origin: 0, defaultValue: 0 },
};

export const Disabled: Story = {
	args: { disabled: true },
};
