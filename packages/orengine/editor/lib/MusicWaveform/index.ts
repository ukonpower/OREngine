import type { MusicOutput } from '../../../builtin/Components/Utility/Music';

// 音量の変更・帯の移動から波形の1本を足し直すまでの待ち（ミリ秒）。数値・帯のドラッグ中は毎フレーム変わり、
// そのたびに足し直すと（音量なら曲全体、10 トラック・158 秒で約 7,600 万サンプル）止まるので、変更が止まってから1回だけ足す。
// Music の REGENERATE_DELAY と同じ長さにして、写した音が聞こえ始めるのと波形が揃うようにする
const REMIX_DELAY = 200;

// update/music で受けたトラックの音を、波形表示（Timeline・AudioView）用の1本に足し合わせる。
// 表示は1チャンネルしか読まないので、左右の平均に音量を掛けて足す。パン・リバーブは反映しない目安の表示。
// output の [start, end) だけを足し直し、長さ・サンプリングレートが変わったときは作り直して全体を足す。
// 音量が変わったときは全体を、1トラックだけが変わったとき（output.track）はその範囲を、REMIX_DELAY だけ待ってから足し直す。
// 足し直したら onChange を呼ぶ
export class MusicWaveform {

	private buffer_: AudioBuffer | null;
	// 最後に届いた output。待ってから全体を足し直すときに使う
	private output_: MusicOutput | null;
	// 最後に届いた output のトラックごとの音量。変わったかどうかを比べる
	private volumes_: number[];
	private timer_: number | null;
	// 待ってから足し直す範囲 [start, end)。無ければ start === end
	private pendingStart_: number;
	private pendingEnd_: number;
	private onChange_: () => void;

	constructor( onChange: () => void ) {

		this.buffer_ = null;
		this.output_ = null;
		this.volumes_ = [];
		this.timer_ = null;
		this.pendingStart_ = 0;
		this.pendingEnd_ = 0;
		this.onChange_ = onChange;

	}

	public get buffer() {

		return this.buffer_;

	}

	public update( output: MusicOutput ) {

		this.output_ = output;

		const volumeChanged = this.updateVolumes_( output );

		let buffer = this.buffer_;
		let start = output.start;
		let end = output.end;
		let recreated = false;

		if ( ! buffer || buffer.length !== output.length || buffer.sampleRate !== output.sampleRate ) {

			buffer = new AudioBuffer( { length: output.length, sampleRate: output.sampleRate, numberOfChannels: 1 } );
			this.buffer_ = buffer;
			start = 0;
			end = output.length;
			recreated = true;

		}

		if ( volumeChanged ) {

			this.defer_( 0, output.length );

		}

		// 1トラックだけが変わったとき（帯の移動）は、ドラッグの間に毎回足さず、止まってから足す
		if ( output.track !== undefined && ! recreated ) {

			this.defer_( start, end );

			return;

		}

		if ( start < end ) {

			this.mix_( output, start, end );
			this.onChange_();

		}

		// 全体を足し直したなら、待っている足し直しは要らない
		if ( start === 0 && end === output.length ) {

			this.cancel_();

		}

	}

	public clear() {

		this.cancel_();
		this.buffer_ = null;
		this.output_ = null;
		this.volumes_ = [];

	}

	public dispose() {

		this.cancel_();

	}

	// 音量を覚え直す。前に届いたときから変わっていたら true
	private updateVolumes_( output: MusicOutput ) {

		let changed = output.tracks.length !== this.volumes_.length;

		for ( let i = 0; i < output.tracks.length; i ++ ) {

			if ( output.tracks[ i ].volume !== this.volumes_[ i ] ) {

				changed = true;

			}

		}

		this.volumes_ = [];

		for ( const track of output.tracks ) {

			this.volumes_.push( track.volume );

		}

		return changed;

	}

	// [start, end) を待ってから足し直す範囲に足し、待ちを始め直す
	private defer_( start: number, end: number ) {

		if ( this.pendingStart_ < this.pendingEnd_ ) {

			this.pendingStart_ = Math.min( this.pendingStart_, start );
			this.pendingEnd_ = Math.max( this.pendingEnd_, end );

		} else {

			this.pendingStart_ = start;
			this.pendingEnd_ = end;

		}

		if ( this.timer_ !== null ) window.clearTimeout( this.timer_ );

		this.timer_ = window.setTimeout( () => this.remixPending_(), REMIX_DELAY );

	}

	private remixPending_() {

		this.timer_ = null;

		const output = this.output_;
		const start = this.pendingStart_;
		const end = Math.min( this.pendingEnd_, output ? output.length : 0 );

		this.pendingStart_ = 0;
		this.pendingEnd_ = 0;

		if ( ! output || ! this.buffer_ || start >= end ) return;

		this.mix_( output, start, end );
		this.onChange_();

	}

	private mix_( output: MusicOutput, start: number, end: number ) {

		if ( ! this.buffer_ ) return;

		const mix = this.buffer_.getChannelData( 0 );

		mix.fill( 0, start, end );

		for ( const track of output.tracks ) {

			if ( ! track.buffer ) continue;

			const left = track.buffer.getChannelData( 0 );
			const right = track.buffer.getChannelData( 1 );
			const gain = track.volume * 0.5;

			for ( let i = start; i < end; i ++ ) {

				mix[ i ] += ( left[ i ] + right[ i ] ) * gain;

			}

		}

	}

	private cancel_() {

		if ( this.timer_ !== null ) {

			window.clearTimeout( this.timer_ );
			this.timer_ = null;

		}

		this.pendingStart_ = 0;
		this.pendingEnd_ = 0;

	}

}

// トラックの波形の素の1かたまりのサンプル数。Music パネルは帯の波形をこの単位の最大の振れ幅から描く
export const PEAK_SAMPLES = 256;

// トラックごとの波形の素。PEAK_SAMPLES サンプルごとに左右の振れ幅の最大を持ち、拡大縮小のたびに全サンプルを読まずに描けるようにする。
// 並びは Music の tracks と同じ。音の入れ物がまだ無いトラックは null
export class MusicTrackPeaks {

	private tracks_: ( { buffer: AudioBuffer, peaks: Float32Array } | null )[];
	private sampleRate_: number;

	constructor() {

		this.tracks_ = [];
		this.sampleRate_ = 0;

	}

	public get sampleRate() {

		return this.sampleRate_;

	}

	public get( track: number ): Float32Array | null {

		const entry = this.tracks_[ track ];

		if ( ! entry ) return null;

		return entry.peaks;

	}

	// output の [start, end) だけを読み直す。入れ物が替わったトラックは全体を読む
	public update( output: MusicOutput ) {

		this.sampleRate_ = output.sampleRate;
		this.tracks_.length = output.tracks.length;

		for ( let i = 0; i < output.tracks.length; i ++ ) {

			// 1トラックだけが変わったときは、ほかのトラックの波形の素は前のまま使える
			if ( output.track !== undefined && output.track !== i && this.tracks_[ i ] ) continue;

			const buffer = output.tracks[ i ].buffer;

			if ( ! buffer ) {

				this.tracks_[ i ] = null;

				continue;

			}

			let entry = this.tracks_[ i ];
			let start = output.start;
			let end = output.end;

			if ( ! entry || entry.buffer !== buffer ) {

				entry = { buffer, peaks: new Float32Array( Math.ceil( buffer.length / PEAK_SAMPLES ) ) };
				this.tracks_[ i ] = entry;
				start = 0;
				end = buffer.length;

			}

			const left = buffer.getChannelData( 0 );
			const right = buffer.getChannelData( 1 );
			const firstPeak = Math.floor( start / PEAK_SAMPLES );
			const lastPeak = Math.min( entry.peaks.length, Math.ceil( end / PEAK_SAMPLES ) );

			for ( let p = firstPeak; p < lastPeak; p ++ ) {

				const from = p * PEAK_SAMPLES;
				const to = Math.min( buffer.length, from + PEAK_SAMPLES );

				let peak = 0;

				for ( let s = from; s < to; s ++ ) {

					peak = Math.max( peak, Math.abs( left[ s ] ), Math.abs( right[ s ] ) );

				}

				entry.peaks[ p ] = peak;

			}

		}

	}

	public clear() {

		this.tracks_.length = 0;

	}

}
