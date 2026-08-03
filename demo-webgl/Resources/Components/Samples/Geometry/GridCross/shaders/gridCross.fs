#include <module:common>
#include <part:frag_h>

void main( void ) {

	#include <part:frag_in>

	outEmission += 0.35;
	outColor.w *= 0.2;
	
	#include <part:frag_out>

}