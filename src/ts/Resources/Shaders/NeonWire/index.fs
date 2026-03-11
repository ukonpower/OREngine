#include <common>
#include <packing>
#include <frag_h>

void main( void ) {

	#include <frag_in>

	float t = uTimeE;

	// サイバーネオンカラー
	vec3 neonCyan = vec3( 0.0, 1.0, 0.9 );
	vec3 neonPink = vec3( 1.0, 0.0, 0.6 );
	vec3 neonPurple = vec3( 0.5, 0.0, 1.0 );

	// グリッドパターン
	float gridX = step( 0.95, fract( outPos.x * 4.0 + t * 0.5 ) );
	float gridZ = step( 0.95, fract( outPos.z * 4.0 - t * 0.3 ) );
	float gridY = step( 0.95, fract( outPos.y * 4.0 + t * 0.7 ) );
	float grid = max( max( gridX, gridZ ), gridY );

	// エッジグロー（法線ベースフレネル）
	float rim = 1.0 - abs( dot( normalize( outNormal ), vec3( 0.0, 0.0, 1.0 ) ) );
	rim = pow( rim, 2.0 );

	// カラーサイクル
	float cycle = fract( t * 0.3 );
	vec3 color = mix( neonCyan, neonPink, step( 0.33, cycle ) );
	color = mix( color, neonPurple, step( 0.66, cycle ) );

	float emitPower = grid * 15.0 + rim * 6.0 + 0.5;
	outColor = vec4( color, 1.0 );
	outEmission = color * emitPower;

	outRoughness = 0.05;
	outMetallic = 1.0;

	#include <frag_out>

}
