import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Engine } from '..';

import frameDebuggerFrag from './shaders/frameDebugger.fs';

type Frame = {
	frameBuffer: GLP.GLPowerFrameBuffer,
	texture: GLP.GLPowerTexture,
	label: string,
}


export class FrameDebugger extends GLP.EventEmitter {

	private _engine: Engine;
	private _gl: WebGL2RenderingContext;

	// buffers

	private _srcFrameBuffer: GLP.GLPowerFrameBuffer;
	private _outFrameBuffer: GLP.GLPowerFrameBuffer;
	private _frameList: Frame[];

	// status

	private _enable: boolean;

	private _resolution: GLP.Vector;
	private _count: number;
	private _total: number;
	private _tile: GLP.Vector;
	private _tilePixelSize: GLP.Vector;
	private _tileInv: GLP.Vector;

	// controls

	private _focus: number | null;

	// postprocess

	private _uniforms: GLP.Uniforms;
	private _outPostProcess: MXP.PostProcess;

	// canvas

	private _elm: HTMLCanvasElement;
	private _labelCanvas: HTMLCanvasElement;
	private _cctx: CanvasRenderingContext2D;
	private _canvasTexture: GLP.GLPowerTexture;

	constructor( engine: Engine ) {

		super();

		this._engine = engine;
		this._gl = engine.gl;
		this._elm = engine.canvas as HTMLCanvasElement;

		this._srcFrameBuffer = new GLP.GLPowerFrameBuffer( this._gl, { disableDepthBuffer: true } );
		this._outFrameBuffer = new GLP.GLPowerFrameBuffer( this._gl, { disableDepthBuffer: true } ).setTexture( [
			new GLP.GLPowerTexture( this._gl ).setting( ),
		] );

		this._enable = false;
		this._count = 0;
		this._total = 1;
		this._tile = new GLP.Vector( 1, 1 );
		this._tilePixelSize = new GLP.Vector( 1, 1 );
		this._tileInv = new GLP.Vector( 1, 1 );

		this._focus = null;

		this._resolution = new GLP.Vector();

		// canvas

		this._labelCanvas = document.createElement( "canvas" );
		this._cctx = this._labelCanvas.getContext( "2d" )!;

		this._canvasTexture = new GLP.GLPowerTexture( this._gl ).attach( this._labelCanvas );

		// out

		this._uniforms = {
			uCanvas: {
				value: this._canvasTexture,
				type: "1i"
			}
		};

		this._outPostProcess = new MXP.PostProcess( { entity: new MXP.Entity(), args: { passes: [
			new MXP.PostProcessPass( this._gl, {
				uniforms: this._uniforms,
				renderTarget: null,
				frag: frameDebuggerFrag,
				backBufferOverride: this._outFrameBuffer.textures,
			} )
		] } } );

		this._frameList = [];

		// click

		const touchStartPos = new GLP.Vector( 0, 0 );

		const onClick = this.onClick.bind( this );

		const onPointerDown = ( e: PointerEvent ) => {

			touchStartPos.set( e.clientX, e.clientY );

		};

		const onPointerUp = ( e: PointerEvent ) => {

			const endPos = new GLP.Vector( e.clientX, e.clientY );

			if ( touchStartPos.clone().sub( endPos ).length( ) < 10 ) {

				onClick( e );

			}

		};

		this._elm.addEventListener( "pointerdown", onPointerDown );
		this._elm.addEventListener( "pointerup", onPointerUp );

		// esc

		const onKeydown = ( e: KeyboardEvent ) => {

			if ( e.key === "Escape" ) {

				this._focus = null;

				this.clear();

			}

			if ( e.key == "ArrowRight" ) {

				if ( this._focus !== null ) {

				 this._focus ++;

				}

			}

			if ( e.key == "ArrowLeft" ) {

				if ( this._focus !== null ) {

				 this._focus --;

				}

			}

		};

		window.addEventListener( "keydown", onKeydown );

		this.once( "dispose", () => {

			this._elm.removeEventListener( "pointerdown", onPointerDown );
			this._elm.removeEventListener( "pointerup", onPointerUp );
			window.removeEventListener( "keydown", onKeydown );

		} );

		// this.enable = true;
		// this.focus = 8;

	}

	private calcTilePos( num: number ) {

		const x = num % this._tile.x * this._tileInv.x * this._resolution.x;
		const y = Math.floor( num / this._tile.x ) * this._tileInv.y * this._resolution.y;

		return { x, y };

	}

	public push( frameBuffer: GLP.GLPowerFrameBuffer | GLP.GLPowerFrameBufferCube, label?: string ) {

		for ( let i = 0; i < frameBuffer.textures.length; i ++ ) {

			if ( this._focus == null || this._focus == this._count ) {

				const tex = frameBuffer.textures[ i ];
				const textarget = "currentFace" in frameBuffer ? frameBuffer.currentFace : this._gl.TEXTURE_2D;

				this._srcFrameBuffer.setSize( tex.size );

				this._gl.bindFramebuffer( this._gl.FRAMEBUFFER, this._srcFrameBuffer.getFrameBuffer() );

				this._gl.framebufferTexture2D( this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, textarget, tex.getTexture(), 0 );
				this._gl.bindFramebuffer( this._gl.FRAMEBUFFER, null );

				this._gl.bindFramebuffer( this._gl.READ_FRAMEBUFFER, this._srcFrameBuffer.getFrameBuffer() );
				this._gl.bindFramebuffer( this._gl.DRAW_FRAMEBUFFER, this._outFrameBuffer.getFrameBuffer() );

				let { x, y } = this.calcTilePos( this._count );
				const w = this._tilePixelSize.x, h = this._tilePixelSize.y;

				if ( this._focus !== null ) {

					x = 0;
					y = 0;

				}

				this._gl.blitFramebuffer(
					0, 0, frameBuffer.size.x, frameBuffer.size.y,
					x, this._resolution.y - y - h,
					x + w, this._resolution.y - y,
					this._gl.COLOR_BUFFER_BIT, this._gl.NEAREST );

				this._srcFrameBuffer.setTexture( [] );

				this._frameList.push( {
					frameBuffer: frameBuffer,
					texture: tex,
					label: label ? label + ( frameBuffer.textures.length > 1 ? "_" + i : '' ) : ''
				} );

			}

			this._count ++;

		}


		this._gl.bindFramebuffer( this._gl.READ_FRAMEBUFFER, null );
		this._gl.bindFramebuffer( this._gl.DRAW_FRAMEBUFFER, null );

	}

	public draw() {

		// draw canvas

		this._cctx.clearRect( 0, 0, this._resolution.x, this._resolution.y );

		const pixelRatio = this._resolution.y / 1080;

		this._cctx.font = `500 ${28 * pixelRatio}px 'Courier New'`;

		this._cctx.fillStyle = "#fff";

		for ( let i = 0; i < this._frameList.length; i ++ ) {

			const { x, y } = this.calcTilePos( i );

			const frame = this._frameList[ i ];

			this._cctx.fillText( frame.label, x + 5 * pixelRatio, y + this._tilePixelSize.y - 5 * pixelRatio );

		}

		this._canvasTexture.attach( this._labelCanvas );

		// out

		this._engine.renderer.renderPostProcess( this._outPostProcess, undefined, this._resolution );

		this.clear();

	}

	private clear() {

		// calc status

		this._total = this._count;

		const sqrt = Math.sqrt( this._focus !== null ? 1 : this._total );
		this._tile.set( Math.round( sqrt ), Math.ceil( sqrt ) );
		this._tileInv.set( 1.0, 1.0 ).divide( this._tile );
		this._tilePixelSize.copy( this._tileInv ).multiply( this._resolution );

		this._frameList = [];
		this._count = 0;

	}

	public reflesh() {

		this.resize( this._resolution );

	}

	public resize( resolution: GLP.Vector ) {

		this._resolution.copy( resolution );

		this._outFrameBuffer.setSize( resolution );

		this._outPostProcess.resize( resolution );

		this._labelCanvas.width = resolution.x;
		this._labelCanvas.height = resolution.y;
		this._canvasTexture.attach( this._labelCanvas );

	}

	private onClick( e: MouseEvent ) {

		if ( ! this._enable ) {

			return;

		}

		this.reflesh();

		if ( this._focus === null ) {

			const tileSize = new GLP.Vector( this._elm.clientWidth / this._tile.x, this._elm.clientHeight / this._tile.y );

			const x = Math.floor( ( e.offsetX ) / tileSize.x );
			const y = Math.floor( ( e.offsetY ) / tileSize.y );

			this._focus = x + y * this._tile.x;

		}

		this.clear();

	}

	public set enable( value: boolean ) {

		this._enable = value;

		if ( value ) {

			this.reflesh();

		}

	}

	public get enable( ) {

		return this._enable;

	}

	public dispose( ) {

		this.emit( "dispose" );

	}

}
