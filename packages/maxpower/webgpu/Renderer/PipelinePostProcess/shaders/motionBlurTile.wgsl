// タイル内でいちばん長い速度ベクトルを拾う。TILE は buildMotionBlurTileWgsl が前置する

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	var vel = vec2f( 0.0 );

	for ( var i = 0; i < TILE; i ++ ) {

		for ( var j = 0; j < TILE; j ++ ) {

			let offset = vec2f(
				( f32( j ) / f32( TILE - 1 ) - 0.5 ) * pp.uPPPixelSize.x / f32( TILE ),
				( f32( i ) / f32( TILE - 1 ) - 0.5 ) * pp.uPPPixelSize.y / f32( TILE )
			);

			let current = textureSampleLevel( uVelTex, ppSamplerNearest, input.uv + offset, 0.0 ).xy;

			if ( length( current ) > length( vel ) ) {

				vel = current;

			}

		}

	}

	return vec4f( vel, 0.0, 1.0 );

}
