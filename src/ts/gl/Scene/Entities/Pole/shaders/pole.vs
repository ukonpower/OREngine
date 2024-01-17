#include <common>
#include <vert_h>
#include <rotate>

#ifdef ASHIBA

	layout ( location = 3 ) in vec3 oPos;

#endif

void main( void ) {

	#include <vert_in>
	
	#ifdef ASHIBA

		outPos.xy *= rotate( HPI );
		outPos += oPos;
	
	#endif

	#include <vert_out>
	
}