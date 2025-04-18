import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class LookAt extends MXP.Component {

	public target: MXP.Entity | null;

	private up: GLP.Vector;
	private entityWorldPos: GLP.Vector;
	private targetWorldPos: GLP.Vector;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.target = null;
		this.entityWorldPos = new GLP.Vector();
		this.targetWorldPos = new GLP.Vector();
		this.up = new GLP.Vector( 0.0, 1.0, 0.0 );

		this.order = 9999;

	}

	public setTarget( target: MXP.Entity | null ) {

		this.target = target;

	}

	public beforeRenderImpl( event: MXP.ComponentUpdateEvent ): void {

		if ( this.target && this._enabled ) {

			this.entity.matrixWorld.decompose( this.entityWorldPos );
			this.target.matrixWorld.decompose( this.targetWorldPos );

			this.entity.matrixWorld.lookAt( this.entityWorldPos, this.targetWorldPos, this.up );

			const camera = this.entity.getComponentsByTag<MXP.Camera>( "camera" )[ 0 ];

			if ( camera ) {

				camera.viewMatrix.copy( this.entity.matrixWorld ).inverse();

			}

		}


	}

}
