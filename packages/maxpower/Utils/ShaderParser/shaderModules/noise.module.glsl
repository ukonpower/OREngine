// https://stackoverflow.com/questions/4200224/random-noise-functions-for-glsl

float random(vec2 p){
	return fract(sin(dot(p.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

// https://www.shadertoy.com/view/4djSRW

vec3 hash(vec3 p3)
{
	p3 = fract(p3 * vec3(.1031, .1030, .0973));
  p3 += dot(p3, p3.yxz+33.33);
  return fract((p3.xxy + p3.yxx)*p3.zyx);

}

// https://www.shadertoy.com/view/3tcyD7

vec3 noiseCyc( vec3 p ){

  vec4 n = vec4(0);
  float a=1.0;

  for( int i = 0; i < 8; i++ ){
    p += sin( p.zxy );
    n += vec4(cross(sin(p.xyz), cos(p.yzx)), 1.0) * a;
    a *= 0.6;
    p *= 1.5;
  }

  n.xyz /= n.w;

  return n.xyz;

}

// https://www.shadertoy.com/view/4dS3Wd

float hashv(float p) { p = fract(p * 0.011); p *= p + 7.5; p *= p + p; return fract(p); }
float hashv(vec2 p) {vec3 p3 = fract(vec3(p.xyx) * 0.13); p3 += dot(p3, p3.yzx + 3.333); return fract((p3.x + p3.y) * p3.z); }

#define NUM_NOISE_OCTAVES 5

float noiseV(vec3 x) {
    const vec3 step = vec3(110, 241, 171);

    vec3 i = floor(x);
    vec3 f = fract(x);
 
    // For performance, compute the base input to a 1D hash from the integer part of the argument and the 
    // incremental change to the 1D based on the 3D -> 1D wrapping
    float n = dot(i, step);

    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix( hashv(n + dot(step, vec3(0, 0, 0))), hashv(n + dot(step, vec3(1, 0, 0))), u.x),
                   mix( hashv(n + dot(step, vec3(0, 1, 0))), hashv(n + dot(step, vec3(1, 1, 0))), u.x), u.y),
               mix(mix( hashv(n + dot(step, vec3(0, 0, 1))), hashv(n + dot(step, vec3(1, 0, 1))), u.x),
                   mix( hashv(n + dot(step, vec3(0, 1, 1))), hashv(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z);
}

float noiseV( float x ) {
  return noiseV( vec3(x) );
}

float fbm(vec3 x) {
	float v = 0.0;
	float a = 0.5;
	vec3 shift = vec3(100);
	for (int i = 0; i < NUM_NOISE_OCTAVES; ++i) {
		v += a * noiseV(x);
		x = x * 2.0 + shift;
		a *= 0.5;
	}
	return v;
}

float fbm(float x) {
  return fbm(vec3(x));
}