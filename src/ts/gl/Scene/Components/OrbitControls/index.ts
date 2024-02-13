import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { Camera } from 'maxpower';

import { Keyboard } from '../../utils/Keyboard';
import { Pointer, PointerEventArgs } from '../../utils/Pointer';

export class OrbitControls extends MXP.Component {


	private keyborad: Keyboard;
	private pointer: Pointer;

	private orbit: GLP.Vector;
	private mouseVelOrbit: GLP.Vector;
	private mouseVelMove: GLP.Vector;

	private eye: GLP.Vector;
	public target: GLP.Vector;
	private up: GLP.Vector;
	private lookatMatrix: GLP.Matrix;
	private distance: number;
	private distanceVel: number;

	constructor( targetElm: HTMLElement ) {

		super();

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

	protected setEntityImpl( entity: MXP.Entity | null, prevEntity: MXP.Entity | null ): void {

		if ( entity ) {

			this.eye.copy( entity.position );
			this.target.set( 0, 0, 0, 1 );

			this.orbit.x = Math.atan2( this.eye.y - this.target.y, this.eye.z - this.target.z );
			this.orbit.y = Math.atan2( this.eye.x - this.target.x, this.eye.z - this.target.z );

			const parent = entity.parent;

			if ( parent ) {

				this.target.applyMatrix4( parent.matrixWorld.clone().inverse() );

			}

			this.distance = this.eye.clone().sub( this.target ).length();

		}

	}

	protected finalizeImpl( event: MXP.ComponentUpdateEvent ): void {

		const entity = event.entity;

		const movement = new GLP.Vector(
			- this.mouseVelMove.x * 0.001 * this.distance * 0.1,
			this.mouseVelMove.y * 0.001 * this.distance * 0.1,
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

		this.eye.set( 0, 0, 0 );
		this.eye.z += this.distance;
		this.eye.applyMatrix3( new GLP.Matrix().makeRotationAxis( { x: 1, y: 0, z: 0 }, this.orbit.x ) );
		this.eye.applyMatrix3( new GLP.Matrix().makeRotationAxis( { x: 0, y: 1, z: 0 }, this.orbit.y ) );

		this.eye.add( this.target );
		this.lookatMatrix.lookAt( this.eye, this.target, this.up );
		this.lookatMatrix.decompose( entity.position, entity.quaternion, entity.scale );

		const attenuation = Math.max( 0.0, 1.0 - event.deltaTime * 10.0 );
		this.mouseVelOrbit.multiply( attenuation );
		this.mouseVelMove.multiply( attenuation );
		this.distanceVel *= attenuation;

		// calc viewmatrix

		const cameraComponent = entity.getComponent<Camera>( "camera" );

		if ( cameraComponent ) {

			cameraComponent.viewMatrix.copy( entity.matrixWorld ).inverse();

		}

	}

	public dispose(): void {

		super.dispose();
		this.pointer.dispose();

	}


}
