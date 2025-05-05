#version 300 es

precision highp float;

// バーテックスシェーダーからの入力
in vec3 vColor;
in float vAlpha;
in vec3 vScale;
in vec4 vRotation;

// 出力カラー
out vec4 outColor;

// ガウシアン関数
float gaussian(vec2 point, vec2 mean, vec3 cov) {
    vec2 delta = point - mean;
    float exponent = -0.5 * (
        cov.x * delta.x * delta.x + 
        2.0 * cov.z * delta.x * delta.y + 
        cov.y * delta.y * delta.y
    );
    return exp(exponent);
}

// クォータニオンを使った回転
vec3 rotatePoint(vec3 point, vec4 q) {
    vec3 result = point;
    vec3 qv = vec3(q.x, q.y, q.z);
    vec3 uv = cross(qv, point);
    vec3 uuv = cross(qv, uv);
    result += 2.0 * ((uv * q.w) + uuv);
    return result;
}

void main() {
    // フラグメント座標をポイントの中心を原点とする座標系に変換
    vec2 pointCoord = gl_PointCoord * 2.0 - 1.0;
    
    // スケーリングと回転を適用して共分散行列を計算
    vec3 cov;
    // 簡易実装：実際にはスケールと回転から共分散行列を正確に計算する必要がある
    cov.x = vScale.x;
    cov.y = vScale.y;
    cov.z = 0.0; // 共分散の交差項

    // ガウシアン関数で透明度を計算
    float density = gaussian(pointCoord, vec2(0.0, 0.0), cov);
    
    // 閾値以下なら描画しない
    if (density < 0.01) {
        discard;
    }
    
    // 最終的なカラーと透明度を設定
    outColor = vec4(vColor, vAlpha * density);
} 