import * as GLP from "glpower";

import { CameraParam, Camera } from "..";

export type RenderCameraTarget = {
	gBuffer: GLP.GLPowerFrameBuffer,
	shadingBuffer: GLP.GLPowerFrameBuffer,
	forwardBuffer: GLP.GLPowerFrameBuffer,
	uiBuffer: GLP.GLPowerFrameBuffer,
	normalBuffer: GLP.GLPowerFrameBuffer,
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
	public gBuffer: GLP.GLPowerFrameBuffer;

	constructor( param: RenderCameraParam ) {

		super( param );

		const gl = param?.gl;

		this.gBuffer = new GLP.GLPowerFrameBuffer( gl );
		this.gBuffer.setTexture( [
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
		forwardBuffer.setDepthTexture( this.gBuffer.depthTexture );
		forwardBuffer.setTexture( [
			shadingBuffer.textures[ 0 ],
			this.gBuffer.textures[ 0 ],
			this.gBuffer.textures[ 4 ],
		] );

		const uiBuffer = new GLP.GLPowerFrameBuffer( gl, { disableDepthBuffer: true } );
		uiBuffer.setTexture( [ new GLP.GLPowerTexture( gl ) ] );

		const normalBuffer = new GLP.GLPowerFrameBuffer( gl );
		normalBuffer.setTexture( [
			new GLP.GLPowerTexture( gl ).setting( { type: gl.FLOAT, internalFormat: gl.RGBA32F, format: gl.RGBA, magFilter: gl.NEAREST, minFilter: gl.NEAREST } )
		] );

		this.renderTarget = { gBuffer: this.gBuffer, shadingBuffer: shadingBuffer, forwardBuffer, uiBuffer, normalBuffer };

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
		this.renderTarget.normalBuffer.setSize( resolution );

	}

}
