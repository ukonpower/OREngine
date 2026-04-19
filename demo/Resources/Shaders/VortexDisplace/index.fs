#include <common>
#include <packing>
#include <frag_h>

vec3 hue2rgb( float h ) {

	h = fract( h );
	float r = abs( h * 6.0 - 3.0 ) - 1.0;
	float g = 2.0 - abs( h * 6.0 - 2.0 );
	float b = 2.0 - abs( h * 6.0 - 4.0 );
	return clamp( vec3( r, g, b ), 0.0, 1.0 );

}

void main( void ) {

	#include <frag_in>

	float t = uTimeE;

	// 渦巻き虹色
	float angle = atan( outPos.z, outPos.x );
	float dist = length( outPos.xz );
	float hue = fract( angle / 6.28318 + dist * 0.5 - t * 0.5 );
	vec3 color = hue2rgb( hue );

	// パルス
	float pulse = pow( sin( dist * 8.0 - t * 6.0 ) * 0.5 + 0.5, 3.0 );

	float emitPower = 3.0 + pulse * 10.0;
	outColor = vec4( color, 1.0 );
	outEmission = color * emitPower;

	outRoughness = 0.15;
	outMetallic = 0.7;

	#include <frag_out>

}
