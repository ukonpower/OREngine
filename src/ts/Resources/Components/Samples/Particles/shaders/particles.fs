#include <common>
#include <packing>
#include <frag_h>
#include <re>

uniform float uTimeE;
uniform float uType;

in vec4 vGPUVel;
in vec4 vGPUPos;
in float vEmit;
in float vUid;

void main( void ) {

	#include <frag_in>

	vec3 view = normalize(vMVPPosition);
	view.xy *= -0.1;

	float dnv = clamp( dot( vViewNormal, view ), 0.0, 1.0  );

	outColor = vec4( vec3( 0.1 ), 1.0 );

	outRoughness = 0.2;
	outSSN = 0.0;
	outEmission += vEmit;
	outEmission += smoothstep( 0.3, 0.0, dnv ) * 2.0;

	if( uType >= 3.0 ) {

		float beat = uTimeE * 1.0 + vUid * 0.009;
		float beatEmit = exp( fract( beat ) * -8.0 );
		outEmission += beatEmit * 5.0;

	}

	if( uType >= 2.0 ) {

		outEmission += smoothstep( 1.0, 0.0, dnv ) *
		smoothstep( -1.0, 1.0, sin( - length(vGPUPos.xyz) * 3.0 + uTimeE * PI ) ) * 1.5;

	} else if( uType >= 1.0 ) {

		outEmission += smoothstep( 0.5, 0.0, dnv ) * 2.0;

	}

	#include <frag_out>

}
