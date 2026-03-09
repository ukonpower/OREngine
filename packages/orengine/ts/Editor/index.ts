import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Engine } from '../Engine';
import { FrameDebugger } from '../Engine/FrameDebugger';
import { SceneExporter, SceneExporterProgress } from '../Engine/SceneExporter';

import { EditorAPI } from './EditorAPI';
import { EditorAPIBridge } from './EditorAPIBridge';
import { EditorCamera } from './EditorCamera';
import { GizmoMode } from './Gizmo';
import { GizmoManager } from './GizmoManager';
import { HelperManager } from './HelperManager';
import { KeyboardHandler } from './KeyboardHandler';
import { PointerHandler } from './PointerHandler';
import { SelectionOutline } from './SelectionOutline';
import { WireframeRenderer } from './WireframeRenderer';

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
	private _externalWindow: Window | null;
	private _externalCanvasBitmapContext: ImageBitmapRenderingContext | null;

	private _disposed: boolean;
	private _projectName: string | undefined;
	private _api: EditorAPI;
	private _apiBridge: EditorAPIBridge;

	private _editorCamera: EditorCamera;
	private _gizmoManager: GizmoManager;
	private _helperManager: HelperManager;
	private _wireframeRenderer: WireframeRenderer;
	private _selectionOutline: SelectionOutline;
	private _pointerHandler: PointerHandler;
	private _keyboardHandler: KeyboardHandler;

	private _sceneExporter: SceneExporter;
	private _isExporting: boolean;
	private _exportProgress: SceneExporterProgress | null;

	constructor( engine: Engine, projectName?: string ) {

		super();

		this._engine = engine;
		this._projectName = projectName;
		this._viewType = "render";
		this._selectedEntityId = null;
		this._selectedAsset = null;
		this._navigateAsset = null;
		this._propertyTarget = "entity";
		this._resolutionScale = 1.0;
		this._baseResolution = new GLP.Vector( 1920, 1080 );
		this._externalWindow = null;
		this._externalCanvasBitmapContext = null;
		this._disposed = false;
		this._api = new EditorAPI( this );
		this._sceneExporter = new SceneExporter( engine );
		this._isExporting = false;
		this._exportProgress = null;

		/*-------------------------------
			Modules
		-------------------------------*/

		this._editorCamera = new EditorCamera( engine );
		this._gizmoManager = new GizmoManager();
		this._helperManager = new HelperManager();
		this._wireframeRenderer = new WireframeRenderer();
		this._selectionOutline = new SelectionOutline( engine );

		this._pointerHandler = new PointerHandler(
			engine,
			this._editorCamera,
			this._gizmoManager,
			this._helperManager,
			this._api,
			() => this._selectedEntityId,
			() => this._gizmoManager.mode,
			( entity ) => this.selectEntity( entity ),
		);

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
			onSetGizmoMode: ( mode ) => this.setField( "gizmoMode", mode ),
		} );

		/*-------------------------------
			Frame Debugger
		-------------------------------*/

		this._frameDebugger = new FrameDebugger( engine );

		this.engine.renderer.on( 'drawPass', ( rt?: GLP.GLPowerFrameBuffer, label?: string ) => {

			if ( this._frameDebugger && this._frameDebugger.enable && rt ) {

				this._frameDebugger.push( rt, label );

			}

		} );

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

			if ( this._viewType === "debug" ) {

				this._frameDebugger.enable = true;

			} else {

				this._frameDebugger.enable = false;

			}

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

		this.field( "cameraMode", () => this._editorCamera.cameraMode, ( v: "scene" | "preview" ) => {

			this._editorCamera.setCameraMode( v, engine );

		} );

		this.field( "gizmoMode", () => this._gizmoManager.mode, ( v: GizmoMode ) => {

			this._gizmoManager.setMode( v );

		} );

		const helperDir = this.fieldDir( "helpers" );
		helperDir.field( "show", () => this._helperManager.showHelpers, v => this._helperManager.showHelpers = v );
		helperDir.field( "empty", () => this._helperManager.showEmptyHelpers, v => this._helperManager.showEmptyHelpers = v );
		helperDir.field( "camera", () => this._helperManager.showCameraHelpers, v => this._helperManager.showCameraHelpers = v );
		helperDir.field( "light", () => this._helperManager.showLightHelpers, v => this._helperManager.showLightHelpers = v );
		helperDir.field( "wireframe", () => this._wireframeRenderer.showWireframe, v => this._wireframeRenderer.showWireframe = v );

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
			API Bridge
		-------------------------------*/

		this._apiBridge = new EditorAPIBridge( this, this._projectName || 'default' );

		/*-------------------------------
			Animate
		-------------------------------*/

		this._animate();

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

			this._helperManager.render( this._editorCamera.cameraMode, cameraEntity, this._engine );

			this._wireframeRenderer.render( this._editorCamera.cameraMode, cameraEntity, this._engine );

			this._gizmoManager.render( selectedEntity, cameraEntity, this._engine );

			this._selectionOutline.render( selectedEntity, cameraEntity, this._engine );

			// uiBuffer → デフォルトFBにblit
			const gl = this._engine.renderer.gl;
			const rt = this._engine.renderer.renderTarget;
			const res = this._engine.renderer.resolution;

			gl.bindFramebuffer( gl.READ_FRAMEBUFFER, rt.uiBuffer.getFrameBuffer() );
			gl.bindFramebuffer( gl.DRAW_FRAMEBUFFER, null );
			gl.blitFramebuffer(
				0, 0, res.x, res.y,
				0, 0, res.x, res.y,
				gl.COLOR_BUFFER_BIT, gl.NEAREST
			);

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

			if ( this._frameDebugger && this._frameDebugger.enable ) {

				this._frameDebugger.draw();

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

		const newEntity = new MXP.Entity();
		newEntity.name = name;
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

		this._frameDebugger.resize( resolution );

		this._editorCamera.resize( resolution );

		this._selectionOutline.resize( resolution );

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
		this._apiBridge.dispose();
		this._editorCamera.dispose();
		this._pointerHandler.dispose();
		this._keyboardHandler.dispose();
		this._frameDebugger.dispose();

	}

}
