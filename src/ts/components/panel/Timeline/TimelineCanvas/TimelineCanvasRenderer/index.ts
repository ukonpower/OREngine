import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import timelineFrag from './shaders/timeline.fs';


import { SceneFrame } from '~/ts/gl/Scene';
import { Renderer } from '~/ts/gl/Scene/Renderer';

export class TimelineCanvasRenderer extends GLP.EventEmitter {

	private wrapperElm: HTMLElement | null;

	private glCanvas: HTMLCanvasElement;
	private gl: WebGL2RenderingContext;
	private canvasTexture: GLP.GLPowerTexture;

	private scaleCanvas: HTMLCanvasElement;
	private scaleCtx: CanvasRenderingContext2D;
	private glRenderer: Renderer;
	private postProcess: MXP.PostProcess;

	private viewPort: number[];
	private viewPortRange: number[];
	private viewPortScale: number;
	private sceneFrame: SceneFrame | null;

	private musicBuffer: AudioBuffer | null;
	private musicTexture: GLP.GLPowerTexture;

	private resizeObserver: ResizeObserver;

	constructor() {

		super();

		// elms

		this.wrapperElm = null;

		this.glCanvas = document.createElement( 'canvas' );
		this.gl = this.glCanvas.getContext( 'webgl2' )!;

		this.scaleCanvas = document.createElement( 'canvas' );
		this.scaleCtx = this.scaleCanvas.getContext( '2d' )!;

		// viewport

		this.viewPort = [ 0, 0, 0, 0 ];
		this.viewPortRange = [ 0, 0 ];
		this.viewPortScale = 50;

		// frame

		this.sceneFrame = null;

		// resize

		this.resizeObserver = new ResizeObserver( this.onResize.bind( this ) );

		// gl

		this.glRenderer = new Renderer( this.gl );
		this.canvasTexture = new GLP.GLPowerTexture( this.gl );

		// music

		this.musicBuffer = null;
		this.musicTexture = new GLP.GLPowerTexture( this.gl );
		this.musicTexture.setting( { type: this.gl.UNSIGNED_BYTE, internalFormat: this.gl.LUMINANCE, format: this.gl.LUMINANCE, magFilter: this.gl.LINEAR, minFilter: this.gl.LINEAR, wrapS: this.gl.MIRRORED_REPEAT } );

		this.postProcess = new MXP.PostProcess( {
			passes: [
				new MXP.PostProcessPass( {
					frag: timelineFrag,
					uniforms: {
						uCanvasTex: {
							type: '1i',
							value: null
						},
						uMusicTex: {
							type: '1i',
							value: this.musicTexture
						},
					},
					renderTarget: null
				} )
			]
		} );


	}

	private onResize() {

		if ( this.wrapperElm ) {

			const resolution = new GLP.Vector( this.wrapperElm.clientWidth, this.wrapperElm.clientHeight );

			this.glCanvas.width = this.scaleCanvas.width = resolution.x;
			this.glCanvas.height = this.scaleCanvas.height = resolution.y;

			this.glRenderer.resize( resolution );
			this.postProcess.resize( resolution );

		}

		this.render();

	}

	private render() {

		this.scaleCtx.fillStyle = '#000';
		this.scaleCtx.fillRect( 0, 0, this.scaleCanvas.width, this.scaleCanvas.height );

		// playarea

		if ( this.sceneFrame ) {

			this.scaleCtx.fillStyle = '#181818';

			const s = this.frameToPx( 0 );
			const e = this.frameToPx( this.sceneFrame.duration );

			this.scaleCtx.fillRect( s, 0, e - s, this.scaleCanvas.height );

		}

		// grid

		const drawGrid = ( distance: number, offset: number, color: string ) => {

			let frame = Math.ceil( this.viewPort[ 0 ] / distance ) * distance;

			this.scaleCtx.beginPath();

			let cnt = 0;

			while ( frame < this.viewPort[ 2 ] && cnt < 100 ) {

				const x = this.frameToPx( frame + offset );

				this.scaleCtx.moveTo( x, 0 );
				this.scaleCtx.lineTo( x, this.scaleCanvas.height );

				frame += distance;
				cnt ++;

			}

			this.scaleCtx.strokeStyle = color;
			this.scaleCtx.lineWidth = 1;

			this.scaleCtx.stroke();

		};

		drawGrid( this.viewPortScale, 0, "#555" );
		drawGrid( this.viewPortScale, this.viewPortScale / 2, "#333" );

		// gl

		if ( this.musicBuffer && this.sceneFrame ) {

			const audioBufferL = this.musicBuffer.getChannelData( 0 );
			const buffer = new Uint8Array( 2048 );

			const viewportDuration = this.viewPortRange[ 0 ] / this.sceneFrame.fps;
			const viewPortAudioLength = Math.floor( this.musicBuffer.sampleRate * viewportDuration );

			const offset = - this.frameToPx( 0 );

			for ( let i = 0; i < this.glCanvas.width; i ++ ) {

				const index = Math.floor( ( ( i + offset ) / this.glCanvas.width ) * viewPortAudioLength );
				const v = audioBufferL[ index ];
				buffer[ i ] = ( v * 10.0 + 1 ) * 128;

			}

			this.musicTexture.attach( {
				width: this.glCanvas.width,
				height: 1,
				data: buffer
			} );

		}

		this.canvasTexture.attach( this.scaleCanvas );

		this.postProcess.passes[ 0 ].uniforms.uCanvasTex.value = this.canvasTexture;

		this.glRenderer.renderPostProcess( this.postProcess );

	}

	// api

	public setWrapperElm( elm: HTMLElement ) {

		if ( this.wrapperElm ) {

			this.resizeObserver.observe( this.wrapperElm );

		}

		this.wrapperElm = elm;
		this.resizeObserver.observe( elm );
		this.wrapperElm.appendChild( this.glCanvas );

		this.onResize();

	}

	public setViewPort( viewPort: number[], scale: number ) {

		this.viewPort = viewPort;
		this.viewPortRange = [ viewPort[ 2 ] - viewPort[ 0 ], viewPort[ 3 ] - viewPort[ 1 ] ];
		this.viewPortScale = scale;
		this.render();

	}

	public setFrame( frame:SceneFrame ) {

		this.sceneFrame = frame;
		this.render();

	}

	public setMusicBuffer( buffer: AudioBuffer ) {

		this.musicBuffer = buffer;
		this.render();

	}

	// utils

	private frameToPx( frame: number ) {

		return ( frame - this.viewPort[ 0 ] ) / ( this.viewPortRange[ 0 ] ) * this.scaleCanvas.width;

	}

	public dispose() {

		if ( this.wrapperElm ) {

			this.wrapperElm.removeChild( this.glCanvas );

		}

		this.resizeObserver.disconnect();

	}

}
