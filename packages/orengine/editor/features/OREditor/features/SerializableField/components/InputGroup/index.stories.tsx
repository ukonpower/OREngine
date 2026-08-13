import { useState } from 'react';

import { withOREditor } from '@or-storybook/decorators/withOREditor';
import { storyFixture } from '@or-storybook/fixtures/scene';

import { InputGroup } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type * as MXP from 'maxpower';

// 数値入力が InputWindow を要るので、単体でも editor 配下の Provider 階層で立てる
const meta: Meta = {
	title: 'OREditor/SerializableField/InputGroup',
};

export default meta;

type Story = StoryObj;

const PANEL_WIDTH = '320px';

type InputValues = { [key: string]: MXP.SerializeFieldObjective };

// OK で何が返るかを見えるようにする（本来は呼び出し元がモーダルを閉じて値を使う）
const InputGroupCase = ( { title, initialValues }: { title?: string, initialValues: InputValues } ) => {

	const [ submitted, setSubmitted ] = useState<string | null>( null );

	return <div>
		<InputGroup title={title} initialValues={initialValues} onSubmit={( values ) => {

			setSubmitted( JSON.stringify( values ) );

		}} />
		{submitted && <div style={{ color: '#ccc', fontSize: '12px', padding: '8px' }}>submitted: {submitted}</div>}
	</div>;

};

// パネルは幅を親から貰うので枠を与える。配列の先頭が内側
const pattern = ( render: () => JSX.Element ): Story => ( {
	render,
	decorators: [
		( Story ) => <div style={{ width: PANEL_WIDTH }}><Story /></div>,
		withOREditor( storyFixture ),
	],
} );

export const SingleField = pattern( () => <InputGroupCase title="New Entity" initialValues={{ name: 'Entity' }} /> );

export const MixedFields = pattern( () => <InputGroupCase title="Add Object" initialValues={{ name: 'Cube', count: 3, visible: true }} /> );

export const NoTitle = pattern( () => <InputGroupCase initialValues={{ name: 'Untitled' }} /> );
