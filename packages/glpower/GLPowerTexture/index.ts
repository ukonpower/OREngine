import { Types } from "basepower";
import { Vector } from "mathpower";

type ImagePretense = {
	width: number,
	height: number
	data?: any
}

export type GLPowerTextureSetting = {
	type: number,
	internalFormat: number,
	format: number,
	magFilter: number,
	minFilter: number,
	generateMipmap: boolean,
	wrapS: number,
	wrapT: number,
}

export class GLPowerTexture {

	public unit: number;
	public image: HTMLImageElement | HTMLImageElement[] | ImagePretense | null;
	public size: Vector;

	protected gl: WebGL2RenderingContext;
	protected glTex: WebGLTexture | null;

	protected textureType: number;
	protected _setting: GLPowerTextureSetting;

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;
		this.image = null;
		this.unit = 0;
		this.size = new Vector();
		this.glTex = this.gl.createTexture();

		this._setting = {
			type: this.gl.UNSIGNED_BYTE,
			internalFormat: this.gl.RGBA,
			format: this.gl.RGBA,
			magFilter: this.gl.NEAREST,
			minFilter: this.gl.NEAREST,
			generateMipmap: false,
			wrapS: this.gl.CLAMP_TO_EDGE,
			wrapT: this.gl.CLAMP_TO_EDGE,
		};

		this.textureType = gl.TEXTURE_2D;

	}

	public get isTexture() {

		return true;

	}

	public setting( param?: Types.Nullable<GLPowerTextureSetting> ) {

		this._setting = {
			...this._setting,
			...param
		};

		this.attach( this.image );

		return this;

	}

	public attach( img: HTMLImageElement | ImagePretense | null | HTMLImageElement[], flipY?: boolean ) {

		this.image = img;

		this.gl.bindTexture( this.textureType, this.glTex );

		if ( flipY ) {

			this.gl.pixelStorei( this.gl.UNPACK_FLIP_Y_WEBGL, true );

		}

		if ( this.image ) {

			const img = Array.isArray( this.image ) ? this.image[ 0 ] : this.image;

			this.size.set( img.width, img.height );

			if ( img instanceof HTMLImageElement || img instanceof HTMLCanvasElement ) {

				this.gl.texImage2D( this.textureType, 0, this._setting.internalFormat, this._setting.format, this._setting.type, img );

			} else {

				this.gl.texImage2D( this.textureType, 0, this._setting.internalFormat, img.width, img.height, 0, this._setting.format, this._setting.type, img.data || null );

			}

		} else {

			this.size.set( 1, 1 );

			this.gl.texImage2D( this.textureType, 0, this._setting.internalFormat, this.size.x, this.size.y, 0, this._setting.format, this._setting.type, null );

		}

		if ( flipY ) {

			this.gl.pixelStorei( this.gl.UNPACK_FLIP_Y_WEBGL, false );

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

	// テクスチャの領域へ配列データを書き込む（format/typeは設定値に従う）
	public subImage( data: ArrayBufferView, width: number, height: number ) {

		this.gl.bindTexture( this.textureType, this.glTex );
		this.gl.texSubImage2D( this.textureType, 0, 0, 0, width, height, this._setting.format, this._setting.type, data );
		this.gl.bindTexture( this.textureType, null );

		return this;

	}

	public activate( unitNumber: number ) {

		this.gl.activeTexture( this.gl.TEXTURE0 + unitNumber );
		this.gl.bindTexture( this.textureType, this.glTex );

		this.unit = unitNumber;

		return this;

	}

	public load( src: string, callBack?: () => void ) {

		const img = new Image();

		img.onload = () => {

			this.gl.pixelStorei( this.gl.UNPACK_FLIP_Y_WEBGL, true );
			this.attach( img );
			this.gl.pixelStorei( this.gl.UNPACK_FLIP_Y_WEBGL, false );

			if ( callBack ) callBack();

		};

		img.src = src;

		return this;

	}

	public getTexture() {

		return this.glTex;

	}

	public get type() {

		return this.textureType;

	}

	public dispose() {

		this.gl.deleteTexture( this.glTex );

	}

}
