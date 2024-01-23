import * as GLP from "glpower";

import { CameraParam, Camera } from "..";
import { ComponentProps } from "../..";

import { power } from "~/ts/Globals";

export type RenderCameraTarget = {
	gBuffer: GLP.GLPowerFrameBuffer,
	shadingBuffer: GLP.GLPowerFrameBuffer,
	forwardBuffer: GLP.GLPowerFrameBuffer,
	uiBuffer: GLP.GLPowerFrameBuffer,
}

export interface RenderCameraParam extends CameraParam {
	gl: WebGL2RenderingContext
}

export class RenderCamera extends Camera {

	public renderTarget: RenderCameraTarget;

	constructor( gl: WebGL2RenderingContext, param?: RenderCameraParam ) {

		super( param );

		const gBuffer = new GLP.GLPowerFrameBuffer( gl );
		gBuffer.setTexture( [
			power.createTexture().setting( { type: gl.FLOAT, internalFormat: gl.RGBA32F, format: gl.RGBA, magFilter: gl.NEAREST, minFilter: gl.NEAREST } ),
			power.createTexture().setting( { type: gl.FLOAT, internalFormat: gl.RGBA32F, format: gl.RGBA } ),
			power.createTexture(),
			power.createTexture(),
			power.createTexture().setting( { type: gl.FLOAT, internalFormat: gl.RGBA32F, format: gl.RGBA } ),
		] );

		const shadingBuffer = new GLP.GLPowerFrameBuffer( gl, { disableDepthBuffer: true } );
		shadingBuffer.setTexture( [
			power.createTexture().setting( { type: gl.FLOAT, internalFormat: gl.RGBA16F, format: gl.RGBA } ),
			power.createTexture().setting( { type: gl.FLOAT, internalFormat: gl.RGBA16F, format: gl.RGBA } ),
		] );

		const forwardBuffer = new GLP.GLPowerFrameBuffer( gl, { disableDepthBuffer: true } );
		forwardBuffer.setDepthTexture( gBuffer.depthTexture );
		forwardBuffer.setTexture( [ shadingBuffer.textures[ 0 ] ] );

		const uiBuffer = new GLP.GLPowerFrameBuffer( gl, { disableDepthBuffer: true } );
		uiBuffer.setTexture( [ power.createTexture() ] );

		this.renderTarget = { gBuffer, shadingBuffer: shadingBuffer, forwardBuffer, uiBuffer };

	}

	public get property(): ComponentProps | null {

		return {
			type: {
				value: this.cameraType,
				opt: { editable: true }
			},
			fov: {
				value: this.fov,
				opt: { editable: true }
			},
			near: {
				value: this.near,
				opt: { editable: true }
			},
			far: {
				value: this.far,
				opt: { editable: true }
			},
			aspect: {
				value: this.aspect
			},
		};

	}

	public set property( props: ComponentProps ) {

		this.cameraType = props.type.value;
		this.fov = props.fov.value;
		this.near = props.near.value;
		this.far = props.far.value;

		this.updateProjectionMatrix();

	}

	public resize( resolution: GLP.Vector ) {

		this.renderTarget.gBuffer.setSize( resolution );
		this.renderTarget.shadingBuffer.setSize( resolution );
		this.renderTarget.forwardBuffer.setSize( resolution );
		this.renderTarget.uiBuffer.setSize( resolution );

	}

}
