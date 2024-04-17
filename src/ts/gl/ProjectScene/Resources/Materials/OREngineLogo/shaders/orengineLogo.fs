#include <common>
#include <packing>
#include <frag_h>

in float vNoise;
in vec3 vPosBase;

void main( void ) {

	#include <frag_in>

	float or = step( vPosBase.x, -0.2 );
	float flash = smoothstep(0.3, 0.0,  vNoise) * or;
	
	outEmissionIntensity = (1.0 - flash * 0.7) * 3.0;
	outColor.xyz = vec3( 1.0 - flash );
	outRoughness = 0.3;
	outEmission = vec3( 1.0 );
	
	#include <frag_out>

}