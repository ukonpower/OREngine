import { useEffect } from 'react';

import { withPopover } from '@or-storybook/decorators/withPopover';

import { pointAnchor } from '../hooks/useAnchoredPosition';
import { usePopover } from '../hooks/usePopover';
import { Menu } from '../Menu';

import { Popover } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';

const meta = {
	title: 'ui/Popover',
	component: Popover,
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

// 開く位置。ビューポート幅・高さに対する割合で指定する
type OpenSpec = {
	elm: ReactNode;
	x: number;
	y: number;
};

// 層はデコレータがマウント済みなので、ストーリーは開く操作だけを持つ
const Opener = ( { specs }: { specs: OpenSpec[] } ) => {

	const { open } = usePopover();

	useEffect( () => {

		for ( const spec of specs ) {

			open( spec.elm, pointAnchor( spec.x * window.innerWidth, spec.y * window.innerHeight ) );

		}

	}, [ specs, open ] );

	return null;

};

const pattern = ( specs: OpenSpec[] ): Story => ( {
	render: () => <Opener specs={specs} />,
	decorators: [ withPopover ],
} );

// Hierarchy のノード右クリックで出るメニュー
const entityMenu = <Menu title="OREngineCube" items={[
	{ label: 'Add Entity' },
	{ label: 'Delete Entity' },
]} />;

export const Default = pattern( [ { elm: entityMenu, x: 0.25, y: 0.25 } ] );

// 一覧が max-height を超えてスクロールする状態
export const LongList = pattern( [ {
	elm: <Menu title="Components" items={
		[ 'Camera', 'LookAt', 'Light', 'PostProcess', 'Bloom', 'FXAA', 'SSR', 'Fog', 'Mesh', 'Skybox', 'YakiSoba', 'RotateAnimation' ]
			.map( ( label ) => ( { label } ) )
	} />,
	x: 0.25,
	y: 0.3,
} ] );

// 項目のクリックで次の要素を重ねた状態
export const Nested = pattern( [
	{ elm: entityMenu, x: 0.25, y: 0.25 },
	{ elm: <Menu title="Add Entity" items={[ { label: 'Empty' }, { label: 'Cube' } ]} />, x: 0.38, y: 0.33 },
] );

// 画面端で開くと、はみ出す軸だけ折り返して anchor の左・上に出る
export const Flip = pattern( [
	{ elm: <Menu title="right-bottom" items={[ { label: 'Add Entity' }, { label: 'Delete Entity' } ]} />, x: 0.25, y: 0.25 },
	{ elm: <Menu title="left-bottom" items={[ { label: 'Add Entity' }, { label: 'Delete Entity' } ]} />, x: 0.97, y: 0.25 },
	{ elm: <Menu title="right-top" items={[ { label: 'Add Entity' }, { label: 'Delete Entity' } ]} />, x: 0.25, y: 0.97 },
	{ elm: <Menu title="left-top" items={[ { label: 'Add Entity' }, { label: 'Delete Entity' } ]} />, x: 0.97, y: 0.97 },
] );
