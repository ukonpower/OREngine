#include <common>
#include <vert_h>

#include <rotate>

layout (location = 3) in vec2 cuv;
layout (location = 4) in vec4 id;

uniform sampler2D uGPUSampler0;
uniform sampler2D uGPUSampler1;

out vec4 vGPUVel;
out vec4 vGPUPos;
out float vEmit;
out float vUid;

void main( void ) {

	#include <vert_in>

	vGPUVel = texture(uGPUSampler1, cuv );

	float uid = id.x + id.y * 128.0;
	vUid = uid;

	vec4 gpuPos = texture(uGPUSampler0, cuv );

	outPos.z *= 1.0 + 30.0 * length( vGPUVel.xyz ) * 0.0;
	float velLen = length( vGPUVel.xyz );
	
	mat3 rot = makeRotationDir( -vGPUVel.xyz / velLen, vec3( 0.0, -1.0, 0.0 ) );
	outPos *= rot;
	outNormal *= rot;

	outPos *= 0.01 + mix( id.y, id.y * 0.6, 0.0 );

	outPos *= smoothstep( 0.1, 0.2, gpuPos.w);
	outPos *= smoothstep( 1.0, 0.8, gpuPos.w);
	outPos += gpuPos.xyz;

	vGPUPos = gpuPos;

	vec4 vel = ( uProjectionMatrix * uViewMatrix * uModelMatrix * vec4( vGPUVel.xyz, 0.0 ) );

	#include <vert_out>

	vVelocity += vel.xy * 0.04;

}
