#include <common>
precision highp int;
uniform sampler2D backbuffer0;
uniform sampler2D uRangeTex;
uniform vec2 uPPResolution;
uniform float uBlock;
uniform float uSubBlock;
uniform float uTime;
uniform sampler2D uNoiseTex;

layout (location = 0) out vec4 outColor;

in vec2 vUv;

float grayScale( vec3 color ) {
	return 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
}

void main(void) {


	vec2 coord = gl_FragCoord.xy;

	int p = int(uBlock);
	int q = int(uSubBlock);

	int d = 1 << (p-q);

	bool up = ((int(coord.y) >> p) & int(2)) == 0;
	bool compareDir = ((int(coord.y) >> (p - q)) & int(1)) == 0;

	float targetIndex = (coord.y) + float(compareDir ? d : - d);
	vec2 targetUV = vec2( vUv.x, targetIndex / uPPResolution.y);

	vec4 currentPixel = texture(backbuffer0, vUv);
	float currentValue = grayScale( currentPixel.xyz );

	vec4 targetPixel = texture(backbuffer0, targetUV);
	float targetValue = grayScale( targetPixel.xyz );

	vec4 cn = texture( uNoiseTex, vUv * 0.2 );
	vec4 tn = texture( uNoiseTex, targetUV * 0.2 );

	vec4 rangeCol = texture( uRangeTex, vUv );

	if( vUv.y <= rangeCol.y || targetUV.y <= rangeCol.y ) {

		outColor = currentPixel;
		return;
		
	}

	if( up ) {

		if( compareDir ) {

			if( currentValue > targetValue ) {

				outColor = targetPixel;
				
			} else {
				
				outColor = currentPixel;
				
			}

		} else {

			if( currentValue < targetValue ) {
				
				outColor = targetPixel;
				
			} else {
				
				outColor = currentPixel;
				
			}
			
		}
		
	} else {

		if( compareDir ) {

			if( currentValue < targetValue ) {
				
				outColor = targetPixel;
				
			} else {
				
				outColor = currentPixel;
			}
			
		} else {

			if( currentValue > targetValue ) {

				outColor = targetPixel;
				
			} else {
				
				outColor = currentPixel;
				
			}


		}
		
	}

	// outColor = vec4( vec3( compareDir ), 1.0 );

}