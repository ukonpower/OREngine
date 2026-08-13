import { useState } from 'react';

import { withInputWindow } from '@or-storybook/decorators/withInputWindow';

import { InputText } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';

// value は呼び出し側が持つ制御コンポーネントなので、story 側で状態を持たせて操作できるようにする
const TextSample = ( props: ComponentProps<typeof InputText> ) => {

	const [ value, setValue ] = useState( props.value );

	return <InputText {...props} value={value} onChange={setValue} />;

};

const meta = {
	title: 'ui/Input/InputText',
	component: InputText,
	args: { value: 'Entity' },
	render: ( args ) => <TextSample {...args} />,
	// 配列の先頭が内側。InputText は useInputWindow を通るので Provider で包む
	decorators: [
		( Story ) => <div style={{ width: '200px', padding: '10px' }}><Story /></div>,
		withInputWindow,
	],
} satisfies Meta<typeof InputText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
	args: { value: '' },
};

// readOnly のときはプレースホルダの "-" が出る
export const ReadOnly: Story = {
	args: { value: '', readOnly: true },
};

export const Disabled: Story = {
	args: { disabled: true },
};
