#include <common>

uniform sampler2D uBackBuffer0;

layout (location = 0) out vec4 outColor;

in vec2 vUv;

void main( void ) {

	outColor = texture( uBackBuffer0, vUv );
	outColor.w = 1.0;

}