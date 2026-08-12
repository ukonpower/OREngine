// 速度ベクトルに沿ってシーンを積む。TILE は buildMotionBlurWgsl が前置する

#include "./random.wgsl"

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
