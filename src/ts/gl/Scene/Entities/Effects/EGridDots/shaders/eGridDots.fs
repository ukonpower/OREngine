#include <common>
#include <packing>
#include <frag_h>

in float vAlpha;

void main( void ) {

	#ifdef IS_CIRCLR

		if( length( vUv - 0.5 ) > 0.5 ) discard;
	
	#endif

	if( vAlpha < 0.5 ) discard;

	#include <frag_in>

	outEmission = vec3( 1.0 );

	#include <frag_out>

} 