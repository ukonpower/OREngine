import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class CameraRotateY extends MXP.Component {

	private rotateY: number;
	private position: GLP.Vector;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.position = new GLP.Vector( 0.0, 0.0, 10.0 );
		this.rotateY = Math.random() > 0.5 ? 1 : - 1;

		this.position.applyMatrix3(
			new GLP.Matrix().makeRotationAxis( new GLP.Vector( 0, 1.0, 0 ), Math.random() * Math.PI * 2 )
		);

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		const t = event.timeDelta * 0.5;

		this.position.applyMatrix3(
			new GLP.Matrix().makeRotationAxis( new GLP.Vector( 0, 1.0, 0 ), t * this.rotateY )
		);

		this.entity.position.copy( this.position );
		this.entity.lookAt( new GLP.Vector( 0, 0, 0 ) );

	}

}
