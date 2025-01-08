#include <common>
precision highp int;
uniform sampler2D backbuffer0;
uniform float uThresholdMin;
uniform float uThresholdMax;

layout (location = 0) out vec4 outColor;

in vec2 vUv;

void main(void) {

	vec4 texCol = texture(backbuffer0, vUv);

	if( uThresholdMin <= texCol.x || texCol.x >= uThresholdMax ) {
		outColor = vec4( 1.0, 0.0, 0.0, 1.0 );
		return;
	}

	outColor = vec4( 0.0, 0.0, 0.0, 1.0 );

}