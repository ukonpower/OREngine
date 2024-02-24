#include <common>
#include <vert_h>
#include <noise>

uniform float uTime;

out float vNoise;
out vec3 vPosBase;

void main( void ) {

	#include <vert_in>

	// outPos.x += sin( outPos.z  * 10.0 + uTime * 10.0) * 0.1;

	// float n = 1.0;
	// n *= step( noise( floor( outPos * 100.0 * 10.0 ) / 10.0 + uTime * 10.0 ), 0.5 );
	// float n2 = step( noise( floor( outPos * 1.0 ) / 1.0 + vec3( 0.0, 0.0, uTime * 10.0 ) ), 0.6 );
	// float nw = step( noise( floor( outPos * 10.0 ) / 10.0 + vec3( 0.0, 0.0, uTime * 6.0 ) ), 0.2 ) * 2.0;
	// n *= nw;
	// n2 *= nw;
	// outPos.x += n * 0.5;
	// outPos.x += n2 * 0.1;

	vPosBase = outPos;
	// vNoise = n;
	
	#include <vert_out>
	
}