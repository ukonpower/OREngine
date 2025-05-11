import * as GLP from 'glpower';

import { Entity } from '../../../Entity';
import { Light, LightType } from '../../Light';

// light
export type LightInfo = {
	position: GLP.Vector;
	direction: GLP.Vector;
	color: GLP.Vector;
	component: Light;
}

export type CollectedLights = {[K in LightType]: LightInfo[]}

export class LightManager {

	private lights: CollectedLights;
	private lightsUpdated: boolean;
	private gl: WebGL2RenderingContext;

	// tmp
	private tmpLightDirection: GLP.Vector;

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;

		// lights
		this.lights = {
			directional: [],
			spot: [],
		};

		this.lightsUpdated = false;
		this.tmpLightDirection = new GLP.Vector();

	}

	public getLights(): CollectedLights {

		return this.lights;

	}

	public isLightsUpdated(): boolean {

		return this.lightsUpdated;

	}

	public resetLightsUpdated(): void {

		this.lightsUpdated = false;

	}

	public collectLights( lightEntities: Entity[] ): Entity[] {

		const shadowMapLightList: Entity[] = [];
		const prevLightsNum: {[key:string]: number} = {};

		const lightKeys = Object.keys( this.lights );

		for ( let i = 0; i < lightKeys.length; i ++ ) {

			const l = lightKeys[ i ] as LightType;
			prevLightsNum[ l ] = this.lights[ l ].length;
			this.lights[ l ] = [];

		}

		for ( let i = 0; i < lightEntities.length; i ++ ) {

			const lightEntity = lightEntities[ i ];
			const lightComponent = lightEntity.getComponent( Light );

			if ( lightComponent ) {

				this.collectLight( lightEntity, lightComponent );

				if ( lightComponent.castShadow && lightComponent.renderTarget ) {

					shadowMapLightList.push( lightEntity );

				}

			}

		}

		this.lights.directional.sort( ( a, b ) => ( a.component.castShadow ? 0 : 1 ) - ( b.component.castShadow ? 0 : 1 ) );
		this.lights.spot.sort( ( a, b ) => ( a.component.castShadow ? 0 : 1 ) - ( b.component.castShadow ? 0 : 1 ) );

		this.lightsUpdated = false;

		for ( let i = 0; i < lightKeys.length; i ++ ) {

			const l = lightKeys[ i ] as LightType;

			if ( prevLightsNum[ l ] != this.lights[ l ].length ) {

				this.lightsUpdated = true;
				break;

			}

		}

		return shadowMapLightList;

	}

	private collectLight( lightEntity: Entity, lightComponent: Light ) {

		const type = lightComponent.lightType;

		const info: LightInfo = {
			position: new GLP.Vector( 0.0, 0.0, 0.0, 1.0 ).applyMatrix4( lightEntity.matrixWorld ),
			direction: new GLP.Vector( 0.0, 1.0, 0.0, 0.0 ).applyMatrix4( lightEntity.matrixWorld ).normalize(),
			color: new GLP.Vector( lightComponent.color.x, lightComponent.color.y, lightComponent.color.z ).multiply( lightComponent.intensity * Math.PI ),
			component: lightComponent,
		};

		if ( type == 'directional' ) {

			this.lights.directional.push( info );

		} else if ( type == 'spot' ) {

			this.lights.spot.push( info );

		}

		if ( lightComponent.castShadow && lightComponent.renderTarget == null ) {

			lightComponent.setShadowMap(
				new GLP.GLPowerFrameBuffer( this.gl ).setTexture( [ new GLP.GLPowerTexture( this.gl ).setting( { magFilter: this.gl.LINEAR, minFilter: this.gl.LINEAR } ) ] )
			);

		}

	}

	public getTmpLightDirection(): GLP.Vector {

		return this.tmpLightDirection;

	}

}
