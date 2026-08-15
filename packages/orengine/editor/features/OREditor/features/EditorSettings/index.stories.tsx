import { withOREditor } from '@or-storybook/decorators/withOREditor';
import { storyFixture } from '@or-storybook/fixtures/scene';

import { Panel } from '../../../../components/ui/Panel';

import { EditorSettings } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'OREditor/EditorSettings',
	component: EditorSettings,
} satisfies Meta<typeof EditorSettings>;

export default meta;

type Story = StoryObj<typeof meta>;

// OREditor では幅300pxの右パネルに入るので、実寸に近い枠と Panel の余白を与える。配列の先頭が内側
const decorators: Story['decorators'] = [
	( Story ) => <div style={{ width: '300px', height: '240px' }}><Panel><Story /></Panel></div>,
	withOREditor( storyFixture ),
];

// 設定値は localStorage に持つモジュール変数で、読み込みはプロセスに1回。
// story 側から初期値を差し替える口が無いので既定値の1パターンだけを置く
export const Default: Story = { decorators };
