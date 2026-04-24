precision highp float;
in vec2 vUv;
uniform sampler2D uPreviewTex;
out vec4 fragColor;

void main() {
	fragColor = vec4( texture( uPreviewTex, vUv ).rgb, 1.0 );
}
