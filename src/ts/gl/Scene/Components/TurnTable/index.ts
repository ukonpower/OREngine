import * as MXP from 'maxpower';
import * as GLP from 'glpower';

export class TurnTable extends MXP.Component {

	private speed: number;

	private rotQuaternion: GLP.Quaternion;

	constructor( speed: number = 1.0 ) {

		super();

		this.speed = speed;

		this.rotQuaternion = new GLP.Quaternion();

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		const entity = event.entity;

		this.rotQuaternion.setFromEuler( new GLP.Euler( 0, - 0.4 * event.deltaTime * this.speed, 0 ) );

		entity.quaternion.multiply( this.rotQuaternion );

	}


}
