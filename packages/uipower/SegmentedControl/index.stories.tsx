import { useState } from 'react';

import { SegmentedControl } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'ui/SegmentedControl',
	component: SegmentedControl,
	// 親いっぱいに伸びるので、タイムラインの帯（チャンネル一覧の幅・行の高さ）に置いたときの枠を与える
	decorators: [ ( Story ) => <div style={{ width: '180px', height: 'var(--or-list-row-height)', margin: '10px' }}><Story /></div> ],
} satisfies Meta<typeof SegmentedControl>;

export default meta;

type Story = StoryObj<typeof meta>;

// 選んだ値を持つのは親なので、ストーリーでも state で持って切り替えられるようにする
const Stateful = () => {

	const [ value, setValue ] = useState<"keys" | "curves">( "keys" );

	return <SegmentedControl
		options={[ { value: "keys", label: "Keys" }, { value: "curves", label: "Curves" } ]}
		value={value}
		onChange={setValue}
	/>;

};

export const Default: Story = {
	args: { options: [], value: "", onChange: () => {} },
	render: () => <Stateful />,
};
