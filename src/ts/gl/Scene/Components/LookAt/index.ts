import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class LookAt extends MXP.Component {

	public target: MXP.Entity | null;

	private up: GLP.Vector;
	private entityWorldPos: GLP.Vector;
	private targetWorldPos: GLP.Vector;

	public enable: boolean;

	constructor() {

		super();

		this.target = null;
		this.enable = true;
		this.entityWorldPos = new GLP.Vector();
		this.targetWorldPos = new GLP.Vector();
		this.up = new GLP.Vector( 0.0, 1.0, 0.0 );

	}

 	public setTarget( target: MXP.Entity | null ) {

		this.target = target;

	}

	public finalizeImpl( event: MXP.ComponentUpdateEvent ): void {

		const entity = event.entity;

		if ( this.target && this.enable ) {

			entity.matrixWorld.decompose( this.entityWorldPos );
			this.target.matrixWorld.decompose( this.targetWorldPos );

			entity.matrixWorld.lookAt( this.entityWorldPos, this.targetWorldPos, this.up );

			const camera = entity.getComponent<MXP.Camera>( 'camera' );

			if ( camera ) {

				camera.viewMatrix.copy( entity.matrixWorld ).inverse();

			}

		}


	}

}
