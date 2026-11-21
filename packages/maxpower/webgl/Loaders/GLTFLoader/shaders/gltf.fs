// frag_h（uniform の宣言）を module より前に置く。lite_out が uniform を引数に渡して module の関数を呼ぶので、
// minify でその引数が uniform の直接参照に置き換わっても、宣言が先に来るようにするため
#include <part:frag_h>
#include <module:common>
// 軽量レンダラーで描くときは、シェーダーの中でライティングまで済ませる（それ以外のレンダラーでは IS_FORWARD_LIT の分岐ごと使わない）
#include <part:lite_h>

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

void main( void ) {

	#include <part:frag_in>

	vec2 mapUv = vUv;
	mapUv.y = 1.0 - mapUv.y;

	#ifdef USE_COLOR

		outColor = uBaseColor;

	#endif

	#ifdef USE_COLOR_MAP

		outColor = texture( uBaseColorMap, mapUv );

	#endif

	if( outColor.w < 0.5 ) discard;

	outMetallic = 1.0;

	#ifdef USE_MR_MAP

		vec4 mr = texture( uMRMap, mapUv );
		outRoughness = mr.y;
		outMetallic = mr.z;

	#endif
	
	#ifdef USE_ROUGHNESS

		outRoughness = uRoughness;

	#endif

	#ifdef USE_NORMAL_MAP 

		vec3 outNormalMap = texture( uNormalMap, mapUv ).xyz;
		outNormalMap = outNormalMap * 2.0 - 1.0;
		
	#endif

	#ifdef USE_METALNESS

		outMetallic = uMetalness;

	#endif

	#ifdef USE_EMISSION

		outEmission = uEmission;

	#endif

	#ifdef USE_EMISSION_MAP

		vec4 emission = texture( uEmissionMap, mapUv );
		outEmission = emission.xyz;

	#endif

	#ifdef USE_EMISSION_STRENGTH

		outEmission *= uEmissionStrength;

	#endif

	#include <part:lite_out>
	#include <part:frag_out>

} 