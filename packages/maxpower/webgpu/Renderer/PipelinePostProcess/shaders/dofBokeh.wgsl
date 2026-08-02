// ディスク状カーネルのボケ。手前/奥を別々に積んでから合成する

const BOKEH_SAMPLES = 43;

const BOKEH_KERNEL = array<vec2f, 43>(
	vec2f( 0, 0 ), vec2f( 0.36363637, 0 ), vec2f( 0.22672357, 0.28430238 ), vec2f( - 0.08091671, 0.35451925 ),
	vec2f( - 0.32762504, 0.15777594 ), vec2f( - 0.32762504, - 0.15777591 ), vec2f( - 0.08091656, - 0.35451928 ),
	vec2f( 0.22672352, - 0.2843024 ), vec2f( 0.6818182, 0 ), vec2f( 0.614297, 0.29582983 ), vec2f( 0.42510667, 0.5330669 ),
	vec2f( 0.15171885, 0.6647236 ), vec2f( - 0.15171883, 0.6647236 ), vec2f( - 0.4251068, 0.53306687 ),
	vec2f( - 0.614297, 0.29582986 ), vec2f( - 0.6818182, 0 ), vec2f( - 0.614297, - 0.29582983 ),
	vec2f( - 0.42510656, - 0.53306705 ), vec2f( - 0.15171856, - 0.66472363 ), vec2f( 0.1517192, - 0.6647235 ),
	vec2f( 0.4251066, - 0.53306705 ), vec2f( 0.614297, - 0.29582983 ), vec2f( 1, 0 ), vec2f( 0.9555728, 0.2947552 ),
	vec2f( 0.82623875, 0.5633201 ), vec2f( 0.6234898, 0.7818315 ), vec2f( 0.36534098, 0.93087375 ), vec2f( 0.07473, 0.9972038 ),
	vec2f( - 0.22252095, 0.9749279 ), vec2f( - 0.50000006, 0.8660254 ), vec2f( - 0.73305196, 0.6801727 ),
	vec2f( - 0.90096885, 0.43388382 ), vec2f( - 0.98883086, 0.14904208 ), vec2f( - 0.9888308, - 0.14904249 ),
	vec2f( - 0.90096885, - 0.43388376 ), vec2f( - 0.73305184, - 0.6801728 ), vec2f( - 0.4999999, - 0.86602545 ),
	vec2f( - 0.222521, - 0.9749279 ), vec2f( 0.07473029, - 0.99720377 ), vec2f( 0.36534148, - 0.9308736 ),
	vec2f( 0.6234897, - 0.7818316 ), vec2f( 0.8262388, - 0.56332 ), vec2f( 0.9555729, - 0.29475483 )
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
