#include <common>
#include <packing>
#include <frag_h>
#include <re>

uniform vec2 uResolution;
uniform float uAspectRatio;

in vec4 vGPUVel;
in vec4 vGPUPos;

void main( void ) {

	#include <frag_in>

	outColor = vec4( vec3( 1.0 ), 1.0 );

	outRoughness = 0.05;

	#include <frag_out>

} 