layout ( location = 0 ) in vec3 position;
layout ( location = 1 ) in vec2 uv;

out vec2 vUv;


void main( void ) {

	vec3 pos = position;
	gl_Position = vec4( pos.xy, 0.0, 1.0 );
	vUv = uv;

}