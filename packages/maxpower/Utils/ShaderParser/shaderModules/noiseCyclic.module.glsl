
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