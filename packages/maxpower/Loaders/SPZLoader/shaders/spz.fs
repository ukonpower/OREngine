#include <common>

// バーテックスシェーダーからの入力
in vec3 vColor;
in float vAlpha;
in vec3 vScale;
in vec4 vRotation;
in vec3 vViewSpacePosition;

// 球面調和関数係数の入力
#ifdef USE_SPHERICAL_HARMONICS
    #ifndef USE_SH_TEXTURE
        #if SH_DEGREE == 0
            in vec3 vSphericalHarmonics;
        #elif SH_DEGREE == 1
            in vec3 vSphericalHarmonics[4];
        #elif SH_DEGREE == 2
            in vec3 vSphericalHarmonics[9];
        #endif
    #else
        // テクスチャから球面調和関数係数を読み取るための追加ユニフォーム
        uniform sampler2D uSHTexture;
        uniform vec2 uSHTexSize;
        uniform float uPointCount;
        // 頂点IDを頂点シェーダーから受け取る
        flat in float vVertexID;
    #endif
#endif

// 出力カラー
out vec4 outColor;

// 球面調和関数の係数
const float SH_C0 = 0.28209479177387814;
const float SH_C1 = 0.4886025119029199;
const float SH_C2_0 = 1.0925484305920792;
const float SH_C2_1 = 0.31539156525252005;
const float SH_C2_2 = 0.5462742152960395;
const float SH_C3_0 = 0.5900435899266435;
const float SH_C3_1 = 2.890611442640554;
const float SH_C3_2 = 0.4570457994644658;
const float SH_C3_3 = 0.3731763325901154;

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
    vec3 qv = vec3(q.x, q.y, q.z);
    return point + 2.0 * cross(qv, cross(qv, point) + q.w * point);
}

// テクスチャから球面調和関数係数を取得
#ifdef USE_SH_TEXTURE
vec3 getSHCoeffFromTexture(int vertexID, int coeffID) {
    int pixelIndex = vertexID * 16 + coeffID;
    int tx = pixelIndex % int(uSHTexSize.x);
    int ty = pixelIndex / int(uSHTexSize.x);
    vec2 uv = vec2(float(tx) + 0.5, float(ty) + 0.5) / uSHTexSize;
    vec4 texValue = texture(uSHTexture, uv);
    return texValue.rgb;
}
#endif

// 球面調和関数の評価
#ifdef USE_SPHERICAL_HARMONICS
vec3 evaluateSH(vec3 direction) {
    // 方向ベクトルを正規化
    vec3 dir = normalize(direction);
    
    // 各次数の球面調和関数の値を計算
    vec3 color = vec3(0.0);
    
    // 0次 (定数項)
    #if SH_DEGREE >= 0
        #ifndef USE_SH_TEXTURE
            #if SH_DEGREE == 0
                color += vSphericalHarmonics * SH_C0;
            #else
                color += vSphericalHarmonics[0] * SH_C0;
            #endif
        #else
            color += getSHCoeffFromTexture(int(vVertexID), 0) * SH_C0;
        #endif
    #endif
    
    // 1次
    #if SH_DEGREE >= 1
        #ifndef USE_SH_TEXTURE
            color += vSphericalHarmonics[1] * (SH_C1 * dir.y);
            color += vSphericalHarmonics[2] * (SH_C1 * dir.z);
            color += vSphericalHarmonics[3] * (SH_C1 * dir.x);
        #else
            color += getSHCoeffFromTexture(int(vVertexID), 1) * (SH_C1 * dir.y);
            color += getSHCoeffFromTexture(int(vVertexID), 2) * (SH_C1 * dir.z);
            color += getSHCoeffFromTexture(int(vVertexID), 3) * (SH_C1 * dir.x);
        #endif
    #endif
    
    // 2次
    #if SH_DEGREE >= 2
        #ifndef USE_SH_TEXTURE
            color += vSphericalHarmonics[4] * (SH_C2_0 * dir.x * dir.y);
            color += vSphericalHarmonics[5] * (SH_C2_0 * dir.y * dir.z);
            color += vSphericalHarmonics[6] * (SH_C2_1 * (3.0 * dir.z * dir.z - 1.0));
            color += vSphericalHarmonics[7] * (SH_C2_0 * dir.x * dir.z);
            color += vSphericalHarmonics[8] * (SH_C2_2 * (dir.x * dir.x - dir.y * dir.y));
        #else
            color += getSHCoeffFromTexture(int(vVertexID), 4) * (SH_C2_0 * dir.x * dir.y);
            color += getSHCoeffFromTexture(int(vVertexID), 5) * (SH_C2_0 * dir.y * dir.z);
            color += getSHCoeffFromTexture(int(vVertexID), 6) * (SH_C2_1 * (3.0 * dir.z * dir.z - 1.0));
            color += getSHCoeffFromTexture(int(vVertexID), 7) * (SH_C2_0 * dir.x * dir.z);
            color += getSHCoeffFromTexture(int(vVertexID), 8) * (SH_C2_2 * (dir.x * dir.x - dir.y * dir.y));
        #endif
    #endif
    
    // 3次 
    #if SH_DEGREE >= 3
        #ifdef USE_SH_TEXTURE
            color += getSHCoeffFromTexture(int(vVertexID), 9) * (SH_C3_0 * (3.0 * dir.x * dir.x - 1.0) * dir.y);
            color += getSHCoeffFromTexture(int(vVertexID), 10) * (SH_C3_0 * dir.x * dir.y * dir.z);
            color += getSHCoeffFromTexture(int(vVertexID), 11) * (SH_C3_1 * dir.y * (5.0 * dir.z * dir.z - 1.0));
            color += getSHCoeffFromTexture(int(vVertexID), 12) * (SH_C3_1 * dir.z * (5.0 * dir.z * dir.z - 3.0));
            color += getSHCoeffFromTexture(int(vVertexID), 13) * (SH_C3_1 * dir.x * (5.0 * dir.z * dir.z - 1.0));
            color += getSHCoeffFromTexture(int(vVertexID), 14) * (SH_C3_2 * dir.z * (dir.x * dir.x - dir.y * dir.y));
            color += getSHCoeffFromTexture(int(vVertexID), 15) * (SH_C3_3 * dir.x * (dir.x * dir.x - 3.0 * dir.y * dir.y));
        #endif
    #endif
    
    return max(color, vec3(0.0)); // 負の値はクランプ
}
#endif

void main() {
    // フラグメント座標をポイントの中心を原点とする座標系に変換
    vec2 pointCoord = gl_PointCoord * 2.0 - 1.0;
    
    // 楕円ガウシアンの共分散行列を計算
    vec4 q = vRotation;
    
    // スケールと回転から3x3の共分散行列を作成
    // 注: 実際のガウシアンスプラットでは、これはより複雑な計算になる
    mat3 R = mat3(
        1.0 - 2.0 * (q.y * q.y + q.z * q.z), 2.0 * (q.x * q.y - q.z * q.w), 2.0 * (q.x * q.z + q.y * q.w),
        2.0 * (q.x * q.y + q.z * q.w), 1.0 - 2.0 * (q.x * q.x + q.z * q.z), 2.0 * (q.y * q.z - q.x * q.w),
        2.0 * (q.x * q.z - q.y * q.w), 2.0 * (q.y * q.z + q.x * q.w), 1.0 - 2.0 * (q.x * q.x + q.y * q.y)
    );
    
    // スケール行列
    mat3 S = mat3(
        vScale.x, 0.0, 0.0,
        0.0, vScale.y, 0.0,
        0.0, 0.0, vScale.z
    );
    
    // 共分散行列 = R * S * S * R^T
    // 2D投影のために2x2部分を抽出
    vec3 cov;
    mat3 Sigma = R * S * S * transpose(R);
    cov.x = Sigma[0][0];
    cov.y = Sigma[1][1];
    cov.z = Sigma[0][1]; // 共分散の交差項
    
    // ガウシアン関数で密度を計算
    float density = gaussian(pointCoord, vec2(0.0, 0.0), cov);
    
    // 密度の閾値以下なら描画しない
    #ifdef USE_ANTIALIAS
        // アンチエイリアス処理ありの場合は、徐々にフェードアウト
        if (density < 0.05) discard;
        if (density < 0.1) density *= density * 10.0;
    #else
        // アンチエイリアスなしの場合は単純なカットオフ
        if (density < 0.1) discard;
    #endif
    
    // カラーの計算
    vec3 finalColor = vColor;
    
    // 球面調和関数からカラーを評価（設定されている場合）
    #ifdef USE_SPHERICAL_HARMONICS
        // ビュー空間内のスプラットから視点方向を計算
        vec3 viewDir = normalize(-vViewSpacePosition);
        
        // ローカル座標系に変換（回転の逆変換）
        // 注: クォータニオンの共役（反転）を使用
        vec4 qInv = vec4(-q.x, -q.y, -q.z, q.w);
        vec3 localViewDir = rotatePoint(viewDir, qInv);
        
        // 球面調和関数を評価してカラーを更新
        finalColor = evaluateSH(localViewDir);
    #endif
    
    // 最終的なカラーと透明度を設定
    outColor = vec4(finalColor, vAlpha * density);
} 