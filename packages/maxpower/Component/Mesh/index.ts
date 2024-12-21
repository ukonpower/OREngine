import { Component, ComponentParams } from "..";
import { Geometry } from "../../Geometry";
import { Material } from "../../Material";

const defaultGeometry = new Geometry();
const defaultMaterial = new Material();

export class Mesh extends Component {

	public geometry: Geometry;
	public material: Material;

	constructor( params: ComponentParams<{ geometry?: Geometry; material?: Material } | void> ) {

		super( params );

		const args = params.args || {};

		this.geometry = args.geometry || defaultGeometry;
		this.material = args.material || defaultMaterial;

		this.field( "material", () => {

			return this.material.name;

		}, undefined, {
			noExport: true,
			readOnly: true
		} );


	}

}
