// エディタ中核の公開エントリ（orengine/editor エイリアス・package.json の ./editor export の参照先）

export { attachAgentBridge } from './AgentBridge';
export { Editor } from './Editor';
export { decodeCurve, deleteKeys, KEYFRAME_HANDLE_TYPES, moveHandle, moveKeys, pasteKeys, setHandleType, setInterpolation } from './KeyFrameCurve';
export { countCurveUsers, getKeyFrameState, getLinks, isKeyFrameField, keyFrameKindOf, keyFrameTime, snapKeyFrameTime } from './KeyFrameField';

export type { AgentSceneControl } from './AgentBridge/Command';
export type { EditorTimelineLoop, NavigateAssetRequest, SelectedAssetInfo, TimelineKeyActions } from './Editor';
export type { FieldEdit } from './EditorAPI';
export type { EditKey, KeyFrameHandleSide, KeyFrameHandleType } from './KeyFrameCurve';
export type { KeyFrameFieldRef, KeyFrameKind, KeyFrameState } from './KeyFrameField';
export type { SceneExporterOption, SceneExporterProgress } from './SceneExporter';
export type { Viewport } from './Viewport';
