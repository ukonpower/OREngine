import { withOREditor } from '@or-storybook/decorators/withOREditor';
import { storyFixture } from '@or-storybook/fixtures/scene';

import { Panel } from '../../../../components/ui/Panel';

import { ProjectControl } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'OREditor/ProjectControl',
	component: ProjectControl,
} satisfies Meta<typeof ProjectControl>;

export default meta;

type Story = StoryObj<typeof meta>;

// OREditor では幅300pxの右パネルに入るので、実寸に近い枠と Panel の余白を与える。配列の先頭が内側
const decorators: Story['decorators'] = [
	( Story ) => <div style={{ width: '300px', height: '240px' }}><Panel><Story /></Panel></div>,
	withOREditor( storyFixture ),
];

// Save / Play / Export はサーバーAPIとプレイヤーのページに繋がるので storybook では動かない。
// 見た目の確認だけの1パターンとして置く
export const Default: Story = { decorators };
