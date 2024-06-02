import * as GLP from 'glpower';

import { ComponentParams } from '..';
import { ExportableProps, ExportablePropsSerialized } from '../../Exportable';
import { ShadowMapCamera } from '../Camera/ShadowMapCamera';

import { gl } from '~/ts/Globals';

export type LightType = 'directional' | 'spot'

interface LightParams extends ComponentParams {
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

	constructor( params?: LightParams ) {

		super( params );

		this.lightType = 'directional';

		this.color = new GLP.Vector( 1.0, 1.0, 1.0, 0.0 );
		this.intensity = 1;

		// directional

		this.orthWidth = 4;
		this.orthHeight = 4;

		// spot

		this.angle = 50;
		this.blend = 1;
		this.distance = 30;
		this.decay = 2;

		this.updateProjectionMatrix();

	}

	static get key(): string {

		return "light";

	}

	public getProps(): ExportableProps | null {

		return {
			lightType: { value: this.lightType },
			color: { value: this.color },
			intensity: { value: this.intensity },
			angle: { value: this.angle },
			blend: { value: this.blend },
			distance: { value: this.distance },
			decay: { value: this.decay },
			useShadowMap: { value: this.renderTarget != null },
		};

	}

	public setProps( props: ExportablePropsSerialized ) {

		props = { ...this.getPropsSerialized(), ...props };

		this.lightType = props.lightType;

		if ( this.lightType == 'directional' ) this.cameraType = 'orthographic';
		if ( this.lightType == 'spot' ) this.cameraType = 'perspective';

		this.color.copy( props.color );
		this.intensity = props.intensity;
		this.angle = props.angle;
		this.blend = props.blend;
		this.distance = props.distance;
		this.decay = props.decay;

		if ( props.useShadowMap ) {

			this.renderTarget = new GLP.GLPowerFrameBuffer( gl ).setTexture( [ new GLP.GLPowerTexture( gl ).setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ) ] ).setSize( new GLP.Vector( 512, 512 ) );

		} else {

			this.renderTarget = null;

		}

		this.updateProjectionMatrix();

	}

	public updateProjectionMatrix(): void {

		this.fov = this.angle / Math.PI * 180;

		super.updateProjectionMatrix();

	}

}
