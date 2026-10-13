// 頂点を動かさないマテリアルはこれを include する

@vertex
fn vsMain( input: VertexInput ) -> VertexOutput {

	var output: VertexOutput;

	let worldPosition = object.uModelMatrix * vec4f( input.position, 1.0 );
	let worldPositionPrev = object.uModelMatrixPrev * vec4f( input.position, 1.0 );

	output.position = frame.uProjectionMatrix * frame.uViewMatrix * worldPosition;
	output.positionPrev = projectPrev( worldPositionPrev.xyz );
	output.normal = ( object.uNormalMatrix * vec4f( input.normal, 0.0 ) ).xyz;
	output.uv = input.uv;
	output.worldPosition = worldPosition.xyz;

	return output;

}
