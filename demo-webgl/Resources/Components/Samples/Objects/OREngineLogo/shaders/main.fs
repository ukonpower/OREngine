#include <module:common>
#include <part:frag_h>

in float vNoise;
in vec3 vPosBase;

void main( void ) {

	#include <part:frag_in>

	float or = step( vPosBase.x, -0.2 );
	float flash = smoothstep(0.3, 0.0,  vNoise) * or;

	outEmission = vec3( (1.0 - flash * 0.7) * 3.0 );
	outRoughness = 0.3;

	#include <part:frag_out>

}