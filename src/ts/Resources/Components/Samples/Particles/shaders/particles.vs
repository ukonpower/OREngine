#include <common>
#include <vert_h>

layout (location = 3) in vec2 cuv;
layout (location = 4) in vec4 id;

uniform sampler2D uGPUSampler0;
uniform sampler2D uGPUSampler1;

out vec4 vGPUVel;
out vec4 vGPUPos;

void main( void ) {

	#include <vert_in>

	float uid = id.x + id.y * 128.0;

	vec4 gpuPos = texture(uGPUSampler0, cuv );

	outPos *= ( 0.05 + id.z * id.z * 2.0 );
	outPos *= 0.1;
	outPos *= smoothstep( 1.0, 0.9, gpuPos.w);
	outPos *= smoothstep( 0.1, 0.15, gpuPos.w);
	outPos += gpuPos.xyz;
	
	vGPUVel = texture(uGPUSampler1, cuv );
	vGPUPos = gpuPos;
	
	vec4 vel = ( projectionMatrix * viewMatrix * modelMatrix * vec4( vGPUVel.xyz, 0.0 ) );
	
	#include <vert_out>

	vVelocity += vel.xy * 0.10;
	
}