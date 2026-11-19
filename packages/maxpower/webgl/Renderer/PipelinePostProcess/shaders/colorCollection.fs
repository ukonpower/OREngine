#include <module:common>

uniform sampler2D uBackBuffer0;
uniform float uToneMap;
uniform float uExposure;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

#include <module:tonemap>

void main( void ) {

    vec3 col = texture( uBackBuffer0, vUv ).xyz;

    col = mix( col, ACESFitted( col * uExposure ), uToneMap );

	// WebGL には sRGB の drawingBuffer が無いので、表示用の sRGB へはここで変換する
	outColor = vec4( linearToSrgb( col ), 1.0 );

}