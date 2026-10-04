// SSR の結果をシーンへ合成する。outSSR を書いた面は環境マップの鏡面反射を SSR の結果で置き換え、
// それ以外の面はフレネルと粗さで重み付けして反射色を足す

#include <module:common>
#include <module:light>

uniform sampler2D uBackBuffer0;

uniform sampler2D uGbufferPos;
uniform sampler2D uGbufferNormal;
uniform sampler2D uGbufferAlbedo;
uniform sampler2D uGbufferMaterial;
uniform sampler2D uVelTex;
uniform sampler2D uSSRTexture;

// deferredShading.fs の glFragOut2。rgb = SSR で置き換える環境の鏡面反射 / a = 置き換えの重み
uniform sampler2D uEnvReflection;

uniform vec3 uCameraPosition;
uniform float uCameraNear;
uniform float uCameraFar;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

// ssr.fs の ssrCompress で圧縮した反射色を元の明るさへ戻す。
// 圧縮後の輝度は 1 未満だが、半精度の丸めで 1 に届くと 0 除算になるので上限を置く（0.99 は元の輝度で約 99）
vec3 ssrDecompress( vec3 c ) {

	return c / ( 1.0 - min( dot( c, vec3( 0.2126, 0.7152, 0.0722 ) ), 0.99 ) );

}

void main( void ) {

	vec3 pos = texture( uGbufferPos, vUv ).xyz;

	outColor = vec4( texture( uBackBuffer0, vUv ).xyz, 1.0 );

	// 空・背景には反射を足さない。SSR は半分の解像度を線形補間で引くので、隣の面の反射がにじんでくる分もここで止まる
	if( isBackground( pos, uCameraPosition, uCameraFar ) ) return;

	vec4 material = texture( uGbufferMaterial, vUv );
	vec4 ssr = texture( uSSRTexture, vUv );

	// SSR は当たらなかった画素を 0 にして均すので、a が当たった割合で、rgb は当たった色にその割合が掛かっている
	float coverage = ssr.w;
	vec3 hit = ssrDecompress( ssr.xyz / max( coverage, 0.0001 ) );

	// 置き換え。当たった割合だけ環境の鏡面反射を抜き、同じ重みで SSR の色を入れる。
	// 重みはスカラーで来るので、deferredShading.fs の specularColor（金属は albedo の色）をここで掛ける
	vec4 envReflection = texture( uEnvReflection, vUv );
	vec3 specularColor = mix( vec3( 1.0 ), texture( uGbufferAlbedo, vUv ).xyz, material.y );

	outColor.xyz += ( hit * envReflection.w * specularColor - envReflection.xyz ) * coverage;

	// 加算。SSR は鏡面の1本のレイしか引かないので、粗い面ほど弱めて roughness = 1 で消す。
	// 置き換えた面には足さない（gBuffer の velocity.z が outSSR。forward が上から描いた画素は 0 になる）
	vec3 dir = viewDirection( pos, uCameraPosition, uViewMatrix, uProjectionMatrix );
	float f = fresnel( clamp( dot( dir, texture( uGbufferNormal, vUv ).xyz ), 0.0, 1.0 ) );
	float smoothness = 1.0 - material.x;
	float additive = 1.0 - texture( uVelTex, vUv ).z;

	outColor.xyz += f * smoothness * smoothness * ssrDecompress( ssr.xyz ) * 0.15 * additive;

	outColor.xyz = max( outColor.xyz, vec3( 0.0 ) );

}
