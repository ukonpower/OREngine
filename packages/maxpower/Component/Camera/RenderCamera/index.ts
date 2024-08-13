import * as GLP from "glpower";

import { CameraParam, Camera } from "..";
import { ExportableProps, ExportablePropsSerialized } from "../../../Exportable";

export type RenderCameraTarget = {
	gBuffer: GLP.GLPowerFrameBuffer,
	shadingBuffer: GLP.GLPowerFrameBuffer,
	forwardBuffer: GLP.GLPowerFrameBuffer,
	uiBuffer: GLP.GLPowerFrameBuffer,
}

export interface RenderCameraParam extends CameraParam {
	gl: WebGL2RenderingContext
}

type DofParams = {
	focusDistance: number;
	kFilmHeight: number;
}

export class RenderCamera extends Camera {

	public renderTarget: RenderCameraTarget;
	public dof: DofParams;

	constructor( param: RenderCameraParam ) {

		super( param );

		const gl = param?.gl;

		const gBuffer = new GLP.GLPowerFrameBuffer( gl );
		gBuffer.setTexture( [
			new GLP.GLPowerTexture( gl ).setting( { type: gl.FLOAT, internalFormat: gl.RGBA32F, format: gl.RGBA, magFilter: gl.NEAREST, minFilter: gl.NEAREST } ),
			new GLP.GLPowerTexture( gl ).setting( { type: gl.FLOAT, internalFormat: gl.RGBA32F, format: gl.RGBA } ),
			new GLP.GLPowerTexture( gl ),
			new GLP.GLPowerTexture( gl ),
			new GLP.GLPowerTexture( gl ).setting( { type: gl.FLOAT, internalFormat: gl.RGBA32F, format: gl.RGBA } ),
		] );

		const shadingBuffer = new GLP.GLPowerFrameBuffer( gl, { disableDepthBuffer: true } );
		shadingBuffer.setTexture( [
			new GLP.GLPowerTexture( gl ).setting( { type: gl.FLOAT, internalFormat: gl.RGBA16F, format: gl.RGBA } ),
			new GLP.GLPowerTexture( gl ).setting( { type: gl.FLOAT, internalFormat: gl.RGBA16F, format: gl.RGBA } ),
		] );

		const forwardBuffer = new GLP.GLPowerFrameBuffer( gl, { disableDepthBuffer: true } );
		forwardBuffer.setDepthTexture( gBuffer.depthTexture );
		forwardBuffer.setTexture( [
			shadingBuffer.textures[ 0 ],
			gBuffer.textures[ 0 ],
		] );

		const uiBuffer = new GLP.GLPowerFrameBuffer( gl, { disableDepthBuffer: true } );
		uiBuffer.setTexture( [ new GLP.GLPowerTexture( gl ) ] );

		this.renderTarget = { gBuffer, shadingBuffer: shadingBuffer, forwardBuffer, uiBuffer };

		// dof

		this.dof = {
			focusDistance: 0.5,
			kFilmHeight: 0.002,
		};

	}

	public resize( resolution: GLP.Vector ) {

		this.renderTarget.gBuffer.setSize( resolution );
		this.renderTarget.shadingBuffer.setSize( resolution );
		this.renderTarget.forwardBuffer.setSize( resolution );
		this.renderTarget.uiBuffer.setSize( resolution );

	}

}
