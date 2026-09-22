import { useState } from 'react';

import { InputBoolean } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';

// checked は呼び出し側が持つ制御コンポーネントなので、story 側で状態を持たせて操作できるようにする
const CheckBoxSample = ( props: ComponentProps<typeof InputBoolean> ) => {

	const [ checked, setChecked ] = useState( props.checked ?? false );

	return <InputBoolean {...props} checked={checked} onChange={setChecked} />;

};

const meta = {
	title: 'ui/Input/InputCheckBox',
	component: InputBoolean,
	args: { checked: true },
	render: ( args ) => <CheckBoxSample {...args} />,
	decorators: [ ( Story ) => <div style={{ padding: '10px' }}><Story /></div> ],
} satisfies Meta<typeof InputBoolean>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Checked: Story = {};

export const Unchecked: Story = {
	args: { checked: false },
};

export const ReadOnly: Story = {
	args: { readOnly: true },
};

export const Disabled: Story = {
	args: { disabled: true },
};
