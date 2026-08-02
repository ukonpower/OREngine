import { Component, ComponentParams } from "..";

import type { MaterialBase } from "../../Material";

export class MaterialOverride extends Component {

	public material: MaterialBase | null;

	constructor( params: ComponentParams<MaterialBase | void> ) {

		super( params );

		this.material = params.args || null;

		this._tag = "materialOverride";

	}

}
