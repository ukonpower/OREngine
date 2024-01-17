#include <common>
#include <vert_h>

layout ( location = 3 ) in float size;

uniform float uTime;
uniform vec3 uRange;
out float vAlpha;

void main( void ) {

	#include <vert_in>

	outPos += uRange / 2.0;
	outPos.y = mod( outPos.y + sin( uTime  * 0.2 + outPos.x + outPos.z ) * 0.5, uRange.y );
	outPos.x = mod( outPos.x + sin( uTime  * 0.2 + outPos.z + outPos.z ) * 0.5, uRange.x );
	outPos -= uRange / 2.0;
	
	#include <vert_out>

	gl_PointSize = 0.5 + size * 5.0;
	
}