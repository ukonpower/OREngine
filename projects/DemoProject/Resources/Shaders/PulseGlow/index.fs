#include <common>
#include <packing>
#include <frag_h>

void main( void ) {

	#include <frag_in>

	float t = uTimeE;

	// 高速パルスで明滅するエミッション
	float pulse = pow( sin( t * 8.0 ) * 0.5 + 0.5, 4.0 );
	float slowPulse = sin( t * 1.5 ) * 0.5 + 0.5;

	// ホットなマグマ風カラー
	vec3 hotColor = mix( vec3( 1.0, 0.1, 0.0 ), vec3( 1.0, 0.8, 0.0 ), slowPulse );
	vec3 coreColor = vec3( 1.0, 1.0, 0.9 );

	// スキャンライン
	float scan = pow( fract( outPos.y * 6.0 - t * 2.0 ), 10.0 );

	float emitPower = 2.0 + pulse * 8.0 + scan * 12.0;
	outColor = vec4( mix( hotColor, coreColor, pulse * 0.5 ), 1.0 );
	outEmission = outColor.rgb * emitPower;

	outRoughness = 0.1;
	outMetallic = 0.8;

	#include <frag_out>

}
