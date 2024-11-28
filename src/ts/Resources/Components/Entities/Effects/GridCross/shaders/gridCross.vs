#include <common>
#include <rotate>
#include <vert_h>

layout (location=3) in vec3 instancePos;
layout (location=4) in vec3 instanceRot;

void main( void ) {

	#include <vert_in>

	outPos *= 0.5;
	outPos.yz *= rotate( instanceRot.x );
	outPos.xy *= rotate( instanceRot.z );
	
	outPos += instancePos;

	#include <vert_out>

}