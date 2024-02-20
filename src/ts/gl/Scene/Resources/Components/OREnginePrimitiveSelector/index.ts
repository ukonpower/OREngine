import * as GLP from 'glpower';
import * as MXP from 'maxpower';

export class OREnginePrimitiveSelector extends MXP.Component {

	private root: MXP.Entity;
	private primitives: MXP.Entity[] = [];

	constructor() {

		super();

		this.root = new MXP.Entity();
		this.root.position.set( 0, - 0.2, - 3 );

		const cube = new MXP.Entity();
		cube.noExport = true;
		cube.addComponent( "material", new MXP.Material( { distableEdit: true } ) ).enabled = true;
		cube.addComponent( "geometry", new MXP.CubeGeometry( { width: 2, height: 2, depth: 2, distableEdit: true } ) );
		cube.quaternion.setFromEuler( new GLP.Euler( 0.2, 0.0, 0.0 ) );
		this.primitives.push( cube );
		this.root.add( cube );

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		for ( let i = 0; i < this.primitives.length; i ++ ) {

			this.primitives[ i ].quaternion.multiply( new GLP.Quaternion().setFromEuler( new GLP.Euler( 0, - 0.005, 0 ) ) );

		}

	}

	protected setEntityImpl( entity: MXP.Entity | null, prevEntity: MXP.Entity | null ): void {

		if ( entity ) {

			entity.add( this.root );

		}

		if ( prevEntity ) {

			prevEntity.remove( this.root );

		}

	}


}
