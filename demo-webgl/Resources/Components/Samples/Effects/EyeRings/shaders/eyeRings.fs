#include <module:common>
#include <part:frag_h>

in vec3 vInstance;

void main( void ) {

	#include <part:frag_in>

	float emit = 10.0 - vInstance.z * 5.0;
	outColor.xyz = vec3( emit );
	outEmission += emit;
	outSSN = 1.0;
	
	#include <part:frag_out>

}