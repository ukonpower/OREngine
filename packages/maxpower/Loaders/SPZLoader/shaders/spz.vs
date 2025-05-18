#include <common>
#include <vert_h>

// インスタンスID属性
in float instanceId;

// インスタンス出力変数
out vec3 vColor;      // 色情報（計算済みの球面調和関数の色を含む）
out float vAlpha;     // アルファ値
out vec2 vUV;         // UV座標

// データテクスチャ用のユニフォーム
#ifdef USE_TEXTURE_DATA
uniform sampler2D uDataTexture;
uniform vec2 uDataTexSize;
uniform float uPointCount;
#endif

// 深度ソート用のユニフォーム
#ifdef USE_SORTING
uniform sampler2D uSortIndices;
uniform vec2 uSortIndicesSize;
uniform float uSortEnabled;
#endif

// 球面調和関数用のテクスチャ座標
#ifdef USE_SH_TEXTURE
uniform sampler2D uSHTexture;
uniform vec2 uSHTexSize;
uniform float uSHCoeffCount;
uniform float uMaxCoeffCount;
#endif

// クォータニオンを使った回転関数
vec3 rotateVector(vec4 q, vec3 v) {
    return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
}

// テクスチャから実際のインスタンスIDを取得する関数
float getActualInstanceId(float instanceId) {
    #ifdef USE_SORTING
    if (uSortEnabled > 0.5) {
        // ソートテクスチャから実際のIDを取得
        float idx = instanceId;
        float x = mod(idx, uSortIndicesSize.x);
        float y = floor(idx / uSortIndicesSize.x);
        vec2 uv = vec2(x + 0.5, y + 0.5) / uSortIndicesSize;
        return texture(uSortIndices, uv).r;
    }
    #endif
    
    return instanceId;
}

// テクスチャからインスタンスデータを取得する関数
void fetchInstanceData(float instanceId, out vec3 position, out vec3 scale, out vec4 rotation, out vec3 color, out float alpha) {
    #ifdef USE_TEXTURE_DATA
    // テクスチャからインスタンスデータを取得
    float actualId = getActualInstanceId(instanceId);
    
    // 位置データのテクセル座標を計算（各インスタンスは2テクセルを使用）
    float posIdx = actualId * 2.0;
    float tx1 = mod(posIdx, uDataTexSize.x);
    float ty1 = floor(posIdx / uDataTexSize.x);
    vec2 posUV = vec2(tx1 + 0.5, ty1 + 0.5) / uDataTexSize;
    
    // 位置とアルファ値を取得
    vec4 posData = texture(uDataTexture, posUV);
    position = posData.xyz;
    alpha = posData.w;
    
    // スケール・色データのテクセル座標を計算（位置の次のテクセル）
    float tx2 = mod(posIdx + 1.0, uDataTexSize.x);
    float ty2 = floor((posIdx + 1.0) / uDataTexSize.x);
    vec2 attrUV = vec2(tx2 + 0.5, ty2 + 0.5) / uDataTexSize;
    
    // スケールと色情報を取得
    vec4 attrData = texture(uDataTexture, attrUV);
    scale = attrData.xyz;
    
    // 色情報のビットアンパック
    uint colorBits = floatBitsToUint(attrData.w);
    color = vec3(
        float(colorBits & 0xFFu) / 255.0,
        float((colorBits >> 8) & 0xFFu) / 255.0,
        float((colorBits >> 16) & 0xFFu) / 255.0
    );
    
    // 回転データのテクセル座標を計算（別のテクスチャ領域）
    float rotOffset = uPointCount * 2.0; // 位置とスケールの後
    float rotIdx = rotOffset + actualId;
    float tx3 = mod(rotIdx, uDataTexSize.x);
    float ty3 = floor(rotIdx / uDataTexSize.x);
    vec2 rotUV = vec2(tx3 + 0.5, ty3 + 0.5) / uDataTexSize;
    
    // 回転情報（クォータニオン）を取得
    rotation = texture(uDataTexture, rotUV);
    #else
    // アトリビュートベースのフォールバック（互換性のため）
    position = instancePosition;
    scale = instanceScale;
    rotation = instanceRotation;
    color = instanceColor;
    alpha = instanceAlpha;
    #endif
}

// 球面調和関数の計算
#ifdef USE_SPHERICAL_HARMONICS
// 球面調和関数のY_lm基底関数実装
// 単位球面上の方向ベクトルに対して球面調和関数の値を計算
vec3 computeSHColor(vec3 normal, float pointIndex) {
    // ディレクション方向のサンプリングに使用する正規化方向
    vec3 dir = normalize(normal);
    
    // SH基底関数
    // 0次の定数項
    float Y00 = 0.2820947917738781; // 1/sqrt(4π)
    
    // 1次の基底関数
    float Y1m1 = -0.4886025119029199 * dir.y; // -sqrt(3/4π) * y
    float Y10 = 0.4886025119029199 * dir.z;    // sqrt(3/4π) * z
    float Y11 = -0.4886025119029199 * dir.x;   // -sqrt(3/4π) * x
    
    // テクスチャ座標を計算
    vec2 shCoord = vec2(
        uSHTexSize.x * (1.0 / uSHTexSize.x * 0.5),
        uSHTexSize.y * ((pointIndex * uMaxCoeffCount) / (uPointCount * uMaxCoeffCount) + 1.0 / uSHTexSize.y * 0.5)
    );
    
    // 球面調和関数のテクスチャから係数を取得
    vec3 color = texture(uSHTexture, shCoord).rgb * Y00;
    
    // テクスチャの次のテクセルに1次の係数がある
    float baseU = shCoord.x;
    float baseV = shCoord.y;
    
    // 1次の係数取得（テクスチャの次の3つのテクセル）
    vec2 texCoord1m1 = vec2(
        baseU + (1.0 / uSHTexSize.x),
        baseV
    );
    
    vec2 texCoord10 = vec2(
        baseU + (2.0 / uSHTexSize.x),
        baseV
    );
    
    vec2 texCoord11 = vec2(
        baseU + (3.0 / uSHTexSize.x),
        baseV
    );
    
    vec3 coeff1m1 = texture(uSHTexture, texCoord1m1).rgb;
    vec3 coeff10 = texture(uSHTexture, texCoord10).rgb;
    vec3 coeff11 = texture(uSHTexture, texCoord11).rgb;
    
    // 1次の寄与を加算
    color += coeff1m1 * Y1m1;
    color += coeff10 * Y10;
    color += coeff11 * Y11;
    
    #if SH_DEGREE >= 2
    // 2次の基底関数（SHの次数が2以上の場合）
    float Y2m2 = 1.0925484305920792 * dir.x * dir.y;                  // √(15/4π) * xy
    float Y2m1 = -1.0925484305920792 * dir.y * dir.z;                 // -√(15/4π) * yz
    float Y20 = 0.31539156525252005 * (3.0 * dir.z * dir.z - 1.0);    // √(5/16π) * (3z²-1)
    float Y21 = -1.0925484305920792 * dir.x * dir.z;                  // -√(15/4π) * xz
    float Y22 = 0.54627421529603959 * (dir.x * dir.x - dir.y * dir.y); // √(15/16π) * (x²-y²)
    
    // 2次の係数取得（テクスチャの次の5つのテクセル）
    vec2 texCoord2m2 = vec2(
        baseU + (4.0 / uSHTexSize.x),
        baseV
    );
    
    vec2 texCoord2m1 = vec2(
        baseU + (5.0 / uSHTexSize.x),
        baseV
    );
    
    vec2 texCoord20 = vec2(
        baseU + (6.0 / uSHTexSize.x),
        baseV
    );
    
    vec2 texCoord21 = vec2(
        baseU + (7.0 / uSHTexSize.x),
        baseV
    );
    
    vec2 texCoord22 = vec2(
        baseU + (8.0 / uSHTexSize.x),
        baseV
    );
    
    vec3 coeff2m2 = texture(uSHTexture, texCoord2m2).rgb;
    vec3 coeff2m1 = texture(uSHTexture, texCoord2m1).rgb;
    vec3 coeff20 = texture(uSHTexture, texCoord20).rgb;
    vec3 coeff21 = texture(uSHTexture, texCoord21).rgb;
    vec3 coeff22 = texture(uSHTexture, texCoord22).rgb;
    
    // 2次の寄与を加算
    color += coeff2m2 * Y2m2;
    color += coeff2m1 * Y2m1;
    color += coeff20 * Y20;
    color += coeff21 * Y21;
    color += coeff22 * Y22;
    #endif
    
    // 色が負にならないようにクランプ
    return max(color, vec3(0.0));
}
#endif

void main(void) {
    #include <vert_in>
    
    // UVを-1〜1の範囲にマッピング
    vUV = 2.0 * uv - 1.0;
    
    // インスタンスデータを取得
    vec3 instancePosition, instanceScale, instanceColor;
    vec4 instanceRotation;
    float instanceAlpha;
    
    float actualInstanceId = getActualInstanceId(instanceId);
    fetchInstanceData(instanceId, instancePosition, instanceScale, instanceRotation, instanceColor, instanceAlpha);
    
    // 色とアルファ値を設定
    vec3 finalColor = instanceColor;
    
    #ifdef USE_SPHERICAL_HARMONICS
    // カメラ空間での法線ベクトルを計算
    // ガウシアンの表面方向（視点方向）
    vec3 normal = vec3(0.0, 0.0, 1.0);
    
    // 回転を適用して法線を回転させる
    normal = rotateVector(instanceRotation, normal);
    
    // 球面調和関数を使用して色を計算
    finalColor = computeSHColor(normal, actualInstanceId);
    #endif
    
    vColor = finalColor;
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