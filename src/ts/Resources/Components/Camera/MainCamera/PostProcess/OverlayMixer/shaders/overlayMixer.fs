#include <common>

uniform sampler2D uBackBuffer0;
uniform sampler2D uOerlayTex;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	vec4 backBufferCol = texture(uBackBuffer0, vUv );
	vec4 overlayCol = texture( uOerlayTex, vUv );

	vec3 col = backBufferCol.xyz;
	col += overlayCol.xyz;

	outColor = vec4( col, 1.0 );

}