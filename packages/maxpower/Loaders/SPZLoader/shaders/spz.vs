#include <common>
#include <vert_h>

// インスタンスID属性
in float instanceId;

// インスタンス出力変数
out vec3 vColor;      // 色情報
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

// ビューポートサイズと焦点距離のユニフォーム
uniform vec2 uViewport;  // ビューポートサイズ
uniform vec2 uFocal;     // 焦点距離

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
void fetchInstanceData(float actualId, out vec3 position, out vec3 color, out float alpha, out mat3 covMatrix) {
    #ifdef USE_TEXTURE_DATA
    // テクスチャからインスタンスデータを取得
    
    // 位置データのテクセル座標を計算（各インスタンスは2テクセルを使用）
    float posIdx = actualId * 2.0;
    float tx1 = mod(posIdx, uDataTexSize.x);
    float ty1 = floor(posIdx / uDataTexSize.x);
    vec2 posUV = vec2(tx1 + 0.5, ty1 + 0.5) / uDataTexSize;
    
    // 位置とアルファ値を取得
    vec4 posData = texture(uDataTexture, posUV);
    position = posData.xyz;
    alpha = posData.w;
    
    // 共分散行列と色データのテクセル座標を計算
    float tx2 = mod(posIdx + 1.0, uDataTexSize.x);
    float ty2 = floor((posIdx + 1.0) / uDataTexSize.x);
    vec2 attrUV = vec2(tx2 + 0.5, ty2 + 0.5) / uDataTexSize;
    
    // 共分散行列と色情報を取得
    vec4 attrData = texture(uDataTexture, attrUV);
    
    // テクスチャからのbit表現を取得
    uvec4 covBits = floatBitsToUint(attrData);
    
    // 共分散行列の要素をunpackHalf2x16で展開
    vec2 u1 = unpackHalf2x16(covBits.x);
    vec2 u2 = unpackHalf2x16(covBits.y);
    vec2 u3 = unpackHalf2x16(covBits.z);
    
    // 共分散行列を構築
    covMatrix = mat3(
        u1.x, u1.y, u2.x,
        u1.y, u2.y, u3.x,
        u2.x, u3.x, u3.y
    );
    
    // 色情報のビットアンパック
    uint colorBits = covBits.w;
    color = vec3(
        float(colorBits & 0xFFu) / 255.0,
        float((colorBits >> 8) & 0xFFu) / 255.0,
        float((colorBits >> 16) & 0xFFu) / 255.0
    );
    #else
    // 未実装の場合は0を返す
    position = vec3(0.0);
    color = vec3(1.0);
    alpha = 1.0;
    covMatrix = mat3(1.0);
    #endif
}

// 球面調和関数の計算
#ifdef USE_SPHERICAL_HARMONICS
// 球面調和関数のY_lm基底関数実装
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
    vec3 instancePosition, instanceColor;
    float instanceAlpha;
    mat3 covMatrix;
    
    float actualInstanceId = getActualInstanceId(instanceId);
    fetchInstanceData(actualInstanceId, instancePosition, instanceColor, instanceAlpha, covMatrix);
    
    // カメラ空間での位置を計算
    vec4 cameraPosition = uViewMatrix * uModelMatrix * vec4(instancePosition, 1.0);
    
    // クリッピングの判定（視野外のスプラットを早期に破棄）
    float clip = 1.2 * cameraPosition.w;
    if (cameraPosition.z < -clip || cameraPosition.x < -clip || cameraPosition.x > clip || 
        cameraPosition.y < -clip || cameraPosition.y > clip) {
        // 視野外なので画面外に配置
        gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
        return;
    }
    
    // カメラ空間での雅可比行列（Jacobian）を計算
    mat3 J = mat3(
        uFocal.x / cameraPosition.z, 0.0, -(uFocal.x * cameraPosition.x) / (cameraPosition.z * cameraPosition.z),
        0.0, -uFocal.y / cameraPosition.z, (uFocal.y * cameraPosition.y) / (cameraPosition.z * cameraPosition.z),
        0.0, 0.0, 0.0
    );
    
    // ビュー行列の回転部分（3x3）を抽出
    mat3 viewRotation = mat3(uViewMatrix);
    
    // 3D→2D変換行列
    mat3 T = transpose(viewRotation) * J;
    
    // 2D共分散行列の計算
    mat3 cov2d = transpose(T) * covMatrix * T;
    
    // 2D楕円の固有値と固有ベクトルを計算
    float a = cov2d[0][0];
    float b = cov2d[0][1];
    float c = cov2d[1][1];
    
    // 固有値を計算
    float mid = (a + c) / 2.0;
    float radius = length(vec2((a - c) / 2.0, b));
    float lambda1 = mid + radius;  // 長軸に対応する固有値
    float lambda2 = mid - radius;  // 短軸に対応する固有値
    
    // 負の固有値があれば破棄
    if (lambda2 < 0.0) {
        gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
        return;
    }
    
    // 固有ベクトルを計算（主軸方向）
    vec2 diagonalVector = normalize(vec2(b, lambda1 - a));
    
    // 楕円の主軸と副軸を計算
    vec2 majorAxis = min(sqrt(2.0 * lambda1), 1024.0) * diagonalVector;
    vec2 minorAxis = min(sqrt(2.0 * lambda2), 1024.0) * vec2(diagonalVector.y, -diagonalVector.x);
    
    // 色とアルファ値を設定
    vec3 finalColor = instanceColor;
    
    #ifdef USE_SPHERICAL_HARMONICS
    // 球面調和関数を使用して色を計算
    vec3 normal = vec3(0.0, 0.0, 1.0);
    finalColor = computeSHColor(normal, actualInstanceId);
    #endif
    
    vColor = finalColor;
    vAlpha = instanceAlpha;
    
    // 頂点の投影位置を計算
    vec4 projectedPos = uProjectionMatrix * cameraPosition;
    vec2 vCenter = projectedPos.xy / projectedPos.w;
    
    #include <vert_out>

    // 入力頂点位置に基づいて、楕円上の点を計算
    gl_Position = vec4(
        vCenter + outPos.x * majorAxis / uViewport + outPos.y * minorAxis / uViewport,
        0.0,
        1.0
    );
}