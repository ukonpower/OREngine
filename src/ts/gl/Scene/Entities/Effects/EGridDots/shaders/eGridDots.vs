#include <common>
#include <vert_h>
#include <noise>

layout (location = 3 ) in vec3 insPos;
layout (location = 4 ) in vec3 insId;

out float vAlpha;

uniform float uTime;

void main( void ) {

	#include <vert_in>

	outPos += insPos;
	
	#include <vert_out>

	vAlpha = noise( insPos * 4.0 + vec3( 0.0, 0.0, uTime + insId.z * 100.0 ) ) * 0.9;
	
}