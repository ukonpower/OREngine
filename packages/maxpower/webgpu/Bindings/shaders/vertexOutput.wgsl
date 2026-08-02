struct VertexOutput {
	@builtin(position) position: vec4f,
	@location(0) normal: vec3f,
	@location(1) uv: vec2f,
	@location(2) worldPosition: vec3f,
	// 画面上の移動量。モーションブラーが読む
	@location(3) velocity: vec2f,
};
