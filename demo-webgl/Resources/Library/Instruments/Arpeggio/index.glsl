// osc Demo4 の曲のキラキラしたアルペジオ。
// 帯はまだ曲全体に1つなので、どのセクションで鳴らすかもこの中で決める（セクションの拍は Demo4 の music() と同じ）

#include <module:common>

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

float ssin( float time ) {

	return sin( time * TPI );

}

// 音の位相に使う時刻。セクションの頭（m 小節目）から 8 拍ごとに巻き戻す（Demo4 の getFrec）
float getFrec( float t, float m, vec4 b8, float beatSec ) {

	return t - ( m * 16.0 + max( 0.0, b8.y - m * 2.0 ) * 8.0 ) * beatSec;

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

vec2 trackSound( Song s ) {

	float t = s.time;

	// 曲の頭の4拍は鳴らさない
	float mt = max( 0.0, s.beat - 4.0 );

	vec4 beat4 = beat( mt, 4.0 );
	vec4 beat8 = beat( mt, 8.0 );
	vec4 beat16 = beat( mt, 16.0 );

	vec2 o = vec2( 0.0 );

	// A: Intro（拍 0〜16）
	if ( isin( beat16.y, 0.0, 1.0 ) ) {

		float ft = getFrec( t, 0.0, beat8, s.beatSec );
		o += arpeggio( mt, ft, 0.0 );

	}

	// B: Intro Buildup（拍 16〜32）
	if ( isin( beat16.y, 1.0, 2.0 ) ) {

		float ft = getFrec( t, 1.0, beat8, s.beatSec );
		o += arpeggio( mt, ft, 0.0 );
		o += arpeggio( mt, ft, 12.0 ) * 0.5;

	}

	// C: Transition（拍 32〜36）。前半2拍だけ鳴らす
	if ( isin( beat4.y, 8.0, 9.0 ) ) {

		float ft = getFrec( t - 16.0, 0.0, beat8, s.beatSec );
		o += arpeggio( mt, ft, - 12.0 ) * step( beat8.x, 2.0 );

	}

	// D: Main Drop 1（拍 36〜100）
	mt -= 36.0;
	beat8 = beat( mt, 8.0 );
	beat16 = beat( mt, 16.0 );

	if ( isin( beat16.y, 0.0, 4.0 ) ) {

		float ft = getFrec( t, 0.0, beat8, s.beatSec );
		vec2 sum = arpeggio( mt, ft, 0.0 );

		if ( beat16.y >= 1.0 ) {

			sum += arpeggio( mt, ft, 12.0 ) * 0.5;

		}

		o += sum * smoothstep( 4.0, 3.98, beat16.w );

	}

	// E: Bridge（拍 101〜149）
	mt -= 65.0;
	beat8 = beat( mt, 8.0 );
	beat16 = beat( mt, 16.0 );

	// E-2: Buildup（拍 117〜149）
	if ( isin( beat16.y, 1.0, 3.0 ) ) {

		float ft = getFrec( t, 6.0, beat8, s.beatSec );
		vec2 sum = arpeggio( mt, ft, - 12.0 ) * 0.8;
		sum += arpeggio( mt, ft, 12.0 ) * 0.6;

		o += sum * smoothstep( 2.75, 2.740, beat16.w );

	}

	// F: Main Drop 2（拍 149〜229）
	mt -= 48.0;
	beat8 = beat( mt, 8.0 );
	beat16 = beat( mt, 16.0 );

	// F-1: Climax（拍 149〜197）
	if ( isin( beat16.y, 0.0, 3.0 ) ) {

		float ft = getFrec( t, 0.0, beat8, s.beatSec );
		o += arpeggio( mt, ft, 12.0 ) * 0.6;

	}

	return o;

}
