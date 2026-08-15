import { withOREditor } from '@or-storybook/decorators/withOREditor';
import { panelCameraSelected, panelCubeSelected } from '@or-storybook/fixtures/panels';
import { storyFixture } from '@or-storybook/fixtures/scene';

import { Panel } from '../../../../components/ui/Panel';

import { EntityProperty } from '.';

import type { OREditorFixture } from '@or-storybook/decorators/withOREditor';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'OREditor/EntityProperty',
	component: EntityProperty,
} satisfies Meta<typeof EntityProperty>;

export default meta;

type Story = StoryObj<typeof meta>;

// OREditor では幅300pxの右パネルに入るので、実寸に近い枠と Panel の余白を与える。配列の先頭が内側
const pattern = ( fixture: OREditorFixture ): Story => ( {
	decorators: [
		( Story ) => <div style={{ width: '300px', height: '520px' }}><Panel><Story /></Panel></div>,
		withOREditor( fixture ),
	],
} );

export const CubeSelected = pattern( panelCubeSelected );

export const CameraSelected = pattern( panelCameraSelected );

// 未選択のときは何も描かない（パネルが null を返す）ことの記録
export const NoSelection = pattern( storyFixture );
