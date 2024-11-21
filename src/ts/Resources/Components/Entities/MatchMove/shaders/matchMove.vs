#include <common>
#include <vert_h>

layout(location = 4) in vec3 id;

uniform sampler2D uGPUSampler0;
uniform float uAspectRatio;
uniform vec2 uGPUResolution;
out float vAlpha;

void main( void ) {

	vec3 pos = position;

	float pixelX = 1.0 / uGPUResolution.x;
	vec4 computeBuffer = texture( uGPUSampler0, vec2( pixelX * 1.1, id.x ) );

	float v = 1.0;

	float size = smoothstep( 1.0, 0.5, computeBuffer.z) * 0.2 + 0.05;

	gl_Position = vec4( computeBuffer.xyz, 1.0 );
	gl_Position.xy += pos.xy * vec2( 1.0, uAspectRatio ) * size;
	gl_Position.z = 0.0;

	vAlpha = sin( min(computeBuffer.w * 3.0, 1.0) * 5.0 * PI - ( PI / 2.0 )) * 0.5 + 0.5;
	vAlpha *= 0.1 + smoothstep( 0.5, 0.7, id.x ) * 0.5;

}