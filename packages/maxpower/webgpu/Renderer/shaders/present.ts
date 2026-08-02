// シーンバッファ（rgba16float）をキャンバスへ出す。
// 解像度が一致しているため textureLoad で等倍転写する（サンプラー不要）
export const presentWgsl = /* wgsl */`
@group(0) @binding(0) var sceneTexture: texture_2d<f32>;

@vertex
fn vsMain( @builtin(vertex_index) index: u32 ) -> @builtin(position) vec4f {

	let x = f32( ( index << 1u ) & 2u );
	let y = f32( index & 2u );

	return vec4f( x * 2.0 - 1.0, y * 2.0 - 1.0, 0.0, 1.0 );

}

@fragment
fn fsMain( @builtin(position) coord: vec4f ) -> @location(0) vec4f {

	return vec4f( textureLoad( sceneTexture, vec2i( coord.xy ), 0 ).xyz, 1.0 );

}
`;
