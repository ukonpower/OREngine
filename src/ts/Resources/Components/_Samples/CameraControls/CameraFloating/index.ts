import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class CameraFloating extends MXP.Component {

	private position: GLP.Vector;
	private lookat: GLP.Vector;

	private positionStart: GLP.Vector;
	private positionMove: GLP.Vector;

	private lookatStart: GLP.Vector;
	private lookAtMove: GLP.Vector;

	private cameraComponent: MXP.RenderCamera;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.position = new GLP.Vector( 0.0, 0.0, 10.0 );
		this.lookat = new GLP.Vector( 0.0, 0.0, 0.0 );

		const randomTheta = Math.random() * Math.PI * 2.0;

		// position

		const radius = 6.0 + Math.random() * 3.0;

		this.positionStart = new GLP.Vector(
			Math.cos( randomTheta ) * radius,
			( Math.random() - 0.5 ) * 4.0,
			Math.sin( randomTheta ) * radius
		);

		this.position.copy( this.positionStart );

		this.positionMove = new GLP.Vector()
			.set( Math.random() - 0.5, Math.random() - 0.5, 0.0, 0.0 )
			.normalize()
			.applyMatrix3( new GLP.Matrix().makeRotationAxis( new GLP.Vector( 0, 1, 0 ), - randomTheta ) )
			.multiply( 0.01 );


		// lookat

		const lookAtRadius = Math.random() * 5;

		this.lookatStart = new GLP.Vector(
			Math.cos( randomTheta ) * lookAtRadius,
			( Math.random() - 0.5 ) * 2.0,
			Math.sin( randomTheta ) * lookAtRadius
		);

		this.lookat.copy( this.lookatStart );

		this.lookAtMove = new GLP.Vector().copy( this.lookatStart ).normalize().multiply( - 0.01 );

		this.order = 1;

		// camera

		this.cameraComponent = this.entity.getComponent( MXP.RenderCamera )!;

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		this.position.add( this.positionMove.clone().multiply( event.timeDelta * 50.0 ) );
		this.lookat.add( this.lookAtMove.clone().multiply( event.timeDelta * 50.0 ) );

		this.entity.position.copy( this.position );
		this.entity.lookAt( this.lookat );

		this.cameraComponent.dofParams.focusDistance = this.position.distanceTo( new GLP.Vector() );

	}

}
