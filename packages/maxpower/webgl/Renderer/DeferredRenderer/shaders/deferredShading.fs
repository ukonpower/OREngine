#include <module:common>
#include <module:light>
#include <module:pmrem>

// uniforms

uniform sampler2D sampler0; // position.xyz, emission.x
uniform sampler2D sampler1; // normal.xyz, emission.y
uniform sampler2D sampler2; // albedo, sss
uniform sampler2D sampler3; // roughness, metallic, normalSelect, envSelect, 
uniform sampler2D sampler4; // velocity.xy, 0.0, emission.z

uniform sampler2D uSSAOTexture;
uniform sampler2D uLightShaftTexture;
uniform sampler2D uSSRTexture;
uniform sampler2D uEnvMap;

uniform vec3 uColor;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uCameraMatrix;
uniform vec3 uCameraPosition;

// -------------------------

// varyings

in vec2 vUv;

// SSR を環境マップの鏡面反射の代わりに使う粗さの範囲。SSR は鏡面方向の1本のレイしか引かずぼけないので、
// MIN 以下では当たった分をすべて SSR にし、MAX へ向けて環境マップへ戻す。webgpu 側 shading.wgsl と一致させる
#define SSR_ROUGHNESS_MIN 0.1
#define SSR_ROUGHNESS_MAX 0.4

// ssr.fs の ssrCompress で圧縮した反射色を元の明るさへ戻す。
// 圧縮後の輝度は 1 未満だが、半精度の丸めで 1 に届くと 0 除算になるので上限を置く（0.99 は元の輝度で約 99）
vec3 ssrDecompress( vec3 c ) {

	return c / ( 1.0 - min( dot( c, vec3( 0.2126, 0.7152, 0.0722 ) ), 0.99 ) );

}

// out（1 は SSS がぼかす diffuse だけの結果）

layout (location = 0) out vec4 glFragOut0;
layout (location = 1) out vec4 glFragOut1;

void main( void ) {

	float occlusion = texture( uSSAOTexture, vUv ).x;

	vec4 tex0 = texture( sampler0, vUv );
	vec4 tex1 = texture( sampler1, vUv );
	vec4 tex2 = texture( sampler2, vUv );
	vec4 tex3 = texture( sampler3, vUv );
	vec4 tex4 = texture( sampler4, vUv );

	vec3 normal = tex1.xyz;
	vec3 color = tex2.xyz;
	float roughness = tex3.x;
	float metallic = tex3.y;
	vec3 emission = vec3( tex0.w, tex1.w, tex4.w );
	float envMapIntensity= tex3.w;

	Geometry geo = Geometry(
		tex0.xyz,
		normal,
		0.0,
		viewDirection( tex0.xyz, uCameraPosition, uViewMatrix, uProjectionMatrix ),
		vec3( 0.0 ),
		occlusion
	);
	
	Material mat = Material(
		color,
		roughness,
		metallic,
		emission,
		mix( color, vec3( 0.0, 0.0, 0.0 ), metallic ),
		mix( vec3( 1.0, 1.0, 1.0 ), color, metallic ),
		envMapIntensity
	);
	vec3 diffuse = vec3( 0.0 );
	vec3 specular = vec3( 0.0 );

	// lighting

	#include <part:lighting_light>

	// env（SSR が当たった分 ssrWeight は、環境マップの鏡面反射の代わりに画面に映っている物 ssrHit を使う）

	vec4 ssr = texture( uSSRTexture, vUv );
	vec3 ssrHit = ssrDecompress( ssr.xyz / max( ssr.w, 0.0001 ) );
	float ssrWeight = ssr.w * ( 1.0 - smoothstep( SSR_ROUGHNESS_MIN, SSR_ROUGHNESS_MAX, roughness ) );

	#include <part:lighting_env>
	
	// occlusion

	float ao = max( 0.0, 1.0 - geo.occulusion * 1.5 );

	diffuse *= ao;
	specular *= ao;

	vec3 outColor = diffuse + specular;

	// emission

	outColor += mat.emission;

	// light shaft
	
	outColor += texture( uLightShaftTexture, vUv ).xyz;

	glFragOut0 = vec4( max( vec3( 0.0 ), outColor ), 1.0 );
	glFragOut1 = vec4( max( vec3( 0.0 ), diffuse ), 1.0 );

}