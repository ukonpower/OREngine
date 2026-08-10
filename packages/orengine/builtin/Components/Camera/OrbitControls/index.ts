import * as MTP from 'mathpower';
import * as MXP from 'maxpower';
import { Keyboard, Pointer, PointerEventArgs } from 'orengine';

import { LookAt } from '../LookAt';

export class OrbitControls extends MXP.Component {

	private keyborad_: Keyboard;
	private _pointer: Pointer;

	private orbit_: MTP.Vector;
	private mouseVelOrbit_: MTP.Vector;
	private mouseVelMove_: MTP.Vector;

	private eye_: MTP.Vector;
	private target_: MTP.Vector;
	private up_: MTP.Vector;
	private lookatMatrix_: MTP.Matrix;

	private distance_: number;
	private distanceVel_: number;

	private _memPos: MTP.Vector;
	private _memTarget: MTP.Vector;

	private _multiTouching: boolean;

	private elmDisposer?: () => void;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this._pointer = new Pointer();
		this.keyborad_ = new Keyboard();
		this.orbit_ = new MTP.Vector();
		this.mouseVelOrbit_ = new MTP.Vector();
		this.mouseVelMove_ = new MTP.Vector();
		this.target_ = new MTP.Vector();
		this.eye_ = new MTP.Vector();
		this.up_ = new MTP.Vector( 0, 1, 0 );
		this.distance_ = 5.0;
		this.distanceVel_ = 0.0;
		this.lookatMatrix_ = new MTP.Matrix();
		this._memPos = new MTP.Vector();
		this._memTarget = new MTP.Vector();
		this._multiTouching = false;

		this.order = 999;

		let touching = false;

		const onPointerStart = ( _e: PointerEventArgs ) => {

			if ( touching ) return;

			touching = true;

		};

		const onPointerMove = ( e: PointerEventArgs ) => {

			// 無効中に速度を溜めると、有効化された瞬間にまとめて適用されて飛ぶ
			if ( ! this._enabled ) return;
			if ( ! touching ) return;
			if ( this._multiTouching ) return;

			const delta = { x: e.delta.x * 1.0, y: e.delta.y * 1.0 };

			if ( this.keyborad_.pressedKeys[ "Shift" ] ) {

				this.mouseVelMove_.add( delta );

			} else {

				this.mouseVelOrbit_.add( delta );

			}

			e.pointerEvent.preventDefault();
			e.pointerEvent.stopPropagation();

		};

		const onPointerEnd = ( _e: PointerEventArgs ) => {

			if ( ! touching ) return;

			touching = false;

		};

		this._pointer.on( "move", onPointerMove );
		this._pointer.on( "start", onPointerStart );
		this._pointer.on( "end", onPointerEnd );

		this.once( "dispose", () => {

			this._pointer.off( "move", onPointerMove );
			this._pointer.off( "start", onPointerStart );
			this._pointer.off( "end", onPointerEnd );

		} );

		this.setPosition( this.entity.position, this.target_ );

	}

	public set enabled( value: boolean ) {

		this._enabled = value;

		if ( value ) {

			this._memTarget.copy( this.target_ );
			this._memPos.copy( this.entity.position );

			const lookAt = this.entity.getComponent( LookAt );

			if ( lookAt && lookAt.target ) {

				this.setPosition( this.entity.position, lookAt.target.position );

			}

			this.calc( this.entity );

		}

	}

	public get enabled() {

		return this._enabled;

	}

	public get eye(): MTP.Vector {

		return this.eye_;

	}

	public get target(): MTP.Vector {

		return this.target_;

	}

	public setElm( elm: HTMLElement ) {

		if ( this.elmDisposer ) this.elmDisposer();

		this._pointer.setElement( elm );

		// マルチタッチ用のポインター管理
		const pointers = new Map<number, { x: number, y: number }>();

		const getPointerDistance = () => {

			const pts = Array.from( pointers.values() );
			if ( pts.length < 2 ) return 0;
			const dx = pts[ 1 ].x - pts[ 0 ].x;
			const dy = pts[ 1 ].y - pts[ 0 ].y;
			return Math.sqrt( dx * dx + dy * dy );

		};

		const getPointerCenter = () => {

			const pts = Array.from( pointers.values() );
			if ( pts.length < 2 ) return { x: 0, y: 0 };
			return {
				x: ( pts[ 0 ].x + pts[ 1 ].x ) / 2,
				y: ( pts[ 0 ].y + pts[ 1 ].y ) / 2,
			};

		};

		let prevDistance = 0;
		let prevCenter = { x: 0, y: 0 };

		const onTouchPointerDown = ( e: PointerEvent ) => {

			if ( e.pointerType !== 'touch' ) return;

			pointers.set( e.pointerId, { x: e.clientX, y: e.clientY } );

			if ( pointers.size === 2 ) {

				this._multiTouching = true;
				prevDistance = getPointerDistance();
				prevCenter = getPointerCenter();

			}

		};

		const onTouchPointerMove = ( e: PointerEvent ) => {

			if ( e.pointerType !== 'touch' ) return;
			if ( ! pointers.has( e.pointerId ) ) return;

			pointers.set( e.pointerId, { x: e.clientX, y: e.clientY } );

			// 無効中に速度を溜めると、有効化された瞬間にまとめて適用されて飛ぶ
			if ( ! this._enabled ) return;

			if ( pointers.size >= 2 ) {

				const dist = getPointerDistance();
				const deltaDist = dist - prevDistance;
				this.distanceVel_ += - deltaDist * 5.0;
				prevDistance = dist;

				const center = getPointerCenter();
				const dx = center.x - prevCenter.x;
				const dy = center.y - prevCenter.y;
				this.mouseVelMove_.add( { x: dx, y: dy } );
				prevCenter = center;

			}

		};

		const onTouchPointerUp = ( e: PointerEvent ) => {

			if ( e.pointerType !== 'touch' ) return;

			pointers.delete( e.pointerId );

			if ( pointers.size < 2 ) {

				this._multiTouching = false;
				prevDistance = 0;

			}

		};

		elm.addEventListener( 'pointerdown', onTouchPointerDown );
		elm.addEventListener( 'pointermove', onTouchPointerMove );
		elm.addEventListener( 'pointerup', onTouchPointerUp );
		elm.addEventListener( 'pointercancel', onTouchPointerUp );

		const onWheel = ( e: WheelEvent ) => {

			e.preventDefault();

			// 無効中に速度を溜めると、有効化された瞬間にまとめて適用されて飛ぶ
			if ( ! this._enabled ) return;

			this.distanceVel_ += e.deltaY;

		};

		elm.addEventListener( "wheel", onWheel );

		this.elmDisposer = () => {

			elm.removeEventListener( 'pointerdown', onTouchPointerDown );
			elm.removeEventListener( 'pointermove', onTouchPointerMove );
			elm.removeEventListener( 'pointerup', onTouchPointerUp );
			elm.removeEventListener( 'pointercancel', onTouchPointerUp );
			elm.removeEventListener( "wheel", onWheel );

		};

	}

	private calc( entity: MXP.Entity ) {

		const hpi = Math.PI / 2 - 0.001;

		this.eye_.set( 0, 0, 0 );
		this.eye_.z += this.distance_;
		this.eye_.applyMatrix3( new MTP.Matrix().makeRotationAxis( { x: 1, y: 0, z: 0 }, Math.min( hpi, Math.max( - hpi, this.orbit_.x ) ) ) );
		this.eye_.applyMatrix3( new MTP.Matrix().makeRotationAxis( { x: 0, y: 1, z: 0 }, this.orbit_.y ) );

		this.eye_.add( this.target_ );
		this.lookatMatrix_.lookAt( this.eye_, this.target_, this.up_ );

		this.lookatMatrix_.decompose( entity.position, entity.quaternion, entity.scale );

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		const movement = new MTP.Vector(
			- this.mouseVelMove_.x * this.distance_ * 0.00025,
			this.mouseVelMove_.y * this.distance_ * 0.00025,
			0,
			0
		);

		movement.applyMatrix3( this.entity.matrix );

		this.target_.add( movement );

		this.orbit_.x += this.mouseVelOrbit_.y * 0.001;
		this.orbit_.x = Math.min( Math.PI / 2, Math.max( - Math.PI / 2, this.orbit_.x ) );
		this.orbit_.y += this.mouseVelOrbit_.x * 0.001;

		this.distance_ += this.distanceVel_ * 0.01 * this.distance_ * 0.025;
		this.distance_ = Math.max( 0.1, this.distance_ );

		const attenuation = Math.max( 0.0, 1.0 - event.timeDelta * 10.0 );
		this.mouseVelOrbit_.multiply( attenuation );
		this.mouseVelMove_.multiply( attenuation );
		this.distanceVel_ *= attenuation;

		this.calc( this.entity );

	}

	// 外部UI（エディタのカメラパッド等）からの操作入力。ピクセル移動量相当の値を速度に加える
	// 無効中に速度を溜めると、有効化された瞬間にまとめて適用されて飛ぶため無視する

	public addOrbitVelocity( x: number, y: number ) {

		if ( ! this._enabled ) return;

		this.mouseVelOrbit_.add( { x, y } );

	}

	public addMoveVelocity( x: number, y: number ) {

		if ( ! this._enabled ) return;

		this.mouseVelMove_.add( { x, y } );

	}

	public addDistanceVelocity( delta: number ) {

		if ( ! this._enabled ) return;

		this.distanceVel_ += delta;

	}

	public setPosition( eye: MTP.Vector, target: MTP.Vector ) {

		this.eye_.copy( eye );
		this.target_.copy( target );


		if ( this.entity ) {

			const parent = this.entity.parent;

			if ( parent ) {

				parent.updateMatrix( true );

				this.target_.applyMatrix4( parent.matrixWorld.clone().inverse() );

			}

		}

		const dx = this.eye_.x - this.target_.x;
		const dy = this.eye_.y - this.target_.y;
		const dz = this.eye_.z - this.target_.z;

		this.orbit_.x = Math.atan2( dy, Math.sqrt( dx * dx + dz * dz ) );
		this.orbit_.y = - Math.atan2( dx, dz );

		this.distance_ = this.eye_.clone().sub( this.target_ ).length();

		this.mouseVelOrbit_.set( 0, 0, 0 );
		this.mouseVelMove_.set( 0, 0, 0 );
		this.distanceVel_ = 0;

	}

	public dispose(): void {

		super.dispose();
		this._pointer.dispose();

	}


}
