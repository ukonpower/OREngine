struct Geometry {
    position: vec3<f32>,
    normal: vec3<f32>,
    depth: f32,
    viewDir: vec3<f32>,
    viewDirWorld: vec3<f32>,
    occulusion: f32,
}

struct Material {
    color: vec3<f32>,
    roughness: f32,
    metallic: f32,
    emission: vec3<f32>,
    diffuseColor: vec3<f32>,
    specularColor: vec3<f32>,
    envMapIntensity: f32,
}

struct DirectionalLight {
    direction: vec3<f32>,
    color: vec3<f32>,
}

struct SpotLight {
    position: vec3<f32>,
    direction: vec3<f32>,
    color: vec3<f32>,
    angle: f32,
    blend: f32,
    distance: f32,
    decay: f32,
}

struct LightCamera {
    near: f32,
    far: f32,
    uViewMatrix: mat4x4<f32>,
    uProjectionMatrix: mat4x4<f32>,
    resolution: vec2<f32>,
}

struct Light {
    direction: vec3<f32>,
    color: vec3<f32>,
}

struct Params {
    directionalLight: array<DirectionalLight, 1>,
    uDirectionalLightCamera: array<LightCamera, 1>,
    uColor: vec3<f32>,
    uViewMatrix: mat4x4<f32>,
    uCameraMatrix: mat4x4<f32>,
    uCameraPosition: vec3<f32>,
}

struct FragmentOutput {
    @location(0) glFragOut0_: vec4<f32>,
    @location(1) glFragOut1_: vec4<f32>,
}

@group(0) @binding(0) 
var<uniform> global: Params;
@group(0) @binding(1) 
var directionalLightShadowMap_0_tex: texture_2d<f32>;
@group(0) @binding(2) 
var directionalLightShadowMap_0_smp: sampler;
@group(0) @binding(3) 
var sampler0_tex: texture_2d<f32>;
@group(0) @binding(4) 
var sampler0_smp: sampler;
@group(0) @binding(5) 
var sampler1_tex: texture_2d<f32>;
@group(0) @binding(6) 
var sampler1_smp: sampler;
@group(0) @binding(7) 
var sampler2_tex: texture_2d<f32>;
@group(0) @binding(8) 
var sampler2_smp: sampler;
@group(0) @binding(9) 
var sampler3_tex: texture_2d<f32>;
@group(0) @binding(10) 
var sampler3_smp: sampler;
@group(0) @binding(11) 
var sampler4_tex: texture_2d<f32>;
@group(0) @binding(12) 
var sampler4_smp: sampler;
@group(0) @binding(13) 
var uSSAOTexture_tex: texture_2d<f32>;
@group(0) @binding(14) 
var uSSAOTexture_smp: sampler;
@group(0) @binding(15) 
var uLightShaftTexture_tex: texture_2d<f32>;
@group(0) @binding(16) 
var uLightShaftTexture_smp: sampler;
@group(0) @binding(17) 
var uEnvMap_tex: texture_2d<f32>;
@group(0) @binding(18) 
var uEnvMap_smp: sampler;
var<private> vUv_1: vec2<f32>;
var<private> glFragOut0_: vec4<f32>;
var<private> glFragOut1_: vec4<f32>;

fn sinn(x: f32) -> f32 {
    var x_1: f32;

    x_1 = x;
    let _e2 = x_1;
    return ((sin((_e2 - 1.5707964f)) * 0.5f) + 0.5f);
}

fn atan2_(y: f32, x_2: f32) -> f32 {
    var y_1: f32;
    var x_3: f32;
    var local: f32;

    y_1 = y;
    x_3 = x_2;
    let _e4 = x_3;
    if (_e4 == 0f) {
        let _e7 = y_1;
        local = ((sign(_e7) * 3.1415927f) / 2f);
    } else {
        let _e13 = y_1;
        let _e14 = x_3;
        local = atan2(_e13, _e14);
    }
    let _e17 = local;
    return _e17;
}

fn easeInOut(x_4: f32) -> f32 {
    var x_5: f32;
    var local_1: f32;

    x_5 = x_4;
    let _e2 = x_5;
    if (_e2 < 0.5f) {
        let _e6 = x_5;
        let _e8 = x_5;
        let _e10 = x_5;
        let _e12 = x_5;
        local_1 = ((((8f * _e6) * _e8) * _e10) * _e12);
    } else {
        let _e17 = x_5;
        local_1 = (1f - (pow(((-2f * _e17) + 2f), 4f) / 2f));
    }
    let _e27 = local_1;
    return _e27;
}

fn easeOut(t: f32, k: f32) -> f32 {
    var t_1: f32;
    var k_1: f32;
    var x_6: f32;
    var s0_: f32 = 1f;
    var s1_: f32;

    t_1 = t;
    k_1 = k;
    let _e4 = t_1;
    let _e9 = k_1;
    x_6 = exp((-(clamp(_e4, 0f, 1f)) * _e9));
    let _e15 = k_1;
    s1_ = exp(-(_e15));
    let _e19 = x_6;
    let _e20 = s0_;
    let _e22 = s1_;
    let _e23 = s0_;
    return ((_e19 - _e20) / (_e22 - _e23));
}

fn easeIn(t_2: f32, k_2: f32) -> f32 {
    var t_3: f32;
    var k_3: f32;

    t_3 = t_2;
    k_3 = k_2;
    let _e6 = t_3;
    let _e8 = k_3;
    let _e9 = easeOut((1f - _e6), _e8);
    return (1f - _e9);
}

fn easeBounce(t_4: f32, b: f32) -> f32 {
    var t_5: f32;
    var b_1: f32;

    t_5 = t_4;
    b_1 = b;
    let _e5 = t_5;
    t_5 = (1f - _e5);
    let _e8 = t_5;
    let _e9 = t_5;
    let _e11 = b_1;
    let _e12 = t_5;
    let _e14 = b_1;
    return (1f - ((_e8 * _e9) * (((_e11 * _e12) - _e14) + 1f)));
}

fn hsv2rgb(hsv: vec3<f32>) -> vec3<f32> {
    var hsv_1: vec3<f32>;

    hsv_1 = hsv;
    let _e2 = hsv_1;
    let _e39 = hsv_1;
    let _e45 = hsv_1;
    return ((((clamp((abs(((fract((vec3(_e2.x) + vec3<f32>(0f, 0.6666667f, 0.33333334f))) * 6f) - vec3(3f))) - vec3(1f)), vec3(0f), vec3(1f)) - vec3(1f)) * _e39.y) + vec3(1f)) * _e45.z);
}

fn srgbToLinear(srgb: vec3<f32>) -> vec3<f32> {
    var srgb_1: vec3<f32>;

    srgb_1 = srgb;
    let _e2 = srgb_1;
    let _e6 = srgb_1;
    let _e17 = srgb_1;
    return mix((_e2 / vec3(12.92f)), pow(((_e6 + vec3(0.055f)) / vec3(1.055f)), vec3(2.4f)), step(vec3(0.04045f), _e17));
}

fn linearToSrgb(linear: vec3<f32>) -> vec3<f32> {
    var linear_1: vec3<f32>;

    linear_1 = linear;
    let _e2 = linear_1;
    let _e5 = linear_1;
    let _e17 = linear_1;
    return mix((_e2 * 12.92f), ((pow(_e5, vec3(0.41666666f)) * 1.055f) - vec3(0.055f)), step(vec3(0.0031308f), _e17));
}

fn floatToRGBA(v: f32) -> vec4<f32> {
    var v_1: f32;
    var enc: vec4<f32>;

    v_1 = v;
    let _e7 = v_1;
    enc = (vec4<f32>(1f, 255f, 65025f, 16581375f) * _e7);
    let _e10 = enc;
    enc = fract(_e10);
    let _e12 = enc;
    let _e13 = enc;
    enc = (_e12 - (_e13.yzww * vec4<f32>(0.003921569f, 0.003921569f, 0.003921569f, 0f)));
    let _e28 = enc;
    return _e28;
}

fn rgbaToFloat(rgba: vec4<f32>) -> f32 {
    var rgba_1: vec4<f32>;

    rgba_1 = rgba;
    let _e2 = rgba_1;
    return dot(_e2, vec4<f32>(1f, 0.003921569f, 0.0000153787f, 0.00000006030863f));
}

fn compareShadowDepth(lightDepth: f32, shadowMap_tex: texture_2d<f32>, shadowMap_smp: sampler, shadowCoord: vec2<f32>, depthOffset: f32) -> f32 {
    var lightDepth_1: f32;
    var shadowCoord_1: vec2<f32>;
    var depthOffset_1: f32;
    var shadowMapDepth: f32;

    lightDepth_1 = lightDepth;
    shadowCoord_1 = shadowCoord;
    depthOffset_1 = depthOffset;
    let _e22 = shadowCoord_1;
    let _e23 = textureSample(shadowMap_tex, shadowMap_smp, _e22);
    let _e24 = rgbaToFloat(_e23);
    shadowMapDepth = _e24;
    let _e26 = shadowCoord_1;
    let _e30 = shadowCoord_1;
    let _e35 = shadowCoord_1;
    let _e40 = shadowCoord_1;
    if ((((_e26.x >= 0f) && (_e30.x <= 1f)) && (_e35.y >= 0f)) && (_e40.y <= 1f)) {
        {
            let _e45 = lightDepth_1;
            let _e46 = shadowMapDepth;
            let _e47 = depthOffset_1;
            return step(_e45, (_e46 + _e47));
        }
    }
    return 1f;
}

fn setShadowCoord(pos: vec3<f32>, camera: LightCamera, shadowCoord_2: ptr<function, vec2<f32>>, lightDepth_2: ptr<function, f32>) {
    var pos_1: vec3<f32>;
    var camera_1: LightCamera;
    var mvPosition: vec4<f32>;
    var mvpPosition: vec4<f32>;
    var lightNear: f32;
    var lightFar: f32;

    pos_1 = pos;
    camera_1 = camera;
    let _e20 = camera_1;
    let _e22 = pos_1;
    mvPosition = (_e20.uViewMatrix * vec4<f32>(_e22.x, _e22.y, _e22.z, 1f));
    let _e30 = camera_1;
    let _e32 = mvPosition;
    mvpPosition = (_e30.uProjectionMatrix * _e32);
    let _e35 = mvpPosition;
    let _e37 = mvpPosition;
    (*shadowCoord_2) = (((_e35.xy / vec2(_e37.w)) * 0.5f) + vec2(0.5f));
    let _e46 = camera_1;
    lightNear = _e46.near;
    let _e49 = camera_1;
    lightFar = _e49.far;
    let _e52 = mvPosition;
    let _e55 = lightNear;
    let _e57 = lightFar;
    let _e58 = lightNear;
    (*lightDepth_2) = ((-(_e52.z) - _e55) / (_e57 - _e58));
    return;
}

fn getShadow(pos_2: vec3<f32>, camera_2: LightCamera, shadowMap_tex_1: texture_2d<f32>, shadowMap_smp_1: sampler, depthOffset_2: f32) -> f32 {
    var pos_3: vec3<f32>;
    var camera_3: LightCamera;
    var depthOffset_3: f32;
    var shadowCoord_3: vec2<f32>;
    var lightDepth_3: f32;

    pos_3 = pos_2;
    camera_3 = camera_2;
    depthOffset_3 = depthOffset_2;
    let _e24 = pos_3;
    let _e25 = camera_3;
    setShadowCoord(_e24, _e25, (&shadowCoord_3), (&lightDepth_3));
    let _e30 = lightDepth_3;
    let _e31 = shadowCoord_3;
    let _e32 = depthOffset_3;
    let _e33 = compareShadowDepth(_e30, shadowMap_tex_1, shadowMap_smp_1, _e31, _e32);
    return _e33;
}

fn getShadowSmooth(pos_4: vec3<f32>, camera_4: LightCamera, shadowMap_tex_2: texture_2d<f32>, shadowMap_smp_2: sampler, depthOffset_4: f32) -> f32 {
    var pos_5: vec3<f32>;
    var camera_5: LightCamera;
    var depthOffset_5: f32;
    var shadowCoord_4: vec2<f32>;
    var lightDepth_4: f32;
    var shadowSum: f32;
    var i: i32 = 0i;
    var offset: vec2<f32>;

    pos_5 = pos_4;
    camera_5 = camera_4;
    depthOffset_5 = depthOffset_4;
    let _e24 = pos_5;
    let _e25 = camera_5;
    setShadowCoord(_e24, _e25, (&shadowCoord_4), (&lightDepth_4));
    let _e30 = lightDepth_4;
    let _e31 = shadowCoord_4;
    let _e32 = depthOffset_5;
    let _e33 = compareShadowDepth(_e30, shadowMap_tex_2, shadowMap_smp_2, _e31, _e32);
    shadowSum = _e33;
    loop {
        let _e37 = i;
        if !((_e37 < 2i)) {
            break;
        }
        {
            let _e45 = camera_5;
            let _e49 = i;
            offset = ((vec2(1f) / _e45.resolution) * (f32((_e49 + 1i)) / 2f));
            let _e58 = shadowSum;
            let _e59 = lightDepth_4;
            let _e60 = shadowCoord_4;
            let _e61 = offset;
            let _e64 = offset;
            let _e69 = depthOffset_5;
            let _e70 = compareShadowDepth(_e59, shadowMap_tex_2, shadowMap_smp_2, (_e60 + vec2<f32>(-(_e61.x), -(_e64.y))), _e69);
            shadowSum = (_e58 + _e70);
            let _e72 = shadowSum;
            let _e73 = lightDepth_4;
            let _e74 = shadowCoord_4;
            let _e76 = offset;
            let _e81 = depthOffset_5;
            let _e82 = compareShadowDepth(_e73, shadowMap_tex_2, shadowMap_smp_2, (_e74 + vec2<f32>(0f, -(_e76.y))), _e81);
            shadowSum = (_e72 + _e82);
            let _e84 = shadowSum;
            let _e85 = lightDepth_4;
            let _e86 = shadowCoord_4;
            let _e87 = offset;
            let _e89 = offset;
            let _e94 = depthOffset_5;
            let _e95 = compareShadowDepth(_e85, shadowMap_tex_2, shadowMap_smp_2, (_e86 + vec2<f32>(_e87.x, -(_e89.y))), _e94);
            shadowSum = (_e84 + _e95);
            let _e97 = shadowSum;
            let _e98 = lightDepth_4;
            let _e99 = shadowCoord_4;
            let _e100 = offset;
            let _e106 = depthOffset_5;
            let _e107 = compareShadowDepth(_e98, shadowMap_tex_2, shadowMap_smp_2, (_e99 + vec2<f32>(-(_e100.x), 0f)), _e106);
            shadowSum = (_e97 + _e107);
            let _e109 = shadowSum;
            let _e110 = lightDepth_4;
            let _e111 = shadowCoord_4;
            let _e112 = offset;
            let _e117 = depthOffset_5;
            let _e118 = compareShadowDepth(_e110, shadowMap_tex_2, shadowMap_smp_2, (_e111 + vec2<f32>(_e112.x, 0f)), _e117);
            shadowSum = (_e109 + _e118);
            let _e120 = shadowSum;
            let _e121 = lightDepth_4;
            let _e122 = shadowCoord_4;
            let _e123 = offset;
            let _e126 = offset;
            let _e130 = depthOffset_5;
            let _e131 = compareShadowDepth(_e121, shadowMap_tex_2, shadowMap_smp_2, (_e122 + vec2<f32>(-(_e123.x), _e126.y)), _e130);
            shadowSum = (_e120 + _e131);
            let _e133 = shadowSum;
            let _e134 = lightDepth_4;
            let _e135 = shadowCoord_4;
            let _e137 = offset;
            let _e141 = depthOffset_5;
            let _e142 = compareShadowDepth(_e134, shadowMap_tex_2, shadowMap_smp_2, (_e135 + vec2<f32>(0f, _e137.y)), _e141);
            shadowSum = (_e133 + _e142);
            let _e144 = shadowSum;
            let _e145 = lightDepth_4;
            let _e146 = shadowCoord_4;
            let _e147 = offset;
            let _e149 = offset;
            let _e153 = depthOffset_5;
            let _e154 = compareShadowDepth(_e145, shadowMap_tex_2, shadowMap_smp_2, (_e146 + vec2<f32>(_e147.x, _e149.y)), _e153);
            shadowSum = (_e144 + _e154);
        }
        continuing {
            let _e41 = i;
            i = (_e41 + 1i);
        }
    }
    let _e156 = shadowSum;
    return (_e156 / 16f);
}

fn ggx(dNH: f32, roughness: f32) -> f32 {
    var dNH_1: f32;
    var roughness_1: f32;
    var a2_: f32;
    var dNH2_: f32;

    dNH_1 = dNH;
    roughness_1 = roughness;
    let _e18 = roughness_1;
    let _e19 = roughness_1;
    a2_ = (_e18 * _e19);
    let _e22 = a2_;
    let _e23 = a2_;
    a2_ = (_e22 * _e23);
    let _e25 = dNH_1;
    let _e26 = dNH_1;
    dNH2_ = (_e25 * _e26);
    let _e29 = dNH2_;
    if (_e29 <= 0f) {
        return 0f;
    }
    let _e33 = a2_;
    let _e35 = dNH2_;
    let _e36 = a2_;
    return (_e33 / (3.1415927f * pow(((_e35 * (_e36 - 1f)) + 1f), 2f)));
}

fn lambert(diffuseColor: vec3<f32>) -> vec3<f32> {
    var diffuseColor_1: vec3<f32>;

    diffuseColor_1 = diffuseColor;
    let _e16 = diffuseColor_1;
    return (_e16 / vec3(3.1415927f));
}

fn gSchlick(d: f32, k_4: f32) -> f32 {
    var d_1: f32;
    var k_5: f32;

    d_1 = d;
    k_5 = k_4;
    let _e18 = d_1;
    if (_e18 == 0f) {
        return 0f;
    }
    let _e22 = d_1;
    let _e23 = d_1;
    let _e25 = k_5;
    let _e28 = k_5;
    return (_e22 / ((_e23 * (1f - _e25)) + _e28));
}

fn gSmith(dNV: f32, dNL: f32, roughness_2: f32) -> f32 {
    var dNV_1: f32;
    var dNL_1: f32;
    var roughness_3: f32;
    var k_6: f32;

    dNV_1 = dNV;
    dNL_1 = dNL;
    roughness_3 = roughness_2;
    let _e20 = roughness_3;
    k_6 = clamp((_e20 * 0.7978845f), 0f, 1f);
    let _e30 = dNV_1;
    let _e31 = k_6;
    let _e32 = gSchlick(_e30, _e31);
    let _e33 = dNL_1;
    let _e34 = k_6;
    let _e35 = gSchlick(_e33, _e34);
    return (_e32 * _e35);
}

fn fresnel(d_2: f32) -> f32 {
    var d_3: f32;
    var f0_: f32 = 0.04f;

    d_3 = d_2;
    let _e18 = f0_;
    let _e20 = f0_;
    let _e23 = d_3;
    return (_e18 + ((1f - _e20) * pow((1f - _e23), 5f)));
}

fn RE(geo: Geometry, mat: Material, light: Light) -> vec3<f32> {
    var geo_1: Geometry;
    var mat_1: Material;
    var light_1: Light;
    var lightDir: vec3<f32>;
    var halfVec: vec3<f32>;
    var dLH: f32;
    var dNH_2: f32;
    var dNV_2: f32;
    var dNL_2: f32;
    var irradiance: vec3<f32>;
    var diffuse: vec3<f32>;
    var D: f32;
    var G: f32;
    var F: f32;
    var specular: vec3<f32>;
    var c: vec3<f32> = vec3(0f);

    geo_1 = geo;
    mat_1 = mat;
    light_1 = light;
    let _e20 = light_1;
    lightDir = normalize(_e20.direction);
    let _e24 = geo_1;
    let _e26 = lightDir;
    halfVec = normalize((_e24.viewDir + _e26));
    let _e30 = lightDir;
    let _e31 = halfVec;
    dLH = clamp(dot(_e30, _e31), 0f, 1f);
    let _e37 = geo_1;
    let _e39 = halfVec;
    dNH_2 = clamp(dot(_e37.normal, _e39), 0f, 1f);
    let _e45 = geo_1;
    let _e47 = geo_1;
    dNV_2 = clamp(dot(_e45.normal, _e47.viewDir), 0f, 1f);
    let _e54 = geo_1;
    let _e56 = lightDir;
    dNL_2 = clamp(dot(_e54.normal, _e56), 0f, 1f);
    let _e62 = light_1;
    let _e64 = dNL_2;
    irradiance = (_e62.color * _e64);
    let _e67 = mat_1;
    let _e69 = lambert(_e67.diffuseColor);
    let _e70 = irradiance;
    diffuse = (_e69 * _e70);
    let _e73 = dNH_2;
    let _e74 = mat_1;
    let _e76 = ggx(_e73, _e74.roughness);
    D = _e76;
    let _e78 = dNV_2;
    let _e79 = dNL_2;
    let _e80 = mat_1;
    let _e82 = gSmith(_e78, _e79, _e80.roughness);
    G = _e82;
    let _e84 = dLH;
    let _e85 = fresnel(_e84);
    F = _e85;
    let _e87 = D;
    let _e88 = G;
    let _e90 = F;
    let _e93 = dNL_2;
    let _e95 = dNV_2;
    let _e100 = mat_1;
    let _e103 = irradiance;
    specular = (((((_e87 * _e88) * _e90) / (((4f * _e93) * _e95) + 0.0001f)) * _e100.specularColor) * _e103);
    let _e109 = c;
    let _e110 = diffuse;
    let _e112 = F;
    let _e115 = specular;
    c = (_e109 + ((_e110 * (1f - _e112)) + _e115));
    let _e118 = c;
    return _e118;
}

fn getPmremFace(direction: vec3<f32>) -> f32 {
    var direction_1: vec3<f32>;
    var absDirection: vec3<f32>;
    var face: f32 = -1f;
    var local_2: f32;
    var local_3: f32;
    var local_4: f32;
    var local_5: f32;

    direction_1 = direction;
    let _e16 = direction_1;
    absDirection = abs(_e16);
    let _e22 = absDirection;
    let _e24 = absDirection;
    if (_e22.x > _e24.z) {
        {
            let _e27 = absDirection;
            let _e29 = absDirection;
            if (_e27.x > _e29.y) {
                let _e32 = direction_1;
                if (_e32.x > 0f) {
                    local_2 = 0f;
                } else {
                    local_2 = 3f;
                }
                let _e39 = local_2;
                face = _e39;
            } else {
                let _e40 = direction_1;
                if (_e40.y > 0f) {
                    local_3 = 1f;
                } else {
                    local_3 = 4f;
                }
                let _e47 = local_3;
                face = _e47;
            }
        }
    } else {
        {
            let _e48 = absDirection;
            let _e50 = absDirection;
            if (_e48.z > _e50.y) {
                let _e53 = direction_1;
                if (_e53.z > 0f) {
                    local_4 = 2f;
                } else {
                    local_4 = 5f;
                }
                let _e60 = local_4;
                face = _e60;
            } else {
                let _e61 = direction_1;
                if (_e61.y > 0f) {
                    local_5 = 1f;
                } else {
                    local_5 = 4f;
                }
                let _e68 = local_5;
                face = _e68;
            }
        }
    }
    let _e69 = face;
    return _e69;
}

fn getPmremUV(direction_2: vec3<f32>, face_1: f32) -> vec2<f32> {
    var direction_3: vec3<f32>;
    var face_2: f32;
    var uv: vec2<f32>;

    direction_3 = direction_2;
    face_2 = face_1;
    let _e19 = face_2;
    if (_e19 == 0f) {
        {
            let _e22 = direction_3;
            let _e24 = direction_3;
            let _e27 = direction_3;
            uv = (vec2<f32>(_e22.z, _e24.y) / vec2(abs(_e27.x)));
        }
    } else {
        let _e32 = face_2;
        if (_e32 == 1f) {
            {
                let _e35 = direction_3;
                let _e38 = direction_3;
                let _e42 = direction_3;
                uv = (vec2<f32>(-(_e35.x), -(_e38.z)) / vec2(abs(_e42.y)));
            }
        } else {
            let _e47 = face_2;
            if (_e47 == 2f) {
                {
                    let _e50 = direction_3;
                    let _e53 = direction_3;
                    let _e56 = direction_3;
                    uv = (vec2<f32>(-(_e50.x), _e53.y) / vec2(abs(_e56.z)));
                }
            } else {
                let _e61 = face_2;
                if (_e61 == 3f) {
                    {
                        let _e64 = direction_3;
                        let _e67 = direction_3;
                        let _e70 = direction_3;
                        uv = (vec2<f32>(-(_e64.z), _e67.y) / vec2(abs(_e70.x)));
                    }
                } else {
                    let _e75 = face_2;
                    if (_e75 == 4f) {
                        {
                            let _e78 = direction_3;
                            let _e81 = direction_3;
                            let _e84 = direction_3;
                            uv = (vec2<f32>(-(_e78.x), _e81.z) / vec2(abs(_e84.y)));
                        }
                    } else {
                        {
                            let _e89 = direction_3;
                            let _e91 = direction_3;
                            let _e94 = direction_3;
                            uv = (vec2<f32>(_e89.x, _e91.y) / vec2(abs(_e94.z)));
                        }
                    }
                }
            }
        }
    }
    let _e100 = uv;
    return (0.5f * (_e100 + vec2(1f)));
}

fn getPmremDir(uv_1: vec2<f32>, face_3: f32) -> vec3<f32> {
    var uv_2: vec2<f32>;
    var face_4: f32;
    var dir: vec3<f32> = vec3(0f);
    var yz: vec2<f32>;
    var xz: vec2<f32>;
    var xy: vec2<f32>;
    var zy: vec2<f32>;
    var xz_1: vec2<f32>;
    var xy_1: vec2<f32>;

    uv_2 = uv_1;
    face_4 = face_3;
    let _e21 = face_4;
    if (_e21 == 0f) {
        {
            let _e24 = uv_2;
            let _e26 = uv_2;
            yz = ((vec2<f32>(_e24.y, _e26.x) - vec2(0.5f)) * 2f);
            let _e36 = yz;
            dir = vec3<f32>(1f, _e36.x, _e36.y);
        }
    } else {
        let _e40 = face_4;
        if (_e40 == 1f) {
            {
                let _e43 = uv_2;
                let _e46 = uv_2;
                xz = ((vec2<f32>(-(_e43.x), -(_e46.y)) + vec2(0.5f)) * 2f);
                let _e56 = xz;
                let _e59 = xz;
                dir = vec3<f32>(_e56.x, 1f, _e59.y);
            }
        } else {
            let _e62 = face_4;
            if (_e62 == 2f) {
                {
                    let _e65 = uv_2;
                    let _e70 = uv_2;
                    xy = (vec2<f32>((-(_e65.x) + 0.5f), (_e70.y - 0.5f)) * 2f);
                    let _e78 = xy;
                    dir = vec3<f32>(_e78.x, _e78.y, 1f);
                }
            } else {
                let _e83 = face_4;
                if (_e83 == 3f) {
                    {
                        let _e86 = uv_2;
                        let _e91 = uv_2;
                        zy = (vec2<f32>((-(_e86.x) + 0.5f), (_e91.y - 0.5f)) * 2f);
                        let _e101 = zy;
                        let _e103 = zy;
                        dir = vec3<f32>(-1f, _e101.y, _e103.x);
                    }
                } else {
                    let _e106 = face_4;
                    if (_e106 == 4f) {
                        {
                            let _e109 = uv_2;
                            let _e114 = uv_2;
                            xz_1 = (vec2<f32>((-(_e109.x) + 0.5f), (_e114.y - 0.5f)) * 2f);
                            let _e122 = xz_1;
                            let _e126 = xz_1;
                            dir = vec3<f32>(_e122.x, -1f, _e126.y);
                        }
                    } else {
                        let _e129 = face_4;
                        if (_e129 == 5f) {
                            {
                                let _e132 = uv_2;
                                let _e134 = uv_2;
                                xy_1 = ((vec2<f32>(_e132.x, _e134.y) - vec2(0.5f)) * 2f);
                                let _e143 = xy_1;
                                dir = vec3<f32>(_e143.x, _e143.y, -1f);
                            }
                        }
                    }
                }
            }
        }
    }
    let _e149 = dir;
    return normalize(_e149);
}

fn roughnessToMip(roughness_4: f32) -> f32 {
    var roughness_5: f32;
    var mip: f32 = 0f;

    roughness_5 = roughness_4;
    let _e18 = roughness_5;
    mip = (_e18 * 4f);
    let _e23 = mip;
    return _e23;
}

fn getPmremMip(envMap_tex: texture_2d<f32>, envMap_smp: sampler, direction_4: vec3<f32>, mip_1: f32) -> vec3<f32> {
    var direction_5: vec3<f32>;
    var mip_2: f32;
    var face_5: f32;
    var uv_3: vec2<f32>;
    var faceRes: vec2<f32>;
    var s: f32 = 2f;
    var scale: f32;
    var col: vec4<f32>;

    direction_5 = direction_4;
    mip_2 = mip_1;
    let _e20 = direction_5;
    let _e21 = getPmremFace(_e20);
    face_5 = _e21;
    let _e23 = direction_5;
    let _e24 = face_5;
    let _e25 = getPmremUV(_e23, _e24);
    uv_3 = _e25;
    let _e28 = textureDimensions(envMap_tex, 0i);
    let _e32 = mip_2;
    faceRes = (vec2<f32>(vec2<i32>(_e28)) * pow(0.5f, floor(_e32)));
    let _e39 = uv_3;
    let _e40 = faceRes;
    let _e42 = s;
    uv_3 = (_e39 * (_e40 - vec2((2f * _e42))));
    let _e47 = uv_3;
    let _e49 = s;
    uv_3 = (_e47 + vec2((1f * _e49)));
    let _e53 = uv_3;
    let _e54 = faceRes;
    uv_3 = (_e53 / _e54);
    let _e57 = uv_3;
    let _e59 = face_5;
    uv_3.x = (_e57.x + (_e59 - (floor((_e59 / 3f)) * 3f)));
    let _e67 = uv_3;
    let _e69 = face_5;
    uv_3.y = (_e67.y + floor((_e69 / 3f)));
    let _e75 = uv_3;
    uv_3.y = (_e75.y * 0.5f);
    let _e80 = uv_3;
    uv_3.y = (_e80.y * 0.5f);
    let _e85 = uv_3;
    uv_3.x = (_e85.x / 3f);
    let _e91 = mip_2;
    scale = (1f - pow(2f, -(floor(_e91))));
    let _e98 = uv_3;
    let _e101 = scale;
    uv_3.y = (_e98.y * (1f - _e101));
    let _e105 = uv_3;
    let _e108 = scale;
    uv_3.x = (_e105.x * (1f - _e108));
    let _e112 = uv_3;
    let _e114 = scale;
    uv_3.y = (_e112.y + _e114);
    let _e116 = uv_3;
    let _e121 = textureSampleGrad(envMap_tex, envMap_smp, _e116, vec2(0f), vec2(0f));
    col = _e121;
    let _e123 = col;
    let _e125 = col;
    return (_e123.xyz / vec3(_e125.w));
}

fn getPmrem(envMap_tex_1: texture_2d<f32>, envMap_smp_1: sampler, direction_6: vec3<f32>, roughness_6: f32) -> vec3<f32> {
    var direction_7: vec3<f32>;
    var roughness_7: f32;
    var mip_3: f32;
    var mipF: f32;
    var mipInt: f32;
    var color0_: vec3<f32>;
    var color1_: vec3<f32>;

    direction_7 = direction_6;
    roughness_7 = roughness_6;
    let _e20 = roughness_7;
    let _e21 = roughnessToMip(_e20);
    mip_3 = _e21;
    let _e23 = mip_3;
    mipF = fract(_e23);
    let _e26 = mip_3;
    mipInt = floor(_e26);
    let _e29 = direction_7;
    let _e30 = mipInt;
    let _e31 = getPmremMip(envMap_tex_1, envMap_smp_1, _e29, _e30);
    color0_ = _e31;
    let _e33 = mipF;
    if (_e33 == 0f) {
        {
            let _e36 = color0_;
            return _e36;
        }
    } else {
        {
            let _e37 = direction_7;
            let _e38 = mipInt;
            let _e41 = getPmremMip(envMap_tex_1, envMap_smp_1, _e37, (_e38 + 1f));
            color1_ = _e41;
            let _e43 = color0_;
            let _e44 = color1_;
            let _e45 = mipF;
            return mix(_e43, _e44, vec3(_e45));
        }
    }
}

fn main_1() {
    var occlusion: f32;
    var tex0_: vec4<f32>;
    var tex1_: vec4<f32>;
    var tex2_: vec4<f32>;
    var tex3_: vec4<f32>;
    var tex4_: vec4<f32>;
    var normal: vec3<f32>;
    var color: vec3<f32>;
    var roughness_8: f32;
    var metallic: f32;
    var emission: vec3<f32>;
    var envMapIntensity: f32;
    var geo_2: Geometry;
    var mat_2: Material;
    var outColor: vec3<f32> = vec3(0f);
    var shadow: f32;
    var light_2: Light;
    var lightCamera: LightCamera;
    var dLight: DirectionalLight;
    var refDir: vec3<f32>;
    var dNV_3: f32;
    var EF: f32;

    let _e33 = vUv_1;
    let _e34 = textureSample(uSSAOTexture_tex, uSSAOTexture_smp, _e33);
    occlusion = _e34.x;
    let _e37 = vUv_1;
    let _e38 = textureSample(sampler0_tex, sampler0_smp, _e37);
    tex0_ = _e38;
    let _e40 = vUv_1;
    let _e41 = textureSample(sampler1_tex, sampler1_smp, _e40);
    tex1_ = _e41;
    let _e43 = vUv_1;
    let _e44 = textureSample(sampler2_tex, sampler2_smp, _e43);
    tex2_ = _e44;
    let _e46 = vUv_1;
    let _e47 = textureSample(sampler3_tex, sampler3_smp, _e46);
    tex3_ = _e47;
    let _e49 = vUv_1;
    let _e50 = textureSample(sampler4_tex, sampler4_smp, _e49);
    tex4_ = _e50;
    let _e52 = tex1_;
    normal = _e52.xyz;
    let _e55 = tex2_;
    color = _e55.xyz;
    let _e58 = tex3_;
    roughness_8 = _e58.x;
    let _e61 = tex3_;
    metallic = _e61.y;
    let _e64 = tex0_;
    let _e66 = tex1_;
    let _e68 = tex4_;
    emission = vec3<f32>(_e64.w, _e66.w, _e68.w);
    let _e72 = tex3_;
    envMapIntensity = _e72.w;
    let _e75 = tex0_;
    let _e77 = normal;
    let _e79 = global.uCameraPosition;
    let _e80 = tex0_;
    let _e86 = occlusion;
    geo_2 = Geometry(_e75.xyz, _e77, 0f, normalize((_e79 - _e80.xyz)), vec3(0f), _e86);
    let _e89 = color;
    let _e90 = roughness_8;
    let _e91 = metallic;
    let _e92 = emission;
    let _e93 = color;
    let _e98 = metallic;
    let _e105 = color;
    let _e106 = metallic;
    let _e109 = envMapIntensity;
    mat_2 = Material(_e89, _e90, _e91, _e92, mix(_e93, vec3<f32>(0f, 0f, 0f), vec3(_e98)), mix(vec3<f32>(1f, 1f, 1f), _e105, vec3(_e106)), _e109);
    let _e121 = global.directionalLight[0];
    dLight = _e121;
    let _e123 = dLight;
    light_2.direction = _e123.direction;
    let _e126 = dLight;
    light_2.color = _e126.color;
    let _e128 = tex0_;
    let _e132 = global.uDirectionalLightCamera[0];
    let _e134 = getShadowSmooth(_e128.xyz, _e132, directionalLightShadowMap_0_tex, directionalLightShadowMap_0_smp, 0.0001f);
    shadow = _e134;
    let _e135 = outColor;
    let _e137 = outColor;
    let _e139 = geo_2;
    let _e140 = mat_2;
    let _e141 = light_2;
    let _e142 = RE(_e139, _e140, _e141);
    let _e143 = shadow;
    let _e145 = (_e137.xyz + (_e142 * _e143));
    outColor.x = _e145.x;
    outColor.y = _e145.y;
    outColor.z = _e145.z;
    let _e152 = geo_2;
    let _e155 = geo_2;
    refDir = reflect(-(_e152.viewDir), _e155.normal);
    let _e159 = geo_2;
    let _e161 = geo_2;
    dNV_3 = clamp(dot(_e159.normal, _e161.viewDir), 0f, 1f);
    let _e168 = dNV_3;
    let _e169 = fresnel(_e168);
    let _e171 = mat_2;
    EF = mix(_e169, 1f, _e171.metallic);
    let _e175 = outColor;
    let _e177 = outColor;
    let _e179 = geo_2;
    let _e182 = getPmrem(uEnvMap_tex, uEnvMap_smp, _e179.normal, 1f);
    let _e183 = mat_2;
    let _e186 = mat_2;
    let _e189 = (_e177.xyz + ((_e182 * _e183.diffuseColor) * _e186.envMapIntensity));
    outColor.x = _e189.x;
    outColor.y = _e189.y;
    outColor.z = _e189.z;
    let _e196 = outColor;
    let _e198 = outColor;
    let _e200 = refDir;
    let _e201 = mat_2;
    let _e203 = getPmrem(uEnvMap_tex, uEnvMap_smp, _e200, _e201.roughness);
    let _e204 = EF;
    let _e205 = mat_2;
    let _e208 = mat_2;
    let _e211 = mix(_e198.xyz, _e203, ((_e204 * _e205.specularColor) * _e208.envMapIntensity));
    outColor.x = _e211.x;
    outColor.y = _e211.y;
    outColor.z = _e211.z;
    let _e218 = outColor;
    let _e220 = outColor;
    let _e224 = geo_2;
    let _e230 = (_e220.xyz * max(0f, (1f - (_e224.occulusion * 1.5f))));
    outColor.x = _e230.x;
    outColor.y = _e230.y;
    outColor.z = _e230.z;
    let _e237 = outColor;
    let _e239 = outColor;
    let _e241 = mat_2;
    let _e243 = (_e239.xyz + _e241.emission);
    outColor.x = _e243.x;
    outColor.y = _e243.y;
    outColor.z = _e243.z;
    let _e250 = outColor;
    let _e252 = outColor;
    let _e254 = vUv_1;
    let _e255 = textureSample(uLightShaftTexture_tex, uLightShaftTexture_smp, _e254);
    let _e257 = (_e252.xyz + _e255.xyz);
    outColor.x = _e257.x;
    outColor.y = _e257.y;
    outColor.z = _e257.z;
    let _e266 = outColor;
    let _e268 = max(vec3(0f), _e266.xyz);
    let _e273 = vec4<f32>(_e268.x, _e268.y, _e268.z, 1f);
    glFragOut1_ = _e273;
    glFragOut0_ = _e273;
    return;
}

@fragment 
fn main(@location(0) vUv: vec2<f32>) -> FragmentOutput {
    vUv_1 = vUv;
    main_1();
    let _e57 = glFragOut0_;
    let _e59 = glFragOut1_;
    return FragmentOutput(_e57, _e59);
}
