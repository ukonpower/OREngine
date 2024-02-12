import * as GLP from 'glpower';

import { CameraParam, Camera } from "..";
import { ComponentUpdateEvent } from "../..";

export interface ShadowMapCameraParam extends CameraParam {
}

export class ShadowMapCamera extends Camera {

	public renderTarget: GLP.GLPowerFrameBuffer | null;
	private viewMatrixOffset: GLP.Quaternion;

	constructor( params?: ShadowMapCameraParam ) {

		super( params );

		params = params || {};

		this.renderTarget = null;
		this.viewMatrixOffset = new GLP.Quaternion().setFromEuler( { x: - Math.PI / 2, y: 0, z: 0 } );

		this.near = 0.1;
		this.far = 100;

	}

	protected postUpdateImpl( event: ComponentUpdateEvent ): void {

		super.postUpdateImpl( event );

		this.viewMatrix.copy( event.entity.matrixWorld ).applyQuaternion( this.viewMatrixOffset ).inverse();

	}

}
