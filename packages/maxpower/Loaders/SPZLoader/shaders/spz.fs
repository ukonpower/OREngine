#include <common>
#include <frag_h>

// インスタンス入力変数
in vec3 vColor;     // インスタンスの色（頂点シェーダーで計算済みの球面調和関数の色を含む）
in float vAlpha;    // インスタンスのアルファ値
in vec2 vNormalizedUV;

uniform sampler2D uPositionTexture;
uniform sampler2D uScaleTexture;
uniform sampler2D uRotationTexture;
uniform sampler2D uColorTexture;
uniform sampler2D uSortTex;

void main( void ) {
    #include <frag_in>
    
    // // UVを使ってガウシアン関数の値を計算
    // // exp(-|p|²) の形式のガウシアン
    float A = -dot(vNormalizedUV, vNormalizedUV);
    
    // // 閾値以下のピクセルは破棄（透明にする）
    // if (A < -4.0) {
    //     discard;
    // }
    
    // // ガウシアン関数からアルファ値を計算
    float B = exp(A) * vAlpha;
    
    // // 頂点シェーダーから受け取った色を使用（球面調和関数の計算はすでに頂点シェーダーで完了）
    vec3 color = vColor;
    
    // // カラーとアルファを適用
    outColor = vec4(B * color, B);

    // outColor = vec4( 1.0, 1.0, 1.0, 0.1);

    // outColor.xyz = texture( uPositionTexture, vUv ).xyz / 1.0;
    // outColor.w = 1.0;

    #include <frag_out>
}