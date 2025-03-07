#include <common>
precision highp int;
uniform sampler2D uMaskTex;

layout (location = 0) out vec4 outColor;

in vec2 vUv;

uniform vec2 uPPResolution;

void main(void) {

	float startPos = gl_FragCoord.y;
	float startMovement = 1.0;

	float endPos = gl_FragCoord.y;
	float endMovement = 1.0;

	for(int i = 0; i < int( uPPResolution.y ); i++){

		startPos -= startMovement;
		endPos += endMovement;

		vec4 startCol = texelFetch( uMaskTex, ivec2( gl_FragCoord.x, startPos ), 0 );

		if( startCol.x < 0.5 ) {
			startMovement = 0.0;
		}

		if( startPos <= 0.0  ) {
			startMovement = 0.0;
			startPos = 0.0;
		}

		vec4 endCol = texelFetch( uMaskTex, ivec2( gl_FragCoord.x, endPos ), 0 );

		if( endCol.x < 0.5 ) {
			endMovement = 0.0;
		}

		if( endPos >= uPPResolution.y ) {
			endMovement = 0.0;
			endPos = uPPResolution.y;
		}

		if( startMovement == 0.0 && endMovement == 0.0 ) {
			break;
		}
		
	}

	float rangeLength = endPos - startPos;

	outColor = vec4( startPos, rangeLength, 0.0, 0.0 );

}