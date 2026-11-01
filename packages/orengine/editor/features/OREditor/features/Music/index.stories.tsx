import { withOREditor } from '@or-storybook/decorators/withOREditor';
import { musicDefault, musicEmpty } from '@or-storybook/fixtures/music';

import { Music } from '.';

import type { OREditorFixture } from '@or-storybook/decorators/withOREditor';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'OREditor/Music',
	component: Music,
} satisfies Meta<typeof Music>;

export default meta;

type Story = StoryObj<typeof meta>;

const PANEL_HEIGHT = '240px';

// Music パネルは高さを親から貰うので枠を与える。配列の先頭が内側
const pattern = ( fixture: OREditorFixture ): Story => ( {
	decorators: [
		( Story ) => <div style={{ height: PANEL_HEIGHT }}><Story /></div>,
		withOREditor( fixture ),
	],
} );

// 4トラック。Pad は 8〜16 拍で帯が重なり、下の帯の隠れた部分が上下に暗く見える。波形は合成音源
export const Default = pattern( musicDefault );

// シーンに Music が無いとき
export const Empty = pattern( musicEmpty );
