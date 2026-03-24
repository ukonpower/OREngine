#include <common>
#include <vert_h>

layout(location = 3) in vec2 instancePos;
layout(location = 4) in vec3 instanceId;

uniform sampler2D uVelocityTex;

void main( void ) {

	#include <vert_in>
	#include <vert_out>

	vec3 pos = position;
	pos.xy *= 0.002;
	pos.xy += (instancePos.xy - 0.5) * 2.0;

	vec4 velocityTex = texture( uVelocityTex, instancePos.xy );

	pos.xy += (pos.z + 0.5) * velocityTex.xy * -20.0 * length( velocityTex.xy ) * 10.0;
	
	gl_Position = vec4( pos.xy, 0.0, 1.0 );

}