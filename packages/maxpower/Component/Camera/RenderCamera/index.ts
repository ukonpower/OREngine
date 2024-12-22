import * as GLP from "glpower";
import * as MXP from 'maxpower';

import { Camera } from "..";

export type RenderCameraTarget = {
	gBuffer: GLP.GLPowerFrameBuffer,
	shadingBuffer: GLP.GLPowerFrameBuffer,
	forwardBuffer: GLP.GLPowerFrameBuffer,
	uiBuffer: GLP.GLPowerFrameBuffer,
	normalBuffer: GLP.GLPowerFrameBuffer,
}

type DofParams = {
	focusDistance: number;
	kFilmHeight: number;
}

export class RenderCamera extends Camera {

	public gl: WebGL2RenderingContext;
	public dofParams: DofParams;
	public renderTarget: RenderCameraTarget;
	public gBuffer: GLP.GLPowerFrameBuffer;

	private resolution: GLP.Vector;

	constructor( params: MXP.ComponentParams<{gl: WebGL2RenderingContext}> ) {

		super( params );

		this.dofParams = {
			focusDistance: 0.5,
			kFilmHeight: 0.008,
		};

		this.resolution = new GLP.Vector();
		const gl = params.args.gl;
		this.gl = gl;

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
		uiBuffer.setDepthTexture( this.gBuffer.depthTexture );
		uiBuffer.setTexture( [ new GLP.GLPowerTexture( gl ) ] );

		const normalBuffer = new GLP.GLPowerFrameBuffer( gl );
		normalBuffer.setTexture( [
			new GLP.GLPowerTexture( gl ).setting( { type: gl.FLOAT, internalFormat: gl.RGBA32F, format: gl.RGBA, magFilter: gl.NEAREST, minFilter: gl.NEAREST } )
		] );

		this.renderTarget = { gBuffer: this.gBuffer, shadingBuffer: shadingBuffer, forwardBuffer, uiBuffer, normalBuffer };

		this.resize( this.resolution );

	}

	public resize( resolution: GLP.Vector ) {

		this.resolution.copy( resolution );

		if ( this.renderTarget ) {

			this.renderTarget.gBuffer.setSize( this.resolution );
			this.renderTarget.shadingBuffer.setSize( this.resolution );
			this.renderTarget.forwardBuffer.setSize( this.resolution );
			this.renderTarget.uiBuffer.setSize( this.resolution );
			this.renderTarget.normalBuffer.setSize( this.resolution );

		}

	}

}
