import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { OREngineProjectFrame } from '../../../../../../ts/Engine/ProjectSerializer';

import timelineFrag from './shaders/timeline.fs';


export class TimelineCanvasRenderer extends GLP.EventEmitter {

	private wrapperElm: HTMLElement | null;

	private glCanvas: HTMLCanvasElement;
	private gl: WebGL2RenderingContext;
	private canvasTexture: GLP.GLPowerTexture;

	private canvas: HTMLCanvasElement;
	private canvasCtx: CanvasRenderingContext2D;
	private glRenderer: MXP.Renderer;
	private postProcess: MXP.PostProcess;

	private viewPort: number[];
	private viewPortRange: number[];
	private viewPortScale: number;
	private frameSetting: OREngineProjectFrame | null;
	private loopSetting: { enabled: boolean, start: number, end: number };

	private musicBuffer: AudioBuffer | null;
	private musicTexture: GLP.GLPowerTexture;

	private resizeObserver: ResizeObserver;

	private canvasSize: GLP.Vector;

	constructor() {

		super();

		// elms

		this.wrapperElm = null;

		this.canvas = document.createElement( 'canvas' );
		this.canvasCtx = this.canvas.getContext( '2d' )!;

		this.glCanvas = document.createElement( 'canvas' );
		const power = new GLP.Power( this.glCanvas.getContext( 'webgl2' )! );
		this.gl = power.gl;

		this.canvasSize = new GLP.Vector( this.glCanvas.width, this.glCanvas.height );

		// viewport

		this.viewPort = [ 0, 0, 0, 0 ];
		this.viewPortRange = [ 0, 0 ];
		this.viewPortScale = 50;

		// frame

		this.frameSetting = null;

		// loop

		this.loopSetting = {
			enabled: false,
			start: 0,
			end: 0
		};

		// resize

		this.resizeObserver = new ResizeObserver( this.onResize.bind( this ) );

		// gl

		this.glRenderer = new MXP.Renderer( this.gl );
		this.canvasTexture = new GLP.GLPowerTexture( this.gl );

		// music

		this.musicBuffer = null;
		this.musicTexture = new GLP.GLPowerTexture( this.gl );
		this.musicTexture.setting( { type: this.gl.UNSIGNED_BYTE, internalFormat: this.gl.LUMINANCE, format: this.gl.LUMINANCE, magFilter: this.gl.LINEAR, minFilter: this.gl.LINEAR, wrapS: this.gl.MIRRORED_REPEAT } );

		this.postProcess = new MXP.PostProcess( {
			passes: [
				new MXP.PostProcessPass( this.gl, {
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

			this.glCanvas.width = this.canvas.width = resolution.x;
			this.glCanvas.height = this.canvas.height = resolution.y;

			this.canvasSize.set( this.glCanvas.width, this.glCanvas.height );

			this.postProcess.resize( resolution );

		}

		this.render();

	}

	private render() {

		this.canvasCtx.fillStyle = '#000';
		this.canvasCtx.fillRect( 0, 0, this.canvas.width, this.canvas.height );

		// playarea

		if ( this.frameSetting ) {

			this.canvasCtx.fillStyle = '#181818';

			const s = this.frameToPx( 0 );
			const e = this.frameToPx( this.frameSetting.duration );

			this.canvasCtx.fillRect( s, 0, e - s, this.canvas.height );

		}


		// grid

		const drawGrid = ( distance: number, offset: number, color: string ) => {

			let frame = Math.ceil( this.viewPort[ 0 ] / distance ) * distance;

			this.canvasCtx.beginPath();

			let cnt = 0;

			while ( frame < this.viewPort[ 2 ] && cnt < 100 ) {

				const x = this.frameToPx( frame + offset );

				this.canvasCtx.moveTo( x, 0 );
				this.canvasCtx.lineTo( x, this.canvas.height );

				frame += distance;
				cnt ++;

			}

			this.canvasCtx.strokeStyle = color;
			this.canvasCtx.lineWidth = 1;

			this.canvasCtx.stroke();

		};

		drawGrid( this.viewPortScale, 0, "#555" );
		drawGrid( this.viewPortScale, this.viewPortScale / 2, "#333" );

		// audio wave

		if ( this.musicBuffer && this.frameSetting ) {

			this.canvasCtx.strokeStyle = '#888';
			this.canvasCtx.fillStyle = '#888';

			const audioBufferL = this.musicBuffer.getChannelData( 0 );

			const viewportDuration = this.viewPortRange[ 0 ] / this.frameSetting.fps;
			const viewportAudioSamples = ( this.musicBuffer.sampleRate * viewportDuration );
			const audioSamplePerPx = ( viewportAudioSamples / this.canvas.width );
			const offset = this.frameToPx( 0 );

			this.canvasCtx.beginPath();

			for ( let i = 0; i < viewportAudioSamples; i += audioSamplePerPx ) {

				const index = Math.floor( i - offset * audioSamplePerPx );
				const sample = audioBufferL[ Math.round( index ) ];

				const x = ( i / viewportAudioSamples ) * this.canvas.width;
				const y = ( sample + 1 ) * ( this.canvas.height / 2 );

				let min = y;
				let max = y;

				for ( let j = 0; j < 16; j ++ ) {

					const smp = audioBufferL[ Math.round( index + audioSamplePerPx * ( j / 16 ) ) ];

					const y = ( smp + 1 ) * ( this.canvas.height / 2 );

					if ( min > y ) min = y;
					if ( max < y ) max = y;

				}

				const h = max - min;

				if ( h > 3 ) {

					this.canvasCtx.fillRect( x, min, 1, h );

				}

				if ( i == 0 ) {

					this.canvasCtx.moveTo( x, y );

				} else {

					this.canvasCtx.lineTo( x, y );

				}

			}

			this.canvasCtx.stroke();

		}


		// loop area

		if ( this.loopSetting.enabled ) {

			this.canvasCtx.fillStyle = '#0009';
			const s = this.frameToPx( this.loopSetting.start );
			const e = this.frameToPx( this.loopSetting.end );
			this.canvasCtx.fillRect( 0, 0, s, this.canvas.height );
			this.canvasCtx.fillRect( e, 0, this.canvas.width - e, this.canvas.height );

		}

		this.canvasTexture.attach( this.canvas );

		if ( this.postProcess._passes ) {

			this.postProcess._passes[ 0 ].uniforms.uCanvasTex.value = this.canvasTexture;

		}

		this.glRenderer.renderPostProcess( this.postProcess, undefined, this.canvasSize );

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

	public setFrameSetting( frame: OREngineProjectFrame ) {

		this.frameSetting = {
			duration: Math.round( frame.duration ),
			fps: Math.round( frame.fps ),
		};

		this.render();

	}

	public setMusicBuffer( buffer: AudioBuffer ) {

		this.musicBuffer = buffer;

		setTimeout( () => {

			this.render();

		}, 100 );

	}

	public setLoopSetting( enabled: boolean, start: number, end: number ) {

		this.loopSetting = {
			enabled,
			start,
			end
		};

		this.render();

	}

	// utils

	private frameToPx( frame: number ) {

		return ( frame - this.viewPort[ 0 ] ) / ( this.viewPortRange[ 0 ] ) * this.canvas.width;

	}

	public dispose() {

		if ( this.wrapperElm ) {

			this.wrapperElm.removeChild( this.glCanvas );

		}

		this.resizeObserver.disconnect();

	}

}
