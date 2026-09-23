import * as MTP from 'mathpower';

import { ComponentParams } from '../../Component';
import { ShadowMapCamera } from '../Camera/ShadowMapCamera';

export type LightType = 'directional' | 'spot'

export class Light extends ShadowMapCamera {

	public lightType: LightType;

	// common

	public color: MTP.Vector;
	public intensity: number;

	public castShadow: boolean;
	public shadowMapSize: MTP.Vector;

	// spot

	public angle: number;
	public blend: number;
	public distance: number;
	public decay: number;

	// animation

	constructor( params: ComponentParams ) {

		super( params );

		this.lightType = 'spot';
		this.cameraType = "perspective";

		this.color = new MTP.Vector( 1.0, 1.0, 1.0, 0.0 );
		this.intensity = 1;

		// shadow

		this.castShadow = true;
		this.shadowMapSize = new MTP.Vector( 1024, 1024 );

		// spot

		this.angle = Math.PI * 0.5;
		this.blend = 1;
		this.distance = 30;
		this.decay = 2;

		// field

		this.field( "lightType", () => this.lightType, ( v ) => this.lightType = v, { format: { type: "select", list: [ "directional", "spot" ] } } );
		this.field( "color", () => this.color.getElm( "vec3" ), ( v ) => this.color.setFromArray( v ), { format: { type: "vector" } } );
		this.field( "castShadow", () => this.castShadow, ( v ) => this.castShadow = v );
		this.field( "angle", () => this.angle, ( v ) => {

			this.angle = v;
			this.needsUpdateProjectionMatrix = true;

		} );
		this.field( "blend", () => this.blend, ( v ) => this.blend = v );

		this.field(
			"intensity",
			() => this.intensity,
			( value: number ) => this.intensity = value,
		);

		this.updateProjectionMatrix();

	}

	public updateProjectionMatrix(): void {

		this.fov = this.angle / Math.PI * 180;

		super.updateProjectionMatrix();

	}

	public lookAt( targetWorldPos: MTP.Vector ) {

		this.entity.lookAt( targetWorldPos );
		this.entity.quaternion.multiply( new MTP.Quaternion( ).setFromEuler( new MTP.Euler( Math.PI / 2 ) ) );

	}

}
