#include <common>
#include <packing>
#include <frag_h>

uniform sampler2D uNoiseTex;

in float vNoise;
in vec3 vPosBase;

void main( void ) {

	#include <frag_in>

	outEmissionIntensity = 3.0;

	vec4 noise = texture( uNoiseTex, vUv * 0.4 );

	outColor.xyz = vec3( 1.0 - noise.x * 0.2 );
	// outRoughness = vUv.x;
	// outRoughness = smoothstep( 0.3, 0.6, noise.x );
	outMetalic = 0.0;
	outRoughness = 0.0;
	// outNormal = normalize(outNormal + noise.xyz * 0.1);

	#include <frag_out>

}