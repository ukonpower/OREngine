// SSR の結果をシーンへ合成する。Surface.ssr の面は環境マップの鏡面反射を SSR の結果で置き換え、
// それ以外の面はフレネルと粗さで重み付けして反射色を足す。
//
// 外から与えられる名前:
//   uEnvReflection（shading.wgsl の envReflection。rgb = SSR で置き換える環境の鏡面反射 / a = 置き換えの重み）

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
	let material = textureSampleLevel( uGbufferMaterial, ppSamplerNearest, input.uv, 0.0 );
	let ssr = textureSampleLevel( uSSRTexture, ppSampler, input.uv, 0.0 );

	// SSR は当たらなかった画素を 0 にして均すので、a が当たった割合で、rgb は当たった色にその割合が掛かっている
	let coverage = ssr.w;
	let hit = ssrDecompress( ssr.xyz / max( coverage, 0.0001 ) );

	// 置き換え。当たった割合だけ環境の鏡面反射を抜き、同じ重みで SSR の色を入れる。
	// 重みはスカラーで来るので、shading.wgsl の specularColor（金属は albedo の色）をここで掛ける
	let envReflection = textureSampleLevel( uEnvReflection, ppSamplerNearest, input.uv, 0.0 );
	let albedo = textureSampleLevel( uGbufferAlbedo, ppSamplerNearest, input.uv, 0.0 ).xyz;
	let specularColor = mix( vec3f( 1.0 ), albedo, material.y );

	color += ( hit * envReflection.w * specularColor - envReflection.xyz ) * coverage;

	// 加算。SSR は鏡面の1本のレイしか引かないので、粗い面ほど弱めて roughness = 1 で消す。
	// 置き換えた面には足さない（gBuffer の velocity.z が Surface.ssr。forward が上から描いた画素は 0 になる）
	let f = ssFresnel( clamp( dot( viewDirection( position ), normal ), 0.0, 1.0 ) );
	let smoothness = 1.0 - material.x;
	let additive = 1.0 - textureSampleLevel( uVelTex, ppSamplerNearest, input.uv, 0.0 ).z;

	color += f * smoothness * smoothness * ssrDecompress( ssr.xyz ) * 0.15 * additive;

	return vec4f( max( color, vec3f( 0.0 ) ), 1.0 );

}
