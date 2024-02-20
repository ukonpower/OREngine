#include <common>
#include <vert_h>
#include <noise>

uniform float uTime;

out float vNoise;

void main( void ) {

	#include <vert_in>

	// outPos.x += sin( outPos.z  * 10.0 + uTime * 10.0) * 0.1;

	float n = 1.0;
	n *= step( noise( floor( outPos * 100.0 * 10.0 ) / 10.0 + uTime * 10.0 ), 0.5 );
	n *= step( noise( floor( outPos * 1.0 * 10.0 ) / 10.0 + vec3( 0.0, 0.0, uTime * 3.0 ) ), 0.2 ) * 2.0;

	// outPos *= 1.0 + n;

	vNoise = n;
	
	#include <vert_out>
	
}