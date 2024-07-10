#include <common>
#include <frag_h>

uniform float uTimeE;

void main( void ) {

	#include <frag_in>

	if( sin( vUv.y * 250.0 + uTimeE * 5.0 ) > 0.0) discard;
	
	#include <frag_out>

}