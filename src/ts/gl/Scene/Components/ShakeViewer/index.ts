import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class ShakeViewer extends MXP.Component {

	private shakePower: number;
	private shakeSpeed: number;
	private shakeMatrix: GLP.Matrix;
	private shakeQua: GLP.Quaternion;

	private cameraComponent?: MXP.Camera;

	constructor( shakePower: number = 1.0, shakeSpeed: number = 1.0 ) {

		super();

		this.shakePower = shakePower;
		this.shakeSpeed = shakeSpeed;
		this.shakeMatrix = new GLP.Matrix();
		this.shakeQua = new GLP.Quaternion();

	}

	public finalizeImpl( event: MXP.ComponentUpdateEvent ): void {

		const entity = event.entity;

		let shake = 0.008 * this.shakePower;

		if ( this.cameraComponent ) {

			shake *= this.cameraComponent.fov / 50.0;

		}

		const t = event.time * this.shakeSpeed;

		this.shakeQua.setFromEuler( { x: Math.sin( t * 2.0 ) * shake, y: Math.sin( t * 2.5 ) * shake, z: 0 } );

		this.shakeMatrix.identity().applyQuaternion( this.shakeQua );

		entity.matrixWorld.multiply( this.shakeMatrix );

		const camera = entity.getComponent<MXP.Camera>( 'camera' );

		if ( camera ) {

			camera.viewMatrix.copy( entity.matrixWorld ).inverse();

		}

	}


}
