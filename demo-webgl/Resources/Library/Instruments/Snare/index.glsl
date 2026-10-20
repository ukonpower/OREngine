// osc Demo4 の曲のスネア。
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

float snare( float et, float ft, float etw ) {

	float o = 0.0;

	et = fract( et );

	float t = ft;

	o += ( fbm( t * 3200.0 ) - 0.5 ) * exp( - 250.0 * et * etw );
	// 高い所のノイズを足す
	o += ( fbm( t * 4800.0 ) - 0.5 ) * exp( - 300.0 * et * etw ) * 0.5;

	return o;

}

// 2拍目と4拍目
vec2 snare2( float mt, float ft ) {

	vec4 bt = beat( mt, 2.0 );

	return vec2( snare( bt.z - 0.5, fract( ft ), 0.25 ) );

}

// 16分音符でランダムに刻む。裏拍は必ず鳴らす
vec2 snare3( float mt, float ft ) {

	vec2 o = vec2( 0.0 );

	vec4 b2 = beat( mt, 2.0 );

	for ( int i = 0; i < 16; i ++ ) {

		float l = b2.z - float( i ) / 16.0;
		float rand = whiteNoise( b2.y * 200.0 + float( i ) );

		if ( i == 8 ) {

			o += snare( l, fract( ft ), 1.0 ) * 1.2;

		} else if ( rand > 0.5 ) {

			o += snare( l, fract( ft ), 1.5 ) * ( 0.5 + rand * 0.5 );

		}

	}

	return o * 0.9;

}

// 帯の数値: x = snare2、y = snare3（Climax）の音量
vec2 trackSound( Song s ) {

	float ft = getFrec( s );

	vec2 o = vec2( 0.0 );

	if ( s.clipParam.x > 0.0 ) {

		o += snare2( s.clipBeat, ft ) * s.clipParam.x;

	}

	if ( s.clipParam.y > 0.0 ) {

		o += snare3( s.clipBeat, ft ) * s.clipParam.y;

	}

	return o;

}
