import { GLPowerFrameBfferOpt, GLPowerFrameBuffer } from "../GLPowerFrameBuffer";
import { GLPowerTextureCube } from "../GLPowerTextureCube";


export class GLPowerFrameBufferCube extends GLPowerFrameBuffer {

	private cubeTarget: number[];
	public textures: GLPowerTextureCube [];
	public currentFace: number;

	constructor( gl: WebGL2RenderingContext, opt?: GLPowerFrameBfferOpt ) {

		super( gl, opt );

		this.textures = [];

		this.cubeTarget = [
			this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,
			this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
			this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
			this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
			this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
			this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
		];

		this.currentFace = this.cubeTarget[ 0 ];

	}

	public setTexture( textures: GLPowerTextureCube [] ) {

		this.textures = textures;
		this.textureAttachmentList = [];

		this.textures.forEach( ( t ) => {

			t.attach( { width: this.size.x, height: this.size.y } );

		} );

		return this;

	}

	public face( face: number ) {

		this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, this.glFrameBuffer );
		this.textureAttachmentList = [];

		this.textures.forEach( ( t, i ) => {

			const attachment = this.gl.COLOR_ATTACHMENT0 + i;
			this.gl.framebufferTexture2D( this.gl.FRAMEBUFFER, attachment, this.cubeTarget[ face ], t.getTexture(), 0 );
			this.textureAttachmentList.push( attachment );

		} );

		this.currentFace = this.cubeTarget[ face ];

		this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );

	}


}
