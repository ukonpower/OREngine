import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

export class LookAt extends MXP.Component {

	public target: MXP.Entity | null;

	private up: MTP.Vector;
	private targetWorldPos: MTP.Vector;
	private targetLocalPos: MTP.Vector;
	private localUp: MTP.Vector;
	private lookAtMatrix: MTP.Matrix;
	private parentInverse: MTP.Matrix;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.target = null;
		this.targetWorldPos = new MTP.Vector();
		this.targetLocalPos = new MTP.Vector();
		this.localUp = new MTP.Vector();
		this.up = new MTP.Vector( 0.0, 1.0, 0.0 );
		this.lookAtMatrix = new MTP.Matrix();
		this.parentInverse = new MTP.Matrix();

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
