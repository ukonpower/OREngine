import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class CameraFixedRoad extends MXP.Component {

	private position: GLP.Vector;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.position = new GLP.Vector( 0.0, 15.0, 0.0 );

		this.order = 1;

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		this.entity.position.copy( this.position );
		this.entity.position.x = Math.sin( event.timeElapsed * 0.5 ) * 0.4 + 2.0;
		this.entity.position.z = 3.0;
		this.entity.lookAt( new GLP.Vector( - 0.5, 0, 0 ) );

	}

}
