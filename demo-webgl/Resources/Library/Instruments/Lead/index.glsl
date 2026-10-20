// osc Demo4 の曲のリードシンセ。ノート（music シーンの帯に置いた、1/4 拍ごとに上下する「てけてけ」メロディ）1つぶんの音

#include <module:common>

// Demo4 の音高。0 が 440Hz で、1つ上がるごとに 1.06 倍（平均律の noteFreq とは少しずれるので、Demo4 の音のまま残す）
float s2f( float scale ) {

	return 440.0 * pow( 1.06, scale );

}

float ssin( float time ) {

	return sin( time * TPI );

}

// 今のサンプルの、帯の中の拍（music モジュールの uniform と aIndex から求める。Song.clipBeat と同じ値）。
// Demo4 の発振器はノートの頭で位相を巻き戻さず帯の中の時刻で回り続け、左右の振りも帯の中の位置で決まっていたので、
// ノートの外の時刻として読む。ノートの頭から数える（t だけで書く）と、どの音も頭で3つの発振器が重なって 2.7dB 大きくなり、左右の振りも消える
float clipBeatNow() {

	return uClipBeat + aIndex / uSampleRate * uBPM / 60.0;

}

// 帯の数値: x = 音量
vec2 noteSound( Note n, float t ) {

	float beatSec = 60.0 / uBPM;
	float clipBeat = clipBeatNow();

	// 発振器の位相に使う時刻（秒）。帯の中の 8 拍ごとに巻き戻す（Demo4 の getFrec）
	float ft = mod( clipBeat, 8.0 ) * beatSec;

	// MIDI の 69（A4）が Demo4 の音高の 0
	float freq = s2f( n.pitch - 69.0 );

	// Demo4 の1音（1/4 拍）ごとの素早いアタックと減衰
	float envTime = t / beatSec * 4.0;
	float env = exp( - envTime * 16.0 );
	env *= smoothstep( 0.0, 0.002, envTime );

	vec2 o = vec2( 0.0 );

	for ( int i = 0; i < 3; i ++ ) {

		float detune = ( float( i ) - 1.0 ) * 0.003;
		float harmonic = 1.0 + float( i ) * 0.5;

		float phase = float( i ) * 0.1;
		float sine = ssin( ft * freq * ( 1.0 + detune ) + phase );
		float sawWave = saw( ft * freq * ( 1.0 + detune ) );

		o += vec2( mix( sine, sawWave * 0.5, 0.3 ) * env / harmonic );

	}

	// ビブラート
	float vibrato = sin( ft * 5.0 ) * 0.002;
	o *= 1.0 + vibrato;

	// 2拍の中の何番目の 1/4 拍か（Demo4 の音型の番号）で左右へ振る
	float noteIndex = mod( floor( ( clipBeat - t / beatSec ) * 4.0 + 0.5 ), 8.0 );
	float pan = noteIndex / 4.0;
	o.x *= 1.0 + pan * 0.4;
	o.y *= 1.0 - pan * 0.4;

	return o * 0.12 * n.clipParam.x * n.velocity;

}
