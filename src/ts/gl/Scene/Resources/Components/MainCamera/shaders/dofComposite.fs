#include <common>

uniform sampler2D backbuffer0;
uniform sampler2D uBokeTex;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

// https://github.com/keijiro/KinoBokeh/blob/master/Assets/Kino/Bokeh/Shader/Composition.cginc

// Fragment shader: Additional blur
vec4 frag_Blur2(vec2 uv) {
	vec2 _MainTex_TexelSize = vec2( 1.0 ) / vec2( textureSize( backbuffer0, 0 ) );
	
    // 9-tap tent filter
    vec4 duv = _MainTex_TexelSize.xyxy * vec4(1, 1, -1, 0);
    vec4 acc;

    acc  = texture(backbuffer0, uv - duv.xy);
    acc += texture(backbuffer0, uv - duv.wy) * 2.0;
    acc += texture(backbuffer0, uv - duv.zy);

    acc += texture(backbuffer0, uv + duv.zw) * 2.0;
    acc += texture(backbuffer0, uv         ) * 4.0;
    acc += texture(backbuffer0, uv + duv.xw) * 2.0;

    acc += texture(backbuffer0, uv + duv.zy);
    acc += texture(backbuffer0, uv + duv.wy) * 2.0;
    acc += texture(backbuffer0, uv + duv.xy);

    return acc / 16.0;
}

void main( void ) {

	vec4 cs = texture(backbuffer0, vUv);
    vec4 cb = texture(uBokeTex, vUv);
	#if defined(UNITY_COLORSPACE_GAMMA)
		cs.rgb = GammaToLinearSpace(cs.rgb);
	#endif
		vec3 rgb = cs.rgb * cb.a + cb.rgb;
	#if defined(UNITY_COLORSPACE_GAMMA)
		rgb = LinearToGammaSpace(rgb);
	#endif

    outColor = vec4(rgb, cs.a);

}