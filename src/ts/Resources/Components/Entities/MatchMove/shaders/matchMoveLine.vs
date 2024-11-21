#include <common>
#include <vert_h>

layout(location = 4) in float id;

uniform sampler2D uGPUSampler0;
uniform vec2 uGPUResolution;

out float vAlpha;


void main( void ) {

	vec3 pos = vec3( 0.0, 0.0, 0.0 );

	vec3 offsetPos = texture( uGPUSampler0, vec2( uv.x, id ) ).xyz;

	gl_Position = vec4( offsetPos.xyz, 1.0 );
	gl_Position.z = 0.0;

	vAlpha = (0.1 + smoothstep( 0.5, 0.7, id ) * 0.5) * 0.5;

}