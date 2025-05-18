#include <common>
#include <vert_h>

// インスタンス属性
in vec3 instancePosition;
in vec3 instanceColor;
in vec3 instanceScale;
in vec4 instanceRotation;
in float instanceAlpha;

// インスタンス出力変数（インクルードファイル内で定義されていない場合）
out vec3 vColor;
out float vAlpha;

// 球面調和関数用のテクスチャ座標
#ifdef USE_SH_TEXTURE
uniform vec2 uSHTexSize;
uniform float uPointCount;
uniform float uMaxCoeffCount;
out vec2 vSHCoord;
#endif

// クォータニオンを使った回転関数
vec3 rotateVector(vec4 q, vec3 v) {
    return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
}

void main( void ) {

    #include <vert_in>
    
    // インスタンス描画処理
    // オリジナルの頂点位置を取得
    vec3 transformedPosition = outPos;
    
    // インスタンスの回転を適用
    transformedPosition = rotateVector(instanceRotation, transformedPosition);
    
    // インスタンスのスケールを適用
    transformedPosition *= instanceScale;
    
    // インスタンスの位置を適用
    transformedPosition += instancePosition;
    
    // 変換後の位置で置き換え
    outPos = transformedPosition;
    
    // 色とアルファ値の設定
    vColor = instanceColor;
    vAlpha = instanceAlpha;
    
    // 球面調和関数のテクスチャ座標を計算
    #ifdef USE_SH_TEXTURE
    float pointIndex = float(gl_InstanceID);
    vSHCoord = vec2(
        uSHTexSize.x * (1.0 / uSHTexSize.x * 0.5),
        uSHTexSize.y * ((pointIndex * uMaxCoeffCount) / (uPointCount * uMaxCoeffCount) + 1.0 / uSHTexSize.y * 0.5)
    );
    #endif
    
    #include <vert_out>

}