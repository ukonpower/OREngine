import { setupCameraPostProcess } from '@or-renderer';
import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import { LookAt } from '../LookAt';

// フォーカス距離の決め方。auto=画面中心の深度 / target=focus/targetのエンティティ / manual=距離を直接指定
export type FocusMode = 'auto' | 'target' | 'manual';

export class CameraController extends MXP.Component {

	private _lookAt: LookAt;
	private _lookAtTargetUUID: string | null;

	private _dofTarget: MXP.Entity | null;
	private _dofTargetUUID: string | null;
	private _tmpVector1: MTP.Vector;
	private _tmpVector2: MTP.Vector;

	private _focusMode: FocusMode;
	private _focusDistance: number;
	private _focusSpeed: number;
	// スムージング済みの現在値。初回フレームで目標値へスナップする
	private _focusCurrent: number | null;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// LookAt

		this._lookAt = this.entity.addComponent( LookAt );
		this._lookAtTargetUUID = null;

		const lookAtDir = this.fieldDir( 'lookAt' );

		lookAtDir.field( 'target', () => this._lookAtTargetUUID, ( v: string | null ) => {

			this._lookAtTargetUUID = v || null;
			this._lookAt.setTarget( null );

		}, { format: { type: 'entity' } } );

		// DoF

		this._dofTarget = null;
		this._dofTargetUUID = null;
		this._tmpVector1 = new MTP.Vector();
		this._tmpVector2 = new MTP.Vector();

		this._focusMode = 'auto';
		this._focusDistance = 5;
		this._focusSpeed = 8;
		this._focusCurrent = null;

		const focusDir = this.fieldDir( 'focus' );

		focusDir.field( 'mode', () => this._focusMode, ( v: FocusMode ) => {

			this._focusMode = v;

		}, { format: { type: 'select', list: [ 'auto', 'target', 'manual' ] } } );

		focusDir.field( 'target', () => this._dofTargetUUID, ( v: string | null ) => {

			this._dofTargetUUID = v || null;
			this._dofTarget = null;

		}, { format: { type: 'entity' } } );

		focusDir.field( 'distance', () => this._focusDistance, ( v: number ) => {

			this._focusDistance = v;

		}, { step: 0.1 } );

		focusDir.field( 'speed', () => this._focusSpeed, ( v: number ) => {

			this._focusSpeed = v;

		}, { step: 0.5 } );

		// カメラ標準ポストプロセス（実体はバックエンドごとの実装に委ねる）

		const removeCameraPostProcess = setupCameraPostProcess( this.engine as any, this.entity );

		this.once( "dispose", () => {

			removeCameraPostProcess();

		} );

	}

	// UUID からターゲットのエンティティを引く。
	// デシリアライズはコンポーネントを作り終えてから親へ add するため、
	// コンストラクタの時点では自分がまだシーンツリーに繋がっておらず解決できない
	private _resolveTargets() {

		if ( ! this._lookAtTargetUUID && ! this._dofTargetUUID ) return;

		const root = this.entity.getRootEntity();

		if ( this._lookAtTargetUUID && ! this._lookAt.target ) {

			this._lookAt.setTarget( root.findEntityByUUID( this._lookAtTargetUUID ) || null );

		}

		if ( this._dofTargetUUID && ! this._dofTarget ) {

			this._dofTarget = root.findEntityByUUID( this._dofTargetUUID ) || null;

		}

	}

	protected updateImpl(): void {

		this._resolveTargets();

	}

	/*-------------------------------
		スクリプト制御用アクセサ
	-------------------------------*/

	public get focusMode() {

		return this._focusMode;

	}

	public set focusMode( mode: FocusMode ) {

		this._focusMode = mode;

	}

	// manualモードで狙うフォーカス距離（ビュー空間深度）
	public get focusDistance() {

		return this._focusDistance;

	}

	public set focusDistance( distance: number ) {

		this._focusDistance = distance;

	}

	// ピント送りの速さ（1/s）。0以下で即時
	public get focusSpeed() {

		return this._focusSpeed;

	}

	public set focusSpeed( speed: number ) {

		this._focusSpeed = speed;

	}

	protected prepareRenderImpl( event: MXP.ComponentUpdateEvent ): void {

		const camera = this.entity.getComponentsByTag<MXP.Camera>( "camera" )[ 0 ];

		if ( ! camera ) return;

		const target = this._resolveFocusTarget( event );

		if ( target === null ) return;

		if ( this._focusCurrent === null || this._focusSpeed <= 0 ) {

			this._focusCurrent = target;

		} else {

			this._focusCurrent += ( target - this._focusCurrent ) * ( 1 - Math.exp( - this._focusSpeed * event.timeDelta ) );

		}

		camera.dofParams.focusDistance = this._focusCurrent;

	}

	// モードに応じた目標フォーカス距離。決められないフレームは null（現状維持）
	private _resolveFocusTarget( event: MXP.ComponentUpdateEvent ): number | null {

		if ( this._focusMode === 'manual' ) return this._focusDistance;

		if ( this._focusMode === 'auto' ) {

			const depth = event.renderer.centerDepth;

			if ( typeof depth === 'number' ) return depth;

			// 深度リードバック非対応のバックエンドではtargetへフォールバックする

		}

		if ( ! this._dofTarget ) return null;

		// CoCの比較軸に合わせ、ユークリッド距離ではなく視線方向のビュー空間深度を使う
		this.entity.matrixWorld.decompose( this._tmpVector1 );
		this._dofTarget.matrixWorld.decompose( this._tmpVector2 );
		this._tmpVector2.sub( this._tmpVector1 );

		const m = this.entity.matrixWorld.elm;

		this._tmpVector1.set( m[ 8 ], m[ 9 ], m[ 10 ] ).normalize();

		return - this._tmpVector2.dot( this._tmpVector1 );

	}

	public dispose(): void {

		super.dispose();

		this.entity.removeComponent( LookAt );

	}

}
