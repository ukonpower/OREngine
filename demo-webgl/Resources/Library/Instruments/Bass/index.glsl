// osc Demo4 の曲のベース。ノート（music シーンの帯に置いた、4拍ごとのコードの根音の3オクターブ下）1つぶんの音

#include <module:common>

// Demo4 の音高。0 が 440Hz で、1つ上がるごとに 1.06 倍（平均律の noteFreq とは少しずれるので、Demo4 の音のまま残す）
float s2f( float scale ) {

	return 440.0 * pow( 1.06, scale );

}

float ssin( float time ) {

	return sin( time * TPI );

}

// 今のサンプルの、帯の中の拍（music モジュールの uniform と aIndex から求める。Song.clipBeat と同じ値）。
// Demo4 の発振器と左右の振りはノートの頭で巻き戻さず帯の中の時刻で回り続けていたので、ノートの外の時刻として読む
float clipBeatNow() {

	return uClipBeat + aIndex / uSampleRate * uBPM / 60.0;

}

vec2 noteSound( Note n, float t ) {

	float beatSec = 60.0 / uBPM;
	float clipBeat = clipBeatNow();

	// 発振器の位相に使う時刻（秒）。帯の中の 8 拍ごとに巻き戻す（Demo4 の getFrec）
	float ft = mod( clipBeat, 8.0 ) * beatSec;

	// ノートの頭からの拍
	float beat = t / beatSec;

	// MIDI の 69（A4）が Demo4 の音高の 0
	float freq = s2f( n.pitch - 69.0 );

	// Demo4 の1音（4拍）で減る包絡
	float envTime = beat * 0.25;
	float env = exp( - envTime * 3.0 );
	env *= smoothstep( 0.0, 0.01, envTime );

	vec2 o = vec2( 0.0 );

	for ( int i = 0; i < 4; i ++ ) {

		float harmonic = float( i + 1 );
		float wave = ssin( ft * freq );
		o += wave * env / harmonic;

	}

	// 左右にゆっくり振る
	float pan = sin( clipBeat * 8.0 );
	o.x *= 1.0 + pan * 0.3;
	o.y *= 1.0 - pan * 0.3;

	return o * 0.05 * n.velocity;

}
