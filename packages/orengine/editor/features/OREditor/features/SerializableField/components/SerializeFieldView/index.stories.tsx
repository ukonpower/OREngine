import { ReactElement, useEffect, useState } from 'react';

import { OREditorFixtureHost, withOREditor } from '@or-storybook/decorators/withOREditor';
import { storyFixture } from '@or-storybook/fixtures/scene';

import { useOREditor } from '../../../../hooks/useOREditor';

import { SerializeFieldView } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type * as MXP from 'maxpower';

// target には実物の Serializable（editor / engine / entity / component）が要り、
// args では渡せないので component は宣言せず render 側で組み立てる
const meta: Meta = {
	title: 'OREditor/SerializableField/SerializeFieldView',
};

export default meta;

type Story = StoryObj;

const PANEL_WIDTH = '320px';

// engine.load は外側の OREngineProvider の effect で走る。
// ハーネスは先にマウントされるので 'loaded' を購読してから対象を引き直す
const useSceneEntity = ( uuid: string ) => {

	const { engine } = useOREditor();

	const [ entity, setEntity ] = useState<MXP.Entity | null>( () => engine.root.findEntityByUUID( uuid ) || null );

	useEffect( () => {

		const resolve = () => setEntity( engine.root.findEntityByUUID( uuid ) || null );

		resolve();

		engine.on( 'loaded', resolve );

		return () => {

			engine.off( 'loaded', resolve );

		};

	}, [ engine, uuid ] );

	return entity;

};

const EditorFields = ( { filter }: { filter?: string } ) => {

	const { editor } = useOREditor();

	return <SerializeFieldView target={editor} filter={filter} />;

};

const EngineFields = ( { filter }: { filter?: string } ) => {

	const { engine } = useOREditor();

	return <SerializeFieldView target={engine} filter={filter} />;

};

const EntityFields = ( { uuid }: { uuid: string } ) => {

	const entity = useSceneEntity( uuid );

	if ( ! entity ) return null;

	return <SerializeFieldView target={entity} />;

};

const ComponentFields = ( { entityUUID, componentUUID }: { entityUUID: string, componentUUID: string } ) => {

	const entity = useSceneEntity( entityUUID );
	const component = entity && entity.getComponentByUUID( componentUUID );

	if ( ! component ) return null;

	return <SerializeFieldView target={component} />;

};

// パネルは幅を親から貰うので枠を与える。配列の先頭が内側
const pattern = ( render: () => ReactElement ): Story => ( {
	render,
	decorators: [
		( Story ) => <div style={{ width: PANEL_WIDTH }}><Story /></div>,
		withOREditor( storyFixture ),
	],
} );

// エディタ本体のフィールド一覧（真偽値・数値・フォルダ・配列が一通り出る）
export const EditorAll = pattern( () => <EditorFields /> );

export const EditorResolution = pattern( () => <EditorFields filter="resolution" /> );

export const EditorHelpers = pattern( () => <EditorFields filter="helpers" /> );

export const EngineTimeline = pattern( () => <EngineFields filter="timeline" /> );

// エンティティ: 名前 + position / euler / scale のベクトル入力
export const Entity = pattern( () => <EntityFields uuid="sb-cube" /> );

// Camera: 数値フィールドだけを持つコンポーネント
export const CameraComponent = pattern( () => <ComponentFields entityUUID="sb-camera" componentUUID="sb-camera-lens" /> );

// CameraController: フォルダ・エンティティ参照・select・数値が混ざる
export const CameraControllerComponent = pattern( () => <ComponentFields entityUUID="sb-camera" componentUUID="sb-camera-controller" /> );

const gridPatterns: { label: string, content: ReactElement }[] = [
	{ label: 'Editor（filter なし）', content: <EditorFields /> },
	{ label: 'Editor / resolution', content: <EditorFields filter="resolution" /> },
	{ label: 'Editor / helpers', content: <EditorFields filter="helpers" /> },
	{ label: 'Engine / timeline', content: <EngineFields filter="timeline" /> },
	{ label: 'Entity（sb-cube）', content: <EntityFields uuid="sb-cube" /> },
	{ label: 'Component（CameraController）', content: <ComponentFields entityUUID="sb-camera" componentUUID="sb-camera-controller" /> },
];

// 対象はすべて同じ Editor / Engine から引くので host は1つで足りる
export const AllPatterns: Story = {
	render: () => (
		<OREditorFixtureHost fixture={storyFixture}>
			<div style={{ display: 'grid', gridTemplateColumns: `repeat(3, ${PANEL_WIDTH})`, gap: '16px', padding: '16px' }}>
				{gridPatterns.map( ( { label, content } ) => (
					<div key={label}>
						<div style={{ color: '#ccc', fontSize: '12px', marginBottom: '4px' }}>{label}</div>
						{content}
					</div>
				) )}
			</div>
		</OREditorFixtureHost>
	),
};
