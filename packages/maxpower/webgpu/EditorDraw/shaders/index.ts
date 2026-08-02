/*-------------------------------
	エディタ描画のWGSL

	webgl側 EditorDraw/shaders の flat / mask / outline / texture を移植したもの。
	flat と mask はマテリアル（頂点あり）、outline / texture / blit はフルスクリーンパス。
-------------------------------*/

// gizmo / helper / wireframe。単色で塗るだけ
export const flatWgsl = /* wgsl */`
@fragment
fn fsForward( input: VertexOutput ) -> @location(0) vec4f {

	return vec4f( material.uColor, 1.0 );

}
`;

// 選択シルエット。白で塗りつぶす
export const maskWgsl = /* wgsl */`
@fragment
fn fsForward( _input: VertexOutput ) -> @location(0) vec4f {

	return vec4f( 1.0, 1.0, 1.0, 1.0 );

}
`;

/*-------------------------------
	フルスクリーン
-------------------------------*/

// エディタのフルスクリーンパスは group0 だけを使う自己完結の形にしている
// （レンダラーのフレームuniformに依存しないので、任意のターゲットへ描ける）
export const EDITOR_FULLSCREEN_WGSL = /* wgsl */`
struct FullscreenOutput {
	@builtin(position) position: vec4f,
	@location(0) uv: vec2f,
};

@vertex
fn vsMain( @builtin(vertex_index) index: u32 ) -> FullscreenOutput {

	let x = f32( ( index << 1u ) & 2u );
	let y = f32( index & 2u );

	var output: FullscreenOutput;

	output.position = vec4f( x * 2.0 - 1.0, y * 2.0 - 1.0, 0.0, 1.0 );
	output.uv = vec2f( x, 1.0 - y );

	return output;

}
`;

// テクスチャをそのまま転写する（blit / AssetPreview 共用）
export const copyWgsl = /* wgsl */`
@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	return vec4f( textureSampleLevel( uSrc0, editorSampler, input.uv, 0.0 ).xyz, 1.0 );

}
`;

// マスクの境界を検出して線を乗せる
export const outlineWgsl = /* wgsl */`
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
`;
