#include <common>
#include <frag_h>

// インスタンス入力変数
in vec3 vColor;     // インスタンスの色
in float vAlpha;    // インスタンスのアルファ値
in vec2 vUV;        // 平面のUV座標（-1〜1にマッピング済み）

void main( void ) {
    #include <frag_in>
    
    // UVを使ってガウシアン関数の値を計算
    // exp(-|p|²) の形式のガウシアン
    float A = -dot(vUV, vUV);
    
    // 閾値以下のピクセルは破棄（透明にする）
    if (A < -4.0) {
        discard;
    }
    
    // ガウシアン関数からアルファ値を計算
    float B = exp(A) * vAlpha;
    
    // カラーとアルファを適用
    outColor = vec4(B * vColor, B);
    
    #include <frag_out>
}