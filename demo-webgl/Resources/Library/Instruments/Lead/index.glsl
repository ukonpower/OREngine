// osc Demo4 の曲のリードシンセ。
// どのセクションで鳴らすかは music シーンの帯で決め、セクションごとの鳴り方の違いは帯の数値で受ける

#include <module:common>

/*-------------------------------
	Demo4 の曲の共通部品（各楽器の .glsl に同じものを置く）
-------------------------------*/

// 拍の情報。x: 拍の中の経過（0〜beat）、y: 何個目か、z: 拍の中の進み（0〜1）、w: 頭からの数（小数）
vec4 beat( float time, float beat ) {

	float b = mod( time, beat );

	return vec4( b, floor( time / beat ), b / beat, time / beat );

}

// Demo4 の音高。0 が 440Hz で、1つ上がるごとに 1.06 倍（平均律の noteFreq とは少しずれるので、Demo4 の音のまま残す）
float s2f( float scale ) {

	return 440.0 * pow( 1.06, scale );

}

float ssin( float time ) {

	return sin( time * TPI );

}

// 音の位相に使う時刻（秒）。帯の中の 8 拍ごとに巻き戻す（Demo4 の getFrec）。
// Demo4 は曲の頭からの秒から引いていたが、帯を動かしても同じ音になるよう帯の中の拍だけで数える
float getFrec( Song s ) {

	return mod( s.clipBeat, 8.0 ) * s.beatSec;

}

// コードの根音（s2f の音高）。4拍ごとに次へ進み、32拍で一巡する
const float baseLine[] = float[](
	10.0, 6.0, 8.0, 3.0, 10.0, 6.0, 8.0, 3.0
);

// 32分音符で上下する「てけてけ」メロディ
vec2 leadSynth( float mt, float ft, float pitch ) {

	vec2 o = vec2( 0.0 );

	vec4 b32 = beat( mt, 32.0 );
	vec4 b2 = beat( mt, 2.0 );

	int pattern[ 8 ] = int[]( 0, 4, 7, 4, 0, - 5, 0, 4 );

	float scale = baseLine[ int( mod( b32.x / 4.0, 8.0 ) ) ];

	int noteIndex = int( mod( b2.w * 8.0, 8.0 ) );

	float note = scale + float( pattern[ noteIndex ] ) + pitch + 12.0;

	// 32分音符ごとの素早いアタックと減衰
	float envTime = fract( b2.w * 8.0 );
	float env = exp( - envTime * 16.0 );
	env *= smoothstep( 0.0, 0.002, envTime );

	for ( int i = 0; i < 3; i ++ ) {

		float detune = ( float( i ) - 1.0 ) * 0.003;
		float harmonic = 1.0 + float( i ) * 0.5;

		float phase = float( i ) * 0.1;
		float sine = ssin( ft * s2f( note ) * ( 1.0 + detune ) + phase );
		float sawWave = saw( ft * s2f( note ) * ( 1.0 + detune ) );

		o += vec2( mix( sine, sawWave * 0.5, 0.3 ) * env / harmonic );

	}

	// ビブラート
	float vibrato = sin( ft * 5.0 ) * 0.002;
	o *= 1.0 + vibrato;

	// 音ごとに左右へ振る
	float pan = float( noteIndex ) / 4.0;
	o.x *= 1.0 + pan * 0.4;
	o.y *= 1.0 - pan * 0.4;

	return o * 0.12;

}

// 帯の数値: x = 音量
vec2 trackSound( Song s ) {

	return leadSynth( s.clipBeat, getFrec( s ), 0.0 ) * s.clipParam.x;

}
