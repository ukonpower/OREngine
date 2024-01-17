#include <common>
#include <vert_h>

#include <rotate>

uniform float uTime;
uniform vec4 uState;

layout (location = 3) in float num;

void main( void ) {

	vec3 pos = position * 1.0;

	pos.y *= 0.06;
	pos.y += (num - 0.5) * 1.6;
	
	
	gl_Position = vec4( pos.xy, 0.0, 1.0 );

	vUv = uv;
	vUv.x *= 19.0;
	vUv.x += uTime * 0.5 * sign(num - 0.5);

}