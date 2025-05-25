#include <common>
#include <frag_h>

// インスタンス入力変数
in vec3 vColor;     // インスタンスの色（頂点シェーダーで計算済みの球面調和関数の色を含む）
in float vAlpha;    // インスタンスのアルファ値
in vec2 vCUv;

uniform sampler2D uPositionTexture;
uniform sampler2D uScaleTexture;
uniform sampler2D uRotationTexture;
uniform sampler2D uColorTexture;
uniform sampler2D uSortTex;

void main( void ) {
    #include <frag_in>

    float A = -dot(vCUv, vCUv);
    if (A < -4.0) discard;
    float B = exp(A) * vAlpha;
    outColor = vec4(B * vColor.rgb, B);

    #include <frag_out>
}