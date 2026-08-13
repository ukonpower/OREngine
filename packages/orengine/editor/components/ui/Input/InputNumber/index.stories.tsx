import { useState } from 'react';

import { withInputWindow } from '@or-storybook/decorators/withInputWindow';

import { InputNumber } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';

// value は呼び出し側が持つ制御コンポーネントなので、story 側で状態を持たせて操作できるようにする
const NumberSample = ( props: ComponentProps<typeof InputNumber> ) => {

	const [ value, setValue ] = useState( props.value );

	return <InputNumber {...props} value={value} onChange={setValue} />;

};

const meta = {
	title: 'ui/Input/InputNumber',
	component: InputNumber,
	args: { value: 1.234 },
	render: ( args ) => <NumberSample {...args} />,
	// 配列の先頭が内側。InputNumber は useInputWindow を通るので Provider で包む
	decorators: [
		( Story ) => <div style={{ width: '160px', padding: '10px' }}><Story /></div>,
		withInputWindow,
	],
} satisfies Meta<typeof InputNumber>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithRange: Story = {
	args: { value: 0.5, step: 0.1, min: 0, max: 1 },
};

export const Precision: Story = {
	args: { value: 3.14159265, precision: 5 },
};

export const ReadOnly: Story = {
	args: { value: 42, readOnly: true },
};

export const Disabled: Story = {
	args: { value: 42, disabled: true },
};
