#include <common>

uniform sampler2D backbuffer0;

layout (location = 0) out vec4 outColor;

in vec2 vUv;

void main( void ) {

	outColor = texture( backbuffer0, vUv );
	outColor.w = 1.0;

}