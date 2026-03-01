#include <common>
#include <vert_h>

layout(location = 8) in mat4 uvMatrix;
layout(location = 4) in mat4 geoMatrix;

void main( void ) {

	#include <vert_in>

	vec4 p = (geoMatrix * vec4( outPos, 1.0 ));

	outPos.xyz = p.xyz;
	
	#include <vert_out>

	vUv = (uvMatrix * vec4( vUv, 0.0, 1.0 )).xy;


}