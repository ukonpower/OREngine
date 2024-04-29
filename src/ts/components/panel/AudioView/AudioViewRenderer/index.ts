import * as GLP from 'glpower';

import { OREngineProjectFrame } from '~/ts/gl/IO/ProjectSerializer';
import { FramePlay } from '~/ts/gl/ProjectScene';

export class AudioViewRenderer extends GLP.EventEmitter {

	private wrapperElm: HTMLElement | null;

	private canvas: HTMLCanvasElement;
	private canvasCtx: CanvasRenderingContext2D;

	public viewRangeFrame: number;
	private viewPort: number[];
	private viewPortRange: number[];

	private musicBuffer: AudioBuffer | null;
	private resizeObserver: ResizeObserver;

	private frameSetting: OREngineProjectFrame;
	private framePlay: FramePlay;

	constructor() {

		super();

		// elms

		this.wrapperElm = null;

		this.canvas = document.createElement( 'canvas' );
		this.canvasCtx = this.canvas.getContext( '2d' )!;

		// viewport

		this.viewPort = [ 0, 0, 0, 0 ];
		this.viewPortRange = [ 0, 0 ];

		const localRange = window.localStorage.getItem( "audioViweRange" );
		this.viewRangeFrame = localRange ? Number( localRange ) : 2;

		// frame

		this.frameSetting = {
			duration: 0,
			fps: 60
		};

		this.framePlay = {
			current: 0,
			playing: false
		};

		// music

		this.musicBuffer = null;

		// resize

		this.resizeObserver = new ResizeObserver( this.onResize.bind( this ) );

	}

	private onResize() {

		if ( this.wrapperElm ) {

			const resolution = new GLP.Vector( this.wrapperElm.clientWidth, this.wrapperElm.clientHeight );

			this.canvas.width = resolution.x;
			this.canvas.height = resolution.y;

		}

		this.render();

	}

	private render() {

		this.canvasCtx.fillStyle = '#000';
		this.canvasCtx.fillRect( 0, 0, this.canvas.width, this.canvas.height );

		// audio wave

		if ( this.musicBuffer ) {

			this.canvasCtx.strokeStyle = '#888';
			this.canvasCtx.fillStyle = '#888';

			const audioBufferL = this.musicBuffer.getChannelData( 0 );
			const sampleScale = 2.0;

			const viewportDuration = this.viewPortRange[ 0 ] / this.frameSetting.fps;
			const viewportAudioSamples = ( this.musicBuffer.sampleRate * viewportDuration );
			const audioSamplePerPx = ( viewportAudioSamples / this.canvas.width );
			const offset = this.frameToPx( 0 );

			this.canvasCtx.beginPath();

			for ( let i = 0; i < viewportAudioSamples; i += audioSamplePerPx ) {

				const index = Math.floor( i - offset * audioSamplePerPx );
				const sample = audioBufferL[ Math.round( index ) ] * sampleScale;

				const x = ( i / viewportAudioSamples ) * this.canvas.width;
				const y = ( sample + 1 ) * ( this.canvas.height / 2 );

				let min = y;
				let max = y;

				for ( let j = 0; j < 16; j ++ ) {

					const smp = audioBufferL[ Math.round( index + audioSamplePerPx * ( j / 16 ) ) ] * sampleScale;

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

	}

	// api

	public setWrapperElm( elm: HTMLElement ) {

		if ( this.wrapperElm ) {

			this.resizeObserver.observe( this.wrapperElm );

		}

		this.wrapperElm = elm;
		this.resizeObserver.observe( elm );
		this.wrapperElm.appendChild( this.canvas );

		this.onResize();

	}

	public setFramePlaying( frame: FramePlay ) {

		this.framePlay = frame;

		this.viewPort = [
			this.framePlay.current - this.viewRangeFrame, 0, this.framePlay.current + this.viewRangeFrame, 0
		];

		this.viewPortRange = [ this.viewPort[ 2 ] - this.viewPort[ 0 ], this.viewPort[ 3 ] - this.viewPort[ 1 ] ];

		this.render();

	}

	public setViewRangeFrame( rangeFrame: number ) {

		this.viewRangeFrame = rangeFrame;
		this.setFramePlaying( this.framePlay );

		localStorage.setItem( "audioViweRange", String( this.viewRangeFrame ) );

	}

	public setFrameSetting( frameSetting: OREngineProjectFrame ) {

		this.frameSetting = frameSetting;
		this.render();

	}

	public setMusicBuffer( buffer: AudioBuffer ) {

		this.musicBuffer = buffer;
		this.render();

	}

	// utils

	private frameToPx( frame: number ) {

		return ( frame - this.viewPort[ 0 ] ) / ( this.viewPortRange[ 0 ] ) * this.canvas.width;

	}

	public dispose() {

		if ( this.wrapperElm ) {

			this.wrapperElm.removeChild( this.canvas );

		}

		this.resizeObserver.disconnect();

	}

}
