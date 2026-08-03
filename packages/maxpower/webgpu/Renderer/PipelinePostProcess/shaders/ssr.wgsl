// 反射方向へレイマーチしてシーンを引く

#include "./random.wgsl"

const MARCH = 16;
const LENGTH = 5.0;
const OBJDEPTH = 0.5;

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let history = textureSampleLevel( uSSRBackBuffer, ppSampler, input.uv, 0.0 );

	var rayPos = textureSampleLevel( uGbufferPos, ppSamplerNearest, input.uv, 0.0 ).xyz;

	if ( dot( rayPos, rayPos ) == 0.0 || length( rayPos - frame.uCameraPosition ) > 100.0 ) {

		return mix( history, vec4f( 0.0 ), 0.2 );

	}

	let ndc = uvToNdc( input.uv );
	let farPoint = frame.uCameraMatrix * frame.uProjectionMatrixInverse * vec4f( ndc, 1.0, 1.0 );
	let viewDir = normalize( farPoint.xyz / farPoint.w - frame.uCameraPosition );

	let normal = textureSampleLevel( uGbufferNormal, ppSamplerNearest, input.uv, 0.0 ).xyz;
	let rayDir = reflect( viewDir, normal );

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

	return mix( history, col, 0.2 );

}
