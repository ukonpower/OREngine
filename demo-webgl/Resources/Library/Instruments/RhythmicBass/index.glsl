// osc Demo4 の曲の16分音符で刻むベース（Climax 用）。
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

	// F: Main Drop 2（拍 149〜229）
	mt -= 48.0;
	beat8 = beat( mt, 8.0 );
	beat16 = beat( mt, 16.0 );

	// F-1: Climax（拍 149〜197）
	if ( isin( beat16.y, 0.0, 3.0 ) ) {

		float ft = getFrec( t, 0.0, beat8, s.beatSec );
		o += rhythmicBass( mt, ft, 0.0 );

	}

	return o;

}
