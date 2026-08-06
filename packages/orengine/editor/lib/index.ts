import { createEditorDraw } from '@or-renderer';
import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Engine } from '../../core/Engine';

import { AssetPreviewManager } from './AssetPreviewManager';
import { EditorAPI } from './EditorAPI';
import { EditorCamera } from './EditorCamera';
import { FrameDebugger } from './FrameDebugger';
import { GizmoMode } from './gizmo/Gizmo';
import { GizmoManager } from './gizmo/GizmoManager';
import { HelperManager } from './helper/HelperManager';
import { KeyboardHandler } from './input/KeyboardHandler';
import { ModalTransformHandler } from './input/ModalTransformHandler';
import { PointerHandler } from './input/PointerHandler';
import { GridRenderer } from './render/GridRenderer';
import { SelectionOutline } from './render/SelectionOutline';
import { WireframeRenderer } from './render/WireframeRenderer';
import { SceneExporter, SceneExporterProgress } from './SceneExporter';

import type { TransformOrientation } from './transform/TransformUtils';

export type { SceneExporterOption, SceneExporterProgress } from './SceneExporter';

export type SelectedAssetInfo = {
	name: string;
	assetType: "component" | "material" | "shader" | "texture";
	path?: string;
} | null;

export type NavigateAssetRequest = {
	assetType: "material" | "texture" | "shader" | "component";
	name: string;
} | null;

export type EditorTimelineLoop = {
	enabled: boolean,
	start: number,
	end: number,
}

export class Editor extends MXP.Serializable {

	private _engine: Engine;
	private _selectedEntityId: string | null;
	private _selectedAsset: SelectedAssetInfo;
	private _navigateAsset: NavigateAssetRequest;
	private _propertyTarget: "entity" | "asset";
	private _audioBuffer: AudioBuffer | null;
	private _frameLoop: EditorTimelineLoop;
	private _resolutionScale: number;
	private _baseResolution: GLP.Vector;
	private _viewType: "render" | "debug";
	private _frameDebugger: FrameDebugger;
	private _assetPreviewManager: AssetPreviewManager;
	private _externalWindow: Window | null;
	private _externalCanvasBitmapContext: ImageBitmapRenderingContext | null;
	private _modalStatus: string | null;

	private _disposed: boolean;
	private _api: EditorAPI;
	private _draw: MXP.EditorDrawContract;

	private _editorCamera: EditorCamera;
	private _gizmoManager: GizmoManager;
	private _helperManager: HelperManager;
	private _gridRenderer: GridRenderer;
	private _wireframeRenderer: WireframeRenderer;
	private _selectionOutline: SelectionOutline;
	private _pointerHandler: PointerHandler;
	private _keyboardHandler: KeyboardHandler;
	private _modalTransformHandler: ModalTransformHandler;

	private _sceneExporter: SceneExporter;
	private _isExporting: boolean;
	private _exportProgress: SceneExporterProgress | null;

	constructor( engine: Engine ) {

		super();

		this._engine = engine;
		this._viewType = "render";
		this._selectedEntityId = null;
		this._selectedAsset = null;
		this._navigateAsset = null;
		this._propertyTarget = "entity";
		this._resolutionScale = 1.0;
		this._baseResolution = new GLP.Vector( 1920, 1080 );
		this._externalWindow = null;
		this._externalCanvasBitmapContext = null;
		this._modalStatus = null;
		this._disposed = false;
		this._api = new EditorAPI( this );
		this._draw = createEditorDraw( engine );
		this._assetPreviewManager = new AssetPreviewManager( this._draw );
		this._sceneExporter = new SceneExporter( engine );
		this._isExporting = false;
		this._exportProgress = null;

		/*-------------------------------
			Modules
		-------------------------------*/

		this._editorCamera = new EditorCamera( engine );
		this._gizmoManager = new GizmoManager( engine, this._draw );
		this._helperManager = new HelperManager( engine, this._draw );
		this._gridRenderer = new GridRenderer( engine, this._draw );
		this._wireframeRenderer = new WireframeRenderer( this._draw );
		this._selectionOutline = new SelectionOutline( this._draw );

		this._pointerHandler = new PointerHandler(
			engine,
			this._editorCamera,
			this._gizmoManager,
			this._helperManager,
			this._api,
			() => this._selectedEntityId,
			() => this._gizmoManager.mode,
			( entity ) => this.selectEntity( entity ),
			() => this._modalTransformHandler.active,
			() => {

				if ( this._editorCamera.preview ) {

					this.setField( "preview", false );

				}

				this.setField( "cameraView", "editor" );

			},
		);

		this._modalTransformHandler = new ModalTransformHandler( {
			engine,
			editorCamera: this._editorCamera,
			api: this._api,
			getSelectedEntity: () => this._selectedEntityId
				? engine.root.findEntityByUUID( this._selectedEntityId ) ?? null
				: null,
			isPointerBusy: () => this._pointerHandler.gizmoDragging,
			onStatusChange: ( status ) => {

				// モーダル中は毎 pointermove で呼ばれるので、文字列が変わったときだけ React へ通知する
				if ( this._modalStatus === status ) return;

				this._modalStatus = status;
				this.noticeField( "modalStatus" );

			},
		} );

		this._keyboardHandler = new KeyboardHandler( {
			onSave: () => this.save(),
			onUndo: () => this._api.undo(),
			onRedo: () => this._api.redo(),
			onPlayToggle: () => {

				if ( this._engine.frame.playing ) {

					this._engine.stop();

				} else {

					this._engine.play();

				}

			},
			onCameraViewToggle: () => {

				// プレビュー中はプレビューを抜けてエディタカメラへ戻る
				if ( this._editorCamera.preview ) {

					this.setField( "preview", false );
					this.setField( "cameraView", "editor" );

				} else {

					this.setField( "cameraView", this._editorCamera.view === "editor" ? "camera" : "editor" );

				}

			},
			onPreviewToggle: () => {

				this.setField( "preview", ! this._editorCamera.preview );

			},
			onSyncToSceneCamera: () => {

				if ( this._editorCamera.preview ) {

					this.setField( "preview", false );

				}

				this.setField( "cameraView", "editor" );

				this._editorCamera.syncFromSceneCamera( this._engine );

			},
			onFocusSelected: () => {

				if ( this._editorCamera.preview ) return;

				const entity = this._selectedEntityId
					? this._engine.root.findEntityByUUID( this._selectedEntityId ) ?? null
					: null;

				if ( ! entity ) return;

				// シーンカメラ視点のままでは寄れないのでエディタカメラへ戻してからフォーカスする
				this.setField( "cameraView", "editor" );

				this._editorCamera.focus( entity );

			},
			onTransformKey: ( e ) => this._editorCamera.preview ? false : this._modalTransformHandler.handleKeyDown( e ),
		} );

		/*-------------------------------
			Frame Debugger
		-------------------------------*/

		this._frameDebugger = new FrameDebugger( engine.canvas as HTMLCanvasElement, this._draw );

		/*-------------------------------
			Audio
		-------------------------------*/

		this._audioBuffer = null;

		this._engine.on( "update/music", ( buffer: AudioBuffer ) => {

			this._audioBuffer = buffer;

		} );

		/*-------------------------------
			Loop
		-------------------------------*/

		this._frameLoop = {
			enabled: false,
			start: 0,
			end: 0,
		};

		/*-------------------------------
			BLidge
		-------------------------------*/

		this._engine.on( "update/blidge/frame", ( e: MXP.BLidgeFrame ) => {

			this._engine.seek( e.current );

			if ( e.playing && ! this._engine.frame.playing ) {

				this._engine.play();

			} else if ( ! e.playing && this._engine.frame.playing ) {

				this._engine.stop();

			}

		} );

		/*-------------------------------
			Fields
		-------------------------------*/

		this.field( "enableRender", () => this._engine.enableRender, v => this._engine.enableRender = v );

		this.field( "resolutionScale", () => this._resolutionScale, v => {

			this._resolutionScale = Number( v );

			this._resize();

		} );

		const resolutionDir = this.fieldDir( "resolution" );
		resolutionDir.field( "width", () => this._baseResolution.x, ( v: number ) => {

			this._baseResolution.x = v;
			this._resize();

		}, { step: 1 } );
		resolutionDir.field( "height", () => this._baseResolution.y, ( v: number ) => {

			this._baseResolution.y = v;
			this._resize();

		}, { step: 1 } );

		this.field( "viewType", () => this._viewType, v => {

			this._viewType = v;

			this._frameDebugger.enable = this._viewType === "debug";

		} );

		const frameLoop = this.fieldDir( "frameLoop" );
		frameLoop.field( "enabled", () => this._frameLoop.enabled, v => this._frameLoop.enabled = v );
		frameLoop.field( "start", () => this._frameLoop.start, v => this._frameLoop.start = v );
		frameLoop.field( "end", () => this._frameLoop.end, v => this._frameLoop.end = v );

		this.field( "selectedEntityId", () => this._selectedEntityId, v => {

			this._selectedEntityId = v;

			if ( v ) {

				this._propertyTarget = "entity";
				this.noticeField( "propertyTarget" );

			}

		} );

		this.field( "selectedAsset", () => this._selectedAsset, v => {

			this._selectedAsset = v;

			if ( v ) {

				this._propertyTarget = "asset";
				this.noticeField( "propertyTarget" );

			}

		} );

		this.field( "navigateAsset", () => this._navigateAsset, v => {

			this._navigateAsset = v;

		} );

		this.field( "propertyTarget", () => this._propertyTarget, v => {

			this._propertyTarget = v;

		} );

		this.field( "cameraView", () => this._editorCamera.view, ( v: "editor" | "camera" ) => {

			this._editorCamera.setView( v, engine );

		} );

		this.field( "preview", () => this._editorCamera.preview, ( v: boolean ) => {

			this._editorCamera.setPreview( v, engine );

		} );

		this.field( "gizmoMode", () => this._gizmoManager.mode, ( v: GizmoMode ) => {

			this._gizmoManager.setMode( v );

		} );

		this.field( "transformOrientation", () => this._gizmoManager.orientation, ( v: TransformOrientation ) => {

			this._gizmoManager.setOrientation( v );

		} );

		// モーダル変形中だけ出るヘッダテキスト。セッション限りの状態なので editor.json には残さない
		this.field( "modalStatus", () => this._modalStatus, { noExport: true } );

		const helperDir = this.fieldDir( "helpers" );
		helperDir.field( "show", () => this._helperManager.showHelpers, v => this._helperManager.showHelpers = v );
		helperDir.field( "grid", () => this._gridRenderer.showGrid, v => this._gridRenderer.showGrid = v );
		helperDir.field( "empty", () => this._helperManager.showEmptyHelpers, v => this._helperManager.showEmptyHelpers = v );
		helperDir.field( "camera", () => this._helperManager.showCameraHelpers, v => this._helperManager.showCameraHelpers = v );
		helperDir.field( "light", () => this._helperManager.showLightHelpers, v => this._helperManager.showLightHelpers = v );
		helperDir.field( "wireframe", () => this._wireframeRenderer.showWireframe, v => this._wireframeRenderer.showWireframe = v );
		helperDir.field( "gizmo", () => this._gizmoManager.showGizmo, v => this._gizmoManager.showGizmo = v );
		helperDir.field( "outline", () => this._selectionOutline.showOutline, v => this._selectionOutline.showOutline = v );

		const cameraDir = this.fieldDir( "camera" );
		cameraDir.field( "position",
			() => {

				const eye = this._editorCamera.orbitControls.eye;
				return [ eye.x, eye.y, eye.z ];

			},
			( v: number[] ) => {

				const target = this._editorCamera.orbitControls.target;
				this._editorCamera.orbitControls.setPosition(
					new GLP.Vector( v[ 0 ], v[ 1 ], v[ 2 ] ),
					new GLP.Vector( target.x, target.y, target.z )
				);

			}
		);
		cameraDir.field( "target",
			() => {

				const target = this._editorCamera.orbitControls.target;
				return [ target.x, target.y, target.z ];

			},
			( v: number[] ) => {

				const eye = this._editorCamera.orbitControls.eye;
				this._editorCamera.orbitControls.setPosition(
					new GLP.Vector( eye.x, eye.y, eye.z ),
					new GLP.Vector( v[ 0 ], v[ 1 ], v[ 2 ] )
				);

			}
		);

		/*-------------------------------
			Animate
		-------------------------------*/

		this._animate();

	}

	/*-------------------------------
		Bootstrap
	-------------------------------*/

	public bootstrap( editorData?: MXP.SerializeField ) {

		if ( editorData ) {

			this.deserialize( editorData );

		}

		this._resize();

	}

	/*-------------------------------
		Getters
	-------------------------------*/

	public get engine() {

		return this._engine;

	}

	public get api() {

		return this._api;

	}

	public get audioBuffer() {

		return this._audioBuffer;

	}

	public get disposed() {

		return this._disposed;

	}

	public get editorCamera() {

		return this._editorCamera;

	}

	public get assetPreviewManager() {

		return this._assetPreviewManager;

	}

	/*-------------------------------
		Animate
	-------------------------------*/

	private _animate() {

		if ( this._disposed ) return;

		if ( ! this._isExporting ) {

			this._editorCamera.updateBeforeRender( this._engine );

			this._engine.update();

			const cameraEntity = this._editorCamera.getCameraEntity( this._engine );
			const selectedEntity = this._selectedEntityId
				? this._engine.root.findEntityByUUID( this._selectedEntityId ) ?? null
				: null;

			const preview = this._editorCamera.preview;

			if ( ! preview ) {

				// ヘルパーやワイヤより先に敷いて、上に載る線を隠さないようにする
				this._gridRenderer.render( cameraEntity, this._engine );

				this._helperManager.render( cameraEntity, this._engine, this._selectedEntityId );

				this._wireframeRenderer.render( cameraEntity, this._engine );

			}

			// プレビュー中はターゲット無しで呼び、ギズモの visible とヒット判定も落とす。
			// モーダル変形中はギズモが変形結果に追従してちらつくので出さない
			this._gizmoManager.render(
				preview || this._modalTransformHandler.active ? null : selectedEntity,
				cameraEntity,
				this._engine
			);

			if ( ! preview ) {

				this._selectionOutline.render( selectedEntity, cameraEntity );

			}

			// present前にuiバッファへ描き込む（present後ではwebgpuの画面に反映されない）
			if ( this._frameDebugger.enable ) {

				this._frameDebugger.draw();

			}

			this._draw.present();

			this._editorCamera.updateAfterRender( this._engine );

			if ( this._externalCanvasBitmapContext ) {

				const context = this._externalCanvasBitmapContext;

				createImageBitmap( this.engine.canvas ).then( bitmap => {

					context.transferFromImageBitmap( bitmap );

				} );

			}

			if ( this._engine.frame.playing ) {

				if ( this._engine.frame.current < 0 || this._engine.frame.current > this._engine.frameSetting.duration ) {

					this._engine.seek( 0 );

				}

				if ( this._frameLoop.enabled ) {

					if ( this._engine.frame.current < this._frameLoop.start || this._engine.frame.current > this._frameLoop.end ) {

						this._engine.seek( this._frameLoop.start );

					}

				}

			}

		}

		window.requestAnimationFrame( this._animate.bind( this ) );

	}

	/*-------------------------------
		Export
	-------------------------------*/

	public get isExporting() {

		return this._isExporting;

	}

	public get exportProgress() {

		return this._exportProgress;

	}

	public async exportMP4() {

		if ( this._isExporting ) return;

		this._isExporting = true;
		this._exportProgress = null;
		this.emit( "update/export" );

		const wasPlaying = this._engine.frame.playing;
		this._engine.stop();

		const prevCameraEntity = this._engine.cameraEntity;
		this._engine.cameraEntity = null;

		// 書き出しは本番同等のパイプラインで行う
		this._engine.renderer.setPipelineOverride( null );

		try {

			const blob = await this._sceneExporter.export(
				{
					fps: this._engine.frameSetting.fps,
					duration: this._engine.frameSetting.duration,
					resolution: this._baseResolution.clone(),
				},
				( progress ) => {

					this._exportProgress = progress;
					this.emit( "update/export" );

				}
			);

			SceneExporter.download( blob );

		} catch ( e ) {

			console.error( "Export failed:", e );

		}

		this._engine.cameraEntity = prevCameraEntity;
		this._editorCamera.syncPipelineOverride( this._engine );

		this._isExporting = false;
		this._exportProgress = null;
		this.emit( "update/export" );

		if ( wasPlaying ) {

			this._engine.play();

		}

	}

	/*-------------------------------
		Controls
	-------------------------------*/

	public selectEntity( entity: MXP.Entity | null ) {

		this.setField( "selectedEntityId", entity ? entity.uuid : null );

	}

	public createEntity( parentEntity: MXP.Entity, name: string ) {

		const newEntity = this._engine.createEntity( { name } );
		newEntity.initiator = "user";
		parentEntity.add( newEntity );

		return newEntity;

	}

	public deleteEntity( entity: MXP.Entity ) {

		entity.disposeRecursive();

		const parent = entity.parent;

		if ( parent ) {

			parent.remove( entity );

		}

	}

	/*-------------------------------
		Export
	-------------------------------*/

	public save() {

		this.emit( "save", [ this.exportEngine(), this.exportEditor() ] );

	}

	public exportEditor() {

		return this.serialize( { mode: "export" } );

	}

	public exportEngine() {

		return this._engine.serialize( { mode: "export" } );

	}

	/*-------------------------------
		External Window
	-------------------------------*/

	public openInExternalWindow() {

		this._externalWindow = window.open( "", "_blank" );

		if ( ! this._externalWindow ) return;

		const mirrorCanvas = this._externalWindow.document.createElement( "canvas" );
		mirrorCanvas.style.width = "100%";
		mirrorCanvas.style.height = "100%";
		mirrorCanvas.style.objectFit = "contain";
		mirrorCanvas.style.cursor = "none";

		this._externalWindow.document.body.style.margin = "0";
		this._externalWindow.document.body.style.background = "#000";
		this._externalWindow.document.body.appendChild( mirrorCanvas );
		this._externalCanvasBitmapContext = mirrorCanvas.getContext( "bitmaprenderer" );

		this._externalWindow.addEventListener( "unload", () => {

			this.closeExternalWindow();

		} );

		this._resize();

	}

	public closeExternalWindow() {

		if ( this._externalWindow ) {

			this._externalWindow.close();
			this._externalWindow = null;
			this._externalCanvasBitmapContext = null;

		}

	}

	/*-------------------------------
		Resize
	-------------------------------*/

	private _resize() {

		const resolution = this._baseResolution.clone().multiply( this._resolutionScale );

		this.engine.setSize( resolution );

		this._draw.resize( resolution );

		this._frameDebugger.resize( resolution );

		this._editorCamera.resize( resolution );

		if ( this._externalCanvasBitmapContext ) {

			this._externalCanvasBitmapContext.canvas.width = resolution.x;
			this._externalCanvasBitmapContext.canvas.height = resolution.y;

		}

	}

	/*-------------------------------
		Dispose
	-------------------------------*/

	public dispose() {

		this._disposed = true;
		this._api.dispose();
		this._editorCamera.dispose();
		this._pointerHandler.dispose();
		this._keyboardHandler.dispose();
		this._modalTransformHandler.dispose();
		this._frameDebugger.dispose();
		this._assetPreviewManager.dispose();

	}

}
