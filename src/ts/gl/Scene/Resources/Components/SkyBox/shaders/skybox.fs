#include <common>
#include <packing>
#include <frag_h>
#include <noise>

uniform float uTime;

#include <re>

uniform vec3 cameraPosition;
uniform vec2 uResolution;
uniform float uAspectRatio;

void main( void ) {

	#include <frag_in>

	vec3 normal = normalize( - vNormal );
	outRoughness = 1.0;
	outColor *= 0.0;
	outEmission = vec3( 0.0, 0.01, 0.1);

	float n = noise( outPos * 0.05 + uTime * 0.1 );
	float n2 = noise( outPos * 0.04 + vec3( 0.0, 0.0, uTime * 0.2 + n ) );

	outEmission += smoothstep( 0.7, 1.0, fract( n2 * 4.5 ) ) * random( vPos.xy ) * 0.5;
	outEmissionIntensity = 1.0;
	outEnv = 0.0;

	// discard;
	
	#include <frag_out>

} 