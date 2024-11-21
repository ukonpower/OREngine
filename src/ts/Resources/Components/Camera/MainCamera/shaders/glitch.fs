#include <common>
#include <random>

uniform sampler2D backbuffer0;
uniform float uGlitch;
uniform float uTime;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	vec3 col = vec3( 0.0, 0.0, 0.0 );

	vec2 uv = vUv;

	float g = uGlitch;

	if( g > 0.0 ) {

		uv.x += (random( floor( vUv * 3.3) / 3.3 + uTime ) - 0.5) * g * 0.2;
		uv.x += (random( floor( vUv * 10.0) / 10.0 + uTime ) - 0.5) * g * 0.2;
		uv.x += (random( floor( vUv * vec2(1.0, 40.0)) / vec2(1.0, 40.0) + uTime ) - 0.5) * g * 0.1;
		uv.x += (random( vUv + uTime ) - 0.5) * g * 0.15;
		uv.x += ( smoothstep( 0.9, 1.0, random( vec2( floor( vUv.y * 20.0) / 20.0 ) + uTime ) ) ) * g * 0.2;
		
	}

	col.x += texture( backbuffer0, uv * vec2( 1.0 - g * 0.1, 1.0 ) ).x;
	col.y += texture( backbuffer0, uv * vec2( 1.0, 1.0 )).y;
	col.z += texture( backbuffer0, uv * vec2( 1.0 + g * 0.1, 1.0 )).z;
	
	outColor = vec4( col, 1.0 );

}