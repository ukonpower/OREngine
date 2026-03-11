#include <common>
#include <noise_simplex>

layout (location = 0) out vec4 outColor0;
layout (location = 1) out vec4 outColor1;

uniform sampler2D uGPUSampler0;
uniform sampler2D uGPUSampler1;
uniform float uTimeE;
uniform vec2 uGPUResolution;

in vec2 vUv;

#include <rotate>

void main( void ) {

	float t = uTimeE * 0.4;
	float id = vUv.y;

	vec4 position = texture( uGPUSampler0, vUv );
	vec4 velocity = texture( uGPUSampler1, vUv );

	float pixelX = 1.0 / uGPUResolution.x;


	float posOffset = id * 0.5;
	float tOffset = t + id * 0.8;

	vec3 pos = position.xyz;
	vec3 np = pos * 0.23;

	vec3 noise = vec3(
		noiseSimplex( vec4( np, tOffset) ),
		noiseSimplex( vec4( np + 123.4, tOffset) ),
		noiseSimplex( vec4( np + 567.8, tOffset) )
	);
	noise = normalize( noise ) * ( 0.002 + id * 0.001 );

	// velocity

	if( vUv.x < pixelX ) {

		vec3 gPos = pos * vec3( 1.0, 1.0, 5.0 ) - vec3( 0.0, 0.0, 3.0 );

		velocity.xyz += noise;
		velocity.xyz += smoothstep( 0.0, 6.0, length( gPos ) ) * - gPos * 0.002;
		velocity.xyz += smoothstep( 1.5, 0.5, length( gPos.xyz ) ) * gPos.xyz * 0.02;
		velocity.xyz *= 0.98;

	}
	
	//  position

	if( vUv.x < pixelX ) {

		position.xyz += velocity.xyz;
		
	} else {

		vec3 t1 = texture( uGPUSampler0, vUv - vec2( pixelX * 1.5, 0.0 ) ).xyz;
		vec3 t2 =  texture( uGPUSampler0, vUv - vec2( pixelX * 1.5 - 0.05, 0.0 ) ).xyz;

		position.xyz = mix( t1, t2, 0.1 );
		position.xyz += noise * 5.0;
		
	}

	// lifetime

	if( position.w > 1.0 ) {
	
		// position = vec4( 5.0, 0.0, 0.0, 0.0 );
		// position.xz *= rotate( vUv.x * TPI * 20.0 - uTimeE * 0.02 );
		// velocity = vec4( 0.0 );

	}

	position.w += 0.016 / 10.0;

	// out

	outColor0 = position;
	outColor1 = velocity;

} 