import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { OrbitControls } from '../Controls/OrbitControls';
import { Engine } from '../Engine';
import { FrameDebugger } from '../Engine/FrameDebugger';
import { Keyboard, PressedKeys } from '../Engine/Keyboard';
import { EditorAPI } from './EditorAPI';
import { EditorAPIBridge } from './EditorAPIBridge';
import { TranslateGizmo } from './Gizmo/TranslateGizmo';

import selectionVert from './shaders/selection.vs';
import selectionFrag from './shaders/selection.fs';
import outlineFrag from './shaders/outline.fs';

export type EditorTimelineLoop = {
	enabled: boolean,
	start: number,
	end: number,
}

export class Editor extends MXP.Serializable {

	private _engine: Engine;
	private _keyBoard: Keyboard;
	private _selectedEntityId: string | null;
	private _audioBuffer: AudioBuffer | null;
	private _frameLoop: EditorTimelineLoop;
	private _resolutionScale: number;
	private _baseResolution: GLP.Vector;
	private _viewType: "render" | "debug";
	private _frameDebugger: FrameDebugger;
	private _externalWindow: Window | null;
	private _externalCanvasBitmapContext: ImageBitmapRenderingContext | null;

	private _disposed: boolean;
	private _api: EditorAPI;
	private _apiBridge: EditorAPIBridge;

	// editor camera
	private _editorCameraEntity: MXP.Entity;
	private _editorCamera: MXP.Camera;
	private _orbitControls: OrbitControls;
	private _useEditorCamera: boolean;
	private _cameraMode: "scene" | "preview";

	// click selection
	private _raycaster: MXP.Raycaster;
	private _pointerDownPos: GLP.Vector | null;

	// selection outline
	private _selectionBuffer: GLP.GLPowerFrameBuffer;
	private _selectionMaterial: MXP.Material;
	private _outlinePostProcess: MXP.PostProcess;

	// gizmo
	private _gizmo: TranslateGizmo;

	constructor( engine: Engine ) {

		super();

		this._engine = engine;
		this._viewType = "render";
		this._selectedEntityId = null;
		this._resolutionScale = 1.0;
		this._baseResolution = new GLP.Vector( 1920, 1080 );
		this._externalWindow = null;
		this._externalCanvasBitmapContext = null;
		this._disposed = false;
		this._api = new EditorAPI( this );

		/*-------------------------------
			Editor Camera
		-------------------------------*/

		this._editorCameraEntity = new MXP.Entity( { name: "__editorCamera" } );
		this._editorCamera = this._editorCameraEntity.addComponent( MXP.Camera );
		this._orbitControls = this._editorCameraEntity.addComponent( OrbitControls );
		this._orbitControls.setElm( engine.canvas as HTMLCanvasElement );
		this._orbitControls.enabled = true;
		this._useEditorCamera = true;
		this._cameraMode = "scene";
		engine.cameraEntity = this._editorCameraEntity;
		engine.renderer.setOverride( { motionBlur: false } );
		this._syncEditorCameraFromScene();

		/*-------------------------------
			Click Selection
		-------------------------------*/

		this._raycaster = new MXP.Raycaster();
		this._pointerDownPos = null;

		const onPointerDown = ( e: PointerEvent ) => {

			( e.target as HTMLElement ).setPointerCapture( e.pointerId );
			this._pointerDownPos = new GLP.Vector( e.clientX, e.clientY );

		};

		const onPointerUp = ( e: PointerEvent ) => {

			if ( ! this._pointerDownPos ) return;

			const dx = e.clientX - this._pointerDownPos.x;
			const dy = e.clientY - this._pointerDownPos.y;
			const dist = Math.sqrt( dx * dx + dy * dy );
			this._pointerDownPos = null;

			if ( dist > 5 ) return;

			const canvas = engine.canvas as HTMLCanvasElement;
			const rect = canvas.getBoundingClientRect();
			const x = ( ( e.clientX - rect.left ) / rect.width ) * 2 - 1;
			const y = - ( ( e.clientY - rect.top ) / rect.height ) * 2 + 1;
			const ndc = new GLP.Vector( x, y );

			const cameraEntity = this._useEditorCamera
				? this._editorCameraEntity
				: engine.cameraEntity;

			if ( ! cameraEntity ) return;

			this._raycaster.setFromCamera( ndc, cameraEntity );
			const results = this._raycaster.intersectEntities( engine.root );

			if ( results.length > 0 ) {

				const hit = results.find( r => r.entity.initiator !== "god" );
				this.selectEntity( hit ? hit.entity : null );

			} else {

				this.selectEntity( null );

			}

		};

		const canvasElm = engine.canvas as HTMLCanvasElement;
		canvasElm.addEventListener( "pointerdown", onPointerDown );
		canvasElm.addEventListener( "pointerup", onPointerUp );

		this.once( "dispose", () => {

			canvasElm.removeEventListener( "pointerdown", onPointerDown );
			canvasElm.removeEventListener( "pointerup", onPointerUp );

		} );

		/*-------------------------------
			Selection Outline
		-------------------------------*/

		const gl = engine.renderer.gl;

		this._selectionBuffer = new GLP.GLPowerFrameBuffer( gl )
			.setTexture( [
				new GLP.GLPowerTexture( gl ).setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
			] );
		this._selectionBuffer.setSize( engine.renderer.resolution );

		this._selectionMaterial = new MXP.Material( {
			vert: selectionVert,
			frag: selectionFrag,
		} );
		this._selectionMaterial.visibilityFlag = { deferred: false, forward: true, shadowMap: false, envMap: false, ui: false, postprocess: false };

		const outlinePass = new MXP.PostProcessPass( gl, {
			frag: outlineFrag,
			renderTarget: null,
			uniforms: {
				uMaskTexture: { value: this._selectionBuffer.textures[ 0 ], type: '1i' },
				uOutlineColor: { value: new GLP.Vector( 1.0, 0.6, 0.0 ), type: '3fv' },
			},
		} );

		this._outlinePostProcess = new MXP.PostProcess( {
			name: "editorOutline",
			passes: [ outlinePass ],
		} );

		/*-------------------------------
			Gizmo
		-------------------------------*/

		this._gizmo = new TranslateGizmo();

		/*-------------------------------
			KeyEvents
		-------------------------------*/

		this._keyBoard = new Keyboard();

		this._keyBoard.on( "keydown", ( e: KeyboardEvent, pressedKeys: PressedKeys ) => {

			if ( ( pressedKeys[ "Meta" ] || pressedKeys[ "Control" ] ) && pressedKeys[ "s" ] ) {

				e.preventDefault();

				this.save();

			}

			if ( ( pressedKeys[ "Meta" ] || pressedKeys[ "Control" ] ) && pressedKeys[ "z" ] ) {

				e.preventDefault();

				if ( pressedKeys[ "Shift" ] ) {

					this._api.redo();

				} else {

					this._api.undo();

				}

			}

			if ( e.key == ' ' ) {

				if ( this._engine.frame.playing ) {

					this._engine.stop( );

				} else {

					this._engine.play();

				}

			}

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

		} );

		this.field( "cameraMode", () => this._cameraMode, ( v: "scene" | "preview" ) => {

			this._cameraMode = v;

			if ( v === "scene" ) {

				this._syncEditorCameraFromScene();
				engine.cameraEntity = this._editorCameraEntity;
				this._orbitControls.enabled = true;
				this._useEditorCamera = true;
				engine.renderer.setOverride( { motionBlur: false } );

			} else {

				engine.cameraEntity = null;
				this._orbitControls.enabled = false;
				this._useEditorCamera = false;
				engine.renderer.clearOverrides();

			}

		} );

		/*-------------------------------
			API Bridge
		-------------------------------*/

		this._apiBridge = new EditorAPIBridge( this );

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
		Editor Camera
	-------------------------------*/

	private _syncEditorCameraFromScene() {

		const sceneCamera = this._engine.root.findEntityByName( "Camera" );

		if ( sceneCamera ) {

			const pos = new GLP.Vector();
			sceneCamera.matrixWorld.decompose( pos );

			this._orbitControls.setPosition( pos, new GLP.Vector( 0, 0, 0 ) );

		}

	}

	/*-------------------------------
		Animate
	-------------------------------*/

        private _animate() {

		if ( this._disposed ) return;

		// editor camera update
		if ( this._useEditorCamera ) {

			const event = this._engine.createEntityUpdateEvent();
			this._editorCameraEntity.updateMatrix();

			this._editorCamera.aspect = this._engine.renderer.resolution.x / this._engine.renderer.resolution.y;
			this._editorCamera.needsUpdateProjectionMatrix = true;

			this._editorCameraEntity.update( event );
			this._editorCameraEntity.onBeforeRender( event );

		}

		// update
		this._engine.update();

		// gizmo update
		this._updateGizmo();

		// selection outline
		this._renderSelectionOutline();

		// editor camera afterRender

		if ( this._useEditorCamera ) {

			const event = this._engine.createEntityUpdateEvent();
			this._editorCameraEntity.onAfterRender( event );

		}

		// window

		if ( this._externalCanvasBitmapContext ) {

			const context = this._externalCanvasBitmapContext;

			createImageBitmap( this.engine.canvas ).then( bitmap => {

				context.transferFromImageBitmap( bitmap );

			} );

		}

		// timeline

		if ( this._engine.frame.playing ) {

			// clamp 0

			if ( this._engine.frame.current < 0 || this._engine.frame.current > this._engine.frameSetting.duration ) {

				this._engine.seek( 0 );

			}

			// loop

			if ( this._frameLoop.enabled ) {

				if ( this._engine.frame.current < this._frameLoop.start || this._engine.frame.current > this._frameLoop.end ) {

					this._engine.seek( this._frameLoop.start );

				}

			}

		}

		// debugger

		if ( this._frameDebugger && this._frameDebugger.enable ) {

			this._frameDebugger.draw();

		}

                window.requestAnimationFrame( this._animate.bind( this ) );

	}

	/*-------------------------------
		Gizmo
	-------------------------------*/

	private _updateGizmo() {

		const selectedEntity = this._selectedEntityId
			? this._engine.root.findEntityByUUID( this._selectedEntityId )
			: null;

		this._gizmo.setTarget( selectedEntity || null );

		if ( this._gizmo.entity.visible ) {

			// update gizmo matrices
			this._gizmo.entity.updateMatrix( true );

			const event = this._engine.createEntityUpdateEvent();
			this._gizmo.entity.update( event );

			// render gizmo
			const cameraEntity = this._useEditorCamera
				? this._editorCameraEntity
				: this._engine.cameraEntity;

			if ( cameraEntity ) {

				const gizmoEntities: MXP.Entity[] = [];

				this._gizmo.entity.traverse( ( child ) => {

					if ( child.getComponent( MXP.Mesh ) ) {

						gizmoEntities.push( child );

					}

				} );

				if ( gizmoEntities.length > 0 ) {

					this._engine.renderer.renderCamera(
						"forward",
						cameraEntity,
						gizmoEntities,
						null,
						this._engine.renderer.resolution,
						{ disableClear: true }
					);

				}

			}

		}

	}

	/*-------------------------------
		Selection Outline
	-------------------------------*/

	private _renderSelectionOutline() {

		const selectedEntity = this._selectedEntityId
			? this._engine.root.findEntityByUUID( this._selectedEntityId )
			: null;

		if ( ! selectedEntity ) return;

		const mesh = selectedEntity.getComponent( MXP.Mesh );

		if ( ! mesh ) return;

		const cameraEntity = this._useEditorCamera
			? this._editorCameraEntity
			: this._engine.cameraEntity;

		if ( ! cameraEntity ) return;

		// resize selection buffer if needed
		const res = this._engine.renderer.resolution;

		if ( this._selectionBuffer.size.x !== res.x || this._selectionBuffer.size.y !== res.y ) {

			this._selectionBuffer.setSize( res );

		}

		// render selected entity to mask buffer with override material
		const origMaterial = mesh.material;
		mesh.material = this._selectionMaterial;

		this._engine.renderer.renderCamera(
			"forward",
			cameraEntity,
			[ selectedEntity ],
			this._selectionBuffer,
			res
		);

		mesh.material = origMaterial;

		// render outline postprocess to screen
		this._engine.renderer.renderPostProcess(
			this._outlinePostProcess,
			undefined,
			res
		);

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

		// editor camera aspect
		this._editorCamera.aspect = resolution.x / resolution.y;
		this._editorCamera.needsUpdateProjectionMatrix = true;

		// selection buffer resize
		this._selectionBuffer.setSize( resolution );
		this._outlinePostProcess.resize( resolution );

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
		this._keyBoard.dispose();
		this._frameDebugger.dispose();
		this._editorCameraEntity.dispose();

	}

}
