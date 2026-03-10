#include <common>
#include <packing>
#include <frag_h>
#include <re>

in vec4 vGPUVel;
in vec4 vGPUPos;
in float vEmit;
in float vUid;

void main( void ) {

	#include <frag_in>

	vec3 view = normalize(vMVPPosition);
	view.xy *= -0.1;

	float dnv = clamp( dot( vViewNormal, view ), 0.0, 1.0  );

	outColor = vec4( vec3( 1.0 ), 1.0 );

	outRoughness = 0.2;
	outEmission += vEmit;
	outEmission += smoothstep( 0.3, 0.0, dnv ) * 2.0;

	#include <frag_out>

}
