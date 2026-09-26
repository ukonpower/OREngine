// フレネルと粗さで重み付けして反射色を足す

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

	let position = textureSampleLevel( uGbufferPos, ppSamplerNearest, input.uv, 0.0 ).xyz;

	var color = textureSampleLevel( uBackBuffer0, ppSampler, input.uv, 0.0 ).xyz;

	// 空の法線は外向き（カメラと逆向き）で、フレネルが最大になって反射が強く乗るので外す。
	// SSR は半分の解像度を線形補間で引くので、隣の面の反射がにじんでくる分もここで止まる
	if ( isBackground( position ) ) {

		return vec4f( color, 1.0 );

	}

	let normal = textureSampleLevel( uGbufferNormal, ppSamplerNearest, input.uv, 0.0 ).xyz;
	let f = ssFresnel( clamp( dot( viewDirection( position ), normal ), 0.0, 1.0 ) );

	// SSR は鏡面の1本のレイしか引かないので、粗い面ほど弱めて roughness = 1 で消す
	let smoothness = 1.0 - textureSampleLevel( uGbufferMaterial, ppSamplerNearest, input.uv, 0.0 ).x;

	color += f * smoothness * smoothness * ssrDecompress( textureSampleLevel( uSSRTexture, ppSampler, input.uv, 0.0 ).xyz ) * 0.15;

	return vec4f( color, 1.0 );

}
