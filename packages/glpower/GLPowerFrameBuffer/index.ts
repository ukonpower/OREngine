import { Vector } from 'mathpower';

import { GLPowerTexture } from "../GLPowerTexture";

export type GLPowerFrameBfferOpt = {
	disableDepthBuffer?: boolean
}

export class GLPowerFrameBuffer {

	public size: Vector;

	public gl: WebGL2RenderingContext;
	public glFrameBuffer: WebGLFramebuffer | null;

	public textures: GLPowerTexture [];
	public depthTexture: GLPowerTexture | null;
	public textureAttachmentList: number[];

	constructor( gl: WebGL2RenderingContext, opt?: GLPowerFrameBfferOpt ) {

		this.gl = gl;

		this.size = new Vector( 1, 1 );

		this.glFrameBuffer = this.gl.createFramebuffer();
		this.depthTexture = null;

		this.textures = [];
		this.textureAttachmentList = [];

		if ( ! opt || ! opt.disableDepthBuffer ) {

			this.setDepthTexture( new GLPowerTexture( this.gl ).setting( {
				internalFormat: this.gl.DEPTH_COMPONENT32F,
				format: this.gl.DEPTH_COMPONENT,
				type: this.gl.FLOAT,
				magFilter: this.gl.NEAREST,
				minFilter: this.gl.NEAREST,
			} ) );

		}

	}

	public setDepthTexture( depthTexture: GLPowerTexture | null ) {

		// depth buffer

		this.depthTexture = depthTexture;

		if ( this.depthTexture ) {

			this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, this.glFrameBuffer );
			this.gl.framebufferTexture2D( this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.TEXTURE_2D, this.depthTexture.getTexture(), 0 );
			this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );

		}

	}

	public setTexture( textures: GLPowerTexture [] ) {

		this.textures = textures;
		this.textureAttachmentList = [];

		this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, this.glFrameBuffer );

		this.textures.forEach( ( t, i ) => {

			t.attach( { width: this.size.x, height: this.size.y } );

			const attachment = this.gl.COLOR_ATTACHMENT0 + i;
			this.gl.framebufferTexture2D( this.gl.FRAMEBUFFER, attachment, this.gl.TEXTURE_2D, t.getTexture(), 0 );

			this.textureAttachmentList.push( attachment );

		} );

		this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );

		return this;

	}

	public setSize( size: Vector ): GLPowerFrameBuffer

	public setSize( width: number, height: number ) : GLPowerFrameBuffer

	public setSize( width_size: number | Vector, height?: number ): GLPowerFrameBuffer {

		if ( typeof width_size == 'number' ) {

			this.size.x = width_size;

			if ( height !== undefined ) {

				this.size.y = height;

			}

		} else {

			this.size.copy( width_size );

		}

		this.size.floor();

		this.setTexture( this.textures );

		this.textures.forEach( t => {

			t.attach( { width: this.size.x, height: this.size.y } );

		} );

		if ( this.depthTexture ) {

			this.depthTexture.attach( { width: this.size.x, height: this.size.y } );

		}

		return this;

	}

	public getFrameBuffer() {

		return this.glFrameBuffer;

	}

	// カラーアタッチメントを0でクリアする
	public clear() {

		const gl = this.gl;

		gl.bindFramebuffer( gl.FRAMEBUFFER, this.glFrameBuffer );
		gl.drawBuffers( this.textureAttachmentList );
		gl.clearColor( 0, 0, 0, 0 );
		gl.clear( gl.COLOR_BUFFER_BIT );
		gl.bindFramebuffer( gl.FRAMEBUFFER, null );

	}

	public dispose() {

		this.gl.deleteFramebuffer( this.glFrameBuffer );

	}

}
