#include <common>
#include <vert_h>
#include <noise>
layout (location = 3) in vec2 computeUV;
layout (location = 4) in vec3 rnd;

uniform sampler2D gpuSampler0;
uniform sampler2D gpuSampler1;

uniform float uTime;

out vec3 vRnd;

void main( void ) {

	#include <vert_in>

	vec4 gpuPos = texture(gpuSampler0, computeUV );
	vec4 gpuVel = texture(gpuSampler1, computeUV );

	outPos *= rnd.x * rnd.x * 5.0;

	outPos *= smoothstep( 1.0, 0.1, gpuPos.w);
	outPos *= smoothstep( 0.1, 0.15, gpuPos.w);
	outPos += gpuPos.xyz;
	
	#include <vert_out>

	vRnd = rnd;
	
	vec4 vel = ( projectionMatrix * viewMatrix * modelMatrix * vec4( gpuVel.xyz, 0.0 ) );
	
}