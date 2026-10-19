#include <module:common>
#include <part:frag_h>

uniform vec3 uColor;
uniform float uRoughness;
uniform float uMetallic;
uniform float uEmission;
uniform float uSSS;

void main( void ) {

	#include <part:frag_in>

	outColor = vec4( uColor, 1.0 );
	outRoughness = uRoughness;
	outMetallic = uMetallic;
	outEmission = uColor * uEmission;
	outSSS = uSSS;

	#include <part:frag_out>

}
