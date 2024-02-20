#include <common>
#include <packing>
#include <frag_h>

in float vNoise;

void main( void ) {

	#include <frag_in>

	outEmissionIntensity = 3.0;
	outEmission += 1.0;
	// outEmission += vNoise;
	// outEmissionIntensity = 10.0;

	#include <frag_out>

}