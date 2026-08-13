import { useState } from 'react';

import { OREditorFixtureHost, withOREditor } from '@or-storybook/decorators/withOREditor';
import { storyFixture } from '@or-storybook/fixtures/scene';

import { Label } from '../../../../../../components/ui/Label';

import { ValueArray } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { SerializableFieldFormat, SerializeFieldObjective } from 'maxpower';

// 要素の型ごとに Value の描き分けが変わるので、args ではなく render 側でケースを組む
const meta: Meta = {
	title: 'OREditor/SerializableField/ValueArray',
};

export default meta;

type Story = StoryObj;

const PANEL_WIDTH = '320px';

type ValueArrayCaseProps = {
	label: string,
	initial: SerializeFieldObjective[],
	format?: SerializableFieldFormat,
	step?: number,
	readOnly?: boolean,
};

// 配列そのものを差し替える onChange なので、状態はストーリー側で持つ
const ValueArrayCase = ( { label, initial, ...opt }: ValueArrayCaseProps ) => {

	const [ value, setValue ] = useState<SerializeFieldObjective[]>( initial );

	return <Label title={label} vertical>
		<ValueArray value={value} {...opt} onChange={setValue} />
	</Label>;

};

const numbers = <ValueArrayCase label="weights" initial={[ 0.25, 0.5, 1 ]} step={0.05} />;
const strings = <ValueArrayCase label="phase" initial={[ 'shadowMap', 'deferred' ]} />;
const booleans = <ValueArrayCase label="axisLock" initial={[ true, false, false ]} />;
// format.array の labels は添字の後ろに付く見出しを返す
const labeled = <ValueArrayCase label="keyframes" initial={[ 0, 30, 60 ]} format={{ type: 'array', labels: ( value ) => `frame ${value}` }} />;
const empty = <ValueArrayCase label="targets" initial={[]} />;

// パネルは幅を親から貰うので枠を与える。配列の先頭が内側
const pattern = ( render: () => JSX.Element ): Story => ( {
	render,
	decorators: [
		( Story ) => <div style={{ width: PANEL_WIDTH }}><Story /></div>,
		withOREditor( storyFixture ),
	],
} );

export const Numbers = pattern( () => numbers );

export const Strings = pattern( () => strings );

export const Booleans = pattern( () => booleans );

export const Labeled = pattern( () => labeled );

export const Empty = pattern( () => empty );

const gridPatterns: { label: string, content: JSX.Element }[] = [
	{ label: 'number[]', content: numbers },
	{ label: 'string[]', content: strings },
	{ label: 'boolean[]', content: booleans },
	{ label: 'format: array（labels あり）', content: labeled },
	{ label: '空配列', content: empty },
];

export const AllPatterns: Story = {
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
