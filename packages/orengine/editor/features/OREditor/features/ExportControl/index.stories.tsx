import { withOREditor } from '@or-storybook/decorators/withOREditor';
import { storyFixture } from '@or-storybook/fixtures/scene';

import { Panel } from '../../../../components/ui/Panel';

import { ExportControl } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'OREditor/ExportControl',
	component: ExportControl,
} satisfies Meta<typeof ExportControl>;

export default meta;

type Story = StoryObj<typeof meta>;

// OREditor では幅300pxの右パネルに入るので、実寸に近い枠と Panel の余白を与える。配列の先頭が内側
const decorators: Story['decorators'] = [
	( Story ) => <div style={{ width: '300px', height: '240px' }}><Panel><Story /></Panel></div>,
	withOREditor( storyFixture ),
];

// 書き出しは実行するとエンコードが走るので、storybook では待機状態だけを撮る
export const Default: Story = { decorators };
