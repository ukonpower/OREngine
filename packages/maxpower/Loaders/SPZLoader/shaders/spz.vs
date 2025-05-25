#include <common>
#include <vert_h>

layout ( location = 3 ) in float instanceId;

uniform vec2 uDataTexSize;
uniform sampler2D uPositionTexture;
uniform sampler2D uScaleTexture;
uniform sampler2D uRotationTexture;
uniform sampler2D uColorTexture;
uniform sampler2D uSortTex;
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

void fetchData( float index, out vec3 instancePosition, out vec3 instanceScale, out vec3 instanceRotation, out vec4 instanceColor ) {

	vec2 uv = getUV( index );

	instancePosition = texture( uPositionTexture, uv ).xyz;
	instanceScale = texture( uScaleTexture, uv ).xyz;
	instanceRotation = texture( uRotationTexture, uv ).xyz;
	instanceColor = texture( uColorTexture, uv );
	
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
	vec3 instanceScale;
	vec3 instanceRotation;
	vec4 instanceColor;

	float actualIndex = fetchActualIndex( instanceId );

	fetchData( actualIndex, instancePosition, instanceScale, instanceRotation, instanceColor );

	// 行列計算の準備
	// クォータニオンから回転行列成分を計算
	vec4 q = vec4(instanceRotation, 0.0);
	q = normalize(q);
	
	// 回転行列の計算
	mat3 R = mat3(
		1.0 - 2.0 * (q.y * q.y + q.z * q.z), 2.0 * (q.x * q.y + q.w * q.z), 2.0 * (q.x * q.z - q.w * q.y),
		2.0 * (q.x * q.y - q.w * q.z), 1.0 - 2.0 * (q.x * q.x + q.z * q.z), 2.0 * (q.y * q.z + q.w * q.x),
		2.0 * (q.x * q.z + q.w * q.y), 2.0 * (q.y * q.z - q.w * q.x), 1.0 - 2.0 * (q.x * q.x + q.y * q.y)
	);
	
	// スケール行列とR行列を乗算
	mat3 SR = mat3(
		instanceScale.x * R[0][0], instanceScale.x * R[0][1], instanceScale.x * R[0][2],
		instanceScale.y * R[1][0], instanceScale.y * R[1][1], instanceScale.y * R[1][2],
		instanceScale.z * R[2][0], instanceScale.z * R[2][1], instanceScale.z * R[2][2]
	);
	
	// 共分散行列の計算
	mat3 Vrk = mat3(
		SR[0][0] * SR[0][0] + SR[1][0] * SR[1][0] + SR[2][0] * SR[2][0], SR[0][0] * SR[0][1] + SR[1][0] * SR[1][1] + SR[2][0] * SR[2][1], SR[0][0] * SR[0][2] + SR[1][0] * SR[1][2] + SR[2][0] * SR[2][2],
		SR[0][0] * SR[0][1] + SR[1][0] * SR[1][1] + SR[2][0] * SR[2][1], SR[0][1] * SR[0][1] + SR[1][1] * SR[1][1] + SR[2][1] * SR[2][1], SR[0][1] * SR[0][2] + SR[1][1] * SR[1][2] + SR[2][1] * SR[2][2],
		SR[0][0] * SR[0][2] + SR[1][0] * SR[1][2] + SR[2][0] * SR[2][2], SR[0][1] * SR[0][2] + SR[1][1] * SR[1][2] + SR[2][1] * SR[2][2], SR[0][2] * SR[0][2] + SR[1][2] * SR[1][2] + SR[2][2] * SR[2][2]
	);

	// ビュー変換後の座標を計算
	vec4 viewPos = uModelViewMatrix * vec4(instancePosition, 1.0);
	
	// ヤコビアン行列の計算
	mat3 J = mat3(
		uFocal.x / viewPos.z, 0.0, -(uFocal.x * viewPos.x) / (viewPos.z * viewPos.z),
		0.0, -uFocal.y / viewPos.z, (uFocal.y * viewPos.y) / (viewPos.z * viewPos.z),
		0.0, 0.0, 0.0
	);
	
	// 投影のための変換行列
	mat3 T = transpose(mat3(uModelViewMatrix)) * J;
	mat3 cov2d = transpose(T) * Vrk * T;
	
	// 楕円の軸計算
	float mid = (cov2d[0][0] + cov2d[1][1]) / 2.0;
	float radius = length(vec2((cov2d[0][0] - cov2d[1][1]) / 2.0, cov2d[0][1]));
	float lambda1 = mid + radius;
	float lambda2 = mid - radius;
	
	if(lambda2 < 0.0) {
		// 無効な楕円は描画しない
		gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
		return;
	}
	
	// 楕円の主軸と副軸を計算
	vec2 diagonalVector = normalize(vec2(cov2d[0][1], lambda1 - cov2d[0][0]));
	vec2 majorAxis = min(sqrt(2.0 * lambda1), 1024.0) * diagonalVector * 0.05;
	vec2 minorAxis = min(sqrt(2.0 * lambda2), 1024.0) * vec2(diagonalVector.y, -diagonalVector.x) * 0.05;
	
	// ローカル座標に軸スケールを適用
	vec2 localPos = outPos.xy;
	
	// 投影後の中心位置を計算
	vec4 projPos = uProjectionMatrix * viewPos;
	vec2 vCenter = vec2(projPos.xy) / projPos.w;
	float depth = projPos.z / projPos.w;
	
	// 最終位置を計算
	vec4 finalPos = vec4(
		vCenter + 
		localPos.x * majorAxis / uViewport + 
		localPos.y * minorAxis / uViewport,
		depth, 1.0);
	
	// 色とアルファ値の設定
	vColor = instanceColor.rgb * 8.0;
	vAlpha = instanceColor.a;
	vNormalizedUV = localPos;
	vCUv = outPos.xy * 2.0;
	
	#include <vert_out>
	
	// 最終位置を設定
	gl_Position = finalPos;
	
}