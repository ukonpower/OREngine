import { ReactElement, useState } from 'react';

import { withOREditor } from '@or-storybook/decorators/withOREditor';
import { storyFixture } from '@or-storybook/fixtures/scene';
import { Engine } from 'orengine';

import { Label } from '../../../../../../components/ui/Label';

import { InputResourceSelect } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

// 編集ボタンが editor へ navigateAsset を書きに行くので、args ではなく実 editor 配下の render で見せる
const meta: Meta = {
	title: 'OREditor/SerializableField/InputResourceSelect',
};

export default meta;

type Story = StoryObj;

const PANEL_WIDTH = '320px';

// 選択肢はプロジェクトに登録済みのテクスチャ（demo-webgl の .tex）から引く
const textureList = () => [ '', ...Engine.resources.textureList.map( ( texture ) => texture.name ) ];

const ResourceCase = ( { initial }: { initial: string } ) => {

	const [ value, setValue ] = useState( initial );

	return <Label title="texture">
		<InputResourceSelect value={value} selectList={textureList} resourceType="texture" onChange={setValue} />
	</Label>;

};

// パネルは幅を親から貰うので枠を与える。配列の先頭が内側
const pattern = ( render: () => ReactElement ): Story => ( {
	render,
	decorators: [
		( Story ) => <div style={{ width: PANEL_WIDTH }}><Story /></div>,
		withOREditor( storyFixture ),
	],
} );

export const Selected = pattern( () => <ResourceCase initial="noise" /> );

// 値が空のときは編集ボタンが出ない
export const Unselected = pattern( () => <ResourceCase initial="" /> );
