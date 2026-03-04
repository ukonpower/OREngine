uniform sampler2D uMaskTexture;
uniform vec3 uOutlineColor;
uniform vec2 uPPResolution;

in vec2 vUv;

layout( location = 0 ) out vec4 outColor;

void main( void ) {

	vec4 scene = texture( uBackBuffer0, vUv );

	float texelX = 1.0 / uPPResolution.x;
	float texelY = 1.0 / uPPResolution.y;

	float c = texture( uMaskTexture, vUv ).r;
	float l = texture( uMaskTexture, vUv + vec2( -texelX, 0.0 ) ).r;
	float r = texture( uMaskTexture, vUv + vec2(  texelX, 0.0 ) ).r;
	float t = texture( uMaskTexture, vUv + vec2( 0.0,  texelY ) ).r;
	float b = texture( uMaskTexture, vUv + vec2( 0.0, -texelY ) ).r;
	float tl = texture( uMaskTexture, vUv + vec2( -texelX,  texelY ) ).r;
	float tr = texture( uMaskTexture, vUv + vec2(  texelX,  texelY ) ).r;
	float bl = texture( uMaskTexture, vUv + vec2( -texelX, -texelY ) ).r;
	float br = texture( uMaskTexture, vUv + vec2(  texelX, -texelY ) ).r;

	float edge = abs( c - l ) + abs( c - r ) + abs( c - t ) + abs( c - b )
		+ abs( c - tl ) * 0.7 + abs( c - tr ) * 0.7 + abs( c - bl ) * 0.7 + abs( c - br ) * 0.7;

	edge = smoothstep( 0.05, 0.2, edge );

	outColor = mix( scene, vec4( uOutlineColor, 1.0 ), edge );

}
