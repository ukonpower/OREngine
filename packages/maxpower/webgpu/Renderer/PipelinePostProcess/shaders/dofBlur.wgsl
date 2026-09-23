// ボケの後にかける 9-tap のテントフィルタ（KinoBokeh の Composition.cginc frag_Blur2）
//
// 外から与えられる名前:
//   uBokeTex … dof/bokeh の出力（1/2 解像度。このパスの出力先と同じ大きさ）

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let duv = pp.uPPPixelSize.xyxy * vec4f( 1.0, 1.0, - 1.0, 0.0 );

	var acc = textureSampleLevel( uBokeTex, ppSampler, input.uv - duv.xy, 0.0 );
	acc += textureSampleLevel( uBokeTex, ppSampler, input.uv - duv.wy, 0.0 ) * 2.0;
	acc += textureSampleLevel( uBokeTex, ppSampler, input.uv - duv.zy, 0.0 );

	acc += textureSampleLevel( uBokeTex, ppSampler, input.uv + duv.zw, 0.0 ) * 2.0;
	acc += textureSampleLevel( uBokeTex, ppSampler, input.uv, 0.0 ) * 4.0;
	acc += textureSampleLevel( uBokeTex, ppSampler, input.uv + duv.xw, 0.0 ) * 2.0;

	acc += textureSampleLevel( uBokeTex, ppSampler, input.uv + duv.zy, 0.0 );
	acc += textureSampleLevel( uBokeTex, ppSampler, input.uv + duv.wy, 0.0 ) * 2.0;
	acc += textureSampleLevel( uBokeTex, ppSampler, input.uv + duv.xy, 0.0 );

	return acc / 16.0;

}
