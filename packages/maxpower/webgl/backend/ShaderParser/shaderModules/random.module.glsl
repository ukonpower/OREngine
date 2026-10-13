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

// Interleaved Gradient Noise。隣り合うピクセルの値が斜めの縞として散るので、
// 白色ノイズのように無相関な粒にならず、同じサンプル数でもざらつきが目立たない。
// frameIndex にフレーム番号を渡すと、時間方向にも重ならないよう位相がずれる
float interleavedGradientNoise( vec2 pixel, float frameIndex ) {

	vec2 p = pixel + frameIndex * 5.588238;

	return fract( 52.9829189 * fract( dot( p, vec2( 0.06711056, 0.00583715 ) ) ) );

}
