#include <common>
#include <vert_h>
#include <rotate>

layout (location = 3 ) in vec3 insId;

uniform float uTime;

void main( void ) {

	#include <vert_in>
	
	float t = fract( uTime * 0.2 + insId.y);
	float a = easeInOut( linearstep( 0.0, 0.3, t ) );
	float b = linearstep( 0.7, 0.73, t );
	
	outPos.xy *= rotate( insId.x * HPI + HPI / 2.0 + ( 1.0 - a ) );

	outPos *= a;

	outPos *= step( 0.0, cos( b * PI * 3.0 ) );

	#include <vert_out>

}