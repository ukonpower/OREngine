#include <common>
#include <packing>
#include <frag_h>

uniform float uTime;

in float vAlpha;

void main( void ) {

	#ifdef IS_DASH

		if( sin( vUv.y * 70.0 ) < 0.0 ) discard;
	
	#endif

	if( vAlpha < 0.5 ) discard;

	#include <frag_in>

	outEmission = vec3( 0.2 );

	#include <frag_out>

} 