// ノートで鳴らすキック。音高はノートの音高（36 = C2 あたりが低いキック）

#include <module:common>

vec2 noteSound( Note n, float t ) {

	// 頭で周波数を高くし、すぐノートの音高へ落とす。位相は周波数を時間で積分したもの
	float phase = noteFreq( n.pitch ) * t + 6.0 * ( 1.0 - exp( - t * 40.0 ) );

	float o = sin( phase * TPI ) * exp( - t * 8.0 );
	o *= smoothstep( 0.0, 0.002, t );

	return vec2( o * 0.5 );

}
