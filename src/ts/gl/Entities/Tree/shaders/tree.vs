#include <common>
#include <vert_h>
#include <rotate>

uniform float uTime;

void main( void ) {

	#include <vert_in>

	outPos = position;
	
	#include <vert_out>
	
}