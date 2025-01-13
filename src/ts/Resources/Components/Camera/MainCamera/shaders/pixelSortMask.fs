#include <common>
precision highp int;
uniform sampler2D backbuffer0;
uniform float uTime;
uniform float uThresholdMin;
uniform float uThresholdMax;

layout (location = 0) out vec4 outColor;

in vec2 vUv;

void main(void) {

	vec4 texCol = texture(backbuffer0, vUv);

	float value = (texCol.x + texCol.y + texCol.z) / 3.0;

	if( (1.0 - uTime * 0.3) <= value || value >= uThresholdMax ) {
	// if( uThresholdMin <= value || value >= uThresholdMax ) {
		outColor = vec4( 1.0, 0.0, 0.0, 1.0 );
		return;
	}

	outColor = vec4( 0.0, 0.0, 0.0, 1.0 );

}