#include <common>
#include <frag_h>

void main( void ) {

	#include <frag_in>

	outColor = vec4( vec3(0.8, 0.3, 0.3), 1.0 );
	
	#include <frag_out>

}