#include <common>
#include <frag_h>
#include <noise_value>

layout (location = 0) out vec4 outColor;

void main( void ) {

	vec2 uv = vUv * 400.0;

	outColor.x = hashv( uv );
	outColor.y = hashv( uv  + 1.0);
	outColor.z = hashv( uv + 2.0 );
	outColor.w = hashv( uv + 3.0 );

} 