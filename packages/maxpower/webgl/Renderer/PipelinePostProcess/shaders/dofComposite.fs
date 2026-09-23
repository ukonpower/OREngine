#include <module:common>

uniform sampler2D uBackBuffer0;
uniform sampler2D uBokeTex;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

// https://github.com/keijiro/KinoBokeh/blob/master/Assets/Kino/Bokeh/Shader/Composition.cginc

// Fragment shader: Upsampling and composition
void main( void ) {

	vec4 cs = texture(uBackBuffer0, vUv);
	vec4 cb = texture(uBokeTex, vUv);

	outColor = vec4(cs.rgb * cb.a + cb.rgb, cs.a);

}
