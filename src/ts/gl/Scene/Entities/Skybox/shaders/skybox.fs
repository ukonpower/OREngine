#include <common>
#include <packing>
#include <frag_h>

#include <re>

uniform vec3 cameraPosition;
uniform vec2 uResolution;
uniform float uAspectRatio;


void main( void ) {

	#include <frag_in>

	// outColor += dot( vNormal, vec3( 0.0, 1.0, 0.0 ) );
	vec3 normal = normalize( - vNormal );
	// outEmission.xyz += smoothstep( 0.0, 1.0, dot( normal, vec3( 0.0, -1.0, 0.0 ) ) );
	outRoughness = 1.0;
	outColor *= 0.0;
	// outEmission = vec3( 1.0 );
	outEnv = 0.0;

	// discard;
	
	#include <frag_out>

} 