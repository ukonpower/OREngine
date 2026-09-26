// 反射方向へレイマーチしてシーンを引く。今フレームの結果だけを出し、時間方向の蓄積は ssrTemporal.fs が行う

#include <module:common>
#include <module:light>
#include <module:random>

// uniforms

uniform sampler2D uBackBuffer0;
uniform sampler2D uGbufferPos;
uniform sampler2D uGbufferNormal;

uniform float uTimeEF;
uniform mat4 uCameraMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uProjectionMatrixInverse;
uniform vec3 uCameraPosition;
uniform float uCameraFar;

// varying

in vec2 vUv;

layout (location = 0) out vec4 outColor;
#define MARCH 16.0
#define LENGTH 5.0
#define OBJDEPTH 0.5

// HDR のヒット色を輝度 1 未満へ圧縮する。一瞬だけ当たった高輝度の点が履歴に大きく残って尾を引かないように、
// ssrTemporal.fs は圧縮した値どうしで近傍の範囲を取って混ぜる。ssComposite.fs の ssrDecompress と対
vec4 ssrCompress( vec4 c ) {

	return vec4( c.xyz / ( 1.0 + dot( c.xyz, vec3( 0.2126, 0.7152, 0.0722 ) ) ), c.w );

}

void main( void ) {

	vec3 rayPos = texture( uGbufferPos, vUv ).xyz;

	if( isBackground( rayPos, uCameraPosition, uCameraFar ) || length( rayPos - uCameraPosition ) > 100.0 ) {

		outColor = vec4( 0.0 );
		return;

	}

	vec3 rayDir = reflect( - viewDirection( rayPos, uCameraPosition, uViewMatrix, uProjectionMatrix ), texture( uGbufferNormal, vUv ).xyz );

	float rayStepLength = LENGTH / MARCH;
	vec3 rayStep = rayDir * rayStepLength;

	float totalRayLength = random(vUv + uTimeEF) * rayStepLength + 0.1;
	rayPos += rayDir * totalRayLength;

	vec4 col = vec4( 0.0 );

	for( int i = 0; i < int( MARCH ); i ++ ) {

		vec4 depthCoord = (uProjectionMatrix * uViewMatrix * vec4(rayPos, 1.0 ) );
		depthCoord.xy /= depthCoord.w;

		if( abs( depthCoord.x ) > 1.0 || abs( depthCoord.y ) > 1.0 ) break;

		depthCoord.xy = depthCoord.xy * 0.5 + 0.5;

		vec3 gBufferPos = texture( uGbufferPos, depthCoord.xy ).xyz;

		if( length( gBufferPos ) == 0.0 ) break;

		vec4 samplerPos = (uViewMatrix * vec4( gBufferPos, 1.0) );
		vec4 sampleViewPos = uViewMatrix * vec4( rayPos, 1.0 );

		if( sampleViewPos.z < samplerPos.z && sampleViewPos.z >= samplerPos.z - OBJDEPTH ) {

			col.xyz = texture( uBackBuffer0, depthCoord.xy ).xyz;
			col.w = 1.0;
			break;

		}
		
		rayPos += rayStep;
		totalRayLength += rayStepLength;

	}


	outColor = ssrCompress( col );

}