import type { OREditorFixture } from '../decorators/withOREditor';
import type * as MXP from 'maxpower';
import type { OREngineDataEntity, OREngineProjectData } from 'orengine';

// エディタの描画ループがカメラを要求するので、どのシーンにも必ず入れる
const cameraEntity: OREngineDataEntity = {
	name: 'Camera',
	uuid: 'sb-camera',
	pos: [ 0, 2, 12 ],
	components: [
		{ name: 'Camera', uuid: 'sb-camera-lens' },
		{ name: 'CameraController', uuid: 'sb-camera-controller' },
	],
};

// ストーリー共通の最小シーン。demo-webgl から
// BLidgeClient（/scene.glb と websocket を取りに行く）と、
// webgl固有API（renderer.sky / renderer.backend）に触る SkyBox / YakiSoba を外し、
// headless レンダラーだけで完結するものを残している
export const storyScene: OREngineProjectData = {
	name: 'storybook',
	scene: {
		name: 'root',
		uuid: '0',
		childs: [
			cameraEntity,
			{
				name: 'OREngineCube',
				uuid: 'sb-cube',
				components: [
					{ name: 'OREngineCube', uuid: 'sb-cube-body' },
				],
			},
			{
				name: 'OREngineLogo',
				uuid: 'sb-logo',
				components: [
					{ name: 'OREngineLogo', uuid: 'sb-logo-body' },
				],
			},
		],
	},
	'timeline/duration': 600,
	'timeline/fps': 60,
};

// 表示物を持たないシーン
export const storyEmptyScene: OREngineProjectData = {
	...storyScene,
	scene: {
		name: 'root',
		uuid: '0',
		childs: [ cameraEntity ],
	},
};

// エディタ側の初期状態。保存先が無いので永続化に関わる値は持たせない
export const storyEditorData: MXP.SerializeField = {
	enableRender: true,
	resolutionScale: 0.5,
	'resolution/width': 1920,
	'resolution/height': 1080,
	viewType: 'render',
	'frameLoop/enabled': false,
	'frameLoop/start': 0,
	'frameLoop/end': 0,
	cameraMode: 'preview',
	gizmoMode: 'translate',
};

export const storyFixture: OREditorFixture = {
	scene: storyScene,
	editorData: storyEditorData,
};
