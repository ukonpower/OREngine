import { Component, ComponentParams } from "..";
import { Geometry } from "../../Geometry";
import { Material } from "../../Material";


const defaultGeometry = new Geometry();
const defaultMaterial = new Material();

export class Mesh extends Component {

	public geometry: Geometry;
	public material: Material;

	constructor( params: ComponentParams ) {

		super( params );

		this.geometry = defaultGeometry;
		this.material = defaultMaterial;

	}

}
