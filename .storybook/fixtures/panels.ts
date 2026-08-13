import { storyEditorData, storyEmptyScene, storyScene } from './scene';

import type { OREditorFixture } from '../decorators/withOREditor';
import type { Editor } from 'orengine/editor';

// 選択は editor.selectEntity 経由で作る。selectedEntityId フィールドへの書き込みと
// ギズモ・ヘルパー側の更新がまとめて走るので、パネルが実際に見る状態と一致する。
// uuid は fixtures/scene のエンティティ定義と一致させること
const selectEntity = ( uuid: string ) => ( editor: Editor ) => {

	const entity = editor.engine.root.findEntityByUUID( uuid );

	if ( entity ) editor.selectEntity( entity );

};

export const panelEmptyScene: OREditorFixture = {
	scene: storyEmptyScene,
	editorData: storyEditorData,
};

// Resolution フィールドに既定値以外が入った状態
export const panelResolution720p: OREditorFixture = {
	scene: storyScene,
	editorData: {
		...storyEditorData,
		'resolution/width': 1280,
		'resolution/height': 720,
	},
};

export const panelCubeSelected: OREditorFixture = {
	scene: storyScene,
	editorData: storyEditorData,
	setup: selectEntity( 'sb-cube' ),
};

// Camera / CameraController を持つのでコンポーネント構成が Cube と変わる
export const panelCameraSelected: OREditorFixture = {
	scene: storyScene,
	editorData: storyEditorData,
	setup: selectEntity( 'sb-camera' ),
};
