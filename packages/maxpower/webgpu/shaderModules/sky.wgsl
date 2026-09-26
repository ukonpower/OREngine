// 空の模様用の仮想ワールド座標（理由は webgl 側 sky.module.glsl。WGSL はコメントも player に載るため短く）
fn skyPosition( normal: vec3f ) -> vec3f {

	return normalize( normal ) * 500.0;

}
