#include <module:common>
#include <part:vert_h>
#include <module:noise_value>

out float vNoise;
out vec3 vPosBase;

void main( void ) {

	#include <part:vert_in>

	vPosBase = outPos;
	vNoise = noiseValue( vec3( uTimeE * 8.0 ) );

	#include <part:vert_out>

}