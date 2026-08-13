import { OREditorFixtureHost, withOREditor } from '@or-storybook/decorators/withOREditor';
import { timelineDefault, timelineLongDuration, timelineLoopRange, timelineMinimal, timelinePlaying, timelineSeeked, timelineWithMusic } from '@or-storybook/fixtures/timeline';

import { Timeline } from '.';

import type { OREditorFixture } from '@or-storybook/decorators/withOREditor';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'OREditor/Timeline',
	component: Timeline,
} satisfies Meta<typeof Timeline>;

export default meta;

type Story = StoryObj<typeof meta>;

const PANEL_HEIGHT = '160px';

// Timeline は高さを親から貰うので枠を与える。配列の先頭が内側
const pattern = ( fixture: OREditorFixture ): Story => ( {
	decorators: [
		( Story ) => <div style={{ height: PANEL_HEIGHT }}><Story /></div>,
		withOREditor( fixture ),
	],
} );

export const Default = pattern( timelineDefault );

export const Minimal = pattern( timelineMinimal );

export const LongDuration = pattern( timelineLongDuration );

export const Seeked = pattern( timelineSeeked );

export const LoopRange = pattern( timelineLoopRange );

export const WithMusic = pattern( timelineWithMusic );

// 再生ヘッドが動き続けて絵が止まらないので、スクリーンショット比較（tests/vrt）からは外す
export const Playing: Story = { ...pattern( timelinePlaying ), tags: [ 'no-vrt' ] };

// Timeline 1枚につき WebGL2 コンテキストを1個持つ（TimelineCanvasRenderer）ので、
// 並べる数はブラウザの同時コンテキスト数の上限に直結する。
// カーソルが動く Playing は静止画で比較できないため一覧には載せない
const gridPatterns: { label: string, fixture: OREditorFixture }[] = [
	{ label: 'Default（duration 600 / fps 60）', fixture: timelineDefault },
	{ label: 'Minimal（duration 60 / fps 30・表示物なし）', fixture: timelineMinimal },
	{ label: 'LongDuration（duration 7200）', fixture: timelineLongDuration },
	{ label: 'Seeked（current 300）', fixture: timelineSeeked },
	{ label: 'LoopRange（150 - 450）', fixture: timelineLoopRange },
	{ label: 'WithMusic（波形あり）', fixture: timelineWithMusic },
];

export const AllPatterns: Story = {
	render: () => (
		<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px', padding: '16px' }}>
			{gridPatterns.map( ( { label, fixture } ) => (
				<div key={label}>
					<div style={{ color: '#ccc', fontSize: '12px', marginBottom: '4px' }}>{label}</div>
					<div style={{ height: PANEL_HEIGHT }}>
						<OREditorFixtureHost fixture={fixture}>
							<Timeline />
						</OREditorFixtureHost>
					</div>
				</div>
			) )}
		</div>
	),
};
