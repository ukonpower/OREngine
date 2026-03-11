#include <common>
#include <rotate>
#include <vert_h>

layout (location=3) in vec3 instancePos;
layout (location=4) in vec3 instanceRot;

void main( void ) {

	#include <vert_in>

	outPos.xz *= 0.25;
	outPos.yz *= rotate( instanceRot.x );
	outPos.xy *= rotate( instanceRot.z );

	outPos += instancePos * vec3(15.0, 10.0, 15.0 );


	#include <vert_out>

}