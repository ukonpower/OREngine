#include <common>
#include <uni_time>
#include <frag_h>

in vec4 vOPos;
in float vT;

void main( void ) {

	#include <frag_in>

	float emit = exp( vT * -8.0);

	outColor = vec4( vec3( emit * 50.0 ), emit );
	
	#include <frag_out>

}