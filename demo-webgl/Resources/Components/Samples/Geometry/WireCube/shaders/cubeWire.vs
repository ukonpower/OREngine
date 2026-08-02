#include <common>
#include <vert_h>

layout (location=3) in vec3 instancePos;
layout (location=4) in vec3 instanceRot;

#include <rotate>

void main( void ) {

	#include <vert_in>

	outPos += instancePos;
	outPos.yz *= rotate( instanceRot.x );
	outPos.xy *= rotate( instanceRot.z );

	#include <vert_out>

}