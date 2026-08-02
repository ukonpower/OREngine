// ACES フィルミックトーンマップ（Stephen Hill のフィット）

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
