#include <module:common>
#include <part:vert_h>

in vec4 oPos;
out vec4 vOPos;
out float vT;

void main( void ) {

	#include <part:vert_in>

	vT = fract( uTimeE * 0.5 + oPos.w );

	outPos.xz *= 1.0 + exp( vT * -8.0 ) * 20.0;
	outPos.xyz += oPos.xyz;

	#include <part:vert_out>
	
	vOPos = oPos;

}