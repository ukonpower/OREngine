export interface SortWorkerMessage {
	type: 'sort';
	gaussianPositions: Float32Array;
	numPoints: number;
	viewMatrix: number[]; // 4x4行列を平坦化した配列
	useRightHandedSystem?: boolean;
}

export interface SortWorkerResponse {
	type: 'sorted';
	sortedIndices: Uint32Array;
}

// https://github.com/BabylonJS/Babylon.js/blob/bf55c4ad156aed0635f6b593289ec8d0eb30fa0e/packages/dev/core/src/Meshes/GaussianSplatting/gaussianSplattingMesh.ts#L1249

/**
 * BigInt64Arrayを使用してindex+depthをパックしてソート
 */
function sortSplatsByDepthFast(
	positions: Float32Array,
	viewMatrix: number[],
	vertexCount: number,
): Uint32Array {

	// BigInt64Arrayでindex+depthをパック
	const depthMix = new BigInt64Array( vertexCount );
	const indices = new Uint32Array( depthMix.buffer );
	const floatMix = new Float32Array( depthMix.buffer );

	// 各ガウシアンのインデックスを設定
	for ( let j = 0; j < vertexCount; j ++ ) {

		indices[ 2 * j ] = j;

	}

	// 各ガウシアンの深度を計算
	for ( let j = 0; j < vertexCount; j ++ ) {

		const x = positions[ j * 3 + 0 ];
		const y = positions[ j * 3 + 1 ];
		const z = positions[ j * 3 + 2 ];

		// ビュー空間でのZ値を計算
		const depth = (
			viewMatrix[ 2 ] * x +
			viewMatrix[ 6 ] * y +
			viewMatrix[ 10 ] * z +
			viewMatrix[ 14 ]
		);

		// 深度を格納（+10000で負数対策）
		floatMix[ 2 * j + 1 ] = 10000 + depth;

	}

	// BigInt64Array として高速ソート実行
	depthMix.sort();

	// ソート済みのインデックス配列を抽出
	const sortedIndices = new Uint32Array( vertexCount );
	for ( let j = 0; j < vertexCount; j ++ ) {

		sortedIndices[ j ] = indices[ 2 * j ];

	}

	return sortedIndices;

}

self.onmessage = function ( e: MessageEvent<SortWorkerMessage> ) {

	const { gaussianPositions, numPoints, viewMatrix } = e.data;

	const sortedIndices = sortSplatsByDepthFast(
		gaussianPositions,
		viewMatrix,
		numPoints,
	);

	// 結果を返す
	self.postMessage( {
		type: 'sorted',
		sortedIndices: sortedIndices
	} as SortWorkerResponse );

};
