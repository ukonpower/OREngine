import { GLPowerTexture } from "../GLPowerTexture";

type ImagePretense = {
	width: number,
	height: number
	data?: any
}

export class GLPowerTextureCube extends GLPowerTexture {

	private cubeTarget: number[];

	constructor( gl: WebGL2RenderingContext ) {

		super( gl );

		this.textureType = gl.TEXTURE_CUBE_MAP;

		this.cubeTarget = [
			this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,
			this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
			this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
			this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
			this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
			this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
		];

	}

	public attach( img: HTMLImageElement[] | ImagePretense | null ) {

		this.image = img;

		this.gl.bindTexture( this.textureType, this.glTex );

		if ( this.image ) {

			for ( let i = 0; i < 6; i ++ ) {

				const img = Array.isArray( this.image ) ? this.image[ i ] : this.image;

				this.size.set( img.width, img.height );

				if ( img instanceof HTMLImageElement || img instanceof HTMLCanvasElement ) {

					this.gl.texImage2D( this.cubeTarget[ i ], 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img );

				} else {

					this.gl.texImage2D( this.cubeTarget[ i ], 0, this._setting.internalFormat, img.width, img.height, 0, this._setting.format, this._setting.type, img.data || null );

				}

			}

		}

		if ( this._setting.generateMipmap ) {

			this.gl.generateMipmap( this.textureType );

		}

		this.gl.texParameteri( this.textureType, this.gl.TEXTURE_MAG_FILTER, this._setting.magFilter );
		this.gl.texParameteri( this.textureType, this.gl.TEXTURE_MIN_FILTER, this._setting.minFilter );
		this.gl.texParameterf( this.textureType, this.gl.TEXTURE_WRAP_S, this._setting.wrapS );
		this.gl.texParameterf( this.textureType, this.gl.TEXTURE_WRAP_T, this._setting.wrapT );
		this.gl.bindTexture( this.textureType, null );

		return this;

	}

}
