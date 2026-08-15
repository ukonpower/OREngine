import { withOREditor } from '@or-storybook/decorators/withOREditor';
import { panelResolution720p } from '@or-storybook/fixtures/panels';
import { storyFixture } from '@or-storybook/fixtures/scene';

import { Panel } from '../../../../components/ui/Panel';

import { RendererSettings } from '.';

import type { OREditorFixture } from '@or-storybook/decorators/withOREditor';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'OREditor/RendererSettings',
	component: RendererSettings,
} satisfies Meta<typeof RendererSettings>;

export default meta;

type Story = StoryObj<typeof meta>;

// OREditor では幅300pxの右パネルに入るので、実寸に近い枠と Panel の余白を与える。配列の先頭が内側
const pattern = ( fixture: OREditorFixture ): Story => ( {
	decorators: [
		( Story ) => <div style={{ width: '300px', height: '400px' }}><Panel><Story /></Panel></div>,
		withOREditor( fixture ),
	],
} );

// Pipeline / Sky は headless レンダラーが該当フィールドを持たないため中身が空になる。
// バックエンドによって出る項目が変わることの記録としてそのまま撮る
export const Default = pattern( storyFixture );

export const Resolution720p = pattern( panelResolution720p );
