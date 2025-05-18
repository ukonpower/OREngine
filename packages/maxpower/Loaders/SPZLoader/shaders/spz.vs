#include <common>
#include <vert_h>

// インスタンス属性
in vec3 instancePosition;
in vec3 instanceColor;
in vec3 instanceScale;
in vec4 instanceRotation;
in float instanceAlpha;

// インスタンス出力変数
out vec3 vColor;
out float vAlpha;
out vec2 vUV;  // -1〜1の範囲にマッピングされたUV座標

// クォータニオンを使った回転関数
vec3 rotateVector(vec4 q, vec3 v) {
    return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
}

// 頂点のスケール係数を計算する関数
float getScaleFactor(vec3 scale) {
    // スケールの最大値を使用
    return max(max(scale.x, scale.y), scale.z);
}

void main( void ) {
    #include <vert_in>
    
    // UVを-1〜1の範囲にマッピング
    vUV = 2.0 * uv - 1.0;
    
    // 色とアルファ値を設定
    vColor = instanceColor;
    vAlpha = instanceAlpha;
    
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
    
    #include <vert_out>
}