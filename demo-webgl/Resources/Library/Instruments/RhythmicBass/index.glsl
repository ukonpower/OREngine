// osc Demo4 の曲の16分音符で刻むベース（Climax 用）。
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

// Demo4 の三角波。time が 2 進むと1周する
float tri( float time ) {

	return abs( 2.0 * fract( time * 0.5 - 0.25 ) - 1.0 ) * 2.0 - 1.0;

}

vec2 rhythmicBass( float mt, float ft, float pitch ) {

	vec2 o = vec2( 0.0 );

	vec4 b32 = beat( mt, 32.0 );

	float scale = baseLine[ int( mod( b32.x / 4.0, 8.0 ) ) ];

	// 16分音符で刻む。鋭いアタックと速い減衰
	float envTime = fract( mt * 4.0 );
	float env = exp( - envTime * 2.0 );
	env *= smoothstep( 0.0, 0.003, envTime );

	// 4つで1組: 根音を3回と5度上を1回
	int noteIndex = int( mod( floor( mt * 4.0 ), 4.0 ) );
	int pattern[ 4 ] = int[]( 0, 0, 0, 7 );

	float note = scale + float( pattern[ noteIndex ] ) + pitch - 12.0 * 3.0;

	for ( int i = 0; i < 4; i ++ ) {

		float harmonic = float( i + 1 );
		float sine = ssin( ft * s2f( note - 12.0 ) * harmonic );
		float triWave = tri( ft * s2f( note ) * harmonic );
		float wave = mix( sine, triWave, 0.5 );

		o += vec2( wave ) * env / ( harmonic * 0.8 );

	}

	// 音ごとに左右へ振る
	float pan = float( noteIndex ) / 4.0 - 0.5;
	o.x *= 1.0 + pan * 0.3;
	o.y *= 1.0 - pan * 0.3;

	return o * 0.2;

}

vec2 trackSound( Song s ) {

	return rhythmicBass( s.clipBeat, getFrec( s ), 0.0 );

}
