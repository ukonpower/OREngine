import { useState } from 'react';

import { withOREditor } from '@or-storybook/decorators/withOREditor';
import { storyFixture } from '@or-storybook/fixtures/scene';

import { Label } from '../../../../../../components/ui/Label';

import { InputComponentRef } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

// 選択肢はシーン上の全コンポーネントから引かれるので、args ではなく実シーン付きの render で見せる
const meta: Meta = {
	title: 'OREditor/SerializableField/InputComponentRef',
};

export default meta;

type Story = StoryObj;

const PANEL_WIDTH = '320px';

// 選択結果が画面に残るよう、選んだ uuid をストーリー側で保持する
const ComponentRefCase = ( { initial }: { initial: string | null } ) => {

	const [ value, setValue ] = useState<string | null>( initial );

	return <Label title="source">
		<InputComponentRef value={value} onChange={setValue} />
	</Label>;

};

// パネルは幅を親から貰うので枠を与える。配列の先頭が内側
const pattern = ( render: () => JSX.Element ): Story => ( {
	render,
	decorators: [
		( Story ) => <div style={{ width: PANEL_WIDTH }}><Story /></div>,
		withOREditor( storyFixture ),
	],
} );

export const Unselected = pattern( () => <ComponentRefCase initial={null} /> );

export const Selected = pattern( () => <ComponentRefCase initial="sb-cube-body" /> );

// エンティティ名 > クラス名の表記を、同じエンティティに複数コンポーネントが載る例で見る
export const CameraControllerSelected = pattern( () => <ComponentRefCase initial="sb-camera-controller" /> );
