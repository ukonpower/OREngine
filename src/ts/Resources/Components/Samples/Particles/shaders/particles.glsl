#include <common>
#include <noise_cyclic>

layout (location = 0) out vec4 outColor0;
layout (location = 1) out vec4 outColor1;

uniform sampler2D uGPUSampler0;
uniform sampler2D uGPUSampler1;
uniform vec2 uGPUResolution;
uniform float uTimeE;
uniform float uDeltaTime;

in vec2 vUv;

#include <random>
#include <rotate>

void main( void ) {

	float t = uTimeE * 3.0;

	float id = vUv.x + vUv.y * uGPUResolution.x;

	vec4 position = texture( uGPUSampler0, vUv );
	vec4 velocity = texture( uGPUSampler1, vUv );

	// velocity

	float tOffset = t + id * 0.015;
	vec3 noisePosition = position.xyz * ( 1.0 );

	vec3 noise = noiseCyc( 10.0 + noisePosition + vec3( 0.0, -t * 1.3, 0.0 ) + tOffset ) * 0.03;

	velocity.xyz += noise;
	velocity.xyz *= 0.99 - smoothstep( 0.6, 1.0, position.w) * 0.4;
	// velocity.x += 0.001;

	//  position

	position.xyz += velocity.xyz;

	// lifetime

	if( position.w > 1.0 ) {

		position = vec4( 0.0, 0.0, 0.0, random( position.xy ) * 0.5 );
		velocity = vec4( 0.1 );

	}

	position.w += uDeltaTime / 2.0;

	// out

	outColor0 = position;
	outColor1 = velocity;

}
