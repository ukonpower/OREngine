// osc Demo4 の曲の16分音符の速いアルペジオ。
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

vec2 arpeggioFast( float mt, float ft, float pitch ) {

	vec2 o = vec2( 0.0 );

	vec4 b32 = beat( mt, 32.0 );

	int notes[] = int[]( 0, 4, 7, 12 );
	int noteIndex = int( mod( floor( mt * 8.0 ), 4.0 ) );

	float scale = baseLine[ int( mod( b32.x / 4.0, 8.0 ) ) ];
	float note = scale + float( notes[ noteIndex ] ) + pitch;

	float envTime = fract( mt * 8.0 );
	float env = exp( - envTime * 12.0 );
	env *= smoothstep( 0.0, 0.003, envTime );

	o += ssin( ft * s2f( note ) ) * env;

	// 音ごとに左右へ振る
	float pan = float( noteIndex ) / 4.0;
	o.x *= 1.0 + pan * 0.3;
	o.y *= 1.0 - pan * 0.3;

	return o * 0.06;

}

// 帯の数値: x = 音量
vec2 trackSound( Song s ) {

	return arpeggioFast( s.clipBeat, getFrec( s ), 0.0 ) * s.clipParam.x;

}
