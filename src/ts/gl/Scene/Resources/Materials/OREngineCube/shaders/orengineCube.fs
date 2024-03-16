#include <common>
#include <packing>
#include <frag_h>

uniform sampler2D uNoiseTex;

in float vNoise;
in vec3 vPosBase;

void main( void ) {

	#include <frag_in>

	outEmissionIntensity = 3.0;

	vec4 noise = texture( uNoiseTex, vUv * 1.4 );

	outColor = vec4( 1.0 );
	outMetalic = 1.0;
	// outRoughness = smoothstep( 0.3, 0.6, noise.x );
	outRoughness = 0.9;

	#include <frag_out>

}