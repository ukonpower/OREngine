#include <module:common>
#include <part:frag_h>

in vec3 vColor;

void main( void ) {

	#include <part:frag_in>

	outColor = vec4( vColor, 1.0 );
	outRoughness = 0.4;

	#include <part:frag_out>

}
