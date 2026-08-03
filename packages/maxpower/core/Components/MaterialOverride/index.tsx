import { Component, ComponentParams } from "../../Component";

import type { MaterialContract } from "../../Contracts/MaterialContract";

export class MaterialOverride extends Component {

	public material: MaterialContract | null;

	constructor( params: ComponentParams<MaterialContract | void> ) {

		super( params );

		this.material = params.args || null;

		this._tag = "materialOverride";

	}

}
