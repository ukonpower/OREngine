struct LightCamera {
    near: f32,
    far: f32,
    uViewMatrix: mat4x4<f32>,
    uProjectionMatrix: mat4x4<f32>,
    resolution: vec2<f32>,
}

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

struct Light {
    direction: vec3<f32>,
    color: vec3<f32>,
}

struct DirectionalLight {
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
    @location(0) member: vec4<f32>,
    @location(1) member_1: vec4<f32>,
}

@group(0) @binding(13) 
var uSSAOTexture_tex: texture_2d<f32>;
@group(0) @binding(14) 
var uSSAOTexture_smp: sampler;
var<private> vUv_1: vec2<f32>;
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
@group(0) @binding(0) 
var<uniform> unnamed: Params;
@group(0) @binding(1) 
var directionalLightShadowMap_0_tex: texture_2d<f32>;
@group(0) @binding(2) 
var directionalLightShadowMap_0_smp: sampler;
@group(0) @binding(17) 
var uEnvMap_tex: texture_2d<f32>;
@group(0) @binding(18) 
var uEnvMap_smp: sampler;
@group(0) @binding(15) 
var uLightShaftTexture_tex: texture_2d<f32>;
@group(0) @binding(16) 
var uLightShaftTexture_smp: sampler;
var<private> glFragOut0_: vec4<f32>;
var<private> glFragOut1_: vec4<f32>;

fn getPmremUV_u0028_vf3_u003b_f1_u003b(direction: ptr<function, vec3<f32>>, face: ptr<function, f32>) -> vec2<f32> {
    var uv: vec2<f32>;

    let _e57 = (*face);
    if (_e57 == 0f) {
        let _e60 = (*direction)[2u];
        let _e62 = (*direction)[1u];
        let _e65 = (*direction)[0u];
        uv = (vec2<f32>(_e60, _e62) / vec2(abs(_e65)));
    } else {
        let _e69 = (*face);
        if (_e69 == 1f) {
            let _e72 = (*direction)[0u];
            let _e75 = (*direction)[2u];
            let _e79 = (*direction)[1u];
            uv = (vec2<f32>(-(_e72), -(_e75)) / vec2(abs(_e79)));
        } else {
            let _e83 = (*face);
            if (_e83 == 2f) {
                let _e86 = (*direction)[0u];
                let _e89 = (*direction)[1u];
                let _e92 = (*direction)[2u];
                uv = (vec2<f32>(-(_e86), _e89) / vec2(abs(_e92)));
            } else {
                let _e96 = (*face);
                if (_e96 == 3f) {
                    let _e99 = (*direction)[2u];
                    let _e102 = (*direction)[1u];
                    let _e105 = (*direction)[0u];
                    uv = (vec2<f32>(-(_e99), _e102) / vec2(abs(_e105)));
                } else {
                    let _e109 = (*face);
                    if (_e109 == 4f) {
                        let _e112 = (*direction)[0u];
                        let _e115 = (*direction)[2u];
                        let _e118 = (*direction)[1u];
                        uv = (vec2<f32>(-(_e112), _e115) / vec2(abs(_e118)));
                    } else {
                        let _e123 = (*direction)[0u];
                        let _e125 = (*direction)[1u];
                        let _e128 = (*direction)[2u];
                        uv = (vec2<f32>(_e123, _e125) / vec2(abs(_e128)));
                    }
                }
            }
        }
    }
    let _e132 = uv;
    return ((_e132 + vec2(1f)) * 0.5f);
}

fn getPmremFace_u0028_vf3_u003b(direction_1: ptr<function, vec3<f32>>) -> f32 {
    var absDirection: vec3<f32>;
    var face_1: f32;

    let _e57 = (*direction_1);
    absDirection = abs(_e57);
    face_1 = -1f;
    let _e60 = absDirection[0u];
    let _e62 = absDirection[2u];
    if (_e60 > _e62) {
        let _e65 = absDirection[0u];
        let _e67 = absDirection[1u];
        if (_e65 > _e67) {
            let _e70 = (*direction_1)[0u];
            face_1 = select(3f, 0f, (_e70 > 0f));
        } else {
            let _e74 = (*direction_1)[1u];
            face_1 = select(4f, 1f, (_e74 > 0f));
        }
    } else {
        let _e78 = absDirection[2u];
        let _e80 = absDirection[1u];
        if (_e78 > _e80) {
            let _e83 = (*direction_1)[2u];
            face_1 = select(5f, 2f, (_e83 > 0f));
        } else {
            let _e87 = (*direction_1)[1u];
            face_1 = select(4f, 1f, (_e87 > 0f));
        }
    }
    let _e90 = face_1;
    return _e90;
}

fn getPmremMip_u0028_t21_u003b_p1_u003b_vf3_u003b_f1_u003b(envMap_tex: texture_2d<f32>, envMap_smp: sampler, direction_2: ptr<function, vec3<f32>>, mip: ptr<function, f32>) -> vec3<f32> {
    var face_2: f32;
    var param: vec3<f32>;
    var uv_1: vec2<f32>;
    var param_1: vec3<f32>;
    var param_2: f32;
    var faceRes: vec2<f32>;
    var s: f32;
    var scale: f32;
    var col: vec4<f32>;

    let _e67 = (*direction_2);
    param = _e67;
    let _e68 = getPmremFace_u0028_vf3_u003b((&param));
    face_2 = _e68;
    let _e69 = (*direction_2);
    param_1 = _e69;
    let _e70 = face_2;
    param_2 = _e70;
    let _e71 = getPmremUV_u0028_vf3_u003b_f1_u003b((&param_1), (&param_2));
    uv_1 = _e71;
    let _e72 = textureDimensions(envMap_tex, 0i);
    let _e75 = (*mip);
    faceRes = (vec2<f32>(vec2<i32>(_e72)) * pow(0.5f, floor(_e75)));
    s = 2f;
    let _e79 = faceRes;
    let _e80 = s;
    let _e84 = uv_1;
    uv_1 = (_e84 * (_e79 - vec2((2f * _e80))));
    let _e86 = s;
    let _e88 = uv_1;
    uv_1 = (_e88 + vec2((1f * _e86)));
    let _e91 = faceRes;
    let _e92 = uv_1;
    uv_1 = (_e92 / _e91);
    let _e94 = face_2;
    let _e100 = uv_1[0u];
    uv_1[0u] = (_e100 + (_e94 - (floor((_e94 / 3f)) * 3f)));
    let _e103 = face_2;
    let _e107 = uv_1[1u];
    uv_1[1u] = (_e107 + floor((_e103 / 3f)));
    let _e111 = uv_1[1u];
    uv_1[1u] = (_e111 * 0.5f);
    let _e115 = uv_1[1u];
    uv_1[1u] = (_e115 * 0.5f);
    let _e119 = uv_1[0u];
    uv_1[0u] = (_e119 / 3f);
    let _e122 = (*mip);
    scale = (1f - pow(2f, -(floor(_e122))));
    let _e127 = scale;
    let _e130 = uv_1[1u];
    uv_1[1u] = (_e130 * (1f - _e127));
    let _e133 = scale;
    let _e136 = uv_1[0u];
    uv_1[0u] = (_e136 * (1f - _e133));
    let _e139 = scale;
    let _e141 = uv_1[1u];
    uv_1[1u] = (_e141 + _e139);
    let _e144 = uv_1;
    let _e145 = textureSampleGrad(envMap_tex, envMap_smp, _e144, vec2<f32>(0f, 0f), vec2<f32>(0f, 0f));
    col = _e145;
    let _e146 = col;
    let _e149 = col[3u];
    return (_e146.xyz / vec3(_e149));
}

fn roughnessToMip_u0028_f1_u003b(roughness: ptr<function, f32>) -> f32 {
    var mip_1: f32;

    mip_1 = 0f;
    let _e56 = (*roughness);
    mip_1 = (_e56 * 4f);
    let _e58 = mip_1;
    return _e58;
}

fn getPmrem_u0028_t21_u003b_p1_u003b_vf3_u003b_f1_u003b(envMap_tex_1: texture_2d<f32>, envMap_smp_1: sampler, direction_3: ptr<function, vec3<f32>>, roughness_1: ptr<function, f32>) -> vec3<f32> {
    var mip_2: f32;
    var param_3: f32;
    var mipF: f32;
    var mipInt: f32;
    var color0_: vec3<f32>;
    var param_4: vec3<f32>;
    var param_5: f32;
    var color1_: vec3<f32>;
    var param_6: vec3<f32>;
    var param_7: f32;

    let _e68 = (*roughness_1);
    param_3 = _e68;
    let _e69 = roughnessToMip_u0028_f1_u003b((&param_3));
    mip_2 = _e69;
    let _e70 = mip_2;
    mipF = fract(_e70);
    let _e72 = mip_2;
    mipInt = floor(_e72);
    let _e74 = (*direction_3);
    param_4 = _e74;
    let _e75 = mipInt;
    param_5 = _e75;
    let _e76 = getPmremMip_u0028_t21_u003b_p1_u003b_vf3_u003b_f1_u003b(envMap_tex_1, envMap_smp_1, (&param_4), (&param_5));
    color0_ = _e76;
    let _e77 = mipF;
    if (_e77 == 0f) {
        let _e79 = color0_;
        return _e79;
    } else {
        let _e80 = mipInt;
        let _e82 = (*direction_3);
        param_6 = _e82;
        param_7 = (_e80 + 1f);
        let _e83 = getPmremMip_u0028_t21_u003b_p1_u003b_vf3_u003b_f1_u003b(envMap_tex_1, envMap_smp_1, (&param_6), (&param_7));
        color1_ = _e83;
        let _e84 = color0_;
        let _e85 = color1_;
        let _e86 = mipF;
        return mix(_e84, _e85, vec3(_e86));
    }
}

fn fresnel_u0028_f1_u003b(d: ptr<function, f32>) -> f32 {
    var f0_: f32;

    f0_ = 0.04f;
    let _e56 = f0_;
    let _e57 = f0_;
    let _e59 = (*d);
    return (_e56 + ((1f - _e57) * pow((1f - _e59), 5f)));
}

fn gSchlick_u0028_f1_u003b_f1_u003b(d_1: ptr<function, f32>, k: ptr<function, f32>) -> f32 {
    let _e56 = (*d_1);
    if (_e56 == 0f) {
        return 0f;
    }
    let _e58 = (*d_1);
    let _e59 = (*d_1);
    let _e60 = (*k);
    let _e63 = (*k);
    return (_e58 / ((_e59 * (1f - _e60)) + _e63));
}

fn gSmith_u0028_f1_u003b_f1_u003b_f1_u003b(dNV: ptr<function, f32>, dNL: ptr<function, f32>, roughness_2: ptr<function, f32>) -> f32 {
    var k_1: f32;
    var param_8: f32;
    var param_9: f32;
    var param_10: f32;
    var param_11: f32;

    let _e62 = (*roughness_2);
    k_1 = clamp((_e62 * 0.7978846f), 0f, 1f);
    let _e65 = (*dNV);
    param_8 = _e65;
    let _e66 = k_1;
    param_9 = _e66;
    let _e67 = gSchlick_u0028_f1_u003b_f1_u003b((&param_8), (&param_9));
    let _e68 = (*dNL);
    param_10 = _e68;
    let _e69 = k_1;
    param_11 = _e69;
    let _e70 = gSchlick_u0028_f1_u003b_f1_u003b((&param_10), (&param_11));
    return (_e67 * _e70);
}

fn ggx_u0028_f1_u003b_f1_u003b(dNH: ptr<function, f32>, roughness_3: ptr<function, f32>) -> f32 {
    var a2_: f32;
    var dNH2_: f32;

    let _e58 = (*roughness_3);
    let _e59 = (*roughness_3);
    a2_ = (_e58 * _e59);
    let _e61 = a2_;
    let _e62 = a2_;
    a2_ = (_e61 * _e62);
    let _e64 = (*dNH);
    let _e65 = (*dNH);
    dNH2_ = (_e64 * _e65);
    let _e67 = dNH2_;
    if (_e67 <= 0f) {
        return 0f;
    }
    let _e69 = a2_;
    let _e70 = dNH2_;
    let _e71 = a2_;
    return (_e69 / (3.1415927f * pow(((_e70 * (_e71 - 1f)) + 1f), 2f)));
}

fn lambert_u0028_vf3_u003b(diffuseColor: ptr<function, vec3<f32>>) -> vec3<f32> {
    let _e55 = (*diffuseColor);
    return (_e55 / vec3(3.1415927f));
}

fn RE_u0028_struct_u002d_Geometry_u002d_vf3_u002d_vf3_u002d_f1_u002d_vf3_u002d_vf3_u002d_f11_u003b_struct_u002d_Material_u002d_vf3_u002d_f1_u002d_f1_u002d_vf3_u002d_vf3_u002d_vf3_u002d_f11_u003b_struct_u002d_Light_u002d_vf3_u002d_vf31_u003b(geo: ptr<function, Geometry>, mat: ptr<function, Material>, light: ptr<function, Light>) -> vec3<f32> {
    var lightDir: vec3<f32>;
    var halfVec: vec3<f32>;
    var dLH: f32;
    var dNH_1: f32;
    var dNV_1: f32;
    var dNL_1: f32;
    var irradiance: vec3<f32>;
    var diffuse: vec3<f32>;
    var param_12: vec3<f32>;
    var D: f32;
    var param_13: f32;
    var param_14: f32;
    var G: f32;
    var param_15: f32;
    var param_16: f32;
    var param_17: f32;
    var F: f32;
    var param_18: f32;
    var specular: vec3<f32>;
    var c: vec3<f32>;

    let _e78 = (*light).direction;
    lightDir = normalize(_e78);
    let _e81 = (*geo).viewDir;
    let _e82 = lightDir;
    halfVec = normalize((_e81 + _e82));
    let _e85 = lightDir;
    let _e86 = halfVec;
    dLH = clamp(dot(_e85, _e86), 0f, 1f);
    let _e90 = (*geo).normal;
    let _e91 = halfVec;
    dNH_1 = clamp(dot(_e90, _e91), 0f, 1f);
    let _e95 = (*geo).normal;
    let _e97 = (*geo).viewDir;
    dNV_1 = clamp(dot(_e95, _e97), 0f, 1f);
    let _e101 = (*geo).normal;
    let _e102 = lightDir;
    dNL_1 = clamp(dot(_e101, _e102), 0f, 1f);
    let _e106 = (*light).color;
    let _e107 = dNL_1;
    irradiance = (_e106 * _e107);
    let _e110 = (*mat).diffuseColor;
    param_12 = _e110;
    let _e111 = lambert_u0028_vf3_u003b((&param_12));
    let _e112 = irradiance;
    diffuse = (_e111 * _e112);
    let _e114 = dNH_1;
    param_13 = _e114;
    let _e116 = (*mat).roughness;
    param_14 = _e116;
    let _e117 = ggx_u0028_f1_u003b_f1_u003b((&param_13), (&param_14));
    D = _e117;
    let _e118 = dNV_1;
    param_15 = _e118;
    let _e119 = dNL_1;
    param_16 = _e119;
    let _e121 = (*mat).roughness;
    param_17 = _e121;
    let _e122 = gSmith_u0028_f1_u003b_f1_u003b_f1_u003b((&param_15), (&param_16), (&param_17));
    G = _e122;
    let _e123 = dLH;
    param_18 = _e123;
    let _e124 = fresnel_u0028_f1_u003b((&param_18));
    F = _e124;
    let _e125 = D;
    let _e126 = G;
    let _e128 = F;
    let _e130 = dNL_1;
    let _e132 = dNV_1;
    let _e137 = (*mat).specularColor;
    let _e139 = irradiance;
    specular = ((_e137 * (((_e125 * _e126) * _e128) / (((4f * _e130) * _e132) + 0.0001f))) * _e139);
    c = vec3<f32>(0f, 0f, 0f);
    let _e141 = diffuse;
    let _e142 = F;
    let _e145 = specular;
    let _e147 = c;
    c = (_e147 + ((_e141 * (1f - _e142)) + _e145));
    let _e149 = c;
    return _e149;
}

fn rgbaToFloat_u0028_vf4_u003b(rgba: ptr<function, vec4<f32>>) -> f32 {
    let _e55 = (*rgba);
    return dot(_e55, vec4<f32>(1f, 0.003921569f, 0.0000153787f, 0.00000006030863f));
}

fn compareShadowDepth_u0028_f1_u003b_t21_u003b_p1_u003b_vf2_u003b_f1_u003b(lightDepth: ptr<function, f32>, shadowMap_tex: texture_2d<f32>, shadowMap_smp: sampler, shadowCoord: ptr<function, vec2<f32>>, depthOffset: ptr<function, f32>) -> f32 {
    var shadowMapDepth: f32;
    var param_19: vec4<f32>;
    var phi_138_: bool;
    var phi_145_: bool;
    var phi_151_: bool;

    let _e61 = (*shadowCoord);
    let _e62 = textureSample(shadowMap_tex, shadowMap_smp, _e61);
    param_19 = _e62;
    let _e63 = rgbaToFloat_u0028_vf4_u003b((&param_19));
    shadowMapDepth = _e63;
    let _e65 = (*shadowCoord)[0u];
    let _e66 = (_e65 >= 0f);
    phi_138_ = _e66;
    if _e66 {
        let _e68 = (*shadowCoord)[0u];
        phi_138_ = (_e68 <= 1f);
    }
    let _e71 = phi_138_;
    phi_145_ = _e71;
    if _e71 {
        let _e73 = (*shadowCoord)[1u];
        phi_145_ = (_e73 >= 0f);
    }
    let _e76 = phi_145_;
    phi_151_ = _e76;
    if _e76 {
        let _e78 = (*shadowCoord)[1u];
        phi_151_ = (_e78 <= 1f);
    }
    let _e81 = phi_151_;
    if _e81 {
        let _e82 = (*lightDepth);
        let _e83 = shadowMapDepth;
        let _e84 = (*depthOffset);
        return step(_e82, (_e83 + _e84));
    }
    return 1f;
}

fn setShadowCoord_u0028_vf3_u003b_struct_u002d_LightCamera_u002d_f1_u002d_f1_u002d_mf44_u002d_mf44_u002d_vf21_u003b_vf2_u003b_f1_u003b(pos: ptr<function, vec3<f32>>, camera: ptr<function, LightCamera>, shadowCoord_1: ptr<function, vec2<f32>>, lightDepth_1: ptr<function, f32>) {
    var mvPosition: vec4<f32>;
    var mvpPosition: vec4<f32>;
    var lightNear: f32;
    var lightFar: f32;

    let _e63 = (*camera).uViewMatrix;
    let _e64 = (*pos);
    mvPosition = (_e63 * vec4<f32>(_e64.x, _e64.y, _e64.z, 1f));
    let _e71 = (*camera).uProjectionMatrix;
    let _e72 = mvPosition;
    mvpPosition = (_e71 * _e72);
    let _e74 = mvpPosition;
    let _e77 = mvpPosition[3u];
    (*shadowCoord_1) = (((_e74.xy / vec2(_e77)) * 0.5f) + vec2(0.5f));
    let _e84 = (*camera).near;
    lightNear = _e84;
    let _e86 = (*camera).far;
    lightFar = _e86;
    let _e88 = mvPosition[2u];
    let _e90 = lightNear;
    let _e92 = lightFar;
    let _e93 = lightNear;
    (*lightDepth_1) = ((-(_e88) - _e90) / (_e92 - _e93));
    return;
}

fn getShadowSmooth_u0028_vf3_u003b_struct_u002d_LightCamera_u002d_f1_u002d_f1_u002d_mf44_u002d_mf44_u002d_vf21_u003b_t21_u003b_p1_u003b_f1_u003b(pos_1: ptr<function, vec3<f32>>, camera_1: ptr<function, LightCamera>, shadowMap_tex_1: texture_2d<f32>, shadowMap_smp_1: sampler, depthOffset_1: ptr<function, f32>) -> f32 {
    var shadowCoord_2: vec2<f32>;
    var lightDepth_2: f32;
    var param_20: vec3<f32>;
    var param_21: LightCamera;
    var param_22: vec2<f32>;
    var param_23: f32;
    var shadowSum: f32;
    var param_24: f32;
    var param_25: vec2<f32>;
    var param_26: f32;
    var i: i32;
    var offset: vec2<f32>;
    var param_27: f32;
    var param_28: vec2<f32>;
    var param_29: f32;
    var param_30: f32;
    var param_31: vec2<f32>;
    var param_32: f32;
    var param_33: f32;
    var param_34: vec2<f32>;
    var param_35: f32;
    var param_36: f32;
    var param_37: vec2<f32>;
    var param_38: f32;
    var param_39: f32;
    var param_40: vec2<f32>;
    var param_41: f32;
    var param_42: f32;
    var param_43: vec2<f32>;
    var param_44: f32;
    var param_45: f32;
    var param_46: vec2<f32>;
    var param_47: f32;
    var param_48: f32;
    var param_49: vec2<f32>;
    var param_50: f32;

    let _e95 = (*pos_1);
    param_20 = _e95;
    let _e96 = (*camera_1);
    param_21 = _e96;
    let _e97 = shadowCoord_2;
    param_22 = _e97;
    let _e98 = lightDepth_2;
    param_23 = _e98;
    setShadowCoord_u0028_vf3_u003b_struct_u002d_LightCamera_u002d_f1_u002d_f1_u002d_mf44_u002d_mf44_u002d_vf21_u003b_vf2_u003b_f1_u003b((&param_20), (&param_21), (&param_22), (&param_23));
    let _e99 = param_22;
    shadowCoord_2 = _e99;
    let _e100 = param_23;
    lightDepth_2 = _e100;
    let _e101 = lightDepth_2;
    param_24 = _e101;
    let _e102 = shadowCoord_2;
    param_25 = _e102;
    let _e103 = (*depthOffset_1);
    param_26 = _e103;
    let _e104 = compareShadowDepth_u0028_f1_u003b_t21_u003b_p1_u003b_vf2_u003b_f1_u003b((&param_24), shadowMap_tex_1, shadowMap_smp_1, (&param_25), (&param_26));
    shadowSum = _e104;
    i = 0i;
    loop {
        let _e105 = i;
        if (_e105 < 2i) {
            let _e108 = (*camera_1).resolution;
            let _e111 = i;
            offset = ((vec2(1f) / _e108) * (f32((_e111 + 1i)) / 2f));
            let _e116 = shadowCoord_2;
            let _e118 = offset[0u];
            let _e121 = offset[1u];
            let _e125 = lightDepth_2;
            param_27 = _e125;
            param_28 = (_e116 + vec2<f32>(-(_e118), -(_e121)));
            let _e126 = (*depthOffset_1);
            param_29 = _e126;
            let _e127 = compareShadowDepth_u0028_f1_u003b_t21_u003b_p1_u003b_vf2_u003b_f1_u003b((&param_27), shadowMap_tex_1, shadowMap_smp_1, (&param_28), (&param_29));
            let _e128 = shadowSum;
            shadowSum = (_e128 + _e127);
            let _e130 = shadowCoord_2;
            let _e132 = offset[1u];
            let _e136 = lightDepth_2;
            param_30 = _e136;
            param_31 = (_e130 + vec2<f32>(0f, -(_e132)));
            let _e137 = (*depthOffset_1);
            param_32 = _e137;
            let _e138 = compareShadowDepth_u0028_f1_u003b_t21_u003b_p1_u003b_vf2_u003b_f1_u003b((&param_30), shadowMap_tex_1, shadowMap_smp_1, (&param_31), (&param_32));
            let _e139 = shadowSum;
            shadowSum = (_e139 + _e138);
            let _e141 = shadowCoord_2;
            let _e143 = offset[0u];
            let _e145 = offset[1u];
            let _e149 = lightDepth_2;
            param_33 = _e149;
            param_34 = (_e141 + vec2<f32>(_e143, -(_e145)));
            let _e150 = (*depthOffset_1);
            param_35 = _e150;
            let _e151 = compareShadowDepth_u0028_f1_u003b_t21_u003b_p1_u003b_vf2_u003b_f1_u003b((&param_33), shadowMap_tex_1, shadowMap_smp_1, (&param_34), (&param_35));
            let _e152 = shadowSum;
            shadowSum = (_e152 + _e151);
            let _e154 = shadowCoord_2;
            let _e156 = offset[0u];
            let _e160 = lightDepth_2;
            param_36 = _e160;
            param_37 = (_e154 + vec2<f32>(-(_e156), 0f));
            let _e161 = (*depthOffset_1);
            param_38 = _e161;
            let _e162 = compareShadowDepth_u0028_f1_u003b_t21_u003b_p1_u003b_vf2_u003b_f1_u003b((&param_36), shadowMap_tex_1, shadowMap_smp_1, (&param_37), (&param_38));
            let _e163 = shadowSum;
            shadowSum = (_e163 + _e162);
            let _e165 = shadowCoord_2;
            let _e167 = offset[0u];
            let _e170 = lightDepth_2;
            param_39 = _e170;
            param_40 = (_e165 + vec2<f32>(_e167, 0f));
            let _e171 = (*depthOffset_1);
            param_41 = _e171;
            let _e172 = compareShadowDepth_u0028_f1_u003b_t21_u003b_p1_u003b_vf2_u003b_f1_u003b((&param_39), shadowMap_tex_1, shadowMap_smp_1, (&param_40), (&param_41));
            let _e173 = shadowSum;
            shadowSum = (_e173 + _e172);
            let _e175 = shadowCoord_2;
            let _e177 = offset[0u];
            let _e180 = offset[1u];
            let _e183 = lightDepth_2;
            param_42 = _e183;
            param_43 = (_e175 + vec2<f32>(-(_e177), _e180));
            let _e184 = (*depthOffset_1);
            param_44 = _e184;
            let _e185 = compareShadowDepth_u0028_f1_u003b_t21_u003b_p1_u003b_vf2_u003b_f1_u003b((&param_42), shadowMap_tex_1, shadowMap_smp_1, (&param_43), (&param_44));
            let _e186 = shadowSum;
            shadowSum = (_e186 + _e185);
            let _e188 = shadowCoord_2;
            let _e190 = offset[1u];
            let _e193 = lightDepth_2;
            param_45 = _e193;
            param_46 = (_e188 + vec2<f32>(0f, _e190));
            let _e194 = (*depthOffset_1);
            param_47 = _e194;
            let _e195 = compareShadowDepth_u0028_f1_u003b_t21_u003b_p1_u003b_vf2_u003b_f1_u003b((&param_45), shadowMap_tex_1, shadowMap_smp_1, (&param_46), (&param_47));
            let _e196 = shadowSum;
            shadowSum = (_e196 + _e195);
            let _e198 = shadowCoord_2;
            let _e200 = offset[0u];
            let _e202 = offset[1u];
            let _e205 = lightDepth_2;
            param_48 = _e205;
            param_49 = (_e198 + vec2<f32>(_e200, _e202));
            let _e206 = (*depthOffset_1);
            param_50 = _e206;
            let _e207 = compareShadowDepth_u0028_f1_u003b_t21_u003b_p1_u003b_vf2_u003b_f1_u003b((&param_48), shadowMap_tex_1, shadowMap_smp_1, (&param_49), (&param_50));
            let _e208 = shadowSum;
            shadowSum = (_e208 + _e207);
            continue;
        } else {
            break;
        }
        continuing {
            let _e210 = i;
            i = (_e210 + 1i);
        }
    }
    let _e212 = shadowSum;
    return (_e212 / 16f);
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
    var roughness_4: f32;
    var metallic: f32;
    var emission: vec3<f32>;
    var envMapIntensity: f32;
    var geo_1: Geometry;
    var mat_1: Material;
    var outColor: vec3<f32>;
    var dLight: DirectionalLight;
    var light_1: Light;
    var shadow: f32;
    var param_51: vec3<f32>;
    var param_52: LightCamera;
    var param_53: f32;
    var param_54: Geometry;
    var param_55: Material;
    var param_56: Light;
    var refDir: vec3<f32>;
    var dNV_2: f32;
    var EF: f32;
    var param_57: f32;
    var param_58: vec3<f32>;
    var param_59: f32;
    var param_60: vec3<f32>;
    var param_61: f32;

    let _e86 = vUv_1;
    let _e87 = textureSample(uSSAOTexture_tex, uSSAOTexture_smp, _e86);
    occlusion = _e87.x;
    let _e89 = vUv_1;
    let _e90 = textureSample(sampler0_tex, sampler0_smp, _e89);
    tex0_ = _e90;
    let _e91 = vUv_1;
    let _e92 = textureSample(sampler1_tex, sampler1_smp, _e91);
    tex1_ = _e92;
    let _e93 = vUv_1;
    let _e94 = textureSample(sampler2_tex, sampler2_smp, _e93);
    tex2_ = _e94;
    let _e95 = vUv_1;
    let _e96 = textureSample(sampler3_tex, sampler3_smp, _e95);
    tex3_ = _e96;
    let _e97 = vUv_1;
    let _e98 = textureSample(sampler4_tex, sampler4_smp, _e97);
    tex4_ = _e98;
    let _e99 = tex1_;
    normal = _e99.xyz;
    let _e101 = tex2_;
    color = _e101.xyz;
    let _e104 = tex3_[0u];
    roughness_4 = _e104;
    let _e106 = tex3_[1u];
    metallic = _e106;
    let _e108 = tex0_[3u];
    let _e110 = tex1_[3u];
    let _e112 = tex4_[3u];
    emission = vec3<f32>(_e108, _e110, _e112);
    let _e115 = tex3_[3u];
    envMapIntensity = _e115;
    let _e116 = tex0_;
    let _e118 = normal;
    let _e120 = unnamed.uCameraPosition;
    let _e121 = tex0_;
    let _e125 = occlusion;
    geo_1 = Geometry(_e116.xyz, _e118, 0f, normalize((_e120 - _e121.xyz)), vec3<f32>(0f, 0f, 0f), _e125);
    let _e127 = color;
    let _e128 = roughness_4;
    let _e129 = metallic;
    let _e130 = emission;
    let _e131 = color;
    let _e132 = metallic;
    let _e135 = color;
    let _e136 = metallic;
    let _e139 = envMapIntensity;
    mat_1 = Material(_e127, _e128, _e129, _e130, mix(_e131, vec3<f32>(0f, 0f, 0f), vec3(_e132)), mix(vec3<f32>(1f, 1f, 1f), _e135, vec3(_e136)), _e139);
    outColor = vec3<f32>(0f, 0f, 0f);
    let _e143 = unnamed.directionalLight[0i];
    dLight.direction = _e143.direction;
    dLight.color = _e143.color;
    let _e149 = dLight.direction;
    light_1.direction = _e149;
    let _e152 = dLight.color;
    light_1.color = _e152;
    let _e154 = tex0_;
    param_51 = _e154.xyz;
    let _e158 = unnamed.uDirectionalLightCamera[0i];
    param_52.near = _e158.near;
    param_52.far = _e158.far;
    param_52.uViewMatrix = _e158.uViewMatrix;
    param_52.uProjectionMatrix = _e158.uProjectionMatrix;
    param_52.resolution = _e158.resolution;
    param_53 = 0.0001f;
    let _e169 = getShadowSmooth_u0028_vf3_u003b_struct_u002d_LightCamera_u002d_f1_u002d_f1_u002d_mf44_u002d_mf44_u002d_vf21_u003b_t21_u003b_p1_u003b_f1_u003b((&param_51), (&param_52), directionalLightShadowMap_0_tex, directionalLightShadowMap_0_smp, (&param_53));
    shadow = _e169;
    let _e170 = geo_1;
    param_54 = _e170;
    let _e171 = mat_1;
    param_55 = _e171;
    let _e172 = light_1;
    param_56 = _e172;
    let _e173 = RE_u0028_struct_u002d_Geometry_u002d_vf3_u002d_vf3_u002d_f1_u002d_vf3_u002d_vf3_u002d_f11_u003b_struct_u002d_Material_u002d_vf3_u002d_f1_u002d_f1_u002d_vf3_u002d_vf3_u002d_vf3_u002d_f11_u003b_struct_u002d_Light_u002d_vf3_u002d_vf31_u003b((&param_54), (&param_55), (&param_56));
    let _e174 = shadow;
    let _e176 = outColor;
    outColor = (_e176 + (_e173 * _e174));
    let _e179 = geo_1.viewDir;
    let _e182 = geo_1.normal;
    refDir = reflect(-(_e179), _e182);
    let _e185 = geo_1.normal;
    let _e187 = geo_1.viewDir;
    dNV_2 = clamp(dot(_e185, _e187), 0f, 1f);
    let _e190 = dNV_2;
    param_57 = _e190;
    let _e191 = fresnel_u0028_f1_u003b((&param_57));
    let _e193 = mat_1.metallic;
    EF = mix(_e191, 1f, _e193);
    let _e196 = geo_1.normal;
    param_58 = _e196;
    param_59 = 1f;
    let _e197 = getPmrem_u0028_t21_u003b_p1_u003b_vf3_u003b_f1_u003b(uEnvMap_tex, uEnvMap_smp, (&param_58), (&param_59));
    let _e199 = mat_1.diffuseColor;
    let _e202 = mat_1.envMapIntensity;
    let _e204 = outColor;
    outColor = (_e204 + ((_e197 * _e199) * _e202));
    let _e206 = outColor;
    let _e207 = refDir;
    param_60 = _e207;
    let _e209 = mat_1.roughness;
    param_61 = _e209;
    let _e210 = getPmrem_u0028_t21_u003b_p1_u003b_vf3_u003b_f1_u003b(uEnvMap_tex, uEnvMap_smp, (&param_60), (&param_61));
    let _e211 = EF;
    let _e213 = mat_1.specularColor;
    let _e216 = mat_1.envMapIntensity;
    outColor = mix(_e206, _e210, ((_e213 * _e211) * _e216));
    let _e220 = geo_1.occulusion;
    let _e224 = outColor;
    outColor = (_e224 * max(0f, (1f - (_e220 * 1.5f))));
    let _e227 = mat_1.emission;
    let _e228 = outColor;
    outColor = (_e228 + _e227);
    let _e230 = vUv_1;
    let _e231 = textureSample(uLightShaftTexture_tex, uLightShaftTexture_smp, _e230);
    let _e233 = outColor;
    outColor = (_e233 + _e231.xyz);
    let _e235 = outColor;
    let _e236 = max(vec3<f32>(0f, 0f, 0f), _e235);
    let _e240 = vec4<f32>(_e236.x, _e236.y, _e236.z, 1f);
    glFragOut1_ = _e240;
    glFragOut0_ = _e240;
    return;
}

@fragment 
fn main(@location(0) vUv: vec2<f32>) -> FragmentOutput {
    vUv_1 = vUv;
    main_1();
    let _e4 = glFragOut0_;
    let _e5 = glFragOut1_;
    return FragmentOutput(_e4, _e5);
}
