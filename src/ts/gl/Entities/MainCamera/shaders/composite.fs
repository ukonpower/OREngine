#include <common>

uniform sampler2D backbuffer0;
uniform sampler2D uBloomTexture[4];

uniform vec3 cameraPosition;
uniform float cameraNear;
uniform float cameraFar;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

vec2 lens_distortion(vec2 r, float alpha) {
    return r * (1.0 - alpha * dot(r, r));
}

void main( void ) {
	vec3 col = vec3( 0.0, 0.0, 0.0 );
	vec2 uv = vUv;
	vec2 cuv = uv - 0.5;
	float w = 0.02;

	float d;
	float s = 1.0;

	#pragma loop_start 8
		d = -float( LOOP_INDEX ) / 8.0 * w;
        col.x += texture( backbuffer0, lens_distortion( cuv * s, d * 0.0 ) + 0.5 + vec2( (float( LOOP_INDEX ) / 8.0 - 0.5 ) * 0.002, 0.0 ) ).x;
        col.y += texture( backbuffer0, lens_distortion( cuv * s, d * 3.0 ) + 0.5 ).y;
        col.z += texture( backbuffer0, lens_distortion( cuv * s, d * 6.0 ) + 0.5 ).z;
	#pragma loop_end
	col.xyz /= 8.0;

	#pragma loop_start 4
		col += texture( uBloomTexture[ LOOP_INDEX ], cuv * s + 0.5 ).xyz * pow( (float(LOOP_INDEX) + 1.0) / 4.0, 1.0 ) * 1.0;
	#pragma loop_end

	float len = length(cuv);
	col *= smoothstep( 1.0, 0.4, len );
	col *= vec3( 1.01, 1.0, 0.98 );
	

	outColor = vec4( col, 1.0 );

}