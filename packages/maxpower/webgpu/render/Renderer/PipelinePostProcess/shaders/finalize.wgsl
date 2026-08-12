// レンズ歪みと色収差、周辺減光

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
