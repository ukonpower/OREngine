#include <common>

layout (location = 0) out vec4 outColor;

uniform vec2 uGPUResolution;
uniform sampler2D uGPUSampler0;
uniform sampler2D uGBufferPos;

uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

uniform float uTimeE;

in vec2 vUv;

#include <random>

void main( void ) {

	outColor = vec4( 0.0, 0.0, 0.0, 1.0 );

	float pixelX = 1.0 / uGPUResolution.x;

	if ( vUv.x < pixelX ) {

		vec4 markerWorldPos = texture( uGPUSampler0, vUv );
		vec4 markerScreenPos = uProjectionMatrix * uViewMatrix * vec4( markerWorldPos.xyz, 1.0 );
		markerScreenPos.xy /= markerScreenPos.w;

		vec4 gBufferWorldPos = texture( uGBufferPos, markerScreenPos.xy * 0.5 + 0.5 );
		vec4 gBufferScreenPos = uProjectionMatrix * uViewMatrix * vec4( gBufferWorldPos.xyz, 1.0 );
		gBufferScreenPos.xy /= gBufferScreenPos.w;

		vec4 beforeFrameMarkerPos = texture( uGPUSampler0, vUv + vec2( 1.0 / uGPUResolution.x * 1.5, 0.0 ) );

		if( // yabai 
			markerWorldPos.w == 0.0 && (
				markerScreenPos.z > gBufferScreenPos.z + 0.3 ||
				abs( markerScreenPos.z - gBufferScreenPos.z ) > 0.3 ||
				markerScreenPos.x < -1.0 ||
				markerScreenPos.x > 1.0 ||
				markerScreenPos.y < -1.0 ||
				markerScreenPos.y > 1.0 ||
				length( beforeFrameMarkerPos.xy - markerScreenPos.xy ) > 0.1 
			) ||
			length( markerScreenPos.xy ) < 0.4
		) {

			outColor = texture( uGBufferPos, vec2( random( vec2(uTimeE + 10.0 + vUv.y) ), random( vec2(uTimeE + vUv.y) )) );
			outColor.w = 1.0;

		} else{

			outColor = markerWorldPos;
			outColor.w = 0.0;
			
		}
		
	} else if( vUv.x < pixelX * 2.0 ){

		vec4 worldPos = texture( uGPUSampler0, vec2( 0.0, vUv.y ) );
		vec4 beforeFramePos = texture( uGPUSampler0, vUv );

		vec3 pos = worldPos.xyz;
		outColor = uProjectionMatrix * uViewMatrix * vec4( pos, 1.0 );
		outColor.xyz /= outColor.w;

		if( worldPos.w > 0.5 ) {

			outColor.w = 0.2;

		} else {

			outColor.w = beforeFramePos.w + 0.01;

		}


	} else  {
		
		vec4 worldPos = texture( uGPUSampler0, vec2( 0.0, vUv.y ) );
		
		if( worldPos.w > 0.5 ) {

			vec4 worldPos = texture( uGPUSampler0, vec2( 0.0, vUv.y ) );
			outColor = uProjectionMatrix * uViewMatrix * vec4( worldPos.xyz, 1.0 );
	 		outColor.xyz /= outColor.w;

		} else {

			outColor = texture( uGPUSampler0, vUv - vec2( pixelX , 0.0 ) );

		}

	}

	// outColor = vec4(  0.0, 0.0, 0.0, 1.0 );

} 