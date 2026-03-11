#include <common>
#include <packing>
#include <frag_h>

void main( void ) {

	#include <frag_in>

	float t = uTimeE;

	// 上方向にスキャンするクロマラインパターン
	float scanUp = pow( fract( outPos.y * 3.0 - t * 1.2 ), 12.0 );
	float scanDown = pow( fract( - outPos.y * 5.0 - t * 2.0 ), 8.0 );

	// 青〜紫のクールなカラー
	vec3 blue = vec3( 0.1, 0.3, 1.0 );
	vec3 purple = vec3( 0.6, 0.1, 1.0 );
	vec3 white = vec3( 1.0, 1.0, 1.0 );

	float blend = sin( outPos.y * 2.0 + t ) * 0.5 + 0.5;
	vec3 color = mix( blue, purple, blend );

	float emitPower = 1.5 + scanUp * 15.0 + scanDown * 8.0;
	outColor = vec4( mix( color, white, scanUp * 0.5 ), 1.0 );
	outEmission = outColor.rgb * emitPower;

	outRoughness = 0.08;
	outMetallic = 0.9;

	#include <frag_out>

}
