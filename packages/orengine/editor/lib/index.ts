// エディタ中核の公開エントリ（orengine/editor エイリアス・package.json の ./editor export の参照先）

export { attachAgentBridge } from './AgentBridge';
export { Editor } from './Editor';
export { applyHandleOffsets, decodeCurve, deleteKeys, distributeKeys, KEYFRAME_HANDLE_TYPES, pasteKeys, readHandleOffsets, setHandleType, setInterpolation, straightenKeys, transformKeys } from './KeyFrameCurve';
export { countCurveUses, getCurveLinkInfo, getKeyFrameElementCount, getKeyFrameState, getLinks, getSharedCurves, isKeyFrameField, keyFrameKindOf, keyFrameTime, snapKeyFrameTime } from './KeyFrameField';
export { BoxSelectWait, boxSelection, isAllSelected, pressSelection } from './PointSelection';
export { PointTransformModal } from './PointTransformModal';

export type { AgentSceneControl } from './AgentBridge/Command';
export type { EditAreaActions, EditModal, EditorTimelineLoop, NavigateAssetRequest, SelectedAssetInfo } from './Editor';
export type { FieldEdit } from './EditorAPI';
export type { EditKey, KeyFrameHandleRef, KeyFrameHandleSide, KeyFrameHandleType, KeyHandleOffsets, KeyTransform } from './KeyFrameCurve';
export type { CurveLinkInfo, CurveLinkSettings, CurvePasteMode, KeyFrameElementRef, KeyFrameFieldRef, KeyFrameKind, KeyFrameState, SharedCurve } from './KeyFrameField';
export type { ModalTransformMode } from './ModalTransformHandler';
export type { PointSelection, PressSelectionResult } from './PointSelection';
export type { PointScreenMapping, PointTransform, PointTransformAxes } from './PointTransformModal';
export type { SceneExporterOption, SceneExporterProgress } from './SceneExporter';
export type { Viewport } from './Viewport';
