#include <module:common>
#include <module:light>

uniform sampler2D uBackBuffer0;

uniform sampler2D uGbufferPos;
uniform sampler2D uGbufferNormal;
uniform sampler2D uSSRTexture;

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

	vec4 gCol0 = texture( uGbufferPos, vUv );
	vec4 gCol1 = texture( uGbufferNormal, vUv );
	
	outColor += vec4( texture( uBackBuffer0, vUv ).xyz, 1.0 );
	
	vec3 dir = viewDirection( gCol0.xyz, uCameraPosition, uViewMatrix, uProjectionMatrix );
	float f = fresnel( clamp( dot( dir, gCol1.xyz ), 0.0, 1.0 ) );

	vec4 ssrCol = texture( uSSRTexture, vUv );

	outColor.xyz += f * ssrDecompress( ssrCol.xyz ) * 0.15;

}