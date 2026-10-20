// 帯ごとに根音を変えて鳴らす長三和音。帯の数値: x = 音量、y = 根音（C3 から半音いくつ上か）

// 左右で少しずらしたのこぎり波2本
vec2 voice( float time, float pitch ) {

	float freq = noteFreq( pitch );

	return vec2( saw( time * freq * 1.003 ), saw( time * freq * 0.997 ) );

}

vec2 trackSound( Song s ) {

	float root = 48.0 + s.clipParam.y;

	// 帯の頭で鳴らし直し、帯の中でゆっくり減る
	float t = s.clipBeat * s.beatSec;
	float env = exp( - t * 1.2 ) * smoothstep( 0.0, 0.02, t );

	vec2 o = voice( s.time, root );
	o += voice( s.time, root + 4.0 );
	o += voice( s.time, root + 7.0 );

	return o * env * s.clipParam.x * 0.06;

}
