struct Params {
    uColor: vec3<f32>,
}

struct FragmentOutput {
    @location(0) outColor: vec4<f32>,
}

@group(0) @binding(0) 
var<uniform> global: Params;
@group(0) @binding(1) 
var uTex_tex: texture_2d<f32>;
@group(0) @binding(2) 
var uTex_smp: sampler;
var<private> vUv_1: vec2<f32>;
var<private> outColor: vec4<f32>;

fn main_1() {
    let _e6 = vUv_1;
    let _e7 = textureSample(uTex_tex, uTex_smp, _e6);
    let _e9 = global.uColor;
    let _e10 = (_e7.xyz * _e9);
    outColor = vec4<f32>(_e10.x, _e10.y, _e10.z, 1f);
    return;
}

@fragment 
fn main(@location(0) vUv: vec2<f32>) -> FragmentOutput {
    vUv_1 = vUv;
    main_1();
    let _e13 = outColor;
    return FragmentOutput(_e13);
}
