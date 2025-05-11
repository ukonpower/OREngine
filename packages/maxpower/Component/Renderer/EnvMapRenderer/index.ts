import * as GLP from 'glpower';

import { Entity } from '../../../Entity';
import { Camera } from '../../Camera';

export type EnvMapCamera = {
	entity: Entity,
	camera: Camera,
}

export class EnvMapRenderer {

	private gl: WebGL2RenderingContext;
	private envMapCameras: EnvMapCamera[];
	public envMapRenderTarget: GLP.GLPowerFrameBufferCube;

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;

		// envmap texture
		const envMap = new GLP.GLPowerTextureCube( this.gl );
		this.envMapRenderTarget = new GLP.GLPowerFrameBufferCube( this.gl ).setTexture( [ envMap ] );
		this.envMapRenderTarget.setSize( 256, 256 );

		// create cameras
		const origin = new GLP.Vector( 0, 0, 0 );
		const up = new GLP.Vector( 0, - 1, 0 );

		const lookAtMatrices = [
			new GLP.Matrix().lookAt( origin, new GLP.Vector( 1, 0, 0 ), up ),
			new GLP.Matrix().lookAt( origin, new GLP.Vector( 0, 1, 0 ), new GLP.Vector( 0, 0, 1 ) ),
			new GLP.Matrix().lookAt( origin, new GLP.Vector( 0, 0, 1 ), up ),
			new GLP.Matrix().lookAt( origin, new GLP.Vector( - 1, 0, 0 ), up ),
			new GLP.Matrix().lookAt( origin, new GLP.Vector( 0, - 1, 0 ), new GLP.Vector( 0, 0, - 1 ) ),
			new GLP.Matrix().lookAt( origin, new GLP.Vector( 0, 0, - 1 ), up ),
		];

		this.envMapCameras = [];

		for ( let i = 0; i < 6; i ++ ) {

			const entity = new Entity( { name: "envMapCamera/" + i } );
			const camera = entity.addComponent( Camera );
			camera.fov = 90;
			camera.near = 0.1;
			camera.far = 1000;
			camera.aspect = 1;
			entity.applyMatrix( lookAtMatrices[ i ].clone() );
			camera.updateViewMatrix();
			camera.updateProjectionMatrix();
			this.envMapCameras.push( { entity, camera } );

		}

	}

	public getEnvMapCameras(): EnvMapCamera[] {

		return this.envMapCameras;

	}

	public getEnvMapTexture(): GLP.GLPowerTextureCube {

		return this.envMapRenderTarget.textures[ 0 ] as GLP.GLPowerTextureCube;

	}

}
