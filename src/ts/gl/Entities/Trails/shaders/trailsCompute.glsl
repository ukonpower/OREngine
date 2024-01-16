#include <common>
#include <noise>

layout (location = 0) out vec4 outColor0;
layout (location = 1) out vec4 outColor1;

uniform sampler2D gpuSampler0;
uniform sampler2D gpuSampler1;
uniform float uTime;
uniform vec2 uGPUResolution;

in vec2 vUv;

#include <noise4D>
#include <rotate>

uniform vec4 uMidi;
uniform vec4 uMidi2;

void main( void ) {

	float around = uMidi2.w;
	float aroundInv = 1.0 - around;

	float id = ( vUv.x * uGPUResolution.x + vUv.y ) / uGPUResolution.x;
	vec2 pixel = 1.0 / uGPUResolution;

	vec4 position = texture( gpuSampler0, vUv );
	vec4 velocity = texture( gpuSampler1, vUv );

	float head = vUv.x < pixel.x ? 1.0 : 0.0;

	float bara = id * (  10.0 * uMidi.x);
	float t = uTime * mix( 0.1, 1.0, head );
	vec3 noisePosition = position.xyz * mix( 2.0 * uMidi.y, 0.15 + bara, head) * ( 1.0 - around * 0.5);

	vec3 noise = vec3(
		snoise4D( vec4( noisePosition, t) ),
		snoise4D( vec4( noisePosition + 1234.5, t) ),
		snoise4D( vec4( noisePosition + 2345.6, t) )
	);

	if( vUv.x < pixel.x ) {

		// velocity

		velocity.xyz *= 0.99;
		velocity.xyz += noise * 0.003; 


		float dir = atan2( position.z, position.x );
		float r = 0.001 * around;
		velocity.x += sin( dir ) * r;
		velocity.z += -cos( dir ) * r;

		vec3 gravity = vec3( 0.0 );
		vec3 gPos = vec3( 0.0 );
		gPos = position.xyz + vec3( 0.0, 0.0, 0.0 );
		gravity += gPos.xyz * smoothstep( 0.0, 3.1, length( gPos.xyz ) * ( 1.0 - around * 0.97) ) * -vec3(0.001);
		velocity.xyz += gravity;

		if( length( velocity.xyz ) > 0.15 ) {

			velocity.xyz = normalize( velocity.xyz ) * 0.15;

		}

		//  position

		position.xyz += velocity.xyz;

	} else {

		vec4 prevPos = texture( gpuSampler1, vUv - vec2( pixel.x, 0.0 ) );
		vec3 diff = position.xyz - prevPos.xyz;

		position.xyz = mix( position.xyz, texture( gpuSampler0, vUv - vec2( pixel.x, 0.0 ) ).xyz, 0.9 );
		position.xyz += noise * 0.1 * uMidi.z;
		
	}

	// out

	outColor0 = position;
	outColor1 = velocity;

} 