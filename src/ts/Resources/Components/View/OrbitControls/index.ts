import * as GLP from 'glpower';
import * as MXP from 'maxpower';


import { LookAt } from '../LookAt';

import { Keyboard } from '~/ts/OREngine/utils/Keyboard';
import { Pointer, PointerEventArgs } from '~/ts/OREngine/utils/Pointer';

export class OrbitControls extends MXP.Component {

	private keyborad: Keyboard;
	private pointer: Pointer;
	private orbit: GLP.Vector;
	private mouseVelOrbit: GLP.Vector;
	private mouseVelMove: GLP.Vector;
	private eye: GLP.Vector;
	private target: GLP.Vector;
	private up: GLP.Vector;
	private lookatMatrix: GLP.Matrix;
	private distance: number;
	private distanceVel: number;
	private memPos: GLP.Vector;
	private memTarget: GLP.Vector;

	constructor( params: MXP.ComponentParams & {elm?: HTMLElement} ) {

		super( params );

		this.pointer = new Pointer();
		this.keyborad = new Keyboard();
		this.orbit = new GLP.Vector();
		this.mouseVelOrbit = new GLP.Vector();
		this.mouseVelMove = new GLP.Vector();
		this.target = new GLP.Vector();
		this.eye = new GLP.Vector();
		this.up = new GLP.Vector( 0, 1, 0 );
		this.distance = 5.0;
		this.distanceVel = 0.0;
		this.lookatMatrix = new GLP.Matrix();
		this.memPos = new GLP.Vector();
		this.memTarget = new GLP.Vector();

		const targetElm = params && params.elm || document.body;

		this.pointer.setElement( targetElm );

		let touching = false;

		const onPointerStart = ( e: PointerEventArgs ) => {

			if ( touching ) return;

			touching = true;

		};

		const onPointerMove = ( e: PointerEventArgs ) => {

			if ( ! touching ) return;

			const delta = { x: e.delta.x * 1.0, y: e.delta.y * 1.0 };

			if ( this.keyborad.pressedKeys[ "Shift" ] ) {

				this.mouseVelMove.add( delta );

			} else {

				this.mouseVelOrbit.add( delta );

			}

			e.pointerEvent.preventDefault();
			e.pointerEvent.stopPropagation();

		};

		const onPointerEnd = ( e: PointerEventArgs ) => {

			if ( ! touching ) return;

			touching = false;

		};

		const onWheel = ( e: WheelEvent ) => {

			e.preventDefault();
			this.distanceVel += e.deltaY;

		};

		this.pointer.on( "move", onPointerMove );
		this.pointer.on( "start", onPointerStart );
		this.pointer.on( "end", onPointerEnd );
		targetElm.addEventListener( "wheel", onWheel );

		this.once( "dispose", () => {

			this.pointer.off( "move", onPointerMove );
			this.pointer.off( "start", onPointerStart );
			this.pointer.off( "end", onPointerEnd );
			targetElm.removeEventListener( "wheel", onWheel );

		} );

	}

	public set enabled( value: boolean ) {

		this.enabled_ = value;

		if ( value && this.entity ) {

			this.memTarget.copy( this.target );
			this.memPos.copy( this.entity.position );

			const lookAt = this.entity.getComponent( LookAt );

			if ( lookAt && lookAt.target ) {

				this.setPosition( this.entity.position, lookAt.target.position );

			}

			this.calc( this.entity );

		}

	}

	public get enabled() {

		return this.enabled_;

	}

	protected setEntityImpl( entity: MXP.Entity ): void {

		this.setPosition( entity.position, this.target );

	}

	private calc( entity: MXP.Entity ) {

		const hpi = Math.PI / 2 - 0.001;

		this.eye.set( 0, 0, 0 );
		this.eye.z += this.distance;
		this.eye.applyMatrix3( new GLP.Matrix().makeRotationAxis( { x: 1, y: 0, z: 0 }, Math.min( hpi, Math.max( - hpi, this.orbit.x ) ) ) );
		this.eye.applyMatrix3( new GLP.Matrix().makeRotationAxis( { x: 0, y: 1, z: 0 }, this.orbit.y ) );

		this.eye.add( this.target );
		this.lookatMatrix.lookAt( this.eye, this.target, this.up );
		this.lookatMatrix.decompose( entity.position, entity.quaternion, entity.scale );

		// calc viewmatrix

		const cameraComponent = entity.getComponentsByTag<MXP.Camera>( "camera" );

		if ( cameraComponent ) {

			cameraComponent.viewMatrix.copy( entity.matrixWorld ).inverse();

		}

	}

	protected finalizeImpl( event: MXP.ComponentUpdateEvent ): void {

		const entity = event.entity;

		const movement = new GLP.Vector(
			- this.mouseVelMove.x * this.distance * 0.00025,
			this.mouseVelMove.y * this.distance * 0.00025,
			0,
			0
		);

		movement.applyMatrix3( entity.matrix );
		this.target.add( movement );

		this.orbit.x += this.mouseVelOrbit.y * 0.001;
		this.orbit.x = Math.min( Math.PI / 2, Math.max( - Math.PI / 2, this.orbit.x ) );
		this.orbit.y += this.mouseVelOrbit.x * 0.001;

		this.distance += this.distanceVel * 0.01 * this.distance * 0.025;
		this.distance = Math.max( 0.1, this.distance );

		const attenuation = Math.max( 0.0, 1.0 - event.timeDelta * 10.0 );
		this.mouseVelOrbit.multiply( attenuation );
		this.mouseVelMove.multiply( attenuation );
		this.distanceVel *= attenuation;

		this.calc( event.entity );

	}

	public setPosition( eye: GLP.Vector, target: GLP.Vector ) {

		this.eye.copy( eye );
		this.target.copy( target );

		if ( this.entity ) {

			const parent = this.entity.parent;

			if ( parent ) {

				parent.updateMatrix( true );

				this.target.applyMatrix4( parent.matrixWorld.clone().inverse() );

			}

		}

		this.orbit.x = Math.atan2( this.eye.y - this.target.y, new GLP.Vector( this.eye.x, this.eye.z ).length() - new GLP.Vector( this.target.x, this.target.z ).length() );
		this.orbit.y = - Math.atan2( this.eye.x - this.target.x, this.eye.z - this.target.z );

		this.distance = this.eye.clone().sub( this.target ).length();

		this.mouseVelOrbit.set( 0, 0, 0 );
		this.mouseVelMove.set( 0, 0, 0 );

	}

	public dispose(): void {

		super.dispose();
		this.pointer.dispose();

	}


}
