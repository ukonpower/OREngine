/*-------------------------------
	スクリーンスペース系パスのWGSL

	webgl側の normalSelector.fs / lightShaft.fs / ssr.fs / ssComposite.fs /
	dofCoc.fs / dofBokeh.fs / dofComposite.fs / motionBlurTile.fs /
	motionBlurNeighbor.fs / motionBlur.fs / ColorGrading / Finalize を移植したもの。

	webgl版が深度テクスチャからワールド座標を復元していたところは、
	gBufferがワールド座標をそのまま持っているのでそちらを読む
	（深度アタッチメントをサンプル可能にする必要がなくなる）。
	テクスチャ参照は一様制御フロー制約を避けるため全て textureSampleLevel。
-------------------------------*/

const RANDOM_WGSL = /* wgsl */`
fn random( co: vec2f ) -> f32 {

	return fract( sin( dot( co, vec2f( 12.9898, 78.233 ) ) ) * 43758.5453 );

}
`;

/*-------------------------------
	normalSelector
-------------------------------*/

// gBufferの法線と、位置から復元した法線を選択的に混ぜる（SSR用のなめらかな法線）
export const normalSelectorWgsl = /* wgsl */`
@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let normalTex = textureSampleLevel( uNormalTexture, ppSamplerNearest, input.uv, 0.0 );
	let texel = pp.uPPPixelSize;

	let center = textureSampleLevel( uPosTexture, ppSamplerNearest, input.uv, 0.0 ).xyz;
	let right = textureSampleLevel( uPosTexture, ppSamplerNearest, input.uv + vec2f( texel.x, 0.0 ), 0.0 ).xyz;
	let top = textureSampleLevel( uPosTexture, ppSamplerNearest, input.uv + vec2f( 0.0, texel.y ), 0.0 ).xyz;
	let left = textureSampleLevel( uPosTexture, ppSamplerNearest, input.uv - vec2f( texel.x, 0.0 ), 0.0 ).xyz;
	let bottom = textureSampleLevel( uPosTexture, ppSamplerNearest, input.uv - vec2f( 0.0, texel.y ), 0.0 ).xyz;

	let dx1 = right - center;
	let dy1 = top - center;
	let dx2 = - ( left - center );
	let dy2 = - ( bottom - center );

	let calcNormal = normalize( cross(
		select( dx2, dx1, length( dx1 ) < length( dx2 ) ),
		select( dy2, dy1, length( dy1 ) < length( dy2 ) )
	) );

	let selector = textureSampleLevel( uSelectorTexture, ppSampler, input.uv, 0.0 );

	return vec4f( mix( normalTex.xyz, calcNormal, selector.z ), normalTex.w );

}
`;

/*-------------------------------
	lightShaft
-------------------------------*/

// カメラからの視線をレイマーチしてシャドウマップを引き、光の筋を積む
export const lightShaftWgsl = RANDOM_WGSL + /* wgsl */`
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
`;

/*-------------------------------
	ssr
-------------------------------*/

// 反射方向へレイマーチしてシーンを引く
export const ssrWgsl = RANDOM_WGSL + /* wgsl */`
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
`;

// フレネルで重み付けして反射色を足す
export const ssCompositeWgsl = /* wgsl */`
fn ssFresnel( d: f32 ) -> f32 {

	let f0 = 0.04;

	return f0 + ( 1.0 - f0 ) * pow( 1.0 - d, 5.0 );

}

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let position = textureSampleLevel( uGbufferPos, ppSamplerNearest, input.uv, 0.0 );
	let normal = textureSampleLevel( uGbufferNormal, ppSamplerNearest, input.uv, 0.0 );

	var color = textureSampleLevel( uBackBuffer0, ppSampler, input.uv, 0.0 ).xyz;

	let dir = normalize( frame.uCameraPosition - position.xyz );
	let f = ssFresnel( clamp( dot( dir, normal.xyz ), 0.0, 1.0 ) );

	color += f * textureSampleLevel( uSSRTexture, ppSampler, input.uv, 0.0 ).xyz * 0.15;

	return vec4f( color, 1.0 );

}
`;

/*-------------------------------
	dof（KinoBokeh 由来）
-------------------------------*/

export const dofCocWgsl = /* wgsl */`
fn sampleDepth( uv: vec2f ) -> f32 {

	return - ( frame.uViewMatrix * vec4f( textureSampleLevel( uGbufferPos, ppSamplerNearest, uv, 0.0 ).xyz, 1.0 ) ).z;

}

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let focusDistance = pp.uParams.x;
	let maxCoc = pp.uParams.y;
	let rcpMaxCoc = pp.uParams.z;
	let lensCoeff = pp.uParams.w;

	let texel = pp.uPPPixelSize;
	let duv = vec3f( texel.x, texel.y, - texel.x ) * 0.5;

	let c0 = textureSampleLevel( uBackBuffer0, ppSampler, input.uv - duv.xy, 0.0 ).xyz;
	let c1 = textureSampleLevel( uBackBuffer0, ppSampler, input.uv - duv.zy, 0.0 ).xyz;
	let c2 = textureSampleLevel( uBackBuffer0, ppSampler, input.uv + duv.zy, 0.0 ).xyz;
	let c3 = textureSampleLevel( uBackBuffer0, ppSampler, input.uv + duv.xy, 0.0 ).xyz;

	let depth = sampleDepth( input.uv );
	let depths = vec4f( depth );

	var cocs = ( depths - focusDistance ) * lensCoeff / depths;
	cocs = clamp( cocs, vec4f( - maxCoc ), vec4f( maxCoc ) );

	let weights = clamp( abs( cocs ) * rcpMaxCoc, vec4f( 0.0 ), vec4f( 1.0 ) );

	var avg = c0 * weights.x + c1 * weights.y + c2 * weights.z + c3 * weights.w;
	avg /= dot( weights, vec4f( 1.0 ) ) + 0.0001;

	let coc = dot( cocs, vec4f( 0.25 ) );

	avg *= smoothstep( 0.0, texel.y * 2.0, abs( coc ) );

	return vec4f( avg, coc );

}
`;

// ディスク状カーネルのボケ。手前/奥を別々に積んでから合成する
export const buildDofBokehWgsl = () => {

	const kernel = [
		[ 0, 0 ], [ 0.36363637, 0 ], [ 0.22672357, 0.28430238 ], [ - 0.08091671, 0.35451925 ],
		[ - 0.32762504, 0.15777594 ], [ - 0.32762504, - 0.15777591 ], [ - 0.08091656, - 0.35451928 ],
		[ 0.22672352, - 0.2843024 ], [ 0.6818182, 0 ], [ 0.614297, 0.29582983 ], [ 0.42510667, 0.5330669 ],
		[ 0.15171885, 0.6647236 ], [ - 0.15171883, 0.6647236 ], [ - 0.4251068, 0.53306687 ],
		[ - 0.614297, 0.29582986 ], [ - 0.6818182, 0 ], [ - 0.614297, - 0.29582983 ],
		[ - 0.42510656, - 0.53306705 ], [ - 0.15171856, - 0.66472363 ], [ 0.1517192, - 0.6647235 ],
		[ 0.4251066, - 0.53306705 ], [ 0.614297, - 0.29582983 ], [ 1, 0 ], [ 0.9555728, 0.2947552 ],
		[ 0.82623875, 0.5633201 ], [ 0.6234898, 0.7818315 ], [ 0.36534098, 0.93087375 ], [ 0.07473, 0.9972038 ],
		[ - 0.22252095, 0.9749279 ], [ - 0.50000006, 0.8660254 ], [ - 0.73305196, 0.6801727 ],
		[ - 0.90096885, 0.43388382 ], [ - 0.98883086, 0.14904208 ], [ - 0.9888308, - 0.14904249 ],
		[ - 0.90096885, - 0.43388376 ], [ - 0.73305184, - 0.6801728 ], [ - 0.4999999, - 0.86602545 ],
		[ - 0.222521, - 0.9749279 ], [ 0.07473029, - 0.99720377 ], [ 0.36534148, - 0.9308736 ],
		[ 0.6234897, - 0.7818316 ], [ 0.8262388, - 0.56332 ], [ 0.9555729, - 0.29475483 ],
	];

	return /* wgsl */`
const BOKEH_SAMPLES = ${kernel.length};

const BOKEH_KERNEL = array<vec2f, ${kernel.length}>(
	${kernel.map( ( k ) => `vec2f( ${k[ 0 ]}, ${k[ 1 ]} )` ).join( ',\n\t' )}
);

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let maxCoc = pp.uParams.y;
	let texel = pp.uPPPixelSize;
	let rcpAspect = texel.x / texel.y;
	let margin = texel.y * 2.0;

	let center = textureSampleLevel( uCocTex, ppSampler, input.uv, 0.0 );

	var bgAcc = vec4f( 0.0 );
	var fgAcc = vec4f( 0.0 );

	for ( var i = 0; i < BOKEH_SAMPLES; i ++ ) {

		let disp = BOKEH_KERNEL[ i ] * maxCoc;
		let dist = length( disp );

		let samp = textureSampleLevel( uCocTex, ppSampler, input.uv + vec2f( disp.x * rcpAspect, disp.y ), 0.0 );

		let bgCoc = max( min( center.a, samp.a ), 0.0 );

		let bgWeight = clamp( ( bgCoc - dist + margin ) / margin, 0.0, 1.0 );
		var fgWeight = clamp( ( - samp.a - dist + margin ) / margin, 0.0, 1.0 );

		fgWeight *= step( texel.y, - samp.a );

		bgAcc += vec4f( samp.rgb, 1.0 ) * bgWeight;
		fgAcc += vec4f( samp.rgb, 1.0 ) * fgWeight;

	}

	var bg = bgAcc.rgb / ( bgAcc.a + select( 0.0, 1.0, bgAcc.a == 0.0 ) );
	var fg = fgAcc.rgb / ( fgAcc.a + select( 0.0, 1.0, fgAcc.a == 0.0 ) );

	let bgAlpha = smoothstep( texel.y, texel.y * 2.0, center.a );
	let fgAlpha = fgAcc.a * PI / f32( BOKEH_SAMPLES );

	var rgb = vec3f( 0.0 );
	rgb = mix( rgb, bg, clamp( bgAlpha, 0.0, 1.0 ) );
	rgb = mix( rgb, fg, clamp( fgAlpha, 0.0, 1.0 ) );

	return vec4f( rgb, ( 1.0 - clamp( bgAlpha, 0.0, 1.0 ) ) * ( 1.0 - clamp( fgAlpha, 0.0, 1.0 ) ) );

}
`;

};

export const dofCompositeWgsl = /* wgsl */`
@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let scene = textureSampleLevel( uBackBuffer0, ppSampler, input.uv, 0.0 );
	let boke = textureSampleLevel( uBokeTex, ppSampler, input.uv, 0.0 );

	return vec4f( scene.rgb * boke.a + boke.rgb, 1.0 );

}
`;

/*-------------------------------
	motion blur
-------------------------------*/

// タイル内でいちばん長い速度ベクトルを拾う
export const buildMotionBlurTileWgsl = ( tile: number, source: string ) => /* wgsl */`
const TILE = ${tile};

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	var vel = vec2f( 0.0 );

	for ( var i = 0; i < TILE; i ++ ) {

		for ( var j = 0; j < TILE; j ++ ) {

			let offset = vec2f(
				( f32( j ) / f32( TILE - 1 ) - 0.5 ) * pp.uPPPixelSize.x / f32( TILE ),
				( f32( i ) / f32( TILE - 1 ) - 0.5 ) * pp.uPPPixelSize.y / f32( TILE )
			);

			let current = textureSampleLevel( ${source}, ppSamplerNearest, input.uv + offset, 0.0 ).xy;

			if ( length( current ) > length( vel ) ) {

				vel = current;

			}

		}

	}

	return vec4f( vel, 0.0, 1.0 );

}
`;

// 近傍タイルへ広げる
export const motionBlurNeighborWgsl = /* wgsl */`
const NEIGHBOR = 3;

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	var vel = vec2f( 0.0 );

	for ( var i = 0; i < NEIGHBOR; i ++ ) {

		for ( var j = 0; j < NEIGHBOR; j ++ ) {

			let offset = vec2f(
				( f32( j ) / f32( NEIGHBOR - 1 ) - 0.5 ) * 2.0 * pp.uPPPixelSize.x,
				( f32( i ) / f32( NEIGHBOR - 1 ) - 0.5 ) * 2.0 * pp.uPPPixelSize.y
			);

			let current = textureSampleLevel( uVelTex, ppSampler, input.uv + offset, 0.0 ).xy;

			if ( length( current ) > length( vel ) ) {

				vel = current;

			}

		}

	}

	return vec4f( vel, 0.0, 1.0 );

}
`;

export const buildMotionBlurWgsl = ( tile: number ) => RANDOM_WGSL + /* wgsl */`
const TILE = ${tile};
const SAMPLES = 16;
const SOFT_Z_EXTENT = 0.1;

fn cone( x: vec2f, y: vec2f, v: vec2f ) -> f32 {

	return clamp( 1.0 - length( x - y ) / length( v ), 0.0, 1.0 );

}

fn cylinder( x: vec2f, y: vec2f, v: vec2f ) -> f32 {

	return 1.0 - smoothstep( 0.95 * length( v ), 1.05 * length( v ), length( x - y ) );

}

fn softDepthCompare( a: f32, b: f32 ) -> f32 {

	return clamp( 1.0 - ( a - b ) / SOFT_Z_EXTENT, 0.0, 1.0 );

}

// 深度はgBufferのワールド座標をビュー空間へ移して使う
fn linearDepth( uv: vec2f ) -> f32 {

	return ( frame.uViewMatrix * vec4f( textureSampleLevel( uGbufferPos, ppSamplerNearest, uv, 0.0 ).xyz, 1.0 ) ).z;

}

fn velocityAt( uv: vec2f, neighbor: bool ) -> vec2f {

	var velocity = select(
		textureSampleLevel( uVelTex, ppSamplerNearest, uv, 0.0 ).xy,
		textureSampleLevel( uVelNeighborTex, ppSampler, uv, 0.0 ).xy,
		neighbor
	);

	let len = length( velocity );

	if ( len == 0.0 ) {

		return vec2f( 0.0 );

	}

	velocity = velocity / len * clamp( len, 0.5 * pp.uPPPixelSize.y, f32( TILE ) * pp.uPPPixelSize.y );

	return velocity * pp.uPower;

}

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let x = input.uv;
	let velNeighbor = velocityAt( x, true );

	if ( length( velNeighbor ) <= pp.uPPPixelSize.y ) {

		return textureSampleLevel( uBackBuffer0, ppSampler, x, 0.0 );

	}

	let halfPixel = pp.uPPPixelSize * 0.5;

	var weight = min( 1.0 / max( length( velocityAt( x, false ) ), 0.0001 ), 3.0 );
	var sum = textureSampleLevel( uBackBuffer0, ppSampler, x, 0.0 ).xyz * weight;

	for ( var i = 0; i < SAMPLES; i ++ ) {

		let j = random( x + f32( i ) * 0.1 );
		let t = mix( - 1.0, 1.0, ( f32( i ) + j + 1.0 ) / ( f32( SAMPLES ) + 1.0 ) );

		let y = x + velNeighbor * t + halfPixel;

		let depthX = linearDepth( x );
		let depthY = linearDepth( y );

		let f = softDepthCompare( depthX, depthY );
		let b = softDepthCompare( depthY, depthX );

		let velY = velocityAt( y, false );
		let velX = velocityAt( x, false );

		let alphaY = f * cone( y, x, velY )
			+ b * cone( x, y, velX )
			+ cylinder( y, x, velY ) * cylinder( x, y, velX ) * 2.0;

		weight += alphaY;
		sum += alphaY * textureSampleLevel( uBackBuffer0, ppSampler, y, 0.0 ).xyz;

	}

	return vec4f( sum / weight, 1.0 );

}
`;

/*-------------------------------
	仕上げ
-------------------------------*/

export const colorGradingWgsl = /* wgsl */`
@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	return vec4f( textureSampleLevel( uBackBuffer0, ppSampler, input.uv, 0.0 ).xyz, 1.0 );

}
`;

// レンズ歪みと色収差、周辺減光
export const finalizeWgsl = /* wgsl */`
const STEPS = 8;

fn lensDistortion( r: vec2f, alpha: f32 ) -> vec2f {

	return r * ( 1.0 - alpha * dot( r, r ) );

}

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let cuv = input.uv - 0.5;
	let w = 0.05;
	let s = 0.98;

	var color = vec3f( 0.0 );

	for ( var i = 0; i < STEPS; i ++ ) {

		let d = - f32( i ) / f32( STEPS ) * w;

		color.x += textureSampleLevel( uBackBuffer0, ppSampler, lensDistortion( cuv * s, 0.0 ) + 0.5 + vec2f( ( f32( i ) / f32( STEPS ) - 0.5 ) * 0.002, 0.0 ), 0.0 ).x;
		color.y += textureSampleLevel( uBackBuffer0, ppSampler, lensDistortion( cuv * s, d * 3.0 ) + 0.5, 0.0 ).y;
		color.z += textureSampleLevel( uBackBuffer0, ppSampler, lensDistortion( cuv * s, d * 6.0 ) + 0.5, 0.0 ).z;

	}

	color /= f32( STEPS );
	color *= smoothstep( 1.2, 0.3, length( cuv ) );

	return vec4f( color, 1.0 );

}
`;
