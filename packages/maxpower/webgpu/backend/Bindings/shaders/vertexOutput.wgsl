struct VertexOutput {
	@builtin(position) position: vec4f,
	@location(0) normal: vec3f,
	@location(1) uv: vec2f,
	@location(2) worldPosition: vec3f,
	// 同じ点を前フレームの行列・時刻で射影したクリップ座標（projectPrev で作る）。
	// 画面上の移動量はフラグメントでこれと今の画素から出す（gbuffer.wgsl の screenVelocity）。書かなければ移動量は 0
	@location(3) positionPrev: vec4f,
};
