#include <common>
#include <packing>
#include <frag_h>
#include <noise>
#include <rotate>

uniform float uTime;

#include <re>

uniform vec3 cameraPosition;
uniform vec2 uResolution;
uniform float uAspectRatio;

void main( void ) {

	#include <frag_in>

	vec3 normal = normalize( - vNormal );
	outRoughness = 1.0;
	outColor *= 0.0;
	outEmission = vec3( 0.0, 0.05, 0.1);

	float n = noise( outPos * 0.05 + uTime * 0.1 );

	vec3 n2Pos = outPos;
	n2Pos.xz *= rotate( n2Pos.y * 0.02 );
	float n2 = noise( n2Pos * 0.04 + vec3( 0.0, 0.0, uTime * 0.1 + n ) );

	float phase = 4.5;

	float line = smoothstep( 0.88, 0.9, fract( n2 * phase ) );
	float pattern = smoothstep( 0.2, 0.1, length( fract( ( vUv + vec2( floor(vUv.y * 150.0) / 150.0 * 0.25, 0.0 ) ) * vec2( 2.0, 1.0 ) * 150.0 ) - 0.5 )) * step( n2 * phase, 2.0 ) * 0.8;

	float emit = min( line + pattern, 1.0 );

	outEmission += emit;

	outEmissionIntensity = 1.0 + emit * 50.0 * smoothstep( 0.4, 1.0, n);
	outEnv = 0.0;

	// discard;
	
	#include <frag_out>

} 