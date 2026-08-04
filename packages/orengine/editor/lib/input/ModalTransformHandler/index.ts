import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Engine } from '../../../../core/Engine';
import { SetFieldCommand } from '../../command/Commands/SetFieldCommand';
import { EditorCamera } from '../../EditorCamera';
import { composeLocalQuat, getWorldQuaternion, intersectRayPlane, projectRayOnLine, quaternionFromAxisAngle, rotateVector } from '../../transform/TransformUtils';
import { clientToNDC, ndcToClient } from '../PointerUtils';

import type { EditorAPI } from '../../EditorAPI';
import type { GizmoAxis } from '../../gizmo/Gizmo';
import type { TransformOrientation } from '../../transform/TransformUtils';

export type ModalTransformMode = 'translate' | 'rotate' | 'scale';

type Constraint = {
	axis: GizmoAxis;
	orientation: TransformOrientation;
	// true なら axis を法線とする平面拘束（Blender の Shift+Z = XY 平面）
	plane: boolean;
};

type ModalSession = {
	mode: ModalTransformMode;
	entity: MXP.Entity;
	constraint: Constraint | null;
	numberBuffer: string;
	trackball: boolean;
	trackballQuat: GLP.Quaternion;
	trackballPointer: GLP.Vector;
	startValue: { position: number[], euler: number[], scale: number[] };
	startWorldPos: GLP.Vector;
	startWorldQuat: GLP.Quaternion;
	parentWorldInv: GLP.Matrix;
	parentWorldQuatInv: GLP.Quaternion;
	camForward: GLP.Vector;
	camRight: GLP.Vector;
	camUp: GLP.Vector;
	camWorldPos: GLP.Vector;
	centerClient: GLP.Vector;
	startPointer: GLP.Vector;
	lastPointer: GLP.Vector;
	disposeSession: () => void;
};

// スケール比の分母（開始点と中心の距離, px）の下限。中心を掴んで始めたときの発散を防ぐ
const MIN_CENTER_DISTANCE = 1.0;

// スケール倍率の下限。0 やマイナスのスケールで行列が潰れるのを防ぐ（数値入力にはミラー用途があるので掛けない）
const MIN_SCALE_RATIO = 0.001;

// トラックボールの感度（rad/px）
const TRACKBALL_SPEED = 0.007;

// mode と Entity の Serializable field の対応（確定時に積む Command の path）
const FIELD_NAME: Record<ModalTransformMode, 'position' | 'euler' | 'scale'> = {
	translate: 'position',
	rotate: 'euler',
	scale: 'scale',
};

const AXES: readonly GizmoAxis[] = [ 'x', 'y', 'z' ];

export class ModalTransformHandler {

	private _engine: Engine;
	private _editorCamera: EditorCamera;
	private _api: EditorAPI;
	private _getSelectedEntity: () => MXP.Entity | null;
	private _isPointerBusy: () => boolean;
	private _onStatusChange: ( status: string | null ) => void;
	private _canvas: HTMLCanvasElement;
	private _raycaster: MXP.Raycaster;
	private _pointerClient: GLP.Vector;
	private _session: ModalSession | null;
	private _disposeListeners: () => void;

	constructor( param: {
		engine: Engine,
		editorCamera: EditorCamera,
		api: EditorAPI,
		getSelectedEntity: () => MXP.Entity | null,
		isPointerBusy: () => boolean,
		onStatusChange: ( status: string | null ) => void,
	} ) {

		this._engine = param.engine;
		this._editorCamera = param.editorCamera;
		this._api = param.api;
		this._getSelectedEntity = param.getSelectedEntity;
		this._isPointerBusy = param.isPointerBusy;
		this._onStatusChange = param.onStatusChange;

		this._canvas = param.engine.canvas as HTMLCanvasElement;
		this._raycaster = new MXP.Raycaster();
		this._pointerClient = new GLP.Vector();
		this._session = null;

		// モーダルは押した瞬間のマウス位置を基準にするので、アイドル中も位置だけ追い続ける
		const onGlobalMove = ( e: PointerEvent ) => {

			this._pointerClient.set( e.clientX, e.clientY );

		};

		window.addEventListener( 'pointermove', onGlobalMove );

		this._disposeListeners = () => {

			window.removeEventListener( 'pointermove', onGlobalMove );

		};

	}

	public get active(): boolean {

		return this._session !== null;

	}

	/*-------------------------------
		Key
	-------------------------------*/

	// KeyboardHandler から委譲されるキー処理。消費したら true（モーダル中は他ショートカットへ渡さない）
	public handleKeyDown( e: KeyboardEvent ): boolean {

		const session = this._session;

		if ( ! session ) {

			if ( e.metaKey || e.ctrlKey || e.altKey || e.shiftKey ) return false;

			const key = e.key.toLowerCase();
			const mode: ModalTransformMode | null = key === 'g' ? 'translate'
				: key === 'r' ? 'rotate'
					: key === 's' ? 'scale'
						: null;

			if ( ! mode ) return false;

			return this._start( mode );

		}

		const key = e.key.toLowerCase();

		if ( e.key === 'Enter' ) {

			this._confirm();

		} else if ( e.key === 'Escape' ) {

			this._cancel();

		} else if ( key === 'r' && session.mode === 'rotate' ) {

			this._toggleTrackball();

		} else if ( ! session.trackball ) {

			// トラックボール中は軸拘束も数値入力も受け付けない（Blender 同様）
			if ( key === 'x' || key === 'y' || key === 'z' ) {

				this._toggleConstraint( key, e.shiftKey );

			} else {

				this._inputNumber( e.key );

			}

		}

		return true;

	}

	// 数値タイプ入力のバッファ操作。数字以外のキーは無視する
	private _inputNumber( key: string ) {

		const session = this._session;

		if ( ! session ) return;

		if ( key.length === 1 && key >= '0' && key <= '9' ) {

			session.numberBuffer += key;

		} else if ( key === '.' ) {

			if ( session.numberBuffer.includes( '.' ) ) return;

			session.numberBuffer += '.';

		} else if ( key === '-' ) {

			// Blender と同じく末尾追記ではなく先頭符号のトグル
			session.numberBuffer = session.numberBuffer.startsWith( '-' )
				? session.numberBuffer.slice( 1 )
				: '-' + session.numberBuffer;

		} else if ( key === 'Backspace' ) {

			if ( session.numberBuffer === '' ) return;

			session.numberBuffer = session.numberBuffer.slice( 0, - 1 );

		} else {

			return;

		}

		this._update();

	}

	/*-------------------------------
		Session
	-------------------------------*/

	// モーダル変形を開始する。選択が無い・ギズモ操作中・カメラが取れない場合は開始しない
	private _start( mode: ModalTransformMode ): boolean {

		if ( this._isPointerBusy() ) return false;

		const entity = this._getSelectedEntity();

		if ( ! entity ) return false;

		const cameraEntity = this._editorCamera.getCameraEntity( this._engine );

		if ( ! cameraEntity ) return false;

		const camera = cameraEntity.getComponentsByTag<MXP.Camera>( "camera" )[ 0 ];

		if ( ! camera ) return false;

		const camElm = cameraEntity.matrixWorld.elm;
		const camWorldPos = new GLP.Vector( camElm[ 12 ], camElm[ 13 ], camElm[ 14 ] );

		// 透視投影はカメラのローカル -Z を覗くので、第3列の反転がビュー方向になる
		const camForward = new GLP.Vector( - camElm[ 8 ], - camElm[ 9 ], - camElm[ 10 ] ).normalize();
		const camRight = new GLP.Vector( camElm[ 0 ], camElm[ 1 ], camElm[ 2 ] ).normalize();
		const camUp = new GLP.Vector( camElm[ 4 ], camElm[ 5 ], camElm[ 6 ] ).normalize();

		const worldElm = entity.matrixWorld.elm;
		const startWorldPos = new GLP.Vector( worldElm[ 12 ], worldElm[ 13 ], worldElm[ 14 ] );

		const onMove = ( e: PointerEvent ) => {

			e.stopPropagation();

			if ( ! this._session ) return;

			this._session.lastPointer.set( e.clientX, e.clientY );

			this._update();

		};

		const onDown = ( e: PointerEvent ) => {

			e.preventDefault();
			e.stopPropagation();

			if ( e.button === 2 ) {

				this._cancel();

			} else if ( e.button === 0 ) {

				this._confirm();

			}

		};

		// capture フェーズで奪うことで canvas の PointerHandler / OrbitControls へ届かせない
		window.addEventListener( 'pointermove', onMove, { capture: true } );
		window.addEventListener( 'pointerdown', onDown, { capture: true } );

		const orbitControls = this._editorCamera.orbitControls;

		// preview カメラモードでは元から false なので、無条件 true 復元にはしない
		const prevOrbitEnabled = orbitControls.enabled;
		orbitControls.enabled = false;

		this._session = {
			mode,
			entity,
			constraint: null,
			numberBuffer: '',
			trackball: false,
			trackballQuat: new GLP.Quaternion(),
			trackballPointer: this._pointerClient.clone(),
			startValue: {
				position: entity.position.getElm( 'vec3' ) as number[],
				euler: entity.euler.getElm( 'vec3' ) as number[],
				scale: entity.scale.getElm( 'vec3' ) as number[],
			},
			startWorldPos,
			startWorldQuat: getWorldQuaternion( entity ),
			parentWorldInv: entity.parent ? entity.parent.matrixWorld.clone().inverse() : new GLP.Matrix(),
			parentWorldQuatInv: entity.parent ? getWorldQuaternion( entity.parent ).inverse() : new GLP.Quaternion(),
			camForward,
			camRight,
			camUp,
			camWorldPos,
			centerClient: this._projectToClient( startWorldPos, camera ),
			startPointer: this._pointerClient.clone(),
			lastPointer: this._pointerClient.clone(),
			disposeSession: () => {

				window.removeEventListener( 'pointermove', onMove, { capture: true } );
				window.removeEventListener( 'pointerdown', onDown, { capture: true } );

				orbitControls.enabled = prevOrbitEnabled;

				// capture リスナーが pointermove を止めていた分、最後の位置を常設側へ引き継ぐ
				if ( this._session ) this._pointerClient.copy( this._session.lastPointer );

				this._session = null;

				this._onStatusChange( null );

			},
		};

		this._update();

		return true;

	}

	// 変形を確定し、mode に対応する field だけ undo 可能なコマンドとして積む
	private _confirm() {

		const session = this._session;

		if ( ! session ) return;

		const fieldName = FIELD_NAME[ session.mode ];
		const newValue = session.entity[ fieldName ].getElm( 'vec3' ) as number[];

		this._api.commandManager.execute(
			new SetFieldCommand( session.entity, fieldName, session.startValue[ fieldName ], newValue )
		);

		session.disposeSession();

	}

	// 開始時の値へ完全復元する。undo 履歴には残さない
	private _cancel() {

		const session = this._session;

		if ( ! session ) return;

		this._restoreStart( session );
		session.entity.updateMatrix( true );

		session.disposeSession();

	}

	// 変形前の position / euler / scale に戻す（行列更新は呼び出し側で行う）
	private _restoreStart( session: ModalSession ) {

		session.entity.position.setFromArray( session.startValue.position );
		session.entity.euler.setFromArray( session.startValue.euler );
		session.entity.scale.setFromArray( session.startValue.scale );

	}

	/*-------------------------------
		Constraint
	-------------------------------*/

	// 同一軸キーの再押下で global → local → 解除とトグルする（Blender 準拠）
	private _toggleConstraint( axis: GizmoAxis, plane: boolean ) {

		const session = this._session;

		if ( ! session ) return;

		// 回転に平面拘束は無いのでキーを消費するだけにする
		if ( plane && session.mode === 'rotate' ) return;

		const current = session.constraint;

		if ( ! current || current.axis !== axis || current.plane !== plane ) {

			session.constraint = { axis, orientation: 'global', plane };

		} else if ( current.orientation === 'global' ) {

			session.constraint = { axis, orientation: 'local', plane };

		} else {

			session.constraint = null;

		}

		// 変形は常に開始値からの絶対量で作り直すので、再計算するだけで切替が即反映される
		this._update();

	}

	// 拘束軸のワールド方向。local は開始時のワールド回転を使う（回転中に軸が自分の結果で回るのを防ぐ）
	private _axisWorldDir( session: ModalSession, axis: GizmoAxis, orientation: TransformOrientation ): GLP.Vector {

		const unit = new GLP.Vector(
			axis === 'x' ? 1 : 0,
			axis === 'y' ? 1 : 0,
			axis === 'z' ? 1 : 0,
		);

		if ( orientation === 'global' ) return unit;

		return rotateVector( unit, session.startWorldQuat ).normalize();

	}

	/*-------------------------------
		Trackball
	-------------------------------*/

	// R R でトラックボール回転へ切り替える。Blender 同様に拘束と数値入力は解除する
	private _toggleTrackball() {

		const session = this._session;

		if ( ! session ) return;

		session.trackball = ! session.trackball;
		session.constraint = null;
		session.numberBuffer = '';
		session.trackballQuat = new GLP.Quaternion();
		session.trackballPointer.copy( session.lastPointer );

		this._update();

	}

	// 前回消化したポインタからの差分だけ増分回転を前掛けで積む（他モードと違い累積が必要）
	private _accumulateTrackball( session: ModalSession ) {

		const dx = session.lastPointer.x - session.trackballPointer.x;
		const dy = session.lastPointer.y - session.trackballPointer.y;

		session.trackballPointer.copy( session.lastPointer );

		if ( dx === 0 && dy === 0 ) return;

		const dq = quaternionFromAxisAngle( session.camUp, dx * TRACKBALL_SPEED )
			.multiply( quaternionFromAxisAngle( session.camRight, dy * TRACKBALL_SPEED ) );

		session.trackballQuat.preMultiply( dq );

	}

	/*-------------------------------
		Transform
	-------------------------------*/

	// 現在のポインタ位置（または数値バッファ）で変形をやり直し、ヘッダ表示を更新する
	private _update() {

		const session = this._session;

		if ( ! session ) return;

		const cameraEntity = this._editorCamera.getCameraEntity( this._engine );

		if ( ! cameraEntity ) return;

		const numeric = session.numberBuffer === '' ? null : parseFloat( session.numberBuffer );

		let amount = 0;

		if ( numeric !== null && Number.isNaN( numeric ) ) {

			// "-" や "." だけの途中状態。数値が揃うまで開始値のまま待つ
			this._restoreStart( session );

		} else if ( session.mode === 'translate' ) {

			amount = this._applyTranslate( session, cameraEntity, numeric );

		} else if ( session.mode === 'rotate' ) {

			amount = this._applyRotate( session, numeric );

		} else {

			amount = this._applyScale( session, numeric );

		}

		session.entity.updateMatrix( true );

		this._onStatusChange( this._statusText( session, amount ) );

	}

	private _applyTranslate( session: ModalSession, cameraEntity: MXP.Entity, numeric: number | null ): number {

		const constraint = session.constraint;

		if ( numeric !== null ) {

			const dir = this._numericTranslateDir( session );

			this._setWorldPosition( session, session.startWorldPos.clone().add( dir.multiply( numeric ) ) );

			return numeric;

		}

		const startRay = this._rayFromClient( session.startPointer, cameraEntity );
		const currentRay = this._rayFromClient( session.lastPointer, cameraEntity );

		if ( constraint && ! constraint.plane ) {

			const axisDir = this._axisWorldDir( session, constraint.axis, constraint.orientation );
			const amount = projectRayOnLine( currentRay, session.startWorldPos, axisDir )
				- projectRayOnLine( startRay, session.startWorldPos, axisDir );

			this._setWorldPosition( session, session.startWorldPos.clone().add( axisDir.clone().multiply( amount ) ) );

			return amount;

		}

		// 平面拘束は除外軸を法線に、拘束なしはビュー平面に当てて滑らせる
		const normal = constraint
			? this._axisWorldDir( session, constraint.axis, constraint.orientation )
			: session.camForward;

		const hitStart = intersectRayPlane( startRay, session.startWorldPos, normal );
		const hitCurrent = intersectRayPlane( currentRay, session.startWorldPos, normal );

		if ( ! hitStart || ! hitCurrent ) return 0;

		const delta = hitCurrent.sub( hitStart );

		this._setWorldPosition( session, session.startWorldPos.clone().add( delta ) );

		return delta.length();

	}

	// 数値入力で動かす方向。拘束なしはグローバル X、平面拘束は面内で先頭の軸（Blender の第1成分挙動）
	private _numericTranslateDir( session: ModalSession ): GLP.Vector {

		const constraint = session.constraint;

		if ( ! constraint ) return new GLP.Vector( 1, 0, 0 );

		const axis: GizmoAxis = constraint.plane
			? ( constraint.axis === 'x' ? 'y' : 'x' )
			: constraint.axis;

		return this._axisWorldDir( session, axis, constraint.orientation );

	}

	private _applyRotate( session: ModalSession, numeric: number | null ): number {

		if ( session.trackball ) {

			this._accumulateTrackball( session );

			this._setWorldRotation( session, session.trackballQuat.clone() );

			return 0;

		}

		const axis = session.constraint
			? this._axisWorldDir( session, session.constraint.axis, session.constraint.orientation )
			: session.camForward;

		// 右ねじ回転はカメラを向く軸のときだけ画面上で反時計回りに見えるので、軸をカメラ側へ揃えてから角度を適用する
		// ただし数値入力＋軸拘束は Blender 同様、見た目の回転方向によらず軸まわりの右ねじ角として扱う
		const toCamera = session.camWorldPos.clone().sub( session.startWorldPos );
		const sign = numeric !== null && session.constraint ? 1 : ( axis.dot( toCamera ) < 0 ? - 1 : 1 );

		const angle = numeric !== null
			? numeric * Math.PI / 180
			: this._screenAngle( session.lastPointer, session.centerClient ) - this._screenAngle( session.startPointer, session.centerClient );

		this._setWorldRotation( session, quaternionFromAxisAngle( axis, angle * sign ) );

		return angle * 180 / Math.PI;

	}

	private _applyScale( session: ModalSession, numeric: number | null ): number {

		let ratio: number;

		if ( numeric !== null ) {

			// 数値入力は負値（ミラー）を許すのでクランプしない
			ratio = numeric;

		} else {

			const startDistance = Math.max( MIN_CENTER_DISTANCE, session.startPointer.distanceTo( session.centerClient ) );
			ratio = Math.max( MIN_SCALE_RATIO, session.lastPointer.distanceTo( session.centerClient ) / startDistance );

		}

		const start = session.startValue.scale;
		const constraint = session.constraint;

		// 回転済みオブジェクトのグローバル軸スケールはシアーになるので、軸拘束は常にローカル成分に掛ける
		const factor = AXES.map( ( axis ) => {

			if ( ! constraint ) return ratio;

			const inConstraint = constraint.plane ? axis !== constraint.axis : axis === constraint.axis;

			return inConstraint ? ratio : 1;

		} );

		session.entity.scale.set(
			start[ 0 ] * factor[ 0 ],
			start[ 1 ] * factor[ 1 ],
			start[ 2 ] * factor[ 2 ],
		);

		return ratio;

	}

	// ワールド位置を親ローカルへ落として position に書く
	private _setWorldPosition( session: ModalSession, worldPos: GLP.Vector ) {

		const local = worldPos.applyMatrix4AsPosition( session.parentWorldInv );

		session.entity.position.set( local.x, local.y, local.z );

	}

	// ワールド空間の回転増分を親ローカルへ落として quaternion に書く（euler は Entity 側が再生成する）
	private _setWorldRotation( session: ModalSession, deltaQ: GLP.Quaternion ) {

		session.entity.quaternion.copy(
			composeLocalQuat( session.parentWorldQuatInv, deltaQ, session.startWorldQuat )
		);

	}

	/*-------------------------------
		Status
	-------------------------------*/

	// Blender のヘッダ相当のテキスト。数値入力中の値は [] で囲む
	private _statusText( session: ModalSession, amount: number ): string {

		if ( session.trackball ) return 'Rot: trackball';

		const label = session.mode === 'translate' ? 'Move D' : session.mode === 'rotate' ? 'Rot' : 'Scale';
		const unit = session.mode === 'rotate' ? '°' : '';
		const value = session.numberBuffer !== ''
			? `[${session.numberBuffer}]`
			: amount.toFixed( session.mode === 'rotate' ? 1 : 3 );

		return `${label}: ${value}${unit} (${this._constraintText( session )})`;

	}

	private _constraintText( session: ModalSession ): string {

		const constraint = session.constraint;

		if ( ! constraint ) {

			return session.mode === 'translate' ? 'view plane'
				: session.mode === 'rotate' ? 'view axis'
					: 'uniform';

		}

		const letters = AXES.filter( ( axis ) => constraint.plane ? axis !== constraint.axis : axis === constraint.axis )
			.join( '' ).toUpperCase();

		// スケールは orientation を無視して常にローカル成分へ掛けるので、表示も local で固定する
		const orientation = session.mode === 'scale' ? 'local' : constraint.orientation;

		return `${orientation} ${letters}`;

	}

	/*-------------------------------
		Utils
	-------------------------------*/

	// クライアント座標からピッキングレイを作る。raycaster の ray は使い回されるので複製して返す
	private _rayFromClient( client: GLP.Vector, cameraEntity: MXP.Entity ): MXP.Ray {

		const ndc = clientToNDC( this._canvas, client.x, client.y );

		this._raycaster.setFromCamera( ndc, cameraEntity );

		return new MXP.Ray( this._raycaster.ray.origin.clone(), this._raycaster.ray.direction.clone() );

	}

	// ワールド座標を canvas 上のクライアント座標へ投影する（回転角・スケール比の中心に使う）
	private _projectToClient( worldPos: GLP.Vector, camera: MXP.Camera ): GLP.Vector {

		const clip = new GLP.Vector( worldPos.x, worldPos.y, worldPos.z, 1 )
			.applyMatrix4( camera.viewMatrix )
			.applyMatrix4( camera.projectionMatrix );

		// カメラ平面上（w≒0）だと投影が発散するので画面中央へ逃がす
		if ( Math.abs( clip.w ) < 0.0001 ) return ndcToClient( this._canvas, 0, 0 );

		return ndcToClient( this._canvas, clip.x / clip.w, clip.y / clip.w );

	}

	// 中心から見たポインタの角度。y を反転して画面上の反時計回りを正にする
	private _screenAngle( pointer: GLP.Vector, center: GLP.Vector ): number {

		return Math.atan2( - ( pointer.y - center.y ), pointer.x - center.x );

	}

	/*-------------------------------
		Dispose
	-------------------------------*/

	public dispose(): void {

		this._cancel();

		this._disposeListeners();

	}

}
