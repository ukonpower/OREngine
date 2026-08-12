// 速度タイルを近傍タイルへ広げる

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
