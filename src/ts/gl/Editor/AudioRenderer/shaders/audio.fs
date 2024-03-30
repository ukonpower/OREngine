#include <common>

uniform sampler2D uAudioBuffer;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	vec2 uv = vec2( vUv.x, 0.0 );

	float v = abs(texture( uAudioBuffer, uv ).x );

	float w = step( vUv.y, v );

	outColor = vec4( vec3( w ), 1.0 );

}