import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class CameraRotateXY extends MXP.Component {

	private position: GLP.Vector;
	private rotateY: number;
	private rotateX: number;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.rotateY = 1.0 * ( Math.random() > 0.5 ? 1 : - 1 );
		this.rotateX = 1.0 * ( Math.random() > 0.5 ? 1 : - 1 );
		this.position = new GLP.Vector( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 ).normalize().multiply( 10 );

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		const t = event.timeDelta * 0.1;

		this.position.applyMatrix3(
			new GLP.Matrix().makeRotationAxis( new GLP.Vector( 0, 1.0, 0 ), t * this.rotateY )
		);

		this.position.applyMatrix3(
			new GLP.Matrix().makeRotationAxis( new GLP.Vector( 1.0, 0, 0 ), t * this.rotateX )
		);

		this.entity.position.copy( this.position );

		this.entity.lookAt( new GLP.Vector( 0, 0, 0 ) );

	}

}
