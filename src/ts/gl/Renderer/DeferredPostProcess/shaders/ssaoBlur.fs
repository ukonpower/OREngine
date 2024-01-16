#include <common>
#include <packing>
#include <light_h>
#include <noise>

// uniforms

uniform sampler2D uSSAOTexture;
uniform vec2 uPPPixelSize;

uniform sampler2D uNormalTexture;
uniform sampler2D uDepthTexture;

uniform float[16] uWeights;
#define SSAOSAMPLE 16

// varying

in vec2 vUv;

// out

layout (location = 0) out vec4 outColor;

void main( void ) {

	float occlusion = 0.0;
	vec2 offset = vec2( uPPPixelSize );	

	vec3 normalBasis = texture( uNormalTexture, vUv ).xyz;
	float depthBasis = texture( uDepthTexture, vUv ).w;

	float alpha = 32.0;
	float beta = 0.25;

	#ifdef IS_VIRT

		vec2 direction = vec2( 0.0, 1.0 );
	
	#else

		vec2 direction = vec2( 1.0, 0.0 );

	#endif

	float weight = 0.0;
	
	for(int i = 0; i < SSAOSAMPLE; i++){

		vec2 offset = float( i ) * direction;
		offset /= float( SSAOSAMPLE );
		offset -= direction * 0.5;
		offset *= uPPPixelSize * 32.0;

		vec2 uvOffset = vUv + offset;

		float x = float( i ) / float( SSAOSAMPLE ) - 0.5;

		vec3 normalOffset = texture( uNormalTexture, uvOffset ).xyz;
		float depthOffset = texture( uDepthTexture, uvOffset ).w;

		float bilateralWeight = pow( ( dot( normalBasis, normalOffset ) + 1.0 ) / 2.0, alpha ) * pow( 1.0 / ( abs( depthBasis - depthOffset ) + 0.001 ), beta );

		float w = uWeights[i] * bilateralWeight;

		occlusion += texture( uSSAOTexture, uvOffset ).x * w;

		weight += w;

	}

	occlusion /= weight;

	outColor = vec4( vec3( occlusion ), 1.0 );

}