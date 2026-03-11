#include <common>
#include <vert_h>
#include <rotate>

uniform float uTimeE;

out vec3 vInstance;

layout(location = 3) in vec3 instance;

void main( void ) {

	#include <vert_in>

	outPos.xy *= 1.0 + (1.0 - instance.z) * 0.2;
	outPos.yz *= rotate( (-HPI + sin( uTimeE * 0.3 + instance.z * 0.3 ) * HPI )  );
	
	outPos.y += instance.x * 2.2;

	vInstance = instance;

	
	#include <vert_out>

}