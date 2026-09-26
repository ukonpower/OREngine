import { Button } from '../Button';
import { pointAnchor } from '../hooks/useAnchoredPosition';

import { Modal } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'ui/Modal',
	component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const onClose = () => { /* storybook では閉じない */ };

const list = <div style={{ padding: '2px', borderRadius: '3px', background: 'var(--or-bg-base)' }}>
	{[ 'main', 'intro', 'title' ].map( ( name ) => <div key={name} style={{ height: 'var(--or-list-row-height)', padding: '0 8px' }}>{name}</div> )}
</div>;

export const Default: Story = {
	args: {
		title: 'Scenes',
		note: 'demo-webgl',
		width: 360,
		onClose,
		children: list,
		footer: <><Button>Delete</Button><Button>Open</Button></>,
	},
};

// 見出しを渡さないと見出し行ごと出ない（InputWindow の label 無しの呼び出し）
export const NoTitle: Story = {
	args: {
		onClose,
		children: <input style={{ width: '100%', textAlign: 'center' }} defaultValue="1.5" />,
		footer: <><Button>Cancel</Button><Button>OK</Button></>,
	},
};

// フッターが無いときは本体の下に余白が増えない
export const NoFooter: Story = {
	args: {
		title: 'Scenes',
		width: 360,
		onClose,
		children: list,
	},
};

// タイトルより長い補足は省略され、閉じるボタンの位置は変わらない
export const LongNote: Story = {
	args: {
		title: 'Scenes',
		note: 'very-long-project-name-that-does-not-fit-in-the-head-row',
		width: 360,
		onClose,
		children: list,
		footer: <Button>Open</Button>,
	},
};

// anchor を渡すと中央ではなくその右下に出る
export const Anchored: Story = {
	args: {
		title: 'Scenes',
		width: 360,
		onClose,
		anchor: pointAnchor( 200, 120 ),
		children: list,
		footer: <Button>Open</Button>,
	},
};

// 画面の右下寄りで開くと、はみ出す軸だけ反転して anchor の左上に出る
export const AnchoredNearEdge: Story = {
	render: ( args ) => <Modal {...args} anchor={pointAnchor( window.innerWidth - 100, window.innerHeight - 60 )} />,
	args: {
		title: 'Scenes',
		width: 360,
		onClose,
		children: list,
		footer: <Button>Open</Button>,
	},
};
