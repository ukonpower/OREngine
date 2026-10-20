import type { MusicOutput } from '../../../builtin/Components/Utility/Music';

// update/music で受けたトラックの音を、波形表示（Timeline・AudioView）用の1本に足し合わせる。
// 表示は1チャンネルしか読まないので、左右の平均に音量を掛けて足す。パン・リバーブは反映しない目安の表示。
// output の [start, end) だけを足し直し、長さ・サンプリングレートが変わったときは作り直して全体を足す
export const mixMusicWaveform = ( current: AudioBuffer | null, output: MusicOutput ): AudioBuffer => {

	let buffer = current;
	let start = output.start;
	let end = output.end;

	if ( ! buffer || buffer.length !== output.length || buffer.sampleRate !== output.sampleRate ) {

		buffer = new AudioBuffer( { length: output.length, sampleRate: output.sampleRate, numberOfChannels: 1 } );
		start = 0;
		end = output.length;

	}

	const mix = buffer.getChannelData( 0 );

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

	return buffer;

};

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
