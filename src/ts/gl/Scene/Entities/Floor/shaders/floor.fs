#include <common>
#include <packing>
#include <frag_h>
#include <rotate>

uniform sampler2D uTex;

void main( void ) {

	#include <frag_in>

	vec2 v = vUv * rotate( PI / 5.0 );

	vec4 n = texture( uTex, v * 3.0 );
	vec4 n2 = texture( uTex, v * 10.0 );

	outColor.xyz = vec3( 0.1 ) + n.y * 0.1;
	outRoughness = 0.2 +  n2.x * n2.x * 0.5;
	outNormal = normalize( outNormal + n2.xyz * 0.05 );
	
	#include <frag_out>

} 