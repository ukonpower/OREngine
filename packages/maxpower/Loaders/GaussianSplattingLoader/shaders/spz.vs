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

out vec3 vColor;
out float vAlpha;
out vec2 vNormalizedUV;
out vec2 vCUv;

/*-------------------------------
	GetUV
-------------------------------*/

vec2 getUV( float index ) {

	float posIdx = index;
    float tx1 = mod(posIdx, uDataTexSize.x);
    float ty1 = floor(posIdx / uDataTexSize.x);
    vec2 uv = vec2(tx1 + 0.5, ty1 + 0.5) / uDataTexSize;
	uv.y = 1.0 - uv.y;

	return uv;

}

/*-------------------------------
	FetchData
-------------------------------*/

void fetchData( float index, out vec3 instancePosition, out vec4 instanceColor, out mat3 instanceVrk ) {

	vec2 uv = getUV( index );

	instancePosition = texture( uPositionTexture, uv ).xyz;
	instanceColor = texture( uColorTexture, uv );

	// 共分散行列テクスチャから値を取得（unsigned intとして）
	uvec4 cov = texelFetch(uCovarianceTexture, ivec2(uv * uDataTexSize), 0);
	
	// 16ビット値のアンパック
	vec2 u1 = unpackHalf2x16(cov.x);
	vec2 u2 = unpackHalf2x16(cov.y);
	vec2 u3 = unpackHalf2x16(cov.z);
	
	// 行列に設定（対称行列）
	instanceVrk = mat3(
		u1.x, u1.y, u2.x,
		u1.y, u2.y, u3.x,
		u2.x, u3.x, u3.y
	);
	
}

/*-------------------------------
	ActualIndex
-------------------------------*/

float fetchActualIndex( float index ) {

	vec2 uv = getUV( index );

	return texture( uSortTex, uv ).x;

}

/*-------------------------------
	Main
-------------------------------*/

void main( void ) {

	#include <vert_in>

	vec3 instancePosition;
	vec4 instanceColor;
	mat3 instanceVrk;

	float actualIndex = fetchActualIndex( instanceId );

	fetchData( actualIndex, instancePosition, instanceColor, instanceVrk );
	
	// ビュー変換後の座標を計算
	vec4 viewPos = uModelViewMatrix * vec4(instancePosition, 1.0);
	vec4 pos2d = uProjectionMatrix * viewPos;
	
	// ヤコビアン行列の計算
	mat3 J = mat3(
		uFocal.x / viewPos.z, 0.0, -(uFocal.x * viewPos.x) / (viewPos.z * viewPos.z),
		0.0, -uFocal.y / viewPos.z, (uFocal.y * viewPos.y) / (viewPos.z * viewPos.z),
		0.0, 0.0, 0.0
	);

    mat3 invy = mat3(1,0,0, 0,-1,0,0,0,1);
	
	// 投影のための変換行列
	mat3 T = transpose(mat3(uModelViewMatrix)) * J;
	mat3 cov2d = transpose(T) * instanceVrk * T;
	
	// 楕円の軸計算
	float mid = (cov2d[0][0] + cov2d[1][1]) / 2.0;
	float radius = length(vec2((cov2d[0][0] - cov2d[1][1]) / 2.0, cov2d[0][1]));
	float epsilon = 0.0001;
	float lambda1 = mid + radius + epsilon; float lambda2 = mid - radius;
	
	if(lambda2 < 0.0) {
		// 無効な楕円は描画しない
		gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
		return;
	}
	
	// 楕円の主軸と副軸を計算
	vec2 diagonalVector = normalize(vec2(cov2d[0][1], lambda1 - cov2d[0][0]));

	// 何故か逆
	diagonalVector.y = - diagonalVector.y;
	
	vec2 majorAxis = min(sqrt(2.0 * lambda1), 1024.0) * diagonalVector;
	vec2 minorAxis = min(sqrt(2.0 * lambda2), 1024.0) * vec2(diagonalVector.y, -diagonalVector.x);
	
	// ローカル座標に軸スケールを適用
	vec2 localPos = outPos.xy;
	
	// 投影後の中心位置を計算
	vec2 vCenter = vec2(pos2d.xy) / pos2d.w;
	float depth = pos2d.z / pos2d.w;
	
	// 最終位置を計算
	vec4 finalPos = vec4(
		vCenter +
		localPos.x * majorAxis / uViewport + 
		localPos.y * minorAxis / uViewport,
		depth, 1.0);
	
	// 色とアルファ値の設定
	vColor = instanceColor.rgb;
	vAlpha = instanceColor.a;
	vNormalizedUV = localPos;
	vCUv = outPos.xy;
	
	#include <vert_out>
	
	// 最終位置を設定
	gl_Position = finalPos;
	
}