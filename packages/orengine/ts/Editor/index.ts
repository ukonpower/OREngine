import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { OrbitControls } from '../Controls/OrbitControls';
import { Engine } from '../Engine';
import { FrameDebugger } from '../Engine/FrameDebugger';
import { Keyboard, PressedKeys } from '../Engine/Keyboard';

import { SetFieldCommand } from './Commands/SetFieldCommand';
import { EditorAPI } from './EditorAPI';
import { EditorAPIBridge } from './EditorAPIBridge';
import { Gizmo, GizmoAxis, GizmoMode } from './Gizmo';
import { RotateGizmo } from './Gizmo/RotateGizmo';
import { ScaleGizmo } from './Gizmo/ScaleGizmo';
import { TranslateGizmo } from './Gizmo/TranslateGizmo';
import { EntityHelper, HelperType } from './Helpers/EntityHelper';
import gizmoFrag from './shaders/gizmo.fs';
import gizmoVert from './shaders/gizmo.vs';
import outlineFrag from './shaders/outline.fs';
import selectionFrag from './shaders/selection.fs';
import selectionVert from './shaders/selection.vs';

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
	private _translateGizmo: TranslateGizmo;
	private _rotateGizmo: RotateGizmo;
	private _scaleGizmo: ScaleGizmo;
	private _activeGizmo: Gizmo;
	private _gizmoMode: GizmoMode;
	private _gizmoDragging: boolean;
	private _gizmoDragStartValue: { position: number[], euler: number[], scale: number[] } | null;

	// helpers
	private _showHelpers: boolean;
	private _showEmptyHelpers: boolean;
	private _showCameraHelpers: boolean;
	private _showLightHelpers: boolean;
	private _helpers: Map<string, EntityHelper>;

	// wireframe
	private _showWireframe: boolean;
	private _wireframeMaterial: MXP.Material;
	private _wireframeGeometryCache: Map<MXP.Geometry, MXP.Geometry>;

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
			Click Selection & Gizmo Drag
		-------------------------------*/

		this._raycaster = new MXP.Raycaster();
		this._pointerDownPos = null;
		this._gizmoDragging = false;
		this._gizmoDragStartValue = null;

		const canvasElm = engine.canvas as HTMLCanvasElement;

		const getNDC = ( e: PointerEvent ): GLP.Vector => {

			const rect = canvasElm.getBoundingClientRect();
			const x = ( ( e.clientX - rect.left ) / rect.width ) * 2 - 1;
			const y = - ( ( e.clientY - rect.top ) / rect.height ) * 2 + 1;

			return new GLP.Vector( x, y );

		};

		const getCameraEntity = (): MXP.Entity | null => {

			return this._useEditorCamera
				? this._editorCameraEntity
				: this._engine.cameraEntity;

		};

		const onPointerDown = ( e: PointerEvent ) => {

			if ( e.pointerType === 'touch' && this._gizmoDragging ) return;

			( e.target as HTMLElement ).setPointerCapture( e.pointerId );
			this._pointerDownPos = new GLP.Vector( e.clientX, e.clientY );

			// Gizmo軸ヒットテスト
			if ( this._activeGizmo.entity.visible ) {

				const ndc = getNDC( e );
				const cameraEntity = getCameraEntity();

				if ( cameraEntity ) {

					this._raycaster.setFromCamera( ndc, cameraEntity );

					const axisEntities = this._activeGizmo.getAxisEntities();
					let closestHit: { axis: GizmoAxis, distance: number } | null = null;

					for ( const { axis, entity: axisEntity } of axisEntities ) {

						const hits = this._raycaster.intersectEntities( axisEntity );

						if ( hits.length > 0 && ( ! closestHit || hits[ 0 ].distance < closestHit.distance ) ) {

							closestHit = { axis, distance: hits[ 0 ].distance };

						}

					}

					if ( closestHit ) {

						const selectedEntity = this._selectedEntityId
							? this._engine.root.findEntityByUUID( this._selectedEntityId )
							: null;

						if ( selectedEntity ) {

							this._gizmoDragging = true;
							this._orbitControls.enabled = false;

							this._gizmoDragStartValue = {
								position: selectedEntity.position.getElm( 'vec3' ) as number[],
								euler: selectedEntity.euler.getElm( 'vec3' ) as number[],
								scale: selectedEntity.scale.getElm( 'vec3' ) as number[],
							};

							this._activeGizmo.startDrag( closestHit.axis, this._raycaster.ray, selectedEntity );

						}

					}

				}

			}

		};

		const onPointerMove = ( e: PointerEvent ) => {

			if ( ! this._gizmoDragging ) return;

			const selectedEntity = this._selectedEntityId
				? this._engine.root.findEntityByUUID( this._selectedEntityId )
				: null;

			if ( ! selectedEntity ) return;

			const ndc = getNDC( e );
			const cameraEntity = getCameraEntity();

			if ( ! cameraEntity ) return;

			this._raycaster.setFromCamera( ndc, cameraEntity );
			const result = this._activeGizmo.updateDrag( this._raycaster.ray, selectedEntity );

			if ( result ) {

				if ( result.position ) {

					const localPos = result.position.clone();

					if ( selectedEntity.parent ) {

						localPos.applyMatrix4( selectedEntity.parent.matrixWorld.clone().inverse() );

					}

					selectedEntity.position.copy( localPos );

				}

				if ( result.euler ) {

					selectedEntity.euler.set( result.euler.x, result.euler.y, result.euler.z );

				}

				if ( result.scale ) {

					selectedEntity.scale.set( result.scale.x, result.scale.y, result.scale.z );

				}

				selectedEntity.updateMatrix( true );

			}

		};

		const onPointerUp = ( e: PointerEvent ) => {

			if ( this._gizmoDragging ) {

				this._activeGizmo.endDrag();
				this._gizmoDragging = false;
				this._orbitControls.enabled = true;

				const selectedEntity = this._selectedEntityId
					? this._engine.root.findEntityByUUID( this._selectedEntityId )
					: null;

				if ( selectedEntity && this._gizmoDragStartValue ) {

					const fieldName = this._gizmoMode === 'translate' ? 'position'
						: this._gizmoMode === 'rotate' ? 'euler'
							: 'scale';

					const oldValue = this._gizmoDragStartValue[ fieldName ];
					const newValue = selectedEntity[ fieldName ].getElm( 'vec3' ) as number[];

					this._api.commandManager.execute(
						new SetFieldCommand( selectedEntity, fieldName, oldValue, newValue )
					);

				}

				this._gizmoDragStartValue = null;
				this._pointerDownPos = null;

				return;

			}

			if ( ! this._pointerDownPos ) return;

			const dx = e.clientX - this._pointerDownPos.x;
			const dy = e.clientY - this._pointerDownPos.y;
			const dist = Math.sqrt( dx * dx + dy * dy );
			this._pointerDownPos = null;

			if ( dist > 5 ) return;

			const ndc = getNDC( e );
			const cameraEntity = getCameraEntity();

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

		canvasElm.addEventListener( "pointerdown", onPointerDown );
		canvasElm.addEventListener( "pointermove", onPointerMove );
		canvasElm.addEventListener( "pointerup", onPointerUp );

		this.once( "dispose", () => {

			canvasElm.removeEventListener( "pointerdown", onPointerDown );
			canvasElm.removeEventListener( "pointermove", onPointerMove );
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

		this._translateGizmo = new TranslateGizmo();
		this._rotateGizmo = new RotateGizmo();
		this._scaleGizmo = new ScaleGizmo();
		this._gizmoMode = 'translate';
		this._activeGizmo = this._translateGizmo;

		/*-------------------------------
			Helpers
		-------------------------------*/

		this._showHelpers = true;
		this._showEmptyHelpers = true;
		this._showCameraHelpers = true;
		this._showLightHelpers = true;
		this._helpers = new Map();

		/*-------------------------------
			Wireframe
		-------------------------------*/

		this._showWireframe = false;
		this._wireframeGeometryCache = new Map();

		this._wireframeMaterial = new MXP.Material( {
			vert: gizmoVert,
			frag: gizmoFrag,
			drawType: 'LINES',
		} );
		this._wireframeMaterial.uniforms.uColor = { value: [ 0.3, 0.8, 0.3 ], type: '3fv' };
		this._wireframeMaterial.depthTest = true;
		this._wireframeMaterial.depthWrite = false;
		this._wireframeMaterial.visibilityFlag = {
			deferred: false, forward: true,
			shadowMap: false, envMap: false,
			ui: false, postprocess: false
		};

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

			// Gizmoモード切替
			if ( e.key === 'w' ) this.setField( "gizmoMode", "translate" );
			if ( e.key === 'e' ) this.setField( "gizmoMode", "rotate" );
			if ( e.key === 'r' ) this.setField( "gizmoMode", "scale" );

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

		this.field( "gizmoMode", () => this._gizmoMode, ( v: GizmoMode ) => {

			this._gizmoMode = v;

			if ( v === 'translate' ) this._activeGizmo = this._translateGizmo;
			else if ( v === 'rotate' ) this._activeGizmo = this._rotateGizmo;
			else this._activeGizmo = this._scaleGizmo;

		} );

		const helperDir = this.fieldDir( "helpers" );
		helperDir.field( "show", () => this._showHelpers, v => this._showHelpers = v );
		helperDir.field( "empty", () => this._showEmptyHelpers, v => this._showEmptyHelpers = v );
		helperDir.field( "camera", () => this._showCameraHelpers, v => this._showCameraHelpers = v );
		helperDir.field( "light", () => this._showLightHelpers, v => this._showLightHelpers = v );
		helperDir.field( "wireframe", () => this._showWireframe, v => this._showWireframe = v );

		const cameraDir = this.fieldDir( "camera" );
		cameraDir.field( "position",
			() => [ this._orbitControls.eye.x, this._orbitControls.eye.y, this._orbitControls.eye.z ],
			( v: number[] ) => {

				this._orbitControls.setPosition(
					new GLP.Vector( v[ 0 ], v[ 1 ], v[ 2 ] ),
					new GLP.Vector( this._orbitControls.target.x, this._orbitControls.target.y, this._orbitControls.target.z )
				);

			}
		);
		cameraDir.field( "target",
			() => [ this._orbitControls.target.x, this._orbitControls.target.y, this._orbitControls.target.z ],
			( v: number[] ) => {

				this._orbitControls.setPosition(
					new GLP.Vector( this._orbitControls.eye.x, this._orbitControls.eye.y, this._orbitControls.eye.z ),
					new GLP.Vector( v[ 0 ], v[ 1 ], v[ 2 ] )
				);

			}
		);

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

		// helper update
		this._updateHelpers();

		// wireframe
		this._renderWireframe();

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
		Helpers
	-------------------------------*/

	private _updateHelpers() {

		if ( ! this._showHelpers || this._cameraMode !== "scene" ) return;

		const cameraEntity = this._useEditorCamera
			? this._editorCameraEntity
			: this._engine.cameraEntity;

		if ( ! cameraEntity ) return;

		const activeUUIDs = new Set<string>();
		const helperEntities: MXP.Entity[] = [];

		this._engine.root.traverse( ( entity ) => {

			if ( entity.initiator === "god" ) return;
			if ( ! entity.visible ) return;

			const helperType = this._getHelperType( entity );
			if ( ! helperType ) return;
			if ( ! this._isHelperTypeEnabled( helperType ) ) return;

			activeUUIDs.add( entity.uuid );

			let helper = this._helpers.get( entity.uuid );

			if ( ! helper ) {

				helper = new EntityHelper( helperType, entity.uuid );
				this._helpers.set( entity.uuid, helper );

			}

			helper.syncTransform( entity );

			const event = this._engine.createEntityUpdateEvent();
			helper.entity.update( event );

			helper.entity.traverse( ( child ) => {

				if ( child.getComponent( MXP.Mesh ) ) {

					helperEntities.push( child );

				}

			} );

		} );

		this._helpers.forEach( ( _, uuid ) => {

			if ( ! activeUUIDs.has( uuid ) ) {

				this._helpers.delete( uuid );

			}

		} );

		if ( helperEntities.length > 0 ) {

			this._engine.renderer.renderCamera(
				"forward",
				cameraEntity,
				helperEntities,
				null,
				this._engine.renderer.resolution,
				{ disableClear: true }
			);

		}

	}

	private _getHelperType( entity: MXP.Entity ): HelperType | null {

		const light = entity.getComponent( MXP.Light );

		if ( light ) {

			return light.lightType === 'spot' ? 'spotLight' : 'directionalLight';

		}

		const camera = entity.getComponentsByTag<MXP.Camera>( "camera" )[ 0 ];

		if ( camera ) return 'camera';

		const mesh = entity.getComponent( MXP.Mesh );

		if ( ! mesh ) return 'empty';

		return null;

	}

	private _isHelperTypeEnabled( type: HelperType ): boolean {

		switch ( type ) {

		case 'empty': return this._showEmptyHelpers;
		case 'camera': return this._showCameraHelpers;
		case 'spotLight':
		case 'directionalLight': return this._showLightHelpers;

		}

	}

	/*-------------------------------
		Wireframe
	-------------------------------*/

	private _renderWireframe() {

		if ( ! this._showWireframe || this._cameraMode !== "scene" ) return;

		const cameraEntity = this._useEditorCamera
			? this._editorCameraEntity
			: this._engine.cameraEntity;

		if ( ! cameraEntity ) return;

		const stack = this._engine.renderer.getRenderStack( this._engine.root );
		const meshEntities = [ ...stack.deferred, ...stack.forward ];

		const origMaterials: Map<MXP.Entity, MXP.Material> = new Map();
		const origGeometries: Map<MXP.Entity, MXP.Geometry> = new Map();

		for ( const entity of meshEntities ) {

			const mesh = entity.getComponent( MXP.Mesh );
			if ( ! mesh ) continue;

			origMaterials.set( entity, mesh.material );
			origGeometries.set( entity, mesh.geometry );

			mesh.material = this._wireframeMaterial;

			let wireGeo = this._wireframeGeometryCache.get( mesh.geometry );

			if ( ! wireGeo ) {

				wireGeo = this._createWireframeGeometry( mesh.geometry );
				this._wireframeGeometryCache.set( mesh.geometry, wireGeo );

			}

			mesh.geometry = wireGeo;

		}

		this._engine.renderer.renderCamera(
			"forward",
			cameraEntity,
			meshEntities,
			null,
			this._engine.renderer.resolution,
			{ disableClear: true }
		);

		for ( const entity of meshEntities ) {

			const mesh = entity.getComponent( MXP.Mesh );
			if ( ! mesh ) continue;

			const origMat = origMaterials.get( entity );
			const origGeo = origGeometries.get( entity );

			if ( origMat ) mesh.material = origMat;
			if ( origGeo ) mesh.geometry = origGeo;

		}

	}

	private _createWireframeGeometry( srcGeometry: MXP.Geometry ): MXP.Geometry {

		const geo = new MXP.Geometry();
		const posAttr = srcGeometry.getAttribute( 'position' );
		const indexAttr = srcGeometry.getAttribute( 'index' );

		if ( ! posAttr ) return geo;

		geo.setAttribute( 'position', posAttr.array, 3 );

		const normalAttr = srcGeometry.getAttribute( 'normal' );

		if ( normalAttr ) {

			geo.setAttribute( 'normal', normalAttr.array, 3 );

		}

		if ( indexAttr ) {

			const indices = indexAttr.array;
			const edgeSet = new Set<string>();
			const lineIndices: number[] = [];

			for ( let i = 0; i < indices.length; i += 3 ) {

				const a = indices[ i ];
				const b = indices[ i + 1 ];
				const c = indices[ i + 2 ];

				const edges = [
					[ Math.min( a, b ), Math.max( a, b ) ],
					[ Math.min( b, c ), Math.max( b, c ) ],
					[ Math.min( c, a ), Math.max( c, a ) ],
				];

				for ( const [ e0, e1 ] of edges ) {

					const key = `${e0}_${e1}`;

					if ( ! edgeSet.has( key ) ) {

						edgeSet.add( key );
						lineIndices.push( e0, e1 );

					}

				}

			}

			geo.setAttribute( 'index', new Uint16Array( lineIndices ), 1 );

		}

		return geo;

	}

	/*-------------------------------
		Gizmo
	-------------------------------*/

	private _updateGizmo() {

		const selectedEntity = this._selectedEntityId
			? this._engine.root.findEntityByUUID( this._selectedEntityId )
			: null;

		// 全Gizmoを非表示にしてからアクティブなもののみ更新
		this._translateGizmo.entity.visible = false;
		this._rotateGizmo.entity.visible = false;
		this._scaleGizmo.entity.visible = false;

		this._activeGizmo.setTarget( selectedEntity || null );

		if ( this._activeGizmo.entity.visible ) {

			// update gizmo matrices
			this._activeGizmo.entity.updateMatrix( true );

			const event = this._engine.createEntityUpdateEvent();
			this._activeGizmo.entity.update( event );

			// render gizmo
			const cameraEntity = this._useEditorCamera
				? this._editorCameraEntity
				: this._engine.cameraEntity;

			if ( cameraEntity ) {

				const gizmoEntities: MXP.Entity[] = [];

				this._activeGizmo.entity.traverse( ( child ) => {

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
