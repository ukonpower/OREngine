#include <module:common>
#include <part:vert_h>

out float vAlpha;

uniform vec2 uDeferredResolution;

void main( void ) {

	#include <part:vert_in>

	float t = uTimeE * 0.1;
	outPos.x += sin( position.y * 2.3 + t * 2.0 ) * 0.4;
	outPos.y += sin( position.x * 1.0 + t * 1.0 ) * 0.3;
	
	#include <part:vert_out>

	vAlpha = smoothstep( -20.0, -1.0, mvPosition.z);
	gl_PointSize = uDeferredResolution.y * 0.007 + uDeferredResolution.y * 0.02 * vAlpha;
	gl_PointSize *= 0.5;

}