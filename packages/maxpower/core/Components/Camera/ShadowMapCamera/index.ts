import * as MTP from 'mathpower';

import { Camera } from "..";
import { ComponentParams, ComponentUpdateEvent } from "../../../Component";

export class ShadowMapCamera extends Camera {

	private viewMatrixOffset: MTP.Quaternion;

	constructor( params: ComponentParams ) {

		super( params );

		this.viewMatrixOffset = new MTP.Quaternion().setFromEuler( { x: - Math.PI / 2, y: 0, z: 0 } );

		this.near = 0.1;
		this.far = 100;

		this.displayOut = false;

	}

	protected prepareRenderImpl( event: ComponentUpdateEvent ): void {

		super.prepareRenderImpl( event );

		this.viewMatrix.copy( this.entity.matrixWorld ).applyQuaternion( this.viewMatrixOffset ).inverse();

	}

}
