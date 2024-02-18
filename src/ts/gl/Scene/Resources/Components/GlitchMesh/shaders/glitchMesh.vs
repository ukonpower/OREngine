#include <common>
#include <vert_h>

uniform float uTime;

void main( void ) {

	#include <vert_in>

	outPos.x += sin( outPos.y  * 100.0 + uTime * 2.0);
	
	#include <vert_out>
	
}