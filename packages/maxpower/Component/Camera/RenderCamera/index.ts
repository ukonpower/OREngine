import * as GLP from "glpower";

import { CameraParam, Camera } from "..";
import { ComponentProps, ComponentSetProps } from "../..";

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

	public getProperties(): ComponentProps | null {

		return {
			type: {
				value: this.cameraType,
			},
			fov: {
				value: this.fov,
			},
			near: {
				value: this.near,
			},
			far: {
				value: this.far,
			},
			aspect: {
				value: this.aspect,
				opt: { readOnly: true }
			},
		};

	}

	public setPropertyValues( props: ComponentSetProps ) {

		this.cameraType = props.type;
		this.fov = props.fov;
		this.near = props.near;
		this.far = props.far;

		this.updateProjectionMatrix();

	}

	public resize( resolution: GLP.Vector ) {

		this.renderTarget.gBuffer.setSize( resolution );
		this.renderTarget.shadingBuffer.setSize( resolution );
		this.renderTarget.forwardBuffer.setSize( resolution );
		this.renderTarget.uiBuffer.setSize( resolution );

	}

}
