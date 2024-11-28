import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class VJCamera extends MXP.Component {

	private position: GLP.Vector;
	private lookAtPos: GLP.Vector;
	private animator: GLP.Animator;

	constructor() {

		super();

		this.position = new GLP.Vector();
		this.lookAtPos = new GLP.Vector();
		this.animator = new GLP.Animator();

		this.animator.add( "pos", new GLP.Vector( 0, 0, 0 ), GLP.Easings.cubicBezier( .08, .66, .25, .96 ) );

		const tick = () => {

			this.move();

		};

		const interval = setInterval( tick, 1000 );

		this.once( "dispose", () => {

			window.clearInterval( interval );

		} );


	}

	private move() {

		this.animator.animate( "pos", new GLP.Vector(
			( Math.random() - 0.5 ) * 5.0,
			( Math.random() - 0.5 ) * 5.0,
			( Math.random() - 0.5 ) * 5.0
		) );

	}

	protected updateImpl( { entity, timeDelta }: MXP.ComponentUpdateEvent ): void {

		this.animator.update( timeDelta );

		if ( entity ) {

			entity.position.copy( this.animator.get<GLP.Vector>( "pos" )!.value );

		}

	}

	protected finalizeImpl( { entity }: MXP.ComponentUpdateEvent ): void {

		entity.matrixWorld.lookAt( entity.position, this.lookAtPos, new GLP.Vector( 0, 1, 0 ) );

		// calc viewmatrix

		const cameraComponent = entity.getComponent( MXP.RenderCamera );

		if ( cameraComponent ) {

			cameraComponent.viewMatrix.copy( entity.matrixWorld ).inverse();

		}


	}

}
