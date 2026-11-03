// osc Demo4 の曲のハイハット。
// どのセクションで鳴らすかは music シーンの帯で決め、セクションごとの鳴り方の違いは帯の数値で受ける

#include <module:noise_value>

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

// 音の位相に使う時刻（秒）。帯の中の 8 拍ごとに巻き戻す（Demo4 の getFrec）。
// Demo4 は曲の頭からの秒から引いていたが、帯を動かしても同じ音になるよう帯の中の拍だけで数える
float getFrec( Song s ) {

	return mod( s.clipBeat, 8.0 ) * s.beatSec;

}

// コードの根音（s2f の音高）。4拍ごとに次へ進み、32拍で一巡する
const float baseLine[] = float[](
	10.0, 6.0, 8.0, 3.0, 10.0, 6.0, 8.0, 3.0
);

float hihat( float et ) {

	et = fract( et );

	return noiseValue( vec3( et * 22000.0 ) ) * max( 0.0, 1.0 - min( 0.85, et * 4.25 ) - ( et - 0.25 ) * 0.3 );

}

// 16分音符でランダムに鳴らす
vec2 hihat1( float mt ) {

	vec2 o = vec2( 0.0 );

	vec4 b16 = beat( mt * 16.0, 4.0 );

	o += hihat( b16.z ) * ( step( 0.4, whiteNoise( b16.y ) ) * 0.5 + 0.5 );
	o += hihat( b16.z - 0.5 ) * step( 0.5, whiteNoise( b16.y * 10.0 + 0.1 ) );

	return o * 0.02;

}

// 帯の数値: x = 音量
vec2 trackSound( Song s ) {

	return hihat1( s.clipBeat ) * s.clipParam.x;

}
