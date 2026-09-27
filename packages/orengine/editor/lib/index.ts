// エディタ中核の公開エントリ（orengine/editor エイリアス・package.json の ./editor export の参照先）

export { attachAgentBridge } from './AgentBridge';
export { Editor } from './Editor';
export { decodeCurve, deleteKeys, KEYFRAME_HANDLE_TYPES, pasteKeys, setHandleType, setInterpolation, transformKeys } from './KeyFrameCurve';
export { countCurveUses, getCurveLinkInfo, getKeyFrameElementCount, getKeyFrameState, getLinks, getSharedCurves, isKeyFrameField, keyFrameKindOf, keyFrameTime, snapKeyFrameTime } from './KeyFrameField';

export type { AgentSceneControl } from './AgentBridge/Command';
export type { EditorTimelineLoop, NavigateAssetRequest, SelectedAssetInfo, TimelineKeyActions, TimelineModal } from './Editor';
export type { FieldEdit } from './EditorAPI';
export type { EditKey, KeyFrameHandleRef, KeyFrameHandleSide, KeyFrameHandleType, KeyTransform } from './KeyFrameCurve';
export type { CurveLinkInfo, CurveLinkSettings, CurvePasteMode, KeyFrameElementRef, KeyFrameFieldRef, KeyFrameKind, KeyFrameState, SharedCurve } from './KeyFrameField';
export type { ModalTransformMode } from './ModalTransformHandler';
export type { SceneExporterOption, SceneExporterProgress } from './SceneExporter';
export type { Viewport } from './Viewport';
