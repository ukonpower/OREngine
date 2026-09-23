// カメラと視線まわりの共通関数。webgl側 common.module.glsl の viewDirection 相当。
//
// 外から与えられる名前:
//   frame.uCameraPosition / frame.uCameraMatrix / frame.uProjectionMatrix

// 表面からカメラへ向かう単位ベクトル。
// 並行投影（uProjectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
fn viewDirection( position: vec3f ) -> vec3f {

	return normalize( mix( frame.uCameraPosition - position, frame.uCameraMatrix[ 2 ].xyz, frame.uProjectionMatrix[ 3 ][ 3 ] ) );

}
