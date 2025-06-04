#include <common>
#include <noise_cyclic>

layout (location = 0) out vec4 outColor;
in vec2 vUv;
uniform float uTimeE;

void main( void ) {

	vec3 n = noiseCyc( vec3( vUv * 3.0, uTimeE * 0.5 ) );
	outColor.xyz = n;

} 