#include <common>
precision highp int;
uniform sampler2D uMaskTex;

layout (location = 0) out vec4 outColor;

in vec2 vUv;

#define MAX_ITERATIONS 256

void main(void) {

	float threshold = uTime;

	float startPos = vUv.y;
	float startMovement = 1.0;

	float endPos = vUv.y;
	float endMovement = 1.0;

	float delta = (1.0 / float(MAX_ITERATIONS));

	for(int i = 0; i < MAX_ITERATIONS; i++){

		startPos -= delta * startMovement;
		endPos += delta * endMovement;

		vec4 startCol = texture(uMaskTex, vec2( vUv.x, startPos ) );

		if( startCol.x < 0.5 ) {
			startMovement = 0.0;
		}

		if( startPos <= 0.0  ) {
			startMovement = 0.0;
			startPos = 0.0;
		}

		vec4 endCol = texture(uMaskTex, vec2( vUv.x, endPos ));

		if( endCol.x < 0.5 ) {
			endMovement = 0.0;
		}

		if( endCol.x >= 1.0 ) {
			endMovement = 0.0;
			endPos = 1.0;
		}

		if( startMovement == 0.0 && endMovement == 0.0 ) {
			break;
		}
		
	}

	outColor = vec4( startPos, endPos, endPos - startPos, startPos - vUv.y );

}