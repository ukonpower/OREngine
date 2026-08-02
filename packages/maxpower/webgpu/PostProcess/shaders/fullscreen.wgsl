// フルスクリーンパスの頂点シェーダーと座標変換。各パスの本体の前に置かれる

const PI = 3.14159265359;

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

	// フレームバッファの行0がNDC y=+1 側なので、v も同じ向きに合わせる
	output.uv = vec2f( x, 1.0 - y );

	return output;

}

// テクスチャ座標（Y下向き）とNDC（Y上向き）の相互変換。規約差はここだけで吸収する
fn uvToNdc( uv: vec2f ) -> vec2f {

	return vec2f( uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0 );

}

fn ndcToUv( ndc: vec2f ) -> vec2f {

	return vec2f( ndc.x * 0.5 + 0.5, ndc.y * - 0.5 + 0.5 );

}
