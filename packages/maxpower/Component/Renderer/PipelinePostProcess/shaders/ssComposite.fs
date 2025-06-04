#include <common>
#include <packing>
#include <light>

uniform sampler2D uBackBuffer0;

uniform sampler2D uGbufferPos;
uniform sampler2D uGbufferNormal;
uniform sampler2D uSSRTexture;

uniform vec3 uCameraPosition;
uniform float uCameraNear;
uniform float uCameraFar;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	vec4 gCol0 = texture( uGbufferPos, vUv );
	vec4 gCol1 = texture( uGbufferNormal, vUv );
	
	outColor += vec4( texture( uBackBuffer0, vUv ).xyz, 1.0 );
	
	vec3 dir = normalize( uCameraPosition - gCol0.xyz );
	float f = fresnel( clamp( dot( dir, gCol1.xyz ), 0.0, 1.0 ) );

	vec4 ssrCol = texture( uSSRTexture, vUv );

	outColor.xyz += f * ssrCol.xyz * 0.15;

}