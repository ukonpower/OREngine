uniform sampler2D backbuffer0;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	vec4 c = texture( backbuffer0, vUv );
  
	vec3 f;
	f = max( c.xyz - 1.0, vec3( 0.0 ) ) / 18.0;

	outColor = vec4( f, 1.0 );
	
}