// エディタ中核の公開エントリ（orengine/editor エイリアス・package.json の ./editor export の参照先）

export { attachAgentBridge } from './AgentBridge';
export { Editor } from './Editor';
export { getCurveLinkInfo, getKeyFrameElementCount, getKeyFrameState, getSharedCurves, isKeyFrameField, keyFrameTime } from './KeyFrameField';

export type { AgentSceneControl } from './AgentBridge/Command';
export type { EditorTimelineLoop, NavigateAssetRequest, SelectedAssetInfo } from './Editor';
export type { FieldEdit } from './EditorAPI';
export type { CurveLinkInfo, CurveLinkSettings, CurvePasteMode, KeyFrameElementRef, KeyFrameFieldRef, KeyFrameState, SharedCurve } from './KeyFrameField';
export type { SceneExporterOption, SceneExporterProgress } from './SceneExporter';
export type { Viewport } from './Viewport';
