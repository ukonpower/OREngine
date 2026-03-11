#include <common>
#include <frag_h>

uniform float uTime;

void main( void ) {

	#include <frag_in>

	outEmission += 0.35;
	outColor.w *= 0.2;
	
	#include <frag_out>

}