struct Params {
    uColor: vec3<f32>,
}

var<private> outColor: vec4<f32>;
@group(0) @binding(1) 
var uTex_tex: texture_2d<f32>;
@group(0) @binding(2) 
var uTex_smp: sampler;
var<private> vUv_1: vec2<f32>;
@group(0) @binding(0) 
var<uniform> unnamed: Params;

fn main_1() {
    let _e7 = vUv_1;
    let _e8 = textureSample(uTex_tex, uTex_smp, _e7);
    let _e11 = unnamed.uColor;
    let _e12 = (_e8.xyz * _e11);
    outColor = vec4<f32>(_e12.x, _e12.y, _e12.z, 1f);
    return;
}

@fragment 
fn main(@location(0) vUv: vec2<f32>) -> @location(0) vec4<f32> {
    vUv_1 = vUv;
    main_1();
    let _e3 = outColor;
    return _e3;
}
