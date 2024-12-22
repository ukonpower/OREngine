import { Component, ComponentParams } from "..";
import { Material } from "../../Material";

const defaultMaterial = new Material();

export class MaterialOverride extends Component {

	public material: Material;

	constructor( params: ComponentParams<Material | void> ) {

		super( params );

		this.material = params.args || defaultMaterial;

		this._tag = "materialOverride";

	}

}
