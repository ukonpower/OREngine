
uniform sampler2D backbuffer0;
uniform vec2 uPPResolution;

layout (location = 0) out vec4 outColor;

in vec2 vUv;

void main(void) {

	vec4 backColor = texture(backbuffer0, vUv);

	outColor = vec4( 0.0, 0.0, 0.0 , 1.0 );
	outColor.xyz = backColor.xyz;
  
}