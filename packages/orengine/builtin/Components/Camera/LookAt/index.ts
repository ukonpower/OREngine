import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class LookAt extends MXP.Component {

	public target: MXP.Entity | null;

	private up: GLP.Vector;
	private targetWorldPos: GLP.Vector;
	private targetLocalPos: GLP.Vector;
	private localUp: GLP.Vector;
	private lookAtMatrix: GLP.Matrix;
	private parentInverse: GLP.Matrix;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.target = null;
		this.targetWorldPos = new GLP.Vector();
		this.targetLocalPos = new GLP.Vector();
		this.localUp = new GLP.Vector();
		this.up = new GLP.Vector( 0.0, 1.0, 0.0 );
		this.lookAtMatrix = new GLP.Matrix();
		this.parentInverse = new GLP.Matrix();

		this.order = 100;

	}

	public setTarget( target: MXP.Entity | null ) {

		this.target = target;

	}

	protected postUpdateImpl( _event: MXP.ComponentUpdateEvent ): void {

		if ( this.target && this._enabled ) {

			this.target.matrixWorld.decompose( this.targetWorldPos );
			this.targetLocalPos.copy( this.targetWorldPos );
			this.localUp.copy( this.up );

			if ( this.entity.parent ) {

				this.parentInverse.copy( this.entity.parent.matrixWorld ).inverse();
				this.targetLocalPos.applyMatrix4AsPosition( this.parentInverse );
				this.localUp.applyMatrix4AsDirection( this.parentInverse ).normalize();

			}

			this.lookAtMatrix.lookAt( this.entity.position, this.targetLocalPos, this.localUp );
			this.entity.quaternion.setFromMatrix( this.lookAtMatrix );

		}


	}

}
