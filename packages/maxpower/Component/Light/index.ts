import * as GLP from 'glpower';

import { ComponentParams } from '..';
import { ShadowMapCamera } from '../Camera/ShadowMapCamera';

export type LightType = 'directional' | 'spot'

interface LightParams extends ComponentParams {
}

export class Light extends ShadowMapCamera {

	public lightType: LightType;

	// common

	public color: GLP.Vector;
	public intensity: number;

	public castShadow: boolean;
	private shadowMapSize: GLP.Vector;

	// spot

	public angle: number;
	public blend: number;
	public distance: number;
	public decay: number;

	// animation

	constructor( params?: LightParams ) {

		super( params );

		this.lightType = 'spot';
		this.cameraType = "perspective";

		this.color = new GLP.Vector( 1.0, 1.0, 1.0, 0.0 );
		this.intensity = 1;

		// shadow

		this.castShadow = true;
		this.shadowMapSize = new GLP.Vector( 1024, 1024 );

		// directional

		this.orthWidth = 4;
		this.orthHeight = 4;

		// spot

		this.angle = Math.PI * 0.5;
		this.blend = 1;
		this.distance = 30;
		this.decay = 2;

		this.updateProjectionMatrix();

	}

	public updateProjectionMatrix(): void {

		this.fov = this.angle / Math.PI * 180;

		super.updateProjectionMatrix();

	}

	public setShadowMap( renderTarget: GLP.GLPowerFrameBuffer ) {

		this.renderTarget = renderTarget;
		this.renderTarget.setSize( this.shadowMapSize );

	}

	public setShadowMapSize( size: GLP.Vector ) {

		this.shadowMapSize.copy( size );

		if ( this.renderTarget ) {

			this.renderTarget.setSize( this.shadowMapSize );

		}

	}

}
