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

		// 影を描くためのカメラで DoF は使わないので、ピント制御を止めて field も出さない
		this.focusEnabled = false;
		this.removeField( "focus/" );
		this.removeField( "focus/mode" );
		this.removeField( "focus/target" );
		this.removeField( "focus/distance" );
		this.removeField( "focus/speed" );

	}

	protected prepareRenderImpl( event: ComponentUpdateEvent ): void {

		super.prepareRenderImpl( event );

		this.viewMatrix.copy( this.entity.matrixWorld ).applyQuaternion( this.viewMatrixOffset ).inverse();

	}

}
