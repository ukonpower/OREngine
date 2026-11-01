// osc Demo4 の曲のキラキラしたアルペジオ。
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

vec2 ssin( vec2 time ) {

	return vec2( ssin( time.x ), ssin( time.y ) );

}

vec2 arpeggio( float mt, float ft, float pitch ) {

	vec2 o = vec2( 0.0 );

	vec4 b32 = beat( mt, 32.0 );

	// 上がって下がるパターン
	int notes[] = int[]( 0, 4, 7, 12, 7, 4 );
	int noteIndex = int( mod( floor( mt * 4.0 ), 6.0 ) );

	float scale = baseLine[ int( mod( b32.x / 4.0, 8.0 ) ) ];
	float note = scale + float( notes[ noteIndex ] ) + pitch;

	float envTime = fract( mt * 4.0 );
	float env = exp( - envTime * 8.0 );
	env *= smoothstep( 0.0, 0.005, envTime );

	// ディチューンで厚みを出す
	for ( int i = 0; i < 2; i ++ ) {

		float detune = float( i ) * 0.003;
		o += ssin( ft * s2f( note ) * ( 1.0 + detune ) + vec2( float( i ) * 0.3, 0.0 ) ) * env;

	}

	return o * 0.08;

}

// 帯の数値: x = そのままの高さ、y = 1オクターブ上、z = 1オクターブ下 のアルペジオの音量
vec2 trackSound( Song s ) {

	float ft = getFrec( s );

	vec2 o = vec2( 0.0 );

	if ( s.clipParam.x > 0.0 ) {

		o += arpeggio( s.clipBeat, ft, 0.0 ) * s.clipParam.x;

	}

	if ( s.clipParam.y > 0.0 ) {

		o += arpeggio( s.clipBeat, ft, 12.0 ) * s.clipParam.y;

	}

	if ( s.clipParam.z > 0.0 ) {

		o += arpeggio( s.clipBeat, ft, - 12.0 ) * s.clipParam.z;

	}

	return o;

}
