// テクスチャをそのまま転写する（blit / AssetPreview 共用）

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	return vec4f( textureSampleLevel( uSrc0, editorSampler, input.uv, 0.0 ).xyz, 1.0 );

}
