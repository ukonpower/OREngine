struct as_ {
    position: vec3<f32>,
    ZcW: vec3<f32>,
    o: f32,
    ZcX: vec3<f32>,
    i: vec3<f32>,
    a: f32,
}

struct ad {
    Zef: vec3<f32>,
    r: f32,
    ZdA: f32,
    v: vec3<f32>,
    u: vec3<f32>,
    ZdB: vec3<f32>,
    l: f32,
}

struct aP {
    direction: vec3<f32>,
    Zef: vec3<f32>,
}

struct ak {
    position: vec3<f32>,
    direction: vec3<f32>,
    Zef: vec3<f32>,
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
    Zef: vec3<f32>,
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
    @location(0) ZcO: vec4<f32>,
    @location(1) ZcP: vec4<f32>,
}

@group(0) @binding(0) 
var<uniform> Zcu: Params;
@group(0) @binding(1) 
var Zcv: texture_2d<f32>;
@group(0) @binding(2) 
var Zcw: sampler;
@group(0) @binding(3) 
var Zcx: texture_2d<f32>;
@group(0) @binding(4) 
var Zcy: sampler;
@group(0) @binding(5) 
var Zcz: texture_2d<f32>;
@group(0) @binding(6) 
var ZcA: sampler;
@group(0) @binding(7) 
var ZcB: texture_2d<f32>;
@group(0) @binding(8) 
var ZcC: sampler;
@group(0) @binding(9) 
var ZcD: texture_2d<f32>;
@group(0) @binding(10) 
var ZcE: sampler;
@group(0) @binding(11) 
var ZcF: texture_2d<f32>;
@group(0) @binding(12) 
var ZcG: sampler;
@group(0) @binding(13) 
var ZcH: texture_2d<f32>;
@group(0) @binding(14) 
var ZcI: sampler;
@group(0) @binding(15) 
var ZcJ: texture_2d<f32>;
@group(0) @binding(16) 
var ZcK: sampler;
@group(0) @binding(17) 
var ZcL: texture_2d<f32>;
@group(0) @binding(18) 
var ZcM: sampler;
var<private> ZcN: vec2<f32>;
var<private> ZcO: vec4<f32>;
var<private> ZcP: vec4<f32>;

fn Za(v: f32, u_tex: texture_2d<f32>, u_smp: sampler, x: vec2<f32>, I: f32) -> f32 {
    var ZcQ: f32;
    var ZcR: vec2<f32>;
    var ZcS: f32;
    var ZcT: f32;

    ZcQ = v;
    ZcR = x;
    ZcS = I;
    let Zm = ZcR;
    let Zn = ZcR;
    let Zo = ZcR;
    let Zp = ZcR;
    if ((((Zm.x >= 0f) && (Zn.x <= 1f)) && (Zo.y >= 0f)) && (Zp.y <= 1f)) {
        let Zq = ZcQ;
        let Zr = ZcR;
        let Zs = textureSample(u_tex, u_smp, Zr);
        let Zt = ZcS;
        ZcT = step(Zq, (dot(Zs, vec4<f32>(1f, 0.003921569f, 0.0000153787f, 0.00000006030863f)) + Zt));
    } else {
        ZcT = 1f;
    }
    let Zu = ZcT;
    return Zu;
}

fn Zb(v_2: vec3<f32>, u: aM, x_2: ptr<function, vec2<f32>>, I_2: ptr<function, f32>) {
    var ZcU: vec3<f32>;
    var ZcV: aM;
    var ZcW: vec4<f32>;
    var ZcX: vec4<f32>;
    var ZcY: f32;

    ZcU = v_2;
    ZcV = u;
    let Zv = ZcV;
    let Zm = ZcU;
    ZcW = (Zv.uViewMatrix * vec4<f32>(Zm.x, Zm.y, Zm.z, 1f));
    let Zo = ZcV;
    let Zw = ZcW;
    ZcX = (Zo.uProjectionMatrix * Zw);
    let Zp = ZcX;
    let Zx = ZcX;
    (*x_2) = (((Zp.xy / vec2(Zx.w)) * 0.5f) + vec2(0.5f));
    let Zy = ZcV;
    ZcY = Zy.near;
    let Zz = ZcW;
    let ZA = ZcY;
    let ZB = ZcV;
    let Zt = ZcY;
    (*I_2) = ((-(Zz.z) - ZA) / (ZB.far - Zt));
    return;
}

fn Zc(v_4: vec3<f32>, u_2: aM, x_tex: texture_2d<f32>, x_smp: sampler, e_1: f32) -> f32 {
    var ZcZ: vec3<f32>;
    var Zda: aM;
    var Zdb: f32;
    var Zdc: vec2<f32>;
    var Zdd: f32;
    var Zde: f32;
    var Zdf: i32 = 0i;
    var Zdg: vec2<f32>;

    ZcZ = v_4;
    Zda = u_2;
    Zdb = e_1;
    let ZC = ZcZ;
    let ZD = Zda;
    Zb(ZC, ZD, (&Zdc), (&Zdd));
    let ZE = Zdd;
    let Zo = Zdc;
    let ZF = Zdb;
    let Zw = Za(ZE, x_tex, x_smp, Zo, ZF);
    Zde = Zw;
    loop {
        let ZG = Zdf;
        if !((ZG < 2i)) {
            break;
        }
        {
            let ZH = Zda;
            let ZI = Zdf;
            Zdg = ((vec2(1f) / ZH.resolution) * (f32((ZI + 1i)) / 2f));
            let ZJ = Zde;
            let ZK = Zdd;
            let ZL = Zdc;
            let ZM = Zdg;
            let ZN = Zdg;
            let ZO = Zdb;
            let ZP = Za(ZK, x_tex, x_smp, (ZL + vec2<f32>(-(ZM.x), -(ZN.y))), ZO);
            let ZQ = Zdd;
            let ZR = Zdc;
            let ZS = Zdg;
            let ZT = Zdb;
            let ZU = Za(ZQ, x_tex, x_smp, (ZR + vec2<f32>(0f, -(ZS.y))), ZT);
            let ZV = Zdd;
            let ZW = Zdc;
            let ZX = Zdg;
            let ZY = Zdg;
            let ZZ = Zdb;
            let Zaa = Za(ZV, x_tex, x_smp, (ZW + vec2<f32>(ZX.x, -(ZY.y))), ZZ);
            let Zab = Zdd;
            let Zac = Zdc;
            let Zad = Zdg;
            let Zae = Zdb;
            let Zaf = Za(Zab, x_tex, x_smp, (Zac + vec2<f32>(-(Zad.x), 0f)), Zae);
            let Zag = Zdd;
            let Zah = Zdc;
            let Zai = Zdg;
            let Zaj = Zdb;
            let Zak = Za(Zag, x_tex, x_smp, (Zah + vec2<f32>(Zai.x, 0f)), Zaj);
            let Zal = Zdd;
            let Zam = Zdc;
            let Zan = Zdg;
            let Zao = Zdg;
            let Zap = Zdb;
            let Zaq = Za(Zal, x_tex, x_smp, (Zam + vec2<f32>(-(Zan.x), Zao.y)), Zap);
            let Zar = Zdd;
            let Zas = Zdc;
            let Zat = Zdg;
            let Zau = Zdb;
            let Zav = Za(Zar, x_tex, x_smp, (Zas + vec2<f32>(0f, Zat.y)), Zau);
            let Zaw = Zdd;
            let Zax = Zdc;
            let Zay = Zdg;
            let Zaz = Zdb;
            let ZaA = Za(Zaw, x_tex, x_smp, (Zax + vec2<f32>(Zay)), Zaz);
            Zde = ((((((((ZJ + ZP) + ZU) + Zaa) + Zaf) + Zak) + Zaq) + Zav) + ZaA);
        }
        continuing {
            let Zq = Zdf;
            Zdf = (Zq + 1i);
        }
    }
    let ZaB = Zde;
    return (ZaB / 16f);
}

fn Zd(v_7: f32, u_4: f32) -> f32 {
    var Zdh: f32;
    var Zdi: f32;
    var Zdj: f32;

    Zdh = v_7;
    Zdi = u_4;
    let ZaC = Zdi;
    let ZaD = Zdi;
    Zdi = (ZaC * ZaD);
    let ZaE = Zdi;
    let Zm = Zdi;
    Zdi = (ZaE * Zm);
    let ZC = Zdh;
    let ZD = Zdh;
    Zdh = (ZC * ZD);
    let ZaF = Zdh;
    if (ZaF <= 0f) {
        Zdj = 0f;
    } else {
        let Zo = Zdi;
        let Zw = Zdh;
        let ZaG = Zdi;
        Zdj = (Zo / (3.1415927f * pow(((Zw * (ZaG - 1f)) + 1f), 2f)));
    }
    let ZH = Zdj;
    return ZH;
}

fn Ze(v_9: f32, u_6: f32) -> f32 {
    var Zdk: f32;
    var Zdl: f32;
    var Zdm: f32;

    Zdk = v_9;
    Zdl = u_6;
    let ZaC = Zdk;
    if (ZaC == 0f) {
        Zdm = 0f;
    } else {
        let Zm = Zdk;
        let ZaH = Zdk;
        let ZD = Zdl;
        let ZaI = Zdl;
        Zdm = (Zm / ((ZaH * (1f - ZD)) + ZaI));
    }
    let ZF = Zdm;
    return ZF;
}

fn Zf(v_11: f32, u_8: f32, x_3: f32) -> f32 {
    var Zdn: f32;
    var Zdo: f32;
    var Zdp: f32;

    Zdn = v_11;
    Zdo = u_8;
    Zdp = x_3;
    let Zv = Zdp;
    Zdp = clamp((Zv * 0.7978845f), 0f, 1f);
    let ZaJ = Zdn;
    let ZE = Zdp;
    let Zo = Ze(ZaJ, ZE);
    let ZF = Zdo;
    let Zw = Zdp;
    let ZaG = Ze(ZF, Zw);
    return (Zo * ZaG);
}

fn Zg(v_13: f32) -> f32 {
    var Zdq: f32;

    Zdq = v_13;
    let ZaD = Zdq;
    return (0.04f + (0.96f * pow((1f - ZaD), 5f)));
}

fn Zh(v_15: as_, u_10: ad, x_5: af) -> vec3<f32> {
    var Zdr: as_;
    var Zds: ad;
    var Zdt: af;
    var Zdu: vec3<f32>;
    var Zdv: vec3<f32>;
    var Zdw: f32;
    var Zdx: f32;
    var Zdy: vec3<f32>;
    var Zdz: vec3<f32>;
    var ZdA: f32;
    var ZdB: f32;
    var ZdC: f32;

    Zdr = v_15;
    Zds = u_10;
    Zdt = x_5;
    let Zv = Zdt;
    Zdu = normalize(Zv.direction);
    let ZC = Zdr;
    let Zn = Zdu;
    Zdv = normalize((ZC.ZcX + Zn));
    let ZE = Zdr;
    let ZF = Zdr;
    Zdw = clamp(dot(ZE.ZcW, ZF.ZcX), 0f, 1f);
    let ZaK = Zdr;
    let Zq = Zdu;
    Zdx = clamp(dot(ZaK.ZcW, Zq), 0f, 1f);
    let Zy = Zdt;
    let ZI = Zdx;
    Zdy = (Zy.Zef * ZI);
    let ZaL = Zds;
    let Zt = Zdy;
    Zdz = ((ZaL.u / vec3(3.1415927f)) * Zt);
    let ZL = Zdr;
    let Zu = Zdv;
    let ZaM = Zds;
    let ZO = Zd(clamp(dot(ZL.ZcW, Zu), 0f, 1f), ZaM.r);
    ZdA = ZO;
    let ZaN = Zdw;
    let ZQ = Zdx;
    let ZR = Zds;
    let ZS = Zf(ZaN, ZQ, ZR.r);
    ZdB = ZS;
    let ZaO = Zdu;
    let ZaP = Zdv;
    let ZaQ = Zg(clamp(dot(ZaO, ZaP), 0f, 1f));
    ZdC = ZaQ;
    let ZY = Zdz;
    let ZaR = ZdC;
    let Zaa = ZdA;
    let ZaS = ZdB;
    let Zac = ZdC;
    let ZaT = Zdx;
    let ZaU = Zdw;
    let ZaV = Zds;
    let Zai = Zdy;
    return ((vec3(0f) + (ZY * (1f - ZaR))) + (((((Zaa * ZaS) * Zac) / (((4f * ZaT) * ZaU) + 0.0001f)) * ZaV.ZdB) * Zai));
}

fn Zi(direction: vec3<f32>) -> f32 {
    var ZdD: vec3<f32>;
    var ZdE: vec3<f32>;
    var ZdF: f32;
    var ZdG: f32;
    var ZdH: f32;
    var ZdI: f32;
    var ZdJ: f32;
    var ZdK: f32;
    var ZdL: f32;

    ZdD = direction;
    let ZaW = ZdD;
    ZdE = abs(ZaW);
    let ZaD = ZdE;
    let ZaE = ZdE;
    if (ZaD.x > ZaE.z) {
        let ZC = ZdE;
        let Zn = ZdE;
        if (ZC.x > Zn.y) {
            let ZaJ = ZdD;
            if (ZaJ.x > 0f) {
                ZdF = 0f;
            } else {
                ZdF = 3f;
            }
            let Zp = ZdF;
            ZdH = Zp;
        } else {
            let ZG = ZdD;
            if (ZG.y > 0f) {
                ZdG = 1f;
            } else {
                ZdG = 4f;
            }
            let ZaX = ZdG;
            ZdH = ZaX;
        }
        let ZaY = ZdH;
        ZdL = ZaY;
    } else {
        let Zy = ZdE;
        let ZI = ZdE;
        if (Zy.z > ZI.y) {
            let ZaL = ZdD;
            if (ZaL.z > 0f) {
                ZdI = 2f;
            } else {
                ZdI = 5f;
            }
            let ZK = ZdI;
            ZdK = ZK;
        } else {
            let ZL = ZdD;
            if (ZL.y > 0f) {
                ZdJ = 1f;
            } else {
                ZdJ = 4f;
            }
            let ZaM = ZdJ;
            ZdK = ZaM;
        }
        let ZO = ZdK;
        ZdL = ZO;
    }
    let ZaN = ZdL;
    return ZaN;
}

fn Zj(direction_2: vec3<f32>, v_18: f32) -> vec3<f32> {
    var ZdM: vec3<f32>;
    var ZdN: f32;
    var ZdO: f32;
    var ZdP: vec2<f32>;
    var ZdQ: vec2<f32>;
    var ZdR: vec2<f32>;
    var ZdS: vec2<f32>;
    var ZdT: vec2<f32>;
    var ZdU: vec2<f32>;
    var ZdV: vec2<f32>;
    var ZdW: vec4<f32>;

    ZdM = direction_2;
    ZdN = v_18;
    let ZG = ZdM;
    let Zx = Zi(ZG);
    ZdO = Zx;
    let Zq = ZdO;
    if (Zq == 0f) {
        let ZaX = ZdM;
        let Zy = ZdM;
        ZdT = (vec2<f32>(ZaX.zy) / vec2(abs(Zy.x)));
    } else {
        let ZaL = ZdO;
        if (ZaL == 1f) {
            let ZB = ZdM;
            let ZJ = ZdM;
            let Zu = ZdM;
            ZdS = (vec2<f32>(-(ZB.x), -(ZJ.z)) / vec2(abs(Zu.y)));
        } else {
            let ZaM = ZdO;
            if (ZaM == 2f) {
                let ZP = ZdM;
                let ZR = ZdM;
                let ZaZ = ZdM;
                ZdR = (vec2<f32>(-(ZP.x), ZR.y) / vec2(abs(ZaZ.z)));
            } else {
                let ZT = ZdO;
                if (ZT == 3f) {
                    let ZV = ZdM;
                    let Zba = ZdM;
                    let ZaR = ZdM;
                    ZdQ = (vec2<f32>(-(ZV.z), Zba.y) / vec2(abs(ZaR.x)));
                } else {
                    let ZaS = ZdO;
                    if (ZaS == 4f) {
                        let Zad = ZdM;
                        let Zbb = ZdM;
                        let Zbc = ZdM;
                        ZdP = (vec2<f32>(-(Zad.x), Zbb.z) / vec2(abs(Zbc.y)));
                    } else {
                        let Zah = ZdM;
                        let Zbd = ZdM;
                        ZdP = (vec2<f32>(Zah.xy) / vec2(abs(Zbd.z)));
                    }
                    let Zbe = ZdP;
                    ZdQ = Zbe;
                }
                let Zam = ZdQ;
                ZdR = Zam;
            }
            let Zbf = ZdR;
            ZdS = Zbf;
        }
        let Zao = ZdS;
        ZdT = Zao;
    }
    let Zbg = ZdT;
    ZdU = (0.5f * (Zbg + vec2(1f)));
    let Zbh = textureDimensions(ZcL, 0i);
    let Zbi = ZdN;
    ZdV = (vec2<f32>(vec2<i32>(Zbh)) * pow(0.5f, floor(Zbi)));
    let Zaw = ZdU;
    let Zax = ZdV;
    let Zbj = ZdV;
    ZdU = (((Zaw * (Zax - vec2(4f))) + vec2(2f)) / Zbj);
    let Zbk = ZdU;
    let Zbl = ZdO;
    ZdU.x = (Zbk.x + (Zbl - (floor((Zbl / 3f)) * 3f)));
    let Zbm = ZdU;
    let Zbn = ZdO;
    ZdU.y = (Zbm.y + floor((Zbn / 3f)));
    let Zbo = ZdU;
    ZdU.y = (Zbo.y * 0.5f);
    let Zbp = ZdU;
    ZdU.y = (Zbp.y * 0.5f);
    let Zbq = ZdU;
    ZdU.x = (Zbq.x / 3f);
    let Zbr = ZdN;
    ZdO = (1f - pow(2f, -(floor(Zbr))));
    let Zbs = ZdU;
    let Zbt = ZdO;
    ZdU.y = (Zbs.y * (1f - Zbt));
    let Zbu = ZdU;
    let Zbv = ZdO;
    ZdU.x = (Zbu.x * (1f - Zbv));
    let Zbw = ZdU;
    let Zbx = ZdO;
    ZdU.y = (Zbw.y + Zbx);
    let Zby = ZdU;
    let Zbz = textureSampleGrad(ZcL, ZcM, Zby, vec2(0f), vec2(0f));
    ZdW = Zbz;
    let ZbA = ZdW;
    let ZbB = ZdW;
    return (ZbA.xyz / vec3(ZbB.w));
}

fn Zk(direction_4: vec3<f32>, v_20: f32) -> vec3<f32> {
    var ZdX: vec3<f32>;
    var ZdY: f32;
    var ZdZ: f32;
    var Zea: vec3<f32>;
    var Zeb: vec3<f32>;

    ZdX = direction_4;
    ZdY = v_20;
    let ZG = ZdY;
    ZdY = (ZG * 4f);
    let Zr = ZdY;
    ZdZ = fract(Zr);
    let ZH = ZdY;
    ZdY = floor(ZH);
    let Zy = ZdX;
    let ZbC = ZdY;
    let ZI = Zj(Zy, ZbC);
    Zea = ZI;
    let ZbD = ZdZ;
    if (ZbD == 0f) {
        let ZbE = Zea;
        return ZbE;
    }
    {
        let ZB = ZdX;
        let ZbF = ZdY;
        let ZK = Zj(ZB, (ZbF + 1f));
        Zeb = ZK;
        let ZM = Zea;
        let Zu = Zeb;
        let ZbG = ZdZ;
        return mix(ZM, Zu, vec3(ZbG));
    }
}

fn Zl() {
    var Zec: vec4<f32>;
    var Zed: vec4<f32>;
    var Zee: vec4<f32>;
    var Zef: vec3<f32>;
    var Zeg: f32;
    var Zeh: as_;
    var Zei: ad;
    var Zej: vec3<f32> = vec3(0f);
    var Zek: f32;
    var Zel: af;
    var Zem: aP;

    let Zw = ZcN;
    let ZaG = textureSample(Zcx, Zcy, Zw);
    Zec = ZaG;
    let Zp = ZcN;
    let ZG = textureSample(Zcz, ZcA, Zp);
    Zed = ZG;
    let ZaK = ZcN;
    let ZbH = textureSample(ZcD, ZcE, ZaK);
    Zee = ZbH;
    let Zr = ZcN;
    let Zs = textureSample(ZcB, ZcC, Zr);
    Zef = Zs.xyz;
    let ZaY = Zee;
    Zeg = ZaY.y;
    let ZI = Zec;
    let ZbD = Zed;
    let ZbE = Zcu.uCameraPosition;
    let ZB = Zec;
    let Zu = ZcN;
    let ZbG = textureSample(ZcH, ZcI, Zu);
    Zeh = as_(ZI.xyz, ZbD.xyz, 0f, normalize((ZbE - ZB.xyz)), vec3(0f), ZbG.x);
    let ZaM = Zef;
    let ZbI = Zee;
    let ZP = Zeg;
    let ZaN = Zec;
    let ZR = Zed;
    let ZS = ZcN;
    let ZaZ = textureSample(ZcF, ZcG, ZS);
    let ZbJ = Zef;
    let ZaQ = Zeg;
    let ZbK = Zef;
    let ZaR = Zeg;
    let ZZ = Zee;
    Zei = ad(ZaM, ZbI.x, ZP, vec3<f32>(ZaN.w, ZR.w, ZaZ.w), mix(ZbJ, vec3(0f), vec3(ZaQ)), mix(vec3(1f), ZbK, vec3(ZaR)), ZZ.w);
    let Zaf = Zcu.directionalLight[0];
    Zem = Zaf;
    let Zag = Zem;
    Zel.direction = Zag.direction;
    let ZbL = Zem;
    Zel.Zef = ZbL.Zef;
    let ZbM = Zec;
    let Zak = Zcu.uDirectionalLightCamera[0];
    let Zal = Zc(ZbM.xyz, Zak, Zcv, Zcw, 0.0001f);
    Zek = Zal;
    let Zam = Zej;
    let Zbf = Zej;
    let Zao = Zeh;
    let ZbN = Zei;
    let Zbg = Zel;
    let ZbO = Zh(Zao, ZbN, Zbg);
    let Zap = Zek;
    let ZbP = (Zbf.xyz + (ZbO * Zap));
    Zej.x = ZbP.x;
    Zej.y = ZbP.y;
    Zej.z = ZbP.z;
    let Zbi = Zej;
    let Zau = Zej;
    let ZbQ = Zeh;
    let Zay = Zk(ZbQ.ZcW, 1f);
    let ZbR = Zei;
    let ZaA = Zei;
    let Zbj = (Zau.xyz + ((Zay * ZbR.u) * ZaA.l));
    Zej.x = Zbj.x;
    Zej.y = Zbj.y;
    Zej.z = Zbj.z;
    let ZbS = Zej;
    let ZbT = Zej;
    let ZbU = Zeh;
    let ZbV = Zeh;
    let ZbW = Zei;
    let ZbX = Zk(reflect(-(ZbU.ZcX), ZbV.ZcW), ZbW.r);
    let ZbY = Zeh;
    let ZbZ = Zeh;
    let Zca = Zg(clamp(dot(ZbY.ZcW, ZbZ.ZcX), 0f, 1f));
    let Zcb = Zei;
    let Zcc = Zei;
    let Zcd = Zei;
    let Zce = mix(ZbT.xyz, ZbX, ((mix(Zca, 1f, Zcb.ZdA) * Zcc.ZdB) * Zcd.l));
    Zej.x = Zce.x;
    Zej.y = Zce.y;
    Zej.z = Zce.z;
    let Zbt = Zej;
    let Zcf = Zej;
    let Zcg = Zeh;
    let Zch = (Zcf.xyz * max(0f, (1f - (Zcg.a * 1.5f))));
    Zej.x = Zch.x;
    Zej.y = Zch.y;
    Zej.z = Zch.z;
    let Zci = Zej;
    let Zcj = Zej;
    let Zck = Zei;
    let Zcl = (Zcj.xyz + Zck.v);
    Zej.x = Zcl.x;
    Zej.y = Zcl.y;
    Zej.z = Zcl.z;
    let Zcm = Zej;
    let Zcn = Zej;
    let Zco = ZcN;
    let Zcp = textureSample(ZcJ, ZcK, Zco);
    let Zcq = (Zcn.xyz + Zcp.xyz);
    Zej.x = Zcq.x;
    Zej.y = Zcq.y;
    Zej.z = Zcq.z;
    let Zcr = Zej;
    let Zcs = max(vec3(0f), Zcr.xyz);
    let Zct = vec4<f32>(Zcs.x, Zcs.y, Zcs.z, 1f);
    ZcP = Zct;
    ZcO = Zct;
    return;
}

@fragment 
fn main(@location(0) vUv: vec2<f32>) -> FragmentOutput {
    ZcN = vUv;
    Zl();
    let Zt = ZcO;
    let ZK = ZcP;
    return FragmentOutput(Zt, ZK);
}
