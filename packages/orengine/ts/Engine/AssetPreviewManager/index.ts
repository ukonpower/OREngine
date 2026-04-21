import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Engine } from '..';

import textureCopyFrag from './shaders/textureCopy.fs';

const PREVIEW_SIZE = 128;

export class AssetPreviewManager {

	private _gl: WebGL2RenderingContext;
	private _renderer: MXP.Renderer;
	private _cache: Map<string, string>;
	private _readBuffer: Uint8Array;
	private _canvas2d: HTMLCanvasElement;
	private _ctx2d: CanvasRenderingContext2D;

	private _texCopyPass: MXP.PostProcessPass;
	private _texCopyPostProcess: MXP.PostProcess;
	private _texPreviewFB: GLP.GLPowerFrameBuffer;

	constructor( gl: WebGL2RenderingContext, renderer: MXP.Renderer ) {

		this._gl = gl;
		this._renderer = renderer;
		this._cache = new Map();
		this._readBuffer = new Uint8Array( PREVIEW_SIZE * PREVIEW_SIZE * 4 );
		this._canvas2d = document.createElement( 'canvas' );
		this._canvas2d.width = PREVIEW_SIZE;
		this._canvas2d.height = PREVIEW_SIZE;
		this._ctx2d = this._canvas2d.getContext( '2d' )!;

		this._texPreviewFB = new GLP.GLPowerFrameBuffer( gl, { disableDepthBuffer: true } );
		this._texPreviewFB.setTexture( [ new GLP.GLPowerTexture( gl ) ] );
		this._texPreviewFB.setSize( new GLP.Vector( PREVIEW_SIZE, PREVIEW_SIZE ) );
		this._texCopyPass = new MXP.PostProcessPass( gl, {
			frag: textureCopyFrag,
			renderTarget: this._texPreviewFB,
		} );
		this._texCopyPostProcess = new MXP.PostProcess( { passes: [ this._texCopyPass ] } );

	}

	public getTexturePreview( name: string ): string | null {

		const key = "tex:" + name;
		const cached = this._cache.get( key );
		if ( cached ) return cached;

		const texture = Engine.resources.getTexture( name );
		if ( ! texture ) return null;

		this._texCopyPass.uniforms.uPreviewTex = { value: texture, type: "1i" };
		this._renderer.renderPostProcess(
			this._texCopyPostProcess, undefined,
			new GLP.Vector( PREVIEW_SIZE, PREVIEW_SIZE )
		);

		const dataUrl = this._readFBToDataURL( this._texPreviewFB );
		this._cache.set( key, dataUrl );
		return dataUrl;

	}

	public invalidate( key: string ): void {

		this._cache.delete( key );

	}

	public invalidateAll(): void {

		this._cache.clear();

	}

	private _readFBToDataURL( fb: GLP.GLPowerFrameBuffer ): string {

		const gl = this._gl;
		gl.bindFramebuffer( gl.FRAMEBUFFER, fb.getFrameBuffer() );
		gl.readPixels( 0, 0, PREVIEW_SIZE, PREVIEW_SIZE, gl.RGBA, gl.UNSIGNED_BYTE, this._readBuffer );
		gl.bindFramebuffer( gl.FRAMEBUFFER, null );

		const imageData = this._ctx2d.createImageData( PREVIEW_SIZE, PREVIEW_SIZE );
		for ( let y = 0; y < PREVIEW_SIZE; y ++ ) {

			const srcRow = ( PREVIEW_SIZE - 1 - y ) * PREVIEW_SIZE * 4;
			const dstRow = y * PREVIEW_SIZE * 4;
			for ( let x = 0; x < PREVIEW_SIZE * 4; x ++ ) {

				imageData.data[ dstRow + x ] = this._readBuffer[ srcRow + x ];

			}

		}

		this._ctx2d.putImageData( imageData, 0, 0 );
		return this._canvas2d.toDataURL();

	}

	public dispose(): void {

		this._cache.clear();
		this._texPreviewFB.dispose();

	}

}
