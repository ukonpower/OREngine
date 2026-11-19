// lite_h と組で使う。frag_in の out* に入っている面の情報から、ライト・影・環境光・トーンマップを計算して outColor に入れる
#ifdef IS_FORWARD_LIT

	outNormal = normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) );

	// deferred のシェーディング（deferredShading.fs）と同じ part でライトと影を当てる
	#include <part:lighting_forwardIn>

	// lighting_light は平行光の影を引く位置を gBuffer の tex0 から読むので、面の位置で用意する
	vec4 tex0 = vec4( outPos, 0.0 );

	#include <part:lighting_light>

	// 環境光。式は lighting_env と同じで、環境マップの代わりに空の 2 色を引く
	vec3 liteRefDir = reflect( -geo.viewDir, geo.normal );
	float liteNV = clamp( dot( geo.normal, geo.viewDir ), 0.0, 1.0 );
	float liteEF = mix( fresnel( liteNV ), 1.0, mat.metallic );
	vec3 liteEnvReflect = liteEF * mat.specularColor * mat.envMapIntensity;

	diffuse = ( diffuse + liteEnvLight( geo.normal, 1.0 ) * mat.diffuseColor * mat.envMapIntensity ) * ( 1.0 - liteEnvReflect );
	specular = mix( specular, liteEnvLight( liteRefDir, mat.roughness ), liteEnvReflect );

	vec3 liteColor = max( vec3( 0.0 ), ( diffuse + specular ) * outOcclusion + mat.emission );

	liteColor = mix( liteColor, ACESFitted( liteColor * uLiteExposure ), uLiteToneMap );

	// canvas へ直接描くので、表示用の sRGB へもここで変換する
	outColor = vec4( linearToSrgb( liteColor ), 1.0 );

#endif
