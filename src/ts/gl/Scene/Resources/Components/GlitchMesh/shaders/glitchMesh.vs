#include <common>
#include <vert_h>

uniform float uTime;

void main( void ) {

	#include <vert_in>

	outPos.x += sin( outPos.z  * 10.0 + uTime * 10.0) * 0.1;
	
	#include <vert_out>
	
}