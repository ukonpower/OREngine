import { useEffect } from 'react';

import { withOREditor } from '@or-storybook/decorators/withOREditor';
import { storyFixture } from '@or-storybook/fixtures/scene';

import { Picker } from './components/Picker';
import { useMouseMenu } from './hooks/useMouseMenu';

import { MouseMenu } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';

const meta = {
	title: 'OREditor/MouseMenu',
	component: MouseMenu,
} satisfies Meta<typeof MouseMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

// 開く位置。メニューの寄せ方向は画面中心との位置関係で決まるので、
// ビューポート幅・高さに対する割合で指定する
type MenuSpec = {
	elm: ReactNode;
	x: number;
	y: number;
};

// 本体はデコレータが末尾にマウント済みなので、ストーリーは開く操作だけを持つ
const Opener = ( { specs }: { specs: MenuSpec[] } ) => {

	const { pushContent } = useMouseMenu();

	useEffect( () => {

		let index = 0;
		let frame = 0;

		// メニューは push した瞬間のポインタ位置に出るので、直前に座標付きの pointermove を投げる。
		// 購読は親 MouseMenuProvider の effect で張られる（React は子の effect を先に流す）ため
		// 1フレーム待つ必要があり、さらに pushContent は再描画を挟まないと直前の項目を取りこぼすので
		// 1枚ずつフレームを分ける
		const step = () => {

			const spec = specs[ index ++ ];

			if ( ! spec ) return;

			window.dispatchEvent( new PointerEvent( 'pointermove', {
				clientX: spec.x * window.innerWidth,
				clientY: spec.y * window.innerHeight,
			} ) );

			pushContent( spec.elm );

			frame = requestAnimationFrame( step );

		};

		frame = requestAnimationFrame( step );

		return () => cancelAnimationFrame( frame );

	}, [ specs, pushContent ] );

	return null;

};

const pattern = ( specs: MenuSpec[] ): Story => ( {
	render: () => <Opener specs={specs} />,
	decorators: [ withOREditor( storyFixture ) ],
} );

// Hierarchy のノード右クリックで出るメニュー
const entityMenu = <Picker label="OREngineCube" list={[
	{ label: 'Add Entity' },
	{ label: 'Delete Entity' },
]} />;

export const Default = pattern( [ { elm: entityMenu, x: 0.25, y: 0.25 } ] );

// 一覧が max-height を超えてスクロールする状態
export const LongList = pattern( [ {
	elm: <Picker label="Components" list={
		[ 'Camera', 'CameraController', 'Light', 'PostProcess', 'Bloom', 'FXAA', 'SSR', 'Fog', 'Mesh', 'Skybox', 'YakiSoba', 'RotateAnimation' ]
			.map( ( label ) => ( { label } ) )
	} />,
	x: 0.25,
	y: 0.3,
} ] );

// 項目のクリックで次のメニューを重ねた状態
export const Nested = pattern( [
	{ elm: entityMenu, x: 0.25, y: 0.25 },
	{ elm: <Picker label="Add Entity" list={[ { label: 'Empty' }, { label: 'Cube' } ]} />, x: 0.38, y: 0.33 },
] );

// 寄せ方向は画面を4分割したどこで開いたかで決まる
export const Directions = pattern( [
	{ elm: <Picker label="right-bottom" list={[ { label: 'Add Entity' }, { label: 'Delete Entity' } ]} />, x: 0.25, y: 0.25 },
	{ elm: <Picker label="left-bottom" list={[ { label: 'Add Entity' }, { label: 'Delete Entity' } ]} />, x: 0.75, y: 0.25 },
	{ elm: <Picker label="right-top" list={[ { label: 'Add Entity' }, { label: 'Delete Entity' } ]} />, x: 0.25, y: 0.75 },
	{ elm: <Picker label="left-top" list={[ { label: 'Add Entity' }, { label: 'Delete Entity' } ]} />, x: 0.75, y: 0.75 },
] );
