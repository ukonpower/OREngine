import { GLPowerBuffer } from "../GLPowerBuffer";
import { GLPowerVAO } from "../GLPowerVAO";

export class GLPowerTransformFeedback {

	private gl: WebGL2RenderingContext;
	private transformFeedback: WebGLTransformFeedback | null;

	protected feedbackBuffer: Map<string, {buffer: GLPowerBuffer, varyingIndex: number}>;

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;
		this.transformFeedback = this.gl.createTransformFeedback();

		this.feedbackBuffer = new Map();

	}

	public bind( cb?: () => void ) {

		this.gl.bindTransformFeedback( this.gl.TRANSFORM_FEEDBACK, this.transformFeedback );

		if ( cb ) cb();

		this.gl.bindTransformFeedback( this.gl.TRANSFORM_FEEDBACK, null );

	}

	public setBuffer( name: string, buffer: GLPowerBuffer, varyingIndex: number ) {

		this.feedbackBuffer.set( name, {
			buffer,
			varyingIndex
		} );

	}

	public use( cb?: ( tf: GLPowerTransformFeedback ) => void ) {

		this.bind( () => {

			this.feedbackBuffer.forEach( fbBuffer => {

				this.gl.bindBufferBase( this.gl.TRANSFORM_FEEDBACK_BUFFER, fbBuffer.varyingIndex, fbBuffer.buffer.buffer );

			} );

			if ( cb ) cb( this );

			this.feedbackBuffer.forEach( fbBuffer => {

				this.gl.bindBufferBase( this.gl.TRANSFORM_FEEDBACK_BUFFER, fbBuffer.varyingIndex, null );

			} );

		} );

	}

	// ラスタライズを止めてPOINTS描画を流し、varyingsを出力バッファへ焼き込む
	public dispatchPoints( vao: GLPowerVAO ) {

		this.use( () => {

			this.gl.beginTransformFeedback( this.gl.POINTS );
			this.gl.enable( this.gl.RASTERIZER_DISCARD );

			vao.use( () => {

				if ( vao.instanceCount > 0 ) {

					this.gl.drawArraysInstanced( this.gl.POINTS, 0, vao.vertCount, vao.instanceCount );

				} else {

					this.gl.drawArrays( this.gl.POINTS, 0, vao.vertCount );

				}

			} );

			this.gl.disable( this.gl.RASTERIZER_DISCARD );
			this.gl.endTransformFeedback();

		} );

	}

}
