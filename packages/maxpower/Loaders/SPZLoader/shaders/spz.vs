#include <common>

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform float uSplatSize;

// ガウシアンスプラットの属性
in vec3 position;
in vec3 scale;
in vec4 rotation;
in vec3 color;
in float alpha;

// 球面調和関数係数 (最大16個の係数x RGB=48)
// WebGLでは「in」修飾子のついた配列は直接宣言できないため、個別の変数として宣言
#ifdef USE_SPHERICAL_HARMONICS
    #ifndef USE_SH_TEXTURE
        #if SH_DEGREE == 0
            in vec3 sphericalHarmonics;
        #elif SH_DEGREE == 1
            // 個別の入力変数として宣言
            in vec3 sh0;
            in vec3 sh1;
            in vec3 sh2;
            in vec3 sh3;
        #elif SH_DEGREE == 2
            in vec3 sh0;
            in vec3 sh1;
            in vec3 sh2;
            in vec3 sh3;
            in vec3 sh4;
            in vec3 sh5;
            in vec3 sh6;
            in vec3 sh7;
            in vec3 sh8;
        #endif
    #endif
#endif

// 出力用変数
out vec3 vColor;
out float vAlpha;
out vec3 vScale;
out vec4 vRotation;
out vec3 vViewSpacePosition;

// テクスチャ使用時に頂点IDを渡す
#ifdef USE_SH_TEXTURE
    flat out float vVertexID;
#endif

// 球面調和関数係数の出力
#ifdef USE_SPHERICAL_HARMONICS
    #ifndef USE_SH_TEXTURE
        #if SH_DEGREE == 0
            out vec3 vSphericalHarmonics;
        #elif SH_DEGREE == 1
            out vec3 vSphericalHarmonics[4];
        #elif SH_DEGREE == 2
            out vec3 vSphericalHarmonics[9];
        #endif
    #endif
#endif

void main() {
    // モデル座標系からワールド座標系への変換
    vec4 worldPosition = uModelMatrix * vec4(position, 1.0);
    
    // ビュー座標系への変換
    vec4 viewPosition = uViewMatrix * worldPosition;
    vViewSpacePosition = viewPosition.xyz;
    
    // 射影変換
    gl_Position = uProjectionMatrix * viewPosition;
    
    // スプラットのサイズとスケールに基づいてポイントサイズを設定
    // スケールの最大値を使用
    float maxScale = max(max(scale.x, scale.y), scale.z);
    gl_PointSize = uSplatSize * maxScale;
    
    // フラグメントシェーダーに送る変数
    vColor = color;
    vAlpha = alpha;
    vScale = scale;
    vRotation = rotation;
    
    // テクスチャ使用時は頂点IDを渡す
    #ifdef USE_SH_TEXTURE
        vVertexID = float(gl_VertexID);
    #endif
    
    // 球面調和関数係数の受け渡し
    #ifdef USE_SPHERICAL_HARMONICS
        #ifndef USE_SH_TEXTURE
            #if SH_DEGREE == 0
                vSphericalHarmonics = sphericalHarmonics;
            #elif SH_DEGREE == 1
                // 個別の変数から配列に設定
                vSphericalHarmonics[0] = sh0;
                vSphericalHarmonics[1] = sh1;
                vSphericalHarmonics[2] = sh2;
                vSphericalHarmonics[3] = sh3;
            #elif SH_DEGREE == 2
                vSphericalHarmonics[0] = sh0;
                vSphericalHarmonics[1] = sh1;
                vSphericalHarmonics[2] = sh2;
                vSphericalHarmonics[3] = sh3;
                vSphericalHarmonics[4] = sh4;
                vSphericalHarmonics[5] = sh5;
                vSphericalHarmonics[6] = sh6;
                vSphericalHarmonics[7] = sh7;
                vSphericalHarmonics[8] = sh8;
            #endif
        #endif
    #endif
} 