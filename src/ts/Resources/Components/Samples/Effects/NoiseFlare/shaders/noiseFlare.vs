#include <common>
#include <vert_h>

void main( void ) {

	#include <vert_in>
	#include <vert_out>

	gl_Position = vec4( position.xy, 0.01, 1.0 );

}