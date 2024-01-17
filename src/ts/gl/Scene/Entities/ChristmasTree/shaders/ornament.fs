#include <common>

#include <packing>
#include <frag_h>

#ifdef USE_COLOR

	uniform vec4 uBaseColor;

#endif

#ifdef USE_COLOR_MAP

	uniform sampler2D uBaseColorMap;

#endif

#ifdef USE_ROUGHNESS

	uniform float uRoughness;

#endif

#ifdef USE_METALNESS

	uniform float uMetalness;

#endif

#ifdef USE_NORMAL_MAP

	uniform sampler2D uNormalMap;

#endif

#ifdef USE_TANGENT

	in vec3 vTangent;
	in vec3 vBitangent;

#endif

#ifdef USE_MR_MAP

	uniform sampler2D uMRMap;

#endif

#ifdef USE_EMISSION

	uniform vec3 uEmission;

#endif


#ifdef USE_EMISSION_MAP

	uniform sampler2D uEmissionMap;

#endif

#ifdef USE_EMISSION_STRENGTH

	uniform float uEmissionStrength;

#endif

uniform float uType;

void main( void ) {

	#include <frag_in>

	vec2 mapUv = vUv;
	mapUv.y = 1.0 - mapUv.y;

	#ifdef USE_COLOR

		outColor = uBaseColor;

	#endif

	#ifdef USE_COLOR_MAP

		outColor = texture( uBaseColorMap, mapUv );

	#endif

	if( outColor.w < 0.5 ) discard;

	// outMetalic = 1.0;

	#ifdef USE_MR_MAP

		vec4 mr = texture( uMRMap, mapUv );
		outRoughness = mr.y;
		outMetalic = mr.z;

	#endif
	
	#ifdef USE_ROUGHNESS

		outRoughness = uRoughness;

	#endif

	#ifdef USE_NORMAL_MAP 
	
		#ifdef USE_TANGENT

		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );

		#ifdef DOUBLE_SIDED

			tangent *= faceDirection;
			bitangent *= faceDirection;
		
		#endif
		
		mat3 vTBN = mat3( tangent, bitangent, vNormal );
		
		vec3 mapN = texture( uNormalMap, mapUv ).xyz;
		mapN = mapN * 2.0 - 1.0;
		
		outNormal = normalize( vTBN * mapN );

		#endif

	#endif

	#ifdef USE_METALNESS

		outMetalic = uMetalness;

	#endif

	#ifdef USE_EMISSION

		outEmission = uEmission;

	#endif

	#ifdef USE_EMISSION_MAP

		vec4 emission = texture( uEmissionMap, mapUv );
		outEmission = emission.xyz;

	#endif

	#ifdef USE_EMISSION_STRENGTH

		outEmissionIntensity *= uEmissionStrength;

	#endif

	outRoughness = 0.2;
	outMetalic *= 0.9;
	outEnv = 1.0;

	#ifdef ORNAMENT_1

		outColor.xyz *= vec3( 1.0, 0.0, 0.0 );

	#endif

	#include <frag_out>

} 