#include <common>

#include <packing>
#include <frag_h>

uniform sampler2D uTex;
uniform vec4 uState;


void main( void ) {


	vec3 col = vec3(1.0);

	if( sin( vUv.x * 20.0 + vUv.y * 3.0 ) > 0.1 ) {
		discard;
	}

	outColor0 = vec4( col, 0.5 );
	
} 

