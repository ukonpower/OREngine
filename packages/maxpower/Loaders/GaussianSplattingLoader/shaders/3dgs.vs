#include <common>
#include <vert_h>

layout ( location = 3 ) in float instanceId;

uniform vec2 uDataTexSize;
uniform sampler2D uPositionTexture;
uniform sampler2D uColorTexture;
uniform sampler2D uSortTex;
uniform highp usampler2D uCovarianceTexture;  // 共分散行列テクスチャ (uint型)
uniform vec2 uFocal;
uniform vec2 uViewport;

#if SH_DEGREE > 0
	uniform highp usampler2D uShTexture0;
#endif
#if SH_DEGREE > 1
	uniform highp usampler2D uShTexture1;
#endif
#if SH_DEGREE > 2
	uniform highp usampler2D uShTexture2;
#endif

uniform vec3 uCameraPosition;

out vec3 vColor;
out float vAlpha;
out vec2 vCUv;

/*-------------------------------
	SH関数
-------------------------------*/

ivec2 getDataUVint(float index, vec2 textureSize) {
	float x = mod(index, textureSize.x);
	float y = floor(index / textureSize.x);
    y = textureSize.y - y;
	return ivec2(uint(x + 0.5), uint(y - 0.5));
}

struct Splat {
	vec3 position;
	vec4 color;
	mat3 covariance;
#if SH_DEGREE > 0
	uvec4 sh0; // 4 * 32bits uint
#endif
#if SH_DEGREE > 1
	uvec4 sh1;
#endif
#if SH_DEGREE > 2
	uvec4 sh2;
#endif
};

// SH色計算関数
vec3 computeColorFromSHDegree(vec3 dir, const vec3 sh[16])
{
    const float SH_C0 = 0.28209479;
    const float SH_C1 = 0.48860251;
    float SH_C2[5];
    SH_C2[0] = 1.092548430;
    SH_C2[1] = -1.09254843;
    SH_C2[2] = 0.315391565;
    SH_C2[3] = -1.09254843;
    SH_C2[4] = 0.546274215;
    
    float SH_C3[7];
    SH_C3[0] = -0.59004358;
    SH_C3[1] = 2.890611442;
    SH_C3[2] = -0.45704579;
    SH_C3[3] = 0.373176332;
    SH_C3[4] = -0.45704579;
    SH_C3[5] = 1.445305721;
    SH_C3[6] = -0.59004358;

    vec3 result = /*SH_C0 * */sh[0];

    #if SH_DEGREE > 0
        float x = dir.x;
        float y = dir.y;
        float z = dir.z;
        result += - SH_C1 * y * sh[1] + SH_C1 * z * sh[2] - SH_C1 * x * sh[3];

        #if SH_DEGREE > 1
            float xx = x * x, yy = y * y, zz = z * z;
            float xy = x * y, yz = y * z, xz = x * z;
            result += 
                SH_C2[0] * xy * sh[4] +
                SH_C2[1] * yz * sh[5] +
                SH_C2[2] * (2.0 * zz - xx - yy) * sh[6] +
                SH_C2[3] * xz * sh[7] +
                SH_C2[4] * (xx - yy) * sh[8];

            #if SH_DEGREE > 2
                result += 
                    SH_C3[0] * y * (3.0 * xx - yy) * sh[9] +
                    SH_C3[1] * xy * z * sh[10] +
                    SH_C3[2] * y * (4.0 * zz - xx - yy) * sh[11] +
                    SH_C3[3] * z * (2.0 * zz - 3.0 * xx - 3.0 * yy) * sh[12] +
                    SH_C3[4] * x * (4.0 * zz - xx - yy) * sh[13] +
                    SH_C3[5] * z * (xx - yy) * sh[14] +
                    SH_C3[6] * x * (xx - 3.0 * yy) * sh[15];
            #endif
        #endif
    #endif

    return result;
}

vec4 decompose(uint value)
{
    vec4 components = vec4(
                        float((value            ) & 255u),
                        float((value >> uint( 8)) & 255u),
                        float((value >> uint(16)) & 255u),
                        float((value >> uint(24)) & 255u));

    return components * vec4(2./255.) - vec4(1.);
}

vec3 computeSH(Splat splat, vec3 dir)
{
    vec3 sh[16];
    
    sh[0] = vec3(0.,0.,0.);
    #if SH_DEGREE > 0
        vec4 sh00 = decompose(splat.sh0.x);
        vec4 sh01 = decompose(splat.sh0.y);
        vec4 sh02 = decompose(splat.sh0.z);

        sh[1] = vec3(sh00.x, sh00.y, sh00.z);
        sh[2] = vec3(sh00.w, sh01.x, sh01.y);
        sh[3] = vec3(sh01.z, sh01.w, sh02.x);
    #endif
    #if SH_DEGREE > 1
        vec4 sh04 = decompose(splat.sh1.x);
        vec4 sh05 = decompose(splat.sh1.y);
        vec4 sh06 = decompose(splat.sh1.z);
        vec4 sh07 = decompose(splat.sh1.w);

        sh[4] = vec3(sh04.x, sh04.y, sh04.z);
        sh[5] = vec3(sh04.w, sh05.x, sh05.y);
        sh[6] = vec3(sh05.z, sh05.w, sh06.x);
        sh[7] = vec3(sh06.y, sh06.z, sh06.w);
        sh[8] = vec3(sh07.x, sh07.y, sh07.z);
    #endif
    #if SH_DEGREE > 2
        vec4 sh08 = decompose(splat.sh2.x);
        vec4 sh09 = decompose(splat.sh2.y);
        vec4 sh10 = decompose(splat.sh2.z);
        vec4 sh11 = decompose(splat.sh2.w);

        sh[9] = vec3(sh08.x, sh08.y, sh08.z);
        sh[10] = vec3(sh08.w, sh09.x, sh09.y);
        sh[11] = vec3(sh09.z, sh09.w, sh10.x);
        sh[12] = vec3(sh10.y, sh10.z, sh10.w);
        sh[13] = vec3(sh11.x, sh11.y, sh11.z);
        sh[14] = vec3(sh11.w, 0.0, 0.0);
        sh[15] = vec3(0.0, 0.0, 0.0);    
    #endif

    return computeColorFromSHDegree(dir, sh);
}

/*-------------------------------
	FetchData
-------------------------------*/

Splat fetchSplatData( float index ) {

	ivec2 splatUVint = getDataUVint(index, uDataTexSize);

	Splat splat;
	splat.position = texelFetch( uPositionTexture, splatUVint, 0 ).xyz;
	splat.color = texelFetch( uColorTexture, splatUVint, 0 );

	// 共分散行列テクスチャから値を取得
	uvec4 cov = texelFetch(uCovarianceTexture, splatUVint, 0);
	
	// 16ビット値のアンパック
	vec2 u1 = unpackHalf2x16(cov.x);
	vec2 u2 = unpackHalf2x16(cov.y);
	vec2 u3 = unpackHalf2x16(cov.z);
	
	// 行列に設定（対称行列）
	splat.covariance = mat3(
		u1.x, u1.y, u2.x,
		u1.y, u2.y, u3.x,
		u2.x, u3.x, u3.y
	);

    #if SH_DEGREE > 0
        splat.sh0 = texelFetch(uShTexture0, splatUVint, 0);
    #endif
    #if SH_DEGREE > 1
        splat.sh1 = texelFetch(uShTexture1, splatUVint, 0);
    #endif
    #if SH_DEGREE > 2
        splat.sh2 = texelFetch(uShTexture2, splatUVint, 0);
    #endif
	
	return splat;
}

/*-------------------------------
	ActualIndex
-------------------------------*/

float fetchActualIndex( float index ) {

	ivec2 uv = getDataUVint( index, uDataTexSize );

	return texelFetch( uSortTex, uv, 0 ).x;

}

/*-------------------------------
	Main
-------------------------------*/

void main( void ) {

	#include <vert_in>

	float actualIndex = fetchActualIndex( instanceId );
	Splat splat = fetchSplatData( actualIndex );
	
	// ビュー変換後の座標を計算
	vec4 viewPos = uModelViewMatrix * vec4(splat.position, 1.0);
	vec4 pos2d = uProjectionMatrix * viewPos;
	
	// ヤコビアン行列の計算
	mat3 J = mat3(
		uFocal.x / viewPos.z, 0.0, -(uFocal.x * viewPos.x) / (viewPos.z * viewPos.z),
		0.0, uFocal.y / viewPos.z, -(uFocal.y * viewPos.y) / (viewPos.z * viewPos.z),
		0.0, 0.0, 0.0
	);

    mat3 invy = mat3(1,0,0, 0,-1,0,0,0,1);

	// 投影のための変換行列
	mat3 T = transpose(mat3(uModelViewMatrix)) * J;
	mat3 cov2d = transpose(T) * splat.covariance * T;
	
	// 楕円の軸計算
	float mid = (cov2d[0][0] + cov2d[1][1]) / 2.0;
	float radius = length(vec2((cov2d[0][0] - cov2d[1][1]) / 2.0, cov2d[0][1]));
	float epsilon = 0.0001;
	float lambda1 = mid + radius + epsilon; 
	float lambda2 = mid - radius + epsilon;
	
	if(lambda2 < 0.0) {
		// 無効な楕円は描画しない
		gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
		return;
	}
	
	// 楕円の主軸と副軸を計算
	vec2 diagonalVector = normalize(vec2(cov2d[0][1], lambda1 - cov2d[0][0]));

	vec2 majorAxis = min(sqrt(2.0 * lambda1), 1024.0) * diagonalVector;
	vec2 minorAxis = min(sqrt(2.0 * lambda2), 1024.0) * vec2(diagonalVector.y, -diagonalVector.x);
	
	vec2 localPos = outPos.xy;
	
	// 投影後の中心位置を計算
	vec2 vCenter = vec2(pos2d.xy);
	
	// 最終位置を計算
	vec4 finalPos = vec4(
		vCenter +
		( 
            localPos.x * majorAxis +
            localPos.y * minorAxis
        ) / uViewport * pos2d.w,
		pos2d.zw 
    );
	
	// SHによる色補正を適用
	vec3 finalColor = splat.color.rgb;
	
    #if SH_DEGREE > 0
        // カメラから見たスプラット位置への正規化された方向ベクトル
        vec3 viewDirection = normalize(splat.position - uCameraPosition);
        
        // SH係数による色補正を計算
        vec3 shColor = computeSH(splat, viewDirection);
        
        // 元の色にSH補正を加算
        finalColor += shColor * 0.0;
    #endif
	
	// 色とアルファ値の設定
	vColor = max(finalColor, 0.0); // 負の値をクランプ
	vAlpha = splat.color.a;
	vCUv = outPos.xy;
	
	#include <vert_out>
	
	// 最終位置を設定
	gl_Position = finalPos;
	
}