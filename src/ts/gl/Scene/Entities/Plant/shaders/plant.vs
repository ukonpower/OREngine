#include <common>
#include <vert_h>

#ifdef USE_TANGENT

	layout ( location = 3 ) in vec4 tangent;
	layout ( location = 4 ) in float materialId;
	
	out vec3 vTangent;
	out vec3 vBitangent;
	flat out int vMaterialId;

#endif

void main( void ) {

	#include <vert_in>
	#include <vert_out>

	#ifdef USE_TANGENT

		vTangent = (modelMatrix * vec4(tangent.xyz, 0.0)).xyz;
		vBitangent = normalize( cross( vNormal, vTangent.xyz ) * tangent.w );

	#endif

	vMaterialId = int( materialId );

}