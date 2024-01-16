#include <common>
#include <packing>
#include <frag_h>

in float vTime;
uniform float uTime;
void main( void ) {

	float alpha = 1.0;

	#ifdef IS_DASH

		alpha *= sin( vUv.x * 150.0 + uTime * 5.0 );
		
	#endif

	alpha *= smoothstep( 0.0, 0.1, -fract(vUv.x * 3.0) + vTime * ( 1.1 ) * 1.0 );

	if( alpha <= 0.0 ) discard;

	#include <frag_in>

	outEmission = vec3( 1.0, 1.0, 1.0 );

	#include <frag_out>

} 