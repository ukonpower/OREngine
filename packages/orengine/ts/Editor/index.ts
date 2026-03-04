import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { OrbitControls } from '../Controls/OrbitControls';
import { Engine } from '../Engine';
import { FrameDebugger } from '../Engine/FrameDebugger';
import { Keyboard, PressedKeys } from '../Engine/Keyboard';

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
	private _viewType: "render" | "debug";
	private _frameDebugger: FrameDebugger;
	private _externalWindow: Window | null;
	private _externalCanvasBitmapContext: ImageBitmapRenderingContext | null;

	private _disposed: boolean;

	// editor camera
	private _editorCameraEntity: MXP.Entity;
	private _editorCamera: MXP.Camera;
	private _orbitControls: OrbitControls;
	private _useEditorCamera: boolean;

	constructor( engine: Engine ) {

		super();

		this._engine = engine;
		this._viewType = "render";
		this._selectedEntityId = null;
		this._resolutionScale = 1.0;
		this._externalWindow = null;
		this._externalCanvasBitmapContext = null;
		this._disposed = false;

		/*-------------------------------
			Editor Camera
		-------------------------------*/

		this._editorCameraEntity = new MXP.Entity( { name: "__editorCamera" } );
		this._editorCamera = this._editorCameraEntity.addComponent( MXP.Camera );
		this._orbitControls = this._editorCameraEntity.addComponent( OrbitControls );
		this._orbitControls.setElm( engine.canvas as HTMLCanvasElement );
		this._orbitControls.enabled = false;
		this._useEditorCamera = false;

		const activateEditorCamera = ( active: boolean ) => {

			this._useEditorCamera = active;
			this._orbitControls.enabled = active;

			if ( active ) {

				this._syncEditorCameraFromScene();
				engine.cameraEntity = this._editorCameraEntity;

			} else {

				engine.cameraEntity = null;

			}

		};

		const onPointerDown = ( e: PointerEvent ) => {

			if ( this._useEditorCamera ) return;

			( e.target as HTMLElement ).setPointerCapture( e.pointerId );

			activateEditorCamera( true );

		};

		const onWheel = () => {

			if ( this._useEditorCamera ) return;

			activateEditorCamera( true );

		};

		const onKeyDown = ( e: KeyboardEvent ) => {

			if ( e.key === 'Escape' ) {

				activateEditorCamera( false );

			}

		};

		( engine.canvas as HTMLCanvasElement ).addEventListener( "pointerdown", onPointerDown );
		( engine.canvas as HTMLCanvasElement ).addEventListener( "wheel", onWheel );
		window.addEventListener( "keydown", onKeyDown );

		this.once( "dispose", () => {

			( engine.canvas as HTMLCanvasElement ).removeEventListener( "pointerdown", onPointerDown );
			( engine.canvas as HTMLCanvasElement ).removeEventListener( "wheel", onWheel );
			window.removeEventListener( "keydown", onKeyDown );

		} );

		/*-------------------------------
			KeyEvents
		-------------------------------*/

		this._keyBoard = new Keyboard();

		this._keyBoard.on( "keydown", ( e: KeyboardEvent, pressedKeys: PressedKeys ) => {

			if ( ( pressedKeys[ "Meta" ] || pressedKeys[ "Control" ] ) && pressedKeys[ "s" ] ) {

				e.preventDefault();

				this.save();

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

		const resolution = new GLP.Vector( 1920, 1080 ).multiply( this._resolutionScale );

		this.engine.setSize( resolution );

		this._frameDebugger.resize( resolution );

		// editor camera aspect
		this._editorCamera.aspect = resolution.x / resolution.y;
		this._editorCamera.needsUpdateProjectionMatrix = true;

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
		this._keyBoard.dispose();
		this._frameDebugger.dispose();
		this._editorCameraEntity.dispose();

	}

}
