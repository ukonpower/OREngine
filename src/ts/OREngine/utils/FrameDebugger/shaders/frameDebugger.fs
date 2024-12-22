#include <common>

uniform sampler2D backbuffer0;
uniform sampler2D uCanvas;

layout (location = 0) out vec4 outColor;

in vec2 vUv;

void main( void ) {

	vec4 bb = texture( backbuffer0, vUv );
	vec4 canvas = texture(uCanvas, vUv );

	// outColor = mix( bb, canvas, canvas.w );
	vec3 invert = canvas.xyz * canvas.w;
	
	outColor.xyz = mix( bb.xyz, 1.0 - bb.xyz, invert ); 
	outColor.w = 1.0;

}