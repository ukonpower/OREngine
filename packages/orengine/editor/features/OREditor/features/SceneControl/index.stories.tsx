import { withOREditor } from '@or-storybook/decorators/withOREditor';
import { storyFixture } from '@or-storybook/fixtures/scene';
import { Panel } from 'uipower';

import { SceneControl } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'OREditor/SceneControl',
	component: SceneControl,
} satisfies Meta<typeof SceneControl>;

export default meta;

type Story = StoryObj<typeof meta>;

// OREditor では幅300pxの右パネルに入るので、実寸に近い枠と Panel の余白を与える。配列の先頭が内側
const decorators = ( fixture: Parameters<typeof withOREditor>[0] ): Story['decorators'] => [
	( Story ) => <div style={{ width: '300px', height: '240px' }}><Panel><Story /></Panel></div>,
	withOREditor( fixture ),
];

const scenes = {
	names: [ 'main', 'test' ],
	current: 'main',
	onSelect: async () => { /* storybook では切り替えない */ },
	onCreate: async () => { /* storybook では作らない */ },
	onDelete: async () => { /* storybook では消さない */ },
};

export const Default: Story = { decorators: decorators( { ...storyFixture, scenes } ) };

// シーン一覧の窓口が無いページ（静的版）での見え方
export const NoSceneSelection: Story = { decorators: decorators( storyFixture ) };
