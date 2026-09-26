#include <module:common>

uniform sampler2D uBokeTex;
uniform vec2 uPPPixelSize;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

// https://github.com/keijiro/KinoBokeh/blob/master/Assets/Kino/Bokeh/Shader/Composition.cginc

// Fragment shader: Additional blur
void main( void ) {

	// 9-tap tent filter
	vec4 duv = uPPPixelSize.xyxy * vec4(1, 1, -1, 0);
	vec4 acc;

	acc  = texture(uBokeTex, vUv - duv.xy);
	acc += texture(uBokeTex, vUv - duv.wy) * 2.0;
	acc += texture(uBokeTex, vUv - duv.zy);

	acc += texture(uBokeTex, vUv + duv.zw) * 2.0;
	acc += texture(uBokeTex, vUv         ) * 4.0;
	acc += texture(uBokeTex, vUv + duv.xw) * 2.0;

	acc += texture(uBokeTex, vUv + duv.zy);
	acc += texture(uBokeTex, vUv + duv.wy) * 2.0;
	acc += texture(uBokeTex, vUv + duv.xy);

	outColor = acc / 16.0;

}
