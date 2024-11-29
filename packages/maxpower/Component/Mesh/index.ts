import * as MXP from 'maxpower';

export class Mesh extends MXP.Component {

	public geometry_: MXP.Geometry;
	public material_: MXP.Material;

	constructor( ) {

		super();

		this.geometry_ = new MXP.Geometry();
		this.material_ = new MXP.Material();

	}

	public get geometry() {

		return this.geometry_;

	}

	public set geometry( value: MXP.Geometry ) {

		this.geometry_ = value;

	}

	public get material() {

		return this.material_;

	}

	public set material( value: MXP.Material ) {

		this.material_ = value;

	}


}
