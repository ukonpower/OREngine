#include <common>
#include <vert_h>

layout (location = 3) in vec2 computeUV;
layout (location = 4) in vec3 id;
layout (location = 5) in vec3 instancePosition;
layout (location = 6) in vec4 instanceQuaternion;
layout (location = 7) in vec3 instanceScale;

mat4 qua2mat( vec4 q ){

    mat4 m = mat4(
        1.0 - 2.0 * pow( q.y, 2.0 ) - 2.0 * pow( q.z, 2.0 ), 2.0 * q.x * q.y + 2.0 * q.w * q.z, 2.0 * q.x * q.z - 2.0 * q.w * q.y, 0.0,
        2.0 * q.x * q.y - 2.0 * q.w * q.z, 1.0 - 2.0 * pow( q.x, 2.0 ) - 2.0 * pow( q.z, 2.0 ), 2.0 * q.y * q.z + 2.0 * q.w * q.x, 0.0,
        2.0 * q.x * q.z + 2.0 * q.w * q.y, 2.0 * q.y * q.z - 2.0 * q.w * q.x, 1.0 - 2.0 * pow( q.x, 2.0 ) - 2.0 * pow( q.y, 2.0 ), 0.0,
        0.0, 0.0, 0.0, 1.0
    );

    return m;

}

void main( void ) {

	#include <vert_in>

	outPos = position;

	outPos.y += 0.5;

	mat4 rot = qua2mat( instanceQuaternion );
	outPos.xyz = ( rot * vec4( outPos.xyz, 1.0) ).xyz;
	outNormal.xyz = ( rot * vec4( outNormal.xyz, 1.0) ).xyz;

	outPos *= instanceScale;
	outPos += instancePosition;

	#include <vert_out>
	
}