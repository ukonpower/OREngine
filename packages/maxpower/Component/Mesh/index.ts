import * as MXP from 'maxpower';

const defaultGeometry = new MXP.Geometry();
const defaultMaterial = new MXP.Material();

export class Mesh extends MXP.Component {

	public geometry: MXP.Geometry;
	public material: MXP.Material;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.geometry = defaultGeometry;
		this.material = defaultMaterial;

	}

}
