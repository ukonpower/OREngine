#include <module:common>
#include <part:vert_h>

layout (location=3) in vec3 instancePos;
layout (location=4) in vec3 instanceRot;

#include <module:rotate>

void main( void ) {

	#include <part:vert_in>

	outPos += instancePos;
	outPos.yz *= rotate( instanceRot.x );
	outPos.xy *= rotate( instanceRot.z );

	#include <part:vert_out>

}