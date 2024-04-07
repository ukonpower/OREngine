import * as GLP from 'glpower';
import * as MXP from 'maxpower';


export class RotateViewer extends MXP.Component {

	private speed: number;

	public target: GLP.Vector;
	public rotBasePos: GLP.Vector;
	public rotSpeed: number;

	private quaternion: GLP.Quaternion;
	private matrix: GLP.Matrix;

	constructor( param: MXP.ComponentParams ) {

		super();

		this.speed = 1;

		this.target = new GLP.Vector( 0, 0, 0, 0 );
		this.rotBasePos = new GLP.Vector( 0, 0, 0 );
		this.rotSpeed = 0.3;

		this.quaternion = new GLP.Quaternion();
		this.matrix = new GLP.Matrix();

	}

	protected setEntityImpl( entity: MXP.Entity | null, prevEntity: MXP.Entity | null ): void {

		if ( entity ) {

			entity.on( "sceneCreated", () => {

				this.rotBasePos.copy( entity.position );

			} );

		}

	}

	public getProps(): MXP.ExportableProps {

		return {
			speed: { value: this.speed }
		};

	}
	public setProps( props: MXP.ExportablePropsSerialized ) {

		this.speed = props.speed;

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		const entity = event.entity;

		this.quaternion.setFromEuler( { x: 0, y: event.timeDelta / Math.PI * this.rotSpeed * this.speed, z: 0 } );
		this.matrix.identity().applyQuaternion( this.quaternion );

		this.rotBasePos.applyMatrix3( this.matrix );

		entity.position.copy( this.target );
		entity.position.add( this.rotBasePos );

	}


}
