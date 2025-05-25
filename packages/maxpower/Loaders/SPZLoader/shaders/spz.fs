#include <common>
#include <frag_h>

// インスタンス入力変数
in vec3 vColor;     // インスタンスの色（頂点シェーダーで計算済みの球面調和関数の色を含む）
in float vAlpha;    // インスタンスのアルファ値
in vec2 vUV;        // 平面のUV座標（-1〜1にマッピング済み）
uniform sampler2D uSortTex;

void main( void ) {
    #include <frag_in>
    
    // // UVを使ってガウシアン関数の値を計算
    // // exp(-|p|²) の形式のガウシアン
    // float A = -dot(vUV, vUV);
    
    // // 閾値以下のピクセルは破棄（透明にする）
    // if (A < -4.0) {
    //     discard;
    // }
    
    // // ガウシアン関数からアルファ値を計算
    // float B = exp(A) * vAlpha;
    
    // // 頂点シェーダーから受け取った色を使用（球面調和関数の計算はすでに頂点シェーダーで完了）
    // vec3 color = vColor;
    
    // // カラーとアルファを適用
    // outColor = vec4(B * color, B);

    outColor = vec4( 1.0, 1.0, 1.0, 0.1);

    // outColor.xyz = texture( uSortTex, vUv ).xyz / 10000.0;
    // outColor.w *= 0.2;

    #include <frag_out>
}