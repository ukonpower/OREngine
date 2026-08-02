// 頂点を動かさないマテリアルはこれを本体の先頭に置く
export const standardVertexWgsl = /* wgsl */`
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
`;

// 既定マテリアル。フェーズごとのentry pointの最小形でもある
export const basicWgsl = standardVertexWgsl + /* wgsl */`
@fragment
fn fsDeferred( input: VertexOutput ) -> GBufferOutput {

	return packGBuffer( input, defaultSurface( input ) );

}

@fragment
fn fsForward( input: VertexOutput ) -> @location(0) vec4f {

	let normal = normalize( input.normal );
	let lightDir = normalize( vec3f( 0.5, 1.0, 0.4 ) );
	let diffuse = max( dot( normal, lightDir ), 0.0 ) * 0.8 + 0.2;

	return vec4f( vec3f( diffuse ), 1.0 );

}
`;
