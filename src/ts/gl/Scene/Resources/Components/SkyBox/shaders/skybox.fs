#include <common>
#include <packing>
#include <frag_h>

#include <re>

uniform vec3 cameraPosition;
uniform vec2 uResolution;
uniform float uAspectRatio;


void main( void ) {

	#include <frag_in>

	vec3 normal = normalize( - vNormal );
	outRoughness = 1.0;
	outColor *= 0.0;
	outEmission = vec3( 0.0, 0.05, 0.1 );
	outEmissionIntensity = 0.5;
	outEnv = 0.0;

	// discard;
	
	#include <frag_out>

} 