struct LightCamera {
    near: f32,
    far: f32,
    uViewMatrix: mat4x4<f32>,
    uProjectionMatrix: mat4x4<f32>,
    resolution: vec2<f32>,
}

struct Geometry {
    position: vec3<f32>,
    ZeJ: vec3<f32>,
    depth: f32,
    viewDir: vec3<f32>,
    viewDirWorld: vec3<f32>,
    occulusion: f32,
}

struct Material {
    ZeK: vec3<f32>,
    roughness: f32,
    ZeM: f32,
    ZeN: vec3<f32>,
    diffuseColor: vec3<f32>,
    specularColor: vec3<f32>,
    ZeO: f32,
}

struct Light {
    direction: vec3<f32>,
    ZeK: vec3<f32>,
}

struct DirectionalLight {
    direction: vec3<f32>,
    ZeK: vec3<f32>,
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
var Zcp: texture_2d<f32>;
@group(0) @binding(14) 
var Zcq: sampler;
var<private> Zcr: vec2<f32>;
@group(0) @binding(3) 
var Zcs: texture_2d<f32>;
@group(0) @binding(4) 
var Zct: sampler;
@group(0) @binding(5) 
var Zcu: texture_2d<f32>;
@group(0) @binding(6) 
var Zcv: sampler;
@group(0) @binding(7) 
var Zcw: texture_2d<f32>;
@group(0) @binding(8) 
var Zcx: sampler;
@group(0) @binding(9) 
var Zcy: texture_2d<f32>;
@group(0) @binding(10) 
var Zcz: sampler;
@group(0) @binding(11) 
var ZcA: texture_2d<f32>;
@group(0) @binding(12) 
var ZcB: sampler;
@group(0) @binding(0) 
var<uniform> ZcC: Params;
@group(0) @binding(1) 
var ZcD: texture_2d<f32>;
@group(0) @binding(2) 
var ZcE: sampler;
@group(0) @binding(17) 
var ZcF: texture_2d<f32>;
@group(0) @binding(18) 
var ZcG: sampler;
@group(0) @binding(15) 
var ZcH: texture_2d<f32>;
@group(0) @binding(16) 
var ZcI: sampler;
var<private> ZcJ: vec4<f32>;
var<private> ZcK: vec4<f32>;

fn Za(direction: ptr<function, vec3<f32>>, face: ptr<function, f32>) -> vec2<f32> {
    var ZcL: vec2<f32>;

    let Zq = (*face);
    if (Zq == 0f) {
        let Zr = (*direction)[2u];
        let Zs = (*direction)[1u];
        let Zt = (*direction)[0u];
        ZcL = (vec2<f32>(Zr, Zs) / vec2(abs(Zt)));
    } else {
        let Zu = (*face);
        if (Zu == 1f) {
            let Zv = (*direction)[0u];
            let Zw = (*direction)[2u];
            let Zx = (*direction)[1u];
            ZcL = (vec2<f32>(-(Zv), -(Zw)) / vec2(abs(Zx)));
        } else {
            let Zy = (*face);
            if (Zy == 2f) {
                let Zz = (*direction)[0u];
                let ZA = (*direction)[1u];
                let ZB = (*direction)[2u];
                ZcL = (vec2<f32>(-(Zz), ZA) / vec2(abs(ZB)));
            } else {
                let ZC = (*face);
                if (ZC == 3f) {
                    let ZD = (*direction)[2u];
                    let ZE = (*direction)[1u];
                    let ZF = (*direction)[0u];
                    ZcL = (vec2<f32>(-(ZD), ZE) / vec2(abs(ZF)));
                } else {
                    let ZG = (*face);
                    if (ZG == 4f) {
                        let ZH = (*direction)[0u];
                        let ZI = (*direction)[2u];
                        let ZJ = (*direction)[1u];
                        ZcL = (vec2<f32>(-(ZH), ZI) / vec2(abs(ZJ)));
                    } else {
                        let ZK = (*direction)[0u];
                        let ZL = (*direction)[1u];
                        let ZM = (*direction)[2u];
                        ZcL = (vec2<f32>(ZK, ZL) / vec2(abs(ZM)));
                    }
                }
            }
        }
    }
    let ZN = ZcL;
    return ((ZN + vec2(1f)) * 0.5f);
}

fn Zb(direction_1: ptr<function, vec3<f32>>) -> f32 {
    var ZcM: vec3<f32>;
    var ZcN: f32;

    let Zq = (*direction_1);
    ZcM = abs(Zq);
    ZcN = -1f;
    let Zr = ZcM[0u];
    let Zs = ZcM[2u];
    if (Zr > Zs) {
        let Zt = ZcM[0u];
        let ZO = ZcM[1u];
        if (Zt > ZO) {
            let ZP = (*direction_1)[0u];
            ZcN = select(3f, 0f, (ZP > 0f));
        } else {
            let ZQ = (*direction_1)[1u];
            ZcN = select(4f, 1f, (ZQ > 0f));
        }
    } else {
        let ZR = ZcM[2u];
        let ZS = ZcM[1u];
        if (ZR > ZS) {
            let Zy = (*direction_1)[2u];
            ZcN = select(5f, 2f, (Zy > 0f));
        } else {
            let ZT = (*direction_1)[1u];
            ZcN = select(4f, 1f, (ZT > 0f));
        }
    }
    let ZU = ZcN;
    return ZU;
}

fn Zc(envMap_tex: texture_2d<f32>, envMap_smp: sampler, direction_2: ptr<function, vec3<f32>>, mip: ptr<function, f32>) -> vec3<f32> {
    var ZcO: f32;
    var ZcP: vec3<f32>;
    var ZcQ: vec2<f32>;
    var ZcR: vec3<f32>;
    var ZcS: f32;
    var ZcT: vec2<f32>;
    var ZcU: f32;
    var ZcV: f32;
    var ZcW: vec4<f32>;

    let ZO = (*direction_2);
    ZcP = ZO;
    let ZV = Zb((&ZcP));
    ZcO = ZV;
    let Zu = (*direction_2);
    ZcR = Zu;
    let ZP = ZcO;
    ZcS = ZP;
    let ZW = Za((&ZcR), (&ZcS));
    ZcQ = ZW;
    let Zv = textureDimensions(envMap_tex, 0i);
    let Zw = (*mip);
    ZcT = (vec2<f32>(vec2<i32>(Zv)) * pow(0.5f, floor(Zw)));
    ZcU = 2f;
    let Zx = ZcT;
    let ZS = ZcU;
    let ZX = ZcQ;
    ZcQ = (ZX * (Zx - vec2((2f * ZS))));
    let Zz = ZcU;
    let ZY = ZcQ;
    ZcQ = (ZY + vec2((1f * Zz)));
    let ZZ = ZcT;
    let ZB = ZcQ;
    ZcQ = (ZB / ZZ);
    let Zaa = ZcO;
    let Zab = ZcQ[0u];
    ZcQ[0u] = (Zab + (Zaa - (floor((Zaa / 3f)) * 3f)));
    let Zac = ZcO;
    let Zad = ZcQ[1u];
    ZcQ[1u] = (Zad + floor((Zac / 3f)));
    let Zae = ZcQ[1u];
    ZcQ[1u] = (Zae * 0.5f);
    let ZI = ZcQ[1u];
    ZcQ[1u] = (ZI * 0.5f);
    let Zaf = ZcQ[0u];
    ZcQ[0u] = (Zaf / 3f);
    let Zag = (*mip);
    ZcV = (1f - pow(2f, -(floor(Zag))));
    let Zah = ZcV;
    let Zai = ZcQ[1u];
    ZcQ[1u] = (Zai * (1f - Zah));
    let Zaj = ZcV;
    let Zak = ZcQ[0u];
    ZcQ[0u] = (Zak * (1f - Zaj));
    let Zal = ZcV;
    let Zam = ZcQ[1u];
    ZcQ[1u] = (Zam + Zal);
    let Zan = ZcQ;
    let Zao = textureSampleGrad(envMap_tex, envMap_smp, Zan, vec2<f32>(0f, 0f), vec2<f32>(0f, 0f));
    ZcW = Zao;
    let Zap = ZcW;
    let Zaq = ZcW[3u];
    return (Zap.xyz / vec3(Zaq));
}

fn Zd(roughness: ptr<function, f32>) -> f32 {
    var ZcX: f32;

    ZcX = 0f;
    let Zar = (*roughness);
    ZcX = (Zar * 4f);
    let Zas = ZcX;
    return Zas;
}

fn Ze(envMap_tex_1: texture_2d<f32>, envMap_smp_1: sampler, direction_3: ptr<function, vec3<f32>>, roughness_1: ptr<function, f32>) -> vec3<f32> {
    var ZcY: f32;
    var ZcZ: f32;
    var Zda: f32;
    var Zdb: f32;
    var Zdc: vec3<f32>;
    var Zdd: vec3<f32>;
    var Zde: f32;
    var Zdf: vec3<f32>;
    var Zdg: vec3<f32>;
    var Zdh: f32;

    let ZV = (*roughness_1);
    ZcZ = ZV;
    let Zu = Zd((&ZcZ));
    ZcY = Zu;
    let ZP = ZcY;
    Zda = fract(ZP);
    let Zv = ZcY;
    Zdb = floor(Zv);
    let ZQ = (*direction_3);
    Zdd = ZQ;
    let Zw = Zdb;
    Zde = Zw;
    let Zat = Zc(envMap_tex_1, envMap_smp_1, (&Zdd), (&Zde));
    Zdc = Zat;
    let Zau = Zda;
    if (Zau == 0f) {
        let Zx = Zdc;
        return Zx;
    } else {
        let ZS = Zdb;
        let Zav = (*direction_3);
        Zdg = Zav;
        Zdh = (ZS + 1f);
        let Zy = Zc(envMap_tex_1, envMap_smp_1, (&Zdg), (&Zdh));
        Zdf = Zy;
        let ZX = Zdc;
        let Zaw = Zdf;
        let Zz = Zda;
        return mix(ZX, Zaw, vec3(Zz));
    }
}

fn Zf(d: ptr<function, f32>) -> f32 {
    var Zdi: f32;

    Zdi = 0.04f;
    let Zar = Zdi;
    let Zq = Zdi;
    let Zax = (*d);
    return (Zar + ((1f - Zq) * pow((1f - Zax), 5f)));
}

fn Zg(d_1: ptr<function, f32>, k: ptr<function, f32>) -> f32 {
    let Zar = (*d_1);
    if (Zar == 0f) {
        return 0f;
    }
    let Zas = (*d_1);
    let Zax = (*d_1);
    let Zr = (*k);
    let Zay = (*k);
    return (Zas / ((Zax * (1f - Zr)) + Zay));
}

fn Zh(dNV: ptr<function, f32>, dNL: ptr<function, f32>, roughness_2: ptr<function, f32>) -> f32 {
    var Zdj: f32;
    var Zdk: f32;
    var Zdl: f32;
    var Zdm: f32;
    var Zdn: f32;

    let Zs = (*roughness_2);
    Zdj = clamp((Zs * 0.7978846f), 0f, 1f);
    let Zt = (*dNV);
    Zdk = Zt;
    let Zaz = Zdj;
    Zdl = Zaz;
    let ZO = Zg((&Zdk), (&Zdl));
    let ZV = (*dNL);
    Zdm = ZV;
    let Zu = Zdj;
    Zdn = Zu;
    let ZP = Zg((&Zdm), (&Zdn));
    return (ZO * ZP);
}

fn Zi(dNH: ptr<function, f32>, roughness_3: ptr<function, f32>) -> f32 {
    var Zdo: f32;
    var Zdp: f32;

    let Zas = (*roughness_3);
    let Zax = (*roughness_3);
    Zdo = (Zas * Zax);
    let ZaA = Zdo;
    let Zs = Zdo;
    Zdo = (ZaA * Zs);
    let ZaB = (*dNH);
    let Zt = (*dNH);
    Zdp = (ZaB * Zt);
    let ZO = Zdp;
    if (ZO <= 0f) {
        return 0f;
    }
    let Zu = Zdo;
    let ZP = Zdp;
    let ZW = Zdo;
    return (Zu / (3.1415927f * pow(((ZP * (ZW - 1f)) + 1f), 2f)));
}

fn Zj(diffuseColor: ptr<function, vec3<f32>>) -> vec3<f32> {
    let ZaC = (*diffuseColor);
    return (ZaC / vec3(3.1415927f));
}

fn Zk(geo: ptr<function, Geometry>, mat: ptr<function, Material>, light: ptr<function, Light>) -> vec3<f32> {
    var Zdq: vec3<f32>;
    var Zdr: vec3<f32>;
    var Zds: f32;
    var Zdt: f32;
    var Zdu: f32;
    var Zdv: f32;
    var Zdw: vec3<f32>;
    var Zdx: vec3<f32>;
    var Zdy: vec3<f32>;
    var Zdz: f32;
    var ZdA: f32;
    var ZdB: f32;
    var ZdC: f32;
    var ZdD: f32;
    var ZdE: f32;
    var ZdF: f32;
    var ZdG: f32;
    var ZdH: f32;
    var ZdI: vec3<f32>;
    var ZdJ: vec3<f32>;

    let ZR = (*light).direction;
    Zdq = normalize(ZR);
    let ZaD = (*geo).viewDir;
    let Zav = Zdq;
    Zdr = normalize((ZaD + Zav));
    let Zaw = Zdq;
    let Zz = Zdr;
    Zds = clamp(dot(Zaw, Zz), 0f, 1f);
    let ZU = (*geo).ZeJ;
    let ZZ = Zdr;
    Zdt = clamp(dot(ZU, ZZ), 0f, 1f);
    let ZaE = (*geo).ZeJ;
    let ZaF = (*geo).viewDir;
    Zdu = clamp(dot(ZaE, ZaF), 0f, 1f);
    let ZaG = (*geo).ZeJ;
    let ZE = Zdq;
    Zdv = clamp(dot(ZaG, ZE), 0f, 1f);
    let ZaH = (*light).ZeK;
    let Zad = Zdv;
    Zdw = (ZaH * Zad);
    let ZaI = (*mat).diffuseColor;
    Zdy = ZaI;
    let Zae = Zj((&Zdy));
    let ZH = Zdw;
    Zdx = (Zae * ZH);
    let ZaJ = Zdt;
    ZdA = ZaJ;
    let ZaK = (*mat).roughness;
    ZdB = ZaK;
    let ZaL = Zi((&ZdA), (&ZdB));
    Zdz = ZaL;
    let ZJ = Zdu;
    ZdD = ZJ;
    let Zaf = Zdv;
    ZdE = Zaf;
    let ZaM = (*mat).roughness;
    ZdF = ZaM;
    let Zag = Zh((&ZdD), (&ZdE), (&ZdF));
    ZdC = Zag;
    let ZK = Zds;
    ZdH = ZK;
    let ZaN = Zf((&ZdH));
    ZdG = ZaN;
    let ZL = Zdz;
    let ZaO = ZdC;
    let ZM = ZdG;
    let Zai = Zdv;
    let ZN = Zdu;
    let ZaP = (*mat).specularColor;
    let Zal = Zdw;
    ZdI = ((ZaP * (((ZL * ZaO) * ZM) / (((4f * Zai) * ZN) + 0.0001f))) * Zal);
    ZdJ = vec3<f32>(0f, 0f, 0f);
    let Zam = Zdx;
    let ZaQ = ZdG;
    let Zao = ZdI;
    let ZaR = ZdJ;
    ZdJ = (ZaR + ((Zam * (1f - ZaQ)) + Zao));
    let Zaq = ZdJ;
    return Zaq;
}

fn Zl(rgba: ptr<function, vec4<f32>>) -> f32 {
    let ZaC = (*rgba);
    return dot(ZaC, vec4<f32>(1f, 0.003921569f, 0.0000153787f, 0.00000006030863f));
}

fn Zm(lightDepth: ptr<function, f32>, shadowMap_tex: texture_2d<f32>, shadowMap_smp: sampler, shadowCoord: ptr<function, vec2<f32>>, depthOffset: ptr<function, f32>) -> f32 {
    var ZdK: f32;
    var ZdL: vec4<f32>;
    var ZdM: bool;
    var ZdN: bool;
    var ZdO: bool;

    let ZaA = (*shadowCoord);
    let Zs = textureSample(shadowMap_tex, shadowMap_smp, ZaA);
    ZdL = Zs;
    let Zay = Zl((&ZdL));
    ZdK = Zay;
    let Zt = (*shadowCoord)[0u];
    let Zaz = (Zt >= 0f);
    ZdM = Zaz;
    if Zaz {
        let ZV = (*shadowCoord)[0u];
        ZdM = (ZV <= 1f);
    }
    let ZW = ZdM;
    ZdN = ZW;
    if ZW {
        let ZaS = (*shadowCoord)[1u];
        ZdN = (ZaS >= 0f);
    }
    let Zat = ZdN;
    ZdO = Zat;
    if Zat {
        let ZR = (*shadowCoord)[1u];
        ZdO = (ZR <= 1f);
    }
    let ZaD = ZdO;
    if ZaD {
        let Zav = (*lightDepth);
        let Zy = ZdK;
        let ZX = (*depthOffset);
        return step(Zav, (Zy + ZX));
    }
    return 1f;
}

fn Zn(pos: ptr<function, vec3<f32>>, camera: ptr<function, LightCamera>, shadowCoord_1: ptr<function, vec2<f32>>, lightDepth_1: ptr<function, f32>) {
    var ZdP: vec4<f32>;
    var ZdQ: vec4<f32>;
    var ZdR: f32;
    var ZdS: f32;

    let Zay = (*camera).uViewMatrix;
    let ZaB = (*pos);
    ZdP = (Zay * vec4<f32>(ZaB.x, ZaB.y, ZaB.z, 1f));
    let ZW = (*camera).uProjectionMatrix;
    let Zv = ZdP;
    ZdQ = (ZW * Zv);
    let ZQ = ZdQ;
    let Zau = ZdQ[3u];
    (*shadowCoord_1) = (((ZQ.xy / vec2(Zau)) * 0.5f) + vec2(0.5f));
    let ZX = (*camera).near;
    ZdR = ZX;
    let Zz = (*camera).far;
    ZdS = Zz;
    let ZY = ZdP[2u];
    let ZU = ZdR;
    let ZB = ZdS;
    let ZaT = ZdR;
    (*lightDepth_1) = ((-(ZY) - ZU) / (ZB - ZaT));
    return;
}

fn Zo(pos_1: ptr<function, vec3<f32>>, camera_1: ptr<function, LightCamera>, shadowMap_tex_1: texture_2d<f32>, shadowMap_smp_1: sampler, depthOffset_1: ptr<function, f32>) -> f32 {
    var ZdT: vec2<f32>;
    var ZdU: f32;
    var ZdV: vec3<f32>;
    var ZdW: LightCamera;
    var ZdX: vec2<f32>;
    var ZdY: f32;
    var ZdZ: f32;
    var Zea: f32;
    var Zeb: vec2<f32>;
    var Zec: f32;
    var Zed: i32;
    var Zee: vec2<f32>;
    var Zef: f32;
    var Zeg: vec2<f32>;
    var Zeh: f32;
    var Zei: f32;
    var Zej: vec2<f32>;
    var Zek: f32;
    var Zel: f32;
    var Zem: vec2<f32>;
    var Zen: f32;
    var Zeo: f32;
    var Zep: vec2<f32>;
    var Zeq: f32;
    var Zer: f32;
    var Zes: vec2<f32>;
    var Zet: f32;
    var Zeu: f32;
    var Zev: vec2<f32>;
    var Zew: f32;
    var Zex: f32;
    var Zey: vec2<f32>;
    var Zez: f32;
    var ZeA: f32;
    var ZeB: vec2<f32>;
    var ZeC: f32;

    let ZaE = (*pos_1);
    ZdV = ZaE;
    let ZC = (*camera_1);
    ZdW = ZC;
    let ZaF = ZdT;
    ZdX = ZaF;
    let ZaU = ZdU;
    ZdY = ZaU;
    Zn((&ZdV), (&ZdW), (&ZdX), (&ZdY));
    let ZD = ZdX;
    ZdT = ZD;
    let Zab = ZdY;
    ZdU = Zab;
    let ZaG = ZdU;
    Zea = ZaG;
    let ZE = ZdT;
    Zeb = ZE;
    let Zac = (*depthOffset_1);
    Zec = Zac;
    let ZaV = Zm((&Zea), shadowMap_tex_1, shadowMap_smp_1, (&Zeb), (&Zec));
    ZdZ = ZaV;
    Zed = 0i;
    loop {
        let ZF = Zed;
        if (ZF < 2i) {
            let ZaW = (*camera_1).resolution;
            let Zae = Zed;
            Zee = ((vec2(1f) / ZaW) * (f32((Zae + 1i)) / 2f));
            let ZaK = ZdT;
            let ZJ = Zee[0u];
            let ZaM = Zee[1u];
            let ZL = ZdU;
            Zef = ZL;
            Zeg = (ZaK + vec2<f32>(-(ZJ), -(ZaM)));
            let ZaO = (*depthOffset_1);
            Zeh = ZaO;
            let Zah = Zm((&Zef), shadowMap_tex_1, shadowMap_smp_1, (&Zeg), (&Zeh));
            let ZM = ZdZ;
            ZdZ = (ZM + Zah);
            let Zai = ZdT;
            let ZN = Zee[1u];
            let Zak = ZdU;
            Zei = Zak;
            Zej = (Zai + vec2<f32>(0f, -(ZN)));
            let ZaP = (*depthOffset_1);
            Zek = ZaP;
            let ZaX = Zm((&Zei), shadowMap_tex_1, shadowMap_smp_1, (&Zej), (&Zek));
            let Zal = ZdZ;
            ZdZ = (Zal + ZaX);
            let Zam = ZdT;
            let ZaY = Zee[0u];
            let Zao = Zee[1u];
            let Zaq = ZdU;
            Zel = Zaq;
            Zem = (Zam + vec2<f32>(ZaY, -(Zao)));
            let ZaZ = (*depthOffset_1);
            Zen = ZaZ;
            let Zba = Zm((&Zel), shadowMap_tex_1, shadowMap_smp_1, (&Zem), (&Zen));
            let Zbb = ZdZ;
            ZdZ = (Zbb + Zba);
            let Zbc = ZdT;
            let Zbd = Zee[0u];
            let Zbe = ZdU;
            Zeo = Zbe;
            Zep = (Zbc + vec2<f32>(-(Zbd), 0f));
            let Zbf = (*depthOffset_1);
            Zeq = Zbf;
            let Zbg = Zm((&Zeo), shadowMap_tex_1, shadowMap_smp_1, (&Zep), (&Zeq));
            let Zbh = ZdZ;
            ZdZ = (Zbh + Zbg);
            let Zbi = ZdT;
            let Zbj = Zee[0u];
            let Zbk = ZdU;
            Zer = Zbk;
            Zes = (Zbi + vec2<f32>(Zbj, 0f));
            let Zbl = (*depthOffset_1);
            Zet = Zbl;
            let Zbm = Zm((&Zer), shadowMap_tex_1, shadowMap_smp_1, (&Zes), (&Zet));
            let Zbn = ZdZ;
            ZdZ = (Zbn + Zbm);
            let Zbo = ZdT;
            let Zbp = Zee[0u];
            let Zbq = Zee[1u];
            let Zbr = ZdU;
            Zeu = Zbr;
            Zev = (Zbo + vec2<f32>(-(Zbp), Zbq));
            let Zbs = (*depthOffset_1);
            Zew = Zbs;
            let Zbt = Zm((&Zeu), shadowMap_tex_1, shadowMap_smp_1, (&Zev), (&Zew));
            let Zbu = ZdZ;
            ZdZ = (Zbu + Zbt);
            let Zbv = ZdT;
            let Zbw = Zee[1u];
            let Zbx = ZdU;
            Zex = Zbx;
            Zey = (Zbv + vec2<f32>(0f, Zbw));
            let Zby = (*depthOffset_1);
            Zez = Zby;
            let Zbz = Zm((&Zex), shadowMap_tex_1, shadowMap_smp_1, (&Zey), (&Zez));
            let ZbA = ZdZ;
            ZdZ = (ZbA + Zbz);
            let ZbB = ZdT;
            let ZbC = Zee[0u];
            let ZbD = Zee[1u];
            let ZbE = ZdU;
            ZeA = ZbE;
            ZeB = (ZbB + vec2<f32>(ZbC, ZbD));
            let ZbF = (*depthOffset_1);
            ZeC = ZbF;
            let ZbG = Zm((&ZeA), shadowMap_tex_1, shadowMap_smp_1, (&ZeB), (&ZeC));
            let ZbH = ZdZ;
            ZdZ = (ZbH + ZbG);
            continue;
        } else {
            break;
        }
        continuing {
            let ZbI = Zed;
            Zed = (ZbI + 1i);
        }
    }
    let ZbJ = ZdZ;
    return (ZbJ / 16f);
}

fn Zp() {
    var ZeD: f32;
    var ZeE: vec4<f32>;
    var ZeF: vec4<f32>;
    var ZeG: vec4<f32>;
    var ZeH: vec4<f32>;
    var ZeI: vec4<f32>;
    var ZeJ: vec3<f32>;
    var ZeK: vec3<f32>;
    var ZeL: f32;
    var ZeM: f32;
    var ZeN: vec3<f32>;
    var ZeO: f32;
    var ZeP: Geometry;
    var ZeQ: Material;
    var ZeR: vec3<f32>;
    var ZeS: DirectionalLight;
    var ZeT: Light;
    var ZeU: f32;
    var ZeV: vec3<f32>;
    var ZeW: LightCamera;
    var ZeX: f32;
    var ZeY: Geometry;
    var ZeZ: Material;
    var Zfa: Light;
    var Zfb: vec3<f32>;
    var Zfc: f32;
    var Zfd: f32;
    var Zfe: f32;
    var Zff: vec3<f32>;
    var Zfg: f32;
    var Zfh: vec3<f32>;
    var Zfi: f32;

    let Zz = Zcr;
    let ZT = textureSample(Zcp, Zcq, Zz);
    ZeD = ZT.x;
    let ZA = Zcr;
    let ZU = textureSample(Zcs, Zct, ZA);
    ZeE = ZU;
    let ZZ = Zcr;
    let ZB = textureSample(Zcu, Zcv, ZZ);
    ZeF = ZB;
    let ZaT = Zcr;
    let Zaa = textureSample(Zcw, Zcx, ZaT);
    ZeG = Zaa;
    let ZaE = Zcr;
    let ZC = textureSample(Zcy, Zcz, ZaE);
    ZeH = ZC;
    let ZaF = Zcr;
    let ZaU = textureSample(ZcA, ZcB, ZaF);
    ZeI = ZaU;
    let ZD = ZeF;
    ZeJ = ZD.xyz;
    let ZaG = ZeG;
    ZeK = ZaG.xyz;
    let ZaV = ZeH[0u];
    ZeL = ZaV;
    let ZaH = ZeH[1u];
    ZeM = ZaH;
    let ZaW = ZeE[3u];
    let ZaI = ZeF[3u];
    let ZH = ZeI[3u];
    ZeN = vec3<f32>(ZaW, ZaI, ZH);
    let ZI = ZeH[3u];
    ZeO = ZI;
    let ZaK = ZeE;
    let ZJ = ZeJ;
    let ZbK = ZcC.uCameraPosition;
    let ZaM = ZeE;
    let ZL = ZeD;
    ZeP = Geometry(ZaK.xyz, ZJ, 0f, normalize((ZbK - ZaM.xyz)), vec3<f32>(0f, 0f, 0f), ZL);
    let Zah = ZeK;
    let ZM = ZeL;
    let ZbL = ZeM;
    let Zai = ZeN;
    let ZbM = ZeK;
    let ZN = ZeM;
    let ZbN = ZeK;
    let Zak = ZeM;
    let Zal = ZeO;
    ZeQ = Material(Zah, ZM, ZbL, Zai, mix(ZbM, vec3<f32>(0f, 0f, 0f), vec3(ZN)), mix(vec3<f32>(1f, 1f, 1f), ZbN, vec3(Zak)), Zal);
    ZeR = vec3<f32>(0f, 0f, 0f);
    let ZaY = ZcC.directionalLight[0i];
    ZeS.direction = ZaY.direction;
    ZeS.ZeK = ZaY.ZeK;
    let Zaq = ZeS.direction;
    ZeT.direction = Zaq;
    let Zbb = ZeS.ZeK;
    ZeT.ZeK = Zbb;
    let Zbc = ZeE;
    ZeV = Zbc.xyz;
    let ZbO = ZcC.uDirectionalLightCamera[0i];
    ZeW.near = ZbO.near;
    ZeW.far = ZbO.far;
    ZeW.uViewMatrix = ZbO.uViewMatrix;
    ZeW.uProjectionMatrix = ZbO.uProjectionMatrix;
    ZeW.resolution = ZbO.resolution;
    ZeX = 0.0001f;
    let ZbP = Zo((&ZeV), (&ZeW), ZcD, ZcE, (&ZeX));
    ZeU = ZbP;
    let Zbk = ZeP;
    ZeY = Zbk;
    let Zbl = ZeQ;
    ZeZ = Zbl;
    let Zbm = ZeT;
    Zfa = Zbm;
    let Zbn = Zk((&ZeY), (&ZeZ), (&Zfa));
    let ZbQ = ZeU;
    let ZbR = ZeR;
    ZeR = (ZbR + (Zbn * ZbQ));
    let ZbS = ZeP.viewDir;
    let ZbT = ZeP.ZeJ;
    Zfb = reflect(-(ZbS), ZbT);
    let Zbt = ZeP.ZeJ;
    let ZbU = ZeP.viewDir;
    Zfc = clamp(dot(Zbt, ZbU), 0f, 1f);
    let Zbw = Zfc;
    Zfe = Zbw;
    let ZbV = Zf((&Zfe));
    let Zbx = ZeQ.ZeM;
    Zfd = mix(ZbV, 1f, Zbx);
    let ZbA = ZeP.ZeJ;
    Zff = ZbA;
    Zfg = 1f;
    let ZbW = Ze(ZcF, ZcG, (&Zff), (&Zfg));
    let ZbX = ZeQ.diffuseColor;
    let ZbD = ZeQ.ZeO;
    let ZbY = ZeR;
    ZeR = (ZbY + ((ZbW * ZbX) * ZbD));
    let ZbF = ZeR;
    let ZbG = Zfb;
    Zfh = ZbG;
    let ZbZ = ZeQ.roughness;
    Zfi = ZbZ;
    let ZbI = Ze(ZcF, ZcG, (&Zfh), (&Zfi));
    let Zca = Zfd;
    let Zcb = ZeQ.specularColor;
    let Zcc = ZeQ.ZeO;
    ZeR = mix(ZbF, ZbI, ((Zcb * Zca) * Zcc));
    let Zcd = ZeP.occulusion;
    let Zce = ZeR;
    ZeR = (Zce * max(0f, (1f - (Zcd * 1.5f))));
    let Zcf = ZeQ.ZeN;
    let Zcg = ZeR;
    ZeR = (Zcg + Zcf);
    let Zch = Zcr;
    let Zci = textureSample(ZcH, ZcI, Zch);
    let Zcj = ZeR;
    ZeR = (Zcj + Zci.xyz);
    let Zck = ZeR;
    let Zcl = max(vec3<f32>(0f, 0f, 0f), Zck);
    let Zcm = vec4<f32>(Zcl.x, Zcl.y, Zcl.z, 1f);
    ZcK = Zcm;
    ZcJ = Zcm;
    return;
}

@fragment 
fn main(@location(0) vUv: vec2<f32>) -> FragmentOutput {
    Zcr = vUv;
    Zp();
    let Zcn = ZcJ;
    let Zco = ZcK;
    return FragmentOutput(Zcn, Zco);
}
