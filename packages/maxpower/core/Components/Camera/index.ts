import * as MTP from 'mathpower';

import { Component, ComponentParams, ComponentUpdateEvent } from "../../Component";

import type { Entity } from "../../Entity";

export type CameraType = 'perspective' | 'orthographic'

// ピント距離の決め方。auto=画面中心の深度 / target=focus/targetのエンティティ / manual=距離を直接指定
export type FocusMode = 'auto' | 'target' | 'manual';

export type DofParams = {
	focusDistance: number;
	kFilmHeight: number;
	// 絞りのF値。小さいほどボケが大きい
	fNumber: number;
}

export class Camera extends Component {

	public cameraType: CameraType;

	public fov: number;
	public aspect: number;
	public near: number;
	public far: number;

	// 並行投影で見える縦方向の全幅（ワールド単位）。横幅は aspect から決まる
	public orthHeight: number;

	public projectionMatrix: MTP.Matrix;
	public viewMatrix: MTP.Matrix;

	public projectionMatrixPrev: MTP.Matrix;
	public viewMatrixPrev: MTP.Matrix;
	private _historyInitialized: boolean;

	public needsUpdateProjectionMatrix: boolean;

	public displayOut: boolean;

	public viewPort: MTP.Vector | null;

	public dofParams: DofParams;

	// ピント制御。ShadowMapCamera のように DoF を使わないカメラは false にする
	public focusEnabled: boolean;
	public focusMode: FocusMode;
	public focusTarget: Entity | null;
	private _focusTargetUUID: string | null;
	// manual モードで狙うフォーカス距離（ビュー空間深度）
	public focusManualDistance: number;
	// ピント送りの速さ（1/s）。0以下で即時
	public focusSpeed: number;
	// スムージング済みの現在値。初回フレームで目標値へスナップする
	private _focusCurrent: number | null;
	private _tmpVector1: MTP.Vector;
	private _tmpVector2: MTP.Vector;

	constructor( params: ComponentParams ) {

		super( params );

		this.cameraType = 'perspective';

		this.viewMatrix = new MTP.Matrix();
		this.projectionMatrix = new MTP.Matrix();

		this.viewMatrixPrev = new MTP.Matrix();
		this.projectionMatrixPrev = new MTP.Matrix();
		this._historyInitialized = false;

		this.viewPort = null;

		this.fov = 50;
		this.near = 0.1;
		this.far = 1000;
		this.aspect = 1.0;

		this.orthHeight = 1;

		this.needsUpdateProjectionMatrix = true;
		this.displayOut = true;

		this.dofParams = {
			focusDistance: 0.5,
			// 35mm フルサイズ（36mm x 24mm）の高さ。KinoBokeh の kFilmHeight と同じ
			kFilmHeight: 0.024,
			fNumber: 0.3,
		};

		const markDirty = () => {

			this.needsUpdateProjectionMatrix = true;

		};

		this.field( "cameraType", () => this.cameraType, ( v ) => {

			this.cameraType = v;
			markDirty();

		}, { format: { type: "select", list: [ "perspective", "orthographic" ] } } );

		this.field( "fov", () => this.fov, ( v ) => {

			this.fov = v;
			markDirty();

		} );

		this.field( "near", () => this.near, ( v ) => {

			this.near = v;
			markDirty();

		} );

		this.field( "far", () => this.far, ( v ) => {

			this.far = v;
			markDirty();

		} );

		this.field( "orthHeight", () => this.orthHeight, ( v ) => {

			this.orthHeight = v;
			markDirty();

		} );

		// focus

		this.focusEnabled = true;
		this.focusMode = 'auto';
		this.focusTarget = null;
		this._focusTargetUUID = null;
		this.focusManualDistance = 5;
		this.focusSpeed = 8;
		this._focusCurrent = null;
		this._tmpVector1 = new MTP.Vector();
		this._tmpVector2 = new MTP.Vector();

		const focusDir = this.fieldDir( 'focus' );

		focusDir.field( 'mode', () => this.focusMode, ( v: FocusMode ) => {

			this.focusMode = v;

		}, { format: { type: 'select', list: [ 'auto', 'target', 'manual' ] } } );

		focusDir.field( 'target', () => this._focusTargetUUID, ( v: string | null ) => {

			this._focusTargetUUID = v || null;
			this.focusTarget = null;

		}, { format: { type: 'entity' } } );

		focusDir.field( 'distance', () => this.focusManualDistance, ( v: number ) => {

			this.focusManualDistance = v;

		}, { step: 0.1 } );

		focusDir.field( 'speed', () => this.focusSpeed, ( v: number ) => {

			this.focusSpeed = v;

		}, { step: 0.5 } );

		// 絞り。小さいほどボケる
		focusDir.field( 'fNumber', () => this.dofParams.fNumber, ( v: number ) => {

			this.dofParams.fNumber = v;

		}, { step: 0.05 } );

		this._tag = "camera";

	}

	public updateProjectionMatrix() {

		if ( this.cameraType == 'perspective' ) {

			this.projectionMatrix.perspective( this.fov, this.aspect, this.near, this.far );

		} else {

			this.projectionMatrix.orthographic( this.orthHeight * this.aspect, this.orthHeight, this.near, this.far );

		}

		this.needsUpdateProjectionMatrix = false;

	}

	public updateViewMatrix() {

		this.viewMatrix.copy( this.entity.matrixWorld ).inverse();

	}

	protected updateImpl( event: ComponentUpdateEvent ): void {

		this._resolveFocusTarget();

		if ( this.displayOut ) {

			const newAspect = event.resolution.x / event.resolution.y;

			if ( this.aspect !== newAspect ) {

				this.aspect = newAspect;
				this.needsUpdateProjectionMatrix = true;

			}

		}

	}

	protected prepareRenderImpl( event: ComponentUpdateEvent ): void {

		this.updateViewMatrix();

		if ( this.needsUpdateProjectionMatrix ) {

			this.updateProjectionMatrix();

		}

		if ( this.focusEnabled ) {

			this._updateFocus( event );

		}

		if ( ! this._historyInitialized ) {

			this.viewMatrixPrev.copy( this.viewMatrix );
			this.projectionMatrixPrev.copy( this.projectionMatrix );
			this._historyInitialized = true;

		}

	}

	// UUID から focus/target のエンティティを引く。
	// デシリアライズはコンポーネントを作り終えてから親へ add するため、
	// コンストラクタの時点では自分がまだシーンツリーに繋がっておらず解決できない
	private _resolveFocusTarget() {

		if ( ! this._focusTargetUUID || this.focusTarget ) return;

		const root = this.entity.getRootEntity();

		this.focusTarget = root.findEntityByUUID( this._focusTargetUUID ) || null;

	}

	// 目標のピント距離へ dofParams.focusDistance を寄せる
	private _updateFocus( event: ComponentUpdateEvent ) {

		const target = this._calcFocusDistance( event );

		if ( target === null ) return;

		if ( this._focusCurrent === null || this.focusSpeed <= 0 ) {

			this._focusCurrent = target;

		} else {

			this._focusCurrent += ( target - this._focusCurrent ) * ( 1 - Math.exp( - this.focusSpeed * event.timeDelta ) );

		}

		this.dofParams.focusDistance = this._focusCurrent;

	}

	// モードに応じた目標フォーカス距離。決められないフレームは null（現状維持）
	private _calcFocusDistance( event: ComponentUpdateEvent ): number | null {

		if ( this.focusMode === 'manual' ) return this.focusManualDistance;

		if ( this.focusMode === 'auto' ) {

			const depth = event.renderer.centerDepth;

			if ( typeof depth === 'number' ) return depth;

			// 深度リードバック非対応のバックエンドではtargetへフォールバックする

		}

		if ( ! this.focusTarget ) return null;

		// CoCの比較軸に合わせ、ユークリッド距離ではなく視線方向のビュー空間深度を使う
		this.entity.matrixWorld.decompose( this._tmpVector1 );
		this.focusTarget.matrixWorld.decompose( this._tmpVector2 );
		this._tmpVector2.sub( this._tmpVector1 );

		const m = this.entity.matrixWorld.elm;

		this._tmpVector1.set( m[ 8 ], m[ 9 ], m[ 10 ] ).normalize();

		return - this._tmpVector2.dot( this._tmpVector1 );

	}

	protected commitFrameImpl( _event: ComponentUpdateEvent ): void {

		this.viewMatrixPrev.copy( this.viewMatrix );
		this.projectionMatrixPrev.copy( this.projectionMatrix );

	}

}
