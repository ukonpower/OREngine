#include <module:common>
#include <module:sky>
#include <part:frag_h>

uniform vec3 uSkyColor;
uniform vec3 uGroundColor;
uniform float uSkyIntensity;

void main( void ) {

	#include <part:frag_in>

	float t = clamp( normalize( skyPosition( vNormal ) ).y * 0.5 + 0.5, 0.0, 1.0 );
	vec3 color = mix( uGroundColor, uSkyColor * 2.0, t );

	outColor = vec4( 0.0 );
	outEmission = color * uSkyIntensity;
	outRoughness = 1.0;
	outEnv = 0.0;

	#include <part:frag_out>

}
