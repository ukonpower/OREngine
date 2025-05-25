import { CoordinateSystem } from '../index';

// SPZガウシアンデータ型
export type SPZGaussianData = {
	positions: Float32Array;
	colors: Float32Array;
	scales: Float32Array;
	rotations: Float32Array;
	alphas: Float32Array;
	sphericalHarmonics: Float32Array | null;
}

/**
 * 座標系の変換を行う
 * @param data ガウシアンデータ
 * @param sourceSystem 元の座標系
 * @param targetSystem 変換先の座標系
 */
export function convertCoordinateSystem( data: SPZGaussianData, sourceSystem: CoordinateSystem, targetSystem: CoordinateSystem ): void {

	// 各座標系間の変換行列を適用してpositions、rotations、その他のベクトルを変換

	// RDF (PLY) から RUB (OpenGL) への変換
	if ( sourceSystem === CoordinateSystem.RDF && targetSystem === CoordinateSystem.RUB ) {

		// Y軸を反転し、Z軸を反転（右手系は維持）
		for ( let i = 0; i < data.positions.length / 3; i ++ ) {

			// Y軸反転
			data.positions[ i * 3 + 1 ] = - data.positions[ i * 3 + 1 ];
			// Z軸反転
			data.positions[ i * 3 + 2 ] = - data.positions[ i * 3 + 2 ];

			// 回転クォータニオンの変換（Y軸とZ軸の反転に対応）
			// q' = qYZ = [qx, -qy, -qz, qw]
			data.rotations[ i * 4 + 1 ] = - data.rotations[ i * 4 + 1 ];
			data.rotations[ i * 4 + 2 ] = - data.rotations[ i * 4 + 2 ];

		}

	} else if ( sourceSystem === CoordinateSystem.LUF && targetSystem === CoordinateSystem.RUB ) {

		// LUF (GLB) から RUB (OpenGL) への変換

		// X軸を反転し、Z軸を反転（右手系は維持）
		for ( let i = 0; i < data.positions.length / 3; i ++ ) {

			// X軸反転
			data.positions[ i * 3 ] = - data.positions[ i * 3 ];
			// Z軸反転
			data.positions[ i * 3 + 2 ] = - data.positions[ i * 3 + 2 ];

			// 回転クォータニオンの変換（X軸とZ軸の反転に対応）
			// q' = qXZ = [-qx, qy, -qz, qw]
			data.rotations[ i * 4 ] = - data.rotations[ i * 4 ];
			data.rotations[ i * 4 + 2 ] = - data.rotations[ i * 4 + 2 ];

		}

	} else if ( sourceSystem === CoordinateSystem.RUF && targetSystem === CoordinateSystem.RUB ) {

		// RUF (Unity) から RUB (OpenGL) への変換

		// Z軸のみ反転（右手系は維持）
		for ( let i = 0; i < data.positions.length / 3; i ++ ) {

			// Z軸反転
			data.positions[ i * 3 + 2 ] = - data.positions[ i * 3 + 2 ];

			// 回転クォータニオンの変換（Z軸の反転に対応）
			// q' = qZ = [qx, qy, -qz, qw]
			data.rotations[ i * 4 + 2 ] = - data.rotations[ i * 4 + 2 ];

		}

	}

	// 他の座標系間の変換も必要に応じて実装

}
