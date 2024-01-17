#include <common>
#include <noise>

uniform float uTime;
uniform sampler2D uCocTex;
uniform vec4 uParams;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

const int BOKEH_SAMPLE = 16;
const vec2 kDiskKernel[BOKEH_SAMPLE] = vec2[](
    vec2(0,0),
    vec2(0.54545456,0),
    vec2(0.16855472,0.5187581),
    vec2(-0.44128203,0.3206101),
    vec2(-0.44128197,-0.3206102),
    vec2(0.1685548,-0.5187581),
    vec2(1,0),
    vec2(0.809017,0.58778524),
    vec2(0.30901697,0.95105654),
    vec2(-0.30901703,0.9510565),
    vec2(-0.80901706,0.5877852),
    vec2(-1,0),
    vec2(-0.80901694,-0.58778536),
    vec2(-0.30901664,-0.9510566),
    vec2(0.30901712,-0.9510565),
    vec2(0.80901694,-0.5877853)
);

// #define BOKEH_SAMPLE 43
// vec2 kDiskKernel[ BOKEH_SAMPLE ] = vec2[](
//     vec2(0,0),
//     vec2(0.36363637,0),
//     vec2(0.22672357,0.28430238),
//     vec2(-0.08091671,0.35451925),
//     vec2(-0.32762504,0.15777594),
//     vec2(-0.32762504,-0.15777591),
//     vec2(-0.08091656,-0.35451928),
//     vec2(0.22672352,-0.2843024),
//     vec2(0.6818182,0),
//     vec2(0.614297,0.29582983),
//     vec2(0.42510667,0.5330669),
//     vec2(0.15171885,0.6647236),
//     vec2(-0.15171883,0.6647236),
//     vec2(-0.4251068,0.53306687),
//     vec2(-0.614297,0.29582986),
//     vec2(-0.6818182,0),
//     vec2(-0.614297,-0.29582983),
//     vec2(-0.42510656,-0.53306705),
//     vec2(-0.15171856,-0.66472363),
//     vec2(0.1517192,-0.6647235),
//     vec2(0.4251066,-0.53306705),
//     vec2(0.614297,-0.29582983),
//     vec2(1,0),
//     vec2(0.9555728,0.2947552),
//     vec2(0.82623875,0.5633201),
//     vec2(0.6234898,0.7818315),
//     vec2(0.36534098,0.93087375),
//     vec2(0.07473,0.9972038),
//     vec2(-0.22252095,0.9749279),
//     vec2(-0.50000006,0.8660254),
//     vec2(-0.73305196,0.6801727),
//     vec2(-0.90096885,0.43388382),
//     vec2(-0.98883086,0.14904208),
//     vec2(-0.9888308,-0.14904249),
//     vec2(-0.90096885,-0.43388376),
//     vec2(-0.73305184,-0.6801728),
//     vec2(-0.4999999,-0.86602545),
//     vec2(-0.222521,-0.9749279),
//     vec2(0.07473029,-0.99720377),
//     vec2(0.36534148,-0.9308736),
//     vec2(0.6234897,-0.7818316),
//     vec2(0.8262388,-0.56332),
//     vec2(0.9555729,-0.29475483)
// );

// Fragment shader: Bokeh filter with disk-shaped kernels
void main( void ) {

	float _MaxCoC = uParams.y;
	float _RcpMaxCoC = uParams.z;
	vec2 _MainTex_TexelSize = vec2( 1.0 ) / vec2( textureSize( uCocTex, 0 ) );
	float _RcpAspect = _MainTex_TexelSize.x / _MainTex_TexelSize.y;
	// sampler2D _MainTex = uCocTex;

    vec4 samp0 = texture(uCocTex, vUv);

    vec4 bgAcc = vec4(0.0); // Background: far field bokeh
    vec4 fgAcc = vec4(0.0); // Foreground: near field bokeh

    for (int si = 0; si < BOKEH_SAMPLE; si++)
    {
        vec2 disp = kDiskKernel[si] * _MaxCoC;
        float dist = length(disp);

        vec2 duv = vec2(disp.x * _RcpAspect, disp.y);
        vec4 samp = texture(uCocTex, vUv + duv);

        // BG: Compare CoC of the current sample and the center sample
        // and select smaller one.
        float bgCoC = max(min(samp0.a, samp.a), 0.0);

        // Compare the CoC to the sample distance.
        // Add a small margin to smooth out.
        float margin = _MainTex_TexelSize.y * 2.0;
        float bgWeight = clamp((bgCoC   - dist + margin ) / margin, 0.0, 1.0);
        float fgWeight = clamp((-samp.a - dist + margin ) / margin, 0.0, 1.0);

        // Cut influence from focused areas because they're darkened by CoC
        // premultiplying. This is only needed for near field.
        fgWeight *= step(_MainTex_TexelSize.y, -samp.a);

        // Accumulation
        bgAcc += vec4(samp.rgb, 1.0) * bgWeight;
        fgAcc += vec4(samp.rgb, 1.0) * fgWeight;
    }

    // Get the weighted average.
    bgAcc.rgb /= bgAcc.a + (bgAcc.a == 0.0 ? 1.0 : 0.0 ); // zero-div guard
    fgAcc.rgb /= fgAcc.a + (fgAcc.a == 0.0 ? 1.0 : 0.0 );

    // BG: Calculate the alpha value only based on the center CoC.
    // This is a rather aggressive approximation but provides stable results.
    bgAcc.a = smoothstep(_MainTex_TexelSize.y, _MainTex_TexelSize.y * 2.0, samp0.a);

    // FG: Normalize the total of the weights.
    fgAcc.a *= PI / float(BOKEH_SAMPLE);

    // Alpha premultiplying
    vec3 rgb = vec3( 0.0 );
    rgb = mix(rgb, bgAcc.rgb, clamp(bgAcc.a, 0.0, 1.0));
    rgb = mix(rgb, fgAcc.rgb, clamp(fgAcc.a, 0.0, 1.0));

    // Combined alpha value
    float alpha = (1.0 - clamp(bgAcc.a, 0.0, 1.0)) * (1.0 - clamp(fgAcc.a, 0.0, 1.0));

    outColor = vec4(rgb, alpha);
}