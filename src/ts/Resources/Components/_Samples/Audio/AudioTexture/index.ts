import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { gl } from '~/ts/Globals';

const uniforms: GLP.Uniforms = {
	uAudioWaveTex: {
		value: null,
		type: "1i"
	},
	uAudioFreqTex: {
		value: null,
		type: "1i"
	}
};

export class AudioTexture extends MXP.Component {

	private _audioContext: AudioContext | null = null;
	private _analyser: AnalyserNode | null = null;
	private _waveArray: Uint8Array | null = null;
	private _freqArray: Uint8Array | null = null;
	private _isInitialized: boolean = false;
	private _deviceId: string | null = "none";
	private _deviceList: { value: string; label: string; }[] = [];

	constructor( params: MXP.ComponentParams ) {

		super( params );

		/*-------------------------------
			Fields
		-------------------------------*/


		// デバイスリストを初期化
		navigator.mediaDevices?.enumerateDevices().then( devices => {

			const audioDevices = devices.filter( device => device.kind === 'audioinput' );
			this._deviceList = [
				{ value: "none", label: "None" },
				...audioDevices.map( device => ( {
					value: device.deviceId,
					label: device.label || `マイク ${device.deviceId}`
				} ) )
			];

			this.noticeField( "deviceId" );

		} );

		const reload = () => {

			this.disposeAudio();
			this.initialize().catch( ( e ) => {

				console.error( 'オーディオの初期化に失敗しました:', e );

			} );

		};

		this.field( "deviceId",
			() => this._deviceId || "none",
			( v ) => {

				this._deviceId = v;
				reload();

			},
			{
				format: {
					type: "select",
					list: () => this._deviceList
				}
			}
		);

	}

	public static get uniforms(): GLP.Uniforms {

		return uniforms;

	}

	private async initialize(): Promise<void> {

		try {

			const constraints = {
				audio: this._deviceId && this._deviceId !== "none" ? {
					deviceId: { exact: this._deviceId }
				} : true
			};

			// マイクへのアクセスを要求
			const stream = await navigator.mediaDevices.getUserMedia( constraints );

			// AudioContextの作成
			this._audioContext = new AudioContext();
			const source = this._audioContext.createMediaStreamSource( stream );

			// アナライザーノードの設定
			this._analyser = this._audioContext.createAnalyser();
			this._analyser.fftSize = 2048;
			source.connect( this._analyser );

			// データ配列の初期化
			this._waveArray = new Uint8Array( this._analyser.fftSize );
			this._freqArray = new Uint8Array( this._analyser.frequencyBinCount );

			// 波形テクスチャの作成
			const waveTexture = new GLP.GLPowerTexture( gl );
			waveTexture.setting( {
				wrapS: gl.MIRRORED_REPEAT,
				wrapT: gl.CLAMP_TO_EDGE,
				minFilter: gl.LINEAR,
				magFilter: gl.LINEAR,
				format: gl.LUMINANCE,
				internalFormat: gl.LUMINANCE,
				type: gl.UNSIGNED_BYTE,
			} );
			waveTexture.attach( {
				width: this._analyser.fftSize,
				height: 1,
				data: this._waveArray,
			} );

			uniforms.uAudioWaveTex.value = waveTexture;

			// 周波数テクスチャの作成
			const freqTexture = new GLP.GLPowerTexture( gl );
			freqTexture.setting( {
				wrapS: gl.MIRRORED_REPEAT,
				wrapT: gl.CLAMP_TO_EDGE,
				minFilter: gl.LINEAR,
				magFilter: gl.LINEAR,
				format: gl.LUMINANCE,
				internalFormat: gl.LUMINANCE,
				type: gl.UNSIGNED_BYTE,
			} );
			freqTexture.attach( {
				width: this._analyser.frequencyBinCount,
				height: 1,
				data: this._freqArray,
			} );

			uniforms.uAudioFreqTex.value = freqTexture;

			this._isInitialized = true;

		} catch ( error ) {

			console.error( 'オーディオの初期化に失敗しました:', error );

		}

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		if ( ! this._isInitialized || ! this._analyser || ! this._waveArray || ! this._freqArray ) return;

		// 波形データの更新
		this._analyser.getByteTimeDomainData( this._waveArray );

		// 周波数データの更新
		this._analyser.getByteFrequencyData( this._freqArray );

		// テクスチャの更新
		if ( uniforms.uAudioWaveTex.value ) {

			uniforms.uAudioWaveTex.value.attach( {
				width: this._analyser.fftSize,
				height: 1,
				data: this._waveArray,
			} );

		}

		if ( uniforms.uAudioFreqTex.value ) {

			uniforms.uAudioFreqTex.value.attach( {
				width: this._analyser.frequencyBinCount,
				height: 1,
				data: this._freqArray,
			} );

		}

	}

	public disposeAudio(): void {

		if ( this._audioContext ) {

			this._audioContext.close();

		}

		if ( uniforms.uAudioWaveTex.value ) {

			uniforms.uAudioWaveTex.value.dispose();
			uniforms.uAudioWaveTex.value = null;

		}

		if ( uniforms.uAudioFreqTex.value ) {

			uniforms.uAudioFreqTex.value.dispose();
			uniforms.uAudioFreqTex.value = null;

		}

		this._analyser = null;
		this._waveArray = null;
		this._freqArray = null;
		this._isInitialized = false;

	}

}
