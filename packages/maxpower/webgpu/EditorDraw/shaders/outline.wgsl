// マスクの境界を検出して線を乗せる

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let scene = textureSampleLevel( uSrc0, editorSampler, input.uv, 0.0 );
	let texel = 1.0 / editor.uResolution;

	let c = textureSampleLevel( uSrc1, editorSampler, input.uv, 0.0 ).r;
	let l = textureSampleLevel( uSrc1, editorSampler, input.uv + vec2f( - texel.x, 0.0 ), 0.0 ).r;
	let r = textureSampleLevel( uSrc1, editorSampler, input.uv + vec2f( texel.x, 0.0 ), 0.0 ).r;
	let t = textureSampleLevel( uSrc1, editorSampler, input.uv + vec2f( 0.0, texel.y ), 0.0 ).r;
	let b = textureSampleLevel( uSrc1, editorSampler, input.uv + vec2f( 0.0, - texel.y ), 0.0 ).r;
	let tl = textureSampleLevel( uSrc1, editorSampler, input.uv + vec2f( - texel.x, texel.y ), 0.0 ).r;
	let tr = textureSampleLevel( uSrc1, editorSampler, input.uv + vec2f( texel.x, texel.y ), 0.0 ).r;
	let bl = textureSampleLevel( uSrc1, editorSampler, input.uv + vec2f( - texel.x, - texel.y ), 0.0 ).r;
	let br = textureSampleLevel( uSrc1, editorSampler, input.uv + vec2f( texel.x, - texel.y ), 0.0 ).r;

	var edge = abs( c - l ) + abs( c - r ) + abs( c - t ) + abs( c - b )
		+ abs( c - tl ) * 0.7 + abs( c - tr ) * 0.7 + abs( c - bl ) * 0.7 + abs( c - br ) * 0.7;

	edge = smoothstep( 0.05, 0.2, edge );

	return mix( scene, vec4f( editor.uOutlineColor, 1.0 ), edge );

}
