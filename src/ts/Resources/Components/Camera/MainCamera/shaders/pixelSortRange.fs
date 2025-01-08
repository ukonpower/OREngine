#include <common>
precision highp int;
uniform sampler2D backbuffer0;
uniform float uTime;

layout (location = 0) out vec4 outColor;

in vec2 vUv;

#define MAX_ITERATIONS 512

void main(void) {

	vec2 offsetUV = vUv;
	float threshold = uTime;

	for(int i = 0; i < MAX_ITERATIONS; i++){

		vec2 offset = vec2( 0.0, float(i) * (1.0 / float(MAX_ITERATIONS)));
		offsetUV = vUv + offset;
		vec4 sceneCol = texture(backbuffer0, offsetUV);

		if( offsetUV.x > 1.0 ) {
			offsetUV.x = 1.0;
			break;
		}

		if( sceneCol.x > threshold ) {
			break;
		}

	}

	outColor = vec4( offsetUV, 0.0, 1.0 );

}