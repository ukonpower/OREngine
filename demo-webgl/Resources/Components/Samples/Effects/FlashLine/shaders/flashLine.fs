#include <module:common>
#include <part:frag_h>

in vec4 vOPos;
in float vT;

void main( void ) {

	#include <part:frag_in>

	float emit = exp( vT * -8.0);

	outColor = vec4( vec3( emit * 50.0 ), emit );

	if( emit < 0.03 ) {

		discard;

	}
	
	#include <part:frag_out>

}