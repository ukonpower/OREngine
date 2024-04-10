#include <common>
#include <vert_h>
#include <noise>

uniform float uTime;

out float vNoise;
out vec3 vPosBase;

void main( void ) {

	#include <vert_in>

	vPosBase = outPos;
	vNoise = noise( vec3( uTime * 8.0 ) );
	
	#include <vert_out>
	
}