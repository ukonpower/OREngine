import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import { OrbitControls } from '../../../builtin/Components/Camera/OrbitControls';
import { Engine } from '../../../core/Engine';

// エディタカメラ使用中は無効化するポストエフェクト。オービット操作のブレとフォーカス外れが出るため
const EDITOR_PIPELINE_OVERRIDE = { motionBlur: false, dof: false };

// フォーカスの寄り具合。境界球がちょうど画面に収まる距離に対する倍率
const FOCUS_MARGIN = 1.3;
// ジオメトリを持たないエンティティ（Empty / Light）をフォーカスしたときの半径
const FOCUS_EMPTY_RADIUS = 1.0;
// 平面や点のように潰れた境界でカメラがめり込まないようにする下限
const FOCUS_MIN_RADIUS = 0.1;

// 「どのカメラで見るか（view）」と「プレビュー（完成見た目の確認）」は独立した軸。
// プレビュー中はシーンカメラ固定・本番同等パイプラインになる
export class EditorCamera {

	private _entity: MXP.Entity;
	private _camera: MXP.Camera;
	private _orbitControls: OrbitControls;
	private _view: "editor" | "camera";
	private _preview: boolean;

	constructor( engine: Engine ) {

		this._entity = engine.createEntity( { name: "__editorCamera" } );
		this._camera = this._entity.addComponent( MXP.Camera );
		this._orbitControls = this._entity.addComponent( OrbitControls );
		this._orbitControls.setElm( engine.canvas as HTMLCanvasElement );
		this._view = "editor";
		this._preview = false;
		this._apply( engine );

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

	public get view() {

		return this._view;

	}

	public get preview() {

		return this._preview;

	}

	// エディタカメラで見ているか（プレビュー中とシーンカメラ視点では false）
	public get usingEditorCamera() {

		return ! this._preview && this._view === "editor";

	}

	public setView( v: "editor" | "camera", engine: Engine ) {

		this._view = v;
		this._apply( engine );

	}

	public setPreview( v: boolean, engine: Engine ) {

		this._preview = v;
		this._apply( engine );

	}

	// view / preview の現在値をエンジンへ反映する
	private _apply( engine: Engine ) {

		if ( this.usingEditorCamera ) {

			// シーンカメラの見た目から切り替わる瞬間だけ姿勢を引き継ぎ、視点が飛ばないようにする
			if ( engine.cameraEntity !== this._entity ) {

				this.syncFromSceneCamera( engine );

			}

			engine.cameraEntity = this._entity;
			this._orbitControls.enabled = true;

		} else {

			engine.cameraEntity = null;
			this._orbitControls.enabled = false;

		}

		this.syncPipelineOverride( engine );

	}

	// 現在の状態に応じたパイプラインの上書きをレンダラーへ反映する
	public syncPipelineOverride( engine: Engine ) {

		engine.renderer.setPipelineOverride( this.usingEditorCamera ? EDITOR_PIPELINE_OVERRIDE : null );

	}

	// エンティティの境界球が画面に収まる位置へ、今の視線方向を保ったまま寄る
	public focus( entity: MXP.Entity ) {

		entity.updateMatrixRecursive( true );

		const bounds = this._getWorldBounds( entity );
		const center = new MTP.Vector();
		let radius = FOCUS_EMPTY_RADIUS;

		if ( bounds ) {

			center.copy( bounds.min ).add( bounds.max ).multiply( 0.5 );
			radius = Math.max( bounds.max.clone().sub( bounds.min ).length() * 0.5, FOCUS_MIN_RADIUS );

		} else {

			entity.matrixWorld.decompose( center );

		}

		// fov は度。半画角の tan で「半径 radius が画面の縦半分に収まる距離」になる
		const distance = radius / Math.tan( this._camera.fov * Math.PI / 360 ) * FOCUS_MARGIN;

		const dir = this._orbitControls.eye.clone().sub( this._orbitControls.target );

		if ( dir.length() < 1e-6 ) dir.set( 0, 0, 1 );

		dir.normalize().multiply( distance );

		this._orbitControls.setPosition( center.clone().add( dir ), center );

	}

	// 子孫のメッシュから、ワールド空間の境界ボックスを求める
	private _getWorldBounds( entity: MXP.Entity ) {

		const min = new MTP.Vector( Infinity, Infinity, Infinity );
		const max = new MTP.Vector( - Infinity, - Infinity, - Infinity );
		let found = false;

		entity.traverse( ( child ) => {

			if ( ! child.visible ) return;

			const mesh = child.getComponent( MXP.Mesh );

			if ( ! mesh ) return;

			const box = mesh.geometry.boundingBox;

			if ( ! box ) return;

			// ローカルの箱は回転すると軸に沿わなくなるので、8頂点を移してから取り直す
			for ( let i = 0; i < 8; i ++ ) {

				const p = new MTP.Vector(
					i & 1 ? box.max.x : box.min.x,
					i & 2 ? box.max.y : box.min.y,
					i & 4 ? box.max.z : box.min.z,
				).applyMatrix4AsPosition( child.matrixWorld );

				min.x = Math.min( min.x, p.x );
				min.y = Math.min( min.y, p.y );
				min.z = Math.min( min.z, p.z );
				max.x = Math.max( max.x, p.x );
				max.y = Math.max( max.y, p.y );
				max.z = Math.max( max.z, p.z );

			}

			found = true;

		} );

		return found ? { min, max } : null;

	}

	public getCameraEntity( engine: Engine ): MXP.Entity | null {

		return engine.resolveCameraEntity();

	}

	public updateBeforeRender( engine: Engine ) {

		if ( ! this.usingEditorCamera ) return;

		const event = engine.createEntityUpdateEvent();
		this._entity.updateMatrix();

		this._camera.aspect = engine.renderer.resolution.x / engine.renderer.resolution.y;
		this._camera.needsUpdateProjectionMatrix = true;

		this._entity.update( event );
		this._entity.postUpdate( event );
		this._entity.updateMatrixRecursive();
		this._entity.prepareRender( event );

	}

	public updateAfterRender( engine: Engine ) {

		if ( ! this.usingEditorCamera ) return;

		const event = engine.createEntityUpdateEvent();
		this._entity.commitFrame( event );

	}

	public resize( resolution: MTP.Vector ) {

		this._camera.aspect = resolution.x / resolution.y;
		this._camera.needsUpdateProjectionMatrix = true;

	}

	public dispose() {

		this._entity.dispose();

	}

	// シーンのアクティブカメラの姿勢と投影パラメータをエディタカメラへ写す
	public syncFromSceneCamera( engine: Engine ) {

		const sceneCameraEntity = engine.findSceneCameraEntity();

		if ( ! sceneCameraEntity ) return;

		const eye = new MTP.Vector();
		sceneCameraEntity.matrixWorld.decompose( eye );

		const sceneCamera = sceneCameraEntity.getComponentsByTag<MXP.Camera>( "camera" )[ 0 ];

		this._orbitControls.setPosition( eye, this._resolveOrbitTarget( sceneCameraEntity, sceneCamera, eye ) );

		if ( sceneCamera ) {

			this._camera.fov = sceneCamera.fov;
			this._camera.near = sceneCamera.near;
			this._camera.far = sceneCamera.far;
			this._camera.needsUpdateProjectionMatrix = true;

		}

	}

	// オービットの注視点を、シーンカメラのDOFピント位置に取る。ピントの合っている被写体がそのまま回転の軸になる
	private _resolveOrbitTarget( sceneCameraEntity: MXP.Entity, sceneCamera: MXP.Camera | undefined, eye: MTP.Vector ) {

		// focusDistance はビュー空間深度なので、光軸に沿って進めた点がそのままピント位置になる。
		// 0 だと eye と target が一致してオービットが壊れるため下限を入れる
		const distance = Math.max( sceneCamera ? sceneCamera.dofParams.focusDistance : 5.0, 0.1 );

		const forward = new MTP.Vector( 0, 0, - 1, 0 ).applyMatrix3( sceneCameraEntity.matrixWorld ).normalize();

		return eye.clone().add( forward.multiply( distance ) );

	}

}
