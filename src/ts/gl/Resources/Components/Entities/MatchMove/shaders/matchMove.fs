#include <common>
#include <frag_h>

in float vAlpha;

void main( void ) {

	#include <frag_in>

	outColor = vec4( vec3(5.0), vAlpha );
	
	#include <frag_out>

}