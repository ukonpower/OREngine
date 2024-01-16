#include <common>
#include <vert_h>


uniform float uTime;
uniform vec2 uRnd;

#include <rotate>

out float vTime;

void main( void ) {

	float t = fract( uTime * 0.2 + uRnd.x);
	float a = easeInOut( linearstep( 0.0, 0.3, t ) );
	float b = linearstep( 0.7, 0.73, t );

	#include <vert_in>

	outPos *= step( 0.0, cos( b * PI * 3.0 ) );
	
	#include <vert_out>

	vTime = a;
	
}