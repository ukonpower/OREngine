#include <common>
#include <frag_h>

#include <noise_cyclic>

uniform float uTimeE;
uniform sampler2D uNoiseTex;

void main( void ) {

	#include <frag_in>

	vec4 n = texture( uNoiseTex, vUv * 0.1 );
	
	outColor.xyz = vec3( n.x ) * 0.3;

	#include <frag_out>

}