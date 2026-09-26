// 反射方向へレイマーチしてシーンを引く

#include "./random.wgsl"
#include "../../shaders/view.wgsl"

const MARCH = 16;
const LENGTH = 5.0;
const OBJDEPTH = 0.5;

// HDR のヒット色を輝度 1 未満へ圧縮する。一瞬だけ当たった高輝度の点が履歴に大きく残って尾を引かないように、
// 圧縮した値どうしで混ぜる。ssComposite.wgsl の ssrDecompress と対
fn ssrCompress( c: vec4f ) -> vec4f {

	return vec4f( c.xyz / ( 1.0 + dot( c.xyz, vec3f( 0.2126, 0.7152, 0.0722 ) ) ), c.w );

}

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	// 速度は「NDC の移動量 × 0.2」を uv の向きへ y 反転したもの（standardVertex.wgsl）。
	// uv の移動量は NDC の半分なので 0.5 / 0.2 = 2.5 倍して戻す
	let prevUv = input.uv - textureSampleLevel( uVelTex, ppSamplerNearest, input.uv, 0.0 ).xy * 2.5;

	var blend = 0.2;

	// 画面の外から来た画素には履歴が無いので、そのフレームの値だけを使う
	if ( any( prevUv < vec2f( 0.0 ) ) || any( prevUv > vec2f( 1.0 ) ) ) {

		blend = 1.0;

	}

	let history = textureSampleLevel( uSSRBackBuffer, ppSampler, prevUv, 0.0 );

	var rayPos = textureSampleLevel( uGbufferPos, ppSamplerNearest, input.uv, 0.0 ).xyz;

	if ( dot( rayPos, rayPos ) == 0.0 || length( rayPos - frame.uCameraPosition ) > 100.0 ) {

		return mix( history, vec4f( 0.0 ), blend );

	}

	let normal = textureSampleLevel( uGbufferNormal, ppSamplerNearest, input.uv, 0.0 ).xyz;
	let rayDir = reflect( - viewDirection( rayPos ), normal );

	let rayStepLength = LENGTH / f32( MARCH );
	let rayStep = rayDir * rayStepLength;

	rayPos += rayDir * ( random( input.uv + frame.uTimeEF ) * rayStepLength + 0.1 );

	var col = vec4f( 0.0 );

	for ( var i = 0; i < MARCH; i ++ ) {

		let projected = frame.uProjectionMatrix * frame.uViewMatrix * vec4f( rayPos, 1.0 );
		let coord = projected.xy / projected.w;

		if ( abs( coord.x ) > 1.0 || abs( coord.y ) > 1.0 ) {

			break;

		}

		let uv = ndcToUv( coord );
		let gPos = textureSampleLevel( uGbufferPos, ppSamplerNearest, uv, 0.0 ).xyz;

		if ( dot( gPos, gPos ) == 0.0 ) {

			break;

		}

		let sampledViewZ = ( frame.uViewMatrix * vec4f( gPos, 1.0 ) ).z;
		let rayViewZ = ( frame.uViewMatrix * vec4f( rayPos, 1.0 ) ).z;

		if ( rayViewZ < sampledViewZ && rayViewZ >= sampledViewZ - OBJDEPTH ) {

			col = vec4f( textureSampleLevel( uBackBuffer0, ppSampler, uv, 0.0 ).xyz, 1.0 );

			break;

		}

		rayPos += rayStep;

	}

	return mix( history, ssrCompress( col ), blend );

}
