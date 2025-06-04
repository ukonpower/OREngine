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

	public dofParams: DofParams;

	private _gl: WebGL2RenderingContext;
	private _renderTarget: RenderCameraTarget;
	private _gBuffer: GLP.GLPowerFrameBuffer;
	private _resolution: GLP.Vector;

	constructor( params: MXP.ComponentParams<{gl: WebGL2RenderingContext}> ) {

		super( params );

		this.dofParams = {
			focusDistance: 0.5,
			kFilmHeight: 0.008,
		};

		const gl = params.args.gl;
		this._gl = gl;

		this._resolution = new GLP.Vector();

		this._gBuffer = new GLP.GLPowerFrameBuffer( gl );
		this._gBuffer.setTexture( [
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
		forwardBuffer.setDepthTexture( this._gBuffer.depthTexture );
		forwardBuffer.setTexture( [
			shadingBuffer.textures[ 0 ],
			this._gBuffer.textures[ 0 ],
			this._gBuffer.textures[ 4 ],
		] );

		const uiBuffer = new GLP.GLPowerFrameBuffer( gl, { disableDepthBuffer: true } );
		uiBuffer.setDepthTexture( this._gBuffer.depthTexture );
		uiBuffer.setTexture( [ new GLP.GLPowerTexture( gl ) ] );

		const normalBuffer = new GLP.GLPowerFrameBuffer( gl );
		normalBuffer.setTexture( [
			new GLP.GLPowerTexture( gl ).setting( { type: gl.FLOAT, internalFormat: gl.RGBA32F, format: gl.RGBA, magFilter: gl.NEAREST, minFilter: gl.NEAREST } )
		] );

		this._renderTarget = { gBuffer: this._gBuffer, shadingBuffer: shadingBuffer, forwardBuffer, uiBuffer, normalBuffer };

		this.resize( this._resolution );

	}

	public get resolution() {

		return this._resolution;

	}

	public get gBuffer() {

		return this._gBuffer;

	}

	public get renderTarget() {

		return this._renderTarget;

	}

	public resize( resolution: GLP.Vector ) {

		if ( resolution.x == this._resolution.x && resolution.y == this._resolution.y ) return;

		this._resolution.copy( resolution );
		this.aspect = resolution.x / resolution.y;

		if ( this._renderTarget ) {

			this._renderTarget.gBuffer.setSize( this._resolution );
			this._renderTarget.shadingBuffer.setSize( this._resolution );
			this._renderTarget.forwardBuffer.setSize( this._resolution );
			this._renderTarget.uiBuffer.setSize( this._resolution );
			this._renderTarget.normalBuffer.setSize( this._resolution );

		}

		this.needsUpdateProjectionMatrix = true;

	}

}
