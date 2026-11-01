// osc Demo4 の曲のキック。セクションごとに3種類を使い分ける。
// どのセクションで鳴らすかは music シーンの帯で決め、セクションごとの鳴り方の違いは帯の数値で受ける

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

float deepKick( float et, float ft ) {

	float envTime = fract( et );

	float t = ft;
	t -= 0.05 * exp( - 100.0 * envTime );

	float o = sin( t * s2f( 5.0 ) ) * exp( - 20.0 * envTime );
	o *= smoothstep( 0.0, 0.0005, envTime );
	o *= 0.3;

	return o;

}

float lightKick( float et, float ft ) {

	float envTime = fract( et );

	float t = ft;
	t -= 0.06 * exp( - 100.0 * envTime );

	float o = sin( t * s2f( 2.0 ) ) * exp( - 50.0 * envTime );
	o *= smoothstep( 0.0, 0.0005, envTime );
	o *= 0.3;

	return o;

}

// 低音・中音・アタックを重ねた重いキック
float hardKick( float et, float ft ) {

	float envTime = fract( et );

	float t = ft;
	t -= 0.08 * exp( - 100.0 * envTime );

	float o = sin( t * s2f( 5.0 ) ) * exp( - 30.0 * envTime );
	o += sin( t * s2f( 8.0 ) ) * exp( - 45.0 * envTime ) * 0.5;
	o += sin( t * s2f( 12.0 ) ) * exp( - 60.0 * envTime ) * 0.25;

	o *= smoothstep( 0.0, 0.008, envTime );
	o *= 0.25;

	return o;

}

vec2 kick1( float mt, float ft ) {

	vec2 o = vec2( 0.0 );

	vec4 b4 = beat( mt, 4.0 );
	vec4 b8 = beat( mt, 8.0 );

	for ( int i = 0; i < 3; i ++ ) {

		float l = b4.z - float( i ) / ( 16.0 / 3.0 );

		if ( i != 2 || b8.z > 0.5 ) {

			o += deepKick( l, ft );

		}

	}

	return o * 1.15;

}

vec2 kick2( float mt, float ft ) {

	vec2 o = vec2( 0.0 );

	vec4 b4 = beat( mt, 4.0 );
	vec4 b8 = beat( mt, 8.0 );

	for ( int i = 0; i < 6; i ++ ) {

		float l = b4.z - float( i ) / ( 16.0 / 3.0 );

		if ( i != 2 || b8.z > 0.5 ) {

			o += lightKick( l, ft );

		}

	}

	return o * 1.15;

}

// 16分音符でランダムに刻む。4つごとの頭は必ず鳴らす
vec2 kick3( float mt, float ft ) {

	vec2 o = vec2( 0.0 );

	vec4 b2 = beat( mt, 2.0 );

	for ( int i = 0; i < 16; i ++ ) {

		float l = b2.z - float( i ) / 16.0;
		float rand = whiteNoise( b2.y * 100.0 + float( i ) );

		if ( i % 4 == 0 ) {

			o += hardKick( l, ft );

		} else if ( rand > 0.35 ) {

			o += hardKick( l, ft ) * ( 0.6 + rand * 0.4 );

		}

	}

	return o * 0.85;

}

// 帯の数値: x = kick1（Intro Buildup）、y = kick2（Main Drop 1）、z = kick3（Climax）の音量
vec2 trackSound( Song s ) {

	float ft = getFrec( s );

	vec2 o = vec2( 0.0 );

	if ( s.clipParam.x > 0.0 ) {

		o += kick1( s.clipBeat, ft ) * s.clipParam.x;

	}

	if ( s.clipParam.y > 0.0 ) {

		o += kick2( s.clipBeat, ft ) * s.clipParam.y;

	}

	if ( s.clipParam.z > 0.0 ) {

		o += kick3( s.clipBeat, ft ) * s.clipParam.z;

	}

	return o;

}
