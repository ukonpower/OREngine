#include <module:common>
#include <part:vert_h>

#ifdef USE_TANGENT

	layout ( location = 3 ) in vec4 tangent;
	out vec3 vTangent;
	out vec3 vBitangent;

#endif

void main( void ) {

	#include <part:vert_in>
	#include <part:vert_out>

	#ifdef USE_TANGENT

		vTangent = (uModelMatrix * vec4(tangent.xyz, 0.0)).xyz;
		vBitangent = normalize( cross( vNormal, vTangent.xyz ) * tangent.w );

	#endif

}