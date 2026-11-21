#include <module:common>
#include <part:frag_h>

uniform vec3 uColor;

in float vLevel;

void main( void ) {

	#include <part:frag_in>

	outColor = vec4( vec3( 0.05 ), 1.0 );
	outEmission = uColor * ( 0.2 + vLevel * 3.0 );

	#include <part:frag_out>

}
