#include <common>
#include <vert_h>

out float vAlpha;

uniform float uTime;

void main( void ) {

	#include <vert_in>

	float aspect = modelMatrix[0][0] / modelMatrix[1][1];

	if( aspect < 1.0 ) {

		outUv.x *= aspect;

	} else {

		outUv.y /= aspect;

	}


	#include <vert_out>
	
}