import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { shaderParse } from '../../../Renderer/ShaderParser';

import musicFrag from './shaders/music.fs';
import musicVert from './shaders/music.vs';


import { power } from '~/ts/Globals';

const MUSIC_DURATION = 60 * ( ( 32 * 8.0 + 8 + 1 ) / 85.0 );


export class Music extends MXP.Component {

	private power: GLP.Power;
	private gl: WebGL2RenderingContext;

	private audioCtx: AudioContext;
	private audioBuffer: AudioBuffer;
	private audioSrcNode: AudioBufferSourceNode | null;
	private convolverNode: ConvolverNode;
	private gainNode: GainNode;

	private playStartTime: number = - 1;
	private force: boolean = false;

	private implusBuffer: AudioBuffer;

	constructor( ) {

		super();

		this.power = power;
		this.gl = this.power.gl;

		this.audioSrcNode = null;

		/*-------------------------------
			Audio
		-------------------------------*/

		this.audioCtx = new AudioContext();

		const bufferLength = Math.floor( this.audioCtx.sampleRate * MUSIC_DURATION );

		// buffer

		this.audioBuffer = this.audioCtx.createBuffer( 2, bufferLength, this.audioCtx.sampleRate );

		const bufferIn = this.power.createBuffer();
		bufferIn.setData( new Float32Array( new Array( bufferLength ).fill( 0 ).map( ( _, i ) => i ) ), 'vbo' );

		const bufferL = this.power.createBuffer();
		bufferL.setData( new Float32Array( bufferLength ), 'vbo', this.gl.DYNAMIC_COPY );

		const bufferR = this.power.createBuffer();
		bufferR.setData( new Float32Array( bufferLength ), 'vbo', this.gl.DYNAMIC_COPY );

		// render

		const render = () => {

			const program = this.power.createProgram();

			const tf = new GLP.GLPowerTransformFeedback( this.gl );

			tf.setBuffer( "left", bufferL, 0 );
			tf.setBuffer( "right", bufferR, 1 );

			tf.bind( () => {

				program.setShader( shaderParse( MXP.hotGet( "music", musicVert ) ), musicFrag, { transformFeedbackVaryings: [ 'o_left', 'o_right' ] } );

			} );

			program.setUniform( 'uDuration', '1f', [ MUSIC_DURATION ] );
			program.setUniform( 'uSampleRate', '1f', [ this.audioCtx.sampleRate ] );

			const vao = program.getVAO();

			if ( vao ) {

				vao.setAttribute( 'offsetTime', bufferIn, 1 );

				program.use( () => {

					program.uploadUniforms();

					tf.use( () => {

						this.gl.beginTransformFeedback( this.gl.POINTS );
						this.gl.enable( this.gl.RASTERIZER_DISCARD );

						vao.use( () => {

							this.gl.drawArrays( this.gl.POINTS, 0, vao.vertCount );

						} );

						this.gl.disable( this.gl.RASTERIZER_DISCARD );
						this.gl.endTransformFeedback();

					} );

					this.gl.bindBuffer( this.gl.ARRAY_BUFFER, bufferL.buffer );
					this.gl.getBufferSubData( this.gl.ARRAY_BUFFER, 0, this.audioBuffer.getChannelData( 0 ) );

					this.gl.bindBuffer( this.gl.ARRAY_BUFFER, bufferR.buffer );
					this.gl.getBufferSubData( this.gl.ARRAY_BUFFER, 0, this.audioBuffer.getChannelData( 1 ) );

				} );

			}

			this.force = true;

		};

		render();

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/music.vs', ( module ) => {

				if ( module ) {

					MXP.hotUpdate( "music", module.default );

					render();

				}


			} );

		}

		// implus

		this.implusBuffer = this.audioCtx.createBuffer( 2, this.audioCtx.sampleRate * 1.5, this.audioCtx.sampleRate );

		for ( let i = 0; i < this.implusBuffer.length; i ++ ) {

			const t = i / this.implusBuffer.length;

			this.implusBuffer.getChannelData( 0 )[ i ] = ( Math.random() * 2.0 - 1.0 ) * 0.9 * Math.exp( - t * 5 );
			this.implusBuffer.getChannelData( 1 )[ i ] = ( Math.random() * 2.0 - 1.0 ) * 0.9 * Math.exp( - t * 5 );

		}

		this.convolverNode = this.audioCtx.createConvolver();
		this.convolverNode.buffer = this.implusBuffer;

		// gain

		this.gainNode = this.audioCtx.createGain();
		this.gainNode.gain.value = 1.3;

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		if ( ! event.playing ) {

			this.stop();
			return;

		}

		this.play( event.timeCode, this.force );

		this.force = false;

	}

	public play( time: number = 0, force?: boolean ) {

		if ( this.audioSrcNode && ! force ) {

			if ( Math.abs( ( this.audioSrcNode.context.currentTime - this.playStartTime ) - time ) < 0.1 ) return;

		}

		this.stop();

		// src

		this.audioSrcNode = this.audioCtx.createBufferSource();
		this.audioSrcNode.buffer = this.audioBuffer;
		this.audioSrcNode.loop = false;
		this.audioSrcNode.start( 0, time );

		this.playStartTime = this.audioSrcNode.context.currentTime - ( time || 0 );

		// connect

		this.audioSrcNode.connect( this.gainNode );
		this.audioSrcNode.connect( this.convolverNode );
		this.convolverNode.connect( this.gainNode );

		this.gainNode.connect( this.audioCtx.destination );

	}

	public stop() {

		if ( this.audioSrcNode ) {

			this.audioSrcNode.stop();
			this.audioSrcNode.disconnect( this.gainNode );
			this.audioSrcNode = null;

		}

		if ( this.convolverNode ) {

			this.convolverNode.disconnect();

		}

	}

}
