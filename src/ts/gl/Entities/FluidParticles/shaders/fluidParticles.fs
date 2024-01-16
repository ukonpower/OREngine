#include <common>
#include <packing>
#include <frag_h>

#include <re>

in vec3 vRnd;

void main( void ) {

	#include <frag_in>

	outColor = vec4( 1.0 );
	outColor.xyz *= 1.0;

	float dnv = dot( normalize( vViewNormal ), normalize( -vMVPosition ) );

	float emit = step( 0.99, length( vRnd ) );
	outEmission += vec3( vRnd ) * emit * 0.8;
	outEmissionIntensity = 10.0;
	
	#include <frag_out>

} 