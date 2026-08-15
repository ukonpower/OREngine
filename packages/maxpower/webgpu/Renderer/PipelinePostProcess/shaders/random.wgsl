fn random( co: vec2f ) -> f32 {

	return fract( sin( dot( co, vec2f( 12.9898, 78.233 ) ) ) * 43758.5453 );

}

// Interleaved Gradient Noise。隣り合うピクセルの値が斜めの縞として散るので、
// 白色ノイズのように無相関な粒にならず、同じサンプル数でもざらつきが目立たない。
// frameIndex にフレーム番号を渡すと、時間方向にも重ならないよう位相がずれる
fn interleavedGradientNoise( pixel: vec2f, frameIndex: f32 ) -> f32 {

	let p = pixel + frameIndex * 5.588238;

	return fract( 52.9829189 * fract( dot( p, vec2f( 0.06711056, 0.00583715 ) ) ) );

}
