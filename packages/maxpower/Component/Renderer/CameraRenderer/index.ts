import * as GLP from 'glpower';

import { Entity } from '../../../Entity';
import { MaterialRenderType } from '../../../Material';
import { Camera } from '../../Camera';
import { Light } from '../../Light';
import { MaterialOverride } from '../../MaterialOverride';
import { Mesh } from '../../Mesh';
import { DrawManager, DrawParam } from '../DrawManager';
import { CollectedLights } from '../LightManager';

// render option
export interface RenderOption {
	cameraOverride?: CameraParam,
	uniformOverride?: GLP.Uniforms,
	disableClear?: boolean,
}

export interface CameraParam {
	viewMatrix?: GLP.Matrix;
	viewMatrixPrev?: GLP.Matrix;
	projectionMatrix?: GLP.Matrix;
	projectionMatrixPrev?: GLP.Matrix;
	cameraMatrixWorld?: GLP.Matrix;
	cameraNear?: number,
	cameraFar?:number,
}

export class CameraRenderer {

	private gl: WebGL2RenderingContext;
	private drawManager: DrawManager;
	private onDrawPass: ( renderTarget: GLP.GLPowerFrameBuffer | null, name: string ) => void;

	constructor( gl: WebGL2RenderingContext, drawManager: DrawManager, onDrawPass: ( renderTarget: GLP.GLPowerFrameBuffer | null, name: string ) => void ) {

		this.gl = gl;
		this.drawManager = drawManager;
		this.onDrawPass = onDrawPass;

	}

	public renderCamera( renderType: MaterialRenderType, cameraEntity: Entity, entities: Entity[], renderTarget: GLP.GLPowerFrameBuffer | null, canvasSize: GLP.Vector, lights: CollectedLights, renderOption?: RenderOption ) {

		const camera = cameraEntity.getComponentsByTag<Camera>( "camera" )[ 0 ] || cameraEntity.getComponent( Light )!;

		renderOption = renderOption || {};

		const drawParam: DrawParam = {
			viewMatrix: camera.viewMatrix,
			viewMatrixPrev: camera.viewMatrixPrev,
			projectionMatrix: camera.projectionMatrix,
			projectionMatrixPrev: camera.projectionMatrixPrev,
			cameraMatrixWorld: cameraEntity.matrixWorld,
			cameraNear: camera.near,
			cameraFar: camera.far,
			renderTarget: renderTarget,
			uniformOverride: renderOption.uniformOverride,
			...renderOption.cameraOverride,
		};

		if ( camera.viewPort ) {

			const v = camera.viewPort;
			this.gl.viewport( v.x, v.y, v.z, v.w );

		} else {

			if ( renderTarget ) {

				this.gl.viewport( 0, 0, renderTarget.size.x, renderTarget.size.y );

			} else {

				this.gl.viewport( 0, 0, canvasSize.x, canvasSize.y );

			}

		}

		const resolution = new GLP.Vector();

		if ( renderTarget ) {

			this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, renderTarget.getFrameBuffer() );
			this.gl.drawBuffers( renderTarget.textureAttachmentList );
			resolution.set( renderTarget.size.x, renderTarget.size.y );

		} else {

			this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );
			resolution.set( canvasSize.x, canvasSize.y );

		}

		if ( ! drawParam.uniformOverride ) drawParam.uniformOverride = {};

		drawParam.uniformOverride.uResolution = {
			value: resolution,
			type: '2fv'
		};

		// clear
		if ( ! renderOption.disableClear ) {

			if ( renderType == "shadowMap" ) {

				this.gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
				this.gl.clearDepth( 1.0 );

			} else {

				this.gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
				this.gl.clearDepth( 1.0 );

			}

			this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );

		}

		// render
		for ( let i = 0; i < entities.length; i ++ ) {

			const entity = entities[ i ];
			const materialOverride = entity.getComponentsByTag<MaterialOverride>( "materialOverride" )[ 0 ];
			const mesh = entity.getComponent( Mesh )!;
			const material = materialOverride ? materialOverride.material : mesh.material;
			const geometry = mesh.geometry;

			drawParam.modelMatrixWorld = entity.matrixWorld;
			drawParam.modelMatrixWorldPrev = entity.matrixWorldPrev;
			drawParam.label = `cam[${camera.uuid}]/${entity.name || material.name || "-"}`;

			this.drawManager.draw( entity.uuid, renderType, geometry, material, lights, drawParam );

		}

		this.onDrawPass( renderTarget, "camera/" + renderType );

	}

}
