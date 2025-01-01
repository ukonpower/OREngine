import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class ShakeViewer extends MXP.Component {

	private shakePower: number;
	private shakeSpeed: number;
	private shakeMatrix: GLP.Matrix;
	private shakeQua: GLP.Quaternion;

	private cameraComponent?: MXP.Camera;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.shakePower = 0.15;
		this.shakeSpeed = 1.0;
		this.shakeMatrix = new GLP.Matrix();
		this.shakeQua = new GLP.Quaternion();

		this.field( "power", () => this.shakePower, value => this.shakePower = value );
		this.field( "speed", () => this.shakeSpeed, value => this.shakeSpeed = value );

	}

	public finalizeImpl( event: MXP.ComponentUpdateEvent ): void {

		const entity = event.entity;

		let shake = 0.008 * this.shakePower;

		if ( this.cameraComponent ) {

			shake *= this.cameraComponent.fov / 50.0;

		}

		const t = event.timeElapsed * this.shakeSpeed;

		this.shakeQua.setFromEuler( { x: Math.sin( t * 2.0 ) * shake, y: Math.sin( t * 2.5 ) * shake, z: 0 } );

		this.shakeMatrix.identity().applyQuaternion( this.shakeQua );

		entity.matrixWorld.multiply( this.shakeMatrix );

		const camera = entity.getComponentsByTag<MXP.Camera>( "camera" )[ 0 ];

		if ( camera ) {

			camera.viewMatrix.copy( entity.matrixWorld ).inverse();

		}

	}


}
