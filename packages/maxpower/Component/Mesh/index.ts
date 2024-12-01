import * as MXP from 'maxpower';

const defaultGeometry = new MXP.Geometry();
const defaultMaterial = new MXP.Material();

export class Mesh extends MXP.Component {

	public geometry_: MXP.Geometry;
	public material_: MXP.Material;

	constructor( geometry?: MXP.Geometry, material?: MXP.Material ) {

		super();

		this.geometry_ = geometry || defaultGeometry;
		this.material_ = material || defaultMaterial;

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
