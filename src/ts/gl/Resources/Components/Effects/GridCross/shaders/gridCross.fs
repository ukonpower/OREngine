#include <common>
#include <frag_h>

uniform float uTime;

void main( void ) {

	#include <frag_in>

	outMetalic = 1.0;
	
	#include <frag_out>

}