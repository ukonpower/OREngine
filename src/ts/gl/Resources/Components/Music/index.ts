import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import musicFrag from './shaders/music.fs';
import musicVert from './shaders/music.vs';

import { power } from '~/ts/gl/GLGlobals';
import { shaderParse } from '~/ts/gl/ProjectScene/Renderer/ShaderParser';

const BPM = 85;
const MUSIC_DURATION = 60 * ( ( 8 * 2 ) / BPM );


export class Music extends MXP.Component {

	private power: GLP.Power;
	private gl: WebGL2RenderingContext;

	private isAudioBufferReady: boolean = false;
	private audioContext: AudioContext;
	private audioBuffer: AudioBuffer;
	private implusBuffer: AudioBuffer;
	private audioSrcNode: AudioBufferSourceNode | null;
	private convolverNode: ConvolverNode;
	private gainNode: GainNode;

	// play

	private playStartTime: number = - 1;
	private force: boolean = false;

	// texture

	public realtimeAnalyzer: AnalyserNode;
	public realtimeDataSize: number;
	public timeDomainArray: Uint8Array;
	public timeDomainTexture: GLP.GLPowerTexture;
	public frequencyArray: Uint8Array;
	public frequencyTexture: GLP.GLPowerTexture;


	constructor( ) {

		super();

		this.power = power;
		this.gl = this.power.gl;

		this.audioSrcNode = null;

		/*-------------------------------
			Audio
		-------------------------------*/

		this.audioContext = new AudioContext();

		const bufferLength = Math.floor( this.audioContext.sampleRate * MUSIC_DURATION );

		// samples

		const blockLength = Math.min( 512 * 512, bufferLength );

		const numSampleBlocks = Math.ceil( ( this.audioContext.sampleRate * MUSIC_DURATION ) / blockLength );

		// tmpOutPut

		const tmpOutputArrayL = new Float32Array( blockLength );
		const tmpOutputArrayR = new Float32Array( blockLength );

		// buffer

		this.audioBuffer = this.audioContext.createBuffer( 2, bufferLength, this.audioContext.sampleRate );

		const bufferIn = new GLP.GLPowerBuffer( this.gl );
		bufferIn.setData( new Float32Array( new Array( blockLength ).fill( 0 ).map( ( _, i ) => i ) ), 'vbo' );

		const bufferL = new GLP.GLPowerBuffer( this.gl );
		bufferL.setData( new Float32Array( bufferLength ), 'vbo', this.gl.DYNAMIC_COPY );

		const bufferR = new GLP.GLPowerBuffer( this.gl );
		bufferR.setData( new Float32Array( bufferLength ), 'vbo', this.gl.DYNAMIC_COPY );

		// render

		const render = () => {

			this.stop();

			this.isAudioBufferReady = false;

			const program = new GLP.GLPowerProgram( this.gl );

			const tf = new GLP.GLPowerTransformFeedback( this.gl );

			tf.setBuffer( "left", bufferL, 0 );
			tf.setBuffer( "right", bufferR, 1 );

			tf.bind( () => {

				program.setShader( shaderParse( MXP.hotGet( "music", musicVert ) ), musicFrag, { transformFeedbackVaryings: [ 'o_left', 'o_right' ] } );

			} );

			program.setUniform( 'uDuration', '1f', [ MUSIC_DURATION ] );
			program.setUniform( 'uBPM', '1f', [ BPM ] );
			program.setUniform( 'uSampleRate', '1f', [ this.audioContext.sampleRate ] );

			const vao = program.getVAO();

			if ( vao ) {

				vao.setAttribute( 'aTime', bufferIn, 1 );

				for ( let i = 0; i < numSampleBlocks; i ++ ) {

					program.setUniform( 'uTimeOffset', '1f', [ blockLength * i / this.audioContext.sampleRate ] );

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
						this.gl.getBufferSubData( this.gl.ARRAY_BUFFER, 0, tmpOutputArrayL );

						this.gl.bindBuffer( this.gl.ARRAY_BUFFER, bufferR.buffer );
						this.gl.getBufferSubData( this.gl.ARRAY_BUFFER, 0, tmpOutputArrayR );

						this.gl.bindBuffer( this.gl.ARRAY_BUFFER, null );

						for ( let j = 0; j < blockLength; j ++ ) {

							const t = i * blockLength + j;
							const enable = t < MUSIC_DURATION * this.audioContext.sampleRate ? 1 : 0;

							this.audioBuffer.getChannelData( 0 )[ t ] = tmpOutputArrayL[ j ] * enable;
							this.audioBuffer.getChannelData( 1 )[ t ] = tmpOutputArrayR[ j ] * enable;

						}

					} );

				}

			}

			this.force = true;
			this.isAudioBufferReady = true;

			this.notice();

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

		this.implusBuffer = this.audioContext.createBuffer( 2, this.audioContext.sampleRate * 1.5, this.audioContext.sampleRate );

		for ( let i = 0; i < this.implusBuffer.length; i ++ ) {

			const t = i / this.implusBuffer.length;

			this.implusBuffer.getChannelData( 0 )[ i ] = ( Math.random() * 2.0 - 1.0 ) * 0.9 * Math.exp( - t * 5 );
			this.implusBuffer.getChannelData( 1 )[ i ] = ( Math.random() * 2.0 - 1.0 ) * 0.9 * Math.exp( - t * 5 );

		}

		this.convolverNode = this.audioContext.createConvolver();
		this.convolverNode.buffer = this.implusBuffer;

		// gain

		this.gainNode = this.audioContext.createGain();
		this.gainNode.gain.value = 1.3;

		/*-------------------------------
			Texture
		-------------------------------*/

		// texture

		this.realtimeDataSize = 2048;
		this.realtimeAnalyzer = this.audioContext.createAnalyser();
		this.realtimeAnalyzer.fftSize = this.realtimeDataSize;

		this.timeDomainArray = new Uint8Array( this.realtimeAnalyzer.fftSize );
		this.timeDomainTexture = new GLP.GLPowerTexture( this.gl );
		this.timeDomainTexture.setting( { type: this.gl.UNSIGNED_BYTE, internalFormat: this.gl.LUMINANCE, format: this.gl.LUMINANCE, magFilter: this.gl.LINEAR, minFilter: this.gl.LINEAR, wrapS: this.gl.MIRRORED_REPEAT } );
		this.timeDomainTexture.attach( { width: this.realtimeDataSize, height: 1, data: this.timeDomainArray } );

		this.frequencyArray = new Uint8Array( this.realtimeAnalyzer.frequencyBinCount );
		this.frequencyTexture = new GLP.GLPowerTexture( this.gl );
		this.frequencyTexture.setting( { type: this.gl.UNSIGNED_BYTE, internalFormat: this.gl.LUMINANCE, format: this.gl.LUMINANCE, magFilter: this.gl.LINEAR, minFilter: this.gl.LINEAR, wrapS: this.gl.MIRRORED_REPEAT } );
		this.frequencyTexture.attach( { width: this.realtimeAnalyzer.frequencyBinCount, height: 1, data: this.frequencyArray } );

	}

	static get key(): string {

		return "music";

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		if ( ! event.playing || event.timeCode < 0 ) {

			this.stop();

			return;

		}

		this.play( event.timeCode, this.force );
		this.force = false;

		// texture

		this.realtimeAnalyzer.getByteTimeDomainData( this.timeDomainArray );
		this.timeDomainTexture.attach( { width: this.realtimeDataSize, height: 1, data: this.timeDomainArray } );

		this.realtimeAnalyzer.getByteFrequencyData( this.frequencyArray );
		this.frequencyTexture.attach( { width: this.realtimeAnalyzer.frequencyBinCount, height: 1, data: this.frequencyArray } );

	}

	public setEntityImpl( entity: MXP.Entity ): void {

		this.notice();

	}

	protected unsetEntityImpl( prevEntity: MXP.Entity ): void {

		this.stop();

	}

	private notice() {

		setTimeout( () => {

			if ( this.entity ) {

				this.entity.noticeParent( 'update/music', [ this.audioBuffer, this.frequencyTexture, this.timeDomainTexture ] );

			}

		}, 0 );

	}

	public play( time: number = 0, force?: boolean ) {

		if ( this.audioSrcNode && ! force ) {

			if ( Math.abs( ( this.audioSrcNode.context.currentTime - this.playStartTime ) - time ) < 0.1 ) return;

		}

		this.stop();

		if ( ! this.isAudioBufferReady ) return;

		// src

		this.audioSrcNode = this.audioContext.createBufferSource();
		this.audioSrcNode.buffer = this.audioBuffer;
		this.audioSrcNode.loop = false;
		this.audioSrcNode.start( 0, time );

		this.playStartTime = this.audioSrcNode.context.currentTime - ( time || 0 );

		// connect

		this.audioSrcNode.connect( this.gainNode );
		this.audioSrcNode.connect( this.convolverNode );
		this.convolverNode.connect( this.gainNode );
		this.gainNode.connect( this.audioContext.destination );
		this.gainNode.connect( this.realtimeAnalyzer );

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

	public dispose(): void {

		super.dispose();

		this.stop();

		this.frequencyTexture.dispose();
		this.timeDomainTexture.dispose();

	}

}
