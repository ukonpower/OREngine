#include <common>
#include <vert_h>
#include <noise_value>

uniform float uTimeE;

out float vNoise;
out vec3 vPosBase;

void main( void ) {

	#include <vert_in>

	vPosBase = outPos;
	vNoise = noiseValue( vec3( uTimeE * 8.0 ) );
	
	#include <vert_out>
	
}