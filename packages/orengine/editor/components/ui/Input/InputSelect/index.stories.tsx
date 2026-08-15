import { useState } from 'react';

import { InputSelect } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { SelectList } from 'maxpower';
import type { ComponentProps } from 'react';

// value は呼び出し側が持つ制御コンポーネントなので、story 側で状態を持たせて操作できるようにする
const SelectSample = ( props: ComponentProps<typeof InputSelect> ) => {

	const [ value, setValue ] = useState( props.value );

	return <InputSelect {...props} value={value} onChange={setValue} />;

};

const stringList: SelectList = [ 'nearest', 'linear', 'mipmap' ];

const labeledList: SelectList = [
	{ label: '不透明', value: 'opaque' },
	{ label: '半透明', value: 'transparent' },
	{ label: '加算', value: 'additive' },
];

const meta = {
	title: 'ui/Input/InputSelect',
	component: InputSelect,
	args: { value: 'linear', selectList: stringList },
	render: ( args ) => <SelectSample {...args} />,
	decorators: [ ( Story ) => <div style={{ width: '180px', padding: '10px' }}><Story /></div> ],
} satisfies Meta<typeof InputSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StringList: Story = {};

export const LabeledList: Story = {
	args: { value: 'transparent', selectList: labeledList },
};

// 選択肢を関数で渡す形式（開くたびに一覧を作り直す用途）
export const LazyList: Story = {
	args: { value: 'nearest', selectList: () => stringList },
};

// readOnly のときは select ではなく値を表示する input になる
export const ReadOnly: Story = {
	args: { readOnly: true },
};
