// カメラからの視線をレイマーチしてシャドウマップを引き、光の筋を積む

#include "./random.wgsl"

const MARCH_LENGTH = 60.0;
const MARCH = 16;

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let ndc = uvToNdc( input.uv );

	var rayPos = frame.uCameraPosition;
	let farPoint = frame.uCameraMatrix * frame.uProjectionMatrixInverse * vec4f( ndc, 1.0, 1.0 );
	let rayDir = normalize( farPoint.xyz / farPoint.w - frame.uCameraPosition );

	// レイの終端はgBufferのワールド座標。書かれていなければ十分遠くまで進める
	let gPos = textureSampleLevel( uGbufferPos, ppSamplerNearest, input.uv, 0.0 ).xyz;
	let rayEndPos = select( gPos, rayPos + rayDir * 100.0, dot( gPos, gPos ) == 0.0 );

	let rayLength = length( rayEndPos - rayPos );
	let rayStepLength = MARCH_LENGTH / f32( MARCH );
	let rayStep = rayDir * rayStepLength;

	var totalRayLength = random( input.uv + fract( frame.uTimeEF ) ) * rayStepLength;
	rayPos += rayDir * totalRayLength;

	var sum = vec3f( 0.0 );

	for ( var i = 0; i < MARCH; i ++ ) {

		rayPos += rayStep;
		totalRayLength += rayStepLength;

		if ( totalRayLength >= rayLength ) {

			break;

		}

		for ( var l = 0; l < lights.numLightDir; l ++ ) {

			let light = lights.directionalLight[ l ];
			var shadow = 1.0;

			if ( light.useShadow > 0.5 ) {

				shadow = sampleShadow( directionalShadowMap, l, light.shadowMatrix, rayPos );

			}

			sum += light.color * shadow * rayStepLength * 0.0025;

		}

		for ( var l = 0; l < lights.numLightSpot; l ++ ) {

			let light = lights.spotLight[ l ];
			var shadow = 1.0;

			if ( light.useShadow > 0.5 ) {

				shadow = sampleShadow( spotShadowMap, l, light.shadowMatrix, rayPos );

			}

			let toLight = light.position - rayPos;
			let spotDirection = normalize( toLight );
			let spotDistance = length( toLight );
			let spotAngleCos = dot( light.direction, spotDirection );

			var spotAttenuation = 0.0;

			if ( spotAngleCos > light.angle * - 1.0 ) {

				spotAttenuation = smoothstep( light.angle, light.angle + ( 1.0 - light.angle ) * light.blend, spotAngleCos );

			}

			sum += light.color * shadow * spotAttenuation
				* pow( clamp( 1.0 - spotDistance / light.distance, 0.0, 1.0 ), light.decay * 1.9 )
				* rayStepLength * 0.02;

		}

	}

	sum *= 0.4 * pp.uIntensity;

	// 時間方向に均す（1フレームぶんのレイマーチはノイズが多いため）
	let history = textureSampleLevel( uLightShaftBackBuffer, ppSampler, input.uv, 0.0 ).xyz;

	return vec4f( mix( history, sum, 0.6 ), 1.0 );

}
