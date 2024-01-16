#include <common>
#include <packing>
#include <frag_h>

uniform float uTime;

void main( void ) {

	float alpha = sin( ( vUv.x - vUv.y ) * 20.0 - uTime * 5.0 ) * 0.5 + 0.5; 

	if( alpha < 0.5 ) discard;

	#include <frag_in>

	outEmission = vec3( 1.0 );

	#include <frag_out>

} 