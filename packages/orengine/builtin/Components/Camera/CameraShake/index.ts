import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

export class ShakeViewer extends MXP.Component {

	private shakePower: number;
	private shakeSpeed: number;
	private shakeMatrix: MTP.Matrix;
	private cameraMatrixWorld: MTP.Matrix;
	private shakeQua: MTP.Quaternion;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.shakePower = 0.15;
		this.shakeSpeed = 1.0;
		this.shakeMatrix = new MTP.Matrix();
		this.cameraMatrixWorld = new MTP.Matrix();
		this.shakeQua = new MTP.Quaternion();
		this.order = 999 + 1;

		this.field( "power", () => this.shakePower, value => this.shakePower = value );
		this.field( "speed", () => this.shakeSpeed, value => this.shakeSpeed = value );

	}

	protected prepareRenderImpl( event: MXP.ComponentUpdateEvent ): void {

		const camera = this.entity.getComponentsByTag<MXP.Camera>( "camera" )[ 0 ];

		if ( ! camera ) return;

		let shake = 0.008 * this.shakePower;
		shake *= camera.fov / 50.0;

		const t = event.timeElapsed * this.shakeSpeed;

		this.shakeQua.setFromEuler( { x: Math.sin( t * 2.0 ) * shake, y: Math.sin( t * 2.5 ) * shake, z: 0 } );

		this.shakeMatrix.identity().applyQuaternion( this.shakeQua );

		this.cameraMatrixWorld.copy( this.entity.matrixWorld ).multiply( this.shakeMatrix );
		camera.viewMatrix.copy( this.cameraMatrixWorld ).inverse();

	}


}
