#include <common>
#include <frag_h>

// インスタンス入力変数（インクルードファイル内で定義されていない場合）
in vec3 vColor;
in float vAlpha;

// 球面調和関数用のテクスチャ座標
#ifdef USE_SH_TEXTURE
in vec2 vSHCoord;
#endif

void main( void ) {

    #include <frag_in>
    
    outColor = vec4(vColor, vAlpha);
    
    #include <frag_out>

}