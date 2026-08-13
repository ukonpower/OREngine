import { useState } from 'react';

import { withOREditor } from '@or-storybook/decorators/withOREditor';
import { storyEditorData, storyEmptyScene, storyFixture } from '@or-storybook/fixtures/scene';

import { Label } from '../../../../../../components/ui/Label';

import { InputEntityRef } from '.';

import type { OREditorFixture } from '@or-storybook/decorators/withOREditor';
import type { Meta, StoryObj } from '@storybook/react-vite';

// 選択肢はシーンから引かれるので、args ではなく実シーン付きの render で見せる
const meta: Meta = {
	title: 'OREditor/SerializableField/InputEntityRef',
};

export default meta;

type Story = StoryObj;

const PANEL_WIDTH = '320px';

// 選択結果が画面に残るよう、選んだ uuid をストーリー側で保持する
const EntityRefCase = ( { initial }: { initial: string | null } ) => {

	const [ value, setValue ] = useState<string | null>( initial );

	return <Label title="target">
		<InputEntityRef value={value} onChange={setValue} />
	</Label>;

};

// パネルは幅を親から貰うので枠を与える。配列の先頭が内側
const pattern = ( fixture: OREditorFixture, render: () => JSX.Element ): Story => ( {
	render,
	decorators: [
		( Story ) => <div style={{ width: PANEL_WIDTH }}><Story /></div>,
		withOREditor( fixture ),
	],
} );

export const Unselected = pattern( storyFixture, () => <EntityRefCase initial={null} /> );

export const Selected = pattern( storyFixture, () => <EntityRefCase initial="sb-cube" /> );

export const CameraSelected = pattern( storyFixture, () => <EntityRefCase initial="sb-camera" /> );

// 表示物を持たないシーン。選択肢がカメラだけに絞られる
export const EmptyScene = pattern( { scene: storyEmptyScene, editorData: storyEditorData }, () => <EntityRefCase initial={null} /> );
