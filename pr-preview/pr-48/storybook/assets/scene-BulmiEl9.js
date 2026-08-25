import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";import{r as n}from"./iframe-BN0LrmQZ.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";import{Ct as i,Dt as a,E as o,H as s,J as c,Jt as ee,K as l,Q as te,R as u,S as ne,St as d,Tt as re,V as f,W as ie,X as p,b as ae,bt as m,c as oe,ct as se,d as ce,et as le,f as ue,ft as de,gt as fe,it as pe,jt as h,kt as me,l as he,mt as g,n as ge,nt as _,o as _e,ot as ve,p as v,t as ye,u as y,ut as be,vt as b,w as xe,z as x}from"./react-BCRBCi8n.js";var S;function C(){return(C=e((()=>{S=(e,t)=>{let n={},r=`/${t}/`;for(let[t,i]of Object.entries(e)){let e=t.slice(t.lastIndexOf(r)+r.length).split(`/`).slice(0,-2),a=Object.entries(i).find(([e,t])=>typeof t==`function`&&/^[A-Z]/.test(e));if(!a)continue;let o=n;for(let t of e)o=o[t]=o[t]||{};o[a[0]]=a[1]}return n}})))()}var w;function T(){return(T=e((()=>{w=(e,t)=>()=>{}})))()}var E;function D(){return(D=e((()=>{E=class{_engine;constructor(e){this._engine=e}load(){return Promise.resolve({scene:this._engine.createEntity({name:`gltf`})})}}})))()}var O;function k(){return(k=e((()=>{O=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}
// 宣言順はvert_h.part.glslのoutと一致させる（WGSL変換時にロケーションが宣言順で振られるため）\r
in vec2 vUv;\r
in vec3 vViewNormal;\r
in vec3 vNormal;\r
in vec3 vMVPosition;\r
in vec3 vMVPPosition;\r
in vec3 vPos;\r
in vec2 vVelocity;\r
\r
uniform mat4 uModelMatrix;\r
uniform mat4 uModelMatrixInverse;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform vec3 uCameraPosition;\r
uniform vec2 uResolution;\r
\r
#ifdef IS_DEPTH\r
	uniform float uCameraNear;\r
	uniform float uCameraFar;\r
#endif\r
\r
#ifdef IS_DEFERRED\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
	layout (location = 3) out vec4 outColor3;\r
	layout (location = 4) out vec4 outColor4;\r
#endif\r
\r
#ifdef IS_FORWARD\r
	uniform sampler2D uDeferredTexture;\r
	uniform vec2 uDeferredResolution;\r
	uniform sampler2D uGbufferNormal;\r
	uniform sampler2D uGbufferAlbedo;\r
	uniform sampler2D uGbufferMaterial;\r
#endif\r
\r
#if defined(IS_FORWARD) || defined(IS_DEPTH)\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
#endif\r
\r
uniform float uTime;\r
uniform float uTimeF;\r
uniform float uTimeE;\r
uniform float uTimeEF;

in vec3 vInstance;

void main( void ) {

	vec4 outColor = vec4(1.0);\r
vec3 outNormal = normalize(vNormal);\r
vec3 outNormalMap = vec3( 0.0 );\r
float outSSN = 0.0;\r
vec3 outEmission = vec3(0.0);\r
float outRoughness = 0.5;\r
float outMetallic = 0.0;\r
vec3 outPos = vPos;\r
float outEnv = 1.0;

	float emit = 10.0 - vInstance.z * 5.0;
	outColor.xyz = vec3( emit );
	outEmission += emit;
	outSSN = 1.0;
	
	#if defined(IS_DEPTH) || defined(IS_DEFERRED)\r
	vec4 mv = uViewMatrix * vec4(outPos, 1.0);\r
#endif\r
\r
#ifdef IS_DEPTH\r
	float depth_z = (-mv.z - uCameraNear) / (uCameraFar - uCameraNear);\r
	outColor0 = vec4(floatToRGBA( depth_z ));\r
#endif\r
\r
#ifdef IS_DEFERRED\r
\r
	#ifdef USE_NORMAL_MAP \r
\r
		vec3 tangent;\r
		vec3 bitangent;\r
\r
		#ifdef USE_TANGENT\r
\r
			tangent = normalize( vTangent );\r
			bitangent = normalize( vBitangent );\r
\r
		#else\r
\r
			tangent = cross(outNormal, vec3( 0.0, 1.0, 0.0 ));\r
			bitangent = cross(tangent, outNormal);\r
\r
		#endif\r
\r
		#ifdef DOUBLE_SIDED\r
\r
			tangent *= faceDirection;\r
			bitangent *= faceDirection;\r
			\r
		#endif\r
\r
		mat3 vTBN = mat3( tangent, bitangent, outNormal );\r
		outNormal = normalize( vTBN * outNormalMap );\r
\r
	#endif\r
\r
	vec4 mvp = uProjectionMatrix * mv;\r
	gl_FragDepth = ( mvp.z / mvp.w ) * 0.5 + 0.5;\r
	outColor0 = vec4( outPos, outEmission.x );\r
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), outEmission.y );\r
	outColor2 = vec4( outColor.xyz, 0.0 );\r
	outColor3 = vec4( outRoughness, outMetallic, outSSN, outEnv );\r
	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r
#endif\r
\r
#ifdef IS_FORWARD\r
	outColor0 = outColor;\r
	outColor1 = vec4(outPos, 1.0);\r
	outColor2 = vec4(vVelocity, 0.0, 1.0);\r
#endif

}`})))()}var A;function j(){return(j=e((()=>{A=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}
uniform mat4 uModelMatrix;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform mat4 uNormalMatrix;\r
\r
uniform mat4 uModelMatrixPrev;\r
uniform mat4 uModelViewMatrix;\r
uniform mat4 uViewMatrixPrev;\r
uniform mat4 uProjectionMatrixPrev;\r
\r
out vec2 vUv;\r
out vec3 vViewNormal;\r
out vec3 vNormal;\r
out vec3 vMVPosition;\r
out vec3 vMVPPosition;\r
out vec3 vPos;\r
\r
out vec2 vVelocity;\r
\r
layout ( location = 0 ) in vec3 position;\r
layout ( location = 1 ) in vec2 uv;\r
layout ( location = 2 ) in vec3 normal;\r
\r
#ifdef TF_MODELER\r
	out vec3 o_position;\r
	out vec3 o_normal;\r
#endif\r
\r
uniform float uTime;\r
uniform float uTimeF;\r
uniform float uTimeE;\r
uniform float uTimeEF;
mat2 rotate(float rad) {\r
  return mat2(cos(rad), sin(rad), -sin(rad), cos(rad));\r
}\r
\r
void rotate( float rad, inout vec2 pos, inout vec2 normal ) {\r
	\r
	mat2 rot = rotate( rad );\r
	\r
	pos *= rot;\r
	normal *= rot;\r
\r
}\r
\r
mat3 makeRotationDir( vec3 direction, vec3 up ) {\r
\r
	vec3 xaxis = normalize( cross( up, direction ) );\r
	vec3 yaxis = normalize( cross( direction, xaxis ) );\r
\r
	return mat3(\r
		xaxis.x, yaxis.x, direction.x,\r
		xaxis.y, yaxis.y, direction.y,\r
		xaxis.z, yaxis.z, direction.z\r
	);\r
\r
}

out vec3 vInstance;

layout(location = 3) in vec3 instance;

void main( void ) {

	vec3 outPos = position;\r
vec3 outNormal = normal;\r
vec2 outUv = uv;

	outPos.xy *= 1.0 + (1.0 - instance.z) * 0.2;
	outPos.yz *= rotate( (-HPI + sin( uTimeE * 0.3 + instance.z * 0.3 ) * HPI )  );
	
	outPos.y += instance.x * 2.2;

	vInstance = instance;

	
	#ifdef TF_MODELER\r
		o_position = outPos;\r
		o_normal = outNormal;\r
		return;\r
#endif\r
\r
vec4 modelPosition = uModelMatrix * vec4(outPos, 1.0);\r
vec4 mvPosition = uViewMatrix * modelPosition;\r
gl_Position = uProjectionMatrix * mvPosition;\r
\r
vec4 modelPositionPrev = uModelMatrixPrev * vec4(outPos, 1.0);\r
vec4 mvPositionPrev = uViewMatrixPrev * modelPositionPrev;\r
vec4 positionPrev = uProjectionMatrixPrev * mvPositionPrev;\r
\r
vUv = outUv;\r
vViewNormal = normalize( (uNormalMatrix * vec4(outNormal, 0.0)).xyz );\r
vNormal = (uModelMatrix * vec4(outNormal, 0.0)).xyz;\r
vPos = modelPosition.xyz;\r
vMVPosition = mvPosition.xyz;\r
vMVPPosition = gl_Position.xyz / gl_Position.w;\r
\r
vVelocity = vMVPPosition.xy - positionPrev.xy / positionPrev.w;\r
vVelocity *= 0.2;

}`})))()}var Se=t({EyeRings:()=>M}),M;function N(){return(N=e((()=>{f(),k(),j(),M=class extends b{constructor(e){super(e);let t=this.engine,n=new te({thetaSegments:64,innerRadius:4,outerRadius:4.01,extrude:.01}),r=[];for(let e=0;e<8;e++)r.push(-1,e,e/7),r.push(1,e,e/7);n.setAttribute(`instance`,new Float32Array(r),3,{instanceDivisor:1});let i=new l({phase:[`deferred`,`shadowMap`],frag:O,vert:A,uniforms:t.uniforms});this.entity.addComponent(_,{geometry:n,material:i})}dispose(){super.dispose(),this.entity.removeComponent(_)}}})))()}var P;function F(){return(F=e((()=>{P=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}
// 宣言順はvert_h.part.glslのoutと一致させる（WGSL変換時にロケーションが宣言順で振られるため）\r
in vec2 vUv;\r
in vec3 vViewNormal;\r
in vec3 vNormal;\r
in vec3 vMVPosition;\r
in vec3 vMVPPosition;\r
in vec3 vPos;\r
in vec2 vVelocity;\r
\r
uniform mat4 uModelMatrix;\r
uniform mat4 uModelMatrixInverse;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform vec3 uCameraPosition;\r
uniform vec2 uResolution;\r
\r
#ifdef IS_DEPTH\r
	uniform float uCameraNear;\r
	uniform float uCameraFar;\r
#endif\r
\r
#ifdef IS_DEFERRED\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
	layout (location = 3) out vec4 outColor3;\r
	layout (location = 4) out vec4 outColor4;\r
#endif\r
\r
#ifdef IS_FORWARD\r
	uniform sampler2D uDeferredTexture;\r
	uniform vec2 uDeferredResolution;\r
	uniform sampler2D uGbufferNormal;\r
	uniform sampler2D uGbufferAlbedo;\r
	uniform sampler2D uGbufferMaterial;\r
#endif\r
\r
#if defined(IS_FORWARD) || defined(IS_DEPTH)\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
#endif\r
\r
uniform float uTime;\r
uniform float uTimeF;\r
uniform float uTimeE;\r
uniform float uTimeEF;

in vec4 vOPos;
in float vT;

void main( void ) {

	vec4 outColor = vec4(1.0);\r
vec3 outNormal = normalize(vNormal);\r
vec3 outNormalMap = vec3( 0.0 );\r
float outSSN = 0.0;\r
vec3 outEmission = vec3(0.0);\r
float outRoughness = 0.5;\r
float outMetallic = 0.0;\r
vec3 outPos = vPos;\r
float outEnv = 1.0;

	float emit = exp( vT * -8.0);

	outColor = vec4( vec3( emit * 50.0 ), emit );

	if( emit < 0.03 ) {

		discard;

	}
	
	#if defined(IS_DEPTH) || defined(IS_DEFERRED)\r
	vec4 mv = uViewMatrix * vec4(outPos, 1.0);\r
#endif\r
\r
#ifdef IS_DEPTH\r
	float depth_z = (-mv.z - uCameraNear) / (uCameraFar - uCameraNear);\r
	outColor0 = vec4(floatToRGBA( depth_z ));\r
#endif\r
\r
#ifdef IS_DEFERRED\r
\r
	#ifdef USE_NORMAL_MAP \r
\r
		vec3 tangent;\r
		vec3 bitangent;\r
\r
		#ifdef USE_TANGENT\r
\r
			tangent = normalize( vTangent );\r
			bitangent = normalize( vBitangent );\r
\r
		#else\r
\r
			tangent = cross(outNormal, vec3( 0.0, 1.0, 0.0 ));\r
			bitangent = cross(tangent, outNormal);\r
\r
		#endif\r
\r
		#ifdef DOUBLE_SIDED\r
\r
			tangent *= faceDirection;\r
			bitangent *= faceDirection;\r
			\r
		#endif\r
\r
		mat3 vTBN = mat3( tangent, bitangent, outNormal );\r
		outNormal = normalize( vTBN * outNormalMap );\r
\r
	#endif\r
\r
	vec4 mvp = uProjectionMatrix * mv;\r
	gl_FragDepth = ( mvp.z / mvp.w ) * 0.5 + 0.5;\r
	outColor0 = vec4( outPos, outEmission.x );\r
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), outEmission.y );\r
	outColor2 = vec4( outColor.xyz, 0.0 );\r
	outColor3 = vec4( outRoughness, outMetallic, outSSN, outEnv );\r
	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r
#endif\r
\r
#ifdef IS_FORWARD\r
	outColor0 = outColor;\r
	outColor1 = vec4(outPos, 1.0);\r
	outColor2 = vec4(vVelocity, 0.0, 1.0);\r
#endif

}`})))()}var I;function L(){return(L=e((()=>{I=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}
uniform mat4 uModelMatrix;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform mat4 uNormalMatrix;\r
\r
uniform mat4 uModelMatrixPrev;\r
uniform mat4 uModelViewMatrix;\r
uniform mat4 uViewMatrixPrev;\r
uniform mat4 uProjectionMatrixPrev;\r
\r
out vec2 vUv;\r
out vec3 vViewNormal;\r
out vec3 vNormal;\r
out vec3 vMVPosition;\r
out vec3 vMVPPosition;\r
out vec3 vPos;\r
\r
out vec2 vVelocity;\r
\r
layout ( location = 0 ) in vec3 position;\r
layout ( location = 1 ) in vec2 uv;\r
layout ( location = 2 ) in vec3 normal;\r
\r
#ifdef TF_MODELER\r
	out vec3 o_position;\r
	out vec3 o_normal;\r
#endif\r
\r
uniform float uTime;\r
uniform float uTimeF;\r
uniform float uTimeE;\r
uniform float uTimeEF;

in vec4 oPos;
out vec4 vOPos;
out float vT;

void main( void ) {

	vec3 outPos = position;\r
vec3 outNormal = normal;\r
vec2 outUv = uv;

	vT = fract( uTimeE * 0.5 + oPos.w );

	outPos.xz *= 1.0 + exp( vT * -8.0 ) * 20.0;
	outPos.xyz += oPos.xyz;

	#ifdef TF_MODELER\r
		o_position = outPos;\r
		o_normal = outNormal;\r
		return;\r
#endif\r
\r
vec4 modelPosition = uModelMatrix * vec4(outPos, 1.0);\r
vec4 mvPosition = uViewMatrix * modelPosition;\r
gl_Position = uProjectionMatrix * mvPosition;\r
\r
vec4 modelPositionPrev = uModelMatrixPrev * vec4(outPos, 1.0);\r
vec4 mvPositionPrev = uViewMatrixPrev * modelPositionPrev;\r
vec4 positionPrev = uProjectionMatrixPrev * mvPositionPrev;\r
\r
vUv = outUv;\r
vViewNormal = normalize( (uNormalMatrix * vec4(outNormal, 0.0)).xyz );\r
vNormal = (uModelMatrix * vec4(outNormal, 0.0)).xyz;\r
vPos = modelPosition.xyz;\r
vMVPosition = mvPosition.xyz;\r
vMVPPosition = gl_Position.xyz / gl_Position.w;\r
\r
vVelocity = vMVPPosition.xy - positionPrev.xy / positionPrev.w;\r
vVelocity *= 0.2;
	
	vOPos = oPos;

}`})))()}var Ce=t({FlashLine:()=>R}),R;function z(){return(z=e((()=>{d(),f(),F(),L(),R=class extends b{geometry;material;constructor(e){super(e);let t=this.engine;this.geometry=new de({radiusBottom:.02,radiusTop:.02,radSegments:8,height:50});let n=[];for(let e=0;e<32;e++){let e=i.randomVector().multiply(new h(20,1,20));n.push(e.x,e.y,e.z,Math.random())}this.geometry.setAttribute(`oPos`,new Float32Array(n),4,{instanceDivisor:1}),this.material=new l({phase:[`forward`,`envMap`],frag:p(`flFrag`,P),vert:p(`flVert`,I),uniforms:c.merge(t.uniforms)}),this.entity.addComponent(_,{material:this.material,geometry:this.geometry})}}})))()}var B;function we(){return(we=e((()=>{B=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}
// 宣言順はvert_h.part.glslのoutと一致させる（WGSL変換時にロケーションが宣言順で振られるため）\r
in vec2 vUv;\r
in vec3 vViewNormal;\r
in vec3 vNormal;\r
in vec3 vMVPosition;\r
in vec3 vMVPPosition;\r
in vec3 vPos;\r
in vec2 vVelocity;\r
\r
uniform mat4 uModelMatrix;\r
uniform mat4 uModelMatrixInverse;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform vec3 uCameraPosition;\r
uniform vec2 uResolution;\r
\r
#ifdef IS_DEPTH\r
	uniform float uCameraNear;\r
	uniform float uCameraFar;\r
#endif\r
\r
#ifdef IS_DEFERRED\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
	layout (location = 3) out vec4 outColor3;\r
	layout (location = 4) out vec4 outColor4;\r
#endif\r
\r
#ifdef IS_FORWARD\r
	uniform sampler2D uDeferredTexture;\r
	uniform vec2 uDeferredResolution;\r
	uniform sampler2D uGbufferNormal;\r
	uniform sampler2D uGbufferAlbedo;\r
	uniform sampler2D uGbufferMaterial;\r
#endif\r
\r
#if defined(IS_FORWARD) || defined(IS_DEPTH)\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
#endif\r
\r
uniform float uTime;\r
uniform float uTimeF;\r
uniform float uTimeE;\r
uniform float uTimeEF;
\r
// https://www.shadertoy.com/view/4dS3Wd\r
\r
float hashv(float p) { p = fract(p * 0.011); p *= p + 7.5; p *= p + p; return fract(p); }\r
float hashv(vec2 p) {vec3 p3 = fract(vec3(p.xyx) * 0.13); p3 += dot(p3, p3.yzx + 3.333); return fract((p3.x + p3.y) * p3.z); }\r
\r
#define NUM_NOISE_OCTAVES 5\r
\r
float noiseValue(vec3 x) {\r
    const vec3 step = vec3(110, 241, 171);\r
\r
    vec3 i = floor(x);\r
    vec3 f = fract(x);\r
 \r
    // For performance, compute the base input to a 1D hash from the integer part of the argument and the \r
    // incremental change to the 1D based on the 3D -> 1D wrapping\r
    float n = dot(i, step);\r
\r
    vec3 u = f * f * (3.0 - 2.0 * f);\r
    return mix(mix(mix( hashv(n + dot(step, vec3(0, 0, 0))), hashv(n + dot(step, vec3(1, 0, 0))), u.x),\r
                   mix( hashv(n + dot(step, vec3(0, 1, 0))), hashv(n + dot(step, vec3(1, 1, 0))), u.x), u.y),\r
               mix(mix( hashv(n + dot(step, vec3(0, 0, 1))), hashv(n + dot(step, vec3(1, 0, 1))), u.x),\r
                   mix( hashv(n + dot(step, vec3(0, 1, 1))), hashv(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z);\r
}\r
\r
float fbm(vec3 x) {\r
	float v = 0.0;\r
	float a = 0.5;\r
	vec3 shift = vec3(100);\r
	for (int i = 0; i < NUM_NOISE_OCTAVES; ++i) {\r
		v += a * noiseValue(x);\r
		x = x * 2.0 + shift;\r
		a *= 0.5;\r
    if( i == -1 ) break;\r
	}\r
	return v;\r
}\r
\r
float fbm(float x) {\r
  return fbm(vec3(x));\r
}
mat2 rotate(float rad) {\r
  return mat2(cos(rad), sin(rad), -sin(rad), cos(rad));\r
}\r
\r
void rotate( float rad, inout vec2 pos, inout vec2 normal ) {\r
	\r
	mat2 rot = rotate( rad );\r
	\r
	pos *= rot;\r
	normal *= rot;\r
\r
}\r
\r
mat3 makeRotationDir( vec3 direction, vec3 up ) {\r
\r
	vec3 xaxis = normalize( cross( up, direction ) );\r
	vec3 yaxis = normalize( cross( direction, xaxis ) );\r
\r
	return mat3(\r
		xaxis.x, yaxis.x, direction.x,\r
		xaxis.y, yaxis.y, direction.y,\r
		xaxis.z, yaxis.z, direction.z\r
	);\r
\r
}

uniform float uAspectRatio;

void main( void ) {

	vec4 outColor = vec4(1.0);\r
vec3 outNormal = normalize(vNormal);\r
vec3 outNormalMap = vec3( 0.0 );\r
float outSSN = 0.0;\r
vec3 outEmission = vec3(0.0);\r
float outRoughness = 0.5;\r
float outMetallic = 0.0;\r
vec3 outPos = vPos;\r
float outEnv = 1.0;

	vec3 normal = normalize( - vNormal );
	outRoughness = 1.0;
	outColor *= 0.0;
	outColor.xyz = vec3( 0.0, 0.05, 0.1);

	vec3 sPos = outPos * 0.1;

	float n = noiseValue( sPos * 0.05 + uTimeE * 0.1 );

	vec3 n2Pos = sPos;
	n2Pos.xz *= rotate( n2Pos.y * 0.02 );
	float n2 = noiseValue( n2Pos * 0.01 + vec3( 0.0, 0.0, uTimeE * 0.5 + n ) );

	float phase = 4.5;

	float line = smoothstep( 0.88, 0.9, fract( n2 * phase ) );
	float pattern = smoothstep( 0.2, 0.1, length( fract( ( vUv + vec2( floor(vUv.y * 150.0) / 150.0 * 0.25, 0.0 ) ) * vec2( 2.0, 1.0 ) * 150.0 ) - 0.5 )) * step( n2 * phase, 2.0 ) * 0.8;

	float emit = min( line + pattern, 1.0 );

	outEmission = vec3( emit * 20.0 * smoothstep( 0.4, 1.0, n) );

	#ifdef IS_FORWARD

		outColor = vec4( outEmission, 1.0 );

	#endif

	outEnv = 0.0;

	#if defined(IS_DEPTH) || defined(IS_DEFERRED)\r
	vec4 mv = uViewMatrix * vec4(outPos, 1.0);\r
#endif\r
\r
#ifdef IS_DEPTH\r
	float depth_z = (-mv.z - uCameraNear) / (uCameraFar - uCameraNear);\r
	outColor0 = vec4(floatToRGBA( depth_z ));\r
#endif\r
\r
#ifdef IS_DEFERRED\r
\r
	#ifdef USE_NORMAL_MAP \r
\r
		vec3 tangent;\r
		vec3 bitangent;\r
\r
		#ifdef USE_TANGENT\r
\r
			tangent = normalize( vTangent );\r
			bitangent = normalize( vBitangent );\r
\r
		#else\r
\r
			tangent = cross(outNormal, vec3( 0.0, 1.0, 0.0 ));\r
			bitangent = cross(tangent, outNormal);\r
\r
		#endif\r
\r
		#ifdef DOUBLE_SIDED\r
\r
			tangent *= faceDirection;\r
			bitangent *= faceDirection;\r
			\r
		#endif\r
\r
		mat3 vTBN = mat3( tangent, bitangent, outNormal );\r
		outNormal = normalize( vTBN * outNormalMap );\r
\r
	#endif\r
\r
	vec4 mvp = uProjectionMatrix * mv;\r
	gl_FragDepth = ( mvp.z / mvp.w ) * 0.5 + 0.5;\r
	outColor0 = vec4( outPos, outEmission.x );\r
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), outEmission.y );\r
	outColor2 = vec4( outColor.xyz, 0.0 );\r
	outColor3 = vec4( outRoughness, outMetallic, outSSN, outEnv );\r
	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r
#endif\r
\r
#ifdef IS_FORWARD\r
	outColor0 = outColor;\r
	outColor1 = vec4(outPos, 1.0);\r
	outColor2 = vec4(vVelocity, 0.0, 1.0);\r
#endif

}`})))()}var Te=t({SkyBox:()=>Ee}),Ee;function De(){return(De=e((()=>{f(),we(),Ee=class extends b{material;constructor(e){super(e);let t=this.engine;this.material=new l({name:`SkyBox`,phase:[`deferred`,`envMap`],frag:p(`SkyBoxFrag`,B),uniforms:c.merge(t.uniforms,{uAspectRatio:{value:0,type:`1f`}})}),t.renderer.sky.mesh.material=this.material}}})))()}var Oe;function ke(){return(ke=e((()=>{Oe=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}
// 宣言順はvert_h.part.glslのoutと一致させる（WGSL変換時にロケーションが宣言順で振られるため）\r
in vec2 vUv;\r
in vec3 vViewNormal;\r
in vec3 vNormal;\r
in vec3 vMVPosition;\r
in vec3 vMVPPosition;\r
in vec3 vPos;\r
in vec2 vVelocity;\r
\r
uniform mat4 uModelMatrix;\r
uniform mat4 uModelMatrixInverse;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform vec3 uCameraPosition;\r
uniform vec2 uResolution;\r
\r
#ifdef IS_DEPTH\r
	uniform float uCameraNear;\r
	uniform float uCameraFar;\r
#endif\r
\r
#ifdef IS_DEFERRED\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
	layout (location = 3) out vec4 outColor3;\r
	layout (location = 4) out vec4 outColor4;\r
#endif\r
\r
#ifdef IS_FORWARD\r
	uniform sampler2D uDeferredTexture;\r
	uniform vec2 uDeferredResolution;\r
	uniform sampler2D uGbufferNormal;\r
	uniform sampler2D uGbufferAlbedo;\r
	uniform sampler2D uGbufferMaterial;\r
#endif\r
\r
#if defined(IS_FORWARD) || defined(IS_DEPTH)\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
#endif\r
\r
uniform float uTime;\r
uniform float uTimeF;\r
uniform float uTimeE;\r
uniform float uTimeEF;

void main( void ) {

	vec4 outColor = vec4(1.0);\r
vec3 outNormal = normalize(vNormal);\r
vec3 outNormalMap = vec3( 0.0 );\r
float outSSN = 0.0;\r
vec3 outEmission = vec3(0.0);\r
float outRoughness = 0.5;\r
float outMetallic = 0.0;\r
vec3 outPos = vPos;\r
float outEnv = 1.0;

	outEmission += 0.35;
	outColor.w *= 0.2;
	
	#if defined(IS_DEPTH) || defined(IS_DEFERRED)\r
	vec4 mv = uViewMatrix * vec4(outPos, 1.0);\r
#endif\r
\r
#ifdef IS_DEPTH\r
	float depth_z = (-mv.z - uCameraNear) / (uCameraFar - uCameraNear);\r
	outColor0 = vec4(floatToRGBA( depth_z ));\r
#endif\r
\r
#ifdef IS_DEFERRED\r
\r
	#ifdef USE_NORMAL_MAP \r
\r
		vec3 tangent;\r
		vec3 bitangent;\r
\r
		#ifdef USE_TANGENT\r
\r
			tangent = normalize( vTangent );\r
			bitangent = normalize( vBitangent );\r
\r
		#else\r
\r
			tangent = cross(outNormal, vec3( 0.0, 1.0, 0.0 ));\r
			bitangent = cross(tangent, outNormal);\r
\r
		#endif\r
\r
		#ifdef DOUBLE_SIDED\r
\r
			tangent *= faceDirection;\r
			bitangent *= faceDirection;\r
			\r
		#endif\r
\r
		mat3 vTBN = mat3( tangent, bitangent, outNormal );\r
		outNormal = normalize( vTBN * outNormalMap );\r
\r
	#endif\r
\r
	vec4 mvp = uProjectionMatrix * mv;\r
	gl_FragDepth = ( mvp.z / mvp.w ) * 0.5 + 0.5;\r
	outColor0 = vec4( outPos, outEmission.x );\r
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), outEmission.y );\r
	outColor2 = vec4( outColor.xyz, 0.0 );\r
	outColor3 = vec4( outRoughness, outMetallic, outSSN, outEnv );\r
	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r
#endif\r
\r
#ifdef IS_FORWARD\r
	outColor0 = outColor;\r
	outColor1 = vec4(outPos, 1.0);\r
	outColor2 = vec4(vVelocity, 0.0, 1.0);\r
#endif

}`})))()}var Ae;function je(){return(je=e((()=>{Ae=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}
mat2 rotate(float rad) {\r
  return mat2(cos(rad), sin(rad), -sin(rad), cos(rad));\r
}\r
\r
void rotate( float rad, inout vec2 pos, inout vec2 normal ) {\r
	\r
	mat2 rot = rotate( rad );\r
	\r
	pos *= rot;\r
	normal *= rot;\r
\r
}\r
\r
mat3 makeRotationDir( vec3 direction, vec3 up ) {\r
\r
	vec3 xaxis = normalize( cross( up, direction ) );\r
	vec3 yaxis = normalize( cross( direction, xaxis ) );\r
\r
	return mat3(\r
		xaxis.x, yaxis.x, direction.x,\r
		xaxis.y, yaxis.y, direction.y,\r
		xaxis.z, yaxis.z, direction.z\r
	);\r
\r
}
uniform mat4 uModelMatrix;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform mat4 uNormalMatrix;\r
\r
uniform mat4 uModelMatrixPrev;\r
uniform mat4 uModelViewMatrix;\r
uniform mat4 uViewMatrixPrev;\r
uniform mat4 uProjectionMatrixPrev;\r
\r
out vec2 vUv;\r
out vec3 vViewNormal;\r
out vec3 vNormal;\r
out vec3 vMVPosition;\r
out vec3 vMVPPosition;\r
out vec3 vPos;\r
\r
out vec2 vVelocity;\r
\r
layout ( location = 0 ) in vec3 position;\r
layout ( location = 1 ) in vec2 uv;\r
layout ( location = 2 ) in vec3 normal;\r
\r
#ifdef TF_MODELER\r
	out vec3 o_position;\r
	out vec3 o_normal;\r
#endif\r
\r
uniform float uTime;\r
uniform float uTimeF;\r
uniform float uTimeE;\r
uniform float uTimeEF;

layout (location=3) in vec3 instancePos;
layout (location=4) in vec3 instanceRot;

void main( void ) {

	vec3 outPos = position;\r
vec3 outNormal = normal;\r
vec2 outUv = uv;

	outPos.xz *= 0.25;
	outPos.yz *= rotate( instanceRot.x );
	outPos.xy *= rotate( instanceRot.z );

	outPos += instancePos * vec3(15.0, 10.0, 15.0 );


	#ifdef TF_MODELER\r
		o_position = outPos;\r
		o_normal = outNormal;\r
		return;\r
#endif\r
\r
vec4 modelPosition = uModelMatrix * vec4(outPos, 1.0);\r
vec4 mvPosition = uViewMatrix * modelPosition;\r
gl_Position = uProjectionMatrix * mvPosition;\r
\r
vec4 modelPositionPrev = uModelMatrixPrev * vec4(outPos, 1.0);\r
vec4 mvPositionPrev = uViewMatrixPrev * modelPositionPrev;\r
vec4 positionPrev = uProjectionMatrixPrev * mvPositionPrev;\r
\r
vUv = outUv;\r
vViewNormal = normalize( (uNormalMatrix * vec4(outNormal, 0.0)).xyz );\r
vNormal = (uModelMatrix * vec4(outNormal, 0.0)).xyz;\r
vPos = modelPosition.xyz;\r
vMVPosition = mvPosition.xyz;\r
vMVPPosition = gl_Position.xyz / gl_Position.w;\r
\r
vVelocity = vMVPPosition.xy - positionPrev.xy / positionPrev.w;\r
vVelocity *= 0.2;

}`})))()}var Me=t({GridCross:()=>Ne}),Ne;function Pe(){return(Pe=e((()=>{d(),f(),ke(),je(),Ne=class extends b{constructor(e){super(e);let t=new g({width:.05,height:.5,depth:.05}),n=[],r=[],i=new h(16,2,16);for(let e=0;e<i.x;e++)for(let t=0;t<i.y;t++)for(let a=0;a<i.z;a++){let o=(e/(i.x-1)-.5)*1,s=(t/(i.y-1)-.5)*1,c=(a/(i.z-1)-.5)*1;n.push(o,s,c),r.push(Math.PI/2,0,0),n.push(o,s,c),r.push(0,0,Math.PI/2)}t.setAttribute(`instanceRot`,new Float32Array(r),3,{instanceDivisor:1}),t.setAttribute(`instancePos`,new Float32Array(n),3,{instanceDivisor:1});let a=new l({frag:p(`gridCrossFrag`,Oe),vert:p(`gridCrossVert`,Ae),phase:[`forward`]});this.entity.addComponent(_,{geometry:t,material:a})}}})))()}var Fe;function Ie(){return(Ie=e((()=>{Fe=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}
// 宣言順はvert_h.part.glslのoutと一致させる（WGSL変換時にロケーションが宣言順で振られるため）\r
in vec2 vUv;\r
in vec3 vViewNormal;\r
in vec3 vNormal;\r
in vec3 vMVPosition;\r
in vec3 vMVPPosition;\r
in vec3 vPos;\r
in vec2 vVelocity;\r
\r
uniform mat4 uModelMatrix;\r
uniform mat4 uModelMatrixInverse;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform vec3 uCameraPosition;\r
uniform vec2 uResolution;\r
\r
#ifdef IS_DEPTH\r
	uniform float uCameraNear;\r
	uniform float uCameraFar;\r
#endif\r
\r
#ifdef IS_DEFERRED\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
	layout (location = 3) out vec4 outColor3;\r
	layout (location = 4) out vec4 outColor4;\r
#endif\r
\r
#ifdef IS_FORWARD\r
	uniform sampler2D uDeferredTexture;\r
	uniform vec2 uDeferredResolution;\r
	uniform sampler2D uGbufferNormal;\r
	uniform sampler2D uGbufferAlbedo;\r
	uniform sampler2D uGbufferMaterial;\r
#endif\r
\r
#if defined(IS_FORWARD) || defined(IS_DEPTH)\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
#endif\r
\r
uniform float uTime;\r
uniform float uTimeF;\r
uniform float uTimeE;\r
uniform float uTimeEF;

void main( void ) {

	vec4 outColor = vec4(1.0);\r
vec3 outNormal = normalize(vNormal);\r
vec3 outNormalMap = vec3( 0.0 );\r
float outSSN = 0.0;\r
vec3 outEmission = vec3(0.0);\r
float outRoughness = 0.5;\r
float outMetallic = 0.0;\r
vec3 outPos = vPos;\r
float outEnv = 1.0;

	outEmission += 0.35;

	outColor.w = 0.2;
	
	#if defined(IS_DEPTH) || defined(IS_DEFERRED)\r
	vec4 mv = uViewMatrix * vec4(outPos, 1.0);\r
#endif\r
\r
#ifdef IS_DEPTH\r
	float depth_z = (-mv.z - uCameraNear) / (uCameraFar - uCameraNear);\r
	outColor0 = vec4(floatToRGBA( depth_z ));\r
#endif\r
\r
#ifdef IS_DEFERRED\r
\r
	#ifdef USE_NORMAL_MAP \r
\r
		vec3 tangent;\r
		vec3 bitangent;\r
\r
		#ifdef USE_TANGENT\r
\r
			tangent = normalize( vTangent );\r
			bitangent = normalize( vBitangent );\r
\r
		#else\r
\r
			tangent = cross(outNormal, vec3( 0.0, 1.0, 0.0 ));\r
			bitangent = cross(tangent, outNormal);\r
\r
		#endif\r
\r
		#ifdef DOUBLE_SIDED\r
\r
			tangent *= faceDirection;\r
			bitangent *= faceDirection;\r
			\r
		#endif\r
\r
		mat3 vTBN = mat3( tangent, bitangent, outNormal );\r
		outNormal = normalize( vTBN * outNormalMap );\r
\r
	#endif\r
\r
	vec4 mvp = uProjectionMatrix * mv;\r
	gl_FragDepth = ( mvp.z / mvp.w ) * 0.5 + 0.5;\r
	outColor0 = vec4( outPos, outEmission.x );\r
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), outEmission.y );\r
	outColor2 = vec4( outColor.xyz, 0.0 );\r
	outColor3 = vec4( outRoughness, outMetallic, outSSN, outEnv );\r
	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r
#endif\r
\r
#ifdef IS_FORWARD\r
	outColor0 = outColor;\r
	outColor1 = vec4(outPos, 1.0);\r
	outColor2 = vec4(vVelocity, 0.0, 1.0);\r
#endif

}`})))()}var Le;function Re(){return(Re=e((()=>{Le=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}
mat2 rotate(float rad) {\r
  return mat2(cos(rad), sin(rad), -sin(rad), cos(rad));\r
}\r
\r
void rotate( float rad, inout vec2 pos, inout vec2 normal ) {\r
	\r
	mat2 rot = rotate( rad );\r
	\r
	pos *= rot;\r
	normal *= rot;\r
\r
}\r
\r
mat3 makeRotationDir( vec3 direction, vec3 up ) {\r
\r
	vec3 xaxis = normalize( cross( up, direction ) );\r
	vec3 yaxis = normalize( cross( direction, xaxis ) );\r
\r
	return mat3(\r
		xaxis.x, yaxis.x, direction.x,\r
		xaxis.y, yaxis.y, direction.y,\r
		xaxis.z, yaxis.z, direction.z\r
	);\r
\r
}
uniform mat4 uModelMatrix;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform mat4 uNormalMatrix;\r
\r
uniform mat4 uModelMatrixPrev;\r
uniform mat4 uModelViewMatrix;\r
uniform mat4 uViewMatrixPrev;\r
uniform mat4 uProjectionMatrixPrev;\r
\r
out vec2 vUv;\r
out vec3 vViewNormal;\r
out vec3 vNormal;\r
out vec3 vMVPosition;\r
out vec3 vMVPPosition;\r
out vec3 vPos;\r
\r
out vec2 vVelocity;\r
\r
layout ( location = 0 ) in vec3 position;\r
layout ( location = 1 ) in vec2 uv;\r
layout ( location = 2 ) in vec3 normal;\r
\r
#ifdef TF_MODELER\r
	out vec3 o_position;\r
	out vec3 o_normal;\r
#endif\r
\r
uniform float uTime;\r
uniform float uTimeF;\r
uniform float uTimeE;\r
uniform float uTimeEF;

layout (location=3) in vec3 instancePos;
layout (location=4) in vec3 instanceRot;

void main( void ) {

	vec3 outPos = position;\r
vec3 outNormal = normal;\r
vec2 outUv = uv;

	outPos *= 0.25;
	outPos.yz *= rotate( instanceRot.x );
	outPos.xy *= rotate( instanceRot.z );
	
	outPos += instancePos * vec3(15.0, 5.0, 15.0 );


	#ifdef TF_MODELER\r
		o_position = outPos;\r
		o_normal = outNormal;\r
		return;\r
#endif\r
\r
vec4 modelPosition = uModelMatrix * vec4(outPos, 1.0);\r
vec4 mvPosition = uViewMatrix * modelPosition;\r
gl_Position = uProjectionMatrix * mvPosition;\r
\r
vec4 modelPositionPrev = uModelMatrixPrev * vec4(outPos, 1.0);\r
vec4 mvPositionPrev = uViewMatrixPrev * modelPositionPrev;\r
vec4 positionPrev = uProjectionMatrixPrev * mvPositionPrev;\r
\r
vUv = outUv;\r
vViewNormal = normalize( (uNormalMatrix * vec4(outNormal, 0.0)).xyz );\r
vNormal = (uModelMatrix * vec4(outNormal, 0.0)).xyz;\r
vPos = modelPosition.xyz;\r
vMVPosition = mvPosition.xyz;\r
vMVPPosition = gl_Position.xyz / gl_Position.w;\r
\r
vVelocity = vMVPPosition.xy - positionPrev.xy / positionPrev.w;\r
vVelocity *= 0.2;

}`})))()}var ze=t({GridDots:()=>Be}),Be;function Ve(){return(Ve=e((()=>{d(),f(),Ie(),Re(),Be=class extends b{constructor(e){super(e);let t=new se({radius:.1}),n=[],r=[],i=new h(32,2,32);for(let e=0;e<i.x;e++)for(let t=0;t<i.y;t++)for(let a=0;a<i.z;a++){let o=(e/(i.x-1)-.5)*1,s=(t/(i.y-1)-.5)*1,c=(a/(i.z-1)-.5)*1;n.push(o,s,c),r.push(0,0,0)}t.setAttribute(`instanceRot`,new Float32Array(r),3,{instanceDivisor:1}),t.setAttribute(`instancePos`,new Float32Array(n),3,{instanceDivisor:1});let a=new l({frag:p(`gridDotsFrag`,Fe),vert:p(`gridDotsVert`,Le),phase:[`forward`]});this.entity.addComponent(_,{geometry:t,material:a})}}})))()}var He;function Ue(){return(Ue=e((()=>{He=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}\r
// 宣言順はvert_h.part.glslのoutと一致させる（WGSL変換時にロケーションが宣言順で振られるため）\r
in vec2 vUv;\r
in vec3 vViewNormal;\r
in vec3 vNormal;\r
in vec3 vMVPosition;\r
in vec3 vMVPPosition;\r
in vec3 vPos;\r
in vec2 vVelocity;\r
\r
uniform mat4 uModelMatrix;\r
uniform mat4 uModelMatrixInverse;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform vec3 uCameraPosition;\r
uniform vec2 uResolution;\r
\r
#ifdef IS_DEPTH\r
	uniform float uCameraNear;\r
	uniform float uCameraFar;\r
#endif\r
\r
#ifdef IS_DEFERRED\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
	layout (location = 3) out vec4 outColor3;\r
	layout (location = 4) out vec4 outColor4;\r
#endif\r
\r
#ifdef IS_FORWARD\r
	uniform sampler2D uDeferredTexture;\r
	uniform vec2 uDeferredResolution;\r
	uniform sampler2D uGbufferNormal;\r
	uniform sampler2D uGbufferAlbedo;\r
	uniform sampler2D uGbufferMaterial;\r
#endif\r
\r
#if defined(IS_FORWARD) || defined(IS_DEPTH)\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
#endif\r
\r
uniform float uTime;\r
uniform float uTimeF;\r
uniform float uTimeE;\r
uniform float uTimeEF;\r
\r
void main( void ) {\r
\r
	vec4 outColor = vec4(1.0);\r
vec3 outNormal = normalize(vNormal);\r
vec3 outNormalMap = vec3( 0.0 );\r
float outSSN = 0.0;\r
vec3 outEmission = vec3(0.0);\r
float outRoughness = 0.5;\r
float outMetallic = 0.0;\r
vec3 outPos = vPos;\r
float outEnv = 1.0;\r
\r
	if( sin( vUv.y * 120.0 + uTimeE * 5.0 ) > 0.0 ) discard;\r
	\r
	outColor = vec4( 1.0 );\r
	outEmission += vec3( 10.0 );\r
	\r
	#if defined(IS_DEPTH) || defined(IS_DEFERRED)\r
	vec4 mv = uViewMatrix * vec4(outPos, 1.0);\r
#endif\r
\r
#ifdef IS_DEPTH\r
	float depth_z = (-mv.z - uCameraNear) / (uCameraFar - uCameraNear);\r
	outColor0 = vec4(floatToRGBA( depth_z ));\r
#endif\r
\r
#ifdef IS_DEFERRED\r
\r
	#ifdef USE_NORMAL_MAP \r
\r
		vec3 tangent;\r
		vec3 bitangent;\r
\r
		#ifdef USE_TANGENT\r
\r
			tangent = normalize( vTangent );\r
			bitangent = normalize( vBitangent );\r
\r
		#else\r
\r
			tangent = cross(outNormal, vec3( 0.0, 1.0, 0.0 ));\r
			bitangent = cross(tangent, outNormal);\r
\r
		#endif\r
\r
		#ifdef DOUBLE_SIDED\r
\r
			tangent *= faceDirection;\r
			bitangent *= faceDirection;\r
			\r
		#endif\r
\r
		mat3 vTBN = mat3( tangent, bitangent, outNormal );\r
		outNormal = normalize( vTBN * outNormalMap );\r
\r
	#endif\r
\r
	vec4 mvp = uProjectionMatrix * mv;\r
	gl_FragDepth = ( mvp.z / mvp.w ) * 0.5 + 0.5;\r
	outColor0 = vec4( outPos, outEmission.x );\r
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), outEmission.y );\r
	outColor2 = vec4( outColor.xyz, 0.0 );\r
	outColor3 = vec4( outRoughness, outMetallic, outSSN, outEnv );\r
	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r
#endif\r
\r
#ifdef IS_FORWARD\r
	outColor0 = outColor;\r
	outColor1 = vec4(outPos, 1.0);\r
	outColor2 = vec4(vVelocity, 0.0, 1.0);\r
#endif\r
\r
}`})))()}var We;function Ge(){return(Ge=e((()=>{We=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}\r
uniform mat4 uModelMatrix;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform mat4 uNormalMatrix;\r
\r
uniform mat4 uModelMatrixPrev;\r
uniform mat4 uModelViewMatrix;\r
uniform mat4 uViewMatrixPrev;\r
uniform mat4 uProjectionMatrixPrev;\r
\r
out vec2 vUv;\r
out vec3 vViewNormal;\r
out vec3 vNormal;\r
out vec3 vMVPosition;\r
out vec3 vMVPPosition;\r
out vec3 vPos;\r
\r
out vec2 vVelocity;\r
\r
layout ( location = 0 ) in vec3 position;\r
layout ( location = 1 ) in vec2 uv;\r
layout ( location = 2 ) in vec3 normal;\r
\r
#ifdef TF_MODELER\r
	out vec3 o_position;\r
	out vec3 o_normal;\r
#endif\r
\r
uniform float uTime;\r
uniform float uTimeF;\r
uniform float uTimeE;\r
uniform float uTimeEF;\r
\r
layout (location=3) in vec3 instancePos;\r
layout (location=4) in vec3 instanceRot;\r
\r
mat2 rotate(float rad) {\r
  return mat2(cos(rad), sin(rad), -sin(rad), cos(rad));\r
}\r
\r
void rotate( float rad, inout vec2 pos, inout vec2 normal ) {\r
	\r
	mat2 rot = rotate( rad );\r
	\r
	pos *= rot;\r
	normal *= rot;\r
\r
}\r
\r
mat3 makeRotationDir( vec3 direction, vec3 up ) {\r
\r
	vec3 xaxis = normalize( cross( up, direction ) );\r
	vec3 yaxis = normalize( cross( direction, xaxis ) );\r
\r
	return mat3(\r
		xaxis.x, yaxis.x, direction.x,\r
		xaxis.y, yaxis.y, direction.y,\r
		xaxis.z, yaxis.z, direction.z\r
	);\r
\r
}\r
\r
void main( void ) {\r
\r
	vec3 outPos = position;\r
vec3 outNormal = normal;\r
vec2 outUv = uv;\r
\r
	outPos += instancePos;\r
	outPos.yz *= rotate( instanceRot.x );\r
	outPos.xy *= rotate( instanceRot.z );\r
\r
	#ifdef TF_MODELER\r
		o_position = outPos;\r
		o_normal = outNormal;\r
		return;\r
#endif\r
\r
vec4 modelPosition = uModelMatrix * vec4(outPos, 1.0);\r
vec4 mvPosition = uViewMatrix * modelPosition;\r
gl_Position = uProjectionMatrix * mvPosition;\r
\r
vec4 modelPositionPrev = uModelMatrixPrev * vec4(outPos, 1.0);\r
vec4 mvPositionPrev = uViewMatrixPrev * modelPositionPrev;\r
vec4 positionPrev = uProjectionMatrixPrev * mvPositionPrev;\r
\r
vUv = outUv;\r
vViewNormal = normalize( (uNormalMatrix * vec4(outNormal, 0.0)).xyz );\r
vNormal = (uModelMatrix * vec4(outNormal, 0.0)).xyz;\r
vPos = modelPosition.xyz;\r
vMVPosition = mvPosition.xyz;\r
vMVPPosition = gl_Position.xyz / gl_Position.w;\r
\r
vVelocity = vMVPPosition.xy - positionPrev.xy / positionPrev.w;\r
vVelocity *= 0.2;\r
\r
}`})))()}var Ke=t({WireCube:()=>qe}),qe;function Je(){return(Je=e((()=>{f(),Ue(),Ge(),qe=class extends b{constructor(e){super(e);let t=this.engine,n=3.3,r=n/2,i=new g({width:.01,height:n,depth:.01,segmentsHeight:16}),a=[],o=[];for(let e=0;e<3;e++)for(let t=0;t<4;t++)[[r,0,r],[r,0,-1.65],[-1.65,0,r],[-1.65,0,-1.65]][t].forEach(e=>{a.push(e)}),[[0,0,0],[Math.PI/2,0,0],[0,0,Math.PI/2]][e].forEach(e=>{o.push(e)});i.setAttribute(`instancePos`,new Float32Array(a),3,{instanceDivisor:1}),i.setAttribute(`instanceRot`,new Float32Array(o),3,{instanceDivisor:1});let s=new l({phase:[`deferred`],frag:He,vert:We,uniforms:c.merge(t.uniforms)});this.entity.addComponent(_,{geometry:i,material:s})}}})))()}var Ye;function Xe(){return(Xe=e((()=>{Ye=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}
// 宣言順はvert_h.part.glslのoutと一致させる（WGSL変換時にロケーションが宣言順で振られるため）\r
in vec2 vUv;\r
in vec3 vViewNormal;\r
in vec3 vNormal;\r
in vec3 vMVPosition;\r
in vec3 vMVPPosition;\r
in vec3 vPos;\r
in vec2 vVelocity;\r
\r
uniform mat4 uModelMatrix;\r
uniform mat4 uModelMatrixInverse;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform vec3 uCameraPosition;\r
uniform vec2 uResolution;\r
\r
#ifdef IS_DEPTH\r
	uniform float uCameraNear;\r
	uniform float uCameraFar;\r
#endif\r
\r
#ifdef IS_DEFERRED\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
	layout (location = 3) out vec4 outColor3;\r
	layout (location = 4) out vec4 outColor4;\r
#endif\r
\r
#ifdef IS_FORWARD\r
	uniform sampler2D uDeferredTexture;\r
	uniform vec2 uDeferredResolution;\r
	uniform sampler2D uGbufferNormal;\r
	uniform sampler2D uGbufferAlbedo;\r
	uniform sampler2D uGbufferMaterial;\r
#endif\r
\r
#if defined(IS_FORWARD) || defined(IS_DEPTH)\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
#endif\r
\r
uniform float uTime;\r
uniform float uTimeF;\r
uniform float uTimeE;\r
uniform float uTimeEF;

uniform sampler2D uNoiseTex;

in float vNoise;
in vec3 vPosBase;

void main( void ) {

	vec4 outColor = vec4(1.0);\r
vec3 outNormal = normalize(vNormal);\r
vec3 outNormalMap = vec3( 0.0 );\r
float outSSN = 0.0;\r
vec3 outEmission = vec3(0.0);\r
float outRoughness = 0.5;\r
float outMetallic = 0.0;\r
vec3 outPos = vPos;\r
float outEnv = 1.0;

	vec4 noise = texture( uNoiseTex, vUv * 0.1 + 0.1 * texture( uNoiseTex, vUv * 0.5 ).xy );

	outRoughness = smoothstep( 0.2, 0.9, noise.x );
	outColor = vec4( 1.0 - ( outRoughness * 0.3 ) );

	outNormal.xz += noise.yz * 0.03;
	outNormal = normalize( outNormal );

	#if defined(IS_DEPTH) || defined(IS_DEFERRED)\r
	vec4 mv = uViewMatrix * vec4(outPos, 1.0);\r
#endif\r
\r
#ifdef IS_DEPTH\r
	float depth_z = (-mv.z - uCameraNear) / (uCameraFar - uCameraNear);\r
	outColor0 = vec4(floatToRGBA( depth_z ));\r
#endif\r
\r
#ifdef IS_DEFERRED\r
\r
	#ifdef USE_NORMAL_MAP \r
\r
		vec3 tangent;\r
		vec3 bitangent;\r
\r
		#ifdef USE_TANGENT\r
\r
			tangent = normalize( vTangent );\r
			bitangent = normalize( vBitangent );\r
\r
		#else\r
\r
			tangent = cross(outNormal, vec3( 0.0, 1.0, 0.0 ));\r
			bitangent = cross(tangent, outNormal);\r
\r
		#endif\r
\r
		#ifdef DOUBLE_SIDED\r
\r
			tangent *= faceDirection;\r
			bitangent *= faceDirection;\r
			\r
		#endif\r
\r
		mat3 vTBN = mat3( tangent, bitangent, outNormal );\r
		outNormal = normalize( vTBN * outNormalMap );\r
\r
	#endif\r
\r
	vec4 mvp = uProjectionMatrix * mv;\r
	gl_FragDepth = ( mvp.z / mvp.w ) * 0.5 + 0.5;\r
	outColor0 = vec4( outPos, outEmission.x );\r
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), outEmission.y );\r
	outColor2 = vec4( outColor.xyz, 0.0 );\r
	outColor3 = vec4( outRoughness, outMetallic, outSSN, outEnv );\r
	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r
#endif\r
\r
#ifdef IS_FORWARD\r
	outColor0 = outColor;\r
	outColor1 = vec4(outPos, 1.0);\r
	outColor2 = vec4(vVelocity, 0.0, 1.0);\r
#endif

}`})))()}var Ze;function Qe(){return(Qe=e((()=>{Ze=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}
uniform mat4 uModelMatrix;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform mat4 uNormalMatrix;\r
\r
uniform mat4 uModelMatrixPrev;\r
uniform mat4 uModelViewMatrix;\r
uniform mat4 uViewMatrixPrev;\r
uniform mat4 uProjectionMatrixPrev;\r
\r
out vec2 vUv;\r
out vec3 vViewNormal;\r
out vec3 vNormal;\r
out vec3 vMVPosition;\r
out vec3 vMVPPosition;\r
out vec3 vPos;\r
\r
out vec2 vVelocity;\r
\r
layout ( location = 0 ) in vec3 position;\r
layout ( location = 1 ) in vec2 uv;\r
layout ( location = 2 ) in vec3 normal;\r
\r
#ifdef TF_MODELER\r
	out vec3 o_position;\r
	out vec3 o_normal;\r
#endif\r
\r
uniform float uTime;\r
uniform float uTimeF;\r
uniform float uTimeE;\r
uniform float uTimeEF;
\r
// https://www.shadertoy.com/view/4dS3Wd\r
\r
float hashv(float p) { p = fract(p * 0.011); p *= p + 7.5; p *= p + p; return fract(p); }\r
float hashv(vec2 p) {vec3 p3 = fract(vec3(p.xyx) * 0.13); p3 += dot(p3, p3.yzx + 3.333); return fract((p3.x + p3.y) * p3.z); }\r
\r
#define NUM_NOISE_OCTAVES 5\r
\r
float noiseValue(vec3 x) {\r
    const vec3 step = vec3(110, 241, 171);\r
\r
    vec3 i = floor(x);\r
    vec3 f = fract(x);\r
 \r
    // For performance, compute the base input to a 1D hash from the integer part of the argument and the \r
    // incremental change to the 1D based on the 3D -> 1D wrapping\r
    float n = dot(i, step);\r
\r
    vec3 u = f * f * (3.0 - 2.0 * f);\r
    return mix(mix(mix( hashv(n + dot(step, vec3(0, 0, 0))), hashv(n + dot(step, vec3(1, 0, 0))), u.x),\r
                   mix( hashv(n + dot(step, vec3(0, 1, 0))), hashv(n + dot(step, vec3(1, 1, 0))), u.x), u.y),\r
               mix(mix( hashv(n + dot(step, vec3(0, 0, 1))), hashv(n + dot(step, vec3(1, 0, 1))), u.x),\r
                   mix( hashv(n + dot(step, vec3(0, 1, 1))), hashv(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z);\r
}\r
\r
float fbm(vec3 x) {\r
	float v = 0.0;\r
	float a = 0.5;\r
	vec3 shift = vec3(100);\r
	for (int i = 0; i < NUM_NOISE_OCTAVES; ++i) {\r
		v += a * noiseValue(x);\r
		x = x * 2.0 + shift;\r
		a *= 0.5;\r
    if( i == -1 ) break;\r
	}\r
	return v;\r
}\r
\r
float fbm(float x) {\r
  return fbm(vec3(x));\r
}

out float vNoise;
out vec3 vPosBase;

void main( void ) {

	vec3 outPos = position;\r
vec3 outNormal = normal;\r
vec2 outUv = uv;

	// outPos.x += sin( outPos.z  * 10.0 + uTime * 10.0) * 0.1;

	float n = 1.0;
	n *= step( noiseValue( floor( outPos * 100.0 * 10.0 ) / 10.0 + uTime * 10.0 ), 0.5 );
	n *= step( noiseValue( floor( outPos * 1.0 * 10.0 ) / 10.0 + vec3( 0.0, 0.0, uTime * 3.0 ) ), 0.2 ) * 2.0;

	// outPos *= 1.0 + n;
	vPosBase = outPos;
	vNoise = n;

	#ifdef TF_MODELER\r
		o_position = outPos;\r
		o_normal = outNormal;\r
		return;\r
#endif\r
\r
vec4 modelPosition = uModelMatrix * vec4(outPos, 1.0);\r
vec4 mvPosition = uViewMatrix * modelPosition;\r
gl_Position = uProjectionMatrix * mvPosition;\r
\r
vec4 modelPositionPrev = uModelMatrixPrev * vec4(outPos, 1.0);\r
vec4 mvPositionPrev = uViewMatrixPrev * modelPositionPrev;\r
vec4 positionPrev = uProjectionMatrixPrev * mvPositionPrev;\r
\r
vUv = outUv;\r
vViewNormal = normalize( (uNormalMatrix * vec4(outNormal, 0.0)).xyz );\r
vNormal = (uModelMatrix * vec4(outNormal, 0.0)).xyz;\r
vPos = modelPosition.xyz;\r
vMVPosition = mvPosition.xyz;\r
vMVPPosition = gl_Position.xyz / gl_Position.w;\r
\r
vVelocity = vMVPPosition.xy - positionPrev.xy / positionPrev.w;\r
vVelocity *= 0.2;

}`})))()}var $e=t({OREngineCube:()=>et}),et;function tt(){return(tt=e((()=>{f(),u(),Xe(),Qe(),et=class extends b{material;constructor(e){super(e);let t=this.engine;this.material=new l({name:`OREngineCube`,phase:[`shadowMap`,`deferred`],vert:p(`OREngineCubeVert`,Ze),frag:p(`OREngineCubeFrag`,Ye),uniforms:c.merge(t.uniforms,{uNoiseTex:{value:x.resources.getTexture(`noise`),type:`1i`}})});let n=this.entity.getComponent(_);n&&(n.material=this.material)}}})))()}var nt;function rt(){return(rt=e((()=>{nt=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}
// 宣言順はvert_h.part.glslのoutと一致させる（WGSL変換時にロケーションが宣言順で振られるため）\r
in vec2 vUv;\r
in vec3 vViewNormal;\r
in vec3 vNormal;\r
in vec3 vMVPosition;\r
in vec3 vMVPPosition;\r
in vec3 vPos;\r
in vec2 vVelocity;\r
\r
uniform mat4 uModelMatrix;\r
uniform mat4 uModelMatrixInverse;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform vec3 uCameraPosition;\r
uniform vec2 uResolution;\r
\r
#ifdef IS_DEPTH\r
	uniform float uCameraNear;\r
	uniform float uCameraFar;\r
#endif\r
\r
#ifdef IS_DEFERRED\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
	layout (location = 3) out vec4 outColor3;\r
	layout (location = 4) out vec4 outColor4;\r
#endif\r
\r
#ifdef IS_FORWARD\r
	uniform sampler2D uDeferredTexture;\r
	uniform vec2 uDeferredResolution;\r
	uniform sampler2D uGbufferNormal;\r
	uniform sampler2D uGbufferAlbedo;\r
	uniform sampler2D uGbufferMaterial;\r
#endif\r
\r
#if defined(IS_FORWARD) || defined(IS_DEPTH)\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
#endif\r
\r
uniform float uTime;\r
uniform float uTimeF;\r
uniform float uTimeE;\r
uniform float uTimeEF;

in float vNoise;
in vec3 vPosBase;

void main( void ) {

	vec4 outColor = vec4(1.0);\r
vec3 outNormal = normalize(vNormal);\r
vec3 outNormalMap = vec3( 0.0 );\r
float outSSN = 0.0;\r
vec3 outEmission = vec3(0.0);\r
float outRoughness = 0.5;\r
float outMetallic = 0.0;\r
vec3 outPos = vPos;\r
float outEnv = 1.0;

	float or = step( vPosBase.x, -0.2 );
	float flash = smoothstep(0.3, 0.0,  vNoise) * or;

	outEmission = vec3( (1.0 - flash * 0.7) * 3.0 );
	outRoughness = 0.3;

	#if defined(IS_DEPTH) || defined(IS_DEFERRED)\r
	vec4 mv = uViewMatrix * vec4(outPos, 1.0);\r
#endif\r
\r
#ifdef IS_DEPTH\r
	float depth_z = (-mv.z - uCameraNear) / (uCameraFar - uCameraNear);\r
	outColor0 = vec4(floatToRGBA( depth_z ));\r
#endif\r
\r
#ifdef IS_DEFERRED\r
\r
	#ifdef USE_NORMAL_MAP \r
\r
		vec3 tangent;\r
		vec3 bitangent;\r
\r
		#ifdef USE_TANGENT\r
\r
			tangent = normalize( vTangent );\r
			bitangent = normalize( vBitangent );\r
\r
		#else\r
\r
			tangent = cross(outNormal, vec3( 0.0, 1.0, 0.0 ));\r
			bitangent = cross(tangent, outNormal);\r
\r
		#endif\r
\r
		#ifdef DOUBLE_SIDED\r
\r
			tangent *= faceDirection;\r
			bitangent *= faceDirection;\r
			\r
		#endif\r
\r
		mat3 vTBN = mat3( tangent, bitangent, outNormal );\r
		outNormal = normalize( vTBN * outNormalMap );\r
\r
	#endif\r
\r
	vec4 mvp = uProjectionMatrix * mv;\r
	gl_FragDepth = ( mvp.z / mvp.w ) * 0.5 + 0.5;\r
	outColor0 = vec4( outPos, outEmission.x );\r
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), outEmission.y );\r
	outColor2 = vec4( outColor.xyz, 0.0 );\r
	outColor3 = vec4( outRoughness, outMetallic, outSSN, outEnv );\r
	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r
#endif\r
\r
#ifdef IS_FORWARD\r
	outColor0 = outColor;\r
	outColor1 = vec4(outPos, 1.0);\r
	outColor2 = vec4(vVelocity, 0.0, 1.0);\r
#endif

}`})))()}var it;function at(){return(at=e((()=>{it=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}
uniform mat4 uModelMatrix;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform mat4 uNormalMatrix;\r
\r
uniform mat4 uModelMatrixPrev;\r
uniform mat4 uModelViewMatrix;\r
uniform mat4 uViewMatrixPrev;\r
uniform mat4 uProjectionMatrixPrev;\r
\r
out vec2 vUv;\r
out vec3 vViewNormal;\r
out vec3 vNormal;\r
out vec3 vMVPosition;\r
out vec3 vMVPPosition;\r
out vec3 vPos;\r
\r
out vec2 vVelocity;\r
\r
layout ( location = 0 ) in vec3 position;\r
layout ( location = 1 ) in vec2 uv;\r
layout ( location = 2 ) in vec3 normal;\r
\r
#ifdef TF_MODELER\r
	out vec3 o_position;\r
	out vec3 o_normal;\r
#endif\r
\r
uniform float uTime;\r
uniform float uTimeF;\r
uniform float uTimeE;\r
uniform float uTimeEF;
\r
// https://www.shadertoy.com/view/4dS3Wd\r
\r
float hashv(float p) { p = fract(p * 0.011); p *= p + 7.5; p *= p + p; return fract(p); }\r
float hashv(vec2 p) {vec3 p3 = fract(vec3(p.xyx) * 0.13); p3 += dot(p3, p3.yzx + 3.333); return fract((p3.x + p3.y) * p3.z); }\r
\r
#define NUM_NOISE_OCTAVES 5\r
\r
float noiseValue(vec3 x) {\r
    const vec3 step = vec3(110, 241, 171);\r
\r
    vec3 i = floor(x);\r
    vec3 f = fract(x);\r
 \r
    // For performance, compute the base input to a 1D hash from the integer part of the argument and the \r
    // incremental change to the 1D based on the 3D -> 1D wrapping\r
    float n = dot(i, step);\r
\r
    vec3 u = f * f * (3.0 - 2.0 * f);\r
    return mix(mix(mix( hashv(n + dot(step, vec3(0, 0, 0))), hashv(n + dot(step, vec3(1, 0, 0))), u.x),\r
                   mix( hashv(n + dot(step, vec3(0, 1, 0))), hashv(n + dot(step, vec3(1, 1, 0))), u.x), u.y),\r
               mix(mix( hashv(n + dot(step, vec3(0, 0, 1))), hashv(n + dot(step, vec3(1, 0, 1))), u.x),\r
                   mix( hashv(n + dot(step, vec3(0, 1, 1))), hashv(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z);\r
}\r
\r
float fbm(vec3 x) {\r
	float v = 0.0;\r
	float a = 0.5;\r
	vec3 shift = vec3(100);\r
	for (int i = 0; i < NUM_NOISE_OCTAVES; ++i) {\r
		v += a * noiseValue(x);\r
		x = x * 2.0 + shift;\r
		a *= 0.5;\r
    if( i == -1 ) break;\r
	}\r
	return v;\r
}\r
\r
float fbm(float x) {\r
  return fbm(vec3(x));\r
}

out float vNoise;
out vec3 vPosBase;

void main( void ) {

	vec3 outPos = position;\r
vec3 outNormal = normal;\r
vec2 outUv = uv;

	vPosBase = outPos;
	vNoise = noiseValue( vec3( uTimeE * 8.0 ) );

	#ifdef TF_MODELER\r
		o_position = outPos;\r
		o_normal = outNormal;\r
		return;\r
#endif\r
\r
vec4 modelPosition = uModelMatrix * vec4(outPos, 1.0);\r
vec4 mvPosition = uViewMatrix * modelPosition;\r
gl_Position = uProjectionMatrix * mvPosition;\r
\r
vec4 modelPositionPrev = uModelMatrixPrev * vec4(outPos, 1.0);\r
vec4 mvPositionPrev = uViewMatrixPrev * modelPositionPrev;\r
vec4 positionPrev = uProjectionMatrixPrev * mvPositionPrev;\r
\r
vUv = outUv;\r
vViewNormal = normalize( (uNormalMatrix * vec4(outNormal, 0.0)).xyz );\r
vNormal = (uModelMatrix * vec4(outNormal, 0.0)).xyz;\r
vPos = modelPosition.xyz;\r
vMVPosition = mvPosition.xyz;\r
vMVPPosition = gl_Position.xyz / gl_Position.w;\r
\r
vVelocity = vMVPPosition.xy - positionPrev.xy / positionPrev.w;\r
vVelocity *= 0.2;

}`})))()}var ot=t({OREngineLogo:()=>st}),st;function ct(){return(ct=e((()=>{f(),rt(),at(),st=class extends b{material;constructor(e){super(e);let t=this.engine;this.material=new l({name:`OREngineLogo`,phase:[`deferred`,`shadowMap`],vert:p(`OREngineLogoVert`,it),frag:p(`OREngineLogoFrag`,nt),uniforms:c.merge(t.uniforms)});let n=this.entity.getComponent(_);n&&(n.material=this.material)}}})))()}var lt;function ut(){return(ut=e((()=>{lt=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}
// 宣言順はvert_h.part.glslのoutと一致させる（WGSL変換時にロケーションが宣言順で振られるため）\r
in vec2 vUv;\r
in vec3 vViewNormal;\r
in vec3 vNormal;\r
in vec3 vMVPosition;\r
in vec3 vMVPPosition;\r
in vec3 vPos;\r
in vec2 vVelocity;\r
\r
uniform mat4 uModelMatrix;\r
uniform mat4 uModelMatrixInverse;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform vec3 uCameraPosition;\r
uniform vec2 uResolution;\r
\r
#ifdef IS_DEPTH\r
	uniform float uCameraNear;\r
	uniform float uCameraFar;\r
#endif\r
\r
#ifdef IS_DEFERRED\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
	layout (location = 3) out vec4 outColor3;\r
	layout (location = 4) out vec4 outColor4;\r
#endif\r
\r
#ifdef IS_FORWARD\r
	uniform sampler2D uDeferredTexture;\r
	uniform vec2 uDeferredResolution;\r
	uniform sampler2D uGbufferNormal;\r
	uniform sampler2D uGbufferAlbedo;\r
	uniform sampler2D uGbufferMaterial;\r
#endif\r
\r
#if defined(IS_FORWARD) || defined(IS_DEPTH)\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
#endif\r
\r
uniform float uTime;\r
uniform float uTimeF;\r
uniform float uTimeE;\r
uniform float uTimeEF;
struct DirectionalLight {\r
	vec3 direction;\r
	vec3 color;\r
};\r
\r
struct SpotLight {\r
	vec3 position;\r
	vec3 direction;\r
	vec3 color;\r
	float angle;\r
	float blend;\r
	float distance;\r
	float decay;\r
};\r
\r
struct LightCamera {\r
	float near;\r
	float far;\r
	mat4 uViewMatrix;\r
	mat4 uProjectionMatrix;\r
	vec2 resolution;\r
};\r
\r
struct Light {\r
	vec3 direction;\r
	vec3 color;\r
};\r
\r
#if NUM_LIGHT_DIR > 0 \r
\r
	uniform DirectionalLight directionalLight[NUM_LIGHT_DIR];\r
	uniform LightCamera uDirectionalLightCamera[NUM_LIGHT_DIR];\r
	uniform sampler2D directionalLightShadowMap[NUM_SHADOWMAP_DIR];\r
	\r
#endif\r
\r
#if NUM_LIGHT_SPOT > 0 \r
\r
	uniform SpotLight uSpotLight[NUM_LIGHT_SPOT];\r
	uniform LightCamera uSpotLightCamera[NUM_LIGHT_SPOT];\r
	uniform sampler2D uSpotLightShadowMap[NUM_SHADOWMAP_SPOT];\r
	\r
#endif\r
\r
// shadowmap\r
\r
float compareShadowDepth( float lightDepth, sampler2D shadowMap, vec2 shadowCoord, float depthOffset ) {\r
\r
	float shadowMapDepth = rgbaToFloat( texture( shadowMap, shadowCoord ) );\r
\r
	if( shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0 ) {\r
\r
		return step( lightDepth, shadowMapDepth + depthOffset );\r
\r
	}\r
\r
	return 1.0;\r
\r
}\r
\r
// shadow\r
\r
void setShadowCoord( vec3 pos, LightCamera camera, inout vec2 shadowCoord, inout float lightDepth ) {\r
	\r
	vec4 mvPosition = camera.uViewMatrix * vec4( pos, 1.0 );\r
	vec4 mvpPosition = camera.uProjectionMatrix * mvPosition;\r
	shadowCoord = ( mvpPosition.xy / mvpPosition.w ) * 0.5 + 0.5;\r
	\r
	float lightNear = camera.near;\r
	float lightFar = camera.far;\r
	lightDepth = ( -mvPosition.z - lightNear ) / ( lightFar - lightNear );\r
\r
}\r
\r
float getShadow( vec3 pos, LightCamera camera, sampler2D shadowMap, float depthOffset ) {\r
\r
	vec2 shadowCoord;\r
	float lightDepth;\r
\r
	setShadowCoord( pos, camera, shadowCoord, lightDepth );\r
\r
	return compareShadowDepth( lightDepth, shadowMap, shadowCoord, depthOffset );\r
\r
}\r
\r
#define SHADOW_SAMPLE_COUNT 2\r
\r
float getShadowSmooth( vec3 pos, LightCamera camera, sampler2D shadowMap, float depthOffset ) {\r
\r
	vec2 shadowCoord;\r
	float lightDepth;\r
\r
	setShadowCoord( pos, camera, shadowCoord, lightDepth );\r
	\r
	float shadowSum = compareShadowDepth( lightDepth, shadowMap, shadowCoord, depthOffset );\r
\r
	for( int i = 0; i < SHADOW_SAMPLE_COUNT; i++ ) {\r
\r
		vec2 offset = 1.0 / camera.resolution * ( float( i + 1 ) / float(SHADOW_SAMPLE_COUNT) );\r
\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, -offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( 0.0, -offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, -offset.y ), depthOffset );\r
		\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, 0.0 ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, 0.0 ), depthOffset );\r
\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( 0.0, offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, offset.y ), depthOffset );\r
\r
	}\r
\r
	return shadowSum / ( float( SHADOW_SAMPLE_COUNT ) * 8.0 );\r
\r
}\r
\r
float ggx( float dNH, float roughness ) {\r
	\r
	float a2 = roughness * roughness;\r
	a2 = a2 * a2;\r
	float dNH2 = dNH * dNH;\r
\r
	if( dNH2 <= 0.0 ) return 0.0;\r
\r
	return a2 / ( PI * pow( dNH2 * ( a2 - 1.0 ) + 1.0, 2.0) );\r
\r
}\r
\r
vec3 lambert( vec3 diffuseColor ) {\r
\r
	return diffuseColor / PI;\r
\r
}\r
\r
float gSchlick( float d, float k ) {\r
\r
	if( d == 0.0 ) return 0.0;\r
\r
	return d / ( d * ( 1.0 - k ) + k );\r
	\r
}\r
\r
float gSmith( float dNV, float dNL, float roughness ) {\r
\r
	float k = clamp( roughness * sqrt( 2.0 / PI ), 0.0, 1.0 );\r
\r
	return gSchlick( dNV, k ) * gSchlick( dNL, k );\r
	\r
}\r
\r
float fresnel( float d ) {\r
	\r
	float f0 = 0.04;\r
\r
	return f0 + ( 1.0 - f0 ) * pow( 1.0 - d, 5.0 );\r
\r
}\r
\r
vec3 RE( Geometry geo, Material mat, Light light) {\r
\r
	vec3 lightDir = normalize( light.direction );\r
	vec3 halfVec = normalize( geo.viewDir + lightDir );\r
\r
	float dLH = clamp( dot( lightDir, halfVec ), 0.0, 1.0 );\r
	float dNH = clamp( dot( geo.normal, halfVec ), 0.0, 1.0 );\r
	float dNV = clamp( dot( geo.normal, geo.viewDir ), 0.0, 1.0 );\r
	float dNL = clamp( dot( geo.normal, lightDir), 0.0, 1.0 );\r
\r
	vec3 irradiance = light.color * dNL;\r
\r
	// diffuse\r
	vec3 diffuse = lambert( mat.diffuseColor ) * irradiance;\r
\r
	// specular\r
	float D = ggx( dNH, mat.roughness );\r
	float G = gSmith( dNV, dNL, mat.roughness );\r
	float F = fresnel( dLH );\r
	\r
	vec3 specular = (( D * G * F ) / ( 4.0 * dNL * dNV + 0.0001 ) * mat.specularColor ) * irradiance; \r
\r
	vec3 c = vec3( 0.0 );\r
	c += diffuse * ( 1.0 - F ) + specular;\r
\r
	return c;\r
\r
}

in float vAlpha;

void main( void ) {

	vec4 outColor = vec4(1.0);\r
vec3 outNormal = normalize(vNormal);\r
vec3 outNormalMap = vec3( 0.0 );\r
float outSSN = 0.0;\r
vec3 outEmission = vec3(0.0);\r
float outRoughness = 0.5;\r
float outMetallic = 0.0;\r
vec3 outPos = vPos;\r
float outEnv = 1.0;

	float circle = smoothstep( 0.5, 0.4, length( gl_PointCoord.xy - 0.5 ) );
	
	if( circle == 0.0 ) discard;

	Geometry geo = Geometry(
		vPos,
		vec3( 0.0, 0.0, 0.0 ),
		0.0,
		normalize( uCameraPosition - vPos ),
		vec3( 0.0 ),
		0.0
	);

	vec3 color = vec3( 0.0 );
	float s = 0.0;

	outColor = vec4( vec3( 1.0 ), circle * 0.2 * ( vAlpha ) );

	#if defined(IS_DEPTH) || defined(IS_DEFERRED)\r
	vec4 mv = uViewMatrix * vec4(outPos, 1.0);\r
#endif\r
\r
#ifdef IS_DEPTH\r
	float depth_z = (-mv.z - uCameraNear) / (uCameraFar - uCameraNear);\r
	outColor0 = vec4(floatToRGBA( depth_z ));\r
#endif\r
\r
#ifdef IS_DEFERRED\r
\r
	#ifdef USE_NORMAL_MAP \r
\r
		vec3 tangent;\r
		vec3 bitangent;\r
\r
		#ifdef USE_TANGENT\r
\r
			tangent = normalize( vTangent );\r
			bitangent = normalize( vBitangent );\r
\r
		#else\r
\r
			tangent = cross(outNormal, vec3( 0.0, 1.0, 0.0 ));\r
			bitangent = cross(tangent, outNormal);\r
\r
		#endif\r
\r
		#ifdef DOUBLE_SIDED\r
\r
			tangent *= faceDirection;\r
			bitangent *= faceDirection;\r
			\r
		#endif\r
\r
		mat3 vTBN = mat3( tangent, bitangent, outNormal );\r
		outNormal = normalize( vTBN * outNormalMap );\r
\r
	#endif\r
\r
	vec4 mvp = uProjectionMatrix * mv;\r
	gl_FragDepth = ( mvp.z / mvp.w ) * 0.5 + 0.5;\r
	outColor0 = vec4( outPos, outEmission.x );\r
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), outEmission.y );\r
	outColor2 = vec4( outColor.xyz, 0.0 );\r
	outColor3 = vec4( outRoughness, outMetallic, outSSN, outEnv );\r
	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r
#endif\r
\r
#ifdef IS_FORWARD\r
	outColor0 = outColor;\r
	outColor1 = vec4(outPos, 1.0);\r
	outColor2 = vec4(vVelocity, 0.0, 1.0);\r
#endif

}`})))()}var dt;function ft(){return(ft=e((()=>{dt=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}
uniform mat4 uModelMatrix;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform mat4 uNormalMatrix;\r
\r
uniform mat4 uModelMatrixPrev;\r
uniform mat4 uModelViewMatrix;\r
uniform mat4 uViewMatrixPrev;\r
uniform mat4 uProjectionMatrixPrev;\r
\r
out vec2 vUv;\r
out vec3 vViewNormal;\r
out vec3 vNormal;\r
out vec3 vMVPosition;\r
out vec3 vMVPPosition;\r
out vec3 vPos;\r
\r
out vec2 vVelocity;\r
\r
layout ( location = 0 ) in vec3 position;\r
layout ( location = 1 ) in vec2 uv;\r
layout ( location = 2 ) in vec3 normal;\r
\r
#ifdef TF_MODELER\r
	out vec3 o_position;\r
	out vec3 o_normal;\r
#endif\r
\r
uniform float uTime;\r
uniform float uTimeF;\r
uniform float uTimeE;\r
uniform float uTimeEF;

out float vAlpha;

uniform vec2 uDeferredResolution;

void main( void ) {

	vec3 outPos = position;\r
vec3 outNormal = normal;\r
vec2 outUv = uv;

	float t = uTimeE * 0.1;
	outPos.x += sin( position.y * 2.3 + t * 2.0 ) * 0.4;
	outPos.y += sin( position.x * 1.0 + t * 1.0 ) * 0.3;
	
	#ifdef TF_MODELER\r
		o_position = outPos;\r
		o_normal = outNormal;\r
		return;\r
#endif\r
\r
vec4 modelPosition = uModelMatrix * vec4(outPos, 1.0);\r
vec4 mvPosition = uViewMatrix * modelPosition;\r
gl_Position = uProjectionMatrix * mvPosition;\r
\r
vec4 modelPositionPrev = uModelMatrixPrev * vec4(outPos, 1.0);\r
vec4 mvPositionPrev = uViewMatrixPrev * modelPositionPrev;\r
vec4 positionPrev = uProjectionMatrixPrev * mvPositionPrev;\r
\r
vUv = outUv;\r
vViewNormal = normalize( (uNormalMatrix * vec4(outNormal, 0.0)).xyz );\r
vNormal = (uModelMatrix * vec4(outNormal, 0.0)).xyz;\r
vPos = modelPosition.xyz;\r
vMVPosition = mvPosition.xyz;\r
vMVPPosition = gl_Position.xyz / gl_Position.w;\r
\r
vVelocity = vMVPPosition.xy - positionPrev.xy / positionPrev.w;\r
vVelocity *= 0.2;

	vAlpha = smoothstep( -20.0, -1.0, mvPosition.z);
	gl_PointSize = uDeferredResolution.y * 0.007 + uDeferredResolution.y * 0.02 * vAlpha;
	gl_PointSize *= 0.5;

}`})))()}var pt=t({Dust:()=>mt}),mt;function ht(){return(ht=e((()=>{d(),f(),ut(),ft(),mt=class extends b{constructor(e){super(e);let t=this.engine,n=new fe,r=e.args?.num||2048,i=new h(20,5,20),a=[],o=[];for(let e=0;e<r;e++)a.push((Math.random()-.5)*i.x),a.push((Math.random()-.5)*i.y),a.push((Math.random()-.5)*i.z),o.push(Math.random());n.setAttribute(`position`,new Float32Array(a),3);let s=new l({phase:[`forward`],drawType:`POINTS`,frag:lt,vert:dt,uniforms:c.merge(t.uniforms)});this.entity.addComponent(_,{geometry:n,material:s})}dispose(){super.dispose(),this.entity.removeComponent(_)}}})))()}var gt;function _t(){return(_t=e((()=>{gt=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}
// 宣言順はvert_h.part.glslのoutと一致させる（WGSL変換時にロケーションが宣言順で振られるため）\r
in vec2 vUv;\r
in vec3 vViewNormal;\r
in vec3 vNormal;\r
in vec3 vMVPosition;\r
in vec3 vMVPPosition;\r
in vec3 vPos;\r
in vec2 vVelocity;\r
\r
uniform mat4 uModelMatrix;\r
uniform mat4 uModelMatrixInverse;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform vec3 uCameraPosition;\r
uniform vec2 uResolution;\r
\r
#ifdef IS_DEPTH\r
	uniform float uCameraNear;\r
	uniform float uCameraFar;\r
#endif\r
\r
#ifdef IS_DEFERRED\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
	layout (location = 3) out vec4 outColor3;\r
	layout (location = 4) out vec4 outColor4;\r
#endif\r
\r
#ifdef IS_FORWARD\r
	uniform sampler2D uDeferredTexture;\r
	uniform vec2 uDeferredResolution;\r
	uniform sampler2D uGbufferNormal;\r
	uniform sampler2D uGbufferAlbedo;\r
	uniform sampler2D uGbufferMaterial;\r
#endif\r
\r
#if defined(IS_FORWARD) || defined(IS_DEPTH)\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
#endif\r
\r
uniform float uTime;\r
uniform float uTimeF;\r
uniform float uTimeE;\r
uniform float uTimeEF;

void main( void ) {

	vec4 outColor = vec4(1.0);\r
vec3 outNormal = normalize(vNormal);\r
vec3 outNormalMap = vec3( 0.0 );\r
float outSSN = 0.0;\r
vec3 outEmission = vec3(0.0);\r
float outRoughness = 0.5;\r
float outMetallic = 0.0;\r
vec3 outPos = vPos;\r
float outEnv = 1.0;

	outColor.xyz = vec3( 1.0 );

	#ifdef IS_FORWARD

		outColor = vec4( 0.5 );
	
	#endif

	outSSN = 1.0;

	
	#if defined(IS_DEPTH) || defined(IS_DEFERRED)\r
	vec4 mv = uViewMatrix * vec4(outPos, 1.0);\r
#endif\r
\r
#ifdef IS_DEPTH\r
	float depth_z = (-mv.z - uCameraNear) / (uCameraFar - uCameraNear);\r
	outColor0 = vec4(floatToRGBA( depth_z ));\r
#endif\r
\r
#ifdef IS_DEFERRED\r
\r
	#ifdef USE_NORMAL_MAP \r
\r
		vec3 tangent;\r
		vec3 bitangent;\r
\r
		#ifdef USE_TANGENT\r
\r
			tangent = normalize( vTangent );\r
			bitangent = normalize( vBitangent );\r
\r
		#else\r
\r
			tangent = cross(outNormal, vec3( 0.0, 1.0, 0.0 ));\r
			bitangent = cross(tangent, outNormal);\r
\r
		#endif\r
\r
		#ifdef DOUBLE_SIDED\r
\r
			tangent *= faceDirection;\r
			bitangent *= faceDirection;\r
			\r
		#endif\r
\r
		mat3 vTBN = mat3( tangent, bitangent, outNormal );\r
		outNormal = normalize( vTBN * outNormalMap );\r
\r
	#endif\r
\r
	vec4 mvp = uProjectionMatrix * mv;\r
	gl_FragDepth = ( mvp.z / mvp.w ) * 0.5 + 0.5;\r
	outColor0 = vec4( outPos, outEmission.x );\r
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), outEmission.y );\r
	outColor2 = vec4( outColor.xyz, 0.0 );\r
	outColor3 = vec4( outRoughness, outMetallic, outSSN, outEnv );\r
	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r
#endif\r
\r
#ifdef IS_FORWARD\r
	outColor0 = outColor;\r
	outColor1 = vec4(outPos, 1.0);\r
	outColor2 = vec4(vVelocity, 0.0, 1.0);\r
#endif

}`})))()}var vt;function yt(){return(yt=e((()=>{vt=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}
uniform mat4 uModelMatrix;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform mat4 uNormalMatrix;\r
\r
uniform mat4 uModelMatrixPrev;\r
uniform mat4 uModelViewMatrix;\r
uniform mat4 uViewMatrixPrev;\r
uniform mat4 uProjectionMatrixPrev;\r
\r
out vec2 vUv;\r
out vec3 vViewNormal;\r
out vec3 vNormal;\r
out vec3 vMVPosition;\r
out vec3 vMVPPosition;\r
out vec3 vPos;\r
\r
out vec2 vVelocity;\r
\r
layout ( location = 0 ) in vec3 position;\r
layout ( location = 1 ) in vec2 uv;\r
layout ( location = 2 ) in vec3 normal;\r
\r
#ifdef TF_MODELER\r
	out vec3 o_position;\r
	out vec3 o_normal;\r
#endif\r
\r
uniform float uTime;\r
uniform float uTimeF;\r
uniform float uTimeE;\r
uniform float uTimeEF;

layout (location = 3) in vec2 trailId;
layout (location = 4) in vec3 id;
layout (location = 5) in float posY;

uniform sampler2D uGPUSampler0;
uniform sampler2D uGPUSampler1;
uniform vec2 uGPUResolution;

mat2 rotate(float rad) {\r
  return mat2(cos(rad), sin(rad), -sin(rad), cos(rad));\r
}\r
\r
void rotate( float rad, inout vec2 pos, inout vec2 normal ) {\r
	\r
	mat2 rot = rotate( rad );\r
	\r
	pos *= rot;\r
	normal *= rot;\r
\r
}\r
\r
mat3 makeRotationDir( vec3 direction, vec3 up ) {\r
\r
	vec3 xaxis = normalize( cross( up, direction ) );\r
	vec3 yaxis = normalize( cross( direction, xaxis ) );\r
\r
	return mat3(\r
		xaxis.x, yaxis.x, direction.x,\r
		xaxis.y, yaxis.y, direction.y,\r
		xaxis.z, yaxis.z, direction.z\r
	);\r
\r
}

void main( void ) {

	vec3 outPos = position;\r
vec3 outNormal = normal;\r
vec2 outUv = uv;

	float uid = id.x + id.y * 128.0;

	vec4 comPosBuffer = texture( uGPUSampler0, vec2( posY * 1.0, trailId ) );
	vec4 comVelBuffer = texture( uGPUSampler1, vec2( posY * 1.0, trailId ) );
    vec4 nextPosBuffer = texture( uGPUSampler0, vec2( posY - 1.0 / uGPUResolution.x, trailId ) );

	vec3 offsetPosition = comPosBuffer.xyz;

	// outPos.xz *= sin( trailId * TPI ) * 0.5 + 0.5;
	// outPos.xz *= sin( posY * PI ) * 1.0;
	
    vec3 delta = ( comPosBuffer.xyz - nextPosBuffer.xyz );
	vec3 vec = normalize( delta );

	mat2 offsetRot = rotate( PI / 2.0 );
	outPos.yz *= offsetRot;
	outNormal.yz *= offsetRot;

	mat3 rot = makeRotationDir(-vec, vec3( 0.0, -1.0, 0.0 ) );
	outPos *= rot;
	outNormal *= rot;

	outPos += offsetPosition;

	#ifdef TF_MODELER\r
		o_position = outPos;\r
		o_normal = outNormal;\r
		return;\r
#endif\r
\r
vec4 modelPosition = uModelMatrix * vec4(outPos, 1.0);\r
vec4 mvPosition = uViewMatrix * modelPosition;\r
gl_Position = uProjectionMatrix * mvPosition;\r
\r
vec4 modelPositionPrev = uModelMatrixPrev * vec4(outPos, 1.0);\r
vec4 mvPositionPrev = uViewMatrixPrev * modelPositionPrev;\r
vec4 positionPrev = uProjectionMatrixPrev * mvPositionPrev;\r
\r
vUv = outUv;\r
vViewNormal = normalize( (uNormalMatrix * vec4(outNormal, 0.0)).xyz );\r
vNormal = (uModelMatrix * vec4(outNormal, 0.0)).xyz;\r
vPos = modelPosition.xyz;\r
vMVPosition = mvPosition.xyz;\r
vMVPPosition = gl_Position.xyz / gl_Position.w;\r
\r
vVelocity = vMVPPosition.xy - positionPrev.xy / positionPrev.w;\r
vVelocity *= 0.2;
	
}`})))()}var bt;function xt(){return(xt=e((()=>{bt=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}
\r
// https://github.com/ashima/webgl-noise/blob/master/src/noise4D.glsl\r
\r
//\r
// Description : Array and textureless GLSL 2D/3D/4D simplex \r
//               noise functions.\r
//      Author : Ian McEwan, Ashima Arts.\r
//  Maintainer : stegu\r
//     Lastmod : 20110822 (ijm)\r
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\r
//               Distributed under the MIT License. See LICENSE file.\r
//               https://github.com/ashima/webgl-noise\r
//               https://github.com/stegu/webgl-noise\r
// \r
\r
vec4 mod289(vec4 x) {\r
  return x - floor(x * (1.0 / 289.0)) * 289.0; }\r
\r
vec3 mod289(vec3 x) {\r
  return x - floor(x * (1.0 / 289.0)) * 289.0;\r
}\r
\r
float mod289(float x) {\r
  return x - floor(x * (1.0 / 289.0)) * 289.0; }\r
\r
vec4 permute(vec4 x) {\r
     return mod289(((x*34.0)+10.0)*x);\r
}\r
\r
float permute(float x) {\r
     return mod289(((x*34.0)+10.0)*x);\r
}\r
\r
vec4 taylorInvSqrt(vec4 r)\r
{\r
  return 1.79284291400159 - 0.85373472095314 * r;\r
}\r
\r
float taylorInvSqrt(float r)\r
{\r
  return 1.79284291400159 - 0.85373472095314 * r;\r
}\r
\r
vec4 grad4(float j, vec4 ip)\r
  {\r
  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);\r
  vec4 p,s;\r
\r
  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;\r
  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);\r
  s = vec4(lessThan(p, vec4(0.0)));\r
  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www; \r
\r
  return p;\r
  }\r
						\r
// (sqrt(5) - 1)/4 = F4, used once below\r
#define F4 0.309016994374947451\r
\r
float noiseSimplex(vec4 v)\r
  {\r
  const vec4  C = vec4( 0.138196601125011,  // (5 - sqrt(5))/20  G4\r
                        0.276393202250021,  // 2 * G4\r
                        0.414589803375032,  // 3 * G4\r
                       -0.447213595499958); // -1 + 4 * G4\r
\r
// First corner\r
  vec4 i  = floor(v + dot(v, vec4(F4)) );\r
  vec4 x0 = v -   i + dot(i, C.xxxx);\r
\r
// Other corners\r
\r
// Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)\r
  vec4 i0;\r
  vec3 isX = step( x0.yzw, x0.xxx );\r
  vec3 isYZ = step( x0.zww, x0.yyz );\r
//  i0.x = dot( isX, vec3( 1.0 ) );\r
  i0.x = isX.x + isX.y + isX.z;\r
  i0.yzw = 1.0 - isX;\r
//  i0.y += dot( isYZ.xy, vec2( 1.0 ) );\r
  i0.y += isYZ.x + isYZ.y;\r
  i0.zw += 1.0 - isYZ.xy;\r
  i0.z += isYZ.z;\r
  i0.w += 1.0 - isYZ.z;\r
\r
  // i0 now contains the unique values 0,1,2,3 in each channel\r
  vec4 i3 = clamp( i0, 0.0, 1.0 );\r
  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );\r
  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );\r
\r
  //  x0 = x0 - 0.0 + 0.0 * C.xxxx\r
  //  x1 = x0 - i1  + 1.0 * C.xxxx\r
  //  x2 = x0 - i2  + 2.0 * C.xxxx\r
  //  x3 = x0 - i3  + 3.0 * C.xxxx\r
  //  x4 = x0 - 1.0 + 4.0 * C.xxxx\r
  vec4 x1 = x0 - i1 + C.xxxx;\r
  vec4 x2 = x0 - i2 + C.yyyy;\r
  vec4 x3 = x0 - i3 + C.zzzz;\r
  vec4 x4 = x0 + C.wwww;\r
\r
// Permutations\r
  i = mod289(i); \r
  float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);\r
  vec4 j1 = permute( permute( permute( permute (\r
             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))\r
           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))\r
           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))\r
           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));\r
\r
// Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope\r
// 7*7*6 = 294, which is close to the ring size 17*17 = 289.\r
  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;\r
\r
  vec4 p0 = grad4(j0,   ip);\r
  vec4 p1 = grad4(j1.x, ip);\r
  vec4 p2 = grad4(j1.y, ip);\r
  vec4 p3 = grad4(j1.z, ip);\r
  vec4 p4 = grad4(j1.w, ip);\r
\r
// Normalise gradients\r
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\r
  p0 *= norm.x;\r
  p1 *= norm.y;\r
  p2 *= norm.z;\r
  p3 *= norm.w;\r
  p4 *= taylorInvSqrt(dot(p4,p4));\r
\r
// Mix contributions from the five corners\r
  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);\r
  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);\r
  m0 = m0 * m0;\r
  m1 = m1 * m1;\r
  return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))\r
               + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;\r
\r
  }\r
\r
//\r
// Description : Array and textureless GLSL 2D/3D/4D simplex \r
//               noise functions.\r
//      Author : Ian McEwan, Ashima Arts.\r
//  Maintainer : stegu\r
//     Lastmod : 20201014 (stegu)\r
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\r
//               Distributed under the MIT License. See LICENSE file.\r
//               https://github.com/ashima/webgl-noise\r
//               https://github.com/stegu/webgl-noise\r
// \r
\r
\r
float noiseSimplex(vec3 v)\r
  { \r
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\r
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\r
\r
// First corner\r
  vec3 i  = floor(v + dot(v, C.yyy) );\r
  vec3 x0 =   v - i + dot(i, C.xxx) ;\r
\r
// Other corners\r
  vec3 g = step(x0.yzx, x0.xyz);\r
  vec3 l = 1.0 - g;\r
  vec3 i1 = min( g.xyz, l.zxy );\r
  vec3 i2 = max( g.xyz, l.zxy );\r
\r
  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\r
  //   x1 = x0 - i1  + 1.0 * C.xxx;\r
  //   x2 = x0 - i2  + 2.0 * C.xxx;\r
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\r
  vec3 x1 = x0 - i1 + C.xxx;\r
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\r
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\r
\r
// Permutations\r
  i = mod289(i); \r
  vec4 p = permute( permute( permute( \r
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\r
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) \r
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\r
\r
// Gradients: 7x7 points over a square, mapped onto an octahedron.\r
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\r
  float n_ = 0.142857142857; // 1.0/7.0\r
  vec3  ns = n_ * D.wyz - D.xzx;\r
\r
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\r
\r
  vec4 x_ = floor(j * ns.z);\r
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\r
\r
  vec4 x = x_ *ns.x + ns.yyyy;\r
  vec4 y = y_ *ns.x + ns.yyyy;\r
  vec4 h = 1.0 - abs(x) - abs(y);\r
\r
  vec4 b0 = vec4( x.xy, y.xy );\r
  vec4 b1 = vec4( x.zw, y.zw );\r
\r
  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\r
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\r
  vec4 s0 = floor(b0)*2.0 + 1.0;\r
  vec4 s1 = floor(b1)*2.0 + 1.0;\r
  vec4 sh = -step(h, vec4(0.0));\r
\r
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\r
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\r
\r
  vec3 p0 = vec3(a0.xy,h.x);\r
  vec3 p1 = vec3(a0.zw,h.y);\r
  vec3 p2 = vec3(a1.xy,h.z);\r
  vec3 p3 = vec3(a1.zw,h.w);\r
\r
//Normalise gradients\r
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\r
  p0 *= norm.x;\r
  p1 *= norm.y;\r
  p2 *= norm.z;\r
  p3 *= norm.w;\r
\r
// Mix final noise value\r
  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\r
  m = m * m;\r
  return 105.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), \r
                                dot(p2,x2), dot(p3,x3) ) );\r
  }

layout (location = 0) out vec4 outColor0;
layout (location = 1) out vec4 outColor1;

uniform sampler2D uGPUSampler0;
uniform sampler2D uGPUSampler1;
uniform float uTimeE;
uniform vec2 uGPUResolution;

in vec2 vUv;

mat2 rotate(float rad) {\r
  return mat2(cos(rad), sin(rad), -sin(rad), cos(rad));\r
}\r
\r
void rotate( float rad, inout vec2 pos, inout vec2 normal ) {\r
	\r
	mat2 rot = rotate( rad );\r
	\r
	pos *= rot;\r
	normal *= rot;\r
\r
}\r
\r
mat3 makeRotationDir( vec3 direction, vec3 up ) {\r
\r
	vec3 xaxis = normalize( cross( up, direction ) );\r
	vec3 yaxis = normalize( cross( direction, xaxis ) );\r
\r
	return mat3(\r
		xaxis.x, yaxis.x, direction.x,\r
		xaxis.y, yaxis.y, direction.y,\r
		xaxis.z, yaxis.z, direction.z\r
	);\r
\r
}

void main( void ) {

	float t = uTimeE * 0.4;
	float id = vUv.y;

	vec4 position = texture( uGPUSampler0, vUv );
	vec4 velocity = texture( uGPUSampler1, vUv );

	float pixelX = 1.0 / uGPUResolution.x;


	float posOffset = id * 0.5;
	float tOffset = t + id * 0.8;

	vec3 pos = position.xyz;
	vec3 np = pos * 0.23;

	vec3 noise = vec3(
		noiseSimplex( vec4( np, tOffset) ),
		noiseSimplex( vec4( np + 123.4, tOffset) ),
		noiseSimplex( vec4( np + 567.8, tOffset) )
	);
	noise = normalize( noise ) * ( 0.002 + id * 0.001 );

	// velocity

	if( vUv.x < pixelX ) {

		vec3 gPos = pos * vec3( 1.0, 1.0, 5.0 ) - vec3( 0.0, 0.0, 3.0 );

		velocity.xyz += noise;
		velocity.xyz += smoothstep( 0.0, 6.0, length( gPos ) ) * - gPos * 0.002;
		velocity.xyz += smoothstep( 1.5, 0.5, length( gPos.xyz ) ) * gPos.xyz * 0.02;
		velocity.xyz *= 0.98;

	}
	
	//  position

	if( vUv.x < pixelX ) {

		position.xyz += velocity.xyz;
		
	} else {

		vec3 t1 = texture( uGPUSampler0, vUv - vec2( pixelX * 1.5, 0.0 ) ).xyz;
		vec3 t2 =  texture( uGPUSampler0, vUv - vec2( pixelX * 1.5 - 0.05, 0.0 ) ).xyz;

		position.xyz = mix( t1, t2, 0.1 );
		position.xyz += noise * 5.0;
		
	}

	// lifetime

	if( position.w > 1.0 ) {
	
		// position = vec4( 5.0, 0.0, 0.0, 0.0 );
		// position.xz *= rotate( vUv.x * TPI * 20.0 - uTimeE * 0.02 );
		// velocity = vec4( 0.0 );

	}

	position.w += 0.016 / 10.0;

	// out

	outColor0 = position;
	outColor1 = velocity;

} `})))()}var St=t({YakiSoba:()=>Ct}),Ct;function wt(){return(wt=e((()=>{d(),f(),_t(),yt(),xt(),Ct=class extends b{_gpu;constructor(e){super(e);let t=this.engine,n=new h(64,512);this._gpu=new ie({passes:[new s(t.renderer.backend,{name:`yakisoba`,size:n,dataLayerCount:2,frag:p(`yakiSobaCompute`,bt),uniforms:c.merge({},t.uniforms,t.renderer.globalUniforms)})]}),this._gpu.passes[0].initTexture((e,t,n)=>[0,0,0,0]);let r=new g({width:.05,height:.05,depth:.05,segmentsHeight:n.x}),i=[],a=[];for(let e=0;e<n.y;e++)i.push(e/n.y),a.push(Math.random(),Math.random(),Math.random());r.setAttribute(`trailId`,new Float32Array(i),1,{instanceDivisor:1}),r.setAttribute(`id`,new Float32Array(a),3,{instanceDivisor:1});let o=new l({frag:p(`chainFrag`,gt),vert:p(`chainVert`,vt),phase:[`deferred`,`shadowMap`],uniforms:c.merge({},this._gpu.passes[0].outputUniforms)});this.entity.addComponent(_,{geometry:r,material:o})}updateImpl(e){this.entity.isVisibleTraverse()&&this._gpu.compute(e.renderer)}dispose(){super.dispose(),this.entity.removeComponent(_),this._gpu.dispose()}}})))()}var Tt=t({CameraController:()=>Et}),Et;function Dt(){return(Dt=e((()=>{v(),d(),f(),ue(),Et=class extends b{_lookAt;_lookAtTargetUUID;_dofTarget;_dofTargetUUID;_tmpVector1;_tmpVector2;_focusMode;_focusDistance;_focusSpeed;_focusCurrent;constructor(e){super(e),this._lookAt=this.entity.addComponent(y),this._lookAtTargetUUID=null,this.fieldDir(`lookAt`).field(`target`,()=>this._lookAtTargetUUID,e=>{this._lookAtTargetUUID=e||null,this._lookAt.setTarget(null)},{format:{type:`entity`}}),this._dofTarget=null,this._dofTargetUUID=null,this._tmpVector1=new h,this._tmpVector2=new h,this._focusMode=`auto`,this._focusDistance=5,this._focusSpeed=8,this._focusCurrent=null;let t=this.fieldDir(`focus`);t.field(`mode`,()=>this._focusMode,e=>{this._focusMode=e},{format:{type:`select`,list:[`auto`,`target`,`manual`]}}),t.field(`target`,()=>this._dofTargetUUID,e=>{this._dofTargetUUID=e||null,this._dofTarget=null},{format:{type:`entity`}}),t.field(`distance`,()=>this._focusDistance,e=>{this._focusDistance=e},{step:.1}),t.field(`speed`,()=>this._focusSpeed,e=>{this._focusSpeed=e},{step:.5});let n=w(this.engine,this.entity);this.once(`dispose`,()=>{n()})}_resolveTargets(){if(!this._lookAtTargetUUID&&!this._dofTargetUUID)return;let e=this.entity.getRootEntity();this._lookAtTargetUUID&&!this._lookAt.target&&this._lookAt.setTarget(e.findEntityByUUID(this._lookAtTargetUUID)||null),this._dofTargetUUID&&!this._dofTarget&&(this._dofTarget=e.findEntityByUUID(this._dofTargetUUID)||null)}updateImpl(){this._resolveTargets()}get focusMode(){return this._focusMode}set focusMode(e){this._focusMode=e}get focusDistance(){return this._focusDistance}set focusDistance(e){this._focusDistance=e}get focusSpeed(){return this._focusSpeed}set focusSpeed(e){this._focusSpeed=e}prepareRenderImpl(e){let t=this.entity.getComponentsByTag(`camera`)[0];if(!t)return;let n=this._resolveFocusTarget(e);n!==null&&(this._focusCurrent===null||this._focusSpeed<=0?this._focusCurrent=n:this._focusCurrent+=(n-this._focusCurrent)*(1-Math.exp(-this._focusSpeed*e.timeDelta)),t.dofParams.focusDistance=this._focusCurrent)}_resolveFocusTarget(e){if(this._focusMode===`manual`)return this._focusDistance;if(this._focusMode===`auto`){let t=e.renderer.centerDepth;if(typeof t==`number`)return t}if(!this._dofTarget)return null;this.entity.matrixWorld.decompose(this._tmpVector1),this._dofTarget.matrixWorld.decompose(this._tmpVector2),this._tmpVector2.sub(this._tmpVector1);let t=this.entity.matrixWorld.elm;return this._tmpVector1.set(t[8],t[9],t[10]).normalize(),-this._tmpVector2.dot(this._tmpVector1)}dispose(){super.dispose(),this.entity.removeComponent(y)}}})))()}var Ot=t({CameraOrbitAnim:()=>kt}),kt;function At(){return(At=e((()=>{d(),f(),kt=class extends b{time;radius;heightAmp;speed;baseHeight;constructor(e){super(e),this.time=0,this.radius=6,this.heightAmp=2,this.speed=.3,this.baseHeight=1.5,this.field(`radius`,()=>this.radius,e=>this.radius=e),this.field(`heightAmp`,()=>this.heightAmp,e=>this.heightAmp=e),this.field(`speed`,()=>this.speed,e=>this.speed=e),this.field(`baseHeight`,()=>this.baseHeight,e=>this.baseHeight=e)}updateImpl(e){this.time+=e.timeDelta;let t=this.time*this.speed,n=Math.cos(t)*this.radius,r=Math.sin(t)*this.radius,i=this.baseHeight+Math.sin(t*1.7)*this.heightAmp;this.entity.position.set(n,i,r),this.entity.lookAt(new h(0,0,0))}}})))()}var jt=t({ShakeViewer:()=>Mt}),Mt;function Nt(){return(Nt=e((()=>{d(),f(),Mt=class extends b{shakePower;shakeSpeed;shakeMatrix;cameraMatrixWorld;shakeQua;constructor(e){super(e),this.shakePower=.15,this.shakeSpeed=1,this.shakeMatrix=new me,this.cameraMatrixWorld=new me,this.shakeQua=new re,this.order=1e3,this.field(`power`,()=>this.shakePower,e=>this.shakePower=e),this.field(`speed`,()=>this.shakeSpeed,e=>this.shakeSpeed=e)}prepareRenderImpl(e){let t=this.entity.getComponentsByTag(`camera`)[0];if(!t)return;let n=.008*this.shakePower;n*=t.fov/50;let r=e.timeElapsed*this.shakeSpeed;this.shakeQua.setFromEuler({x:Math.sin(r*2)*n,y:Math.sin(r*2.5)*n,z:0}),this.shakeMatrix.identity().applyQuaternion(this.shakeQua),this.cameraMatrixWorld.copy(this.entity.matrixWorld).multiply(this.shakeMatrix),t.viewMatrix.copy(this.cameraMatrixWorld).inverse()}}})))()}var Pt=t({ObjectRotate:()=>Ft}),Ft;function It(){return(It=e((()=>{d(),f(),Ft=class extends b{speed;rotQuaternion;constructor(e){super(e),this.speed=1,this.rotQuaternion=new re}updateImpl(e){this.rotQuaternion.setFromEuler(new a(0,-.4*e.timeDelta*this.speed,0)),this.entity.quaternion.multiply(this.rotQuaternion)}}})))()}var Lt=t({BLidgeClient:()=>Rt}),Rt;function zt(){return(zt=e((()=>{f(),u(),Rt=class e extends b{blidge;type;blidgeRoot;entities;attachments;_attachmentsApplied;_unresolvedByEntity;static sceneData=null;connection;useGLTF;gltfPath;constructor(t){super(t),this.entities=new Map,this.attachments=[],this._attachmentsApplied=!1,this._unresolvedByEntity=new Map,this.type=`websocket`,this.connection={enabled:!0,url:`ws://localhost:3100`},this.useGLTF=!1,this.gltfPath=`/scene.glb`,this.blidgeRoot=null,this.blidge=new m(this.engine);let n=this.onSyncScene.bind(this),r=e=>{this.entity&&this.entity.noticeEventParent(`update/blidge/frame`,[e])};this.blidge.on(`sync/scene`,n),this.blidge.on(`sync/timeline`,r),this.once(`dispose`,()=>{this.blidge.off(`sync/scene`,n),this.blidge.off(`sync/timeline`,r)});let i=async()=>{if(this.type==`json`){let t=e.sceneData;if(!t){let e=await fetch(`/blidge-scene.json`);if(!e.ok){console.warn(`BLidgeClient: failed to load /blidge-scene.json (${e.status})`);return}t=await e.json()}await this.blidge.loadScene(t,this.useGLTF?this.gltfPath:void 0),this.emit(`loaded`)}else this.blidge.connect(this.connection.url,this.useGLTF?this.gltfPath:void 0)};this.field(`mode`,()=>this.type,e=>{this.type=e,i()},{format:{type:`select`,list:[`websocket`,`json`]}}),this.field(`gltf`,()=>this.useGLTF,e=>{this.useGLTF=e,i()}),this.field(`gltfPath`,()=>this.gltfPath,e=>{this.gltfPath=e,i()});let a=this.fieldDir(`websocket`,{hidden:()=>this.type!=`websocket`});a.field(`reconnect`,()=>()=>i(),void 0,{label:`Reconnect`}),a.field(`url`,()=>this.connection.url,e=>this.connection.url=e),this.field(`attachments`,()=>!this.blidgeRoot||!this._attachmentsApplied?this.attachments:this.serializeAttachments(),e=>{this.attachments=e||[],this._attachmentsApplied=!1,this._unresolvedByEntity.clear()},{hidden:!0})}serializeAttachments(){if(!this.blidgeRoot)return[];let e={getName:e=>{let t=x.resources.componentList.find(t=>e instanceof t.component);return t?t.name:e.constructor.name}},t=[];return this.blidgeRoot.traverse(n=>{let r=[];n.components.forEach(t=>{if(t.initiator!==`user`)return;let n=t.serialize({mode:`export`}),i=Object.keys(n).length>0,a={name:e.getName(t),uuid:t.uuid};i&&(a.props=n),r.push(a)});let i=this._unresolvedByEntity.get(n.name);i&&r.push(...i),r.length>0&&t.push({name:n.name,components:r})}),t}applyAttachments(e){if(this._unresolvedByEntity.clear(),!this.attachments.length)return;let t=new Map;this.attachments.forEach(e=>t.set(e.name,e)),e.traverse(e=>{let n=t.get(e.name);n&&n.components.forEach(t=>{let n=x.resources.getComponent(t.name);if(n){e.removeComponent(n.component);let r=e.addComponent(n.component);r.initiator=`user`,r.restoreUUID(t.uuid),t.props&&r.deserialize(t.props)}else{console.warn(`[BLidgeClient] unresolved attachment component "${t.name}" on entity "${e.name}". Preserving data for round-trip.`);let n=this._unresolvedByEntity.get(e.name)||[];n.push({name:t.name,uuid:t.uuid,props:t.props}),this._unresolvedByEntity.set(e.name,n)}})})}async onSyncScene(e){this._attachmentsApplied=!1;let t=new Date().getTime(),n=r=>{let i=this.entities.get(r.name)||this.engine.createEntity();if(r.type==`camera`){let e=r.param;i.userData.cameraParam=e}return i.removeComponent(le),i.addComponent(le,{blidge:e,node:r}),r.children.forEach(e=>{let t=n(e);i.add(t)}),this.entities.set(i.name,i),i.userData.updateTime=t,i},r=e.root&&n(e.root);r&&(r.name=`blidgeRoot`,this.blidgeRoot&&this.entity&&this.entity.remove(this.blidgeRoot),this.blidgeRoot=r,this.entity&&this.entity.add(this.blidgeRoot)),this.entities.forEach(e=>{if(e.userData.updateTime!=t){let t=e.parent;t&&t.remove(e),e.dispose(),this.entities.delete(e.name)}}),e.gltf&&await e.gltfPrm,this.blidgeRoot&&(this.applyAttachments(this.blidgeRoot),this._attachmentsApplied=!0),this.entity&&(this.entity.noticeEventChilds(`sceneCreated`,[this.blidgeRoot]),this.entity.noticeEventParent(`update/blidge/scene`,[this.blidgeRoot]))}dispose(){super.dispose(),this.blidgeRoot&&=(this.blidgeRoot.disposeRecursive(),this.entity.remove(this.blidgeRoot),null),this._attachmentsApplied=!1,this._unresolvedByEntity.clear()}}})))()}var Bt=t({Cube:()=>Vt}),Vt;function Ht(){return(Ht=e((()=>{f(),Vt=class extends g{}})))()}var Ut=t({Cylinder:()=>Wt}),Wt;function Gt(){return(Gt=e((()=>{f(),Wt=class extends de{}})))()}var Kt=t({Plane:()=>qt}),qt;function Jt(){return(Jt=e((()=>{f(),qt=class extends be{}})))()}var Yt=t({Sphere:()=>Xt}),Xt;function Zt(){return(Zt=e((()=>{f(),Xt=class extends se{}})))()}var V,H;function Qt(){return(Qt=e((()=>{Dt(),At(),Nt(),ue(),he(),It(),zt(),Ht(),Gt(),Jt(),Zt(),C(),V=S(Object.assign({"./Components/Camera/CameraController/index.ts":Tt,"./Components/Camera/CameraOrbitAnim/index.ts":Ot,"./Components/Camera/CameraShake/index.ts":jt,"./Components/Camera/LookAt/index.ts":ce,"./Components/Camera/OrbitControls/index.ts":oe,"./Components/Object/ObjectRotate/index.ts":Pt,"./Components/Utility/BLidgeClient/index.ts":Lt}),`Components`),H=S(Object.assign({"./Geometries/Cube/index.ts":Bt,"./Geometries/Cylinder/index.ts":Ut,"./Geometries/Plane/index.ts":Kt,"./Geometries/Sphere/index.ts":Yt}),`Geometries`)})))()}var $t;function en(){return(en=e((()=>{$t=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}\r
// 宣言順はvert_h.part.glslのoutと一致させる（WGSL変換時にロケーションが宣言順で振られるため）\r
in vec2 vUv;\r
in vec3 vViewNormal;\r
in vec3 vNormal;\r
in vec3 vMVPosition;\r
in vec3 vMVPPosition;\r
in vec3 vPos;\r
in vec2 vVelocity;\r
\r
uniform mat4 uModelMatrix;\r
uniform mat4 uModelMatrixInverse;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform vec3 uCameraPosition;\r
uniform vec2 uResolution;\r
\r
#ifdef IS_DEPTH\r
	uniform float uCameraNear;\r
	uniform float uCameraFar;\r
#endif\r
\r
#ifdef IS_DEFERRED\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
	layout (location = 3) out vec4 outColor3;\r
	layout (location = 4) out vec4 outColor4;\r
#endif\r
\r
#ifdef IS_FORWARD\r
	uniform sampler2D uDeferredTexture;\r
	uniform vec2 uDeferredResolution;\r
	uniform sampler2D uGbufferNormal;\r
	uniform sampler2D uGbufferAlbedo;\r
	uniform sampler2D uGbufferMaterial;\r
#endif\r
\r
#if defined(IS_FORWARD) || defined(IS_DEPTH)\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
#endif\r
\r
uniform float uTime;\r
uniform float uTimeF;\r
uniform float uTimeE;\r
uniform float uTimeEF;\r
\r
// https://www.shadertoy.com/view/4dS3Wd\r
\r
float hashv(float p) { p = fract(p * 0.011); p *= p + 7.5; p *= p + p; return fract(p); }\r
float hashv(vec2 p) {vec3 p3 = fract(vec3(p.xyx) * 0.13); p3 += dot(p3, p3.yzx + 3.333); return fract((p3.x + p3.y) * p3.z); }\r
\r
#define NUM_NOISE_OCTAVES 5\r
\r
float noiseValue(vec3 x) {\r
    const vec3 step = vec3(110, 241, 171);\r
\r
    vec3 i = floor(x);\r
    vec3 f = fract(x);\r
 \r
    // For performance, compute the base input to a 1D hash from the integer part of the argument and the \r
    // incremental change to the 1D based on the 3D -> 1D wrapping\r
    float n = dot(i, step);\r
\r
    vec3 u = f * f * (3.0 - 2.0 * f);\r
    return mix(mix(mix( hashv(n + dot(step, vec3(0, 0, 0))), hashv(n + dot(step, vec3(1, 0, 0))), u.x),\r
                   mix( hashv(n + dot(step, vec3(0, 1, 0))), hashv(n + dot(step, vec3(1, 1, 0))), u.x), u.y),\r
               mix(mix( hashv(n + dot(step, vec3(0, 0, 1))), hashv(n + dot(step, vec3(1, 0, 1))), u.x),\r
                   mix( hashv(n + dot(step, vec3(0, 1, 1))), hashv(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z);\r
}\r
\r
float fbm(vec3 x) {\r
	float v = 0.0;\r
	float a = 0.5;\r
	vec3 shift = vec3(100);\r
	for (int i = 0; i < NUM_NOISE_OCTAVES; ++i) {\r
		v += a * noiseValue(x);\r
		x = x * 2.0 + shift;\r
		a *= 0.5;\r
    if( i == -1 ) break;\r
	}\r
	return v;\r
}\r
\r
float fbm(float x) {\r
  return fbm(vec3(x));\r
}\r
\r
layout (location = 0) out vec4 outColor;\r
\r
void main( void ) {\r
\r
	vec2 uv = vUv * 400.0;\r
\r
	outColor.x = hashv( uv );\r
	outColor.y = hashv( uv  + 1.0);\r
	outColor.z = hashv( uv + 2.0 );\r
	outColor.w = hashv( uv + 3.0 );\r
\r
} `})))()}var tn;function nn(){return(nn=e((()=>{en(),tn={name:`hash`,resolution:[512,512],filter:`nearest`,updateEveryFrame:!1,frag:$t}})))()}var rn;function an(){return(an=e((()=>{rn=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}\r
// 宣言順はvert_h.part.glslのoutと一致させる（WGSL変換時にロケーションが宣言順で振られるため）\r
in vec2 vUv;\r
in vec3 vViewNormal;\r
in vec3 vNormal;\r
in vec3 vMVPosition;\r
in vec3 vMVPPosition;\r
in vec3 vPos;\r
in vec2 vVelocity;\r
\r
uniform mat4 uModelMatrix;\r
uniform mat4 uModelMatrixInverse;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform vec3 uCameraPosition;\r
uniform vec2 uResolution;\r
\r
#ifdef IS_DEPTH\r
	uniform float uCameraNear;\r
	uniform float uCameraFar;\r
#endif\r
\r
#ifdef IS_DEFERRED\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
	layout (location = 3) out vec4 outColor3;\r
	layout (location = 4) out vec4 outColor4;\r
#endif\r
\r
#ifdef IS_FORWARD\r
	uniform sampler2D uDeferredTexture;\r
	uniform vec2 uDeferredResolution;\r
	uniform sampler2D uGbufferNormal;\r
	uniform sampler2D uGbufferAlbedo;\r
	uniform sampler2D uGbufferMaterial;\r
#endif\r
\r
#if defined(IS_FORWARD) || defined(IS_DEPTH)\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
#endif\r
\r
uniform float uTime;\r
uniform float uTimeF;\r
uniform float uTimeE;\r
uniform float uTimeEF;\r
\r
// https://www.shadertoy.com/view/4dS3Wd\r
\r
float hashv(float p) { p = fract(p * 0.011); p *= p + 7.5; p *= p + p; return fract(p); }\r
float hashv(vec2 p) {vec3 p3 = fract(vec3(p.xyx) * 0.13); p3 += dot(p3, p3.yzx + 3.333); return fract((p3.x + p3.y) * p3.z); }\r
\r
#define NUM_NOISE_OCTAVES 5\r
\r
float noiseValue(vec3 x) {\r
    const vec3 step = vec3(110, 241, 171);\r
\r
    vec3 i = floor(x);\r
    vec3 f = fract(x);\r
 \r
    // For performance, compute the base input to a 1D hash from the integer part of the argument and the \r
    // incremental change to the 1D based on the 3D -> 1D wrapping\r
    float n = dot(i, step);\r
\r
    vec3 u = f * f * (3.0 - 2.0 * f);\r
    return mix(mix(mix( hashv(n + dot(step, vec3(0, 0, 0))), hashv(n + dot(step, vec3(1, 0, 0))), u.x),\r
                   mix( hashv(n + dot(step, vec3(0, 1, 0))), hashv(n + dot(step, vec3(1, 1, 0))), u.x), u.y),\r
               mix(mix( hashv(n + dot(step, vec3(0, 0, 1))), hashv(n + dot(step, vec3(1, 0, 1))), u.x),\r
                   mix( hashv(n + dot(step, vec3(0, 1, 1))), hashv(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z);\r
}\r
\r
float fbm(vec3 x) {\r
	float v = 0.0;\r
	float a = 0.5;\r
	vec3 shift = vec3(100);\r
	for (int i = 0; i < NUM_NOISE_OCTAVES; ++i) {\r
		v += a * noiseValue(x);\r
		x = x * 2.0 + shift;\r
		a *= 0.5;\r
    if( i == -1 ) break;\r
	}\r
	return v;\r
}\r
\r
float fbm(float x) {\r
  return fbm(vec3(x));\r
}\r
\r
layout (location = 0) out vec4 outColor;\r
\r
void main( void ) {\r
\r
	vec2 v = vUv * 15.0;\r
	vec2 lv = abs( vUv - 0.5 ) * 15.0;\r
	float lw = sin( vUv.x * PI ) * sin( vUv.y * PI );\r
\r
	outColor.x += mix( fbm( vec3( lv, 0.0 ) ), fbm( vec3( v, 0.0 ) ), lw );\r
	outColor.y += mix( fbm( vec3( lv, 100.0 ) ), fbm( vec3( v, 100.0 ) ), lw );\r
	outColor.z += mix( fbm( vec3( lv, 200.0 ) ), fbm( vec3( v, 200.0 ) ), lw );\r
	outColor.w += mix( fbm( vec3( lv, 300.0 ) ), fbm( vec3( v, 300.0 ) ), lw );\r
\r
} `})))()}var on;function sn(){return(sn=e((()=>{an(),on={name:`noise`,resolution:[1024,1024],filter:`linear`,updateEveryFrame:!0,frag:rn}})))()}var U;function W(){return(W=e((()=>{U=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}\r
\r
// https://www.shadertoy.com/view/3tcyD7\r
\r
vec3 noiseCyc( vec3 p ){\r
\r
  vec4 n = vec4(0);\r
  float a=1.0;\r
\r
  for( int i = 0; i < 8; i++ ){\r
    p += sin( p.zxy );\r
    n += vec4(cross(sin(p.xyz), cos(p.yzx)), 1.0) * a;\r
    a *= 0.6;\r
    p *= 1.5;\r
  }\r
\r
  n.xyz /= n.w;\r
\r
  return n.xyz;\r
\r
}\r
\r
layout (location = 0) out vec4 outColor;\r
in vec2 vUv;\r
uniform float uTimeE;\r
\r
void main( void ) {\r
\r
	vec3 n = noiseCyc( vec3( vUv * 3.0, uTimeE * 0.5 ) );\r
	outColor.xyz = n;\r
\r
} `})))()}var cn;function ln(){return(ln=e((()=>{W(),cn={name:`noiseCyclic`,resolution:[1024,1024],filter:`linear`,updateEveryFrame:!1,frag:U}})))()}var un;function dn(){return(dn=e((()=>{W(),un={name:`noiseCyclicAnime`,resolution:[512,512],filter:`linear`,updateEveryFrame:!0,frag:U}})))()}var fn,pn,G;function mn(){return(mn=e((()=>{nn(),sn(),ln(),dn(),u(),fn=Object.assign({"/demo-webgl/Resources/Textures/hash.tex":tn,"/demo-webgl/Resources/Textures/noise.tex":on,"/demo-webgl/Resources/Textures/noiseCyclic.tex":cn,"/demo-webgl/Resources/Textures/noiseCyclicAnime.tex":un}),pn=()=>{for(let e of Object.values(fn))e&&x.resources.addTextureResource(e.name,{frag:e.frag,resolution:e.resolution||[1024,1024],filter:e.filter,updateEveryFrame:e.updateEveryFrame,textures:e.textures})},G=e=>{x.resources.buildTextureInstances(e.renderer,e.uniforms)}})))()}var hn,K,q,J,gn;function _n(){return(_n=e((()=>{N(),z(),De(),Pe(),Ve(),Je(),tt(),ct(),ht(),wt(),v(),u(),Qt(),mn(),hn=Object.assign({"/demo-webgl/Resources/Components/Samples/Effects/EyeRings/index.ts":Se,"/demo-webgl/Resources/Components/Samples/Effects/FlashLine/index.ts":Ce,"/demo-webgl/Resources/Components/Samples/Environment/SkyBox/index.ts":Te,"/demo-webgl/Resources/Components/Samples/Geometry/GridCross/index.ts":Me,"/demo-webgl/Resources/Components/Samples/Geometry/GridDots/index.ts":ze,"/demo-webgl/Resources/Components/Samples/Geometry/WireCube/index.ts":Ke,"/demo-webgl/Resources/Components/Samples/Objects/OREngineCube/index.ts":$e,"/demo-webgl/Resources/Components/Samples/Objects/OREngineLogo/index.ts":ot,"/demo-webgl/Resources/Components/Samples/Particles/Dust/index.ts":pt,"/demo-webgl/Resources/Components/Samples/Particles/YakiSoba/index.ts":St}),K=Object.assign({}),q=(e,t)=>{let n=Object.keys(e);for(let r=0;r<n.length;r++){let i=n[r],a=e[i];if(typeof a==`function`)t.addComponent(i,a);else{let e=t.createGroup(i);q(a,e)}}},J=(e,t)=>{let n=Object.keys(e);for(let r=0;r<n.length;r++){let i=n[r],a=e[i];if(typeof a==`function`)t.addGeometry(i,a);else{let e=t.createGroup(i);J(a,e)}}},gn=()=>{m.gltfLoaderFactory=e=>new E(e),x.resources.clear();let e=x.resources.addComponentGroup(`_Built-in`);e.addComponent(`Light`,pe),e.addComponent(`Camera`,ve),e.addComponent(`Mesh`,_);let t=Object.keys(V);for(let e=0;e<t.length;e++){let n=t[e],r=V[n],i=x.resources.addComponentGroup(n);q(r,i)}let n=Object.keys(H);for(let e=0;e<n.length;e++){let t=n[e],r=H[t],i=x.resources.addGeometryGroup(t);J(r,i)}let r=S(hn,`Components`),i=Object.keys(r);for(let e=0;e<i.length;e++){let t=i[e],n=r[t],a=x.resources.addComponentGroup(t);q(n,a)}let a=S(K,`Geometries`),o=Object.keys(a);for(let e=0;e<o.length;e++){let t=o[e],n=a[t],r=x.resources.addGeometryGroup(t);J(n,r)}pn()}})))()}var vn,Y,yn,X,bn,xn;function Sn(){return(Sn=e((()=>{vn=n(),ye(),_n(),Y=r(),gn(),yn=({setup:e})=>{let{editor:t}=ee();return(0,vn.useEffect)(()=>{let n=t.engine,r=()=>e(t);return n.on(`loaded`,r),()=>{n.off(`loaded`,r)}},[t,e]),null},X=e=>(0,Y.jsx)(ge,{project:e.fixture.scene,onEngineInit:G,children:(0,Y.jsx)(_e,{projectName:`storybook`,editorData:e.fixture.editorData,children:(0,Y.jsx)(ae,{children:(0,Y.jsxs)(xe,{children:[e.children,e.fixture.setup&&(0,Y.jsx)(yn,{setup:e.fixture.setup}),(0,Y.jsx)(o,{}),(0,Y.jsx)(ne,{})]})})})}),bn=e=>t=>(0,Y.jsx)(X,{fixture:e,children:(0,Y.jsx)(t,{})}),xn=e=>t=>(0,Y.jsx)(ge,{project:e,onEngineInit:G,children:(0,Y.jsx)(t,{})}),X.__docgenInfo={description:``,methods:[],displayName:`OREditorFixtureHost`}})))()}var Z,Q,Cn,$,wn;function Tn(){return(Tn=e((()=>{Z={name:`Camera`,uuid:`sb-camera`,pos:[0,2,12],components:[{name:`Camera`,uuid:`sb-camera-lens`},{name:`CameraController`,uuid:`sb-camera-controller`}]},Q={name:`storybook`,scene:{name:`root`,uuid:`0`,childs:[Z,{name:`OREngineCube`,uuid:`sb-cube`,components:[{name:`OREngineCube`,uuid:`sb-cube-body`}]},{name:`OREngineLogo`,uuid:`sb-logo`,components:[{name:`OREngineLogo`,uuid:`sb-logo-body`}]}]},"timeline/duration":600,"timeline/fps":60},Cn={...Q,scene:{name:`root`,uuid:`0`,childs:[Z]}},$={enableRender:!0,resolutionScale:.5,"resolution/width":1920,"resolution/height":1080,viewType:`render`,"frameLoop/enabled":!1,"frameLoop/start":0,"frameLoop/end":0,cameraMode:`preview`,gizmoMode:`translate`},wn={scene:Q,editorData:$}})))()}export{Q as a,bn as c,T as d,C as f,wn as i,xn as l,$ as n,X as o,Cn as r,Sn as s,Tn as t,D as u};