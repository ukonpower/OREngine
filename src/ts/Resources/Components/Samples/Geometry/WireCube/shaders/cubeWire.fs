#include <common>
#include <frag_h>

void main( void ) {

	#include <frag_in>

	if( sin( vUv.y * 120.0 + uTimeE * 5.0 ) > 0.0 ) discard;
	
	outColor = vec4( 1.0 );
	outEmission += vec3( 10.0 );
	
	#include <frag_out>

}