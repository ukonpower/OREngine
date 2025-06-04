import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class CameraFixedDrive extends MXP.Component {

	private position: GLP.Vector;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.position = new GLP.Vector( 0.0, 0.0, 10.0 );

		this.order = 1;

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		this.entity.position.copy( this.position );
		this.entity.position.x = Math.sin( event.timeElapsed * 0.5 ) * 1.0 - 1.0;
		this.entity.position.y = Math.sin( event.timeElapsed * 0.8 ) * 0.5;
		this.entity.lookAt( new GLP.Vector( 4, 4, - 10 ) );

	}

}
