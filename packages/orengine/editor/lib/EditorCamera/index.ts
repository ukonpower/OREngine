import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { OrbitControls } from '../../../builtin/Components/Camera/OrbitControls';
import { Engine } from '../../../core/Engine';

export class EditorCamera {

	private _entity: MXP.Entity;
	private _camera: MXP.Camera;
	private _orbitControls: OrbitControls;
	private _useEditorCamera: boolean;
	private _cameraMode: "scene" | "preview";

	constructor( engine: Engine ) {

		this._entity = engine.createEntity( { name: "__editorCamera" } );
		this._camera = this._entity.addComponent( MXP.Camera );
		this._orbitControls = this._entity.addComponent( OrbitControls );
		this._orbitControls.setElm( engine.canvas as HTMLCanvasElement );
		this._orbitControls.enabled = true;
		this._useEditorCamera = true;
		this._cameraMode = "scene";
		engine.cameraEntity = this._entity;
		this._applyEditorPipelineConfig( engine );
		this._syncFromScene( engine );

	}

	public get entity() {

		return this._entity;

	}

	public get camera() {

		return this._camera;

	}

	public get orbitControls() {

		return this._orbitControls;

	}

	public get useEditorCamera() {

		return this._useEditorCamera;

	}

	public get cameraMode() {

		return this._cameraMode;

	}

	public setCameraMode( v: "scene" | "preview", engine: Engine ) {

		this._cameraMode = v;

		if ( v === "scene" ) {

			this._syncFromScene( engine );
			engine.cameraEntity = this._entity;
			this._orbitControls.enabled = true;
			this._useEditorCamera = true;
			this._applyEditorPipelineConfig( engine );

		} else {

			engine.cameraEntity = null;
			this._orbitControls.enabled = false;
			this._useEditorCamera = false;
			engine.renderer.applyPipelineConfig( engine.renderer.pipelineConfig );

		}

	}

	// エディタカメラ操作中はmotionBlur / dofを無効化する（sceneの設定値は変更しない）
	private _applyEditorPipelineConfig( engine: Engine ) {

		engine.renderer.applyPipelineConfig( { ...engine.renderer.pipelineConfig, motionBlur: false, dof: false } );

	}

	public getCameraEntity( engine: Engine ): MXP.Entity | null {

		return this._useEditorCamera ? this._entity : engine.cameraEntity;

	}

	public updateBeforeRender( engine: Engine ) {

		if ( ! this._useEditorCamera ) return;

		const event = engine.createEntityUpdateEvent();
		this._entity.updateMatrix();

		this._camera.aspect = engine.renderer.resolution.x / engine.renderer.resolution.y;
		this._camera.needsUpdateProjectionMatrix = true;

		this._entity.update( event );
		this._entity.onBeforeRender( event );

	}

	public updateAfterRender( engine: Engine ) {

		if ( ! this._useEditorCamera ) return;

		const event = engine.createEntityUpdateEvent();
		this._entity.onAfterRender( event );

	}

	public resize( resolution: GLP.Vector ) {

		this._camera.aspect = resolution.x / resolution.y;
		this._camera.needsUpdateProjectionMatrix = true;

	}

	public dispose() {

		this._entity.dispose();

	}

	private _syncFromScene( engine: Engine ) {

		const sceneCamera = engine.root.findEntityByName( "Camera" );

		if ( sceneCamera ) {

			const pos = new GLP.Vector();
			sceneCamera.matrixWorld.decompose( pos );

			this._orbitControls.setPosition( pos, new GLP.Vector( 0, 0, 0 ) );

		}

	}

}
