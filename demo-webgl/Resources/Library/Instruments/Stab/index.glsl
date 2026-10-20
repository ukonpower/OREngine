// osc Demo4 の曲の16分音符で刻むシンセスタブ（Climax 用）。
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

vec2 stab( float mt, float ft, float pitch ) {

	vec2 o = vec2( 0.0 );

	vec4 b32 = beat( mt, 32.0 );

	// 16分音符。非常に速いアタックと素早い減衰
	float envTime = fract( mt * 4.0 );
	float env = exp( - envTime * 30.0 );
	env *= smoothstep( 0.0, 0.001, envTime );

	// 頭で急に上がって、すぐ元に戻るピッチベンド
	float pitchBend = 0.0;

	if ( envTime < 0.08 ) {

		pitchBend = 7.0 * ( envTime / 0.08 );

	} else {

		pitchBend = 7.0 * exp( - ( envTime - 0.08 ) * 20.0 );

	}

	// 上下に動くメロディ
	int noteIndex = int( mod( floor( mt * 4.0 ), 8.0 ) );
	int pattern[ 8 ] = int[]( 0, 4, 7, 4, 0, - 3, 0, 4 );

	int chordIndex = int( b32.x / 4.0 ) % 8;
	float scale = baseLine[ chordIndex ];

	float note = scale + float( pattern[ noteIndex ] ) + pitch + pitchBend;

	// 根音の配列の 0 番目と 4 番目は短三和音、ほかは長三和音
	int chord[ 3 ] = int[]( 0, 4, 7 );

	if ( chordIndex == 0 || chordIndex == 4 ) {

		chord[ 1 ] = 3;

	}

	for ( int i = 0; i < 3; i ++ ) {

		float chordNote = note + float( chord[ i ] );

		for ( int j = 0; j < 2; j ++ ) {

			float detune = float( j ) * 0.004;
			float phase = float( j ) * 0.1;

			// サイン波とのこぎり波を混ぜ、クリップして歪ませる
			float sine = ssin( ft * s2f( chordNote ) * ( 1.0 + detune ) + phase );
			float sawWave = saw( ft * s2f( chordNote ) * ( 1.0 + detune ) );

			float wave = mix( sine, sawWave, 0.4 );
			wave = clamp( wave * 1.5, - 0.7, 0.7 );

			o += vec2( wave ) * env / float( i + 1 );

		}

	}

	// パルス幅変調のような揺れ
	float pwmMod = sin( ft * 3.0 ) * 0.5 + 0.5;
	o *= 0.8 + pwmMod * 0.2;

	// 音ごとに左右へ細かく振る
	float pan = float( noteIndex ) / 4.0 - 1.0;
	o.x *= 1.0 + pan * 0.6;
	o.y *= 1.0 - pan * 0.6;

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
		o += stab( mt, ft, 0.0 ) * 0.5;

	}

	return o;

}
