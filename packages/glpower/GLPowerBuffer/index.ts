import { TArrayBuffer } from "basepower";

export type BufferType = 'vbo' | 'ibo';

export class GLPowerBuffer {

	private gl: WebGL2RenderingContext;
	public buffer: WebGLBuffer | null;
	public array: TArrayBuffer | null;

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;

		this.buffer = this.gl.createBuffer();

		this.array = null;

	}

	public setData( data: TArrayBuffer, type: BufferType = 'vbo', usage?: number ) {

		const target = type == 'vbo' ? this.gl.ARRAY_BUFFER : this.gl.ELEMENT_ARRAY_BUFFER;

		this.gl.bindBuffer( target, this.buffer );

		this.gl.bufferData( target, data, usage || this.gl.STATIC_DRAW );

		this.gl.bindBuffer( target, null );

		this.array = data;

		return this;

	}

	// GPU側バッファの内容を読み戻す
	public read( out: TArrayBuffer ) {

		this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.buffer );
		this.gl.getBufferSubData( this.gl.ARRAY_BUFFER, 0, out );
		this.gl.bindBuffer( this.gl.ARRAY_BUFFER, null );

		return this;

	}

	public dispose() {

		this.gl.deleteBuffer( this.buffer );

	}

}
