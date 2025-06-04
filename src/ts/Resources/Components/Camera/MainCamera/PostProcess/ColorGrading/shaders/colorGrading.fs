#include <common>

uniform sampler2D uBackBuffer0;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

float grayScale( vec3 color ) {
	float gray = dot( color, vec3( 0.299, 0.587, 0.114 ) );
	return gray;
}

vec3 contrast( vec3 color, float contrast ) {
	return ( color - 0.5 ) * contrast + 0.5;
}

void main( void ) {

	vec3 col = texture( uBackBuffer0, vUv ).xyz;

	// float gs = grayScale( col.xyz );
	// col.xyz = mix( col.xyz, vec3( gs ), 0.8 );
	// col.xyz = contrast( col.xyz + 0.1, 1.4 );
	
	outColor = vec4( col, 1.0 );

}