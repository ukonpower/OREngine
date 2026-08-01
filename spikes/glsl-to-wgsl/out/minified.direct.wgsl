struct as_ {
    position: vec3<f32>,
    e: vec3<f32>,
    o: f32,
    t: vec3<f32>,
    i: vec3<f32>,
    a: f32,
}

struct ad {
    color: vec3<f32>,
    r: f32,
    c: f32,
    v: vec3<f32>,
    u: vec3<f32>,
    n: vec3<f32>,
    l: f32,
}

struct aP {
    direction: vec3<f32>,
    color: vec3<f32>,
}

struct ak {
    position: vec3<f32>,
    direction: vec3<f32>,
    color: vec3<f32>,
    angle: f32,
    blend: f32,
    distance: f32,
    decay: f32,
}

struct aM {
    near: f32,
    far: f32,
    uViewMatrix: mat4x4<f32>,
    uProjectionMatrix: mat4x4<f32>,
    resolution: vec2<f32>,
}

struct af {
    direction: vec3<f32>,
    color: vec3<f32>,
}

struct Params {
    directionalLight: array<aP, 1>,
    uDirectionalLightCamera: array<aM, 1>,
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

fn au(v: f32, u_tex: texture_2d<f32>, u_smp: sampler, x: vec2<f32>, I: f32) -> f32 {
    var v_1: f32;
    var x_1: vec2<f32>;
    var I_1: f32;
    var local: f32;

    v_1 = v;
    x_1 = x;
    I_1 = I;
    let _e22 = x_1;
    let _e26 = x_1;
    let _e31 = x_1;
    let _e36 = x_1;
    if ((((_e22.x >= 0f) && (_e26.x <= 1f)) && (_e31.y >= 0f)) && (_e36.y <= 1f)) {
        let _e41 = v_1;
        let _e42 = x_1;
        let _e43 = textureSample(u_tex, u_smp, _e42);
        let _e57 = I_1;
        local = step(_e41, (dot(_e43, vec4<f32>(1f, 0.003921569f, 0.0000153787f, 0.00000006030863f)) + _e57));
    } else {
        local = 1f;
    }
    let _e62 = local;
    return _e62;
}

fn ah(v_2: vec3<f32>, u: aM, x_2: ptr<function, vec2<f32>>, I_2: ptr<function, f32>) {
    var v_3: vec3<f32>;
    var u_1: aM;
    var e: vec4<f32>;
    var t: vec4<f32>;
    var T: f32;

    v_3 = v_2;
    u_1 = u;
    let _e20 = u_1;
    let _e22 = v_3;
    e = (_e20.uViewMatrix * vec4<f32>(_e22.x, _e22.y, _e22.z, 1f));
    let _e31 = u_1;
    let _e33 = e;
    t = (_e31.uProjectionMatrix * _e33);
    let _e36 = t;
    let _e38 = t;
    (*x_2) = (((_e36.xy / vec2(_e38.w)) * 0.5f) + vec2(0.5f));
    let _e47 = u_1;
    T = _e47.near;
    let _e50 = e;
    let _e53 = T;
    let _e55 = u_1;
    let _e57 = T;
    (*I_2) = ((-(_e50.z) - _e53) / (_e55.far - _e57));
    return;
}

fn av(v_4: vec3<f32>, u_2: aM, x_tex: texture_2d<f32>, x_smp: sampler, e_1: f32) -> f32 {
    var v_5: vec3<f32>;
    var u_3: aM;
    var e_2: f32;
    var I_3: vec2<f32>;
    var F: f32;
    var t_1: f32;
    var v_6: i32 = 0i;
    var T_1: vec2<f32>;

    v_5 = v_4;
    u_3 = u_2;
    e_2 = e_1;
    let _e24 = v_5;
    let _e25 = u_3;
    ah(_e24, _e25, (&I_3), (&F));
    let _e30 = F;
    let _e31 = I_3;
    let _e32 = e_2;
    let _e33 = au(_e30, x_tex, x_smp, _e31, _e32);
    t_1 = _e33;
    loop {
        let _e37 = v_6;
        if !((_e37 < 2i)) {
            break;
        }
        {
            let _e45 = u_3;
            let _e49 = v_6;
            T_1 = ((vec2(1f) / _e45.resolution) * (f32((_e49 + 1i)) / 2f));
            let _e58 = t_1;
            let _e59 = F;
            let _e60 = I_3;
            let _e61 = T_1;
            let _e64 = T_1;
            let _e69 = e_2;
            let _e70 = au(_e59, x_tex, x_smp, (_e60 + vec2<f32>(-(_e61.x), -(_e64.y))), _e69);
            let _e72 = F;
            let _e73 = I_3;
            let _e75 = T_1;
            let _e81 = e_2;
            let _e82 = au(_e72, x_tex, x_smp, (_e73 + vec2<f32>(0f, -(_e75.y))), _e81);
            let _e84 = F;
            let _e85 = I_3;
            let _e86 = T_1;
            let _e88 = T_1;
            let _e93 = e_2;
            let _e94 = au(_e84, x_tex, x_smp, (_e85 + vec2<f32>(_e86.x, -(_e88.y))), _e93);
            let _e96 = F;
            let _e97 = I_3;
            let _e98 = T_1;
            let _e105 = e_2;
            let _e106 = au(_e96, x_tex, x_smp, (_e97 + vec2<f32>(-(_e98.x), 0f)), _e105);
            let _e108 = F;
            let _e109 = I_3;
            let _e110 = T_1;
            let _e116 = e_2;
            let _e117 = au(_e108, x_tex, x_smp, (_e109 + vec2<f32>(_e110.x, 0f)), _e116);
            let _e119 = F;
            let _e120 = I_3;
            let _e121 = T_1;
            let _e124 = T_1;
            let _e128 = e_2;
            let _e129 = au(_e119, x_tex, x_smp, (_e120 + vec2<f32>(-(_e121.x), _e124.y)), _e128);
            let _e131 = F;
            let _e132 = I_3;
            let _e134 = T_1;
            let _e139 = e_2;
            let _e140 = au(_e131, x_tex, x_smp, (_e132 + vec2<f32>(0f, _e134.y)), _e139);
            let _e142 = F;
            let _e143 = I_3;
            let _e144 = T_1;
            let _e147 = e_2;
            let _e148 = au(_e142, x_tex, x_smp, (_e143 + vec2<f32>(_e144)), _e147);
            t_1 = ((((((((_e58 + _e70) + _e82) + _e94) + _e106) + _e117) + _e129) + _e140) + _e148);
        }
        continuing {
            let _e41 = v_6;
            v_6 = (_e41 + 1i);
        }
    }
    let _e150 = t_1;
    return (_e150 / 16f);
}

fn aw(v_7: f32, u_4: f32) -> f32 {
    var v_8: f32;
    var u_5: f32;
    var local_1: f32;

    v_8 = v_7;
    u_5 = u_4;
    let _e18 = u_5;
    let _e19 = u_5;
    u_5 = (_e18 * _e19);
    let _e21 = u_5;
    let _e22 = u_5;
    u_5 = (_e21 * _e22);
    let _e24 = v_8;
    let _e25 = v_8;
    v_8 = (_e24 * _e25);
    let _e27 = v_8;
    if (_e27 <= 0f) {
        local_1 = 0f;
    } else {
        let _e31 = u_5;
        let _e33 = v_8;
        let _e34 = u_5;
        local_1 = (_e31 / (3.1415927f * pow(((_e33 * (_e34 - 1f)) + 1f), 2f)));
    }
    let _e45 = local_1;
    return _e45;
}

fn az(v_9: f32, u_6: f32) -> f32 {
    var v_10: f32;
    var u_7: f32;
    var local_2: f32;

    v_10 = v_9;
    u_7 = u_6;
    let _e18 = v_10;
    if (_e18 == 0f) {
        local_2 = 0f;
    } else {
        let _e22 = v_10;
        let _e23 = v_10;
        let _e25 = u_7;
        let _e28 = u_7;
        local_2 = (_e22 / ((_e23 * (1f - _e25)) + _e28));
    }
    let _e32 = local_2;
    return _e32;
}

fn aS(v_11: f32, u_8: f32, x_3: f32) -> f32 {
    var v_12: f32;
    var u_9: f32;
    var x_4: f32;

    v_12 = v_11;
    u_9 = u_8;
    x_4 = x_3;
    let _e20 = x_4;
    x_4 = clamp((_e20 * 0.7978845f), 0f, 1f);
    let _e29 = v_12;
    let _e30 = x_4;
    let _e31 = az(_e29, _e30);
    let _e32 = u_9;
    let _e33 = x_4;
    let _e34 = az(_e32, _e33);
    return (_e31 * _e34);
}

fn aT(v_13: f32) -> f32 {
    var v_14: f32;

    v_14 = v_13;
    let _e19 = v_14;
    return (0.04f + (0.96f * pow((1f - _e19), 5f)));
}

fn aA(v_15: as_, u_10: ad, x_5: af) -> vec3<f32> {
    var v_16: as_;
    var u_11: ad;
    var x_6: af;
    var e_3: vec3<f32>;
    var t_2: vec3<f32>;
    var I_4: f32;
    var F_1: f32;
    var T_2: vec3<f32>;
    var E: vec3<f32>;
    var c: f32;
    var n: f32;
    var d: f32;

    v_16 = v_15;
    u_11 = u_10;
    x_6 = x_5;
    let _e20 = x_6;
    e_3 = normalize(_e20.direction);
    let _e24 = v_16;
    let _e26 = e_3;
    t_2 = normalize((_e24.t + _e26));
    let _e30 = v_16;
    let _e32 = v_16;
    I_4 = clamp(dot(_e30.e, _e32.t), 0f, 1f);
    let _e39 = v_16;
    let _e41 = e_3;
    F_1 = clamp(dot(_e39.e, _e41), 0f, 1f);
    let _e47 = x_6;
    let _e49 = F_1;
    T_2 = (_e47.color * _e49);
    let _e52 = u_11;
    let _e57 = T_2;
    E = ((_e52.u / vec3(3.1415927f)) * _e57);
    let _e60 = v_16;
    let _e62 = t_2;
    let _e67 = u_11;
    let _e69 = aw(clamp(dot(_e60.e, _e62), 0f, 1f), _e67.r);
    c = _e69;
    let _e71 = I_4;
    let _e72 = F_1;
    let _e73 = u_11;
    let _e75 = aS(_e71, _e72, _e73.r);
    n = _e75;
    let _e77 = e_3;
    let _e78 = t_2;
    let _e83 = aT(clamp(dot(_e77, _e78), 0f, 1f));
    d = _e83;
    let _e88 = E;
    let _e90 = d;
    let _e94 = c;
    let _e95 = n;
    let _e97 = d;
    let _e100 = F_1;
    let _e102 = I_4;
    let _e107 = u_11;
    let _e110 = T_2;
    return ((vec3(0f) + (_e88 * (1f - _e90))) + (((((_e94 * _e95) * _e97) / (((4f * _e100) * _e102) + 0.0001f)) * _e107.n) * _e110));
}

fn aB(direction: vec3<f32>) -> f32 {
    var direction_1: vec3<f32>;
    var v_17: vec3<f32>;
    var local_3: f32;
    var local_4: f32;
    var local_5: f32;
    var local_6: f32;
    var local_7: f32;
    var local_8: f32;
    var local_9: f32;

    direction_1 = direction;
    let _e16 = direction_1;
    v_17 = abs(_e16);
    let _e19 = v_17;
    let _e21 = v_17;
    if (_e19.x > _e21.z) {
        let _e24 = v_17;
        let _e26 = v_17;
        if (_e24.x > _e26.y) {
            let _e29 = direction_1;
            if (_e29.x > 0f) {
                local_3 = 0f;
            } else {
                local_3 = 3f;
            }
            let _e36 = local_3;
            local_5 = _e36;
        } else {
            let _e37 = direction_1;
            if (_e37.y > 0f) {
                local_4 = 1f;
            } else {
                local_4 = 4f;
            }
            let _e44 = local_4;
            local_5 = _e44;
        }
        let _e46 = local_5;
        local_9 = _e46;
    } else {
        let _e47 = v_17;
        let _e49 = v_17;
        if (_e47.z > _e49.y) {
            let _e52 = direction_1;
            if (_e52.z > 0f) {
                local_6 = 2f;
            } else {
                local_6 = 5f;
            }
            let _e59 = local_6;
            local_8 = _e59;
        } else {
            let _e60 = direction_1;
            if (_e60.y > 0f) {
                local_7 = 1f;
            } else {
                local_7 = 4f;
            }
            let _e67 = local_7;
            local_8 = _e67;
        }
        let _e69 = local_8;
        local_9 = _e69;
    }
    let _e71 = local_9;
    return _e71;
}

fn aC(direction_2: vec3<f32>, v_18: f32) -> vec3<f32> {
    var direction_3: vec3<f32>;
    var v_19: f32;
    var u_12: f32;
    var local_10: vec2<f32>;
    var local_11: vec2<f32>;
    var local_12: vec2<f32>;
    var local_13: vec2<f32>;
    var local_14: vec2<f32>;
    var x_7: vec2<f32>;
    var e_4: vec2<f32>;
    var I_5: vec4<f32>;

    direction_3 = direction_2;
    v_19 = v_18;
    let _e37 = direction_3;
    let _e38 = aB(_e37);
    u_12 = _e38;
    let _e41 = u_12;
    if (_e41 == 0f) {
        let _e44 = direction_3;
        let _e47 = direction_3;
        local_14 = (vec2<f32>(_e44.zy) / vec2(abs(_e47.x)));
    } else {
        let _e52 = u_12;
        if (_e52 == 1f) {
            let _e55 = direction_3;
            let _e58 = direction_3;
            let _e62 = direction_3;
            local_13 = (vec2<f32>(-(_e55.x), -(_e58.z)) / vec2(abs(_e62.y)));
        } else {
            let _e67 = u_12;
            if (_e67 == 2f) {
                let _e70 = direction_3;
                let _e73 = direction_3;
                let _e76 = direction_3;
                local_12 = (vec2<f32>(-(_e70.x), _e73.y) / vec2(abs(_e76.z)));
            } else {
                let _e81 = u_12;
                if (_e81 == 3f) {
                    let _e84 = direction_3;
                    let _e87 = direction_3;
                    let _e90 = direction_3;
                    local_11 = (vec2<f32>(-(_e84.z), _e87.y) / vec2(abs(_e90.x)));
                } else {
                    let _e95 = u_12;
                    if (_e95 == 4f) {
                        let _e98 = direction_3;
                        let _e101 = direction_3;
                        let _e104 = direction_3;
                        local_10 = (vec2<f32>(-(_e98.x), _e101.z) / vec2(abs(_e104.y)));
                    } else {
                        let _e109 = direction_3;
                        let _e112 = direction_3;
                        local_10 = (vec2<f32>(_e109.xy) / vec2(abs(_e112.z)));
                    }
                    let _e118 = local_10;
                    local_11 = _e118;
                }
                let _e120 = local_11;
                local_12 = _e120;
            }
            let _e122 = local_12;
            local_13 = _e122;
        }
        let _e124 = local_13;
        local_14 = _e124;
    }
    let _e126 = local_14;
    x_7 = (0.5f * (_e126 + vec2(1f)));
    let _e133 = textureDimensions(uEnvMap_tex, 0i);
    let _e137 = v_19;
    e_4 = (vec2<f32>(vec2<i32>(_e133)) * pow(0.5f, floor(_e137)));
    let _e142 = x_7;
    let _e143 = e_4;
    let _e151 = e_4;
    x_7 = (((_e142 * (_e143 - vec2(4f))) + vec2(2f)) / _e151);
    let _e154 = x_7;
    let _e156 = u_12;
    x_7.x = (_e154.x + (_e156 - (floor((_e156 / 3f)) * 3f)));
    let _e164 = x_7;
    let _e166 = u_12;
    x_7.y = (_e164.y + floor((_e166 / 3f)));
    let _e172 = x_7;
    x_7.y = (_e172.y * 0.5f);
    let _e177 = x_7;
    x_7.y = (_e177.y * 0.5f);
    let _e182 = x_7;
    x_7.x = (_e182.x / 3f);
    let _e188 = v_19;
    u_12 = (1f - pow(2f, -(floor(_e188))));
    let _e194 = x_7;
    let _e197 = u_12;
    x_7.y = (_e194.y * (1f - _e197));
    let _e201 = x_7;
    let _e204 = u_12;
    x_7.x = (_e201.x * (1f - _e204));
    let _e208 = x_7;
    let _e210 = u_12;
    x_7.y = (_e208.y + _e210);
    let _e212 = x_7;
    let _e219 = textureSampleGrad(uEnvMap_tex, uEnvMap_smp, _e212, vec2(0f), vec2(0f));
    I_5 = _e219;
    let _e221 = I_5;
    let _e223 = I_5;
    return (_e221.xyz / vec3(_e223.w));
}

fn bd(direction_4: vec3<f32>, v_20: f32) -> vec3<f32> {
    var direction_5: vec3<f32>;
    var v_21: f32;
    var u_13: f32;
    var e_5: vec3<f32>;
    var x_8: vec3<f32>;

    direction_5 = direction_4;
    v_21 = v_20;
    let _e37 = v_21;
    v_21 = (_e37 * 4f);
    let _e42 = v_21;
    u_13 = fract(_e42);
    let _e45 = v_21;
    v_21 = floor(_e45);
    let _e47 = direction_5;
    let _e48 = v_21;
    let _e49 = aC(_e47, _e48);
    e_5 = _e49;
    let _e51 = u_13;
    if (_e51 == 0f) {
        let _e54 = e_5;
        return _e54;
    }
    {
        let _e55 = direction_5;
        let _e56 = v_21;
        let _e59 = aC(_e55, (_e56 + 1f));
        x_8 = _e59;
        let _e61 = e_5;
        let _e62 = x_8;
        let _e63 = u_13;
        return mix(_e61, _e62, vec3(_e63));
    }
}

fn main_1() {
    var v_22: vec4<f32>;
    var u_14: vec4<f32>;
    var e_6: vec4<f32>;
    var color: vec3<f32>;
    var x_9: f32;
    var I_6: as_;
    var T_3: ad;
    var F_2: vec3<f32> = vec3(0f);
    var t_3: f32;
    var H: af;
    var c_1: aP;

    let _e33 = vUv_1;
    let _e34 = textureSample(sampler0_tex, sampler0_smp, _e33);
    v_22 = _e34;
    let _e36 = vUv_1;
    let _e37 = textureSample(sampler1_tex, sampler1_smp, _e36);
    u_14 = _e37;
    let _e39 = vUv_1;
    let _e40 = textureSample(sampler3_tex, sampler3_smp, _e39);
    e_6 = _e40;
    let _e42 = vUv_1;
    let _e43 = textureSample(sampler2_tex, sampler2_smp, _e42);
    color = _e43.xyz;
    let _e46 = e_6;
    x_9 = _e46.y;
    let _e49 = v_22;
    let _e51 = u_14;
    let _e54 = global.uCameraPosition;
    let _e55 = v_22;
    let _e62 = vUv_1;
    let _e63 = textureSample(uSSAOTexture_tex, uSSAOTexture_smp, _e62);
    I_6 = as_(_e49.xyz, _e51.xyz, 0f, normalize((_e54 - _e55.xyz)), vec3(0f), _e63.x);
    let _e67 = color;
    let _e68 = e_6;
    let _e70 = x_9;
    let _e71 = v_22;
    let _e73 = u_14;
    let _e75 = vUv_1;
    let _e76 = textureSample(sampler4_tex, sampler4_smp, _e75);
    let _e79 = color;
    let _e83 = x_9;
    let _e89 = color;
    let _e90 = x_9;
    let _e93 = e_6;
    T_3 = ad(_e67, _e68.x, _e70, vec3<f32>(_e71.w, _e73.w, _e76.w), mix(_e79, vec3(0f), vec3(_e83)), mix(vec3(1f), _e89, vec3(_e90)), _e93.w);
    let _e106 = global.directionalLight[0];
    c_1 = _e106;
    let _e108 = c_1;
    H.direction = _e108.direction;
    let _e111 = c_1;
    H.color = _e111.color;
    let _e113 = v_22;
    let _e117 = global.uDirectionalLightCamera[0];
    let _e119 = av(_e113.xyz, _e117, directionalLightShadowMap_0_tex, directionalLightShadowMap_0_smp, 0.0001f);
    t_3 = _e119;
    let _e120 = F_2;
    let _e122 = F_2;
    let _e124 = I_6;
    let _e125 = T_3;
    let _e126 = H;
    let _e127 = aA(_e124, _e125, _e126);
    let _e128 = t_3;
    let _e130 = (_e122.xyz + (_e127 * _e128));
    F_2.x = _e130.x;
    F_2.y = _e130.y;
    F_2.z = _e130.z;
    let _e137 = F_2;
    let _e139 = F_2;
    let _e141 = I_6;
    let _e144 = bd(_e141.e, 1f);
    let _e145 = T_3;
    let _e148 = T_3;
    let _e151 = (_e139.xyz + ((_e144 * _e145.u) * _e148.l));
    F_2.x = _e151.x;
    F_2.y = _e151.y;
    F_2.z = _e151.z;
    let _e158 = F_2;
    let _e160 = F_2;
    let _e162 = I_6;
    let _e165 = I_6;
    let _e168 = T_3;
    let _e170 = bd(reflect(-(_e162.t), _e165.e), _e168.r);
    let _e171 = I_6;
    let _e173 = I_6;
    let _e179 = aT(clamp(dot(_e171.e, _e173.t), 0f, 1f));
    let _e181 = T_3;
    let _e184 = T_3;
    let _e187 = T_3;
    let _e190 = mix(_e160.xyz, _e170, ((mix(_e179, 1f, _e181.c) * _e184.n) * _e187.l));
    F_2.x = _e190.x;
    F_2.y = _e190.y;
    F_2.z = _e190.z;
    let _e197 = F_2;
    let _e199 = F_2;
    let _e203 = I_6;
    let _e209 = (_e199.xyz * max(0f, (1f - (_e203.a * 1.5f))));
    F_2.x = _e209.x;
    F_2.y = _e209.y;
    F_2.z = _e209.z;
    let _e216 = F_2;
    let _e218 = F_2;
    let _e220 = T_3;
    let _e222 = (_e218.xyz + _e220.v);
    F_2.x = _e222.x;
    F_2.y = _e222.y;
    F_2.z = _e222.z;
    let _e229 = F_2;
    let _e231 = F_2;
    let _e233 = vUv_1;
    let _e234 = textureSample(uLightShaftTexture_tex, uLightShaftTexture_smp, _e233);
    let _e236 = (_e231.xyz + _e234.xyz);
    F_2.x = _e236.x;
    F_2.y = _e236.y;
    F_2.z = _e236.z;
    let _e246 = F_2;
    let _e248 = max(vec3(0f), _e246.xyz);
    let _e254 = vec4<f32>(_e248.x, _e248.y, _e248.z, 1f);
    glFragOut1_ = _e254;
    glFragOut0_ = _e254;
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
