import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import frameDebuggerFrag from './shaders/frameDebugger.fs';

import { gl, renderer } from '~/ts/gl/GLGlobals';

type Frame = {
	frameBuffer: GLP.GLPowerFrameBuffer,
	texture: GLP.GLPowerTexture,
	label: string,
}


export class FrameDebugger extends GLP.EventEmitter {

	private gl: WebGL2RenderingContext;

	// buffers

	private srcFrameBuffer: GLP.GLPowerFrameBuffer;
	private outFrameBuffer: GLP.GLPowerFrameBuffer;
	private frameList: Frame[];

	// status

	private _enable: boolean;

	private resolution: GLP.Vector;
	private count: number;
	private total: number;
	private tile: GLP.Vector;
	private tilePixelSize: GLP.Vector;
	private tileInv: GLP.Vector;

	// controls

	private focus: number | null;

	// postprocess

	private uniforms: GLP.Uniforms;
	private outPostProcess: MXP.PostProcess;

	// canvas

	private elm: HTMLCanvasElement;
	private labelCanvas: HTMLCanvasElement;
	private cctx: CanvasRenderingContext2D;
	private canvasTexture: GLP.GLPowerTexture;

	constructor( power: GLP.Power, elm: HTMLCanvasElement ) {

		super();

		this.gl = power.gl;
		this.elm = elm;

		this.srcFrameBuffer = new GLP.GLPowerFrameBuffer( this.gl, { disableDepthBuffer: true } );
		this.outFrameBuffer = new GLP.GLPowerFrameBuffer( this.gl, { disableDepthBuffer: true } ).setTexture( [
			new GLP.GLPowerTexture( this.gl ).setting( ),
		] );

		this._enable = false;
		this.count = 0;
		this.total = 1;
		this.tile = new GLP.Vector( 1, 1 );
		this.tilePixelSize = new GLP.Vector( 1, 1 );
		this.tileInv = new GLP.Vector( 1, 1 );

		this.focus = null;

		this.resolution = new GLP.Vector();

		// canvas

		this.labelCanvas = document.createElement( "canvas" );
		this.cctx = this.labelCanvas.getContext( "2d" )!;

		this.canvasTexture = new GLP.GLPowerTexture( this.gl ).attach( this.labelCanvas );

		// out

		this.uniforms = {
			uCanvas: {
				value: this.canvasTexture,
				type: "1i"
			}
		};

		this.outPostProcess = new MXP.PostProcess( {
			input: this.outFrameBuffer.textures,
			passes: [ new MXP.PostProcessPass( gl, {
				uniforms: this.uniforms,
				renderTarget: null,
				frag: frameDebuggerFrag
			} ) ],
		} );

		this.frameList = [];

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

		elm.addEventListener( "pointerdown", onPointerDown );
		elm.addEventListener( "pointerup", onPointerUp );

		// esc

		const onKeydown = ( e: KeyboardEvent ) => {

			if ( e.key === "Escape" ) {

				this.focus = null;

				this.clear();

			}

		};

		window.addEventListener( "keydown", onKeydown );

		this.once( "dispose", () => {

			elm.removeEventListener( "pointerdown", onPointerDown );
			elm.removeEventListener( "pointerup", onPointerUp );
			window.removeEventListener( "keydown", onKeydown );

		} );

		// this.enable = true;
		// this.focus = 8;

	}

	private calcTilePos( num: number ) {

		const x = num % this.tile.x * this.tileInv.x * this.resolution.x;
		const y = Math.floor( num / this.tile.x ) * this.tileInv.y * this.resolution.y;

		return { x, y };

	}

	public push( frameBuffer: GLP.GLPowerFrameBuffer | GLP.GLPowerFrameBufferCube, label?: string ) {

		for ( let i = 0; i < frameBuffer.textures.length; i ++ ) {

			if ( this.focus == null || this.focus == this.count ) {

				const tex = frameBuffer.textures[ i ];
				const textarget = "currentFace" in frameBuffer ? frameBuffer.currentFace : this.gl.TEXTURE_2D;

				this.srcFrameBuffer.setSize( tex.size );

				this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, this.srcFrameBuffer.getFrameBuffer() );

				this.gl.framebufferTexture2D( this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, textarget, tex.getTexture(), 0 );
				this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );

				this.gl.bindFramebuffer( this.gl.READ_FRAMEBUFFER, this.srcFrameBuffer.getFrameBuffer() );
				this.gl.bindFramebuffer( this.gl.DRAW_FRAMEBUFFER, this.outFrameBuffer.getFrameBuffer() );

				let { x, y } = this.calcTilePos( this.count );
				const w = this.tilePixelSize.x, h = this.tilePixelSize.y;

				if ( this.focus !== null ) {

					x = 0;
					y = 0;

				}

				this.gl.blitFramebuffer(
					0, 0, frameBuffer.size.x, frameBuffer.size.y,
					x, this.resolution.y - y - h,
					x + w, this.resolution.y - y,
					this.gl.COLOR_BUFFER_BIT, this.gl.NEAREST );

				this.srcFrameBuffer.setTexture( [] );

				this.frameList.push( {
					frameBuffer: frameBuffer,
					texture: tex,
					label: label ? label + ( frameBuffer.textures.length > 1 ? "_" + i : '' ) : ''
				} );

			}

			this.count ++;

		}


		this.gl.bindFramebuffer( this.gl.READ_FRAMEBUFFER, null );
		this.gl.bindFramebuffer( this.gl.DRAW_FRAMEBUFFER, null );

	}

	public draw() {

		// draw canvas

		this.cctx.clearRect( 0, 0, this.resolution.x, this.resolution.y );

		const pixelRatio = this.resolution.y / 1080;

		this.cctx.font = `500 ${18 * pixelRatio}px 'Courier New'`;

		this.cctx.fillStyle = "#fff";

		for ( let i = 0; i < this.frameList.length; i ++ ) {

			const { x, y } = this.calcTilePos( i );

			const frame = this.frameList[ i ];

			this.cctx.fillText( frame.label, x + 5 * pixelRatio, y + this.tilePixelSize.y - 5 * pixelRatio );

		}

		this.canvasTexture.attach( this.labelCanvas );

		// out

		renderer.renderPostProcess( this.outPostProcess, this.resolution );

		this.clear();

	}

	private clear() {

		// calc status

		this.total = this.count;

		const sqrt = Math.sqrt( this.focus !== null ? 1 : this.total );
		this.tile.set( Math.round( sqrt ), Math.ceil( sqrt ) );
		this.tileInv.set( 1.0, 1.0 ).divide( this.tile );
		this.tilePixelSize.copy( this.tileInv ).multiply( this.resolution );

		this.frameList = [];
		this.count = 0;

	}

	public reflesh() {

		this.resize( this.resolution );

	}

	public resize( resolution: GLP.Vector ) {

		this.resolution.copy( resolution );

		this.outFrameBuffer.setSize( resolution );

		this.outPostProcess.resize( resolution );

		this.labelCanvas.width = resolution.x;
		this.labelCanvas.height = resolution.y;
		this.canvasTexture.attach( this.labelCanvas );

	}

	private onClick( e: MouseEvent ) {

		if ( ! this._enable ) {

			return;

		}

		this.reflesh();

		if ( this.focus === null ) {

			const tileSize = new GLP.Vector( this.elm.clientWidth / this.tile.x, this.elm.clientHeight / this.tile.y );

			const x = Math.floor( ( e.offsetX ) / tileSize.x );
			const y = Math.floor( ( e.offsetY ) / tileSize.y );

			this.focus = x + y * this.tile.x;

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
