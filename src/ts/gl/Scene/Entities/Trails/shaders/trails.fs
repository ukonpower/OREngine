#include <common>
#include <packing>
#include <frag_h>

uniform vec3 cameraPosition;
uniform sampler2D uNoiseTex;

uniform sampler2D uAudioWaveTex;
uniform sampler2D uAudioFreqTex;

uniform vec4 uMidi;
uniform vec4 uMidi2;

in vec3 vId;

void main( void ) {

	#include <frag_in>

	float audio = texture( uAudioWaveTex, vec2( vId.z, 0.0 ) ).x;

	float dnv = dot( normalize( vViewNormal ), normalize( -vMVPosition ) );
	vec4 n = texture( uNoiseTex, vUv * 1.0 );
	
	outColor.xyz =  vec3( 1.0 );

	outEmission += vec3( 0.0, 2.0, 0.0 ) * smoothstep( 0.9, 1.0, vId.y) * (uMidi2.x);
	outRoughness *= 0.1;

	#include <frag_out>

} 