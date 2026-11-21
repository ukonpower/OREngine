// カメラと視線まわりの共通関数。webgl側 common.module.glsl の viewDirection / isBackground 相当（isBackground の判定は両方で揃える）。
//
// 外から与えられる名前:
//   frame.uCameraPosition / frame.uCameraMatrix / frame.uProjectionMatrix / frame.uCameraFar

// 表面からカメラへ向かう単位ベクトル。
// 並行投影（uProjectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
fn viewDirection( position: vec3f ) -> vec3f {

	return normalize( mix( frame.uCameraPosition - position, frame.uCameraMatrix[ 2 ].xyz, frame.uProjectionMatrix[ 3 ][ 3 ] ) );

}

// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る
fn isBackground( position: vec3f ) -> bool {

	return dot( position, position ) == 0.0 || length( position - frame.uCameraPosition ) > frame.uCameraFar * 0.95;

}
