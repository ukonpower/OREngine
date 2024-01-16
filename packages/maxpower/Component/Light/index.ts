import * as GLP from 'glpower';

import { CameraParam } from "../Camera";
import { gl } from '~/ts/Globals';
import { ShadowMapCamera } from '../Camera/ShadowMapCamera';

export type LightType = 'directional' | 'spot'

export interface LightParam extends Omit<CameraParam, 'renderTarget'> {
	lightType: LightType;
	intensity?: number;
	color?: GLP.Vector;
	useShadowMap?: boolean;
	angle?: number;
	blend?: number;
	distance?: number;
	decay?: number;
}

export class Light extends ShadowMapCamera {

	public lightType: LightType;

	// common

	public color: GLP.Vector;
	public intensity: number;

	// spot

	public angle: number;
	public blend: number;
	public distance: number;
	public decay: number;

	// animation

	constructor( param: LightParam ) {

		param.far = param.far ?? 100;

		super( { ...param, renderTarget: param.useShadowMap ? new GLP.GLPowerFrameBuffer( gl ).setTexture( [ new GLP.GLPowerTexture( gl ).setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ) ] ).setSize( new GLP.Vector( 512, 512 ) ) : null } );

		this.lightType = param.lightType;

		if ( this.lightType == 'directional' ) this.cameraType = 'orthographic';
		if ( this.lightType == 'spot' ) this.cameraType = 'perspective';

		this.color = param.color ? param.color.clone() : new GLP.Vector( 1.0, 1.0, 1.0, 0.0 );
		this.intensity = param.intensity ?? 1;

		// directional

		this.orthWidth = 4;
		this.orthHeight = 4;

		// spot

		this.angle = param.angle ?? 50;
		this.blend = param.blend ?? 1;
		this.distance = param.distance ?? 30;
		this.decay = param.decay ?? 2;

		this.updateProjectionMatrix();

	}

	public updateProjectionMatrix(): void {

		this.fov = this.angle / Math.PI * 180;

		super.updateProjectionMatrix();

	}

}
