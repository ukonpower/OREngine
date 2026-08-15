// エディタのフルスクリーンパスは group0 だけを使う自己完結の形にしている
// （レンダラーのフレームuniformに依存しないので、任意のターゲットへ描ける）

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
