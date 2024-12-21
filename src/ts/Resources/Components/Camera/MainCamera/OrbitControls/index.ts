import * as GLP from 'glpower';
import * as MXP from 'maxpower';


import { LookAt } from '../../../View/LookAt';

import { Keyboard } from '~/ts/OREngine/utils/Keyboard';
import { Pointer, PointerEventArgs } from '~/ts/OREngine/utils/Pointer';

export class OrbitControls extends MXP.Component {

	private keyborad_: Keyboard;
	private _pointer: Pointer;

	private orbit_: GLP.Vector;
	private mouseVelOrbit_: GLP.Vector;
	private mouseVelMove_: GLP.Vector;

	private eye_: GLP.Vector;
	private target_: GLP.Vector;
	private up_: GLP.Vector;
	private lookatMatrix_: GLP.Matrix;

	private distance_: number;
	private distanceVel_: number;

	private _memPos: GLP.Vector;
	private _memTarget: GLP.Vector;

	private elmDisposer?: () => void;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this._pointer = new Pointer();
		this.keyborad_ = new Keyboard();
		this.orbit_ = new GLP.Vector();
		this.mouseVelOrbit_ = new GLP.Vector();
		this.mouseVelMove_ = new GLP.Vector();
		this.target_ = new GLP.Vector();
		this.eye_ = new GLP.Vector();
		this.up_ = new GLP.Vector( 0, 1, 0 );
		this.distance_ = 5.0;
		this.distanceVel_ = 0.0;
		this.lookatMatrix_ = new GLP.Matrix();
		this._memPos = new GLP.Vector();
		this._memTarget = new GLP.Vector();

		let touching = false;

		const onPointerStart = ( e: PointerEventArgs ) => {

			if ( touching ) return;

			touching = true;

		};

		const onPointerMove = ( e: PointerEventArgs ) => {

			if ( ! touching ) return;

			const delta = { x: e.delta.x * 1.0, y: e.delta.y * 1.0 };

			if ( this.keyborad_.pressedKeys[ "Shift" ] ) {

				this.mouseVelMove_.add( delta );

			} else {

				this.mouseVelOrbit_.add( delta );

			}

			e.pointerEvent.preventDefault();
			e.pointerEvent.stopPropagation();

		};

		const onPointerEnd = ( e: PointerEventArgs ) => {

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

		this.setPosition( this._entity.position, this.target_ );

	}

	public set enabled( value: boolean ) {

		this._enabled = value;

		if ( value ) {

			this._memTarget.copy( this.target_ );
			this._memPos.copy( this._entity.position );

			const lookAt = this._entity.getComponent( LookAt );

			if ( lookAt && lookAt.target ) {

				this.setPosition( this._entity.position, lookAt.target.position );

			}

			this.calc( this._entity );

		}

	}

	public get enabled() {

		return this._enabled;

	}

	public setElm( elm: HTMLElement ) {

		if ( this.elmDisposer ) this.elmDisposer();

		this._pointer.setElement( elm );

		const onWheel = ( e: WheelEvent ) => {

			e.preventDefault();
			this.distanceVel_ += e.deltaY;

		};

		elm.addEventListener( "wheel", onWheel );

		this.elmDisposer = () => {

			elm.removeEventListener( "wheel", onWheel );

		};


	}

	private calc( entity: MXP.Entity ) {

		const hpi = Math.PI / 2 - 0.001;

		this.eye_.set( 0, 0, 0 );
		this.eye_.z += this.distance_;
		this.eye_.applyMatrix3( new GLP.Matrix().makeRotationAxis( { x: 1, y: 0, z: 0 }, Math.min( hpi, Math.max( - hpi, this.orbit_.x ) ) ) );
		this.eye_.applyMatrix3( new GLP.Matrix().makeRotationAxis( { x: 0, y: 1, z: 0 }, this.orbit_.y ) );

		this.eye_.add( this.target_ );
		this.lookatMatrix_.lookAt( this.eye_, this.target_, this.up_ );
		this.lookatMatrix_.decompose( entity.position, entity.quaternion, entity.scale );

		entity.updateMatrix();

	}

	protected finalizeImpl( event: MXP.ComponentUpdateEvent ): void {

		const entity = event.entity;

		const movement = new GLP.Vector(
			- this.mouseVelMove_.x * this.distance_ * 0.00025,
			this.mouseVelMove_.y * this.distance_ * 0.00025,
			0,
			0
		);

		movement.applyMatrix3( entity.matrix );
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

		this.calc( event.entity );

	}

	public setPosition( eye: GLP.Vector, target: GLP.Vector ) {

		this.eye_.copy( eye );
		this.target_.copy( target );


		if ( this._entity ) {

			const parent = this._entity.parent;

			if ( parent ) {

				parent.updateMatrix( true );

				this.target_.applyMatrix4( parent.matrixWorld.clone().inverse() );

			}

		}

		this.orbit_.x = Math.atan2( this.eye_.y - this.target_.y, new GLP.Vector( this.eye_.x, this.eye_.z ).length() - new GLP.Vector( this.target_.x, this.target_.z ).length() );
		this.orbit_.y = - Math.atan2( this.eye_.x - this.target_.x, this.eye_.z - this.target_.z );

		this.distance_ = this.eye_.clone().sub( this.target_ ).length();

		this.mouseVelOrbit_.set( 0, 0, 0 );
		this.mouseVelMove_.set( 0, 0, 0 );

	}

	public dispose(): void {

		super.dispose();
		this._pointer.dispose();

	}


}
