import { useEffect } from 'react';

import { withOREditor } from '@or-storybook/decorators/withOREditor';
import { storyFixture } from '@or-storybook/fixtures/scene';

import { useInputWindow } from '../../../../hooks/useInputWindow';

import { InputWindow } from '.';

import type { InputWindowConfig } from '../../../../contexts/InputWindowContext';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'OREditor/InputWindow',
	component: InputWindow,
} satisfies Meta<typeof InputWindow>;

export default meta;

type Story = StoryObj<typeof meta>;

// 値の反映先が無いので受け取るだけにする
const onChange = () => undefined;

// 本体はデコレータが末尾にマウント済みなので、ストーリーは開く操作だけを持つ。
// 画面中央への配置は CSS が決めるので座標は要らない
const Opener = ( { config }: { config: InputWindowConfig } ) => {

	const { open } = useInputWindow();

	useEffect( () => {

		open( config );

	}, [ open, config ] );

	return null;

};

const pattern = ( config: InputWindowConfig ): Story => ( {
	render: () => <Opener config={config} />,
	decorators: [ withOREditor( storyFixture ) ],
} );

export const NumberValue = pattern( {
	type: 'number',
	value: 1.5,
	label: 'Position X',
	step: 0.1,
	onChange,
} );

export const TextValue = pattern( {
	type: 'text',
	value: 'OREngineCube',
	label: 'Entity Name',
	onChange,
} );

// InputNumber からの呼び出しは label を渡さない
export const NoLabel = pattern( {
	type: 'number',
	value: 0,
	onChange,
} );
