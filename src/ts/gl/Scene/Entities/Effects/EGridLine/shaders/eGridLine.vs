#include <common>
#include <vert_h>
#include <noise>
#include <rotate>

layout (location = 3 ) in vec3 insPos;
layout (location = 4 ) in vec3 insId;

out float vAlpha;

uniform float uTime;

void main( void ) {

	#include <vert_in>

	outPos.y *= insId.z;
	outPos.x *= 0.01;

	outPos.xy *= rotate( insId.x * HPI );

	outPos += insPos;

	#include <vert_out>

	vAlpha = 1.0;
	
}