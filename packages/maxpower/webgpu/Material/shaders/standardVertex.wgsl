// 頂点を動かさないマテリアルはこれを include する

@vertex
fn vsMain( input: VertexInput ) -> VertexOutput {

	var output: VertexOutput;

	let worldPosition = object.uModelMatrix * vec4f( input.position, 1.0 );
	let position = frame.uProjectionMatrix * frame.uViewMatrix * worldPosition;

	// 前フレームの行列で同じ頂点を射影して画面上の移動量を出す
	let worldPositionPrev = object.uModelMatrixPrev * vec4f( input.position, 1.0 );
	let positionPrev = frame.uProjectionMatrixPrev * frame.uViewMatrixPrev * worldPositionPrev;

	output.position = position;
	output.normal = ( object.uNormalMatrix * vec4f( input.normal, 0.0 ) ).xyz;
	output.uv = input.uv;
	output.worldPosition = worldPosition.xyz;
	output.velocity = ( position.xy / position.w - positionPrev.xy / positionPrev.w ) * 0.2;

	return output;

}
