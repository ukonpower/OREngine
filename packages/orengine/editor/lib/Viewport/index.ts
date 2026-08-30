import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import { Engine } from '../../../core/Engine';
import { EditorCamera } from '../EditorCamera';
import { FrameDebugger } from '../FrameDebugger';
import { GizmoManager } from '../gizmo/GizmoManager';
import { HelperManager } from '../helper/HelperManager';
import { PointerHandler } from '../input/PointerHandler';

import type { EditorAPI } from '../EditorAPI';

export type ViewportParam = {
	id: string;
	engine: Engine;
	draw: MXP.EditorDrawContract;
	// 描画結果を出す表示先。ポインタ入力もこの要素で受ける
	canvas: HTMLCanvasElement;
	gizmoManager: GizmoManager;
	helperManager: HelperManager;
	api: EditorAPI;
	getSelectedEntityId: () => string | null;
	isEntitySelectable: ( entity: MXP.Entity ) => boolean;
	onSelectEntity: ( entity: MXP.Entity | null ) => void;
	isModalActive: () => boolean;
	onEscapeToEditorCamera: () => void;
	// ポインタが入ったとき。キーボード操作の対象ビューポートの切り替えに使う
	onActivate: () => void;
	onDispose: () => void;
};

// 1つの表示 canvas に紐づく編集視点。描画ビュー・エディタカメラ・ポインタ入力・フレームデバッガをまとめて持つ。
// 選択やギズモモードといった編集状態はエディタ全体で共有するのでここには置かない
export class Viewport {

	public readonly id: string;
	public readonly canvas: HTMLCanvasElement;
	public readonly view: MXP.RenderViewContract;
	public readonly editorCamera: EditorCamera;
	public readonly frameDebugger: FrameDebugger;

	private _pointerHandler: PointerHandler;
	private _onDispose: () => void;
	private _disposeListeners: () => void;
	private _disposed: boolean;

	constructor( param: ViewportParam ) {

		const { engine, canvas } = param;

		this.id = param.id;
		this.canvas = canvas;
		this.view = engine.createView( { offscreen: true } );
		this.editorCamera = new EditorCamera( engine, this.view, canvas );
		this.frameDebugger = new FrameDebugger( canvas, param.draw, this.view );

		this._pointerHandler = new PointerHandler( {
			engine,
			canvas,
			editorCamera: this.editorCamera,
			gizmoManager: param.gizmoManager,
			helperManager: param.helperManager,
			api: param.api,
			getSelectedEntityId: param.getSelectedEntityId,
			isEntitySelectable: param.isEntitySelectable,
			getGizmoMode: () => param.gizmoManager.mode,
			onSelectEntity: param.onSelectEntity,
			isModalActive: param.isModalActive,
			onEscapeToEditorCamera: param.onEscapeToEditorCamera,
		} );

		const onPointerEnter = () => param.onActivate();

		canvas.addEventListener( 'pointerenter', onPointerEnter );

		this._onDispose = param.onDispose;
		this._disposeListeners = () => canvas.removeEventListener( 'pointerenter', onPointerEnter );
		this._disposed = false;

	}

	public get gizmoDragging() {

		return this._pointerHandler.gizmoDragging;

	}

	public resize( resolution: MTP.Vector ) {

		this.editorCamera.resize( resolution );
		this.frameDebugger.resize( resolution );

	}

	// 表示先がアンマウントされたら呼ぶ。エディタ側の破棄と両方から呼ばれうるので二重実行は無視する
	public dispose() {

		if ( this._disposed ) return;

		this._disposed = true;

		// カメラ姿勢を書き戻すため、エディタカメラを壊す前に通知する
		this._onDispose();

		this._disposeListeners();
		this._pointerHandler.dispose();
		this.frameDebugger.dispose();
		this.editorCamera.dispose();
		this.view.dispose();

	}

}
