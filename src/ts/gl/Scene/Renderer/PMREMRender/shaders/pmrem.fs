#include <common>

uniform sampler2D backbuffer0;
uniform vec2 uPPPixelSize;
uniform float uBlur;

layout (location = 0) out vec4 outColor;

in vec2 vUv;

#define BLUR_SCALE 4.0

vec4 sampleTex( sampler2D tex, vec2 uv, vec2 offset ) {

	vec2 offsetUV = uv + offset;

	float originIndexX = floor( uv.x * 3.0 );
	float originIndexY = floor( uv.y * 2.0 );

	float offsetIndexX = floor( offsetUV.x * 3.0 );
	float offsetIndexY = floor( offsetUV.y * 2.0 );

	return vec4( texture( backbuffer0, offsetUV ).xyz, 1.0 );
	
}

void main( void ) {

	vec4 sum = vec4( 0.0 );

	float blurSize = uBlur * BLUR_SCALE;

	sum += sampleTex( backbuffer0, vUv, blurSize * vec2( -uPPPixelSize.x, uPPPixelSize.y ) );
	sum += sampleTex( backbuffer0, vUv, blurSize * vec2( 0.0, uPPPixelSize.y ) );
	sum += sampleTex( backbuffer0, vUv, blurSize * vec2( uPPPixelSize.x, uPPPixelSize.y ) );
	
	sum += sampleTex( backbuffer0, vUv, blurSize * vec2( -uPPPixelSize.x, 0.0 ) );
	sum += sampleTex( backbuffer0, vUv, blurSize * vec2( 0.0, 0.0 ) );
	sum += sampleTex( backbuffer0, vUv, blurSize * vec2( uPPPixelSize.x, 0.0 ) );

	sum += sampleTex( backbuffer0, vUv, blurSize * vec2( -uPPPixelSize.x, -uPPPixelSize.y ) );
	sum += sampleTex( backbuffer0, vUv, blurSize * vec2( 0.0, -uPPPixelSize.y ) );
	sum += sampleTex( backbuffer0, vUv, blurSize * vec2( uPPPixelSize.x, -uPPPixelSize.y ) );

	sum.xyz /= sum.w;

	outColor = vec4( sum.xyz, 1.0 );

}