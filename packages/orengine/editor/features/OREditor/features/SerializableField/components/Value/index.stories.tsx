import { ReactElement, useState } from 'react';

import { OREditorFixtureHost, withOREditor } from '@or-storybook/decorators/withOREditor';
import { storyFixture } from '@or-storybook/fixtures/scene';
import { Engine } from 'orengine';

import { Label } from '../../../../../../components/ui/Label';

import { Value } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { SerializableFieldFormat, SerializeFieldObjective } from 'maxpower';

// 値の型・format ごとに入力UIが変わるコンポーネントなので、
// args ではなく render 側でケースを組んで並べる
const meta: Meta = {
	title: 'OREditor/SerializableField/Value',
};

export default meta;

type Story = StoryObj;

const PANEL_WIDTH = '320px';

type ValueCaseProps = {
	label: string,
	initial: SerializeFieldObjective,
	format?: SerializableFieldFormat,
	readOnly?: boolean,
	disabled?: boolean,
	step?: number,
};

// Value は制御コンポーネントなので、書き戻し先の状態をストーリー側で持つ
const ValueCase = ( { label, initial, ...opt }: ValueCaseProps ) => {

	const [ value, setValue ] = useState<SerializeFieldObjective>( initial );

	return <Label title={label}>
		<Value value={value} {...opt} onChange={( v ) => {

			// 値そのものが関数になり得るので、useState の更新関数と解釈されないよう関数形式で渡す
			setValue( () => v );

		}} />
	</Label>;

};

// 関数フィールドはボタンとして描かれ、onChange ではなく値の呼び出しで効く
const FunctionCase = () => {

	const [ count, setCount ] = useState( 0 );

	return <Label title="rebuild">
		<Value value={() => setCount( ( v ) => v + 1 )} label={`Rebuild (${count})`} />
	</Label>;

};

// テクスチャの選択肢は実際に登録済みのリソースから引く
const textureList = () => Engine.resources.textureList.map( ( texture ) => texture.name );

const numberField = <ValueCase label="intensity" initial={1.5} step={0.1} />;
const textField = <ValueCase label="name" initial="OREngineCube" />;
const booleanField = <ValueCase label="visible" initial={true} />;
const vectorField = <ValueCase label="position" initial={[ 1, 2, 3 ]} format={{ type: 'vector' }} />;
const colorField = <ValueCase label="color" initial={[ 1, 0.4, 0.1 ]} format={{ type: 'color' }} />;
const selectField = <ValueCase label="focusMode" initial="target" format={{ type: 'select', list: [ 'auto', 'target', 'manual' ] }} />;
const entityRefField = <ValueCase label="lookAt" initial="sb-cube" format={{ type: 'entity' }} />;
const componentRefField = <ValueCase label="source" initial="sb-cube-body" format={{ type: 'component' }} />;
const resourceField = <ValueCase label="texture" initial="noise" format={{ type: 'resource', resourceType: 'texture', list: textureList }} />;
const readOnlyField = <ValueCase label="frame" initial={120} readOnly />;
const disabledField = <ValueCase label="tag" initial="locked" disabled />;
// 対応する入力UIが無い値は JSON 文字列に落ちる
const objectField = <ValueCase label="resolution" initial={{ width: 1920, height: 1080 }} />;
const functionField = <FunctionCase />;

// パネルは幅を親から貰うので枠を与える。配列の先頭が内側
const pattern = ( render: () => ReactElement ): Story => ( {
	render,
	decorators: [
		( Story ) => <div style={{ width: PANEL_WIDTH }}><Story /></div>,
		withOREditor( storyFixture ),
	],
} );

export const NumberField = pattern( () => numberField );

export const TextField = pattern( () => textField );

export const BooleanField = pattern( () => booleanField );

export const VectorField = pattern( () => vectorField );

export const ColorField = pattern( () => colorField );

export const SelectField = pattern( () => selectField );

export const EntityRefField = pattern( () => entityRefField );

export const ComponentRefField = pattern( () => componentRefField );

export const ResourceField = pattern( () => resourceField );

export const ReadOnlyField = pattern( () => readOnlyField );

export const DisabledField = pattern( () => disabledField );

export const ObjectField = pattern( () => objectField );

export const FunctionField = pattern( () => functionField );

const gridPatterns: { label: string, content: ReactElement }[] = [
	{ label: 'number', content: numberField },
	{ label: 'string', content: textField },
	{ label: 'boolean', content: booleanField },
	{ label: 'format: vector', content: vectorField },
	{ label: 'format: color', content: colorField },
	{ label: 'format: select', content: selectField },
	{ label: 'format: entity', content: entityRefField },
	{ label: 'format: component', content: componentRefField },
	{ label: 'format: resource', content: resourceField },
	{ label: 'readOnly', content: readOnlyField },
	{ label: 'disabled', content: disabledField },
	{ label: 'object（JSONフォールバック）', content: objectField },
	{ label: 'function（ボタン）', content: functionField },
];

// 参照系は engine を要るので host ごと1つに束ねる
export const AllTypes: Story = {
	render: () => (
		<OREditorFixtureHost fixture={storyFixture}>
			<div style={{ display: 'grid', gridTemplateColumns: `repeat(3, ${PANEL_WIDTH})`, gap: '16px', padding: '16px' }}>
				{gridPatterns.map( ( { label, content } ) => (
					<div key={label}>
						<div style={{ color: '#ccc', fontSize: '12px', marginBottom: '4px' }}>{label}</div>
						{content}
					</div>
				) )}
			</div>
		</OREditorFixtureHost>
	),
};
