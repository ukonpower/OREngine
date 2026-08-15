import { withOREditor } from '@or-storybook/decorators/withOREditor';
import { panelCubeSelected, panelEmptyScene } from '@or-storybook/fixtures/panels';
import { storyFixture } from '@or-storybook/fixtures/scene';

import { Panel } from '../../../../components/ui/Panel';

import { Hierarchy } from '.';

import type { OREditorFixture } from '@or-storybook/decorators/withOREditor';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'OREditor/Hierarchy',
	component: Hierarchy,
} satisfies Meta<typeof Hierarchy>;

export default meta;

type Story = StoryObj<typeof meta>;

// Hierarchy 側の localStorage キーと一致させる値
const OPEN_NODES_STORAGE_KEY = 'hierarchyOpenNodes';

// ルートエンティティの uuid（fixtures/scene のシーン定義と一致させる値）
const ROOT_UUID = '0';

// 開閉状態は localStorage に残るので、ブラウザで畳んだ状態が次の表示に混ざる。
// story ごとに開いているノードを固定して、見え方を毎回同じにする
const openNodes = ( uuids: string[] ) => () => {

	localStorage.setItem( OPEN_NODES_STORAGE_KEY, JSON.stringify( uuids ) );

};

// OREditor では幅300pxの左パネルに入るので、実寸に近い枠と Panel の余白を与える。配列の先頭が内側
const pattern = ( fixture: OREditorFixture, open: string[] ): Story => ( {
	beforeEach: openNodes( open ),
	decorators: [
		( Story ) => <div style={{ width: '300px', height: '400px' }}><Panel><Story /></Panel></div>,
		withOREditor( fixture ),
	],
} );

export const Default = pattern( storyFixture, [ ROOT_UUID ] );

// ルートを畳んだ状態。子はすべて隠れる
export const Collapsed = pattern( storyFixture, [] );

// 選択されたエンティティの先祖はパネル側が自動で開くので、開閉の指定は空でよい
export const EntitySelected = pattern( panelCubeSelected, [] );

export const EmptyScene = pattern( panelEmptyScene, [ ROOT_UUID ] );
