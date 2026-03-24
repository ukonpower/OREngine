import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class ObjectRotate extends MXP.Component {

	private speed: number;

	private rotQuaternion: GLP.Quaternion;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.speed = 1;

		this.rotQuaternion = new GLP.Quaternion();

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		this.rotQuaternion.setFromEuler( new GLP.Euler( 0, - 0.4 * event.timeDelta * this.speed, 0 ) );

		this.entity.quaternion.multiply( this.rotQuaternion );

	}


}
