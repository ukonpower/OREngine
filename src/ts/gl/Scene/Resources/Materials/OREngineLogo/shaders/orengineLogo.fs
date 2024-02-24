#include <common>
#include <packing>
#include <frag_h>

in float vNoise;
in vec3 vPosBase;

void main( void ) {

	#include <frag_in>


	float or = step( vPosBase.x, -0.5 );
	
	outEmissionIntensity = 3.0;
	outColor.xyz = vec3( 1.0 );
	outRoughness = 0.3;
	outEmission = vec3( 1.0 ) * (1.0 - vNoise);
	
	#include <frag_out>

}