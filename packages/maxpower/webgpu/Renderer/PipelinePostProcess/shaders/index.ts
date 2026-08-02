import * as GLP from 'glpower';

/*-------------------------------
	ポストプロセス各パスのWGSL

	webgl側の colorCollection.fs / ssao.fs / ssaoBlur.fs / gaussBlur.fs /
	bloomBright.fs / bloomComposite.fs / fxaa.fs を移植したもの。

	GLSLでuniform配列だった重み・カーネルは、WGSLのuniformアドレス空間だと
	要素ストライドが16の倍数に制限されて素直に置けないため、
	定数としてWGSLへ焼き込む（値はどのみちパス生成時に決まる）。

	テクスチャは必ず textureSampleLevel でレベル0を明示して引く。textureSample は
	暗黙微分のため一様制御フローを要求し、早期returnやループの中では使えないため。
	入力はどれもミップを持たないのでレベル0が常に正しい。
-------------------------------*/

const wgslFloats = ( values: number[] ) => values.map( ( v ) => v.toFixed( 8 ) ).join( ', ' );

/*-------------------------------
	colorCollection
-------------------------------*/

// ACES フィルミックトーンマップ（Stephen Hill のフィット）
export const colorCollectionWgsl = /* wgsl */`
const ACES_INPUT = mat3x3f(
	0.59719, 0.07600, 0.02840,
	0.35458, 0.90834, 0.13383,
	0.04823, 0.01566, 0.83777
);

const ACES_OUTPUT = mat3x3f(
	1.60475, - 0.10208, - 0.00327,
	- 0.53108, 1.10813, - 0.07276,
	- 0.07367, - 0.00605, 1.07602
);

fn rrtAndOdtFit( v: vec3f ) -> vec3f {

	let a = v * ( v + 0.0245786 ) - 0.000090537;
	let b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;

	return a / b;

}

fn acesFitted( color: vec3f ) -> vec3f {

	var c = ACES_INPUT * color;

	c = rrtAndOdtFit( c );
	c = ACES_OUTPUT * c;

	return clamp( c, vec3f( 0.0 ), vec3f( 1.0 ) );

}

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let color = textureSampleLevel( uBackBuffer0, ppSampler, input.uv, 0.0 ).xyz;

	return vec4f( acesFitted( color ), 1.0 );

}
`;

/*-------------------------------
	ssao
-------------------------------*/

// 半球状に散らしたサンプル点。webgl側 ssaoKernel() と同じ作り方で、
// 実行のたびに変わらないよう生成時に固定してWGSLへ焼き込む
const ssaoKernel = ( kernelSize: number ) => {

	const values: number[] = [];

	for ( let i = 0; i < kernelSize; i ++ ) {

		const scale = i / kernelSize * 0.95 + 0.05;
		const sample = new GLP.Vector( Math.random() * 2.0 - 1.0, Math.random() * 2.0 - 1.0, scale );

		sample.normalize().multiply( scale );

		values.push( ...sample.getElm( 'vec3' ) );

	}

	return values;

};

export const SSAO_SAMPLES = 16;

export const buildSsaoWgsl = () => {

	const kernel = ssaoKernel( SSAO_SAMPLES );
	const elements = [];

	for ( let i = 0; i < SSAO_SAMPLES; i ++ ) {

		elements.push( `vec3f( ${wgslFloats( kernel.slice( i * 3, i * 3 + 3 ) )} )` );

	}

	return /* wgsl */`
const SSAO_SAMPLES = ${SSAO_SAMPLES};

const SSAO_KERNEL = array<vec3f, ${SSAO_SAMPLES}>(
	${elements.join( ',\n\t' )}
);

fn random( co: vec2f ) -> f32 {

	return fract( sin( dot( co, vec2f( 12.9898, 78.233 ) ) ) * 43758.5453 );

}

// ワールド座標をカメラのクリップ空間へ落としてテクスチャ座標にする。
// WebGPUのテクスチャ座標はY下向きなので、ここでYを反転して規約差を吸収する
fn worldToUv( worldPosition: vec3f ) -> vec2f {

	let projected = frame.uProjectionMatrix * frame.uViewMatrix * vec4f( worldPosition, 1.0 );
	let ndc = projected.xy / projected.w;

	return vec2f( ndc.x * 0.5 + 0.5, ndc.y * - 0.5 + 0.5 );

}

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let rayPos = textureSampleLevel( uGbufferPos, ppSamplerNearest, input.uv, 0.0 ).xyz;

	// gBufferが書かれていない画素と、遠すぎる画素は遮蔽なし
	if ( dot( rayPos, rayPos ) == 0.0 || length( rayPos - frame.uCameraPosition ) > 100.0 ) {

		return vec4f( 0.0, 0.0, 0.0, 1.0 );

	}

	let normal = textureSampleLevel( uGbufferNormal, ppSamplerNearest, input.uv, 0.0 ).xyz;

	let dist = 0.5;
	let objectDepth = 0.2;

	let seed = input.uv + frame.uTimeEF;
	let rand = vec3f( random( seed ), random( seed + 0.25 ), random( seed + 0.5 ) ) * 2.0 - 1.0;

	let tangent = normalize( rand - normal * dot( rand, normal ) );
	let bitangent = cross( tangent, normal );
	let kernelMatrix = mat3x3f( tangent, bitangent, normal );

	var occlusion = 0.0;

	for ( var i = 0; i < SSAO_SAMPLES; i ++ ) {

		let sampleOffset = kernelMatrix * SSAO_KERNEL[ i ];
		let samplePos = rayPos + sampleOffset * dist;

		let sampledWorld = textureSampleLevel( uGbufferPos, ppSamplerNearest, worldToUv( samplePos ), 0.0 ).xyz;

		let sampledViewZ = ( frame.uViewMatrix * vec4f( sampledWorld, 1.0 ) ).z;
		let sampleViewZ = ( frame.uViewMatrix * vec4f( samplePos, 1.0 ) ).z;

		if ( sampleViewZ < sampledViewZ && sampleViewZ >= sampledViewZ - objectDepth ) {

			occlusion += 1.0 - pow( length( sampleOffset ), 2.0 );

		}

	}

	return vec4f( vec3f( occlusion / f32( SSAO_SAMPLES ) * pp.uIntensity ), 1.0 );

}
`;

};

/*-------------------------------
	ssaoBlur
-------------------------------*/

// 法線と深度で重みを付けたバイラテラルぼかし。縦横で2回かける
export const buildSsaoBlurWgsl = ( samples: number, vertical: boolean ) => {

	const weights = GLP.MathUtils.gaussWeights( samples );

	return /* wgsl */`
const BLUR_SAMPLES = ${samples};
const BLUR_WEIGHTS = array<f32, ${samples}>( ${wgslFloats( weights )} );
const BLUR_DIRECTION = vec2f( ${vertical ? '0.0, 1.0' : '1.0, 0.0'} );

const ALPHA = 32.0;
const BETA = 0.25;

// 深度はgBufferのワールド座標からカメラ距離として求める
fn viewDepth( uv: vec2f ) -> f32 {

	return length( textureSampleLevel( uGbufferPos, ppSamplerNearest, uv, 0.0 ).xyz - frame.uCameraPosition );

}

fn bilateralWeight( uv: vec2f, normalBasis: vec3f, depthBasis: f32 ) -> f32 {

	let normalOffset = textureSampleLevel( uGbufferNormal, ppSamplerNearest, uv, 0.0 ).xyz;
	let depthOffset = viewDepth( uv );

	return pow( ( dot( normalBasis, normalOffset ) + 1.0 ) / 2.0, ALPHA )
		* pow( 1.0 / ( abs( depthBasis - depthOffset ) + 0.001 ), BETA );

}

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let normalBasis = textureSampleLevel( uGbufferNormal, ppSamplerNearest, input.uv, 0.0 ).xyz;
	let depthBasis = viewDepth( input.uv );

	var occlusion = textureSampleLevel( uBackBuffer0, ppSampler, input.uv, 0.0 ).x * BLUR_WEIGHTS[ 0 ];
	var weight = BLUR_WEIGHTS[ 0 ];

	for ( var i = 1; i < BLUR_SAMPLES; i ++ ) {

		let offset = f32( i ) * BLUR_DIRECTION * pp.uPPPixelSize;

		let uvP = input.uv + offset;
		let uvN = input.uv - offset;

		let wP = bilateralWeight( uvP, normalBasis, depthBasis ) * BLUR_WEIGHTS[ i ];
		let wN = bilateralWeight( uvN, normalBasis, depthBasis ) * BLUR_WEIGHTS[ i ];

		occlusion += textureSampleLevel( uBackBuffer0, ppSampler, uvP, 0.0 ).x * wP;
		occlusion += textureSampleLevel( uBackBuffer0, ppSampler, uvN, 0.0 ).x * wN;

		weight += wP + wN;

	}

	return vec4f( vec3f( occlusion / weight ), 1.0 );

}
`;

};

/*-------------------------------
	bloom
-------------------------------*/

export const bloomBrightWgsl = /* wgsl */`
@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let color = textureSampleLevel( uSceneHdr, ppSampler, input.uv, 0.0 ).xyz;

	return vec4f( max( color - pp.uThreshold, vec3f( 0.0 ) ) / 10.0 * pp.uBrightness, 1.0 );

}
`;

export const buildGaussBlurWgsl = ( samples: number, vertical: boolean ) => {

	const weights = GLP.MathUtils.gaussWeights( samples );

	return /* wgsl */`
const BLUR_SAMPLES = ${samples};
const BLUR_WEIGHTS = array<f32, ${samples}>( ${wgslFloats( weights )} );
const BLUR_DIRECTION = vec2f( ${vertical ? '0.0, 1.0' : '1.0, 0.0'} );

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	var sum = BLUR_WEIGHTS[ 0 ] * textureSampleLevel( uBackBuffer0, ppSampler, input.uv, 0.0 ).xyz;

	for ( var i = 1; i < BLUR_SAMPLES; i ++ ) {

		let offset = f32( i ) * BLUR_DIRECTION * pp.uBlurRange * pp.uPPPixelSize;

		sum += BLUR_WEIGHTS[ i ] * textureSampleLevel( uBackBuffer0, ppSampler, input.uv + offset, 0.0 ).xyz;
		sum += BLUR_WEIGHTS[ i ] * textureSampleLevel( uBackBuffer0, ppSampler, input.uv - offset, 0.0 ).xyz;

	}

	return vec4f( sum, 1.0 );

}
`;

};

export const buildBloomCompositeWgsl = ( levels: number ) => {

	const adds = [];

	for ( let i = 0; i < levels; i ++ ) {

		adds.push( `	color += textureSampleLevel( uBloom${i}, ppSampler, input.uv, 0.0 ).xyz * ${( ( i + 1 ) / levels ).toFixed( 6 )};` );

	}

	return /* wgsl */`
@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	var color = textureSampleLevel( uBackBuffer0, ppSampler, input.uv, 0.0 ).xyz;

${adds.join( '\n' )}

	return vec4f( color, 1.0 );

}
`;

};

/*-------------------------------
	fxaa
-------------------------------*/

// 輝度の勾配方向にだけ2タップ足す簡易FXAA
export const fxaaWgsl = /* wgsl */`
const LUMA = vec3f( 0.299, 0.587, 0.114 );
const EDGE_THRESHOLD = 0.0312;
const SPAN_MAX = 8.0;

fn luma( uv: vec2f ) -> f32 {

	return dot( textureSampleLevel( uBackBuffer0, ppSampler, uv, 0.0 ).xyz, LUMA );

}

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let texel = pp.uPPPixelSize;

	let lumaM = luma( input.uv );
	let lumaNW = luma( input.uv + vec2f( - texel.x, - texel.y ) );
	let lumaNE = luma( input.uv + vec2f( texel.x, - texel.y ) );
	let lumaSW = luma( input.uv + vec2f( - texel.x, texel.y ) );
	let lumaSE = luma( input.uv + vec2f( texel.x, texel.y ) );

	let lumaMin = min( lumaM, min( min( lumaNW, lumaNE ), min( lumaSW, lumaSE ) ) );
	let lumaMax = max( lumaM, max( max( lumaNW, lumaNE ), max( lumaSW, lumaSE ) ) );

	if ( lumaMax - lumaMin < lumaMax * EDGE_THRESHOLD ) {

		return textureSampleLevel( uBackBuffer0, ppSampler, input.uv, 0.0 );

	}

	var dir = vec2f(
		- ( ( lumaNW + lumaNE ) - ( lumaSW + lumaSE ) ),
		( ( lumaNW + lumaSW ) - ( lumaNE + lumaSE ) )
	);

	let reduce = max( ( lumaNW + lumaNE + lumaSW + lumaSE ) * 0.03125, 0.0078125 );
	let scale = 1.0 / ( min( abs( dir.x ), abs( dir.y ) ) + reduce );

	dir = clamp( dir * scale, vec2f( - SPAN_MAX ), vec2f( SPAN_MAX ) ) * texel;

	let rgbA = 0.5 * (
		textureSampleLevel( uBackBuffer0, ppSampler, input.uv + dir * ( 1.0 / 3.0 - 0.5 ), 0.0 ).xyz
		+ textureSampleLevel( uBackBuffer0, ppSampler, input.uv + dir * ( 2.0 / 3.0 - 0.5 ), 0.0 ).xyz
	);

	let rgbB = rgbA * 0.5 + 0.25 * (
		textureSampleLevel( uBackBuffer0, ppSampler, input.uv - dir * 0.5, 0.0 ).xyz
		+ textureSampleLevel( uBackBuffer0, ppSampler, input.uv + dir * 0.5, 0.0 ).xyz
	);

	let lumaB = dot( rgbB, LUMA );

	if ( lumaB < lumaMin || lumaB > lumaMax ) {

		return vec4f( rgbA, 1.0 );

	}

	return vec4f( rgbB, 1.0 );

}
`;
