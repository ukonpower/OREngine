#version 300 es
precision highp float;
uniform vec3 uColor;
uniform sampler2D uTex;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	outColor = vec4( texture( uTex, vUv ).xyz * uColor, 1.0 );

}
