import * as GLP from 'glpower';
import * as MXP from 'maxpower';

interface ShakeViewerParams extends MXP.ComponentParams {
	power?: number,
	speed?: number
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

		this.shakePower = param.power || 1;
		this.shakeSpeed = param.speed || 1;
		this.shakeMatrix = new GLP.Matrix();
		this.shakeQua = new GLP.Quaternion();

	}

	public get property(): MXP.ComponentProps | null {

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
	public set property( props: MXP.ComponentProps ) {

		this.shakePower = props.power.value;
		this.shakeSpeed = props.speed.value;
		this.stop = props.stop.value;

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
