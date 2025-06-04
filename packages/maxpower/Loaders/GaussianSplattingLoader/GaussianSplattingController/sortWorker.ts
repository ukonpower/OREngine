// WebWorkerでガウシアンの深度ソート処理を行う

export interface SortWorkerMessage {
	type: 'sort';
	gaussianPositions: Float32Array;
	numPoints: number;
	viewMatrix: number[]; // 4x4行列を平坦化した配列
}

export interface SortWorkerResponse {
	type: 'sorted';
	sortedIndices: Float32Array;
}

// Vector3クラス（軽量版）
class Vector3 {

	x: number;
	y: number;
	z: number;

	constructor( x: number, y: number, z: number ) {

		this.x = x;
		this.y = y;
		this.z = z;

	}

	// 4x4行列で位置変換
	applyMatrix4AsPosition( matrix: number[] ): Vector3 {

		const x = this.x;
		const y = this.y;
		const z = this.z;

		const w = 1 / ( matrix[ 3 ] * x + matrix[ 7 ] * y + matrix[ 11 ] * z + matrix[ 15 ] );

		return new Vector3(
			( matrix[ 0 ] * x + matrix[ 4 ] * y + matrix[ 8 ] * z + matrix[ 12 ] ) * w,
			( matrix[ 1 ] * x + matrix[ 5 ] * y + matrix[ 9 ] * z + matrix[ 13 ] ) * w,
			( matrix[ 2 ] * x + matrix[ 6 ] * y + matrix[ 10 ] * z + matrix[ 14 ] ) * w
		);

	}

}

self.onmessage = function ( e: MessageEvent<SortWorkerMessage> ) {

	const { type, gaussianPositions, numPoints, viewMatrix } = e.data;

	if ( type === 'sort' ) {

		// ソート用の深度配列
		const depths: { index: number, depth: number }[] = [];

		// 各ガウシアンの深度を計算
		for ( let i = 0; i < numPoints; i ++ ) {

			// ガウシアンの位置
			const x = gaussianPositions[ i * 3 ];
			const y = gaussianPositions[ i * 3 + 1 ];
			const z = gaussianPositions[ i * 3 + 2 ];

			const outPos = new Vector3( x, y, z ).applyMatrix4AsPosition( viewMatrix );
			depths.push( { index: i, depth: outPos.z } );

		}

		// 深度でソート（奥から手前へ）
		depths.sort( ( a, b ) => a.depth - b.depth );

		// ソート後のインデックス配列
		const sortedIndices = new Float32Array( numPoints );
		for ( let i = 0; i < numPoints; i ++ ) {

			sortedIndices[ i ] = depths[ i ].index;

		}

		// 結果を返す
		self.postMessage( {
			type: 'sorted',
			sortedIndices: sortedIndices
		} as SortWorkerResponse );

	}

};
