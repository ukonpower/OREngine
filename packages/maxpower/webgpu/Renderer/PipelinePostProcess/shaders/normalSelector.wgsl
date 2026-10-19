// gBufferの法線と、位置から復元した法線を選択的に混ぜる（SSR用のなめらかな法線）

// 中心から両隣への位置の差のうち短い方を返す。hasNext / hasPrev はその側の隣が画面の中にあるか。
// 画面の外の隣は clamp-to-edge で中心と同じ画素が返り、差が 0 になって必ず短い方に選ばれる。
// 0 の差からは cross が 0 になり法線が NaN になる（selector が 0 でも mix が NaN を返す）ので、端では内側の差を使う
fn nearerDiff( diffNext: vec3f, diffPrev: vec3f, hasNext: bool, hasPrev: bool ) -> vec3f {

	if ( ! hasNext ) {

		return diffPrev;

	}

	if ( ! hasPrev ) {

		return diffNext;

	}

	if ( length( diffNext ) < length( diffPrev ) ) {

		return diffNext;

	}

	return diffPrev;

}

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

	// 画素の中心の uv から1画素進めて 0〜1 を出たら、その側の隣は画面の外
	let hasRight = input.uv.x + texel.x < 1.0;
	let hasLeft = input.uv.x - texel.x > 0.0;
	let hasTop = input.uv.y + texel.y < 1.0;
	let hasBottom = input.uv.y - texel.y > 0.0;

	let calcNormal = normalize( cross(
		nearerDiff( dx1, dx2, hasRight, hasLeft ),
		nearerDiff( dy1, dy2, hasTop, hasBottom )
	) );

	let selector = textureSampleLevel( uSelectorTexture, ppSampler, input.uv, 0.0 );

	return vec4f( mix( normalTex.xyz, calcNormal, selector.z ), normalTex.w );

}
