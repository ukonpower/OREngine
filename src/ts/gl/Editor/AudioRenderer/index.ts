import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Renderer } from '../../ProjectScene/Renderer';

import audioFrag from './shaders/audio.fs';

export class AudioRenderer extends GLP.EventEmitter {

	private canvas: HTMLCanvasElement;
	private gl: WebGL2RenderingContext;
	private power: GLP.Power;
	private renderer: Renderer;
	private postProcess: MXP.PostProcess;

	constructor() {

		super();

		const resolution = new GLP.Vector( 2048, 256 );

		this.canvas = document.createElement( 'canvas' )!;
		this.canvas.width = resolution.x;
		this.canvas.height = resolution.y;

		this.canvas.style.position = 'absolute';
		this.canvas.style.left = 0 + 'px';
		this.canvas.style.top = 0 + 'px';
		this.canvas.style.pointerEvents = "none";

		this.gl = this.canvas.getContext( "webgl2" )!;
		this.power = new GLP.Power( this.gl );

		this.renderer = new Renderer( this.gl );
		this.renderer.resize( resolution );

		this.postProcess = new MXP.PostProcess( { passes: [ new MXP.PostProcessPass( {
			frag: audioFrag,
			renderTarget: null,
			uniforms: {
				uAudioBuffer: { type: "1i", value: null }
			}
		} ) ] } );

		// document.body.appendChild( this.canvas );

	}

	public render( audioBuffer: AudioBuffer ) {

		const audioBufferL = audioBuffer.getChannelData( 0 );
		const buffer = new Uint8Array( 2048 );

		for ( let i = 0; i < 2048; i ++ ) {

			const v = audioBufferL[ i * 4 ];
			buffer[ i ] = ( v * 10.0 + 1 ) * 128;

		}

		const texture = new GLP.GLPowerTexture( this.gl );
		texture.setting( { type: this.gl.UNSIGNED_BYTE, internalFormat: this.gl.LUMINANCE, format: this.gl.LUMINANCE, magFilter: this.gl.LINEAR, minFilter: this.gl.LINEAR, wrapS: this.gl.MIRRORED_REPEAT } );

		texture.attach( {
			width: 2048,
			height: 1,
			data: buffer
		} );

		this.postProcess.passes[ 0 ].uniforms.uAudioBuffer.value = texture;

		this.renderer.renderPostProcess( this.postProcess );

	}

}
