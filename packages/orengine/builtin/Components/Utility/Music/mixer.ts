// トラックごとの音量・パンのノード
type MixerChannel = {
	gain: GainNode;
	panner: StereoPannerNode;
};

// スペクトルの FFT の大きさ（osc Demo4 と同じ）。周波数は半分の 256 段で、Music の uMusicFreqTex の幅になる
export const SPECTRUM_FFT_SIZE = 512;

// 残響の素（インパルス）。ノイズを頭からの割合で exp(-7t) に減衰させる（osc Demo4 と同じ）
const createImpulse = ( context: AudioContext, length: number ) => {

	const sampleCount = Math.max( 1, Math.floor( context.sampleRate * length ) );
	const impulse = context.createBuffer( 2, sampleCount, context.sampleRate );

	for ( let channel = 0; channel < 2; channel ++ ) {

		const data = impulse.getChannelData( channel );

		for ( let i = 0; i < sampleCount; i ++ ) {

			data[ i ] = ( Math.random() * 2.0 - 1.0 ) * 0.9 * Math.exp( - 7.0 * i / sampleCount );

		}

	}

	return impulse;

};

// トラックの音を Web Audio のノードで混ぜて鳴らす。
// source → 音量（GainNode）→ パン（StereoPannerNode）─┬→ 全体の GainNode ─┬→ destination
//                                                     │                   └→ スペクトル（AnalyserNode）
//                                                     └→ リバーブ（ConvolverNode）→ 残響の量（GainNode）→ 全体の GainNode
// トラックごとにノードを分けるのは、トラックごとのエフェクトを後から足せるようにするため
export class MusicMixer {

	private context_: AudioContext;
	private master_: GainNode;
	private convolver_: ConvolverNode;
	private wet_: GainNode;
	private analyser_: AnalyserNode;
	private reverbLength_: number;
	private reverbWet_: number;
	private channels_: MixerChannel[];
	private sources_: AudioBufferSourceNode[];
	private playing_: boolean;
	// 曲の頭が鳴る（鳴った）はずの context.currentTime。エディタのメトロノームが拍をそろえるのに読む
	// （getter にすると player に残るので、フィールドのまま公開する）
	public songStartTime: number;

	constructor( context: AudioContext ) {

		this.context_ = context;

		this.master_ = context.createGain();
		this.master_.connect( context.destination );

		this.convolver_ = context.createConvolver();
		this.wet_ = context.createGain();
		this.convolver_.connect( this.wet_ );
		this.wet_.connect( this.master_ );
		this.reverbLength_ = 0;

		// 全体の GainNode の後（全トラック・リバーブ込み）の音から取る
		this.analyser_ = context.createAnalyser();
		this.analyser_.fftSize = SPECTRUM_FFT_SIZE;
		this.master_.connect( this.analyser_ );

		this.reverbWet_ = - 1;

		this.channels_ = [];
		this.sources_ = [];
		this.playing_ = false;
		this.songStartTime = 0;

	}

	public get playing() {

		return this.playing_;

	}

	// 今鳴らしている所の、曲の頭からの秒
	public get position() {

		return this.context_.currentTime - this.songStartTime;

	}

	// 今鳴っている音の周波数ごとの強さ（0〜255）を out に書く。out の長さは SPECTRUM_FFT_SIZE / 2
	public readSpectrum( out: Uint8Array<ArrayBuffer> ) {

		this.analyser_.getByteFrequencyData( out );

	}

	/*-------------------------------
		Settings
	-------------------------------*/

	// トラックの数に合わせてノードを足し引きする
	public setChannelCount( count: number ) {

		while ( this.channels_.length > count ) {

			const channel = this.channels_.pop()!;

			channel.gain.disconnect();
			channel.panner.disconnect();

		}

		while ( this.channels_.length < count ) {

			const gain = this.context_.createGain();
			const panner = this.context_.createStereoPanner();

			gain.connect( panner );
			panner.connect( this.master_ );
			panner.connect( this.convolver_ );

			this.channels_.push( { gain, panner } );

		}

	}

	// 生成もミックスもやり直さず、ノードの値だけを書き換える
	public setChannel( index: number, volume: number, pan: number ) {

		const channel = this.channels_[ index ];

		channel.gain.gain.value = volume;
		channel.panner.pan.value = pan;

	}

	// 残響の素は長さが変わったときだけ作り直す（量はノードの値を書き換えるだけ）。毎フレーム呼ばれるので、変わっていなければ何もしない
	public setReverb( length: number, wet: number ) {

		if ( length !== this.reverbLength_ ) {

			this.convolver_.buffer = createImpulse( this.context_, length );
			this.reverbLength_ = length;

		}

		// AudioParam の value は 32bit に丸められるので、読み返した値ではなく書いた値と比べる
		if ( wet !== this.reverbWet_ ) {

			this.wet_.gain.value = wet;
			this.reverbWet_ = wet;

		}

	}

	/*-------------------------------
		Playback
	-------------------------------*/

	// 曲の offset 秒目から全トラックを鳴らす。トラックの並びはチャンネルと同じで、音の無いトラックは null。
	// 全トラックを同じ when と offset で start して揃える
	public play( buffers: ( AudioBuffer | null )[], offset: number ) {

		this.stop();

		const when = this.context_.currentTime;

		this.playing_ = true;
		this.songStartTime = when - offset;

		// 曲の頭より前（offset が負）は start が受け付けないので鳴らさない。曲の終わりより後は start が何も鳴らさない
		if ( offset < 0 ) return;

		for ( let i = 0; i < buffers.length; i ++ ) {

			const buffer = buffers[ i ];

			if ( ! buffer ) continue;

			const source = this.context_.createBufferSource();
			source.buffer = buffer;
			source.connect( this.channels_[ i ].gain );
			source.start( when, offset );

			this.sources_.push( source );

		}

	}

	public stop() {

		for ( const source of this.sources_ ) {

			source.stop();
			source.disconnect();

		}

		this.sources_ = [];
		this.playing_ = false;

	}

	public dispose() {

		this.stop();
		this.setChannelCount( 0 );

		this.convolver_.disconnect();
		this.wet_.disconnect();
		this.analyser_.disconnect();
		this.master_.disconnect();

	}

}
