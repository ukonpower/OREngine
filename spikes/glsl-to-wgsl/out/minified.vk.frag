#version 460

struct as { vec3 position; vec3 e; float o; vec3 t; vec3 i; float a; }; struct ad { vec3 color; float r; float c; vec3 v; vec3 u; vec3 n; float l; };

struct aP { vec3 direction; vec3 color; }; struct ak { vec3 position; vec3 direction; vec3 color; float angle; float blend; float distance; float decay; }; struct aM { float near; float far; mat4 uViewMatrix; mat4 uProjectionMatrix; vec2 resolution; }; struct af { vec3 direction; vec3 color; };

layout(set = 0, binding = 0) uniform Params {
	aP directionalLight[1];
	aM uDirectionalLightCamera[1];
	vec3 uColor;
	mat4 uViewMatrix;
	mat4 uCameraMatrix;
	vec3 uCameraPosition;
};



layout(set = 0, binding = 1) uniform texture2D directionalLightShadowMap_0_tex;
layout(set = 0, binding = 2) uniform sampler directionalLightShadowMap_0_smp;

float au(float v, texture2D u_tex, sampler u_smp, vec2 x, float I) { return x.x >= 0. && x.x <= 1. && x.y >= 0. && x.y <= 1. ? step(v, dot(texture( sampler2D( u_tex, u_smp ), x ), vec4(1, 1. / 255., 1. / 65025., 1. / 16581375.)) + I) : 1.; } void ah(vec3 v, aM u, inout vec2 x, inout float I) { vec4 e = u.uViewMatrix * vec4(v, 1), t = u.uProjectionMatrix * e; x = t.xy / t.w * .5 + .5; float T = u.near; I = (- e.z - T) / (u.far - T); }

float av(vec3 v, aM u, texture2D x_tex, sampler x_smp, float e) { vec2 I; float F; ah(v, u, I, F); float t = au( F, x_tex, x_smp, I, e ); for (int v = 0; v < 2; v ++) { vec2 T = 1. / u.resolution * (float(v + 1) / float(2)); t = t + au( F, x_tex, x_smp, I + vec2(- T.x, - T.y), e ) + au( F, x_tex, x_smp, I + vec2(0, - T.y), e ) + au( F, x_tex, x_smp, I + vec2(T.x, - T.y), e ) + au( F, x_tex, x_smp, I + vec2(- T.x, 0), e ) + au( F, x_tex, x_smp, I + vec2(T.x, 0), e ) + au( F, x_tex, x_smp, I + vec2(- T.x, T.y), e ) + au( F, x_tex, x_smp, I + vec2(0, T.y), e ) + au( F, x_tex, x_smp, I + vec2(T), e ); } return t / (float(2) * 8.); } float aw(float v, float u) { u *= u; u *= u; v *= v; return v <= 0. ? 0. : u / (3.14159265359 * pow(v * (u - 1.) + 1., 2.)); } float az(float v, float u) { return v == 0. ? 0. : v / (v * (1. - u) + u); } float aS(float v, float u, float x) { x = clamp(x * sqrt(2. / 3.14159265359), 0., 1.); return az(v, x) * az(u, x); } float aT(float v) { return .04 + .96 * pow(1. - v, 5.); } vec3 aA(as v, ad u, af x) { vec3 e = normalize(x.direction), t = normalize(v.t + e); float I = clamp(dot(v.e, v.t), 0., 1.), F = clamp(dot(v.e, e), 0., 1.); vec3 T = x.color * F, E = u.u / 3.14159265359 * T; float c = aw(clamp(dot(v.e, t), 0., 1.), u.r), n = aS(I, F, u.r), d = aT(clamp(dot(e, t), 0., 1.)); return vec3(0) + E * (1. - d) + c * n * d / (4. * F * I + 1e-4) * u.n * T; } float aB(vec3 direction) { vec3 v = abs(direction); return v.x > v.z ? v.x > v.y ? direction.x > 0. ? 0. : 3. : direction.y > 0. ? 1. : 4. : v.z > v.y ? direction.z > 0. ? 2. : 5. : direction.y > 0. ? 1. : 4.; }

layout(set = 0, binding = 3) uniform texture2D sampler0_tex;
layout(set = 0, binding = 4) uniform sampler sampler0_smp;


layout(set = 0, binding = 5) uniform texture2D sampler1_tex;
layout(set = 0, binding = 6) uniform sampler sampler1_smp;


layout(set = 0, binding = 7) uniform texture2D sampler2_tex;
layout(set = 0, binding = 8) uniform sampler sampler2_smp;


layout(set = 0, binding = 9) uniform texture2D sampler3_tex;
layout(set = 0, binding = 10) uniform sampler sampler3_smp;


layout(set = 0, binding = 11) uniform texture2D sampler4_tex;
layout(set = 0, binding = 12) uniform sampler sampler4_smp;


layout(set = 0, binding = 13) uniform texture2D uSSAOTexture_tex;
layout(set = 0, binding = 14) uniform sampler uSSAOTexture_smp;


layout(set = 0, binding = 15) uniform texture2D uLightShaftTexture_tex;
layout(set = 0, binding = 16) uniform sampler uLightShaftTexture_smp;


layout(set = 0, binding = 17) uniform texture2D uEnvMap_tex;
layout(set = 0, binding = 18) uniform sampler uEnvMap_smp;

layout(location = 0) in vec2 vUv;

 layout(location = 0) out vec4 glFragOut0; layout(location = 1) out vec4 glFragOut1; vec3 aC(vec3 direction, float v) { float u = aB(direction); vec2 x = .5 * ( (u == 0. ? vec2(direction.zy) / abs(direction.x) : u == 1. ? vec2(- direction.x, - direction.z) / abs(direction.y) : u == 2. ? vec2(- direction.x, direction.y) / abs(direction.z) : u == 3. ? vec2(- direction.z, direction.y) / abs(direction.x) : u == 4. ? vec2(- direction.x, direction.z) / abs(direction.y) : vec2(direction) / abs(direction.z)) + 1.), e = vec2(textureSize( sampler2D( uEnvMap_tex, uEnvMap_smp ), 0 )) * pow(.5, floor(v)); x = (x * (e - 4.) + 2.) / e; x.x += mod(u, 3.); x.y += floor(u / 3.); x.y *= .5; x.y *= .5; x.x /= 3.; u = 1. - pow(2., - floor(v)); x.y *= 1. - u; x.x *= 1. - u; x.y += u; vec4 I = textureGrad( sampler2D( uEnvMap_tex, uEnvMap_smp ), x, vec2(0), vec2(0) ); return I.xyz / I.w; } vec3 bd(vec3 direction, float v) { v *= 5.0 - 1.; float u = fract(v); v = floor(v); vec3 e = aC(direction, v); if (u == 0.) return e; { vec3 x = aC(direction, v + 1.); return mix(e, x, u); } } void main() { vec4 v = texture( sampler2D( sampler0_tex, sampler0_smp ), vUv ), u = texture( sampler2D( sampler1_tex, sampler1_smp ), vUv ), e = texture( sampler2D( sampler3_tex, sampler3_smp ), vUv ); vec3 color = texture( sampler2D( sampler2_tex, sampler2_smp ), vUv ).xyz; float x = e.y; as I = as(v.xyz, u.xyz, 0., normalize(uCameraPosition - v.xyz), vec3(0), texture( sampler2D( uSSAOTexture_tex, uSSAOTexture_smp ), vUv ).x); ad T = ad(color, e.x, x, vec3(v.w, u.w, texture( sampler2D( sampler4_tex, sampler4_smp ), vUv ).w), mix(color, vec3(0), x), mix(vec3(1), color, x), e.w); vec3 F = vec3(0); float t; af H;

aP c;

c = directionalLight[0]; H.direction = c.direction; H.color = c.color;

t = av( v.xyz, uDirectionalLightCamera[0], directionalLightShadowMap_0_tex, directionalLightShadowMap_0_smp, 1e-4 );



F.xyz += aA(I, T, H) * t;









F.xyz += bd(I.e, 1.) * T.u * T.l; F.xyz = mix(F.xyz, bd(reflect(- I.t, I.e), T.r), mix(aT(clamp(dot(I.e, I.t), 0., 1.)), 1., T.c) * T.n * T.l); F.xyz *= max(0., 1. - I.a * 1.5); F.xyz += T.v; F.xyz += texture( sampler2D( uLightShaftTexture_tex, uLightShaftTexture_smp ), vUv ).xyz; glFragOut0 = glFragOut1 = vec4(max(vec3(0), F.xyz), 1); }

