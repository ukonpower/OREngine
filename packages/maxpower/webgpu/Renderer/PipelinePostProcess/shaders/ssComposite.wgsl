// フレネルで重み付けして反射色を足す

#include "../../shaders/view.wgsl"

fn ssFresnel( d: f32 ) -> f32 {

	let f0 = 0.04;

	return f0 + ( 1.0 - f0 ) * pow( 1.0 - d, 5.0 );

}

// ssr.wgsl の ssrCompress で圧縮した反射色を元の明るさへ戻す。
// 圧縮後の輝度は 1 未満だが、半精度の丸めで 1 に届くと 0 除算になるので上限を置く（0.99 は元の輝度で約 99）
fn ssrDecompress( c: vec3f ) -> vec3f {

	return c / ( 1.0 - min( dot( c, vec3f( 0.2126, 0.7152, 0.0722 ) ), 0.99 ) );

}

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let position = textureSampleLevel( uGbufferPos, ppSamplerNearest, input.uv, 0.0 );
	let normal = textureSampleLevel( uGbufferNormal, ppSamplerNearest, input.uv, 0.0 );

	var color = textureSampleLevel( uBackBuffer0, ppSampler, input.uv, 0.0 ).xyz;

	let dir = viewDirection( position.xyz );
	let f = ssFresnel( clamp( dot( dir, normal.xyz ), 0.0, 1.0 ) );

	color += f * ssrDecompress( textureSampleLevel( uSSRTexture, ppSampler, input.uv, 0.0 ).xyz ) * 0.15;

	return vec4f( color, 1.0 );

}
