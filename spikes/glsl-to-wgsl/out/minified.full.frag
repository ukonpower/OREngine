#version 300 es
precision highp float;
#define PI 3.14159265359
#define TPI 6.28318530718
#define HPI 1.57079632679
#define saturate(x)clamp(x,0.,1.)
struct as{vec3 position;vec3 e;float o;vec3 t;vec3 i;float a;};struct ad{vec3 color;float r;float c;vec3 v;vec3 u;vec3 n;float l;};
#define linearstep(edge0,edge1,x)min(max(((x)-(edge0))/((edge1)-(edge0)),0.0),1.0)
struct aP{vec3 direction;vec3 color;};struct ak{vec3 position;vec3 direction;vec3 color;float angle;float blend;float distance;float decay;};struct aM{float near;float far;mat4 uViewMatrix;mat4 uProjectionMatrix;vec2 resolution;};struct af{vec3 direction;vec3 color;};
#if 1>0
uniform aP directionalLight[1];uniform aM uDirectionalLightCamera[1];uniform sampler2D directionalLightShadowMap[1];
#endif
#if 0>0
uniform ak uSpotLight[0];uniform aM uSpotLightCamera[0];uniform sampler2D uSpotLightShadowMap[0];
#endif
float au(float v,sampler2D u,vec2 x,float I){return x.x>=0.&&x.x<=1.&&x.y>=0.&&x.y<=1.?step(v,dot(texture(u,x),vec4(1,1./255.,1./65025.,1./16581375.))+I):1.;}void ah(vec3 v,aM u,inout vec2 x,inout float I){vec4 e=u.uViewMatrix*vec4(v,1),t=u.uProjectionMatrix*e;x=t.xy/t.w*.5+.5;float T=u.near;I=(-e.z-T)/(u.far-T);}
#define SHADOW_SAMPLE_COUNT 2
float av(vec3 v,aM u,sampler2D x,float e){vec2 I;float F;ah(v,u,I,F);float t=au(F,x,I,e);for(int v=0;v<SHADOW_SAMPLE_COUNT;v++){vec2 T=1./u.resolution*(float(v+1)/float(SHADOW_SAMPLE_COUNT));t=t+au(F,x,I+vec2(-T.x,-T.y),e)+au(F,x,I+vec2(0,-T.y),e)+au(F,x,I+vec2(T.x,-T.y),e)+au(F,x,I+vec2(-T.x,0),e)+au(F,x,I+vec2(T.x,0),e)+au(F,x,I+vec2(-T.x,T.y),e)+au(F,x,I+vec2(0,T.y),e)+au(F,x,I+vec2(T),e);}return t/(float(SHADOW_SAMPLE_COUNT)*8.);}float aw(float v,float u){u*=u;u*=u;v*=v;return v<=0.?0.:u/(PI*pow(v*(u-1.)+1.,2.));}float az(float v,float u){return v==0.?0.:v/(v*(1.-u)+u);}float aS(float v,float u,float x){x=clamp(x*sqrt(2./PI),0.,1.);return az(v,x)*az(u,x);}float aT(float v){return.04+.96*pow(1.-v,5.);}vec3 aA(as v,ad u,af x){vec3 e=normalize(x.direction),t=normalize(v.t+e);float I=clamp(dot(v.e,v.t),0.,1.),F=clamp(dot(v.e,e),0.,1.);vec3 T=x.color*F,E=u.u/PI*T;float c=aw(clamp(dot(v.e,t),0.,1.),u.r),n=aS(I,F,u.r),d=aT(clamp(dot(e,t),0.,1.));return vec3(0)+E*(1.-d)+c*n*d/(4.*F*I+1e-4)*u.n*T;}float aB(vec3 direction){vec3 v=abs(direction);return v.x>v.z?v.x>v.y?direction.x>0.?0.:3.:direction.y>0.?1.:4.:v.z>v.y?direction.z>0.?2.:5.:direction.y>0.?1.:4.;}
#define MAXMIP 5.0
uniform sampler2D sampler0,sampler1,sampler2,sampler3,sampler4,uSSAOTexture,uLightShaftTexture,uEnvMap;uniform vec3 uColor;uniform mat4 uViewMatrix,uCameraMatrix;uniform vec3 uCameraPosition;in vec2 vUv;layout(location=0)out vec4 glFragOut0;layout(location=1)out vec4 glFragOut1;vec3 aC(vec3 direction,float v){float u=aB(direction);vec2 x=.5*((u==0.?vec2(direction.zy)/abs(direction.x):u==1.?vec2(-direction.x,-direction.z)/abs(direction.y):u==2.?vec2(-direction.x,direction.y)/abs(direction.z):u==3.?vec2(-direction.z,direction.y)/abs(direction.x):u==4.?vec2(-direction.x,direction.z)/abs(direction.y):vec2(direction)/abs(direction.z))+1.),e=vec2(textureSize(uEnvMap,0))*pow(.5,floor(v));x=(x*(e-4.)+2.)/e;x.x+=mod(u,3.);x.y+=floor(u/3.);x.y*=.5;x.y*=.5;x.x/=3.;u=1.-pow(2.,-floor(v));x.y*=1.-u;x.x*=1.-u;x.y+=u;vec4 I=textureGrad(uEnvMap,x,vec2(0),vec2(0));return I.xyz/I.w;}vec3 bd(vec3 direction,float v){v*=MAXMIP-1.;float u=fract(v);v=floor(v);vec3 e=aC(direction,v);if(u==0.)return e;{vec3 x=aC(direction,v+1.);return mix(e,x,u);}}void main(){vec4 v=texture(sampler0,vUv),u=texture(sampler1,vUv),e=texture(sampler3,vUv);vec3 color=texture(sampler2,vUv).xyz;float x=e.y;as I=as(v.xyz,u.xyz,0.,normalize(uCameraPosition-v.xyz),vec3(0),texture(uSSAOTexture,vUv).x);ad T=ad(color,e.x,x,vec3(v.w,u.w,texture(sampler4,vUv).w),mix(color,vec3(0),x),mix(vec3(1),color,x),e.w);vec3 F=vec3(0);float t;af H;
#if 1>0
aP c;

c=directionalLight[0];H.direction=c.direction;H.color=c.color;
#if 0<1
t=av(v.xyz,uDirectionalLightCamera[0],directionalLightShadowMap[0],1e-4);
#else
t=1.;
#endif
F.xyz+=aA(I,T,H)*t;


#endif

#if 0>0
ak n;vec3 d;float f,E,g;vec3 i;


#endif
F.xyz+=bd(I.e,1.)*T.u*T.l;F.xyz=mix(F.xyz,bd(reflect(-I.t,I.e),T.r),mix(aT(clamp(dot(I.e,I.t),0.,1.)),1.,T.c)*T.n*T.l);F.xyz*=max(0.,1.-I.a*1.5);F.xyz+=T.v;F.xyz+=texture(uLightShaftTexture,vUv).xyz;glFragOut0=glFragOut1=vec4(max(vec3(0),F.xyz),1);}