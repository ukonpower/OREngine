precision highp float;
in vec2 vUv;
uniform sampler2D uSrcTexture;
out vec4 fragColor;

void main() {
	fragColor = vec4( texture( uSrcTexture, vUv ).rgb, 1.0 );
}
