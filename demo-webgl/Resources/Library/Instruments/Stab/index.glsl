// osc Demo4 の曲の16分音符で刻むシンセスタブ（Climax 用）。
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

	return stab( s.clipBeat, getFrec( s ), 0.0 ) * 0.5;

}
