// envMap の事前フィルタ（PMREM）本体。
// webgl側の pmrem.fs（Hammersley + GGX importance sampling）を移植したもの。
// ただし出力先は3x2の面アトラスではなく、キューブテクスチャのミップレベル。
// サンプル列は uTimeEF で毎フレームずらし、出力先ミップへのアルファブレンド
// （ブレンド定数、EnvMap側で設定）で時間累積する。
// struct PrefilterUniforms は PREFILTER_FIELDS から生成して前置される

const PI = 3.14159265359;

@group(0) @binding(0) var<uniform> prefilter: PrefilterUniforms;
@group(0) @binding(1) var sourceEnvMap: texture_cube<f32>;
@group(0) @binding(2) var sourceSampler: sampler;

override uRoughness: f32 = 0.5;
override uSampleCount: u32 = 32u;

struct FullscreenOutput {
	@builtin(position) position: vec4f,
	@location(0) uv: vec2f,
};

@vertex
fn vsMain( @builtin(vertex_index) index: u32 ) -> FullscreenOutput {

	let x = f32( ( index << 1u ) & 2u );
	let y = f32( index & 2u );

	var output: FullscreenOutput;

	output.position = vec4f( x * 2.0 - 1.0, y * 2.0 - 1.0, 0.0, 1.0 );
	output.uv = vec2f( x, 1.0 - y );

	return output;

}

// キューブ面のuvから方向ベクトルを作る（textureSampleの面選択・uv規約の逆写像）
fn faceDirection( face: i32, uv: vec2f ) -> vec3f {

	let a = uv * 2.0 - 1.0;

	var dir = vec3f( 0.0 );

	switch face {

		case 0: { dir = vec3f( 1.0, - a.y, - a.x ); }
		case 1: { dir = vec3f( - 1.0, - a.y, a.x ); }
		case 2: { dir = vec3f( a.x, 1.0, a.y ); }
		case 3: { dir = vec3f( a.x, - 1.0, - a.y ); }
		case 4: { dir = vec3f( a.x, - a.y, 1.0 ); }
		default: { dir = vec3f( - a.x, - a.y, - 1.0 ); }

	}

	return normalize( dir );

}

// 低食い違い列（radical inverse van der Corput）
fn hammersley( index: u32, numSamples: u32 ) -> vec2f {

	var b = index;

	b = ( b << 16u ) | ( b >> 16u );
	b = ( ( b & 0x55555555u ) << 1u ) | ( ( b & 0xAAAAAAAAu ) >> 1u );
	b = ( ( b & 0x33333333u ) << 2u ) | ( ( b & 0xCCCCCCCCu ) >> 2u );
	b = ( ( b & 0x0F0F0F0Fu ) << 4u ) | ( ( b & 0xF0F0F0F0u ) >> 4u );
	b = ( ( b & 0x00FF00FFu ) << 8u ) | ( ( b & 0xFF00FF00u ) >> 8u );

	return vec2f( f32( index ) / f32( numSamples ), f32( b ) * 2.3283064365386963e-10 );

}

fn random( st: vec2f ) -> f32 {

	return fract( sin( dot( st, vec2f( 12.9898, 78.233 ) ) ) * 43758.5453123 );

}

fn importanceSampleGGX( xi: vec2f, roughness: f32, normal: vec3f ) -> vec3f {

	let a = roughness * roughness;
	let phi = 2.0 * PI * xi.x;
	let cosTheta = sqrt( ( 1.0 - xi.y ) / ( 1.0 + ( a * a - 1.0 ) * xi.y ) );
	let sinTheta = sqrt( 1.0 - cosTheta * cosTheta );

	let h = vec3f( sinTheta * cos( phi ), sinTheta * sin( phi ), cosTheta );

	let upVector = select( vec3f( 1.0, 0.0, 0.0 ), vec3f( 0.0, 0.0, 1.0 ), abs( normal.z ) < 0.999 );
	let tangentX = normalize( cross( upVector, normal ) );
	let tangentY = cross( normal, tangentX );

	return tangentX * h.x + tangentY * h.y + normal * h.z;

}

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	// 視線・法線・反射をすべてこの方向とみなす近似（webgl側と同じ）
	let normal = faceDirection( prefilter.uFace, input.uv );

	var color = vec3f( 0.0 );
	var totalWeight = 0.0;

	// 毎フレーム別のサンプル列になるよう乱数でずらす（webgl側と同じ）
	let jitter = vec2f(
		random( input.uv + prefilter.uTimeEF * 0.1 ),
		random( input.uv + prefilter.uTimeEF * 0.1 + 1.0 )
	);

	for ( var i = 0u; i < uSampleCount; i ++ ) {

		let xi = fract( hammersley( i, uSampleCount ) + jitter );
		let h = importanceSampleGGX( xi, uRoughness, normal );
		let l = 2.0 * dot( normal, h ) * h - normal;
		let nol = clamp( dot( normal, l ), 0.0, 1.0 );

		if ( nol > 0.0 ) {

			color += textureSampleLevel( sourceEnvMap, sourceSampler, l, 0.0 ).xyz * nol;
			totalWeight += nol;

		}

	}

	return vec4f( color / max( totalWeight, 0.0001 ), 1.0 );

}
