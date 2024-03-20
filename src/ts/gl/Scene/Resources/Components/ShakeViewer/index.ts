import * as GLP from 'glpower';
import * as MXP from 'maxpower';

interface ShakeViewerParams extends MXP.ComponentParams {
}

export class ShakeViewer extends MXP.Component {

	private stop: boolean;

	private shakePower: number;
	private shakeSpeed: number;
	private shakeMatrix: GLP.Matrix;
	private shakeQua: GLP.Quaternion;

	private cameraComponent?: MXP.Camera;

	constructor( param?: ShakeViewerParams ) {

		param = param || {};

		super();

		this.stop = false;

		this.shakePower = 0.15;
		this.shakeSpeed = 1.0;
		this.shakeMatrix = new GLP.Matrix();
		this.shakeQua = new GLP.Quaternion();

	}

	public getProperties(): MXP.ComponentProps | null {

		return {
			stop: {
				value: this.stop,
			},
			power: {
				value: this.shakePower,
			},
			speed: {
				value: this.shakeSpeed,
			},
		};

	}
	public setPropertyValues( props: MXP.ComponentSetProps ) {

		this.shakePower = props.power;
		this.shakeSpeed = props.speed;
		this.stop = props.stop;

	}

	public finalizeImpl( event: MXP.ComponentUpdateEvent ): void {

		if ( this.stop ) return;

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
