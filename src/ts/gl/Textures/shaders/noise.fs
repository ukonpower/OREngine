#include <common>
#include <frag_h>
#include <noise>

layout (location = 0) out vec4 outColor;


void main( void ) {

	vec2 v = vUv * 15.0;
	vec2 lv = abs( vUv - 0.5 ) * 15.0;
	float lw = sin( vUv.x * PI ) * sin( vUv.y * PI );

	outColor.x += mix( fbm( vec3( lv, 0.0 ) ), fbm( vec3( v, 0.0 ) ), lw );
	outColor.y += mix( fbm( vec3( lv, 100.0 ) ), fbm( vec3( v, 100.0 ) ), lw );
	outColor.z += mix( fbm( vec3( lv, 200.0 ) ), fbm( vec3( v, 200.0 ) ), lw );
	outColor.w += mix( fbm( vec3( lv, 300.0 ) ), fbm( vec3( v, 300.0 ) ), lw );

} 