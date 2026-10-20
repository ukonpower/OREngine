// osc Demo4 の曲のハイハット。
// 帯はまだ曲全体に1つなので、どのセクションで鳴らすかもこの中で決める（セクションの拍は Demo4 の music() と同じ）

#include <module:noise_value>

/*-------------------------------
	Demo4 の曲の共通部品（各楽器の .glsl に同じものを置く）
-------------------------------*/

// 拍の情報。x: 拍の中の経過（0〜beat）、y: 何個目か、z: 拍の中の進み（0〜1）、w: 頭からの数（小数）
vec4 beat( float time, float beat ) {

	float b = mod( time, beat );

	return vec4( b, floor( time / beat ), b / beat, time / beat );

}

bool isin( float time, float start, float end ) {

	return start <= time && time < end;

}

// Demo4 の音高。0 が 440Hz で、1つ上がるごとに 1.06 倍（平均律の noteFreq とは少しずれるので、Demo4 の音のまま残す）
float s2f( float scale ) {

	return 440.0 * pow( 1.06, scale );

}

// 音の位相に使う時刻。セクションの頭（m 小節目）から 8 拍ごとに巻き戻す（Demo4 の getFrec）
float getFrec( float t, float m, vec4 b8, float beatSec ) {

	return t - ( m * 16.0 + max( 0.0, b8.y - m * 2.0 ) * 8.0 ) * beatSec;

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

vec2 trackSound( Song s ) {

	float t = s.time;

	// 曲の頭の4拍は鳴らさない
	float mt = max( 0.0, s.beat - 4.0 );

	vec4 beat4 = beat( mt, 4.0 );
	vec4 beat8 = beat( mt, 8.0 );
	vec4 beat16 = beat( mt, 16.0 );

	vec2 o = vec2( 0.0 );

	// D: Main Drop 1（拍 36〜100）
	mt -= 36.0;
	beat8 = beat( mt, 8.0 );
	beat16 = beat( mt, 16.0 );

	// E: Bridge（拍 101〜149）
	mt -= 65.0;
	beat8 = beat( mt, 8.0 );
	beat16 = beat( mt, 16.0 );

	// E-2: Buildup（拍 117〜149）
	if ( isin( beat16.y, 1.0, 3.0 ) ) {

		o += hihat1( mt ) * 0.8 * smoothstep( 2.75, 2.740, beat16.w );

	}

	// F: Main Drop 2（拍 149〜229）
	mt -= 48.0;
	beat8 = beat( mt, 8.0 );
	beat16 = beat( mt, 16.0 );

	// F-1: Climax（拍 149〜197）
	if ( isin( beat16.y, 0.0, 3.0 ) ) {

		o += hihat1( mt );

	}

	return o;

}
