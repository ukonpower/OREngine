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

		const left = track.buffer.getChannelData( 0 );
		const right = track.buffer.getChannelData( 1 );
		const gain = track.volume * 0.5;

		for ( let i = start; i < end; i ++ ) {

			mix[ i ] += ( left[ i ] + right[ i ] ) * gain;

		}

	}

	return buffer;

};
