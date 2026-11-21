// シェーディングパス本体。webgl側 deferredShading.fs の移植。
// gBufferは rgba32float を含み filtering サンプラーで引けないため、
// フルスクリーンパスの画素位置から textureLoad で直接読む（サンプラーを持たない）。
// gBuffer / ライト / envMap / SSR の宣言は buildShadingSource が前置する

#include <module:lighting>
#include <module:view>

// SSR を環境マップの鏡面反射の代わりに使う粗さの範囲。SSR は鏡面方向の1本のレイしか引かずぼけないので、
// MIN 以下では当たった分をすべて SSR にし、MAX へ向けて環境マップへ戻す
const SSR_ROUGHNESS_MIN = 0.1;
const SSR_ROUGHNESS_MAX = 0.4;

// ssr.wgsl の ssrCompress で圧縮した反射色を元の明るさへ戻す。
// 圧縮後の輝度は 1 未満だが、半精度の丸めで 1 に届くと 0 除算になるので上限を置く（0.99 は元の輝度で約 99）
fn ssrDecompress( c: vec3f ) -> vec3f {

	return c / ( 1.0 - min( dot( c, vec3f( 0.2126, 0.7152, 0.0722 ) ), 0.99 ) );

}

@vertex
fn vsMain( @builtin(vertex_index) index: u32 ) -> @builtin(position) vec4f {

	let x = f32( ( index << 1u ) & 2u );
	let y = f32( index & 2u );

	return vec4f( x * 2.0 - 1.0, y * 2.0 - 1.0, 0.0, 1.0 );

}

// diffuse は SSS がぼかす入力。color の中の diffuse をぼかしたものへ置き換える
struct ShadingOutput {
	@location(0) color: vec4f,
	@location(1) diffuse: vec4f,
};

@fragment
fn fsMain( @builtin(position) coord: vec4f ) -> ShadingOutput {

	let pixel = vec2i( coord.xy );

	// SSAOは半解像度から拡大されるのでサンプラーで引く
	let occlusion = textureSampleLevel( ssaoTexture, envMapSampler, coord.xy / frame.uResolution, 0.0 ).x;

	let tex0 = textureLoad( gBuffer0, pixel, 0 );
	let tex1 = textureLoad( gBuffer1, pixel, 0 );
	let tex2 = textureLoad( gBuffer2, pixel, 0 );
	let tex3 = textureLoad( gBuffer3, pixel, 0 );
	let tex4 = textureLoad( gBuffer4, pixel, 0 );

	// 法線が書かれていない画素は背景
	if ( dot( tex1.xyz, tex1.xyz ) < 0.5 ) {

		return ShadingOutput( vec4f( 0.0, 0.0, 0.0, 1.0 ), vec4f( 0.0, 0.0, 0.0, 1.0 ) );

	}

	let worldPosition = tex0.xyz;
	let normal = normalize( tex1.xyz );
	let albedo = tex2.xyz;
	let roughness = tex3.x;
	let metallic = tex3.y;
	let envIntensity = tex3.w;
	let emission = vec3f( tex0.w, tex1.w, tex4.w );

	let viewDir = viewDirection( worldPosition );
	let surface = surfaceInfo( albedo, roughness, metallic, envIntensity );

	let direct = directLighting( worldPosition, normal, viewDir, surface );

	// 鏡面反射に入ってくる光のうち、SSR が当たった分（a）は画面に映っている物を使う。
	// SSR は半解像度なのでサンプラーで引き、時間方向に均した rgb を a で割って当たった色の平均に戻す
	let ssr = textureSampleLevel( ssrTexture, envMapSampler, coord.xy / frame.uResolution, 0.0 );
	let ssrHit = ssrDecompress( ssr.xyz / max( ssr.w, 0.0001 ) );
	let ssrWeight = ssr.w * ( 1.0 - smoothstep( SSR_ROUGHNESS_MIN, SSR_ROUGHNESS_MAX, roughness ) );

	let lit = envLighting( normal, viewDir, surface, direct, ssrHit, ssrWeight );

	let ao = max( 0.0, 1.0 - occlusion * 1.5 );

	let diffuse = lit.diffuse * ao;
	let specular = lit.specular * ao;

	var outColor = diffuse + specular + emission;

	// 光の筋（半解像度から拡大）
	outColor += textureSampleLevel( lightShaftTexture, envMapSampler, coord.xy / frame.uResolution, 0.0 ).xyz;

	return ShadingOutput( vec4f( max( vec3f( 0.0 ), outColor ), 1.0 ), vec4f( max( vec3f( 0.0 ), diffuse ), 1.0 ) );

}
