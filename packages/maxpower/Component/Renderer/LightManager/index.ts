import * as GLP from 'glpower';
import { Entity } from '../../../Entity';
import { Light, LightType } from '../../Light';

// light

type LightInfo = {
	position: GLP.Vector;
	direction: GLP.Vector;
	color: GLP.Vector;
	component: Light;
}

export type CollectedLights = {[K in LightType]: LightInfo[]}

export class LightManager {

	private _lights: CollectedLights;
	private _lightsUpdated: boolean;
	private gl: WebGL2RenderingContext;

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;

		this._lights = {
			directional: [],
			spot: [],
		};

		this._lightsUpdated = false;

	}

	public get lights() {

		return this._lights;

	}

	public get lightsUpdated() {

		return this._lightsUpdated;

	}

	public collectLights( lightEntities: Entity[] ) {

		// lights

		const shadowMapLightList: Entity[] = [];
		const prevLightsNum: {[key:string]: number} = {};

		const lightKeys = Object.keys( this._lights );

		for ( let i = 0; i < lightKeys.length; i ++ ) {

			const l = lightKeys[ i ] as LightType;
			prevLightsNum[ l ] = this._lights[ l ].length;
			this._lights[ l ] = [];

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

		this._lights.directional.sort( ( a, b ) => ( a.component.castShadow ? 0 : 1 ) - ( b.component.castShadow ? 0 : 1 ) );
		this._lights.spot.sort( ( a, b ) => ( a.component.castShadow ? 0 : 1 ) - ( b.component.castShadow ? 0 : 1 ) );

		this._lightsUpdated = false;

		for ( let i = 0; i < lightKeys.length; i ++ ) {

			const l = lightKeys[ i ] as LightType;

			if ( prevLightsNum[ l ] != this._lights[ l ].length ) {

				this._lightsUpdated = true;

				break;

			}

		}

		return {
			lights: this._lights,
			lightsUpdated: this._lightsUpdated,
			shadowMapLightList
		};

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

			this._lights.directional.push( info );

		} else if ( type == 'spot' ) {

			this._lights.spot.push( info );

		}

		if ( lightComponent.castShadow && lightComponent.renderTarget == null ) {

			lightComponent.setShadowMap(
				new GLP.GLPowerFrameBuffer( this.gl ).setTexture( [ new GLP.GLPowerTexture( this.gl ).setting( { magFilter: this.gl.LINEAR, minFilter: this.gl.LINEAR } ) ] )
			);

		}

	}

}
