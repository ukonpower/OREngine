// osc Demo4 の曲のスネア。
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

vec2 trackSound( Song s ) {

	float t = s.time;

	// 曲の頭の4拍は鳴らさない
	float mt = max( 0.0, s.beat - 4.0 );

	vec4 beat4 = beat( mt, 4.0 );
	vec4 beat8 = beat( mt, 8.0 );
	vec4 beat16 = beat( mt, 16.0 );

	vec2 o = vec2( 0.0 );

	// C: Transition（拍 32〜36）。後半2拍だけ鳴らす
	if ( isin( beat4.y, 8.0, 9.0 ) ) {

		float ft = getFrec( t - 16.0, 0.0, beat8, s.beatSec );
		o += snare2( mt, ft ) * 0.8 * ( 1.0 - step( beat8.x, 2.0 ) );

	}

	// D: Main Drop 1（拍 36〜100）
	mt -= 36.0;
	beat8 = beat( mt, 8.0 );
	beat16 = beat( mt, 16.0 );

	if ( isin( beat16.y, 0.0, 4.0 ) ) {

		float ft = getFrec( t, 0.0, beat8, s.beatSec );
		o += snare2( mt, ft ) * 0.8 * smoothstep( 4.0, 3.98, beat16.w );

	}

	// E: Bridge（拍 101〜149）
	mt -= 65.0;
	beat8 = beat( mt, 8.0 );
	beat16 = beat( mt, 16.0 );

	// E-2: Buildup（拍 117〜149）
	if ( isin( beat16.y, 1.0, 3.0 ) ) {

		float ft = getFrec( t, 6.0, beat8, s.beatSec );
		o += snare2( mt, ft ) * 0.5 * smoothstep( 2.75, 2.740, beat16.w );

	}

	// F: Main Drop 2（拍 149〜229）
	mt -= 48.0;
	beat8 = beat( mt, 8.0 );
	beat16 = beat( mt, 16.0 );

	// F-1: Climax（拍 149〜197）
	if ( isin( beat16.y, 0.0, 3.0 ) ) {

		float ft = getFrec( t, 0.0, beat8, s.beatSec );
		o += snare3( mt, ft );

	}

	return o;

}
